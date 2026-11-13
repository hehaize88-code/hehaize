import asyncio,aiohttp,re,json,os,io,time
from html import unescape
from urllib.parse import urljoin
from PIL import Image,ImageOps
import numpy as np
os.makedirs('/tmp/litprints',exist_ok=True)
# Use existing source pages as they arrive. Derived fingerprints only; never a second catalogue.
sem=asyncio.Semaphore(8);seen=set();out=[];errors=[];done=0;cooldown=0
async def process(session,path):
 global done
 try:
  s=open('/tmp/litcrawl/'+path).read();h=re.search(r'<h1[^>]*>(.*?)</h1>',s,re.S)
  canon=re.search(r'<link rel="canonical" href="https://cnbuycha.com([^"]+)"',s)
  sec=s.split('class="product-gallery"')[-1].split('<article')[0]
  urls=list(dict.fromkeys(urljoin('https://cnbuycha.com',unescape(x)) for x in re.findall(r'<img[^>]+src="([^"]+)"',sec)))
  urls=[x for x in urls if '/uploads/' in x or '/products/' in x or 'geilicdn.com/' in x or 'alicdn.com/' in x]
  entries=[]
  for ix,url in enumerate(urls):
   cache='/tmp/litprints/'+path+'.'+str(ix)+'.json'
   if os.path.exists(cache):entries.append(json.load(open(cache)));continue
   try:
    global cooldown
    for attempt in range(4):
     async with sem:
      wait=cooldown-time.monotonic()
      if wait>0:await asyncio.sleep(wait)
      await asyncio.sleep(0.25)
      async with session.get(url) as r:
       if r.status==429:
        cooldown=max(cooldown,time.monotonic()+max(60,int(r.headers.get('Retry-After','60'))))
        if attempt==3:raise Exception('429')
        continue
       if r.status!=200:raise Exception(str(r.status))
       b=await r.read()
       break
    img=ImageOps.exif_transpose(Image.open(io.BytesIO(b))).convert('RGB')
    # 64 cell RGB signature plus 64-bit gradient hash. Multi-view matching.
    a=np.asarray(img.resize((8,8),Image.Resampling.BILINEAR)).astype(int)
    g=np.asarray(img.convert('L').resize((9,8),Image.Resampling.BILINEAR)).astype(int)
    bits=(g[:,1:]>g[:,:-1]).ravel();dh=''.join(format(sum(int(bits[i+j])<<(3-j) for j in range(4)),'x') for i in range(0,64,4))
    sig=[int(x)//8 for x in a.ravel()]
    ent=[url,dh,sig];json.dump(ent,open(cache,'w'));entries.append(ent)
   except Exception as e:errors.append([url,str(e)])
  out.append([canon[1] if canon else '',unescape(h[1]) if h else '',entries])
 except Exception as e:errors.append([path,str(e)])
 done+=1
 if done%100==0:print(json.dumps({'processed':done,'images':sum(len(x[2]) for x in out),'errors':len(errors)}),flush=True)
async def main():
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=35),trust_env=True) as session:
  while True:
   files=[p for p in os.listdir('/tmp/litcrawl') if p.endswith('.html') and p not in seen];seen.update(files)
   for i in range(0,len(files),80):await asyncio.gather(*(process(session,p) for p in files[i:i+80]))
   if os.path.exists('/tmp/lit-source-manifest.json') and len(seen)>=len(json.load(open('/tmp/lit-source-manifest.json'))['products']):break
   await asyncio.sleep(2)
 json.dump({'items':out,'errors':errors,'updated':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())},open('/tmp/lit-fingerprints.json','w'))
 print('FINISHED',len(out),len(errors),flush=True)
asyncio.run(main())
