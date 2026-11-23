import concurrent.futures, json, pathlib, sys, re, time, urllib.request, shutil
import ctranslate2, sentencepiece
model_dir=pathlib.Path('model')
base='https://huggingface.co/jncraton/m2m100_418M-ct2-int8/resolve/7c1b2620a4e58dacecbd8bf89cfd6da7eb9eb7b0/'
model_dir.mkdir(exist_ok=True)
def fetch(name):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(base+name,timeout=120) as r, (model_dir/name).open('wb') as f:shutil.copyfileobj(r,f)
            return
        except OSError:
            if attempt==2:raise
            time.sleep(4)
with concurrent.futures.ThreadPoolExecutor(4) as pool:list(pool.map(fetch,['model.bin','config.json','shared_vocabulary.json','sentencepiece.bpe.model']))
lang=sys.argv[1]
token='__'+lang+'__'
if token not in json.loads((model_dir/'shared_vocabulary.json').read_text()):raise ValueError(lang)
engine=ctranslate2.Translator(str(model_dir),device='cpu',compute_type='int8',intra_threads=4)
sp=sentencepiece.SentencePieceProcessor(model_file=str(model_dir/'sentencepiece.bpe.model'))
out=pathlib.Path('translations');out.mkdir(exist_ok=True)
for path in sorted(pathlib.Path('editorial-translation/input').glob('*.json')):
    data=json.loads(path.read_text())
    if lang not in data['languages'] or data['group']!=int(sys.argv[2]):continue
    texts=data['texts']; dest={}
    for start in range(0,len(texts),48):
        batch=texts[start:start+48];keys=[];sentences=[]
        for text in batch:
            for sentence in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9“"])',text):
                seq=sp.encode(sentence,out_type=str)
                if len(seq)>490:raise ValueError('Sentence exceeds supported length: '+text[:60])
                keys.append(text);sentences.append(['__en__',*seq,'</s>'])
        results=engine.translate_batch(sentences,target_prefix=[[token]]*len(keys),beam_size=3,max_batch_size=32,max_decoding_length=510)
        for key,result in zip(keys,results):
            value=sp.decode([t for t in result.hypotheses[0] if t not in (token,'</s>')]);assert value.strip()
            dest.setdefault(key,[]).append(value.strip())
    (out/(path.stem+'.json')).write_text(json.dumps({k:' '.join(v) for k,v in dest.items()},ensure_ascii=False))
    print(path.stem,lang,len(texts),flush=True)
