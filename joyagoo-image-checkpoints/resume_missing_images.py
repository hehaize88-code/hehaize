#!/usr/bin/env python3
"""Resume only unindexed URLs; a shared 8/s gate and strict global cooldown.
Known failures get a separate single-worker final retry after the fresh batch.
"""
import concurrent.futures,hashlib,importlib.util,json,os,pathlib,re,threading,time,urllib.parse
from email.utils import parsedate_to_datetime
import httpx
ROOT=pathlib.Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('builder',ROOT/'build-all-image-index.py');builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
rows=json.loads((ROOT/'cache/combined-candidates.json').read_text());urls=list(dict.fromkeys(r['image'] for r in rows));cache=ROOT/'cache/descriptors';cache.mkdir(parents=True,exist_ok=True)
condition=threading.Condition();state={'active':0,'limit':4,'rps':8.0,'next':0.0,'deadline':0.0,'last429':0.0,'rateLimits':0,'requests':0,'phase':'bulk','blocked':False}
client=httpx.Client(proxy=os.getenv('HTTPS_PROXY') or os.getenv('ALL_PROXY'),trust_env=False,headers={'User-Agent':'Mozilla/5.0','Accept':'image/*'},limits=httpx.Limits(max_connections=16,max_keepalive_connections=16,keepalive_expiry=120),timeout=httpx.Timeout(25,connect=12))

def save(path,data):
 path.parent.mkdir(parents=True,exist_ok=True);tmp=path.with_suffix('.'+str(threading.get_ident())+'.tmp');tmp.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')));tmp.replace(path)
def get(url,retries=2):
 for attempt in range(retries+1):
  with condition:
   while True:
    if state['blocked']:raise RuntimeError('Source security verification: requests stopped')
    now=time.monotonic();delay=max(state['next']-now,state['deadline']-now)
    if state['active']<state['limit'] and delay<=0:state['active']+=1;state['next']=now+1/state['rps'];state['requests']+=1;break
    condition.wait(timeout=min(max(delay,.05),1))
  error=None
  try:
   r=client.get(url)
   if r.status_code==429 or r.status_code==503 and 'Retry-After' in r.headers:
    retry=r.headers.get('Retry-After','30')
    try:delay=max(float(retry),1)
    except ValueError:
     try:delay=max(parsedate_to_datetime(retry).timestamp()-time.time(),1)
     except Exception:delay=30
    with condition:
     now=time.monotonic();state['deadline']=max(state['deadline'],now+delay)
     if r.status_code==429:
      frequent=now-state['last429']<120;state['last429']=now;state['rateLimits']+=1;state['limit']=max(1,state['limit']//2)
      if frequent:state['rps']=max(1,state['rps']/2)
     condition.notify_all()
    print('BACKOFF',r.status_code,'seconds',round(delay,1),'limit',state['limit'],'rps',state['rps'],flush=True)
    error=RuntimeError('HTTP '+str(r.status_code))
   else:
    if 'html' in r.headers.get('Content-Type','').lower() and any(t in r.text.lower() for t in ['verify you are human','checking your browser','unusual traffic from your','automated requests from your']):
     with condition:state['blocked']=True;condition.notify_all()
     raise RuntimeError('Source security verification: requests stopped')
    r.raise_for_status()
    if len(r.content)>30_000_000:raise ValueError('Image exceeds 30 MB')
    return r.content
  except Exception as e:
   error=e
   if isinstance(e,httpx.HTTPStatusError) and e.response.status_code in (400,401,403,404,410,415,422):raise
   if state['blocked']:raise
  finally:
   with condition:state['active']-=1;condition.notify_all()
  if attempt==retries:raise error
  time.sleep(min(2**attempt,4))

def index(url):
 dest=cache/(hashlib.sha256(url.encode()).hexdigest()+'.json')
 if dest.exists():
  d=json.loads(dest.read_text())
  if builder.valid_descriptor(d):return url,None
 parsed=urllib.parse.urlsplit(url);request=url
 if (parsed.hostname=='geilicdn.com' or parsed.hostname and parsed.hostname.endswith('.geilicdn.com')) and re.search(r'\.(?:jpe?g|png)$',parsed.path,re.I):request=urllib.parse.urlunsplit(parsed._replace(path=parsed.path+'.webp',query='w=128&h=128'))
 try:
  try:d=builder.descriptor(get(request))
  except Exception as e:
   status=e.response.status_code if isinstance(e,httpx.HTTPStatusError) else 0
   if request==url or (status not in (400,404,415,422) and type(e).__name__!='UnidentifiedImageError'):raise
   d=builder.descriptor(get(url,retries=1))
  assert builder.valid_descriptor(d);save(dest,d);return url,None
 except Exception as e:return url,{'image':url,'error':str(e),'type':type(e).__name__}

missing=[u for u in urls if not (cache/(hashlib.sha256(u.encode()).hexdigest()+'.json')).exists()]
prior_file=ROOT/'checkpoints/shared-failed-so-far.json';known=set(json.loads(prior_file.read_text())['missing']) if prior_file.exists() else set()
fresh=[u for u in missing if u not in known];retry=[u for u in missing if u in known];failed=[];started=time.monotonic();last=started;last_count=0
print('RESUME','cached',len(urls)-len(missing),'new',len(fresh),'known failed',len(retry),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
 futures={pool.submit(index,u) for u in fresh};completed=0
 while futures:
  finished,_=concurrent.futures.wait(futures,timeout=2,return_when=concurrent.futures.FIRST_COMPLETED)
  for f in finished:
   futures.remove(f);u,error=f.result();completed+=1
   if error:failed.append(error);retry.append(u)
  now=time.monotonic()
  if now-last>=30 or not futures:
   rate=(completed-last_count)/(now-last)
   with condition:
    if rate<6.5 and state['limit']<16 and now-state['last429']>120 and state['rps']==8:state['limit']=min(16,state['limit']+4);condition.notify_all()
   print('BULK',completed,'/',len(fresh),'failed',len(failed),'rate',round(rate,2),'limit',state['limit'],'rps',state['rps'],flush=True);last=now;last_count=completed
   save(ROOT/'checkpoints/resume-progress.json',{'phase':'bulk','cachedBefore':len(urls)-len(missing),'newTotal':len(fresh),'newCompleted':completed,'newFailed':len(failed),'knownFailed':len(known),'elapsed':now-started,'unattempted':len(futures)})
retry=list(dict.fromkeys(retry));final_failed=[]
with condition:state.update({'phase':'retry','limit':1,'rps':2.0});condition.notify_all()
print('SINGLE_RETRY',len(retry),flush=True)
for i,u in enumerate(retry):
 _,error=index(u)
 if error:final_failed.append(error)
 if (i+1)%10==0 or i+1==len(retry):print('RETRIED',i+1,'/',len(retry),'still failed',len(final_failed),flush=True)
 save(ROOT/'checkpoints/retry-image-report.json',{'attempted':i+1,'total':len(retry),'failures':final_failed,'complete':i+1==len(retry),'unattempted':len(retry)-i-1})
remaining=[u for u in urls if not (cache/(hashlib.sha256(u.encode()).hexdigest()+'.json')).exists()]
save(ROOT/'checkpoints/resume-progress.json',{'phase':'complete','cachedBefore':len(urls)-len(missing),'requestedMissing':len(missing),'processedImageCount':len(urls),'failedImageCount':len(remaining),'unattemptedImageCount':0,'elapsed':time.monotonic()-started})
print('RESUME_COMPLETE','images',len(urls),'failed',len(remaining),'elapsed',round(time.monotonic()-started,1),flush=True)
