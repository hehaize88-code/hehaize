#!/usr/bin/env python3
"""Finish the all-image index from portable, validated checkpoints.
By default this is local-only and refuses to omit unprocessed images.
--fetch-missing is for recovery when the other shared build is no longer running.
"""
import argparse,collections,hashlib,json,pathlib,re,time
import build_complete_index as b
ROOT=pathlib.Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--fetch-missing',action='store_true');args=p.parse_args()
manifest,galleries,products=b.bootstrap()
rows=json.loads((ROOT/'cache/combined-candidates.json').read_text());coverage=json.loads((ROOT/'checkpoints/combined-coverage.json').read_text());assert len(rows)==coverage['combinedCandidates'],'Incomplete metadata checkpoint';expected={p['path']:p['sourceId'] for p in products}
assert all(expected.get(r['path'])==r['sourceId'] for r in rows)
urls=list(dict.fromkeys(r['image'] for r in rows));desc={};missing=[]
for u in urls:
 f=ROOT/'cache/descriptors'/(hashlib.sha256(u.encode()).hexdigest()+'.json')
 if not f.exists():missing.append(u);continue
 d=json.loads(f.read_text());assert re.fullmatch('[01]{64}',d.get('hash','')) and len(d.get('cells',[]))==48 and all(isinstance(n,(int,float)) and 0<=n<=255 for n in d['cells']),u
 desc[u]=d
if args.fetch_missing:
 for i,u in enumerate(missing):
  _,d=b.descriptor(u)
  if not d.get('error'):desc[u]=d
  if (i+1)%100==0:print('RECOVERY',i+1,'/',len(missing),flush=True)
  time.sleep(.3)
 missing=[u for u in urls if u not in desc]
if missing:
 b.save(ROOT/'checkpoints/pending-images.json',{'count':len(missing),'images':missing})
 print('WAITING',len(missing),'remaining,',len(desc),'ready, no production manifest changed',flush=True);raise SystemExit(2)
seen={(r['path'],r['image']) for r in galleries};extra=[]
for r in sorted(rows,key=lambda r:(r['path'],r.get('kind',''),r.get('imageIndex',0),r.get('styleId',''),r['image'])):
 key=r['path'],r['image']
 if key not in seen:extra.append({**r,**desc[r['image']]});seen.add(key)
shards=list(manifest['shards']);folder=ROOT/'public/catalog-image-index';folder.mkdir(parents=True,exist_ok=True)
for i in range(0,len(extra),1000):
 part=extra[i:i+1000];raw=json.dumps({'products':part},ensure_ascii=False,separators=(',',':')).encode();sha=hashlib.sha256(raw).hexdigest();name=f'styles-{i//1000:03d}-{sha[:12]}.json';(folder/name).write_bytes(raw)
 shards.append({'url':'/catalog-image-index/'+name,'count':len(part),'bytes':len(raw),'sha256':sha})
coverage=json.loads((ROOT/'checkpoints/combined-coverage.json').read_text());counts=collections.Counter(r['kind'] for r in galleries+extra)
result={**manifest,'updatedAt':time.strftime('%Y-%m-%d',time.gmtime()),'indexedCount':len(products),'indexedProductCount':len(products),'indexedImageCount':len(galleries)+len(extra),'discoveredImageCount':len(rows),'uniqueImageCount':len(urls),'indexedUniqueImageCount':len(desc),'galleryImageCount':len(galleries),'styleImageCount':counts['style'],'sellerImageCount':counts['seller'],'includesStyles':True,'includesSellerImages':True,'failedDetailCount':0,'failedStylePageCount':len(coverage['unavailableProducts']),'attemptedStylePageCount':len(products),'successfulStylePageCount':len(products)-len(coverage['unavailableProducts']),'unattemptedStylePageCount':0,'failedImageCount':0,'shards':shards}
assert sum(s['count'] for s in shards)==result['indexedImageCount']==len(rows)
assert result['indexedImageCount']==sum(counts.values())
for shard in shards:
 raw=(ROOT/'public'/shard['url'].lstrip('/')).read_bytes();assert len(raw)==shard['bytes'] and hashlib.sha256(raw).hexdigest()==shard['sha256'];assert len(json.loads(raw)['products'])==shard['count']
b.save(ROOT/'public/catalog-image-index.json',result)
b.save(ROOT/'checkpoints/final-validation.json',{'manifest':{k:v for k,v in result.items() if k!='shards'},'shardCount':len(shards),'preservedGalleryShards':len(manifest['shards']),'allHashesValid':True,'unavailableProducts':coverage['unavailableProducts'],'recoveredProducts':coverage['recoveredProducts']})
print('COMPLETE',json.dumps({k:v for k,v in result.items() if k!='shards'}),flush=True)
