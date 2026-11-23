"""Install complete site dictionaries into native editorial sources without translation calls.

Use --root to build a separate worktree, --site/--lang for an individual edition,
and --dictionary for a single merged English -> translated dictionary.
"""
import argparse
import contextlib
import fcntl
import json
import os
from pathlib import Path
import tempfile

COMMON = 'de fr es it pt pl nl ro sv zh da fi el cs hu bg sk hr ja ko vi th id'.split()
JS_DATA = {
    'bbdbuygrid-com':'editorial-content.js','vigorbuygrid-com':'editorial-content.js',
    'litbuygrid-com':'editorial-data.js','sugargoogrid-com':'editorial.js','orientdiggrid-com':'editorial.js',
}
LANGUAGES = {s: COMMON for s in [*JS_DATA,'eastmallbuygrid-com','itaobuygrid-com','hubbuysheetgrid.com','kakobuysheetgrid-com','superbuysheetindex-com','cnshoppergrid-com']}
LANGUAGES['usfanstab-com'] = 'de fr es it pt pl zh'.split()
LANGUAGES['ootdbuygrid-com'] = COMMON + 'sl lt lv et ga mt'.split()
KEEP = {'slug','keyword','reviewed','source','url'}
SMALL_LOCALES = {'hubbuysheetgrid.com','kakobuysheetgrid-com','ootdbuygrid-com'}
SEPARATE = {'sugargoogrid-com','orientdiggrid-com','eastmallbuygrid-com','itaobuygrid-com'}
MARKDOWN = {'cnshoppergrid-com','superbuysheetindex-com'}

def parse(path):
    body=path.read_text(encoding='utf8')
    return json.loads(body.split('=',1)[1].strip().removesuffix(';') if path.suffix=='.js' else body)

def compact(value):
    return json.dumps(value,ensure_ascii=False,separators=(',',':'))+'\n'

def origin(root,site):
    base=root/site
    if site in SMALL_LOCALES:
        folder=(base/'content') if site=='ootdbuygrid-com' else base/'worker/editorial'
        return folder/'en.json',folder/'locales.json'
    if site=='usfanstab-com':
        path=base/'src/content/editorial.json'
    elif site in JS_DATA:
        path=base/'worker'/JS_DATA[site]
    else:
        path=base/'worker/editorial-content.json'
    return path,path

def save(path,data):
    path.parent.mkdir(parents=True,exist_ok=True)
    raw=data.encode()
    if path.exists() and path.read_bytes()==raw:return
    mode=(path.stat().st_mode & 0o777) if path.exists() else 0o644
    with tempfile.NamedTemporaryFile(dir=path.parent,suffix='.tmp',delete=False) as file:
        file.write(raw)
    os.chmod(file.name,mode)
    os.replace(file.name,path)

def apply(value,dictionary,omit_sources=False):
    if isinstance(value,dict):
        return {k:(v if k in KEEP else apply(v,dictionary,omit_sources))
                for k,v in value.items() if not (omit_sources and k in ('slug','sources'))}
    if isinstance(value,list):return [apply(v,dictionary,omit_sources) for v in value]
    if not isinstance(value,str) or not value.strip() or value.startswith(('http://','https://')):return value
    return dictionary[value]

def dictionary_for_file(path):
    mapping=json.loads(path.read_text())
    if not isinstance(mapping,dict) or not mapping or any(not isinstance(s,str) or not s.strip() for s in mapping.values()):
        raise ValueError('Invalid dictionary '+str(path))
    return mapping

def markdown_files(base,lang,dictionary):
    outputs={}
    source=base/'editorial/en'
    dest=base/'editorial'/lang
    files=sorted(source.glob('*.md'))
    if len(files)!=10:raise ValueError('Expected 10 articles in '+str(source))
    for src in files:
        lines=[]
        for row in src.read_text().splitlines():
            prefix=next((prefix for prefix in ('## ','# ') if row.startswith(prefix)),'')
            lines.append(prefix+dictionary[row[len(prefix):]].replace('\n',' ').strip() if row.strip() else '')
        outputs[dest/src.name]='\n'.join(lines)+'\n'
    outputs[dest/'faq.json']=compact(apply(parse(source/'faq.json'),dictionary))
    return outputs

