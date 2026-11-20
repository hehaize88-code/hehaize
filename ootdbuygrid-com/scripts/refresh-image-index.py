"""Refresh cnbuycha image search. Requires Python 3.10+, Pillow and curl.

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
import subprocess
import tempfile
import time
from urllib.parse import urljoin, urlsplit
from PIL import Image, ImageOps

ORIGIN = 'https://cnbuycha.com'
OUT = Path(__file__).resolve().parents[1] / 'image-data.mjs'
SHARD_SIZE = 200


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


def previous_index(path):
    if not path.is_file():
        return {}
    exports = {line.split('=',1)[0].rsplit(' ',1)[-1]:json.loads(line.split('=',1)[1].rstrip(';'))
               for line in path.read_text().splitlines() if line.startswith('export const ')}
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
                out[path[1]] = html.unescape(name[1])
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
        if tag=='meta' and attrs.get('itemprop')=='sku':
            self.item_id=attrs.get('content')
        if tag=='img' and group:
            url=source_url(attrs.get('data-src') or attrs.get('src'))
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
    item=parser.item_id or (re.search(r'weidian\.com/item\.html\?itemID=(\d+)',body) or [None,None])[1]
    return {'id':item, 'photos':parser.urls}


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


def package(rows,names,source_ok,seller_ok,seller_total,output,outages):
    ordered=sorted(rows)
    parts=[]
    for i in range(0,len(ordered),SHARD_SIZE):
        blob=json.dumps([[p,rows[p]] for p in ordered[i:i+SHARD_SIZE]],separators=(',',':')).encode()
        parts.append(base64.b64encode(gzip.compress(blob,compresslevel=8,mtime=0)).decode())
    all_entries=[e for row in rows.values() for e in row]
    kinds=Counter(e[3] for e in all_entries if e[1])
    lost=sum(not e[1] for e in all_entries)
    meta={'source':ORIGIN,'updated':datetime.now(timezone.utc).isoformat(),'total':len(rows),
          'images':sum(kinds.values()),'kinds':kinds,'auditSource':source_ok,'auditSeller':seller_ok,
          'unavailableImageURLs':len(outages),'unavailableAssociations':sum(outages.values()),'unhashedKnown':lost,'partial':bool(lost or source_ok<len(rows) or seller_ok<seller_total),
          'revision':hashlib.sha256(''.join(parts).encode()).hexdigest()[:12],'shards':len(parts)}
    content=''.join('export const '+k+'='+json.dumps(v,separators=(',',':'))+';\n'
                    for k,v in [('imageMeta',meta),('imageNames',names),('imageShards',parts)])
    write_atomic(output,content)
    print(json.dumps(meta),flush=True)


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--cache-dir',type=Path,required=True)
    ap.add_argument('--output',type=Path,default=OUT)
    ap.add_argument('--recheck-images',action='store_true',help='Revalidate existing signatures and image availability')
    ap.add_argument('--metadata-hours',type=int,default=24)
    args=ap.parse_args()
    cache=args.cache_dir
    names=catalog_pages()
    old=previous_index(args.output)
    known={e[0]:e[1:3] for row in old.values() for e in row if e[1]}
    if args.recheck_images:
        known.clear()
    age=max(1,args.metadata_hours)*3600
    def metadata(path):
        code=path.split('/')[-1].split('.')[0]
        src=cache_call(cache/'sources'/code,age,lambda:product_source(path))
        sku=src.get('id') if src else None
        seller=cache_call(cache/'sellers'/sku,age,lambda:product_seller(sku)) if sku else None
        photos={}
        for url,h,c,k in old.get(path,[]):
            if (not src and k in ('source','qc')) or (seller is None and k in ('gallery','style')):
                photos[url]=k
        if src:photos.update(src['photos'])
        if seller is not None:photos.update(seller)
        return path,photos,src is not None,seller is not None,sku is not None
    with ThreadPoolExecutor(6) as pool:
        records=list(pool.map(metadata,names))
    todo={u for _,photos,*_ in records for u in photos if u not in known}
    def capture(url):
        key=hashlib.sha256(url.encode()).hexdigest()
        return url,cache_call(cache/'signatures'/key,age if args.recheck_images else 7*86400,lambda:fingerprint(url))
    gone=set()
    with ThreadPoolExecutor(8) as pool:
        for url,sig in pool.map(capture,todo):
            if isinstance(sig,dict) and sig.get('gone'):gone.add(url)
            elif sig:known[url]=sig
    outages=Counter(u for _,photos,*_ in records for u in photos if u in gone)
    rows={p:[[u,*known.get(u,[None,None]),k] for u,k in photos.items() if u not in gone] for p,photos,*_ in records}
    package(rows,names,sum(v[2] for v in records),sum(v[3] for v in records),sum(v[4] for v in records),args.output,outages)


if __name__=='__main__':main()
