"""Download the pinned INT8 MADLAD400-3B checkpoint, verify and atomically install."""
import concurrent.futures
import hashlib
import os
import pathlib
import shutil
import sys
import time
import urllib.request

REV='fd0b55729c074372eb84b52b9309a00dc65c40c4'
BASE=f'https://huggingface.co/cstr/madlad400-3b-ct2-int8/resolve/{REV}/'
FILES={'config.json':(224,None),'shared_vocabulary.json':(5477099,None),'spiece.model':(4427844,'ef11ac9a22c7503492f56d48dce53be20e339b63605983e9f27d2cd0e0f3922c'),'model.bin':(2950208290,'890ed3b7e4654dcf1b9e7f2ce6ce641447462e782881e81aac443568eb1ca702')}
def download(where,name):
    path=where/name
    size,digest=FILES[name]
    def valid(p):
        return p.exists() and p.stat().st_size==size and (not digest or checksum(p)==digest)
    if valid(path):return
    tmp=path.with_suffix('.part')
    for attempt in range(3):
        try:
            with urllib.request.urlopen(BASE+name+'?download=true',timeout=180) as src,tmp.open('wb') as dest:
                shutil.copyfileobj(src,dest,4*1024*1024)
            if not valid(tmp):raise ValueError(f'Checkpoint verification failed: {name}')
            os.replace(tmp,path)
            print('Ready',name,flush=True)
            return
        except (ValueError,OSError):
            if attempt==2:raise
            time.sleep(2**attempt)
def checksum(path):
    with path.open('rb') as stream:return hashlib.file_digest(stream,'sha256').hexdigest()
if __name__=='__main__':
    where=pathlib.Path(sys.argv[1]);where.mkdir(exist_ok=True,parents=True)
    with concurrent.futures.ThreadPoolExecutor(4) as pool:
        list(pool.map(lambda name:download(where,name),FILES))
