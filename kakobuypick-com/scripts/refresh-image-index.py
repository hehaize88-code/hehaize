"""Refresh cnbuycha image search. Requires Python 3.10+, Pillow and httpx.

Run python scripts/refresh-image-index.py --cache-dir PATH to resume a refresh.
Only metadata and image fingerprints are cached. The published index is replaced
atomically after processing. Failures preserve previous entries and are counted.
"""
import argparse
import base64
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import gzip
import hashlib
import html
from html.parser import HTMLParser
import io
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import time
import threading
import httpx
from urllib.parse import urljoin, urlsplit, urlencode, parse_qs
from PIL import Image, ImageOps

ORIGIN = 'https://cnbuycha.com'
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src/lib/visual/manifest.mjs'
SHARDS = ROOT / 'public/image-index'
SHARD_SIZE = 200


class BadHTTP(ValueError):
    def __init__(self, status):
        super().__init__(f'HTTP {status}')
        self.status=status


_clients=threading.local()
_pauses={}
_pause_lock=threading.Lock()


def http(url, timeout=25):
    # Keep TLS connections open over a batch of images from the same CDN.
    # A shared host-level pause prevents parallel retries after a 429.
    if not hasattr(_clients,'http'):
        proxy=os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
        _clients.http=httpx.Client(proxy=proxy or None,trust_env=not bool(proxy),follow_redirects=True,
                                   timeout=timeout,limits=httpx.Limits(max_keepalive_connections=4),
                                   headers={'User-Agent':'KakobuyPick image index (+https://kakobuypick.com/image-search/)'})
    host=urlsplit(url).hostname
    for attempt in range(3):
        with _pause_lock:delay=_pauses.get(host,0)-time.monotonic()
        if delay>0:time.sleep(delay)
        try:
            with _clients.http.stream('GET',url) as response:
                if response.status_code in (429,502,503,504):
                    value=response.headers.get('Retry-After','')
                    delay=min(90,max(2,int(value) if value.isdigit() else 2**(attempt+1)))
                    with _pause_lock:_pauses[host]=max(_pauses.get(host,0),time.monotonic()+delay)
                    if attempt<2:continue
                if response.status_code!=200:raise BadHTTP(str(response.status_code))
                if int(response.headers.get('content-length') or 0)>20000000:raise ValueError('Oversized response')
                data=bytearray()
                for chunk in response.iter_bytes():
                    data.extend(chunk)
                    if len(data)>20000000:raise ValueError('Oversized response')
                return bytes(data)
        except httpx.RequestError as error:
            if attempt==2:raise OSError(str(error)) from error
            time.sleep(attempt+1)
    raise ValueError('No source response')


def json_at(path, fallback=None):
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return fallback


def write_atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile('w', dir=path.parent, delete=False) as handle:
        handle.write(data)
    os.replace(handle.name, path)


def cache_call(path, max_age, fn):
    if path.is_file() and (not max_age or time.time()-path.stat().st_mtime < max_age):
        cached = json_at(path)
        if cached is not None:
            return cached
    try:
        data = fn()
        write_atomic(path, json.dumps(data,separators=(',',':')))
        return data
    except (OSError,ValueError,KeyError,TypeError,subprocess.SubprocessError,Image.DecompressionBombError):
        return None


def previous_index(path):
    if not path.is_file():
        return {}
    exports = {line.split('=',1)[0].rsplit(' ',1)[-1]:json.loads(line.split('=',1)[1].rstrip(';'))
               for line in path.read_text().splitlines() if line.startswith('export const ')}
    if 'imageShards' not in exports:
        directory = SHARDS / exports['imageMeta']['revision']
        return {p: imgs for i in range(exports['imageMeta']['shards'])
                for p, imgs in json.loads(gzip.decompress((directory / f'{i}.json.gz').read_bytes()))}
    return {p:imgs for shard in exports['imageShards']
            for p,imgs in json.loads(gzip.decompress(base64.b64decode(shard)))}


