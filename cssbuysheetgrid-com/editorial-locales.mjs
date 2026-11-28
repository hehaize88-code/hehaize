import za from './editorial-zh-a.json';
import zb from './editorial-zh-b.json';
import zc from './editorial-zh-c.json';
import zhFaq from './faq-zh.json';
const zhArticles=[...za,...zb,...zc];
const localCache=new Map();
const remoteLanguagesEnabled=false;
function localChinese(key){
 if(key==='faq'||key==='home-faq')return key==='faq'?zhFaq:zhFaq.slice(0,5);
 if(key==='index'||key==='home-articles')return (key==='index'?zhArticles:zhArticles.slice(0,3)).map(({slug,title,summary})=>({slug,title,summary}));
 return zhArticles.find(a=>a.slug===key);
}
function translatableFields(node,slots){
 if(Array.isArray(node)){node.forEach(value=>translatableFields(value,slots));return}
 if(!node||typeof node!=='object')return;
 for(const [key,value] of Object.entries(node)){
  if(['q','a','summary','title','heading','label'].includes(key)&&typeof value==='string')slots.push([node,key]);
  else if(key==='paragraphs')value.forEach((_,i)=>slots.push([value,i]));
  else if(typeof value==='object')translatableFields(value,slots);
 }
}
async function translateGroup(values,lang){
 const marker='\n';
 const qs=new URLSearchParams({client:'gtx',sl:'en',tl:lang,dt:'t',q:values.join(marker)});
 const response=await fetch('https://translate.googleapis.com/translate_a/single?'+qs,{signal:AbortSignal.timeout(6500),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':604800,'400-599':0}}});
 if(!response.ok)throw Error('Translation unavailable');
 const rows=(await response.json())[0].map(r=>r[0]||'').join('').trim().split(/\s*\n\s*/);
 if(rows.length===values.length&&rows.every(Boolean))return rows;
 if(values.length===1)return [rows.join(' ')];
 const mid=Math.ceil(values.length/2);
 return (await translateGroup(values.slice(0,mid),lang)).concat(await translateGroup(values.slice(mid),lang));
}
export async function localizeEditorial(key,source,lang){
 if(lang==='zh')return localChinese(key);
 if(lang==='en'||!remoteLanguagesEnabled)return source;
 const cacheKey=key+'/'+lang;
 if(localCache.has(cacheKey))return localCache.get(cacheKey);
 const edition=structuredClone(source),slots=[];translatableFields(edition,slots);
 const groups=[];let group=[],length=0;
 for(const slot of slots){const value=slot[0][slot[1]],size=encodeURIComponent(value).length;if(length+size>4600&&group.length){groups.push(group);group=[];length=0}group.push(slot);length+=size+5}
 if(group.length)groups.push(group);
 let i=0;await Promise.all(Array.from({length:Math.min(4,groups.length)},async()=>{while(i<groups.length){const g=groups[i++];const translated=await translateGroup(g.map(([o,k])=>o[k]),lang);g.forEach(([o,k],j)=>o[k]=translated[j])}}));
 if(localCache.size>360)localCache.delete(localCache.keys().next().value);localCache.set(cacheKey,edition);return edition;
}
export function editorialLanguage(lang){return lang==='zh'||remoteLanguagesEnabled?lang:'en'}
