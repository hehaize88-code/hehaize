"""Build disposable search fingerprints from cnbuycha and its linked public sellers.
No product database or copied product photos: only URLs and derived image signatures.
Checkpoint files stay in scratch. A previous same-source signature cache can be reused.
"""
import asyncio,subprocess,re,json,html,os,time,base64,io,gzip,hashlib,urllib.parse
from pathlib import Path
from PIL import Image,ImageOps
import numpy as np
ROOT=Path('/tmp/east-image-build');ROOT.mkdir(exist_ok=True)
SOURCE='https://cnbuycha.com'
async def fetch(url,timeout=22):
 p=await asyncio.create_subprocess_exec('curl','-fLsS','--max-time',str(timeout),url,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.DEVNULL)
 out,_=await p.communicate()
 if p.returncode:raise ValueError('fetch failed')
 return out
async def pool(items,n,fn):
 sem=asyncio.Semaphore(n)
 async def task(x):
  async with sem:return await fn(x)
 return await asyncio.gather(*(task(x) for x in items),return_exceptions=True)
def readmodel(s):
 m=re.search(r'id="__rocker-render-inject__"\s+data-obj="([^"]+)"',s)
 if not m:raise ValueError('seller data unavailable')
 return json.loads(html.unescape(m[1]))['result']['default_model']