def catalog_pages():
    first = http(ORIGIN+'/AllProducts/').decode()
    count = int(re.search(r'class="results-summary">\s*([\d,]+)',first)[1].replace(',',''))
    def cards(page):
        out={}
        for block in re.findall(r'<article\b[^>]*class="product-card[^>]*>([\s\S]*?)</article>',page):
            path = re.search(r'href="(/[a-z\d-]+/\d+\.html)"',block)
            name = re.search(r'<h3>([^<]+)</h3>',block)
            if path and name:
                photo = re.search(r'<img\b[^>]*?src="([^"]+)',block)
                out[path[1]] = [html.unescape(name[1]),source_url(html.unescape(photo[1])) if photo else None]
        return out
    paths = cards(first)
    page_size = len(paths)
    if page_size==0:
        raise ValueError('No products in catalog')
    def get_page(n):
        return cards(http(ORIGIN+'/AllProducts/?page='+str(n)).decode())
    with ThreadPoolExecutor(3) as pool:
        for batch in pool.map(get_page,range(2,math.ceil(count/page_size)+1)):
            paths.update(batch)
    if len(paths)!=count:
        raise ValueError('Catalog changed or returned incomplete pagination: retry refresh')
    return paths


def source_url(raw):
    url=urljoin(ORIGIN,raw or '')
    u=urlsplit(url)
    allowed = (u.hostname=='cnbuycha.com' and u.path.startswith(('/media/', '/uploads/', '/template/'))) or u.hostname=='si.geilicdn.com'
    return url if u.scheme=='https' and allowed and not u.username and not u.password and 'placeholder' not in url.lower() else None


class SourcePhotos(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls={}
        self.stack=[]
        self.item_id=None
        self.seller=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        group=self.stack[-1][1] if self.stack else ''
        cls=' '.join(attrs.get(k) or '' for k in ['class','id','data-role','data-image-type','alt'])
        if re.search(r'product-gallery|detail-images|product-description|product-content|product-detail', cls): group='source'
        if re.search(r'\bqc\b|qc[-_ ]?(?:photo|image|gallery)|quality[-_ ]control',cls,re.I): group='qc'
        if 'related-products' in cls or 'product-list' in cls or 'platform-list' in cls: group=''
        if tag=='meta' and attrs.get('itemprop')=='sku':
            self.item_id=attrs.get('content')
        if tag=='a' and 'weidian-btn' in (attrs.get('class') or '').split():
            link=urlsplit(attrs.get('href') or '')
            item=(parse_qs(link.query).get('itemID') or [''])[0]
            if link.hostname in ('www.weidian.com','weidian.com') and link.path=='/item.html' and re.fullmatch(r'\d{6,16}',item): self.seller=item
        if tag=='img' and group:
            url=source_url(attrs.get('data-src') or attrs.get('data-original') or attrs.get('src'))
            if url:self.urls[url]=group
        if tag not in {'img','meta','link','br','hr','input','area','base','embed','param','source','track','wbr'}:
            self.stack.append((tag,group))
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0]==tag:
                del self.stack[i:]
                break


def product_source(path):
    body=http(ORIGIN+path).decode()
    parser=SourcePhotos()
    parser.feed(body)
    if not parser.urls:
        raise ValueError('Missing source gallery')
    if parser.item_id and parser.seller and parser.item_id!=parser.seller:
        raise ValueError('Product and marketplace IDs disagree')
    return {'id':parser.seller, 'photos':parser.urls}


