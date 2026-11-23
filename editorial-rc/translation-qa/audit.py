"""Read-only semantic risk checks on downloaded editorial dictionaries. Flags require human review."""
import argparse, collections, ctypes, ctypes.util, decimal, functools, hashlib, json, re, sys, unicodedata
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
import pycld2
from babel.numbers import get_decimal_symbol,get_group_symbol,get_currency_name,get_currency_symbol
from babel.units import format_unit
from lingua import Language,LanguageDetectorBuilder

LONG_SOURCE=140
LONG_TARGET=36
BRANDS='USFans LitBuy Sugargoo OrientDig CNShopper VigorBuy BBDBuy EastMallBuy iTaoBuy OOTDBuy KakoBuy HubBuy Superbuy'.lower().split()
LANGS='en de fr es it pt pl nl ro sv zh da fi el cs hu bg sk hr ja ko vi th id sl lt lv et ga mt'.split()
CJK={'zh','ja','ko','th'}
URL=re.compile(r'https?://[^\s<>\]\[“”‘’"]+',re.I)
NUMBER=re.compile(r'\d{1,3}(?:[\u0020\u00a0\u202f]\d{3})+(?:[.,]\d+)?|\d+(?:[.,\u066b\u066c]\d+)*')
ID=re.compile(r'(?<![\w-])(?:[A-Z]{1,5}[-]?\d+[A-Z\d-]*|\d+[A-Z]{1,4})(?![\w-])')
UNIT_ALIASES={
 'length-centimeter':'cm centimetre centimetres centimeter centimeters 公分 厘米 センチ センチメートル 센티미터', 
 'length-millimeter':'mm millimetre millimetres millimeter millimeters 毫米 ミリ ミリメートル 밀리미터',
 'mass-kilogram':'kg kgs kilogram kilograms kilogramme kilogrammes 公斤 千克 キロ キログラム 킬로그램',
 'mass-gram':'g grams gram gramme grammes 克 グラム 그램',
 'length-inch':'in inches inch 英寸 インチ 인치',
 'CNY':'cny rmb yuan yuans 元 圆 圓 人民币 人民幣 円 ユアン 위안 ￥ ¥',
 'USD':'usd dollars dollar 美元 美金 ドル 달러 $',
 'EUR':'eur euro euros 欧元 歐元 ユーロ 유로 €',
 'percent':'% percent percentage 百分之 퍼센트 パーセント',
}
UNIT_SOURCE={
 'length-centimeter':r'cm\b|centimet(?:er|re)s?\b','length-millimeter':r'mm\b|millimet(?:er|re)s?\b',
 'mass-kilogram':r'kg\b|kilogram(?:me)?s?\b','mass-gram':r'g\b|grams?\b','length-inch':r'inch(?:es)?\b',
 'CNY':r'cny\b|rmb\b|yuan\b','USD':r'usd\b|dollars?\b','EUR':r'eur\b|euros?\b','percent':r'%|percent\b'
}
NUM_WORDS='zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split()
SPELLED='|'.join(NUM_WORDS)
def norm(s):
    return ''.join(str(unicodedata.decimal(c)) if c.isdecimal() else c for c in unicodedata.normalize('NFKC',s)).lower().replace('\xad','').replace('\u200b','').replace('〇','零')
def textkey(s):return re.sub(r'\W+',' ',norm(s)).strip()
def uset(s):return {u.rstrip('.,;!?)。') for u in URL.findall(s)}
def val(s):
    try:return decimal.Decimal(s).normalize()
    except decimal.InvalidOperation:return None
def numbers(s,lang):
    s=norm(s);dec=get_decimal_symbol(lang);group=norm(get_group_symbol(lang))
    tokens=[]
    for raw in NUMBER.findall(s):
        raw=raw.replace(' ','');candidates=set()
        for candidate in [raw.replace(group,'').replace(dec,'.'),raw,raw.replace(',','.')]:
            n=val(candidate)
            if n is not None:candidates.add(n)
        tokens.append(candidates)
    return tokens

