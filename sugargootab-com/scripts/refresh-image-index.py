import json,concurrent.futures,requests,re,io,time
from pathlib import Path
from bs4 import BeautifulSoup
from PIL import Image,ImageStat
root=Path(__file__).resolve().parents[1]; dest=root/'public/assets/catalog-image-index.json'
old=json.loads(dest.read_text()); known={p['path']:p for p in old['products']}
def getpage(n):
 for attempt in range(3):
  try:
   r=requests.get(f'https://cnbuycha.com/AllProducts/?sort=new&page={n}',timeout=25);r.raise_for_status();d=BeautifulSoup(r.text,'html.parser'); summary=d.select_one('.results-summary');total=int(re.sub(r'\D','',summary.text));items=[]
   for c in d.select('article.product-card'):
    a=c.select_one('a.product-title');im=c.select_one('img');price=c.select_one('.product-price')
    if a and im:items.append(dict(path=a['href'],title=a.get_text(strip=True),image=im.get('data-src')or im.get('src'),price=price.get_text(strip=True)))
   return total,items
  except Exception:
   if attempt==2:raise
first,products=getpage(1)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
 for total,items in ex.map(getpage,range(2,(first+59)//60+1)):products+=items
products=list({p['path']:p for p in products}.values());print('Catalog',first,'rows',len(products),flush=True)
if len(products)!=first:raise Exception('Incomplete source snapshot')
def index(p):
 previous=known.get(p['path'])
 if previous and previous['image'].split('?')[0]==p['image'].split('?')[0]:return {**previous,**p}
 try:
  r=requests.get('https://cnbuycha.com'+p['image'] if p['image'].startswith('/')else p['image'],timeout=25);r.raise_for_status();im=Image.open(io.BytesIO(r.content)).convert('RGB');g=im.resize((9,8),Image.Resampling.LANCZOS).convert('L');a=list(g.getdata());h=''.join('1' if a[y*9+x]>a[y*9+x+1] else '0' for y in range(8)for x in range(8));cells=[v for rgb in im.resize((4,4),Image.Resampling.LANCZOS).getdata()for v in rgb];return {**p,'hash':h,'cells':cells}
 except Exception:return None
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as ex:results=list(ex.map(index,products))
rows=[p for p in results if p]; data=dict(source='https://cnbuycha.com',updatedAt=time.strftime('%Y-%m-%d',time.gmtime()),catalogCount=first,indexedCount=len(rows),products=rows)
dest.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')));print('Indexed',len(rows),'missing',first-len(rows),flush=True)