def product_seller(item):
    if not re.fullmatch(r'\d{6,16}',item):raise ValueError('Invalid marketplace ID')
    try:
        query=urlencode({'param':json.dumps({'vitemId':item,'from':'h5'})})
        envelope=json.loads(http('https://thor.weidian.com/detail/getItemInfo/1.0?'+query))
        if envelope.get('status',{}).get('code') not in (0,831013): raise ValueError('Seller API unavailable')
    except (ValueError,OSError,subprocess.SubprocessError):
        body=http('https://weidian.com/item.html?itemID='+item).decode()
        tag=re.search(r'<script\b[^>]*\bid="__rocker-render-inject__"[^>]*>',body)
        if not tag:raise ValueError('Missing seller model')
        envelope=json.loads(html.unescape(re.search(r'\bdata-obj="([^"]+)',tag[0])[1]))
    if envelope.get('status',{}).get('code')==831013:
        return {}
    model=(envelope.get('result') or {}).get('default_model') or {}
    if str(model['item_info']['item_id'])!=item:raise ValueError('Seller item mismatch')
    photos={}
    def add(raw,kind):
        if isinstance(raw,dict):raw=raw.get('img') or raw.get('url')
        if not isinstance(raw,str):return
        url=urljoin('https://weidian.com',raw)
        parsed=urlsplit(url)
        if parsed.scheme=='https' and (parsed.hostname or '').endswith('.geilicdn.com'):
            photos[url]=kind
    images=model['item_info'].get('imgs') or []
    if isinstance(images,dict): images=[images] if 'url' in images or 'img' in images else images.values()
    if isinstance(images,str): images=[images]
    for im in images: add(im,'gallery')
    props=model.get('sku_properties') or {}
    for group in props.get('attr_list') or []:
        for value in group.get('attr_values') or []:add(value.get('img'),'style')
    skus=props.get('sku') or {}
    for sku in (skus.values() if isinstance(skus,dict) else skus):add(sku.get('img'),'style')
    return photos


def fingerprint(url):
    parsed=urlsplit(url)
    target=url+'?w=160&h=160' if not parsed.query and (parsed.hostname or '').endswith('.geilicdn.com') else url
    payload=None
    for addr in dict.fromkeys((target,url)):
        try:
            payload=http(addr)
            break
        except BadHTTP as error:
            if error.status not in ('404','410'):
                raise
    if payload is None:
        return {'gone':True}
    with Image.open(io.BytesIO(payload)) as raw:
        if raw.width*raw.height>48_000_000:raise ValueError('Oversized image')
        image=ImageOps.exif_transpose(raw).convert('RGBA')
    color=Image.new('RGB',image.size,'white')
    color.paste(image,mask=image.getchannel('A'))
    resampling=Image.Resampling.LANCZOS
    small=color.resize((8,8),resampling).load()
    signature=bytes(int(sum((small[x*2+dx,y*2+dy][channel]>>3)
                            for dx in range(2) for dy in range(2))/4+.5)
                    for y in range(4) for x in range(4) for channel in range(3))
    gray=color.resize((9,8),resampling).convert('L').load()
    bits=''.join('1' if gray[x+1,y]>gray[x,y] else '0' for y in range(8) for x in range(8))
    return [format(int(bits,2),'016x'),base64.b64encode(signature).decode()]


def saved_outputs(path):
    if not path.is_file():return {}
    return {line.split('=',1)[0].rsplit(' ',1)[-1]:json.loads(line.split('=',1)[1].rstrip(';'))
            for line in path.read_text().splitlines() if line.startswith('export const ')}


