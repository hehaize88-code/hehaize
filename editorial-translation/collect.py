"""Validate each delivered dictionary against its source pack and persist only complete pairs."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
from plan import expected

args=argparse.ArgumentParser();args.add_argument('artifacts',type=Path);args.add_argument('result',type=Path);args.add_argument('run');opts=args.parse_args()
source=Path('editorial-translation/input')
index={'run':opts.run,'complete':[],'pending':[]}
for pair in expected(source):
    site,lang=pair['site'],pair['locale']
    pack=source/(site+'.json')
    original=set(json.loads(pack.read_text())['texts'])
    path=opts.artifacts/('dictionary-'+site+'-'+lang)/'dictionary.json'
    output=opts.result/'dictionaries'/site/(lang+'.json')
    if path.exists():
        translated=json.loads(path.read_text())
        if translated.keys()!=original or not all(isinstance(v,str) and v.strip() for v in translated.values()):
            raise ValueError('Invalid dictionary: '+str(path))
        output.parent.mkdir(exist_ok=True,parents=True)
        shutil.copyfile(path,output)
    if output.exists() and json.loads(output.read_text()).keys()==original:
        index['complete'].append({**pair,'sha256':hashlib.sha256(output.read_bytes()).hexdigest(),'source_sha256':hashlib.sha256(pack.read_bytes()).hexdigest(),'strings':len(original)})
    else:
        index['pending'].append(pair)
(opts.result/'translation-progress.json').write_text(json.dumps(index,indent=2)+'\n')
print(len(index['complete']),'complete;',len(index['pending']),'pending')