@functools.lru_cache(maxsize=1)
def icu():
    lib=ctypes.CDLL(ctypes.util.find_library('icui18n'));ver=lib._name.rsplit('.',1)[1];i=ctypes.c_int32
    new=getattr(lib,'unum_open_'+ver);new.argtypes=[i,ctypes.c_void_p,i,ctypes.c_char_p,ctypes.c_void_p,ctypes.POINTER(i)];new.restype=ctypes.c_void_p
    render=getattr(lib,'unum_formatInt64_'+ver);render.argtypes=[ctypes.c_void_p,ctypes.c_int64,ctypes.POINTER(ctypes.c_uint16),i,ctypes.c_void_p,ctypes.POINTER(i)];render.restype=i
    return new,render
@functools.lru_cache(maxsize=40)
def icu_lang(lang):
    e=ctypes.c_int32(0);new,_=icu();return new(5,None,0,lang.encode(),None,ctypes.byref(e))
@functools.lru_cache(maxsize=8192)
def spelled(n,lang):
    if n!=int(n) or n<0 or n>1000000:return ''
    err=ctypes.c_int32(0);buf=(ctypes.c_uint16*256)();_,render=icu()
    count=render(icu_lang(lang),int(n),buf,len(buf),None,ctypes.byref(err))
    return norm(bytes(buf)[:2*count].decode('utf-16-le')) if 0<count<=len(buf) and err.value<=0 else ''
def numeral_in_text(n,target,lang):
    if lang=='mt':
        forms={2:['żewġ','żewġt'],3:['tliet'],4:['erba’','erbat'],5:['ħames'],6:['sitt'],7:['seba’'],8:['tmien'],9:['disa’'],10:['għaxar']}
        if any(re.search(r'(?<!\w)'+re.escape(x)+r'(?!\w)',norm(target)) for x in forms.get(n,[])):return True
    w=spelled(n,lang)
    if not w:return False
    return w in norm(target) if lang in CJK else bool(re.search(r'(?<!\w)'+re.escape(w)+r'(?!\w)',norm(target)))
def units_for(source):
    out={}
    for unit,pattern in UNIT_SOURCE.items():
        for m in re.finditer(r'(?<![\w.,])(\d+(?:[.,]\d+)*|'+SPELLED+r')\s*(?:'+pattern+r')',source,re.I):
            word=m[1].lower();n=decimal.Decimal(NUM_WORDS.index(word)) if word in NUM_WORDS else val(word.replace(',',''))
            if n is not None:out.setdefault(unit,set()).add(n)
    for currency,mark in [('USD','$'),('CNY','¥'),('EUR','€')]:
        for match in re.findall(re.escape(mark)+r'\s*(\d+(?:\.\d+)?)',source):
            out.setdefault(currency,set()).add(val(match))
    return out
@functools.lru_cache(maxsize=512)
def aliases(code,lang):
    result=set(UNIT_ALIASES[code].split())
    if lang=='mt':
        result.update({'length-centimeter':['ċentimetru','ċentimetri','ċm'],'length-millimeter':['millimetru','millimetri'],'length-inch':['pulzier','pulzieri'],'mass-kilogram':['kilogramma','kilogrammi'],'percent':['fil-mija']}.get(code,[]))
    if code in ('CNY','USD','EUR'):
        result.add(get_currency_symbol(code,locale=lang));result.update(get_currency_name(code,count=n,locale=lang) for n in [1,2,5])
    elif code!='percent':
        for n in [1,2,3,5,11]:
            for length in ['long','short','narrow']:
                formatted=format_unit(n,code,length=length,locale=lang)
                label=re.sub(r'[\d\s.:]+',' ',formatted).strip()
                if label and code not in label:result.add(label)
    return {norm(s) for s in result if s}
def has_unit(text,code,lang):
    for alias in aliases(code,lang):
        if re.fullmatch(r'[a-z]{1,3}',alias):
            if re.search(r'(?<![^\W\d_])'+re.escape(alias)+r'(?![^\W\d_])',text):return True
        elif alias in text:return True
    return False

@functools.lru_cache(maxsize=1)
def detector():
    languages=[l for l in Language.all() if l.iso_code_639_1.name.lower() in set(LANGS)|{'sr','bs','ru','ms','nb','uk','fi','tr','ca'}]
    return LanguageDetectorBuilder.from_languages(*languages).with_low_accuracy_mode().build()