def publish(rows,names,complete,output):
    parts=[]
    ordered=sorted(rows)
    for i in range(0,len(ordered),SHARD_SIZE):
        data=[[p,rows[p]] for p in ordered[i:i+SHARD_SIZE]]
        parts.append(gzip.compress(json.dumps(data,separators=(',',':')).encode(),compresslevel=8,mtime=0))
    digest=hashlib.sha256(b''.join(parts)).hexdigest()[:16]
    previous=saved_outputs(output)
    kinds=Counter(e[3] for row in rows.values() for e in row if e[1])
    known_failures=sum(not e[1] for row in rows.values() for e in row)
    with_photos=sum(any(e[1] for e in row) for row in rows.values())
    meta={'source':ORIGIN,'revision':digest,'shards':len(parts),'total':len(names),'searchableProducts':with_photos,
          'images':sum(kinds.values()),'kinds':dict(kinds),'completeProducts':len(complete),'unhashedKnown':known_failures,
          'partial':len(complete)<len(names) or bool(known_failures) or with_photos<len(names)}
    prior=previous.get('imageMeta',{})
    if {k:v for k,v in prior.items() if k!='updated'}==meta and previous.get('imageNames')==names and previous.get('verifiedProducts')==sorted(complete):
        print('Index unchanged',flush=True);return
    directory=SHARDS/digest
    directory.mkdir(parents=True,exist_ok=True)
    for i,data in enumerate(parts):
        target=directory/f'{i}.json.gz'
        if not target.is_file():target.write_bytes(data)
    meta['updated']=datetime.now(timezone.utc).isoformat()
    exports=[('imageMeta',meta),('imageNames',names),('verifiedProducts',sorted(complete))]
    content=''.join('export const '+key+'='+json.dumps(value,separators=(',',':'))+';\n' for key,value in exports)
    write_atomic(output,content)
    # This checkout contains only the current build revision. Each Worker release
    # retains its own immutable assets until the release is retired.
    last=prior.get('revision','')
    if last!=digest and re.fullmatch(r'[a-f0-9]{12,16}',last) and (SHARDS/last).is_dir():shutil.rmtree(SHARDS/last)
    print(json.dumps(meta),flush=True)


