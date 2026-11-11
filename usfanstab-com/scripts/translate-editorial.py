import json,os,time,urllib.request,urllib.parse,concurrent.futures,copy
from pathlib import Path
root=Path(__file__).resolve().parent.parent
source=root/'src/content/editorial-source.json'
out=root/'src/content/editorial.json'
cache_dir=root/'.translation-cache';cache_dir.mkdir(exist_ok=True)
proxy=urllib.request.ProxyHandler()
def leaves(obj):
    if isinstance(obj,dict):
        for k,v in obj.items():
            if k in ('slug','keyword','sources','source','reviewed'):continue
            if isinstance(v,str):yield obj,k,v
            else:yield from leaves(v)
    elif isinstance(obj,list):
        for k,v in enumerate(obj):
            if isinstance(v,str):yield obj,k,v
            else:yield from leaves(v)
def translate(lang):
    data=json.loads(source.read_text(encoding='utf-8-sig'))
    cp=cache_dir/(lang+'.json');cache=json.loads(cp.read_text(encoding='utf-8')) if cp.exists() else {}
    refs=list(leaves(data));missing=list(dict.fromkeys(t for _,_,t in refs if t not in cache))
    batches=[];batch=[];length=0
    for t in missing:
        if length+len(t)>3800 and batch:batches.append(batch);batch=[];length=0
        batch.append(t);length+=len(t)+1
    if batch:batches.append(batch)
    opener=urllib.request.build_opener(proxy)
    for bi,b in enumerate(batches):
        url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':'zh-CN' if lang=='zh' else lang,'dt':'t','q':'\n'.join(b)})
        for attempt in range(4):
            try:
                with opener.open(url,timeout=45) as r:raw=json.load(r)
                lines=''.join(s[0] or '' for s in raw[0]).strip().splitlines()
                if len(lines)!=len(b):raise ValueError(f'line mismatch {len(lines)}/{len(b)}')
                cache.update(zip(b,lines));cp.write_text(json.dumps(cache,ensure_ascii=False),encoding='utf-8');break
            except Exception as e:
                if attempt==3:raise
                time.sleep(2*(attempt+1))
        print(lang,bi+1,'/',len(batches),flush=True);time.sleep(.2)
    for parent,k,text in refs:parent[k]=cache[text]
    return lang,data
if __name__=='__main__':
    result={'en':json.loads(source.read_text(encoding='utf-8-sig'))}
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for lang,data in pool.map(translate,['de','fr','es','it','pt','pl','zh']):result[lang]=data
    out.write_text(json.dumps(result,ensure_ascii=False),encoding='utf-8')
    print('Saved all 8 locales',out)
