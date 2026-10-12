import re,json,subprocess,concurrent.futures,pathlib,math,io,time,os,warnings,hashlib
warnings.filterwarnings('ignore',category=DeprecationWarning)
from html import unescape
from PIL import Image,ImageOps
root=pathlib.Path(__file__).resolve().parents[1]
out=root/'public'
cache=root/'.cache/image-index';cache.mkdir(parents=True,exist_ok=True)
def fetch(url,path):
 if path.exists() and path.stat().st_size>100 and (path.suffix!='.html' or os.environ.get('INDEX_CACHED_ONLY')=='1'):return path.read_bytes()
 if os.environ.get('INDEX_CACHED_ONLY')=='1':return None
 r=subprocess.run(['curl','-fLsS','--max-time','35','--retry','1',url,'-o',str(path)],capture_output=True)
 if r.returncode:return None
 return path.read_bytes()
def parse(s):
 rows=[]
 for b in re.findall(r'<article class="product-card[^>]*>(.*?)</article>',s,re.S):
  def find(p):
   m=re.search(p,b,re.S);return unescape(m.group(1)) if m else ''
  rows.append(dict(path=find(r'<a href="([^"]+)'),title=find(r'<h3>(.*?)</h3>'),image=find(r'<img src="([^"]+)'),price=find(r'data-currency="USD"[^>]*>([\d.]+)')))
 return rows
first_bytes=fetch('https://cnbuycha.com/AllProducts/',cache/'page-1.html')
if not first_bytes:raise RuntimeError('Source catalogue unavailable; existing index was not changed')
first=first_bytes.decode()
total=int(re.search(r'<div class="results-summary">([\d,]+) products',first).group(1).replace(',',''));pages=math.ceil(total/60)
print('pages',pages,flush=True)
def page(n):
 b=fetch('https://cnbuycha.com/AllProducts/?page='+str(n),cache/f'page-{n}.html')
 if not b:raise RuntimeError('Page failed '+str(n))
 return parse(b.decode())
rows=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 for result in ex.map(page,range(1,pages+1)):rows+=result
rows=list({r['path']:r for r in rows}.values());(root/'live-catalog.json').write_text(json.dumps(rows))
print('catalog products',len(rows),flush=True)
# Low-resolution RGB and difference hash descriptors: same source photos, no third-party catalogue.
existing=json.loads((out/'catalog-image-index.json').read_text()) if (out/'catalog-image-index.json').exists() else {}
previous={r['path']:r for r in existing.get('products',[])}
def index(r):
 old=previous.get(r['path']);absolute=lambda u:u if u.startswith('https:') else 'https://cnbuycha.com'+u
 if old and absolute(old['image'])==absolute(r['image']) and 'cells' in old:return {**old,**r}
 id=re.search(r'(\d+)\.html',r['path']).group(1)
 url=r['image'] if r['image'].startswith('https://') else 'https://cnbuycha.com'+r['image']
 b=fetch(url,cache/(hashlib.sha256(url.encode()).hexdigest()+'.img'))
 try:
  im=ImageOps.exif_transpose(Image.open(io.BytesIO(b))).convert('RGB')
  rgb=list(im.resize((8,8),Image.Resampling.BILINEAR).getdata());colors=[round(sum(p[c] for p in rgb)/64) for c in range(3)]
  pix=list(im.resize((9,8),Image.Resampling.BILINEAR).convert('L').getdata())
  bits=['1' if pix[y*9+x]>pix[y*9+x+1] else '0' for y in range(8) for x in range(8)]
  # 4x4 color cells provide a small, interpretable visual fingerprint.
  cells=[int(c) for p in im.resize((4,4),Image.Resampling.BILINEAR).getdata() for c in p]
  return {**r,'hash':''.join(bits),'colors':colors,'cells':cells}
 except Exception:return None
indexed=[];failed=[];start=time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
 for i,res in enumerate(ex.map(index,rows),1):
  if res:indexed.append(res)
  else:failed.append(rows[i-1]['path'])
  if i%100==0:print('indexed',i,'/',len(rows),'ok',len(indexed),'seconds',round(time.time()-start),flush=True)
  if i%400==0:(root/'index-checkpoint.json').write_text(json.dumps(indexed))
payload=dict(source='https://cnbuycha.com',updatedAt=time.strftime('%Y-%m-%d',time.gmtime()),catalogCount=len(rows),indexedCount=len(indexed),products=indexed)
if len(indexed)<len(rows)*.95:raise RuntimeError('Less than 95% image coverage; existing index was not changed')
target=out/'catalog-image-index.json'
temporary=target.with_suffix('.tmp')
temporary.write_text(json.dumps(payload,separators=(',',':')))
temporary.replace(target)
(root/'index-failures.json').write_text(json.dumps(failed));print('finished',len(indexed),'failed',len(failed),flush=True)
