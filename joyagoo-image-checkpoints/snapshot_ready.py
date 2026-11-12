#!/usr/bin/env python3
import hashlib,json,pathlib
ROOT=pathlib.Path(__file__).resolve().parent
state=ROOT/'exports/exported-descriptor-urls.json';done=set(json.loads(state.read_text())) if state.exists() else set();ready=[]
for p in (ROOT/'cache/options').glob('*.json'):
 for r in json.loads(p.read_text()).get('styles',[]):
  u=r['image']
  if u in done:continue
  f=ROOT/'cache/descriptors'/(hashlib.sha256(u.encode()).hexdigest()+'.json')
  if f.exists():ready.append({'image':u,**json.loads(f.read_text())});done.add(u)
for i in range(0,len(ready),250):
 b=json.dumps({'products':ready[i:i+250]},ensure_ascii=False,separators=(',',':')).encode();sha=hashlib.sha256(b).hexdigest();(ROOT/'checkpoints'/('descriptors-ready-'+sha[:12]+'.json')).write_bytes(b)
state.write_text(json.dumps(list(done),separators=(',',':')))
print('new completed',len(ready),'total completed',len(done))
