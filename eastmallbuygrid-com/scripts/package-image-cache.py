# Package URL-keyed, derived search features. Source snapshots are not a database.
import json,glob,base64,gzip,hashlib,time
from pathlib import Path
import numpy as np
root=Path('/tmp/east-image-build');seed=json.load(open('/tmp/bbd-index.json'));records={r['path']:r for r in [json.load(open(p)) for p in glob.glob(str(root/'_*.json'))]};items={};features={};missing=[]
for p in seed['items']:
 entries=[]
 for e in p[2]:
  a=np.frombuffer(base64.b64decode(e[2]),dtype=np.uint8).reshape(8,8,3);small=np.floor(a.reshape(4,2,4,2,3).mean(axis=(1,3))+.5).astype(np.uint8);entry=[e[0],e[1],base64.b64encode(small.tobytes()).decode(),'source'];entries.append(entry);features[e[0]]=entry[:3]
 items[p[0]]=[p[0],p[1],entries]
for path,r in records.items():
 p=items.setdefault(path,[path,r['name'],[]]);p[1]=r['name'];byurl={e[0]:e for e in p[2]}
 for u,kind in r['images']:
  f=root/(hashlib.sha256(u.encode()).hexdigest()+'.sig')
  feature=features.get(u)
  if not feature and f.exists():feature=json.loads(f.read_text())
  if feature:byurl[u]=feature[:3]+[kind]
  else:missing.append([path,u,kind])
 p[2]=list(byurl.values())
items=list(items.values());out=Path('image-cache');out.mkdir(exist_ok=True);shards=[]
for i in range(0,len(items),200):
 key=str(i//200);rows=items[i:i+200];data=gzip.compress(json.dumps(rows,separators=(',',':'),ensure_ascii=False).encode(),9);(out/(key+'.json.gz')).write_bytes(data);shards.append({'id':key,'products':len(rows),'bytes':len(data)})
counts={k:sum(e[3]==k for p in items for e in p[2]) for k in ['source','gallery','style']};meta={'source':'https://cnbuycha.com','total':len(items),'products':len(items),'searchableProducts':sum(bool(p[2]) for p in items),'images':sum(len(p[2]) for p in items),'imageKinds':counts,'sourceAudited':sum(r['sourceOK'] for r in records.values()),'sourceSnapshotDate':seed['updated'],'sellerAudited':sum(r['sellerOK'] for r in records.values()),'missingImages':len(missing),'updated':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'shards':shards,'partial':True}
(out/'manifest.json').write_text(json.dumps(meta));(out/'names.json').write_text(json.dumps([[p[0],p[1]] for p in items]));(out/'coverage.json').write_text(json.dumps({'knownMissing':missing,'unverifiedSellerPaths':[p[0] for p in items if not records.get(p[0],{}).get('sellerOK')]}));print(json.dumps(meta),flush=True)
