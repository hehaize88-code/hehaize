"""Apply independently reviewed translations to a verified, non-production working directory."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import tempfile

def sha(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def stable(values):
    return sha(json.dumps(values,ensure_ascii=False,sort_keys=True,separators=(',',':')))

def write_json(path,obj):
    path.parent.mkdir(exist_ok=True,parents=True)
    data=json.dumps(obj,ensure_ascii=False,sort_keys=True,separators=(',',':'))+'\n'
    with tempfile.NamedTemporaryFile(mode='w',encoding='utf8',dir=path.parent,delete=False) as f:
        f.write(data)
    os.replace(f.name,path)

def resolve(root,site,lang):
    candidates=[root/site/(lang+'.json'),root/lang/(site+'.json'),root/(site+'.'+lang+'.json')]
    paths=[p for p in candidates if p.is_file()]
    if len(paths)>1:raise ValueError('Ambiguous dictionary path '+str(paths))
    return paths[0] if paths else None

def audit_edition(review,source,dictionary):
    lang=review['locale'];site=review['site']
    if set(source['texts'])!=dictionary.keys():raise ValueError(f'{site}/{lang}: source set changed')
    if stable(sorted(source['texts']))!=review['source_set_sha256']:raise ValueError(f'{site}/{lang}: source hash changed')
    if review['unresolved_material']:raise ValueError(f'{site}/{lang}: unresolved material findings')
    state=stable(dictionary)
    if state==review['effective_dictionary_sha256']:return dictionary
    if state!=review['raw_dictionary_sha256']:raise ValueError(f'{site}/{lang}: dictionary content changed since review')
    dest=dict(dictionary);used=set()
    for item in review['corrections']:
        s=item['source'];resolved=item['translation']
        if not isinstance(resolved,str) or not resolved.strip() or s in used or s not in dictionary or sha(s)!=item['source_sha256'] or sha(dictionary[s])!=item['raw_target_sha256']:
            raise ValueError(f'{site}/{lang}: stale or invalid correction for '+s[:65])
        used.add(s);dest[s]=resolved
    if stable(dest)!=review['effective_dictionary_sha256']:raise ValueError(f'{site}/{lang}: effective checksum mismatch')
    return dest

def main():
    cli=argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--dictionaries',type=Path,required=True,help='Non-production verified dictionary working directory')
    cli.add_argument('--input-packs',type=Path,required=True)
    cli.add_argument('--reviews',type=Path,default=Path(__file__).parent/'editions')
    cli.add_argument('--summary',type=Path,required=True)
    cli.add_argument('--require-complete',action='store_true',help='Require an audited coverage record for every expected edition before applying')
    cli.add_argument('--check-only',action='store_true')
    opt=cli.parse_args();all_pairs=set();editions={};sources={}
    for pack in sorted(opt.input_packs.glob('*.json')):
        source=json.loads(pack.read_text());sources[pack.stem]=source
        exact=set(source['languages'])
        if pack.stem=='ootdbuygrid-com':exact.add('mt')
        all_pairs.update((pack.stem,l) for l in exact)
    for file in sorted(opt.reviews.glob('*/*.json')):
        r=json.loads(file.read_text());key=(r['site'],r['locale'])
        if key not in all_pairs or key in editions:raise ValueError(f'Unexpected review {key}')
        editions[key]=r
    missing=all_pairs-editions.keys()
    if opt.require_complete and missing:raise ValueError(f'Missing {len(missing)} release edition reviews')
    outputs=[];report=[]
    for (site,lang),r in editions.items():
        file=resolve(opt.dictionaries,site,lang)
        if not file:raise ValueError(f'Missing reviewed edition {site}/{lang}')
        raw=json.loads(file.read_text());reviewed=audit_edition(r,sources[site],raw)
        if raw!=reviewed:outputs.append((file,reviewed))
        report.append(dict(site=site,locale=lang,corrections=len(r['corrections']),effective_sha256=r['effective_dictionary_sha256']))
    if not opt.check_only:
        for file,obj in outputs:write_json(file,obj)
    write_json(opt.summary,dict(reviewed=report,pending=sorted(missing),changedFiles=len(outputs),checkOnly=opt.check_only))
    print(f'{len(editions)} reviewed editions, {len(missing)} awaiting, {len(outputs)} dictionary files to update')
if __name__=='__main__':main()
