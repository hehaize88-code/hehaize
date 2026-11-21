import {title} from './locale.mjs';
const memo=new Map();
export async function translate(texts,lang,source='auto',requireTranslation=false){
  if(!texts.length)return [];
  const key=JSON.stringify([lang,source,texts,requireTranslation]);
  if(memo.has(key))return memo.get(key);
  const fallback=texts.map(text=>requireTranslation?null:title(lang,text)||text);
  if(lang==='en'&&source==='auto'&&texts.every(s=>!/[\u3400-\u9fff]/u.test(s)))return texts;
  const url=new URL('https://translate.googleapis.com/translate_a/single');
  const batch=texts.map(s=>s.replace(/[\r\n]+/g,' ')).join('\n');
  if(batch.length>4500)return fallback;
  url.search=new URLSearchParams({client:'gtx',sl:source,tl:lang==='zh'?'zh-CN':lang,dt:'t',q:batch});
  try{
    const r=await fetch(url,{signal:AbortSignal.timeout(3500),cf:{cacheEverything:true,cacheTtl:604800}});
    if(!r.ok)throw Error('translation unavailable');
    const rows=(await r.json())[0].map(s=>s[0]).join('').trim().split(/\s*\n\s*/);
    if(rows.length!==texts.length||rows.some(x=>!x))return fallback;
    if(requireTranslation)rows.forEach((v,i)=>{if(v.toLowerCase()===texts[i].toLowerCase())rows[i]=null});
    if(memo.size>600)memo.clear();
    memo.set(key,rows);return rows;
  }catch{
    if(texts.length!==1||batch.length>160||!/[a-z]{3}|[\u3400-\u9fff]/.test(batch)||!/[a-z]{3}/.test(fallback[0]||'')&&source==='auto')return fallback;
    try{
      const alt=new URL('https://api.mymemory.translated.net/get');
      const sl=source==='auto'?(/[\u3400-\u9fff]/.test(batch)?'zh-CN':'en'):source;
      if(sl===lang)return fallback;
      alt.search=new URLSearchParams({q:batch,langpair:sl+'|'+(lang==='zh'?'zh-CN':lang)});
      const r=await fetch(alt,{signal:AbortSignal.timeout(3000),cf:{cacheEverything:true,cacheTtl:86400}});
      const d=await r.json(),value=d.responseData?.translatedText?.trim();
      if(!r.ok||Number(d.responseStatus)!==200||d.quotaFinished||!value||(requireTranslation&&value.toLowerCase()===batch.toLowerCase()))return fallback;
      if(memo.size>600)memo.clear();memo.set(key,[value]);return [value];
    }catch{return fallback}
  }
}