def valid(u):return u.startswith(SOURCE+'/media/') or u.startswith(SOURCE+'/uploads/') or u.startswith('https://si.geilicdn.com/') or u.startswith('https://img.geilicdn.com/')
async def main():
 async def catalog(n):
  h=(await fetch(SOURCE+'/AllProducts/?page='+str(n))).decode()
  return re.findall(r'<article class="product-card[\s\S]*?</article>',h)
 first=(await fetch(SOURCE+'/AllProducts/?page=1')).decode();total=int(re.search(r'class="results-summary">([\d, ]+)',first)[1].replace(',','').strip())
 pages=await pool(range(1,(total+59)//60+1),2,catalog);paths={}
 for page in pages:
  if isinstance(page,Exception):continue
  for c in page:
   m=re.search(r'href="([^" ]+\.html)"',c);name=re.search(r'<h3>([^<]+)',c)
   if m and name:paths[m[1]]=html.unescape(html.unescape(name[1]))
 print(json.dumps({'phase':'catalog','total':total,'found':len(paths)}),flush=True)
 done=0
 async def product(item):
  nonlocal done
  path,name=item;dest=ROOT/(path.replace('/','_')+'.json')
  if dest.exists():return json.loads(dest.read_text())
  record={'path':path,'name':name,'images':[],'sourceOK':False,'sellerOK':False}
  try:
   h=(await fetch(SOURCE+path)).decode();area=h.split('<section class="product-list">')[0]
   sku=re.search(r'itemprop="sku" content="(\d+)"',area)
   urls=[html.unescape(u) for u in re.findall(r'<img[^>]+src="([^"]+)"',area)]
   for u in urls:
    if u.startswith('/'):u=SOURCE+u
    if valid(u):record['images'].append([u,'source'])
   record['sourceOK']=True
   if sku:
    record['sku']=sku[1];m=json.loads(await fetch('https://thor.weidian.com/detail/getItemInfo/1.0?param='+urllib.parse.quote(json.dumps({'vitemId':sku[1],'lang':'en','from':'h5'})),15))['result']['default_model']
    if str(m['item_info']['item_id'])!=sku[1]:raise ValueError('item mismatch')
    for u in m['item_info'].get('imgs',[]):
     if valid(u):record['images'].append([u,'gallery'])
    for a in m.get('sku_properties',{}).get('attr_list',[]):
     for v in a.get('attr_values',[]):
      if valid(v.get('img','')):record['images'].append([v['img'],'style'])
    record['sellerOK']=True
  except Exception:pass
  # Prefer style attribution when the same photo also appears in a gallery.
  record['images']=list({u:(u,k) for u,k in record['images']}.values())
  dest.write_text(json.dumps(record));done+=1
  if done%100==0:print(json.dumps({'phase':'metadata','done':done,'total':len(paths)}),flush=True)
  return record
 records=await pool(list(paths.items()),4,product)
 records=[r for r in records if isinstance(r,dict)]
 async def enrich(r):
  if r.get('sellerOK') or not r.get('sku'):return
  try:
   m=json.loads(await fetch('https://thor.weidian.com/detail/getItemInfo/1.0?param='+urllib.parse.quote(json.dumps({'vitemId':r['sku'],'lang':'en','from':'h5'})),20))['result']['default_model']
   if str(m['item_info']['item_id'])!=r['sku']:return
   for u in m['item_info'].get('imgs',[]):
    if valid(u):r['images'].append([u,'gallery'])
   for a in m.get('sku_properties',{}).get('attr_list',[]):
    for v in a.get('attr_values',[]):
     if valid(v.get('img','')):r['images'].append([v['img'],'style'])
   r['images']=list({u:(u,k) for u,k in r['images']}.values());r['sellerOK']=True
   (ROOT/(r['path'].replace('/','_')+'.json')).write_text(json.dumps(r))
  except Exception:pass
 await pool(records,24,enrich)

 (ROOT/'manifest.json').write_text(json.dumps({'total':total,'records':records}))
 print(json.dumps({'phase':'metadata-complete','products':len(records),'sourceOK':sum(r['sourceOK'] for r in records),'sellerOK':sum(r['sellerOK'] for r in records),'photos':sum(len(r['images']) for r in records)}),flush=True)
 # Reuse verified URL-keyed features from the user's existing same-source cache.
 cache={}
 seed=Path('/tmp/bbd-index.json')
 if seed.exists():
  for p in json.loads(seed.read_text())['items']:
   for e in p[2]:
    if valid(e[0]):
     raw=np.frombuffer(base64.b64decode(e[2]),dtype=np.uint8).reshape(8,8,3);small=np.round(raw.reshape(4,2,4,2,3).mean(axis=(1,3))).astype(np.uint8);cache[e[0]]=[e[0],e[1],base64.b64encode(small.tobytes()).decode()]
 def signature(data):
  im=ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB')
  rgb=np.asarray(im.resize((8,8),Image.Resampling.BILINEAR),dtype=np.uint8)
  small=np.floor((rgb>>3).reshape(4,2,4,2,3).mean(axis=(1,3))+.5).astype(np.uint8);sig=base64.b64encode(small.tobytes()).decode()
  a=np.asarray(im.resize((9,8),Image.Resampling.BILINEAR),dtype=float);gray=a[:,:,0]*.299+a[:,:,1]*.587+a[:,:,2]*.114
  bits=''.join('1' if x else '0' for x in (gray[:,1:]>gray[:,:-1]).flatten());return format(int(bits,2),'016x'),sig
 urls=list(dict.fromkeys(u for r in records for u,k in r['images']));done=0;failed=[]
 async def photo(u):
  nonlocal done
  if u in cache:return
  file=ROOT/(hashlib.sha256(u.encode()).hexdigest()+'.sig')
  try:
   if file.exists():entry=json.loads(file.read_text())
   else:
    data=await fetch(u+(('&' if '?' in u else '?')+'w=64&h=64' if 'geilicdn.com/' in u else ''),15);h,s=signature(data);entry=[u,h,s];file.write_text(json.dumps(entry))
   cache[u]=entry
  except Exception:failed.append(u)
  done+=1
  if done%250==0:print(json.dumps({'phase':'fingerprints','new':done,'cached':len(cache),'needed':len(urls),'failed':len(failed)}),flush=True)
 await pool(urls,8,photo)
 items=[];counts={'source':0,'gallery':0,'style':0}
 for r in records:
  entries=[]
  for u,kind in r['images']:
   if u in cache:entries.append(cache[u]+[kind]);counts[kind]+=1
  items.append([r['path'],r['name'],entries])
 out=Path('image-cache');out.mkdir(exist_ok=True)
 shards=[]
 for i in range(0,len(items),200):
  key=str(i//200);raw=json.dumps(items[i:i+200],separators=(',',':'),ensure_ascii=False).encode();data=gzip.compress(raw,compresslevel=9);(out/(key+'.json.gz')).write_bytes(data);shards.append({'id':key,'products':len(items[i:i+200]),'bytes':len(data)})
 meta={'source':SOURCE,'total':total,'products':len(items),'images':sum(len(p[2]) for p in items),'imageKinds':counts,'sourceAudited':sum(r['sourceOK'] for r in records),'sellerAudited':sum(r['sellerOK'] for r in records),'missingImages':len(failed),'updated':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'shards':shards}
 (out/'names.json').write_text(json.dumps([[p[0],p[1]] for p in items]));(out/'manifest.json').write_text(json.dumps(meta));(ROOT/'failed-images.json').write_text(json.dumps(failed));print(json.dumps(meta),flush=True)
asyncio.run(main())
