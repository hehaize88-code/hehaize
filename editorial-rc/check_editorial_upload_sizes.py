"""Build each site and measure its actual Wrangler dry-run upload without deployment."""
import argparse
import concurrent.futures
import json
import os
from pathlib import Path
import re
import subprocess

from install_editorial_locales import LANGUAGES

def measure(site,root,out,wrangler):
    base=root/site
    dest=out/site
    dest.mkdir(parents=True,exist_ok=True)
    env={**os.environ,'WRANGLER_SEND_METRICS':'false','ASTRO_TELEMETRY_DISABLED':'1','CI':'true','XDG_CONFIG_HOME':str(out/'xdg')}
    def run(command,fname):
        result=subprocess.run(command,cwd=base,env=env,capture_output=True,text=True,timeout=330)
        text=result.stdout+result.stderr
        (dest/fname).write_text(text)
        if result.returncode:raise ValueError(fname+': '+text[-850:])
        return text
    try:
        run(['npm','run','build'],'build.log')
        log=run([str(wrangler),'deploy','--dry-run','--outdir',str(dest/'bundled')],'dry-run.log')
        clean=re.sub(r'\x1b\[[0-9;]*[A-Za-z]','',log)
        m=re.search(r'Total Upload:\s*([\d.]+)\s*(KiB|MiB|B)\s*/\s*gzip:\s*([\d.]+)\s*(KiB|MiB|B)',clean)
        if not m:raise ValueError('Wrangler total missing')
        unit={'KiB':1024,'MiB':1024**2,'B':1}
        size=round(float(m[1])*unit[m[2]])
        return site,{'total_bytes_rounded':size,'gzip_bytes_rounded':round(float(m[3])*unit[m[4]]),'within_64_mib':size<64*1024**2}
    except Exception as exc:return site,{'error':str(exc)}
def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--root',type=Path,required=True)
    ap.add_argument('--out',type=Path,required=True)
    ap.add_argument('--site',action='append',choices=sorted(LANGUAGES))
    ap.add_argument('--wrangler',type=Path,default=Path('editorial/usfanstab-com/node_modules/.bin/wrangler'))
    a=ap.parse_args();out=a.out.resolve()
    if out==a.root.resolve() or a.root.resolve() in out.parents:raise ValueError('Dry-run output must be outside the source tree')
    results={}
    with concurrent.futures.ThreadPoolExecutor(3) as pool:
        futures=[pool.submit(measure,s,a.root.resolve(),out,a.wrangler.resolve()) for s in a.site or sorted(LANGUAGES)]
        for f in concurrent.futures.as_completed(futures):
            s,r=f.result();results[s]=r;print(s,r,flush=True)
    (out/'sizes.json').write_text(json.dumps(results,indent=2))
    if any('error' in r or not r['within_64_mib'] for r in results.values()):raise SystemExit(1)
if __name__=='__main__':main()
