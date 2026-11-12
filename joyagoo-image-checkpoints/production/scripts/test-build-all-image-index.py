"""Offline regression: gallery + style + seller, incremental additions, stale sources."""
import hashlib,importlib.util,io,json,pathlib,subprocess,sys,tempfile,time
from PIL import Image
SCRIPT=pathlib.Path(__file__).with_name('build-all-image-index.py')
spec=importlib.util.spec_from_file_location('index_builder',SCRIPT);builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
def sha(s):return hashlib.sha256(s.encode()).hexdigest()
def encode(data):return json.dumps(data,separators=(',',':')).encode()
with tempfile.TemporaryDirectory() as temporary:
 root=pathlib.Path(temporary);cache=root/'cache';out=root/'public';html=cache/('html-'+time.strftime('%Y-%m-%d',time.gmtime()));html.mkdir(parents=True);(cache/'descriptors-area-v2').mkdir();(out/'catalog-image-index').mkdir(parents=True)
 urls=['https://cnbuycha.com/media/products/1/cover.jpg','https://cnbuycha.com/media/products/1/side.jpg','https://si.geilicdn.com/style.jpg','https://si.geilicdn.com/seller.jpg','https://cnbuycha.com/media/products/2/cover.jpg']
 descriptors={}
 for i,u in enumerate(urls):
  im=Image.new('RGBA',(18,16),(20+i*40,70,120,255));buf=io.BytesIO();im.save(buf,format='PNG');d=builder.descriptor(buf.getvalue());assert builder.valid_descriptor(d);descriptors[u]=d;(cache/'descriptors-area-v2'/(sha(u)+'.json')).write_bytes(encode(d))
 def cached(u,value):
  (html/(sha(u)+'.bin')).write_bytes(value.encode() if isinstance(value,str) else encode(value))
 def product(path,source_id,title,index):
  image=urls[0] if index==1 else urls[4]
  return f'<article class="product-card"><a href="{path}"><img src="{image}"></a><h3>{title}</h3><span data-currency="USD">12.00</span></article>'
 def catalogue(two=False):
  cards=product('/sneakers/1.html','12345678','Example shoe',1)
  if two:cards+=product('/pants/2.html','22345678','Example trousers',2)
  value=f'<div class="results-summary">{2 if two else 1} products</div>'+cards
  cached(builder.SOURCE+'/AllProducts/',value);cached(builder.SOURCE+'/AllProducts/?page=1',value)
 catalogue()
 cached(builder.SOURCE+'/sneakers/1.html','<section class="product-detail"><h1>Example shoe</h1><meta itemprop="price" content="12.00"><a href="https://weidian.com/item.html?itemID=12345678">Original</a><img itemprop="image" src="'+urls[0]+'"><img itemprop="image" src="'+urls[1]+'"></section>')
 cached(builder.OPTIONS_SOURCE+'12345678',{'sourceId':'12345678','groups':[{'name':'Color','values':[{'id':'11','label':'Blue','image':urls[2]}]}],'images':[urls[3]]})
 seed={'path':'/sneakers/1.html','title':'Example shoe','price':'12.00','sourceId':'12345678','image':urls[0],'imageIndex':0,'kind':'gallery',**descriptors[urls[0]]};body=encode({'products':[seed]});digest=hashlib.sha256(body).hexdigest();old_url='/catalog-image-index/gallery-seed-'+digest[:12]+'.json';(out/old_url.lstrip('/')).write_bytes(body)
 manifest=out/'catalog-image-index.json';manifest.write_bytes(encode({'version':2,'descriptorAlgorithm':'area-v2','updatedAt':time.strftime('%Y-%m-%d',time.gmtime()),'shards':[{'url':old_url,'count':1,'bytes':len(body),'sha256':digest}]}))
 command=[sys.executable,str(SCRIPT),'--offline','--cache',str(cache),'--output',str(out),'--seed-index',str(manifest)]
 def run():
  r=subprocess.run(command,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
  data=json.loads(manifest.read_text());assert old_url in [s['url'] for s in data['shards']]
  for s in data['shards']:
   raw=(out/s['url'].lstrip('/')).read_bytes();assert hashlib.sha256(raw).hexdigest()==s['sha256'] and len(json.loads(raw)['products'])==s['count']
  return data
 first=run();assert (first['indexedImageCount'],first['galleryImageCount'],first['styleImageCount'],first['sellerImageCount'])==(4,2,1,1),first
 catalogue(True)
 cached(builder.SOURCE+'/pants/2.html','<section class="product-detail"><h1>Example trousers</h1><meta itemprop="price" content="12.00"><a href="https://weidian.com/item.html?itemID=22345678">Original</a><img itemprop="image" src="'+urls[4]+'"></section>')
 cached(builder.OPTIONS_SOURCE+'22345678',{'sourceId':'22345678','groups':[],'images':[]})
 second=run();assert second['catalogCount']==2 and second['indexedProductCount']==2 and second['indexedImageCount']==5,second
 (html/(sha(builder.OPTIONS_SOURCE+'12345678')+'.bin')).unlink()
 stale=run();assert stale['indexedImageCount']==5 and stale['failedStylePageCount']==1 and stale['staleSourcePageCount']==1,stale
 try:builder.parse_options_api({'sourceId':'999','groups':[]},'12345678');raise AssertionError('Identity mismatch was accepted')
 except ValueError:pass
 transparent=Image.new('RGBA',(9,8),(0,0,0,0));buf=io.BytesIO();transparent.save(buf,format='PNG');assert builder.descriptor(buf.getvalue())['cells']==[255]*48
 from unittest.mock import patch
 from types import SimpleNamespace
 clock=[0.0];calls=[]
 def fake_get(*args,**kwargs):
  calls.append(clock[0]);status=429 if len(calls)==1 else 200
  return SimpleNamespace(status_code=status,headers={'Retry-After':'3'} if status==429 else {},content=b'ok',text='ok',is_success=status==200)
 builder.CACHE=cache/'retry-test';builder.OFFLINE=False;builder.BACKOFF.clear();builder.LAST_START.clear()
 with patch.object(builder,'session',lambda:SimpleNamespace(get=fake_get)),patch.object(builder.time,'monotonic',lambda:clock[0]),patch.object(builder.time,'sleep',lambda n:clock.__setitem__(0,clock[0]+n)):
  assert builder.fetch('https://si.geilicdn.com/retry.jpg','images')==b'ok'
 assert len(calls)==2 and calls[1]-calls[0]>=3,calls
 print('PASS: all image categories, unchanged shard hashes, incremental product, stale source recovery, identity validation, transparency, Retry-After; no network used.')
