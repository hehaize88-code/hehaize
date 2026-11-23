"""Verify all pinned MADLAD outputs, add the Maltese edition, and install in a clean source checkout."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
from install_editorial_locales import LANGUAGES, MARKDOWN, SEPARATE, origin


def read(path):
    return json.loads(path.read_text())


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd, text=True).strip()


def outputs(values):
    with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
        for key, value in values.items():
            print(f'{key}={value}', file=f)


def request(path):
    data = read(path)
    for field in ['source_sha', 'results_sha', 'maltese_sha', 'reviewed_sha']:
        if not re.fullmatch('[0-9a-f]{40}', str(data.get(field, ''))):
            raise ValueError(f'{field} must pin an exact Git commit')
    if not re.fullmatch('[0-9a-f]{64}', str(data.get('maltese_sha256', ''))):
        raise ValueError('maltese_sha256 must identify the reviewed Maltese dictionary')
    mt_path = Path(data.get('maltese_path', 'dictionaries/ootdbuygrid-com/mt.json'))
    if mt_path.is_absolute() or '..' in mt_path.parts or not re.fullmatch(r'[a-zA-Z0-9./_-]+\.json', str(mt_path)):
        raise ValueError('Maltese dictionary must have a repository-relative JSON path')
    if type(data.get('update_draft')) is not bool:
        raise ValueError('update_draft must be a boolean')
    return {**{key: data[key] for key in ('source_sha', 'results_sha', 'maltese_sha', 'maltese_sha256', 'reviewed_sha')},
            'maltese_path': str(mt_path), 'update_draft': str(data['update_draft']).lower()}


def allowed_outputs(source):
    # A reviewed post-install correction reconciles one worked exchange-rate example.
    paths = {Path('itaobuygrid-com/worker/editorial-content.json')}
    for site, languages in LANGUAGES.items():
        for lang in languages:
            if site in MARKDOWN:
                names = [path.name for path in (source/site/'editorial/en').glob('*.md')]
                paths.update(Path(site, 'editorial', lang, name) for name in [*names, 'faq.json'])
            elif site in SEPARATE:
                paths.add(Path(site, 'worker/editorial-locales', lang+'.json'))
            else:
                _, output = origin(source, site)
                paths.add(output.relative_to(source))
    return paths


def apply_reviews(workspace, dictionaries, expected, reviewed_sha):
    review = workspace/'reviews'
    if run('git','rev-parse','HEAD',cwd=review) != reviewed_sha:
        raise ValueError('Unexpected reviewed translations commit')
    report = workspace/'reports/review-overlay.json'
    tool = review/'reviewed-translations/apply.py'
    subprocess.run([sys.executable,tool,'--input-packs',Path(__file__).with_name('input'),
                    '--dictionaries',dictionaries,'--summary',report,'--require-complete'],check=True)
    receipt = read(report)
    rows = {(r['site'],r['locale']):r for r in receipt['reviewed']}
    if receipt['checkOnly'] or receipt['pending'] or rows.keys()!=expected or len(receipt['reviewed'])!=len(expected):
        raise ValueError('Incomplete review coverage or corrections were not applied')
    for (site, lang), row in rows.items():
        effective = read(dictionaries/site/(lang+'.json'))
        canonical = json.dumps(effective,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()
        if hashlib.sha256(canonical).hexdigest() != row['effective_sha256']:
            raise ValueError(f'Reviewed dictionary mismatch: {site}/{lang}')
    receipt['reviewed_sha'] = reviewed_sha
    report.write_text(json.dumps(receipt,ensure_ascii=False,indent=2)+'\n')


def install(workspace, args):
    source = workspace/'editorial'
    results = workspace/'results'
    destination = workspace/'verified-dictionaries'
    destination.mkdir(exist_ok=False)
    if run('git', 'rev-parse', 'HEAD', cwd=source) != args['source_sha']:
        raise ValueError('Unexpected source commit')
    if run('git', 'status', '--porcelain', cwd=source):
        raise ValueError('Expected a clean source checkout before installing')
    expected = {(s,l) for s, langs in LANGUAGES.items() for l in langs}
    mt = ('ootdbuygrid-com','mt')
    progress = read(results/'translation-progress.json')
    pack_digests = read(Path(__file__).with_name('source-pack-sha256.json'))
    if progress.get('pending') != []:
        raise ValueError('Translation results contain pending dictionaries')
    completed = {(r['site'],r['locale']):r for r in progress['complete']}
    if len(completed) != len(progress['complete']) or (set(completed)-{mt}) != expected-{mt}:
        raise ValueError('Incomplete or duplicated translation coverage')
    for site, lang in sorted(expected):
        if (site,lang) == mt:
            checkout = (workspace/'maltese').resolve()
            path = (checkout/args['maltese_path']).resolve()
            if not path.is_relative_to(checkout):
                raise ValueError('Maltese dictionary leaves checkout')
            checksum = args['maltese_sha256']
        else:
            path = results/'dictionaries'/site/(lang+'.json')
            metadata = completed[site,lang]
            if metadata['source_sha256'] != pack_digests[site]:
                raise ValueError(f'Source pack changed: {site}/{lang}')
            checksum = metadata['sha256']
        if digest(path) != checksum:
            raise ValueError(f'Unverified dictionary bytes: {site}/{lang}')
        dest = destination/site/(lang+'.json')
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path,dest)
    apply_reviews(workspace, destination, expected, args['reviewed_sha'])
    tool = Path(__file__).with_name('install_editorial_locales.py')
    subprocess.run([sys.executable, tool, '--root',source,'--dictionaries',destination],check=True)
    corrections = workspace/'reviews/reviewed-translations/corrections_after_install.py'
    receipt = workspace/'reports/post-install-corrections.json'
    subprocess.run([sys.executable,corrections,'--sites',source,'--dictionaries',destination,'--summary',receipt],check=True)
    correction = read(receipt)
    expected_locales = {'en', *LANGUAGES['itaobuygrid-com']}
    if ({row['language'] for row in correction['editions']} != expected_locales
            or len(correction['editions']) != len(expected_locales)
            or correction['site'] != 'itaobuygrid-com'
            or correction['slug'] != 'compare-display-price-and-checkout-currency'
            or (correction['section'], correction['paragraph']) != (5, 1)):
        raise ValueError('Incomplete receipt for the reviewed iTaoBuy price example')
    paths = allowed_outputs(source)
    # Only native content may enter the candidate. Generated deployment files are a separate artifact.
    actual = {Path(s) for s in run('git','ls-files','-m','-o','--exclude-standard','-z',cwd=source).split('\0') if s}
    if actual-paths:
        raise ValueError('Unexpected source changes: '+str(sorted(actual-paths)))
    if actual:
        run('git','add','--',*sorted(str(p) for p in actual), cwd=source)
    return len(actual)


def gate(summary):
    report = read(summary)
    if set(report['sites']) != set(LANGUAGES) or report['englishArticlesScanned'] != 130:
        raise ValueError('Expected 13 complete sites and 130 unique English articles')
    if report['substantialDuplicateArticles']:
        raise ValueError('Substantially duplicated English articles')
    for site, languages in LANGUAGES.items():
        row = report['sites'][site]
        if row['errors'] or row['enArticles'] != 10 or row['enFAQ'] <= 20:
            raise ValueError(f'{site}: incomplete English or failed checks; see acceptance report')
        if row['completeLocales'] != 1 + len(languages) or row['languages'] != 1 + len(languages):
            raise ValueError(f'{site}: incomplete locale coverage')
    print('Verified every article and FAQ edition on all 13 sites')


if __name__ == '__main__':
    p=argparse.ArgumentParser()
    p.add_argument('action', choices=['inputs','install','gate'])
    p.add_argument('path', type=Path)
    a=p.parse_args()
    if a.action=='gate':gate(a.path)
    elif a.action=='inputs':outputs(request(a.path))
    else:print('Staged',install(Path.cwd(),request(a.path)),'native content files')