def edition_outputs(root,site,lang,dictionary):
    base=root/site
    if site in MARKDOWN:return markdown_files(base,lang,dictionary)
    src,out=origin(root,site)
    contents=parse(src)
    if site in SMALL_LOCALES:
        english=contents
        edition=apply(english,dictionary,True)
        editions=parse(out)
    else:
        english=contents['en']
        editions=contents
        if site=='usfanstab-com':
            original=english['articles'][-10:]
            fresh={a['slug']:apply(a,dictionary) for a in original}
            if len(fresh)!=10:raise ValueError('Expected ten unique new USFans article slugs')
            prior=contents[lang]
            # Preserve previous editorial content and FAQ, and install reviewed
            # headings ahead of machine-generated ones where explicitly provided.
            if lang in ('de','fr'):
                labels=parse(Path(__file__).with_name('usfans_reviewed_titles.json'))
                for slug in fresh.keys() & labels.keys():fresh[slug]['title']=labels[slug][lang]
            previous=[a for a in prior['articles'] if a['slug'] not in fresh]
            edition={**prior,'articles':previous+list(fresh.values())}
        else:
            edition=apply(english,dictionary)
    if site in SEPARATE:return {base/'worker/editorial-locales'/(lang+'.json'):compact(edition)}
    editions[lang]=edition
    if out.suffix=='.js':
        return {out:out.read_text().split('=',1)[0]+'= '+json.dumps(editions,ensure_ascii=False,separators=(',',':'))+';\n'}
    return {out:compact(editions)}

@contextlib.contextmanager
def lock_site(folder):
    fd=os.open(folder,os.O_RDONLY)
    try:
        fcntl.flock(fd,fcntl.LOCK_EX)
        yield
    finally:os.close(fd)

def install(root,site,lang,dictionary,dry_run=False):
    if site not in LANGUAGES or lang not in LANGUAGES[site]:raise ValueError(f'Unsupported edition {site}/{lang}')
    with lock_site(root/site):
        try:outputs=edition_outputs(root,site,lang,dictionary)
        except KeyError as e:raise ValueError(f'{site}/{lang} missing source key: {str(e)[:180]}') from e
        if not dry_run:
            for path,data in outputs.items():save(path,data)
    return len(outputs)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path('editorial'))
    parser.add_argument('--dictionaries',type=Path,help='Directory containing LANG/SITE.json or SITE.LANG.json')
    parser.add_argument('--dictionary',type=Path,help='Single dictionary, requires --site and --lang')
    parser.add_argument('--site',choices=sorted(LANGUAGES))
    parser.add_argument('--lang')
    parser.add_argument('--dry-run',action='store_true')
    args=parser.parse_args()
    if args.dictionary and not (args.site and args.lang):parser.error('--dictionary needs --site and --lang')
    if bool(args.dictionary)==bool(args.dictionaries):parser.error('Specify one dictionary source')
    rows=[]
    for site in [args.site] if args.site else sorted(LANGUAGES):
        for lang in [args.lang] if args.lang else LANGUAGES[site]:
            if args.lang and not args.site and lang not in LANGUAGES[site]:continue
            if args.dictionary:path=args.dictionary
            else:
                candidates=(args.dictionaries/lang/(site+'.json'),args.dictionaries/(site+'.'+lang+'.json'),args.dictionaries/site/(lang+'.json'))
                path=next((p for p in candidates if p.is_file()),None)
                if not path:raise FileNotFoundError(f'{site}/{lang} dictionary unavailable')
            rows.append((site,lang,path))
    if not rows:parser.error('No matching language editions')
    # Complete preflight first. A missing or stale dictionary must not yield a
    # partially installed batch. Re-read shared JSON during the atomic apply.
    for site,lang,path in rows:install(args.root,site,lang,dictionary_for_file(path),True)
    if not args.dry_run:
        for site,lang,path in rows:install(args.root,site,lang,dictionary_for_file(path))
    print(f'{len(rows)} editions '+('validated' if args.dry_run else 'installed'))
if __name__=='__main__':main()
