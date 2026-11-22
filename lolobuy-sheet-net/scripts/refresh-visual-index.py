"""Incrementally index the live cnbuycha catalog and matching Weidian item photos.

Run with --cache-dir PATH to resume downloads and --limit N to bound a batch.
Inputs are checked against each item's Weidian ID. Publish the manifest and its
immutable compressed shards together after a successful run.
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
import os
from pathlib import Path
import re
import subprocess
import tempfile
import time
from urllib.parse import urljoin, urlsplit
from PIL import Image, ImageOps

ORIGIN = 'https://cnbuycha.com'
OUT = Path(__file__).resolve().parents[1] / 'visual-index'


class BadHTTP(ValueError):
    def __init__(self, status):
        super().__init__(f'HTTP {status}')
        self.status=status


def http(url, timeout=25):
    result = subprocess.run(['curl','-sSL','--retry','2','--retry-delay','1',
                             '--max-time',str(timeout),'--max-filesize','20000000',
                             '--write-out','\n%{http_code}',url],check=True,
                            stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
    data,_,status=result.stdout.rpartition(b'\n')
    if status!=b'200':
        raise BadHTTP(status.decode(errors='replace'))
    return data


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


def source_url(raw):
    url=urljoin(ORIGIN,raw or '')
    u=urlsplit(url)
    return url if u.scheme=='https' and u.netloc=='cnbuycha.com' and u.path.startswith(('/media/products/','/uploads/')) else None


class SourcePhotos(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls={}
        self.stack=[]
        self.item_id=None
        self.name=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        group=self.stack[-1][1] if self.stack else ''
        cls=' '.join(attrs.get(k) or '' for k in ['class','id','data-role'])
        if re.search(r'product-gallery|detail-images|product-description|product-content|product-detail', cls): group='source'
        if re.search(r'qc[-_ ]?(?:photo|image|gallery)|quality[-_ ]control',cls,re.I): group='qc'
        if 'related-products' in cls or 'product-list' in cls or 'platform-list' in cls: group=''
        if tag=='meta' and attrs.get('itemprop')=='name': self.name=attrs.get('content')
        if tag=='h1' and attrs.get('itemprop')=='name': self.read_title=True
        if tag=='meta' and attrs.get('itemprop')=='sku':
            self.item_id=attrs.get('content')
        if tag=='img' and group:
            url=source_url(attrs.get('data-src') or attrs.get('src'))
            if url:self.urls[url]=group
        if tag not in {'img','meta','link','br','hr','input','area','base','embed','param','source','track','wbr'}:
            self.stack.append((tag,group))
    def handle_data(self,data):
        if getattr(self,"read_title",False) and data.strip(): self.name=data.strip(); self.read_title=False
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
    item=parser.item_id or (re.search(r'weidian\.com/item\.html\?itemID=(\d+)',body) or [None,None])[1]
    title=parser.name or (re.search(r'<h1[^>]*>(.*?)</h1>',body,re.S) or [None,''])[1]
    return {'id':item,'name':html.unescape(re.sub(r'<[^>]+>','',title)).strip(), 'photos':parser.urls}


def product_seller(item):
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
    for im in model['item_info'].get('imgs') or []:add(im,'gallery')
    props=model.get('sku_properties') or {}
    for group in props.get('attr_list') or []:
        for value in group.get('attr_values') or []:add(value.get('img'),'style')
    skus=props.get('sku') or {}
    for sku in (skus.values() if isinstance(skus,dict) else skus):
        if isinstance(sku,dict):add(sku.get('img'),'style')
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


def compact(value):
    return json.dumps(value,ensure_ascii=False,separators=(',',':')).encode()

def refresh(output,cache,limit):
    from xml.etree import ElementTree
    source=ElementTree.fromstring(http(ORIGIN+'/sitemap.xml'))
    catalog=set()
    for el in source.iter():
        if el.tag.rsplit('}',1)[-1]!='loc':continue
        url=urlsplit(el.text or '')
        if url.hostname=='cnbuycha.com' and re.fullmatch(r'/[a-z0-9-]+/\d+\.html',url.path):catalog.add(url.path)
    current=output/'manifest.json'
    manifest=json.loads(current.read_text())
    rows={}
    bootstrap_paths=set()
    if manifest.get('bootstrap'):
        snapshot={line.partition('=')[0].rsplit(' ',1)[-1]:json.loads(line.partition('=')[2].rstrip(';\n'))
                  for line in (output/'snapshot.mjs').read_text().splitlines() if line.startswith('export const ')}
        for encoded in snapshot['imageShards']:
            for path,entries in json.loads(gzip.decompress(base64.b64decode(encoded))):
                rows[path]=(snapshot['imageNames'][path],entries,0)
        bootstrap_paths=set(rows)
    for filename in manifest['shards']:
        for path,title,entries,*extra in json.loads(gzip.decompress((output/filename).read_bytes())):
            rows[path]=(title,entries,extra[0] if extra else 0)
    if len(catalog)<len(rows)*.8:raise ValueError('Source sitemap is incomplete')
    now=int(time.time())
    attempts={path:ts for path,ts in manifest.get('recentFailures',{}).items() if path in catalog and now-ts<86400}
    candidates=sorted(catalog,key=lambda path:(path in attempts,path in rows,rows.get(path,(None,None,0))[2],-int(path.rsplit('/',1)[1][:-5])))
    batch=candidates[:limit]
    known={u:(h,c) for _,entries,_ in rows.values() for u,h,c,_ in entries if h and c}
    missing=Counter()
    def prepare(path):
        key=path.split('/')[-1][:-5]
        src=cache_call(cache/'sources'/key,86400,lambda:product_source(path))
        previous=rows.get(path,('',[],0))
        seller=None
        if src and src['id']:
            sku=src['id']
            seller=cache_call(cache/'sellers'/sku,86400,lambda:product_seller(sku))
        photos={u:k for u,h,c,k in previous[1] if (not src and k in ('qc','source')) or (seller is None and k in ('gallery','style'))}
        if src:photos.update(src['photos'])
        if seller is not None:photos.update(seller)
        return path,src['name'] if src and src['name'] else previous[0],photos,bool(src and (not src['id'] or seller is not None))
    with ThreadPoolExecutor(6) as pool:products=list(pool.map(prepare,batch))
    urls={u for _,_,photos,_ in products for u in photos if u not in known}
    def compute(url):
        key=hashlib.sha256(url.encode()).hexdigest()
        return url,cache_call(cache/'signatures'/key,86400*7,lambda:fingerprint(url))
    gone=set()
    with ThreadPoolExecutor(8) as pool:
        for url,sig in pool.map(compute,urls):
            if isinstance(sig,dict) and sig.get('gone'):gone.add(url)
            elif sig:known[url]=sig
    for path,title,photos,audited in products:
        entries=[]
        for u,k in photos.items():
            if u in gone:missing['removed']+=1
            elif u in known:entries.append([u,*known[u],k])
            else:
                entries.append([u,None,None,k])
                missing['unknown']+=1
                audited=False
        if entries:rows[path]=(title,entries,now if audited else now-86400*14)
        if entries and audited:attempts.pop(path,None)
        else:attempts[path]=now
    output.mkdir(exist_ok=True,parents=True)
    # Untouched shard membership stays stable; new products append independently.
    touched=set(batch)
    previous_files=manifest['shards']
    files=[]
    for old in previous_files:
        original=json.loads(gzip.decompress((output/old).read_bytes()))
        if all(r[0] in catalog and r[0] not in touched for r in original):
            files.append(old)
            continue
        values=[[r[0],*rows[r[0]]] for r in original if r[0] in catalog and r[0] in rows]
        if values:files.append(save_shard(output,values))
    old_paths={r[0] for old in previous_files for r in json.loads(gzip.decompress((output/old).read_bytes()))}
    new=sorted(catalog.intersection(rows)-old_paths-(bootstrap_paths-set(batch)))
    for i in range(0,len(new),200):files.append(save_shard(output,[[path,*rows[path]] for path in new[i:i+200]]))
    live={p:row for p,row in rows.items() if p in catalog}
    kinds=Counter(e[3] for _,entries,_ in live.values() for e in entries if e[1])
    now_verified=sum(verified>=now-86400*7 for _,_,verified in live.values())
    all_unknown=sum(1 for _,entries,_ in live.values() for e in entries if not e[1])
    meta={'source':ORIGIN,'updated':datetime.now(timezone.utc).isoformat(),'total':len(live),'liveCatalogCount':len(catalog),
          'images':sum(kinds.values()),'kinds':kinds,'shards':files,'verifiedLastWeek':now_verified,'unhashedKnown':all_unknown,
          'partial':len(live)<len(catalog) or now_verified<len(catalog) or bool(all_unknown),
          'lastBatch':{'products':len(batch),'removedImageURLs':len(gone),'unhashed':missing['unknown']}}
    if attempts:meta['recentFailures']=attempts
    if manifest.get('bootstrap'):
        meta['bootstrap']=True
        meta['removed']=sorted(bootstrap_paths-catalog)
    write_atomic(current,compact(meta).decode())
    for stale in set(previous_files)-set(files): (output/stale).unlink(missing_ok=True)
    print({k:v for k,v in meta.items() if k!='shards'},flush=True)

def save_shard(out,rows):
    blob=gzip.compress(compact(rows),compresslevel=8,mtime=0)
    name=hashlib.sha256(blob).hexdigest()[:16]+'.gz'
    (out/name).write_bytes(blob)
    return name

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--cache-dir',type=Path,required=True)
    parser.add_argument('--output',type=Path,default=OUT)
    parser.add_argument('--limit',type=int,default=150)
    args=parser.parse_args()
    if args.limit<1:parser.error('--limit must be positive')
    refresh(args.output,args.cache_dir,args.limit)
