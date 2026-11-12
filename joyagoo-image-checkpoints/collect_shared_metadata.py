#!/usr/bin/env python3
"""Read validated metadata from the concurrent shared-source catalogue build.
Does not write to the source project's files or change its running process.
"""
import hashlib,json,pathlib,time,urllib.error
import build_complete_index as b
ROOT=pathlib.Path(__file__).resolve().parent
SHARED=pathlib.Path('/workspace/scratch/07cdd0d5675e/hehaize/cssbuychina-net/.cache/all-image-index')
products=json.loads((ROOT/'checkpoints/products.json').read_text());expected={p['path']:p for p in products}
source=json.loads((SHARED/'candidates.json').read_text())
records={}
for r in source:
 assert r['path'] in expected and r['sourceId']==expected[r['path']]['sourceId']
 records[r['path'],r['image']]=r
coverage=json.loads((ROOT/'checkpoints/cssbuy-reuse-coverage.json').read_text())
for r in coverage['ownExtraRecords']:records[r['path'],r['image']]=r
missing=[];recovered=[]
for p in coverage['missingOptions']:
 try:
  data=json.loads(b.get('https://joyagoochina.org/api/product-options?id='+p['sourceId'],retries=0,timeout=20));assert str(data['sourceId'])==p['sourceId'];assert isinstance(data['groups'],list)
  values=[{'image':u,'imageIndex':i,'kind':'seller'} for i,u in enumerate(data.get('images',[])) if isinstance(u,str) and u.startswith('https://')]
  values += [{'image':v['image'],'kind':'style','styleId':str(v['id']),'styleLabel':v.get('label','')} for g in data['groups'] for v in g.get('values',[]) if v.get('image','').startswith('https://')]
  for v in values:
   if (p['path'],v['image']) not in records:records[p['path'],v['image']]={**p,**v}
  recovered.append(p['path']);print('RECOVERED',p['path'],len(values),flush=True)
 except Exception as e:missing.append({**p,'error':str(e)});print('UNAVAILABLE',p['path'],str(e),flush=True)
 time.sleep(.5)
rows=list(records.values());b.save(ROOT/'cache/combined-candidates.json',rows)
b.save(ROOT/'checkpoints/combined-coverage.json',{'unavailableProducts':missing,'recoveredProducts':recovered,'sharedCandidates':len(source),'combinedCandidates':len(rows),'uniqueImages':len(set(r['image'] for r in rows)),'readOnlySource':str(SHARED)})
for i in range(0,len(rows),1000):b.save(ROOT/'checkpoints'/f'candidates-{i//1000:03d}.json',rows[i:i+1000])
print('COMBINED',len(rows),'unique',len(set(r['image'] for r in rows)),'unavailable',len(missing),flush=True)
