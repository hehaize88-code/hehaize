"""Build a dated index of every accessible product gallery and option image.

Only public catalogue/Weidian product data and the site's existing options API are read. The output is small
visual descriptors, not a copied image store or a new database. Resume-safe
caches and bounded sessions avoid re-downloading unchanged images.
"""
import argparse, concurrent.futures, hashlib, html, io, json, math, os, pathlib, re, threading, time, warnings
from urllib.parse import urljoin, urlparse, parse_qs
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone
import requests
from PIL import Image, ImageOps, ImageStat
warnings.filterwarnings('ignore', category=DeprecationWarning)
ROOT=pathlib.Path(__file__).resolve().parents[1]
SOURCE='https://cnbuycha.com'
OPTIONS_SOURCE='https://cssbuychina.net/api/product-options?id='
CACHE=ROOT/'.cache/all-image-index'
LOCAL=threading.local()
ERRORS={}
BACKOFF={}
BLOCKED_HOSTS=set()
LOCK=threading.Lock()
REPAIRS={'/media/products/3460/8f135fa3-3ea9-458d-b81d-b9cc5e44957e.jpg':'/media/products/3460/59921312-605e-42f7-a647-f3d8a9713fb2.jpg?v=2'}

def session():
    if not hasattr(LOCAL,'session'):
        LOCAL.session=requests.Session()
        LOCAL.session.headers.update({'User-Agent':'CSSBuyChina-Catalogue-Image-Index/2.1','Accept':'*/*'})
    return LOCAL.session

def cached_response(url,kind):
    key=hashlib.sha256(url.encode()).hexdigest()
    file=CACHE/kind/(key+'.bin')
    if file.exists() and (not kind.startswith('html-') or time.time()-file.stat().st_mtime<6*3600):return file.read_bytes()
    return None

def fetch(url, kind, max_bytes=5_000_000, request_url=None):
    cached=cached_response(url,kind)
    if cached is not None:return cached
    key=hashlib.sha256(url.encode()).hexdigest()
    file=CACHE/kind/(key+'.bin')
    file.parent.mkdir(parents=True,exist_ok=True)
    host=urlparse(url).netloc
    for attempt in range(2):
        while True:
            with LOCK:
                if host in BLOCKED_HOSTS:ERRORS[url]='security-verification';return None
                delay=max(0,BACKOFF.get(host,0)-time.monotonic())
            if not delay:break
            time.sleep(min(delay,30))
        try:
            r=session().get(request_url or url,timeout=(12,18))
            if 'html' in r.headers.get('Content-Type','').lower():
                visible=clean(re.sub(r'<(script|style)\b[^>]*>[\s\S]*?</\1>', '', r.text, flags=re.I)).lower()
                if any(phrase in visible for phrase in ['verify you are human','checking your browser','unusual traffic from your','automated requests from your']):
                    with LOCK:BLOCKED_HOSTS.add(host);ERRORS[url]='security-verification'
                    log('SOURCE-BLOCKED',host,'security verification; no more requests will be sent')
                    return None
            if r.status_code in [404,410]:
                with LOCK:ERRORS[url]='http-'+str(r.status_code)
                return None
            if r.status_code==503 and 'Retry-After' in r.headers:
                # This API reports per-product source unavailability. Do not retry
                # that item in the current run; other catalogue items are independent.
                with LOCK:ERRORS[url]='http-503'
                return None
            if r.status_code==429:
                retry_after=r.headers.get('Retry-After','10')
                try:delay=max(0,float(retry_after))
                except ValueError:
                    try:delay=max(0,(parsedate_to_datetime(retry_after)-datetime.now(timezone.utc)).total_seconds())
                    except (TypeError,ValueError):delay=15
                with LOCK:BACKOFF[host]=max(BACKOFF.get(host,0),time.monotonic()+delay);ERRORS[url]='http-'+str(r.status_code)
                log('SOURCE-BACKOFF',host,r.status_code,'retry after',round(delay,1),'seconds')
                continue
            if not r.ok:
                with LOCK:ERRORS[url]='http-'+str(r.status_code)
                r.raise_for_status()
            if len(r.content)>max_bytes:
                with LOCK:ERRORS[url]='size-limit'
                return None
            temporary=file.with_suffix('.'+str(os.getpid())+'.'+str(threading.get_ident())+'.tmp')
            temporary.write_bytes(r.content);temporary.replace(file)
            with LOCK:ERRORS.pop(url,None)
            return r.content
        except (requests.RequestException,OSError) as e:
            with LOCK:
                if url not in ERRORS:ERRORS[url]=type(e).__name__
            if attempt==0:time.sleep(.5)
    return None

