import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const raw=await fs.readFile('editorial-data/en.json','utf8');
const revision=createHash('sha256').update(raw).digest('hex').slice(0,16);
const locales='de fr es it nl pt-br pl ro sv da fi el cs hu bg sk hr ja ko vi th id'.split(' ');
const output='public/editorial/'+revision;
await fs.mkdir(output,{recursive:true});
const original=JSON.parse(raw);
function fields(copy){
 const refs=[];
 const add=(o,k)=>refs.push([o,k]);
 for(const a of copy.articles){
  add(a,'title');add(a,'description');
  for(const s of a.sections){add(s,'heading');s.paragraphs.forEach((_,i)=>add(s.paragraphs,i));}
 }
 for(const f of copy.faq){add(f,'question');add(f,'answer');}
 return refs;
}
async function translate(parts,locale){
 const url=new URL('https://translate.googleapis.com/translate_a/single');
 url.search=new URLSearchParams({client:'gtx',sl:'en',tl:locale==='pt-br'?'pt':locale,dt:'t',q:parts.join('\n')});
 const response=await fetch(url,{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('Translation service '+response.status+' ('+locale+')');
 const data=await response.json();
 const lines=data[0].map(row=>row[0]||'').join('').trim().split(/\s*\n\s*/);
 if(lines.length===parts.length&&lines.every(v=>v.trim()))return lines;
 if(parts.length===1)throw Error('Missing translation for '+locale);
 const middle=Math.ceil(parts.length/2);
 return [...await translate(parts.slice(0,middle),locale),...await translate(parts.slice(middle),locale)];
}
async function create(locale){
 const target=output+'/'+locale+'.json';
 try{await fs.access(target);return;}catch{}
 try{
  const r=await fetch('https://uufindsgrid.com/editorial/'+revision+'/'+locale+'.json',{signal:AbortSignal.timeout(4500)});
  if(r.ok&&r.headers.get('content-type')?.includes('json')){
   const edition=await r.json();
   if(edition.locale===locale&&edition.revision===revision&&edition.articles?.length===10&&edition.faq?.length===24){await fs.writeFile(target,JSON.stringify(edition));return;}
  }
 }catch{}
 const edition=structuredClone(original),refs=fields(edition);
 for(let i=0;i<refs.length;){
  let size=0;const batch=[];
  while(i<refs.length){const [o,k]=refs[i],str=o[k];if(batch.length&&size+str.length>2200)break;batch.push(str);size+=str.length+1;i++;}
  const result=await translate(batch,locale);
  for(let j=0;j<batch.length;j++){const [o,k]=refs[i-batch.length+j];o[k]=result[j];}
 }
 edition.locale=locale;edition.revision=revision;
 await fs.writeFile(target,JSON.stringify(edition));console.log('Translated editorial:',locale);
}
let next=0;
await Promise.all(Array.from({length:3},async()=>{while(next<locales.length)await create(locales[next++]);}));
