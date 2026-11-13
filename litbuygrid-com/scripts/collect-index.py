"""Rebuild only derived image-search features from already fetched source images."""
import json,os,time
root=os.environ.get('LITBUY_WORK_DIR','/tmp')
m=json.load(open(root+'/lit-source-manifest.json'));items=[];missing=[]
for p in m['products']:
 entries=[]
 # Cache filenames are positional within a product, but URL is authoritative.
 cache=[]
 prefix=p['path'].split('/')[-1]+'.'
 for i in range(len(p['images'])):
  f=root+'/litprints/'+prefix+str(i)+'.json'
  if os.path.exists(f):cache.append(json.load(open(f)))
 by_url={e[0]:e for e in cache}
 for i,u in enumerate(p['images']):
  if u in by_url:entries.append(by_url[u])
  else:missing.append([u,'Not indexed'])
 items.append([p['path'],p['name'],entries])
json.dump({'items':items,'errors':missing,'updated':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())},open(root+'/lit-index-snapshot.json','w'))
print('Products:',len(items),'Images:',sum(len(p[2]) for p in items),'Missing:',len(missing),flush=True)
