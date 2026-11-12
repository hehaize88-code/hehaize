#!/usr/bin/env python3
"""Package completed files for bounded connector uploads."""
import gzip,hashlib,json,pathlib
ROOT=pathlib.Path(__file__).resolve().parent;out=ROOT/'exports';out.mkdir(exist_ok=True)
files=[]
for p in [ROOT/'manifest.json',*(ROOT/'checkpoints').glob('*.json')]:
 logical='gallery-manifest.json' if p.name=='manifest.json' else p.name
 raw=gzip.compress(p.read_bytes(),mtime=0);sha=hashlib.sha256(raw).hexdigest();name=logical[:-5]+'-'+sha[:12]+'.json.gz';target=out/name
 if not target.exists():target.write_bytes(raw)
 files.append({'logical':logical,'remote':name,'sha256':sha,'bytes':len(raw)})
(out/'current.json').write_text(json.dumps(files,separators=(',',':')))
print(json.dumps({'files':len(files),'bytes':sum(r['bytes'] for r in files)}))
