"""Translate public editorial JSON inputs, one partition per invocation. Never overwrites inputs."""
import argparse
import json
import os
from pathlib import Path
import re
import resource
import time
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/"editorial-translation"))

import ctranslate2
import sentencepiece
from editorial_mt_glossary import prepare_for_mt

BOUNDARY=re.compile(r'(?<=[.!?])\s+(?=[A-Z0-9“"])')
def run(args):
    start=time.monotonic()
    items=json.loads(args.input.read_text())['texts']
    if len(items)!=len(set(items)):
        raise ValueError('Input texts must use unique keys')
    reviewed=json.loads(args.overrides.read_text()) if args.overrides else {}
    if not set(reviewed)<=set(items):raise ValueError('Override contains unknown source key')
    selected=[t for t in items[args.shard::args.shards] if t not in reviewed]
    bilingual=(args.model/'source.spm').exists()
    tag='<2'+args.lang+'>'
    if bilingual:
        sp=sentencepiece.SentencePieceProcessor(model_file=str(args.model/'source.spm'))
        target=sentencepiece.SentencePieceProcessor(model_file=str(args.model/'target.spm'))
    else:
        vocab=json.loads((args.model/'shared_vocabulary.json').read_text())
        if tag not in vocab:raise ValueError('Unsupported language '+args.lang)
        sp=sentencepiece.SentencePieceProcessor(model_file=str(args.model/'spiece.model'))
        target=sp
    engine=ctranslate2.Translator(str(args.model),device='cpu',compute_type='int8',inter_threads=1,intra_threads=args.threads)
    began=time.monotonic()
    out={k:[v] for k,v in reviewed.items()};total_tokens=0;repairs=0
    for offset in range(0,len(selected),16):
        group=selected[offset:offset+16]
        owners=[];encoded=[]
        for original in group:
            text=original if args.raw else prepare_for_mt(original)
            for sentence in BOUNDARY.split(text):
                labelled=sentence if bilingual else tag+' '+sentence
                tokens=sp.encode(labelled,out_type=str)+['</s>']
                if len(tokens)>512:raise ValueError(f'Oversize source: {original[:100]}')
                owners.append(original);encoded.append(tokens)
        preds=engine.translate_batch(encoded,max_batch_size=args.batch,beam_size=args.beam,max_input_length=512,max_decoding_length=600)
        for key,source,pred in zip(owners,encoded,preds,strict=True):
            tokens=pred.hypotheses[0]
            cap=max(90,5*len(source)+28)
            if not tokens or len(tokens)>=min(600,cap):
                candidate=engine.translate_batch([source],beam_size=3,repetition_penalty=1.08,no_repeat_ngram_size=5,max_decoding_length=cap)[0].hypotheses[0]
                if not candidate or len(candidate)>=cap:
                    candidate=engine.translate_batch([source],beam_size=2,repetition_penalty=1.1,no_repeat_ngram_size=3,max_decoding_length=cap)[0].hypotheses[0]
                if not candidate or len(candidate)>=cap:
                    raise ValueError('Needs reviewed translation for source '+repr(key)+'; sentence: '+sp.decode(source))
                tokens=candidate
                repairs+=1
            value=target.decode(tokens)
            if not value.strip():raise ValueError('Empty decoded output')
            out.setdefault(key,[]).append(value)
            total_tokens+=len(tokens)
    if set(out)!=set(items):raise ValueError('Dictionary keys differ from frozen source pack')
    args.out.parent.mkdir(parents=True,exist_ok=True)
    tmp=args.out.with_suffix('.tmp')
    tmp.write_text(json.dumps({k:' '.join(v) for k,v in out.items()},ensure_ascii=False))
    os.replace(tmp,args.out)
    elapsed=time.monotonic()-began
    print(json.dumps(dict(repairs=repairs,reviewed=len(reviewed),strings=len(out),source_words=sum(len(k.split()) for k in out),output_tokens=total_tokens,seconds=round(elapsed,2),load_seconds=round(began-start,2),tokens_per_second=round(total_tokens/elapsed,2),peak_rss_mib=round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/1024,2))),flush=True)
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('input','out','model'):p.add_argument('--'+name,type=Path,required=True)
    p.add_argument('--lang',required=True);p.add_argument('--threads',type=int,default=2)
    p.add_argument('--beam',type=int,default=2);p.add_argument('--batch',type=int,default=8)
    p.add_argument('--shards',type=int,default=1);p.add_argument('--shard',type=int,default=0)
    p.add_argument('--overrides',type=Path)
    p.add_argument('--raw',action='store_true');a=p.parse_args()
    if not 0<=a.shard<a.shards:p.error('Invalid partition')
    run(a)
