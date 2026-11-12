#!/usr/bin/env python3
import concurrent.futures,gzip,hashlib,json,os,pathlib,threading,time,httpx
ROOT=pathlib.Path(__file__).resolve().parent
BASE='https://raw.githubusercontent.com/hehaize88-code/hehaize/a31a6c4b3d6c3065e65799e83e27e7f49863c3a1/joyagoo-image-checkpoints/'
client=httpx.Client(proxy=os.getenv('HTTPS_PROXY') or os.getenv('ALL_PROXY'),trust_env=False,limits=httpx.Limits(max_connections=4,max_keepalive_connections=4,keepalive_expiry=120),timeout=30)
lock=threading.Lock();deadline=0;next_request=0

def get(path):
 global deadline,next_request
 for attempt in range(5):
  while True:
   with lock:
    now=time.monotonic();delay=max(deadline-now,next_request-now)
    if delay<=0:next_request=now+.25
   if delay<=0:break
   time.sleep(min(1,delay))
  try:
   r=client.get(BASE+path)
   if r.status_code==429:
    with lock:deadline=time.monotonic()+max(float(r.headers.get('Retry-After','30')),30)
    continue
   r.raise_for_status();return r.content
  except Exception:
   if attempt==4:raise
   time.sleep(2)
 raise RuntimeError('Repeated rate limit')

def save(path,data):
 path.parent.mkdir(parents=True,exist_ok=True);tmp=path.with_suffix('.'+str(threading.get_ident())+'.tmp');tmp.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')));tmp.replace(path)

index=json.loads(get('checkpoint-index.json'));items=list({r['logical']:r for r in index['files']}.values());done=set()
def restore(item):
 raw=get(item['remote']);assert hashlib.sha256(raw).hexdigest()==item['sha256'];data=json.loads(gzip.decompress(raw));name=item['logical']
 target=ROOT/'exports'/item['remote'];target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(raw)
 if name.startswith('descriptors-'):
  for r in data['products']:
   save(ROOT/'cache/descriptors'/(hashlib.sha256(r['image'].encode()).hexdigest()+'.json'),{k:r[k] for k in ['hash','cells','colors'] if k in r})
   with lock:done.add(r['image'])
 elif name.startswith('options-'):
  for r in data:
   if not r.get('error'):save(ROOT/'cache/options'/(r['product']['sourceId']+'.json'),r)
 elif name=='gallery-manifest.json':save(ROOT/'manifest.json',data)
 else:save(ROOT/'checkpoints'/name,data)
 return name
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for i,name in enumerate(pool.map(restore,items)):
  if (i+1)%20==0:print('RESTORED',i+1,'/',len(items),flush=True)
rows=[]
for p in sorted((ROOT/'checkpoints').glob('candidates-*.json')):rows.extend(json.loads(p.read_text()))
save(ROOT/'cache/combined-candidates.json',rows);save(ROOT/'exports/exported-descriptor-urls.json',list(done));save(ROOT/'exports/restored-index.json',index)
for name in ['build_complete_index.py','complete_from_checkpoints.py','snapshot_ready.py','export_checkpoint.py','build-all-image-index.py','test-build-all-image-index.py','image-index-requirements.txt','IMAGE-INDEX.md']:
 (ROOT/name).write_bytes(get(name))
print('RECOVERED',len(rows),'candidate records;',len(done),'non-gallery descriptors',flush=True)
