#!/usr/bin/env python3
"""Copy validated public image descriptors from a read-only shared cache."""
import hashlib,json,pathlib,re,time
import build_complete_index as b
ROOT=pathlib.Path(__file__).resolve().parent
SHARED=pathlib.Path('/workspace/scratch/07cdd0d5675e/hehaize/cssbuychina-net/.cache/all-image-index')
rows=json.loads((ROOT/'cache/combined-candidates.json').read_text())
urls={hashlib.sha256(r['image'].encode()).hexdigest():r['image'] for r in rows}
state=ROOT/'cache/reused-shared.json';copied=set(json.loads(state.read_text())) if state.exists() else set()
def valid(d):return re.fullmatch('[01]{64}',d.get('hash','')) and len(d.get('cells',[]))==48 and all(isinstance(n,(int,float)) and 0<=n<=255 for n in d['cells'])
count=0
for f in (SHARED/'descriptors-area-v2').glob('*.json'):
 key=f.stem
 if key in copied or key not in urls:continue
 d=json.loads(f.read_text());assert valid(d),str(f)
 b.save(ROOT/'cache/descriptors'/f.name,{k:d[k] for k in ['hash','cells','colors'] if k in d});copied.add(key);count+=1
b.save(state,list(copied))
print('REUSED',count,'new,',len(copied),'total shared descriptors; available',len(list((ROOT/'cache/descriptors').glob('*.json'))),flush=True)