def clean(s):return html.unescape(re.sub('<[^>]*>','',s or '')).strip()
def match(s,p):
    m=re.search(p,s,re.S)
    return html.unescape(m.group(1)) if m else ''
def image_url(value):
    u=urlparse(urljoin(SOURCE,html.unescape(value)))
    if u.scheme!='https':return ''
    if u.netloc in ('cnbuycha.com','www.cnbuycha.com') and u.path in REPAIRS:return SOURCE+REPAIRS[u.path]
    return u.geturl()
def parse_list(text):
    rows=[]
    for b in re.findall(r'<article class="product-card[^>]*>(.*?)</article>',text,re.S):
        path=match(b,r'<a href="([^"]+)')
        if not re.fullmatch(r'/[a-z0-9-]+/\d+\.html',path):continue
        rows.append(dict(path=path,title=clean(match(b,r'<h3>(.*?)</h3>')),image=image_url(match(b,r'<img[^>]+src="([^"]+)')),price=match(b,r'data-currency="USD"[^>]*>([\d.]+)')))
    return rows

def parse_detail(text):
    section=text.split('<section class="product-detail"',1)[-1].split('</section>',1)[0] if '<section class="product-detail"' in text else ''
    original=match(section,r'href="(https://weidian\.com/[^\"]+)')
    source_id=parse_qs(urlparse(original).query).get('itemID',[''])[0]
    images=list(dict.fromkeys(image_url(x) for x in re.findall(r'<img[^>]*itemprop="image"[^>]*src="([^"]+)"',section)))
    return dict(sourceId=source_id,images=[x for x in images if x],title=clean(match(section,r'<h1[^>]*>(.*?)</h1>')),price=match(section,r'<meta itemprop="price" content="([^"]+)'))

def parse_options(text,expected_id):
    tag_match=re.search(r'<script\b[^>]*\bid=[\"\x27]__rocker-render-inject__[\"\x27][^>]*>',text,re.S)
    tag=tag_match.group(0) if tag_match else ''
    m=re.search(r'\bdata-obj=([\"\x27])(.*?)\1',tag,re.S)
    if not m:raise ValueError('Options unavailable')
    model=json.loads(html.unescape(m.group(2)))['result']['default_model']
    if str(model.get('item_info',{}).get('item_id'))!=str(expected_id):raise ValueError('Identity mismatch')
    values=[]
    for group in model.get('sku_properties',{}).get('attr_list',[]):
        for v in group.get('attr_values',[]):
            u=urlparse(v.get('img') or '');style_id=str(v.get('attr_id') or '')
            if u.scheme=='https' and (u.netloc=='geilicdn.com' or u.netloc.endswith('.geilicdn.com')) and style_id.isdigit():values.append({'image':u.geturl(),'styleId':style_id})
    return list({v['image']:v for v in values}.values())

def parse_options_api(data,expected_id):
    if str(data.get('sourceId'))!=str(expected_id):raise ValueError('Identity mismatch')
    if not isinstance(data.get('groups'),list):raise ValueError('Options unavailable')
    values=[]
    for i,image in enumerate(data.get('images',[])):
        u=urlparse(image or '')
        if u.scheme=='https' and (u.netloc=='geilicdn.com' or u.netloc.endswith('.geilicdn.com')):values.append({'image':u.geturl(),'imageIndex':i,'kind':'seller'})
    for group in data['groups']:
        for value in group.get('values',[]):
            u=urlparse(value.get('image') or '');style_id=str(value.get('id') or '')
            if u.scheme=='https' and (u.netloc=='geilicdn.com' or u.netloc.endswith('.geilicdn.com')) and style_id.isdigit():values.append({'image':u.geturl(),'styleId':style_id,'kind':'style'})
    return list({v['image']:v for v in values}.values())

