"""One-time editorial translation; never called by the website or build.
Uses the public translation endpoint used by googletrans; sends only authored
public editorial text. No user, account, or product data is transmitted.
Refuses missing segments and HTTP access/rate-limit errors. Output is committed.
"""
import json,re,time,hashlib,urllib.request,urllib.parse,urllib.error,concurrent.futures,threading,sys,os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
EN=ROOT/'src/content/editorial/en.json'
CACHE=Path(os.environ.get('KAKOBUY_TRANSLATION_CACHE',str(ROOT/'.cache/editorial-translation')))
CACHE.mkdir(parents=True,exist_ok=True)
LANGS='de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt'.split()
base=json.loads(EN.read_text());strings=[];paths=[]
skip={'slug','category','id'}
def collect(v,path=()):
 if isinstance(v,dict):
  for k,x in v.items():
   if k not in skip and not (k=='sources' and isinstance(x,list)):collect(x,path+(k,))
 elif isinstance(v,list):
  for i,x in enumerate(v):collect(x,path+(i,))
 elif isinstance(v,str):
  if v not in strings:strings.append(v)
  paths.append((path,strings.index(v)))
collect(base)
batches=[];cur=[];length=0
for i,s in enumerate(strings):
 if cur and length+len(s)+12>3500:batches.append(cur);cur=[];length=0
 cur.append((i,s));length+=len(s)+12
if cur:batches.append(cur)
stop=threading.Event();lock=threading.Lock()
def translate(lang,batch):
 text='\n'.join(f'[[{i:04d}]]\n{s}' for i,s in batch)
 key=hashlib.sha256((lang+'\n'+text).encode()).hexdigest()
 p=CACHE/(key+'.json')
 if p.exists():return {int(k):v for k,v in json.loads(p.read_text()).items()}
 if stop.is_set():raise RuntimeError('Stopped after upstream access failure')
 url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':lang,'dt':'t','q':text})
 time.sleep(float(os.environ.get('KAKOBUY_TRANSLATION_DELAY','3')))
 for attempt in range(4):
  try:
   with urllib.request.urlopen(url,timeout=40) as r:data=json.load(r)
   out=''.join(x[0] for x in data[0] if x[0])
   matches=list(re.finditer(r'\[\[\s*(\d{4})\s*\]\]',out))
   results={int(m.group(1)):out[m.end():matches[j+1].start() if j+1<len(matches) else len(out)].strip() for j,m in enumerate(matches)}
   if set(results)!={i for i,s in batch} or any(not v for v in results.values()):raise ValueError('Translation segment mismatch')
   p.write_text(json.dumps(results,ensure_ascii=False))
   return results
  except urllib.error.HTTPError as e:
   if e.code in (401,403):stop.set();raise
   if e.code==429:
    if attempt==3:stop.set();raise
    delay=max(180,int(e.headers.get('Retry-After','300')) if e.headers.get('Retry-After','300').isdigit() else 300)
    with lock:print(f'Rate limit: pausing {delay} seconds before a sequential retry',flush=True)
    for _ in range((delay+14)//15):time.sleep(15)
    continue
   if attempt==3:raise
   time.sleep(2*(attempt+1))
  except (TimeoutError,urllib.error.URLError):
   if attempt==3:raise
   time.sleep(2*(attempt+1))
  except ValueError:
   # Translate individual segments to resolve a formatting failure only.
   if len(batch)==1:raise
   result={}
   for pair in batch:result.update(translate(lang,[pair]))
   return result
 raise RuntimeError('No translation returned')
def run(lang):
 target=ROOT/'src/content/editorial'/f'{lang}.json'
 result={}
 for j,b in enumerate(batches):
  result.update(translate(lang,b))
  if (j+1)%5==0:
   with lock:print(f'{lang}: {j+1}/{len(batches)} batches',flush=True)
 output=json.loads(json.dumps(base))
 for path,i in paths:
  v=output
  for k in path[:-1]:v=v[k]
  v[path[-1]]=result[i]
 target.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
 with lock:print(f'COMPLETE {lang}: {len(result)} translated segments',flush=True)
 return lang
if __name__=='__main__':
 wanted=sys.argv[1:] or LANGS
 print(f'{len(strings)} unique text segments; {len(batches)} batches per language; {len(wanted)} languages',flush=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
  futures={pool.submit(run,l):l for l in wanted}
  failed=[]
  for f in concurrent.futures.as_completed(futures):
   try:f.result()
   except Exception as e:failed.append((futures[f],repr(e)));print('FAILED',futures[f],repr(e),flush=True)
 if failed:sys.exit(1)
