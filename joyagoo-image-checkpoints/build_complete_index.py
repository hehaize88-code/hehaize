#!/usr/bin/env python3
"""Build the cnbuycha gallery + publicly available Weidian style image index.
No database. Resumable JSON checkpoints, immutable SHA-256 shards, truthful coverage.
"""
import argparse,concurrent.futures,hashlib,io,json,math,os,pathlib,threading,time,urllib.error,urllib.parse,urllib.request
from PIL import Image,ImageStat
ROOT=pathlib.Path(__file__).resolve().parent
CACHE=ROOT/'cache';PUBLIC=ROOT/'public';CHECKPOINT=ROOT/'checkpoints'
for p in [CACHE,PUBLIC,CHECKPOINT,CACHE/'options',CACHE/'descriptors']:p.mkdir(parents=True,exist_ok=True)
lock=threading.Lock();host_deadlines={};stats={'options':0,'images':0,'failed_images':0};stage='starting'

def save(p,data):
 p=pathlib.Path(p);p.parent.mkdir(parents=True,exist_ok=True);tmp=p.with_suffix(p.suffix+'.tmp');tmp.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')));tmp.replace(p)
def get(url,timeout=25,retries=2):
 host=urllib.parse.urlsplit(url).netloc
 for attempt in range(retries+1):
  while True:
   with lock: delay=host_deadlines.get(host,0)-time.time()
   if delay<=0:break
   time.sleep(min(delay,1))
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept':'*/*'}),timeout=timeout) as r:return r.read()
  except urllib.error.HTTPError as e:
   delay=float(e.headers.get('Retry-After','0')) if str(e.headers.get('Retry-After','0')).isdigit() else 0
   if e.code==429:
    delay=max(delay,30)
    with lock:host_deadlines[host]=max(host_deadlines.get(host,0),time.time()+delay)
   if attempt>=retries:raise
   # Respect product-specific 503 Retry-After without stopping unrelated products.
   if e.code==503:time.sleep(min(max(delay,2),300))
   elif e.code!=429:time.sleep(2*(attempt+1))
  except Exception:
   if attempt>=retries:raise
   time.sleep(2*(attempt+1))

def bootstrap():
 manifest=json.loads((ROOT/'manifest.json').read_text()); records=[]
 def shard(s):
  p=PUBLIC/s['url'].lstrip('/')
  if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest()!=s['sha256']:
   b=get('https://joyagoochina.org'+s['url']);assert hashlib.sha256(b).hexdigest()==s['sha256'];p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  return json.loads(p.read_text())['products']
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
  for data in pool.map(shard,manifest['shards']):records.extend(data)
 assert len(records)==manifest['indexedImageCount']
 products={}
 for r in records:
  products.setdefault(r['path'],{k:r[k] for k in ['path','title','price','sourceId']})
  p=CACHE/'descriptors'/(hashlib.sha256(r['image'].encode()).hexdigest()+'.json')
  if not p.exists():save(p,{k:r[k] for k in ['hash','cells']})
 save(CHECKPOINT/'products.json',list(products.values()))
 return manifest,records,list(products.values())

def styles_for(p):
 f=CACHE/'options'/(p['sourceId']+'.json')
 if f.exists():
  x=json.loads(f.read_text())
  if not x.get('error'):return x
 try:
  data=json.loads(get('https://joyagoochina.org/api/product-options?id='+p['sourceId'],timeout=25,retries=1));assert str(data.get('sourceId'))==p['sourceId']
  groups=data.get('groups',[]);styles=[]
  for group in groups:
   for v in group.get('values',[]):
    image=v.get('image','')
    if image.startswith('https://'):
     styles.append({**p,'image':image,'kind':'style','styleId':str(v['id']),'styleLabel':v.get('label','')})
  result={'product':p,'styles':styles}
 except Exception as e:result={'product':p,'styles':[],'error':str(e)}
 save(f,result)
 with lock:stats['options']+=1
 return result

def fingerprint(raw):
 im=Image.open(io.BytesIO(raw));im.load()
 if im.mode=='RGBA':
  bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im);im=bg.convert('RGB')
 else:im=im.convert('RGB')
 w,h=im.size
 def grid(cols,rows):
  out=[]
  for y in range(rows):
   for x in range(cols):
    box=(math.floor(x*w/cols),math.floor(y*h/rows),max(math.floor(x*w/cols)+1,math.floor((x+1)*w/cols)),max(math.floor(y*h/rows)+1,math.floor((y+1)*h/rows)))
    out.append([math.floor(n+.5) for n in ImageStat.Stat(im.crop(box)).mean[:3]])
  return out
 gray=[.299*r+.587*g+.114*b for r,g,b in grid(9,8)]
 return {'hash':''.join('1' if gray[y*9+x]>gray[y*9+x+1] else '0' for y in range(8) for x in range(8)),'cells':[v for rgb in grid(4,4) for v in rgb]}

def descriptor(url):
 p=CACHE/'descriptors'/(hashlib.sha256(url.encode()).hexdigest()+'.json')
 if p.exists():return url,json.loads(p.read_text())
 fetch_url=url
 if 'geilicdn.com/' in url:
  bare=url.split('?')[0]
  if bare.lower().endswith(('.jpg','.jpeg','.png')):fetch_url=bare+'.webp?w=128&h=128'
  elif bare.lower().endswith('.webp'):fetch_url=bare+'?w=128&h=128'
 try:
  d=fingerprint(get(fetch_url,timeout=25,retries=2));save(p,d)
  with lock:stats['images']+=1
  return url,d
 except Exception as e:
  with lock:stats['failed_images']+=1
  return url,{'error':str(e)}

def write_checkpoint(records,batch):
 # Complete descriptor batches are durable-upload candidates; immutable file names.
 for i in range(0,len(records),250):
  b=json.dumps({'products':records[i:i+250]},ensure_ascii=False,separators=(',',':')).encode();sha=hashlib.sha256(b).hexdigest();p=CHECKPOINT/f'descriptors-{batch}-{i//250:03d}-{sha[:12]}.json';p.write_bytes(b)

def main():
 global stage
 stage='bootstrap';manifest,galleries,products=bootstrap();print('BASE',len(galleries),len(products),flush=True)
 stage='options+images';options=[];styles=[];unique=set();desc={};ready=[];batch=0;submitted=0
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as options_pool,concurrent.futures.ThreadPoolExecutor(max_workers=48) as image_pool:
  option_jobs={options_pool.submit(styles_for,p) for p in products};image_jobs={}
  while option_jobs or image_jobs:
   done,_=concurrent.futures.wait(option_jobs|image_jobs.keys(),timeout=2,return_when=concurrent.futures.FIRST_COMPLETED)
   for f in done:
    if f in option_jobs:
     option_jobs.remove(f);x=f.result();options.append(x);styles.extend(x['styles'])
     for r in x['styles']:
      u=r['image']
      if u not in unique:unique.add(u);image_jobs[image_pool.submit(descriptor,u)]=u;submitted+=1
     if len(options)%100==0:
      print('OPTIONS',len(options),'styles',len(styles),'unique',len(unique),'failures',sum(bool(x.get('error')) for x in options),flush=True)
      save(CHECKPOINT/f'options-{len(options)//100-1:03d}.json',options[-100:])
    else:
     del image_jobs[f];u,d=f.result();desc[u]=d
     if not d.get('error'):ready.append({'image':u,**d})
     if len(desc)%500==0:print('IMAGES',len(desc),'/',submitted,'failed',sum(bool(d.get('error')) for d in desc.values()),flush=True)
     if len(ready)>=2000:write_checkpoint(ready,batch);ready=[];batch+=1
 if len(options)%100:save(CHECKPOINT/f'options-{len(options)//100:03d}.json',options[-(len(options)%100):])
 save(CACHE/'options-all.json',options)
 print('DISCOVERY',len(styles),len(unique),'unavailable',sum(bool(x.get('error')) for x in options),flush=True)
 if ready:write_checkpoint(ready,batch)
 records=galleries+[{**r,**desc[r['image']]} for r in styles if not desc[r['image']].get('error')]
 seen=set();records=[r for r in records if not ((r['path'],r['image']) in seen or seen.add((r['path'],r['image'])))]
 stage='output';shards=[]
 out=PUBLIC/'catalog-image-index';out.mkdir(exist_ok=True)
 for i in range(0,len(records),250):
  body=json.dumps({'products':records[i:i+250]},ensure_ascii=False,separators=(',',':')).encode();sha=hashlib.sha256(body).hexdigest();name=f'part-{i//250:03d}-{sha[:12]}.json';(out/name).write_bytes(body);shards.append({'url':'/catalog-image-index/'+name,'count':len(records[i:i+250]),'bytes':len(body),'sha256':sha})
 failed=[{'image':u,**d} for u,d in desc.items() if d.get('error')]
 new={**{k:v for k,v in manifest.items() if k!='shards'},'updatedAt':time.strftime('%Y-%m-%d',time.gmtime()),'indexedImageCount':len(records),'indexedProductCount':len(set(r['path'] for r in records)),'indexedCount':len(products),'discoveredImageCount':len(set((r['path'],r['image']) for r in galleries+styles)),'uniqueImageCount':len(set(r['image'] for r in galleries+styles)),'indexedUniqueImageCount':len(set(r['image'] for r in records)),'galleryImageCount':len(galleries),'styleImageCount':sum(r['kind']=='style' for r in records),'includesStyles':True,'failedDetailCount':0,'failedStylePageCount':sum(bool(x.get('error')) for x in options),'failedImageCount':len(failed),'unattemptedStylePageCount':0,'shards':shards}
 save(PUBLIC/'catalog-image-index.json',new);save(CHECKPOINT/'coverage-report.json',{'manifest':{k:v for k,v in new.items() if k!='shards'},'unavailableProducts':[{**x['product'],'error':x['error']} for x in options if x.get('error')],'failedImages':failed})
 stage='complete';print('COMPLETE',json.dumps({k:v for k,v in new.items() if k!='shards'}),flush=True)
if __name__=='__main__':main()
