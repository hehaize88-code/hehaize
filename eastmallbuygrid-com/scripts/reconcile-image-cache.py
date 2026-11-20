"""Throttled same-source refresh with reusable HTTP connections and derived-photo cache."""
import asyncio,json,glob,hashlib,base64,io,time,re,html,urllib.parse,sys
from pathlib import Path
import httpx,numpy as np
from PIL import Image,ImageOps
ROOT=Path('/tmp/east-image-build');SOURCE='https://cnbuycha.com'
seed=json.load(open('/tmp/bbd-index.json'));known={e[0] for p in seed['items'] for e in p[2]};paths={p[0]:p[1] for p in seed['items']}
for f in ROOT.glob('_*.json'):
 r=json.loads(f.read_text());paths[r['path']]=r['name']
stats={'metadata':0,'source':0,'seller':0,'photos':0,'failedPhotos':0,'sourceFailures':0,'sellerFailures':0};seen=set();queue=asyncio.Queue(maxsize=1000)
class Pace:
 def __init__(self,interval):self.interval=interval;self.next=0;self.lock=asyncio.Lock()
 async def wait(self):
  async with self.lock:
   now=time.monotonic();await asyncio.sleep(max(0,self.next-now));self.next=time.monotonic()+self.interval
sourcePace=Pace(.65);sellerPace=Pace(.25)
def valid(u):return u.startswith(SOURCE+'/media/') or u.startswith(SOURCE+'/uploads/') or u.startswith('https://si.geilicdn.com/') or u.startswith('https://img.geilicdn.com/')
async def get(client,url,pace=None):
 if pace:await pace.wait()
 r=await client.get(url)
 if r.status_code==429:
  delay=min(120,max(30,int(r.headers.get('retry-after','60'))));print(json.dumps({'rateLimited':urllib.parse.urlsplit(url).hostname,'pause':delay}),flush=True)
  if pace:pace.next=max(pace.next,time.monotonic()+delay)
  raise ValueError('rate limited')
 r.raise_for_status();return r
async def enqueue(r):
 for u,k in r['images']:
  if u in seen or u in known:continue
  seen.add(u)
  if not (ROOT/(hashlib.sha256(u.encode()).hexdigest()+'.sig')).exists():await queue.put(u)
async def product(client,path,name):
 dest=ROOT/(path.replace('/','_')+'.json');r=json.loads(dest.read_text()) if dest.exists() else {'path':path,'name':name,'images':[],'sourceOK':False,'sellerOK':False}
 if not r['sourceOK']:
  try:
   h=(await get(client,SOURCE+path,sourcePace)).text;area=h.split('<section class="product-list">')[0];sku=re.search(r'itemprop="sku" content="(\d+)"',area)
   if not sku:raise ValueError('No product ID')
   r['sku']=sku[1];r['name']=html.unescape(re.search(r'<h1[^>]*>([^<]+)',area)[1]);r['images']=[]
   for u in re.findall(r'<img[^>]+src="([^"]+)"',area):
    u=html.unescape(u);u=SOURCE+u if u.startswith('/') else u
    if valid(u):r['images'].append([u,'source'])
   r['sourceOK']=True
  except Exception:stats['sourceFailures']+=1
 if r['sourceOK'] and not r['sellerOK'] and r.get('sku'):
  try:
   url='https://thor.weidian.com/detail/getItemInfo/1.0?param='+urllib.parse.quote(json.dumps({'vitemId':r['sku'],'lang':'en','from':'h5'}));j=(await get(client,url,sellerPace)).json();m=j['result']['default_model']
   if str(m['item_info']['item_id'])!=r['sku']:raise ValueError('Wrong product')
   for u in m['item_info'].get('imgs',[]):
    if valid(u):r['images'].append([u,'gallery'])
   for a in m.get('sku_properties',{}).get('attr_list',[]):
    for v in a.get('attr_values',[]):
     if valid(v.get('img','')):r['images'].append([v['img'],'style'])
   r['sellerOK']=True
  except Exception:stats['sellerFailures']+=1
 r['images']=list({u:[u,k] for u,k in r['images']}.values());dest.write_text(json.dumps(r));stats['metadata']+=1;stats['source']+=r['sourceOK'];stats['seller']+=r['sellerOK'];await enqueue(r)
async def imageWorker(client):
 while True:
  u=await queue.get()
  if u is None:queue.task_done();return
  try:
   dest=ROOT/(hashlib.sha256(u.encode()).hexdigest()+'.sig')
   if not dest.exists():
    url=u+('&' if '?' in u else '?')+'w=64&h=64' if 'geilicdn.com/' in u else u
    response=await get(client,url,sourcePace if u.startswith(SOURCE) else None)
    im=ImageOps.exif_transpose(Image.open(io.BytesIO(response.content))).convert('RGB');rgb=np.asarray(im.resize((8,8),Image.Resampling.BILINEAR),dtype=np.uint8);small=np.floor((rgb>>3).reshape(4,2,4,2,3).mean(axis=(1,3))+.5).astype(np.uint8);a=np.asarray(im.resize((9,8),Image.Resampling.BILINEAR),dtype=float);gray=a[:,:,0]*.299+a[:,:,1]*.587+a[:,:,2]*.114;bits=''.join('1' if x else '0' for x in (gray[:,1:]>gray[:,:-1]).flatten());dest.write_text(json.dumps([u,format(int(bits,2),'016x'),base64.b64encode(small.tobytes()).decode()]));stats['photos']+=1
  except Exception:stats['failedPhotos']+=1
  finally:queue.task_done()
async def progress():
 while True:
  print(json.dumps({**stats,'total':len(paths),'photoQueue':queue.qsize()}),flush=True);await asyncio.sleep(30)
async def main():
 async with httpx.AsyncClient(timeout=25,follow_redirects=True,limits=httpx.Limits(max_connections=8,max_keepalive_connections=8)) as metaClient,httpx.AsyncClient(timeout=20,follow_redirects=True,limits=httpx.Limits(max_connections=16,max_keepalive_connections=16)) as imageClient:
  workers=[asyncio.create_task(imageWorker(imageClient)) for _ in range(16)];report=asyncio.create_task(progress());sem=asyncio.Semaphore(6)
  async def run(path,name):
   async with sem:await product(metaClient,path,name)
  await asyncio.gather(*(run(path,name) for path,name in paths.items()));await queue.join()
  for _ in workers:await queue.put(None)
  await asyncio.gather(*workers);report.cancel();print(json.dumps({'finished':True,**stats}),flush=True)
asyncio.run(main())
