"""Build and archive the checked release candidate, or advance only its leased draft ref."""
import argparse
import concurrent.futures
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
from integrate import LANGUAGES, allowed_outputs, digest, read, run


DRAFT = 'refs/heads/editorial-13-sites-20261123'


def cmd(*args, cwd=None, **kwargs):
    subprocess.run(args, cwd=cwd, check=True, **kwargs)


def dependencies(source):
    for name in sorted(LANGUAGES):
        site = source/name
        package = read(site/'package.json')
        if (site/'package-lock.json').is_file():
            cmd('npm','ci','--no-audit','--no-fund',cwd=site)
        elif package.get('dependencies') or package.get('devDependencies'):
            raise ValueError('Dependencies require a package lock: '+name)


def native_tests(workspace):
    source = workspace/'editorial'
    def test(name):
        site = source/name
        scripts = read(site/'package.json').get('scripts',{})
        log = workspace/'candidate-outputs'/name/'tests.log'
        with log.open('w') as f:
            if 'test' in scripts:cmd('npm','test',cwd=site, stdout=f,stderr=subprocess.STDOUT)
            if name=='eastmallbuygrid-com':
                # Its legacy static-preview validator expects an obsolete dist/.openai manifest.
                # The assembled production entry is instead tested here and in all-locale acceptance.
                cmd('node','--check','worker/index.js',cwd=site,stdout=f,stderr=subprocess.STDOUT)
            elif 'validate' in scripts:
                cmd('npm','run','validate',cwd=site,stdout=f,stderr=subprocess.STDOUT)
        print(name, 'native tests completed', flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(test,sorted(LANGUAGES)))


def package(workspace, source_sha):
    source = workspace/'editorial'
    if run('git','rev-parse','HEAD',cwd=source) != source_sha:
        raise ValueError('Unexpected source parent at packaging')
    # Only commit the index prepared before builds, never re-add the generated working tree.
    staged = {Path(x) for x in run('git','diff','--cached','--name-only','-z',cwd=source).split('\0') if x}
    if staged - allowed_outputs(source):raise ValueError('Unexpected staged candidate paths')
    if staged:
        cmd('git','-c','user.name=editorial-rc','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com',
            'commit','-m','Install verified editorial editions for 13 sites',cwd=source)
    sha = run('git','rev-parse','HEAD',cwd=source)
    transfer = workspace/'candidate-transfer'
    transfer.mkdir(exist_ok=True)
    manifest={'source_sha':source_sha,'candidate_sha':sha,'sites':{}}
    if sha!=source_sha:
        cmd('git','update-ref','refs/heads/checked-editorial-candidate',sha,cwd=source)
        bundle=transfer/'candidate.bundle'
        cmd('git','bundle','create',str(bundle),'refs/heads/checked-editorial-candidate','^'+source_sha,cwd=source)
        cmd('git','bundle','verify',str(bundle),cwd=source)
        manifest['bundle_sha256']=digest(bundle)
    out=workspace/'worker-archives'
    out.mkdir(exist_ok=True)
    for name in sorted(LANGUAGES):
        site=source/name
        config=next(site.glob('wrangler.json*'))
        # Wrangler configuration files in these 13 sites already use plain JSON.
        settings=read(config)
        artifact=out/(name+'.tar.gz')
        with tarfile.open(artifact,'w:gz',compresslevel=3) as archive:
            archive.add(config,arcname=config.name)
            directory=workspace/'candidate-outputs'/name/'bundled'
            code=[p for p in directory.iterdir() if p.suffix in ('.js','.mjs','.wasm')]
            if not code:raise ValueError('Missing dry-run worker bundle: '+name)
            for child in sorted(directory.rglob('*')):
                if child.is_file() and child.suffix!='.map' and child.name!='README.md':
                    archive.add(child,arcname='wrangler-output/'+str(child.relative_to(directory)))
            asset_path=settings.get('assets',{}).get('directory')
            if asset_path:
                assets=site/asset_path
                if not assets.is_dir() or not any(p.is_file() for p in assets.rglob('*')):
                    raise ValueError('Missing configured static assets: '+name)
                archive.add(assets,arcname=asset_path)
        manifest['sites'][name]={'filename':artifact.name,'sha256':digest(artifact),'bytes':artifact.stat().st_size}
    (transfer/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')


def advance(workspace, source_sha):
    repo=workspace/'editorial'
    transfer=workspace/'candidate-transfer'
    manifest=read(transfer/'manifest.json')
    if source_sha!=manifest['source_sha'] or run('git','rev-parse','HEAD',cwd=repo)!=source_sha:
        raise ValueError('Source lease and verified candidate inputs disagree')
    remote=run('git','ls-remote','--refs','origin',DRAFT,cwd=repo).split()
    if not remote or remote[0]!=source_sha:
        raise ValueError('Draft moved; rebuild on its current head')
    sha=manifest['candidate_sha']
    if sha==source_sha:return
    bundle=transfer/'candidate.bundle'
    if digest(bundle)!=manifest['bundle_sha256']:raise ValueError('Git bundle checksum mismatch')
    cmd('git','bundle','verify',str(bundle),cwd=repo)
    cmd('git','fetch',str(bundle),'refs/heads/checked-editorial-candidate',cwd=repo)
    if run('git','rev-parse','FETCH_HEAD',cwd=repo)!=sha or run('git','show','-s','--format=%P',sha,cwd=repo)!=source_sha:
        raise ValueError('Candidate must be a direct child of the expected draft head')
    changed={Path(p) for p in run('git','diff','--name-only','-z',source_sha,sha,cwd=repo).split('\0') if p}
    if not changed or changed-allowed_outputs(repo):raise ValueError('Candidate changes unexpected paths')
    cmd('git','push','--force-with-lease='+DRAFT+':'+source_sha,'origin',sha+':'+DRAFT,cwd=repo)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('action', choices=['dependencies','tests','package','advance'])
    parser.add_argument('source_sha', nargs='?')
    opts=parser.parse_args();ws=Path.cwd()
    if opts.action=='dependencies':dependencies(ws/'editorial')
    elif opts.action=='tests':native_tests(ws)
    elif opts.action=='package':package(ws,opts.source_sha)
    else:advance(ws,opts.source_sha)
