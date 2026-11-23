"""Record validated repairs under their source pack and exact language identifier."""
import hashlib
import json
import os
from pathlib import Path
import shutil

config=Path('translation-recovery/targets.json'); root=Path('relative-results')
known=json.loads(config.read_text())['include']
status={'run':os.environ['GITHUB_RUN_ID'],'primary_run':'45151418588','source_commit':os.environ['GITHUB_SHA'],'verified':[],'pending':[]}
for item in known:
    site,lang=item['site'],item['lang']
    if not site.replace('-','').replace('.','').isalnum() or not lang.isalpha():raise ValueError('Invalid target')
    source=Path(f'editorial-translation/input/{site}.json');pack=json.loads(source.read_text())
    assert lang in pack['languages']
    path=Path(f'artifacts/repair-{site}-{lang}/dictionary.json')
    if not path.exists():status['pending'].append(item);continue
    data=json.loads(path.read_text())
    if data.keys()!=set(pack['texts']) or not all(isinstance(v,str) and v.strip() for v in data.values()):
        raise ValueError('Incomplete or malformed repair dictionary')
    out=root/'dictionaries'/site/(lang+'.json');out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(path,out)
    status['verified'].append({**item,'strings':len(data),'dictionary_sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest()})
folder=root/'recovery-runs';folder.mkdir(exist_ok=True,parents=True);(folder/(status['run']+'.json')).write_text(json.dumps(status,indent=2)+'\n')
print('Verified',len(status['verified']),'pending',len(status['pending']))
