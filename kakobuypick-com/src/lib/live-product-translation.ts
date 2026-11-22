// Inputs originate in the public supplier catalog. This function accepts text only.
import {protectedNames, title as localTitle} from './commerce/locale.mjs';

const memory=new Map<string,string>();
const pending=new Map<string,Promise<void>>();
const identifiers=new RegExp(protectedNames.source+'|#[^\\s#]+|\\b(?=[A-Za-z0-9.-]*[A-Za-z])(?=[A-Za-z0-9.-]*[0-9])[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*\\b|\\d+(?:[.,:/-]\\d+)*','gi');
const key=(locale:string,phrase:string)=>locale+'\n'+phrase;

async function translateBatch(locale:string, batch:string[]) {
  const query=new URLSearchParams({client:'dict-chrome-ex',sl:'auto',tl:locale==='zh'?'zh-CN':locale});
  for(const phrase of batch)query.append('q',phrase);
  const encoded=query.toString();
  if(pending.has(encoded))return pending.get(encoded);
  const job=(async()=>{
    for(const host of ['translate.googleapis.com','clients5.google.com']){
      try{
        const response=await fetch('https://'+host+'/translate_a/t?'+encoded,{
          signal:AbortSignal.timeout(2800),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':604800,'400-599':0}}
        } as RequestInit);
        if(!response.ok)continue;
        const body=await response.json();
        if(!Array.isArray(body)||body.length!==batch.length)continue;
        const translations=body.map(row=>typeof row==='string'?row:row?.[0]);
        if(!translations.every(t=>typeof t==='string' && t.trim()))continue;
        translations.forEach((value,i)=>{
          if(memory.size>=5000)memory.delete(memory.keys().next().value!);
          memory.set(key(locale,batch[i]),value.trim());
        });
        return;
      } catch {}
    }
  })();
  pending.set(encoded,job);
  try{await job;}finally{pending.delete(encoded);}
}

type Piece={text:string,translate:boolean};
function splitPublicLabel(name:string,locale:string) {
  const pieces:Piece[]=[];
  const add=(text:string)=>{
    if(!text)return;
    const match=text.match(/^([^\p{L}]*)([\s\S]*?[\p{L}])([^\p{L}]*)$/u);
    if(!match){pieces.push({text,translate:false});return;}
    const [,begin,words,end]=match;
    if(begin)pieces.push({text:begin,translate:false});
    const needs=locale!=='en' || /[^\x00-\x7f]/u.test(words);
    pieces.push({text:words,translate:needs&&/\p{L}/u.test(words)});
    if(end)pieces.push({text:end,translate:false});
  };
  let position=0;
  for(const marker of name.matchAll(identifiers)){
    add(name.slice(position,marker.index));
    pieces.push({text:marker[0],translate:false});
    position=marker.index!+marker[0].length;
  }
  add(name.slice(position));
  return pieces;
}

export async function translateNewPublicLabels(locale:string,names:string[]) {
  const rows=names.map(name=>splitPublicLabel(name,locale));
  const unique=[...new Set(rows.flatMap(row=>row.filter(p=>p.translate).map(p=>p.text)))].filter(s=>!memory.has(key(locale,s)));
  const batches:string[][]=[];
  let list:string[]=[],length=0;
  for(const phrase of unique){
    const size=encodeURIComponent(phrase).length+3;
    if(size>6000)continue;
    if(list.length===24 || (list.length&&length+size>6000)){batches.push(list);list=[];length=0;}
    list.push(phrase);length+=size;
  }
  if(list.length)batches.push(list);
  let index=0;
  await Promise.all(Array.from({length:Math.min(3,batches.length)},async()=>{
    while(index<batches.length)await translateBatch(locale,batches[index++]);
  }));
  return rows.map(row=>row.map(p=>p.translate ? memory.get(key(locale,p.text))||localTitle(locale,p.text) : p.text).join(''));
}
