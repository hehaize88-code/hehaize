import asyncio,aiohttp,re,json,os,time,urllib.request
# Refresh the authoritative source sitemap before a rebuild.
with urllib.request.urlopen("https://cnbuycha.com/sitemap.xml",timeout=30) as r:
 open("/tmp/cnsitemap.xml","wb").write(r.read())
os.makedirs("/tmp/litcrawl",exist_ok=True)
from urllib.parse import urlsplit,urljoin
from html import unescape
paths=[urlsplit(x).path for x in re.findall(r'<loc>([^<]+\.html)</loc>',open('/tmp/cnsitemap.xml').read())]
sem=asyncio.Semaphore(3);out=[];errors=[];done=0;cooldown=0
async def one(session,path):
 global done,cooldown
 fn='/tmp/litcrawl/'+path.split('/')[-1]
 try:
  async with sem:
   if os.path.exists(fn):s=open(fn).read()
   else:
    for attempt in range(4):
     wait=cooldown-time.monotonic()
     if wait>0:await asyncio.sleep(wait)
     await asyncio.sleep(0.6)
     async with session.get('https://cnbuycha.com'+path) as r:
      if r.status==429:
       cooldown=max(cooldown,time.monotonic()+max(60,int(r.headers.get('Retry-After','60'))))
       if attempt==3:raise Exception('429')
       continue
      if r.status!=200:raise Exception(str(r.status))
      s=await r.text()
      break
    open(fn,'w').write(s)
  h=re.search(r'<h1[^>]*>(.*?)</h1>',s,re.S);id=re.search(r'class="product-id">ID: (\d+)',s)
  # Only the product section, never related-product cards or platform icons.
  section=s.split('<section class="related')[0].split('class="product-gallery"')[-1].split('<article')[0]
  imgs=list(dict.fromkeys(urljoin('https://cnbuycha.com',unescape(x)) for x in re.findall(r'<img[^>]+src="([^"]+)"',section)))
  out.append({'path':path,'name':unescape(h[1]) if h else '', 'id':id[1] if id else '', 'images':imgs})
 except Exception as e:errors.append([path,str(e)])
 done+=1
 if done%100==0:print(json.dumps({'done':done,'total':len(paths),'images':sum(len(x['images']) for x in out),'errors':len(errors)}),flush=True)
async def main():
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=45),trust_env=True) as session:
  await asyncio.gather(*(one(session,p) for p in paths))
 json.dump({'products':out,'errors':errors,'total':len(paths)},open('/tmp/lit-source-manifest.json','w'))
 print('DONE',len(out),len(errors),flush=True)
asyncio.run(main())
