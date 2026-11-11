import publishedTitles from '../content/title-translations.json' with {type:'json'};
const locales=new Set(['de','fr','es','it','pt','pl','zh']);
const memo=new Map<string,string>();
import {identities} from './brand-names.ts';
// Only public catalogue titles are sent for translation. No user images or order data.
// Published language strings cover the complete synchronized catalogue.
// Strict mode is used by the build-time sync; new live titles get a browser fallback.
export async function translateTitles(titles:string[],lang:string,strict=false,force=false):Promise<Map<string,string>> {
  const result=new Map(titles.map(t=>[t,t.replace(/\bpans\b/gi,'pants').replace(/\bTure Religion\b/gi,'True Religion').replace(/\s+/g,' ').trim()]));
  if(!locales.has(lang))return result;
  if(force)for(const t of titles)memo.delete(lang+'|'+t);
  for(const t of titles){const known=force?null:publishedTitles[lang]?.[t];if(known)memo.set(lang+'|'+t,known);}
  if(!strict){for(const t of titles)result.set(t,memo.get(lang+'|'+t)||t);return result;}
  const missing=[...new Set(titles)].filter(t=>!memo.has(lang+'|'+t));
  for(let i=0;i<missing.length;i+=40){
    const batch=missing.slice(i,i+40);
    try {
      const names:string[]=[];
      const normalized=batch.map(t=>t.replace(/\bpans\b/gi,'pants').replace(/\bTure Religion\b/gi,'True Religion').replace(/\s+/g,' ').trim().replace(identities,name=>`ZXQ${names.push(name)-1}ZXQ`));
      const url=new URL('https://translate.googleapis.com/translate_a/single');
      for(const [k,v] of Object.entries({client:'gtx',sl:'en',tl:lang==='zh'?'zh-CN':lang,dt:'t',q:batch.length===1?normalized[0]:normalized.map((t,j)=>`§${j}§ ${t}`).join('\n')}))url.searchParams.set(k,v);
      const response=await fetch(url,{signal:AbortSignal.timeout(8000)});
      if(!response.ok)throw new Error('Translation HTTP '+response.status);
      const body=await response.json();
      const translated=body[0].map((s:any)=>s[0]||'').join('').replace(/ZXQ\s*(\d+)\s*([\s\S]*?)\s*ZXQ/gi,(_:string,n:string,extra:string)=>(names[Number(n)]||'')+(extra?' '+extra.trim():''));
      const rows=[...translated.matchAll(/§\s*(\d+)\s*§\s*([\s\S]*?)(?=§\s*\d+\s*§|$)/g)];
      const lines=batch.map((_,j)=>rows.find(r=>Number(r[1])===j)?.[2]?.trim()||'');
      if(batch.length===1)lines[0]=translated.trim();
      if((batch.length>1&&rows.length!==batch.length)||lines.some(l=>!l)){throw new Error('Translation count mismatch');}
      batch.forEach((t,j)=>{if(lines[j]?.trim())memo.set(lang+'|'+t,lines[j].trim());});
      while(memo.size>12000)memo.delete(memo.keys().next().value!);
    }catch(e){if(e instanceof Error&&e.message==='Translation count mismatch'&&batch.length>1){const half=Math.ceil(batch.length/2);await translateTitles(batch.slice(0,half),lang,strict,force);await translateTitles(batch.slice(half),lang,strict,force);}else{console.error('Catalogue translation unavailable',lang,e instanceof Error?e.message:'unknown');if(strict)throw e;}}
  }
  for(const t of titles)result.set(t,memo.get(lang+'|'+t)||t);
  return result;
}

export function translationPending(raw:string,lang:string,translated:string){return locales.has(lang)&&raw===translated&&!publishedTitles[lang]?.[raw];}