def langcheck(text,lang):
    reliable,_,stats=pycld2.detect(text,bestEffort=True)
    c=stats[0];tag=c[1].split('-')[0]
    if lang=='mt':
        if reliable and tag==lang and c[2]>=80:return 'cld2',None
        return 'cld2',f'{tag} ({c[2]}%)' if reliable and tag!=lang and c[2]>=80 else 'inconclusive'
    top=detector().compute_language_confidence_values(text)
    if not top:return 'lingua','inconclusive'
    lead=top[0];found=lead.language.iso_code_639_1.name.lower()
    if found==lang:return 'lingua',None
    if reliable and tag==lang and c[2]>=80:return 'lingua+cld2','inconclusive'
    if lead.value>=0.80 and (not reliable or tag==found or (tag!=lang and c[2]>=80)):
        return 'lingua',f'{found} {lead.value:.3f} / CLD2 {tag} {c[2]}%'
    return 'lingua','inconclusive'

def audit(data,lang,expected,site):
    flags=[];counts=collections.Counter();samples=[];dest_seen={};long_total=0
    def flag(issue,src,dst,detail=''):
        flags.append(dict(site=site,locale=lang,issue=issue,detail=detail,source=src,target=dst))
    for missing in expected-data.keys():flag('missing source key',missing,'')
    for extra in data.keys()-expected:flag('unexpected source key',extra,str(data[extra]))
    for src,dst in data.items():
        if not isinstance(dst,str) or not dst.strip():
            flag('empty translation',src,str(dst));continue
        clean=norm(dst);src_clean=norm(src)
        if src.count('http') or dst.count('http'):
            if uset(src)!=uset(dst):flag('literal URL changed',src,dst,str((uset(src),uset(dst))))
        src_brands={b for b in BRANDS if b in src_clean};out_brands={b for b in BRANDS if b in clean}
        if out_brands-src_brands:flag('unexpected platform name',src,dst,', '.join(sorted(out_brands-src_brands)))
        if src_brands-out_brands:flag('platform spelling or transliteration',src,dst,', '.join(sorted(src_brands-out_brands)))
        codes={v for v in ID.findall(src) if v not in {'1688','3D','2D'} and not re.fullmatch(r'\d+(?:CM|KG|MM|G|XL)',v)}
        missing=[k for k in codes if norm(k) not in clean]
        if missing:flag('example identifier changed',src,dst,', '.join(sorted(missing)))
        if re.search(r'<2[a-z]{2}>|</s>|<unk>|�',dst):flag('model control or replacement character',src,dst)
        unit_map=units_for(src)
        target_nums=numbers(dst,lang)
        source_nums=set()
        for raw in NUMBER.findall(norm(src)):
            n=val(raw.replace(' ','').replace(',',''))
            if n is not None:source_nums.add(n)
        for ns in unit_map.values():source_nums.update(ns)
        if source_nums or target_nums:
            disappeared=[str(n) for n in sorted(source_nums) if not any(n in nset for nset in target_nums) and not numeral_in_text(n,dst,lang)]
            if disappeared:flag('example number omitted or reformatted',src,dst,', '.join(disappeared))
            source_words={decimal.Decimal(NUM_WORDS.index(w)) for w in re.findall(r'\b('+SPELLED+r')\b',src_clean)}
            extra=[sorted(str(n) for n in vals) for vals in target_nums if not vals.intersection(source_nums|source_words)]
            if extra:flag('new digit or localized conversion',src,dst,str(extra))
            for u,ns in unit_map.items():
                if not has_unit(clean,u,lang):flag('quantity unit or currency changed',src,dst,u+' after '+', '.join(map(str,ns)))
        if len(src)>=LONG_SOURCE:
            long_total+=1
            if textkey(src)==textkey(dst):flag('long passage unchanged',src,dst)
            ratio=len(dst)/max(1,len(src))
            if ratio<(.14 if lang in CJK else .42) or ratio>2.35:flag('paragraph length outlier',src,dst,f'{ratio:.2f}')
            target_key=textkey(dst)
            if target_key in dest_seen:flag('same paragraph used for distinct source',src,dst,dest_seen[target_key])
            else:dest_seen[target_key]=src
            if len(dst)>=LONG_TARGET:
                method,issue=langcheck(dst,lang);counts[method]+=1
                if issue:flag('language uncertain' if issue=='inconclusive' else 'language mismatch',src,dst,issue)
            else:flag('long paragraph nearly empty',src,dst)
            parts=[textkey(s) for s in re.split(r'[.!?。！？]+',dst) if len(s.strip())>=22]
            src_parts=[textkey(s) for s in re.split(r'[.!?]+',src) if len(s.strip())>=22]
            if len(parts)!=len(set(parts)) and len(src_parts)==len(set(src_parts)):flag('repeated translated sentence',src,dst)
            samples.append((hashlib.sha256((site+lang+src).encode()).hexdigest(),src,dst))
    samples.sort()
    result=dict(site=site,locale=lang,expected=len(expected),received=len(data),longPassages=long_total,languageChecks=dict(counts),flags=dict(collections.Counter(f['issue'] for f in flags)))
    return result,flags,[dict(site=site,locale=lang,source=s,target=t) for _,s,t in samples[:2]]

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--input-packs',type=Path,default=ROOT/'mt-prod/editorial-translation/input')
    p.add_argument('--dictionaries',type=Path,help='Downloaded real dictionaries in SITE/LANG.json or LANG/SITE.json')
    p.add_argument('--out',type=Path,required=True);p.add_argument('--trial',action='store_true')
    args=p.parse_args();args.out.mkdir(parents=True,exist_ok=True)
    jobs=[];missing=[]
    if args.trial:
        for lang,file in [('de','madlad-paragraphs-de'),('de','de'),('fr','fr'),('mt','mt-beam3')]:
            src=ROOT/'mt-trial/results'/(file+'.json');jobs.append((file,lang,src,set(json.loads(src.read_text()))))
    else:
        if not args.dictionaries:p.error('Supply --dictionaries for real release dictionaries')
        for pack in sorted(args.input_packs.glob('*.json')):
            data=json.loads(pack.read_text()); langs=list(data['languages'])
            if pack.stem=='ootdbuygrid-com' and 'mt' not in langs:langs.append('mt')
            for l in langs:
                poss=[args.dictionaries/pack.stem/(l+'.json'),args.dictionaries/l/(pack.stem+'.json'),args.dictionaries/(pack.stem+'.'+l+'.json')]
                file=next((f for f in poss if f.is_file()),None)
                if file:jobs.append((pack.stem,l,file,set(data['texts'])))
                else:missing.append([pack.stem,l])
    summ=[];samples=[];all_flags=[]
    for site,lang,path,expect in jobs:
        signature=hashlib.sha256(path.read_bytes()+Path(__file__).read_bytes()+json.dumps(sorted(expect),ensure_ascii=False).encode()).hexdigest()
        cache_root=args.out/'checked';cache_root.mkdir(exist_ok=True)
        cache=cache_root/(site+'-'+lang+'.json')
        cached=json.loads(cache.read_text()) if cache.exists() else None
        if cached and cached[0]==signature:
            _,result,flags,inspection=cached
        else:
            data=json.loads(path.read_text());result,flags,inspection=audit(data,lang,expect,site)
            tmp=cache.with_suffix('.tmp');tmp.write_text(json.dumps([signature,result,flags,inspection],ensure_ascii=False));tmp.replace(cache)
        summ.append(result);all_flags.extend(flags);samples.extend(inspection)
    report=dict(scope='real model trials only' if args.trial else 'downloaded release dictionaries',audited=len(summ),awaiting=len(missing),pending=missing,totalKeys=sum(r['received'] for r in summ),longPassages=sum(r['longPassages'] for r in summ),totalFlags=len(all_flags),flagsByType=dict(collections.Counter(f['issue'] for f in all_flags)),editions=summ)
    for name,items in [('review',all_flags),('samples',samples)]:
        (args.out/(name+'.jsonl')).write_text(''.join(json.dumps(r,ensure_ascii=False)+'\n' for r in items))
    (args.out/'summary.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
    print({k:v for k,v in report.items() if k not in ['editions','pending']})
if __name__=='__main__':main()
