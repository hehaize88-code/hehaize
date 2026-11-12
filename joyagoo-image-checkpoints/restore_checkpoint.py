#!/usr/bin/env python3
"""Restore a persistent checkpoint, then run build_complete_index.py to resume.
Dependencies: Pillow and httpx. Reads only the explicit public checkpoint branch.
"""
import concurrent.futures,gzip,hashlib,json,pathlib,urllib.request,threading
ROOT=pathlib.Path(__file__).resolve().parent
BASE='https://raw.githubusercontent.com/hehaize88-code/hehaize/joyagoo-image-assets-checkpoint-20261112/joyagoo-image-checkpoints/'
def get(path):
 with urllib.request.urlopen(BASE+path,timeout=60) as r:return r.read()
def save(path,data):
 path.parent.mkdir(parents=True,exist_ok=True);tmp=path.with_suffix('.'+str(threading.get_ident())+'.tmp');tmp.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')));tmp.replace(path)
def restore(item):
 raw=get(item['remote']);assert hashlib.sha256(raw).hexdigest()==item['sha256'];data=json.loads(gzip.decompress(raw))
 if item['logical'].startswith('descriptors-'):
  for r in data['products']:save(ROOT/'cache/descriptors'/(hashlib.sha256(r['image'].encode()).hexdigest()+'.json'),{k:r[k] for k in ['hash','cells']})
 elif item['logical'].startswith('options-'):
  for r in data:
   if not r.get('error'):save(ROOT/'cache/options'/(r['product']['sourceId']+'.json'),r)
 elif item['logical']=='gallery-manifest.json':save(ROOT/'manifest.json',data)
 else:save(ROOT/'checkpoints'/item['logical'],data)
 return item['logical']
if __name__=='__main__':
 index=json.loads(get('checkpoint-index.json'))
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
  for i,name in enumerate(pool.map(restore,index['files'])):
   if (i+1)%20==0:print('Restored',i+1,'/',len(index['files']),flush=True)
 rows=[]
 for p in sorted((ROOT/'checkpoints').glob('candidates-*.json')):rows.extend(json.loads(p.read_text()))
 if rows:save(ROOT/'cache/combined-candidates.json',rows)
 print('Checkpoint restored. Run complete_from_checkpoints.py when shared indexing is complete, or --fetch-missing if no shared build is running.')