def update(args):
    cache=args.cache_dir
    catalog=json_at(args.inventory) if args.inventory else catalog_pages()
    if not isinstance(catalog,dict) or not catalog:raise ValueError('Empty inventory')
    if any(not re.fullmatch(r'/[a-z-]+/\d+\.html',p) for p in catalog):raise ValueError('Invalid catalog paths')
    if args.patch:catalog={p:v for p,v in catalog.items() if int(Path(p).stem)%4==args.lane}
    until=time.monotonic()+args.budget*60
    names={p:v[0] for p,v in catalog.items()}
    old=previous_index(args.output)
    saved=saved_outputs(args.output)
    verified=set(saved.get('verifiedProducts',[])) & names.keys()
    rows={p:{u:[u,h,c,k] for u,h,c,k in old.get(p,[])} for p in names}
    known={e[0]:e[1:3] for row in rows.values() for e in row.values() if e[1]}
    for path,(_,cover) in catalog.items():
        if cover and cover not in rows[path]:
            rows[path][cover]=[cover,*known.get(cover,[None,None]),'source']
            verified.discard(path)
    # New and unfinished items go first. Rotate verified products for a periodic
    # metadata and SKU audit, with no redownload for an already signed URL.
    pending=sorted(names,key=lambda p:(p in verified, len(rows[p])>1, -int(p.split('/')[-1][:-5])))
    verified_list=sorted(verified)
    if verified_list:
        period=int(time.time()//(4*3600))
        start=(period*args.limit)%len(verified_list)
        rotated=verified_list[start:]+verified_list[:start]
        pending=[p for p in pending if p not in verified]+rotated
    def metadata(path):
        if time.monotonic()>=until-90:return path,None,None,None
        src=cache_call(cache/'sources'/hashlib.sha256(path.encode()).hexdigest(),86400,lambda:product_source(path))
        if not src:return path,None,None,False
        item=src['id']
        seller=cache_call(cache/'sellers'/item,86400,lambda:product_seller(item)) if item else {}
        return path,src,seller,seller is not None
    unfinished=[path for path in pending if path not in verified]
    selected=unfinished[:args.limit] if unfinished else pending[:args.reaudit]
    print('Products scheduled',len(selected),'still incomplete',len(unfinished),flush=True)
    fetched={}
    with ThreadPoolExecutor(2) as pool:
        for path,src,seller,ok in pool.map(metadata,selected):
            if ok is not None:fetched[path]=ok
            if not src:continue
            photos={**src['photos'],**(seller or {})}
            cover=catalog[path][1]
            if cover: photos.setdefault(cover,'source')
            if seller is None:
                photos.update({u:e[3] for u,e in rows[path].items() if e[3] in ('style','gallery') and u not in photos})
            rows[path]={u:[u,*known.get(u,[None,None]),k] for u,k in photos.items()}
    print('Product metadata collected',len(fetched),flush=True)
    missing=dict.fromkeys(e[0] for p in selected for e in rows[p].values() if not e[1])
    # Include new covers in every run. cap resources even on large imports.
    covers=[v[1] for v in catalog.values() if v[1] and v[1] not in known]
    todo=list(dict.fromkeys([*covers,*missing]))[:args.max_images]
    def capture(url):
        if time.monotonic()>=until-60:return url,None
        cachekey=hashlib.sha256(url.encode()).hexdigest()
        return url,cache_call(cache/'signatures'/cachekey,7*86400,lambda:fingerprint(url))
    gone=set()
    with ThreadPoolExecutor(3) as pool:
        for index,(url,sig) in enumerate(pool.map(capture,todo)):
            if index and index%500==0:print('Image batch',index,'of',len(todo),flush=True)
            if isinstance(sig,dict) and sig.get('gone'):gone.add(url)
            elif sig:known[url]=sig
    for path,row in rows.items():
        for u in list(row):
            if u in gone:del row[u]
            elif not row[u][1] and u in known:row[u][1:3]=known[u]
        if path in fetched and fetched[path] and all(e[1] for e in row.values()):
            verified.add(path)
        elif path in fetched:verified.discard(path)
    result={p:list(row.values()) for p,row in rows.items()}
    if args.patch:
        patch={'base':saved['imageMeta']['revision'],'lane':args.lane,'rows':result,'verified':sorted(verified)}
        args.patch.write_bytes(gzip.compress(json.dumps(patch,separators=(',',':')).encode(),mtime=0))
        return
    publish(result,names,verified,args.output)


def merge(args):
    catalog=json_at(args.inventory)
    saved=saved_outputs(args.output)
    rows={}
    verified=set()
    for lane in range(4):
        patch=json.loads(gzip.decompress((args.merge/f'lane-{lane}.gz').read_bytes()))
        if patch.get('base')!=saved['imageMeta']['revision'] or patch.get('lane')!=lane:raise ValueError('Mismatched index patch')
        if set(patch['rows'])!={p for p in catalog if int(Path(p).stem)%4==lane}:raise ValueError('Incomplete inventory shard')
        if not set(patch['verified'])<=set(patch['rows']):raise ValueError('Invalid verification scope')
        rows.update(patch['rows'])
        verified.update(patch['verified'])
    publish(rows,{p:v[0] for p,v in catalog.items()},verified,args.output)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cache-dir',type=Path,default=ROOT/'.cache/visual')
    parser.add_argument('--inventory',type=Path)
    parser.add_argument('--discover',type=Path)
    parser.add_argument('--patch',type=Path)
    parser.add_argument('--merge',type=Path)
    parser.add_argument('--lane',type=int,choices=range(4),default=0)
    parser.add_argument('--budget',type=int,default=85)
    parser.add_argument('--reaudit',type=int,default=30)
    parser.add_argument('--output',type=Path,default=OUT)
    parser.add_argument('--limit',type=int,default=160)
    parser.add_argument('--max-images',type=int,default=8000)
    args=parser.parse_args()
    if not (1<=args.limit<=6500 and 1<=args.max_images<=200000):parser.error('Invalid work bounds')
    if args.discover:write_atomic(args.discover,json.dumps(catalog_pages(),separators=(',',':')))
    elif args.merge:merge(args)
    else:update(args)