def descriptor(data):
    im=Image.open(io.BytesIO(data))
    if im.width*im.height>50_000_000:raise ValueError('Oversize image')
    im=ImageOps.exif_transpose(im).convert('RGBA')
    white=Image.new('RGBA',im.size,(255,255,255,255));white.alpha_composite(im);im=white.convert('RGB')
    def area_cells(cols,rows):
        cells=[]
        for y in range(rows):
            top=math.floor(y*im.height/rows);bottom=max(top+1,math.floor((y+1)*im.height/rows))
            for x in range(cols):
                left=math.floor(x*im.width/cols);right=max(left+1,math.floor((x+1)*im.width/cols))
                means=ImageStat.Stat(im.crop((left,top,right,bottom))).mean
                cells.append([math.floor(value+.5) for value in means])
        return cells
    small=area_cells(9,8)
    gray=[.299*p[0]+.587*p[1]+.114*p[2] for p in small]
    bits=''.join('1' if gray[y*9+x]>gray[y*9+x+1] else '0' for y in range(8) for x in range(8))
    cells=[c for pixel in area_cells(4,4) for c in pixel]
    colors=[math.floor(value+.5) for value in ImageStat.Stat(im).mean]
    return dict(hash=bits,colors=colors,cells=cells)

def log(*args):print(*args,flush=True)
def build(args):
    CACHE.mkdir(parents=True,exist_ok=True)
    seed_details={}
    if args.seed_index:
        seed=pathlib.Path(args.seed_index);manifest=json.loads(seed.read_text());assert manifest['descriptorAlgorithm']=='area-v2'
        folder=CACHE/'descriptors-area-v2';folder.mkdir(parents=True,exist_ok=True);count=0
        for shard in manifest['shards']:
            raw=(seed.parent/shard['url'].lstrip('/')).read_bytes();assert hashlib.sha256(raw).hexdigest()==shard['sha256']
            for record in json.loads(raw)['products']:
                url=image_url(record['image']);key=hashlib.sha256(url.encode()).hexdigest();file=folder/(key+'.json')
                if record.get('kind')=='gallery':
                    item=seed_details.setdefault(record['path'],{'sourceId':record['sourceId'],'title':record['title'],'price':record['price'],'photos':{}});item['photos'][record['imageIndex']]=url
                if not file.exists():file.write_text(json.dumps({k:record[k] for k in ['hash','cells','colors'] if k in record}));count+=1
        log('REUSED',count,'validated image descriptors')
    # HTML snapshots are dated separately from the persistent descriptor cache.
    global HTML_KIND
    HTML_KIND='html-'+time.strftime('%Y-%m-%d',time.gmtime())
    raw=fetch(SOURCE+'/AllProducts/',HTML_KIND)
    if not raw:raise RuntimeError('Catalogue unavailable')
    first=raw.decode();total=int(match(first,r'<div class="results-summary">([\d,]+) products').replace(',',''))
    pages=math.ceil(total/60)
    def page(n):
        b=fetch(SOURCE+'/AllProducts/?page='+str(n),HTML_KIND)
        if not b:raise RuntimeError('Catalogue page unavailable: '+str(n))
        return parse_list(b.decode())
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        rows=[r for result in ex.map(page,range(1,pages+1)) for r in result]
    rows=list({r['path']:r for r in rows}.values())
    if len(rows)!=total:raise RuntimeError(f'Catalogue changed during crawl: expected {total}, got {len(rows)}; rerun with a fresh HTML snapshot')
    if args.reuse_gallery_snapshot and (not args.seed_index or manifest.get('updatedAt')!=time.strftime('%Y-%m-%d',time.gmtime())):raise RuntimeError('Reusable gallery snapshot must be dated today')
    if args.limit:rows=rows[:args.limit]
    (CACHE/'catalogue.json').write_text(json.dumps(rows,ensure_ascii=False))
    log('CATALOGUE',len(rows),'products',pages,'pages')
    details=[];detail_failures=[]
    def detail(row):
        if args.reuse_gallery_snapshot and row['path'] in seed_details:
            d=seed_details[row['path']];images=[d['photos'][i]for i in sorted(d['photos'])]
            if images and images[0]==row['image']:return row,dict(sourceId=d['sourceId'],images=images,title=row['title'],price=row['price'])
        b=fetch(SOURCE+row['path'],HTML_KIND)
        if not b:return row,None
        d=parse_detail(b.decode())
        return row,d if d['images'] and d['title'] else None
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        for i,(row,d) in enumerate(ex.map(detail,rows),1):
            if d:details.append({**row,**d})
            else:detail_failures.append(row['path']);details.append({**row,'sourceId':'','images':[row['image']]})
            if i%100==0:log('DETAILS',i,'/',len(rows),'photos',sum(len(d['images']) for d in details),'failures',len(detail_failures))
    (CACHE/'details.json').write_text(json.dumps(details,ensure_ascii=False))
    candidates=[];style_failures=[];style_attempted=0;style_succeeded=0;style_empty=0;style_unattempted=0
    for d in details:
        for i,u in enumerate(d['images']):candidates.append({k:d[k] for k in ('path','title','price','sourceId')}|dict(image=u,imageIndex=i,kind='gallery'))
    # Options API and image CDN are independent hosts. Pipeline their bounded
    # four-worker pools, sharing the same host backoff registry in this process.
    def index(u):
        key=hashlib.sha256(u.encode()).hexdigest();file=CACHE/'descriptors-area-v2'/(key+'.json');file.parent.mkdir(parents=True,exist_ok=True)
        if file.exists():return json.loads(file.read_text())
        # Use the same public CDN transform as the product UI, at index resolution.
        # Preserve the original URL/identity; do not download full-size stock photos.
        parsed=urlparse(u)
        small=parsed._replace(path=parsed.path+'.webp',query='w=256&h=256').geturl() if parsed.hostname and (parsed.hostname=='geilicdn.com' or parsed.hostname.endswith('.geilicdn.com')) and re.search(r'\.(?:jpe?g|png)$',parsed.path,re.I) else u
        b=fetch(u,'images',max_bytes=30_000_000,request_url=small)
        if not b:return None
        try:
            result=descriptor(b)
            temporary=file.with_suffix('.'+str(threading.get_ident())+'.tmp')
            temporary.write_text(json.dumps(result,separators=(',',':')));temporary.replace(file)
            return result
        except Exception as error:
            with LOCK:ERRORS[u]='image-decode-'+type(error).__name__
            return None
    image_executor=concurrent.futures.ThreadPoolExecutor(max_workers=args.image_workers)
    pending={}
    def submit_image(u):
        if u not in pending:pending[u]=image_executor.submit(index,u)
    for record in candidates:submit_image(record['image'])
    if not args.gallery_only:
        def options(d):
            if not re.fullmatch(r'\d{5,20}',d['sourceId']):return d,None,False
            # Reuse fresh, validated source pages from the earlier public crawl.
            b=None # The product-options API also supplies the seller image gallery.
            if b:
                try:return d,parse_options(b.decode(),d['sourceId']),True
                except (ValueError,KeyError):pass
            # Use the same public product-options route used by the site's detail page.
            url=OPTIONS_SOURCE+d['sourceId'];b=fetch(url,HTML_KIND)
            if not b:return d,None,True
            try:return d,parse_options_api(json.loads(b),d['sourceId']),True
            except (ValueError,KeyError,TypeError):
                with LOCK:ERRORS[url]='invalid-options-response'
                return d,None,True
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
            for i,(d,urls,attempted) in enumerate(ex.map(options,details),1):
                style_attempted+=attempted;style_unattempted+=not attempted
                if urls is None:style_failures.append(d['path'])
                else:
                    style_succeeded+=1;style_empty+=not bool(urls)
                    for j,value in enumerate(urls):
                        u=value['image']
                        if u not in d['images']:
                            candidates.append({k:d[k] for k in ('path','title','price','sourceId')}|{'imageIndex':j,**value})
                            submit_image(u)
                if i%100==0:log('OPTIONS',i,'/',len(details),'total images',len(candidates),'failures',len(style_failures))
    # A URL may be reused on many products; download/fingerprint it once.
    candidates=list({(d['path'],d['image']):d for d in candidates}.values())
    urls=list(dict.fromkeys(d['image'] for d in candidates));fingerprints={};image_failures=[]
    (CACHE/'candidates.json').write_text(json.dumps(candidates,ensure_ascii=False))
    log('IMAGES',len(urls),'unique URLs;',len(candidates),'product/image pairs')
    for i,u in enumerate(urls,1):
        d=pending[u].result()
        if d:fingerprints[u]=d
        else:image_failures.append(u)
        if i%200==0:log('INDEXED',i,'/',len(urls),'failures',len(image_failures))
    image_executor.shutdown()
    records=[r|fingerprints[r['image']] for r in candidates if r['image'] in fingerprints]
    folder=ROOT/'public/catalog-image-index';folder.mkdir(parents=True,exist_ok=True)
    shards=[]
    for start in range(0,len(records),args.shard_size):
        part=records[start:start+args.shard_size]
        payload={'products':part};content=json.dumps(payload,ensure_ascii=False,separators=(',',':'))
        name=f'part-{start//args.shard_size:03}-'+hashlib.sha256(content.encode()).hexdigest()[:12]+'.json'
        (folder/name).write_text(content)
        shards.append({'url':'/catalog-image-index/'+name,'count':len(part),'bytes':len(content.encode()),'sha256':hashlib.sha256(content.encode()).hexdigest()})
    names={pathlib.Path(s['url']).name for s in shards}
    # Retain immutable historical shards for clients holding the previous manifest.
    indexed_products=len({r['path'] for r in records})
    manifest=dict(version=2,descriptorAlgorithm='area-v2',source=SOURCE,updatedAt=time.strftime('%Y-%m-%d',time.gmtime()),catalogCount=len(rows),indexedCount=indexed_products,indexedProductCount=indexed_products,indexedImageCount=len(records),discoveredImageCount=len(candidates),uniqueImageCount=len(urls),indexedUniqueImageCount=len(fingerprints),galleryImageCount=sum(r['kind']=='gallery' for r in records),styleImageCount=sum(r['kind']=='style' for r in records),sellerImageCount=sum(r['kind']=='seller' for r in records),failedDetailCount=len(detail_failures),attemptedStylePageCount=style_attempted,successfulStylePageCount=style_succeeded,emptyStylePageCount=style_empty,unattemptedStylePageCount=style_unattempted if not args.gallery_only else len(details),failedStylePageCount=len(style_failures),failedImageCount=len(image_failures),includesStyles=not args.gallery_only,shards=shards)
    temporary=ROOT/'public/catalog-image-index.next.json'
    temporary.write_text(json.dumps(manifest,indent=2)+'\n');temporary.replace(ROOT/'public/catalog-image-index.json')
    (CACHE/'failures.json').write_text(json.dumps(dict(details=detail_failures,styles=style_failures,images=image_failures,reasons=ERRORS),ensure_ascii=False,indent=2))
    log('COMPLETE',json.dumps(manifest))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--workers',type=int,default=8);p.add_argument('--image-workers',type=int,default=16);p.add_argument('--seed-index');p.add_argument('--reuse-gallery-snapshot',action='store_true');p.add_argument('--shard-size',type=int,default=250);p.add_argument('--gallery-only',action='store_true');p.add_argument('--limit',type=int,default=0);build(p.parse_args())
