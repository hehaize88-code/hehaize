import {PRODUCT_UI,LANG_NAMES} from "./product-ui.js";
const names = LANG_NAMES;
// The only inputs to the translation provider are content from the public catalogue,
// seller option lists, or the English editorial renderer. Never proxy arbitrary text.
const LANGS = 'en de fr es it nl pt pl ro sv zh da fi el cs hu bg sk hr ja ko vi th id'.split(' ');
const ORIGINAL = new Set('en zh de pl es it fr pt ro sv'.split(' '));
const ORIGIN = 'https://joyagoochina.org';
const languageTag = l => ({zh:'zh-CN'}[l] || l);
const splitLocale = path => {
  const first = path.split('/')[1], lang = LANGS.includes(first) ? first : 'en';
  return [lang, LANGS.includes(first) ? path.slice(first.length + 1) || '/' : path];
};
const localPath = (path,lang) => lang === 'en' ? path : '/' + lang + path;
const edition = /^\/(?:$|[a-z][a-z0-9-]*\/?$|(?:articles|guides|product|products|catalog)(?:\/|$))/;
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s).replace(/&(amp|apos|quot|lt|gt|nbsp|#x[0-9a-f]+|#\d+);/gi,(orig,x)=>{
  if (x[0] !== '#') return ({amp:'&',apos:"'",quot:'"',lt:'<',gt:'>',nbsp:' '})[x.toLowerCase()];
  const n = x[1].toLowerCase() === 'x' ? parseInt(x.slice(2),16) : Number(x.slice(1));
  return n>0 && n<=0x10ffff ? String.fromCodePoint(n) : orig;
});
const brand = /\b(?:USFans|Litbuy|Lovegobuy|Itaobuy|CNShopper|HubBuy|OrientDig|CSSBuy|Weidian|Taobao|Tmall|Nike(?: Air (?:Force|Jordan) \d+)?|Jordan|Adidas|New Balance|Louis Vuitton|LV|Gucci|Burberry|Prada|Miu Miu|The North Face|Chrome Hearts|Stone Island|Palm Angels|Moncler|Amiri|Balmain|Balenciaga|Asics|Salomon|Dior|Off[- ]White|Polo Ralph Lauren|Ralph Lauren|Supreme|Stussy|Corteiz|Alexander McQueen|Yeezy|Converse|Puma|Fear of God|Fendi|Diesel|Bottega Veneta|Arc'teryx|Timberland|Carhartt|DSquared2|Frankfurter|Oopbuy|Superbuy|Kakobuy|AllChinaBuy|CNFans|Sugargoo|Acbuy|Hipobuy|Joyagoo)\b|\b(?=[A-Za-z0-9-]*\d)(?=[A-Za-z0-9-]*[A-Za-z])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\b/gi;
const words = /\p{L}/u;
const exempt = /^(?:[A-Z]{1,4}|https?:\/\/\S+|[\w.-]+\.(?:net|com)|\d+(?:[.,]\d+)?\s*(?:kg|cm|USD|CNY)?)$/;
const memory = new Map();
function remember(k,v){if(memory.size >= 8000) memory.delete(memory.keys().next().value);memory.set(k,v);}
function batches(values){
  const all=[];let row=[],size=0;
  for (const s of values) {
    const len=encodeURIComponent(s).length+4;
    if(row.length && (size+len>6100 || row.length>=30)){all.push(row);row=[];size=0;}
    row.push(s);size+=len;
  }
  if(row.length)all.push(row);
  return all;
}
async function google(lang, values, tag) {
  const params=new URLSearchParams({client:'dict-chrome-ex', sl:'auto',tl:tag(lang)});
  values.forEach(v=>params.append('q',v));
  const options={signal:AbortSignal.timeout(4200), cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':604800,'400-599':0}}};
  try{
    const r=await fetch('https://translate.googleapis.com/translate_a/t?'+params,options);
    if(r.ok){const body=await r.json();if(Array.isArray(body)&&body.length===values.length){
      const rows=body.map(x=>typeof x==='string'?x:x?.[0]);
      if(rows.every(x=>typeof x==='string'&&x.trim()))return rows;
    }}
  }catch {}
  const q=new URLSearchParams({client:'gtx',sl:'auto',tl:params.get('tl'),dt:'t',q:values.join('\n')});
  const r=await fetch('https://translate.googleapis.com/translate_a/single?'+q,{...options,signal:AbortSignal.timeout(4200)});
  if(!r.ok)throw Error('Translation unavailable');
  const body=await r.json(),out=body[0].map(x=>x[0]||'').join('').trim().split(/\s*\n\s*/);
  if(out.length!==values.length || out.some(s=>!s))throw Error('Incomplete translation');
  return out;
}
function dictionaryText(source,dictionary) {
  const normalized=source.replace(/&amp;/gi,'&').replace(/#[^\s#]+/g,'').replace(/\s+/g,' ').replace(/Ture Religion/gi,'True Religion').replace(/\bpans\b/gi,'pants').trim().toLowerCase();
  const direct=dictionary[source] ?? dictionary[normalized];
  if(typeof direct==='string')return direct;
  const decorated=source.match(/^([←·\s]*)(.*?)([.:↗\s]*)(\s+\d+)?$/u);
  if(decorated && decorated[2]!==source) {
    const [,left,label,right,number]=decorated;
    const translated=dictionary[label] ?? dictionary[label.toLowerCase()];
    if(typeof translated==='string')return left+translated+right+(number||'');
  }
  // The renderer composes metadata from the product title and known UI sentences.
  const separator=source.match(/ \| |\. (?=[A-Z])/);
  if(separator){
    const first=dictionaryText(source.slice(0,separator.index),dictionary);
    if(typeof first==='string'){
      const rest=dictionaryText(source.slice(separator.index+separator[0].length),dictionary);
      if(typeof rest==='string')return first+separator[0]+rest;
    }
  }
}
export async function translatePublished(values,lang,dictionary={}) {
  const result=new Map(), pending=new Map(), inputs=new Set();
  for(const original of new Set(values)){
    if (!original || !words.test(original)) {result.set(original,original);continue;}
    const exact=dictionaryText(original,dictionary);
    if(typeof exact==='string') {result.set(original,exact);continue;}
    if(exempt.test(original)){result.set(original,original);continue;}
    const names=[];
    const input=original.replace(brand,s=>{names.push(s);return '⟪'+(names.length-1)+'⟫';}).replace(/\s+/g,' ').trim();
    if (!words.test(input) || lang==='en' && !/[^\x00-\x7f]/.test(input)){result.set(original,original);continue;}
    pending.set(original,{input,names});
    if(!memory.has(lang+'\n'+input))inputs.add(input);
  }
  const queue=batches(inputs);
  let index=0,failed=false;const missing=[];
  await Promise.all(Array.from({length:Math.min(4,queue.length)},async()=>{
    while(index<queue.length){
      const part=queue[index++];
      try {const translated=await google(lang,part,languageTag);part.forEach((s,i)=>remember(lang+'\n'+s,translated[i]));}
      catch {failed=true;}
    }
  }));
  for(const [source,{input,names}] of pending){
    let value=memory.get(lang+'\n'+input);
    if(value && names.every((_,i)=>value.includes('⟪'+i+'⟫'))) result.set(source,value.replace(/⟪(\d+)⟫/g,(_,i)=>names[i]??''));
    else {failed=true;result.set(source,source);missing.push([source,input,names]);}
  }
  return {result,failed,missing};
}
function localizedUrl(raw,lang){
  if(!raw || /^(?:#|mailto:|tel:)/i.test(raw))return raw;
  let u; try {u=new URL(raw,ORIGIN);}catch{return raw;}
  if(u.origin!==ORIGIN)return raw;
  const [,clean]=splitLocale(u.pathname);
  if(clean.endsWith('.xml') || !edition.test(clean))return raw;
  u.pathname=localPath(clean,lang);u.searchParams.delete('reading_lang');
  return raw.startsWith('http')?u.href:u.pathname+u.search+u.hash;
}
function alts(clean){return [...LANGS,'x-default'].map(l=>'<link rel="alternate" hreflang="'+(l==='x-default'?l:languageTag(l))+'" href="'+ORIGIN+esc(localPath(clean,l==='x-default'?'en':l))+'">').join('');}
function jsonText(obj,lang,translate,key=''){
  if(Array.isArray(obj))return obj.map(x=>jsonText(x,lang,translate,key));
  if(obj && typeof obj==='object')return Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,jsonText(v,lang,translate,k)]));
  if(typeof obj!=='string')return obj;
  if(key==='inLanguage')return languageTag(lang);
  if(['headline','name','text','description','articleBody','alternativeHeadline'].includes(key))return translate(obj);
  if(['url','@id','item','target','mainEntityOfPage'].includes(key))return localizedUrl(obj,lang);
  return obj;
}
const metaNames=new Set(['description','og:title','og:description','twitter:title','twitter:description','application-name']);
// Retry exactly the public values selected by the server. The DOM is never a
// source of new translation inputs, even on a search results page.
async function recoverPublicText(config, batches, google, tag) {
  const replacements=new Map(),pending=new Map(),key='joyagoo-text-v1:'+config.lang;
  let previous={};
  try {previous=JSON.parse(sessionStorage.getItem(key)||'{}');}catch{}
  for(const [source,masked,names] of config.missing){
    if(Object.hasOwn(previous,source)){replacements.set(source,previous[source]);continue;}
    if(!pending.has(masked))pending.set(masked,[]);
    pending.get(masked).push({source,names});
  }
  const queue=batches(pending.keys());let idx=0;
  await Promise.all(Array.from({length:Math.min(3,queue.length)},async()=>{
    while(idx<queue.length){const row=queue[idx++];try{
      const output=await google(config.lang,row,tag);
      row.forEach((masked,i)=>pending.get(masked).forEach(({source,names})=>{
        const text=output[i];if(names.every((_,n)=>text.includes('⟪'+n+'⟫')))replacements.set(source,text.replace(/⟪(\d+)⟫/g,(_,n)=>names[n]??''));
      }));
    }catch{}}
  }));
  if(!replacements.size)return;
  try{sessionStorage.setItem(key,JSON.stringify(Object.fromEntries([...Object.entries(previous),...replacements].slice(-900))));}catch{}
  function replace(value){if(typeof value!=='string')return value;const trimmed=value.trim();return replacements.has(trimmed)?value.replace(trimmed,()=>replacements.get(trimmed)):value;}
  const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement?.closest('script,style,textarea,code,pre,.catalog-languages'))continue;
    const translated=replace(n.data);if(translated!==n.data)n.data=translated;
  }
  for(const el of document.querySelectorAll('[title],[alt],[aria-label],[placeholder],meta[content]'))for(const attr of ['title','alt','aria-label','placeholder','content']){
    if(!el.hasAttribute(attr))continue;const prior=el.getAttribute(attr),next=replace(prior);if(prior!==next)el.setAttribute(attr,next);
  }
  for(const el of document.querySelectorAll('script[type="application/ld+json"]'))try{el.textContent=JSON.stringify(JSON.parse(el.textContent,(k,v)=>replace(v))).replace(/</g,'\\u003c');}catch{}
}
function recoveryScript(lang,missing) {
  if(!missing.length)return '';
  const payload=JSON.stringify({lang,missing}).replace(/</g,'\\u003c');
  return '<script type="module">('+recoverPublicText.toString()+')('+payload+','+batches.toString()+','+google.toString()+','+languageTag.toString()+')</script>';
}
function responseHtml(html,original,lang,failed){
  const headers=new Headers(original.headers);headers.delete('content-length');headers.delete('content-encoding');headers.delete('etag');
  headers.set('content-language',languageTag(lang));headers.set('x-joyagoo-translation',failed?'partial':'complete');
  if(failed)headers.set('cache-control','no-store');
  return new Response(html,{status:original.status,headers});
}
async function rewritePage(response,url,lang,clean,dictionary,translateAll,staticEdition){
  const rows=[],sourceValues=new Set(),schemas=[],hidden=new Set(), skipped=new Set();
  let serial=0;
  const prefix='__cssloc'+crypto.randomUUID().replaceAll('-','')+'_';
  function valueMarker(raw){
    const value=decode(raw.trim());
    if(!value || !words.test(value) || [...url.searchParams.values()].some(s=>s.trim() && value.toLowerCase().includes(s.trim().toLowerCase())))return raw;
    sourceValues.add(value);
    const marker=prefix+(serial++)+'__';rows.push([marker,value]);return raw.replace(raw.trim(),()=>marker);
  }
  const book=new HTMLRewriter();
  // Every handler sees the parsed DOM, including parsed quoted attributes. Never read input values.
  book.on('*',{element(el){
    const tag=el.tagName,rel=el.getAttribute('rel'),cl=el.getAttribute('class')||'';
    if(tag==='head')el.append(alts(clean),{html:true});
    if(tag==='html')el.setAttribute('lang',languageTag(lang));
    if(el.hasAttribute('data-locale'))el.setAttribute('data-locale',lang);
    if(tag==='link'){
      if(rel==='alternate' && el.hasAttribute('hreflang'))el.remove();
      if(rel==='canonical')el.setAttribute('href',ORIGIN+localPath(clean,lang));
      if(staticEdition && ['modulepreload','preload'].includes(rel) && (rel==='modulepreload' || el.getAttribute('as')==='script'))el.remove();
    }
    if(tag==='small' && el.getAttribute('lang')==='en'){el.remove();return;}
    if(tag==='a'){
      const href=el.getAttribute('href'),alt=el.getAttribute('hreflang');
      if(alt || el.hasAttribute('data-locale-code')){
        const l=el.getAttribute('data-locale-code')||LANGS.find(x=>x===alt?.toLowerCase() || languageTag(x).toLowerCase()===alt?.toLowerCase() || x==='de'&&/^de/i.test(alt||''));
        if(l){el.setAttribute('href',localPath(clean,l)+url.search);el.setAttribute('class',lang===l?'active':'');el.setAttribute('data-locale-code',l);}
        if(!el.selfClosing){const id={};skipped.add(id);el.onEndTag(()=>skipped.delete(id));}
        return;
      }
      if(href)el.setAttribute('href',localizedUrl(href,lang));
    }
    if(tag==='form' && el.hasAttribute('action'))el.setAttribute('action',localizedUrl(el.getAttribute('action'),lang));
    if(tag==='script' && el.getAttribute('type')==='application/ld+json'){
      const id={type:'schema',data:''};hidden.add(id);
      el.onEndTag(end=>{hidden.delete(id);try{
        const obj=JSON.parse(id.data);jsonText(obj,lang,text=>{if(translateAll)sourceValues.add(text);return text;});
        const marker=prefix+'schema'+schemas.length+'__';schemas.push([marker,obj]);end.before(marker);
      }catch{end.before(id.data,{html:true});}});
      return;
    }
    if(['script','style','textarea','noscript','code','pre','svg'].includes(tag)){
      const id={type:'skip'};hidden.add(id);el.onEndTag(()=>hidden.delete(id));
      if(staticEdition && tag==='script')el.remove();
      return;
    }
    if(tag==='meta'){
      const name=el.getAttribute('name')||el.getAttribute('property');
      if(name==='og:url')el.setAttribute('content',ORIGIN+localPath(clean,lang));
      if(name==='og:locale')el.setAttribute('content',languageTag(lang).replace('-','_'));
      if(translateAll && metaNames.has(name) && el.hasAttribute('content'))el.setAttribute('content',valueMarker(el.getAttribute('content')));
    }
    if(translateAll && !skipped.size)for(const attr of ['alt','aria-label','title','placeholder']){
      if(el.hasAttribute(attr))el.setAttribute(attr,valueMarker(el.getAttribute(attr)));
    }
  }});
  let buffer='';
  book.onDocument({text(chunk){
    const current=[...hidden].at(-1);
    if(current?.type==='schema'){current.data+=chunk.text;chunk.remove();return;}
    if(!translateAll || current || skipped.size)return;
    buffer+=chunk.text;
    if(!chunk.lastInTextNode){chunk.remove();return;}
    const marked=valueMarker(buffer);chunk.replace(marked,{html:true});buffer='';
  }});
  book.on('.catalog-actions details > summary',{element(el){el.setInnerContent(names[lang]);}});
  book.on('.catalog-languages',{element(el){
    el.setInnerContent(LANGS.map(l=>'<a hreflang="'+l+'" href="'+esc(localPath(clean,l)+url.search)+'"'+(l===lang?' aria-current="page"':'')+'>'+names[l]+'</a>').join(''),{html:true});
  }});
  if(staticEdition)book.on('.shipping-worksheet',{element(el){el.append('<script defer src="/commerce/worksheet.js"></script>',{html:true});}});
  if(staticEdition)book.on('body',{element(el){
    el.append('<script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-QY8MM7VZV2")</script><script defer src="/mobile-reading.js?v=20261122"></script><script type="module" src="/commerce/client.js?v=20261122"></script>',{html:true});
  }});
  let html=await book.transform(response).text();
  const {result,failed,missing}=await translatePublished(sourceValues,lang,dictionary);
  const replacements=new Map(rows.map(([m,v])=>[m,esc(result.get(v)||v)]));
  for(const [m,obj] of schemas)replacements.set(m,JSON.stringify(jsonText(obj,lang,s=>result.get(s)||s)).replace(/</g,'\\u003c'));

  html=html.replace(new RegExp(prefix+'(?:\\d+|schema\\d+|runtime)__','g'),m=>replacements.get(m)??m);
  if(missing.length)html=html.replace('</body>',()=>recoveryScript(lang,missing)+'</body>');
  return responseHtml(html,response,lang,failed);
}
const dictionaryCache=new Map();
async function localeDict(env,lang){
  if(!env?.ASSETS)return {};
  if(dictionaryCache.has(lang))return dictionaryCache.get(lang);
  const fetchJson=async(path)=>{
    try{
      const r=await env.ASSETS.fetch(new Request(ORIGIN+path));
      return r.ok ? await r.json() : {};
    }catch{return {};}
  };
  const [titles,pages]=await Promise.all([fetchJson('/commerce/titles/'+lang+'.json'),ORIGINAL.has(lang) ? {} : fetchJson('/commerce/pages/'+lang+'.json')]);
  const combined=Object.assign(Object.create(null),titles,PRODUCT_UI[lang],pages);
  if(dictionaryCache.size>=4)dictionaryCache.delete(dictionaryCache.keys().next().value);
  if(Object.keys(titles).length)dictionaryCache.set(lang,combined);
  return combined;
}
export function withLocalization(worker){
  return {...worker,async fetch(request,env,ctx){
    // Node consumers of the native renderer do not supply the Workers HTML rewriting API.
    if(typeof HTMLRewriter==='undefined')return worker.fetch(request,env,ctx);
    const url=new URL(request.url),[lang,clean]=splitLocale(url.pathname);
    const original=(r=request)=>worker.fetch(r,env,ctx);
    if(!['GET','HEAD'].includes(request.method) || url.hostname==='www.joyagoochina.org')return original();
    let apiLocale=url.searchParams.get('lang');
    if(!apiLocale && ['/api/product-options','/api/catalog'].includes(url.pathname)){
      try{const ref=new URL(request.headers.get('referer'));if(ref.origin===url.origin)apiLocale=splitLocale(ref.pathname)[0];}catch{}
    }
    if(['/api/product-options','/api/catalog'].includes(url.pathname) && LANGS.includes(apiLocale)){
      const target=apiLocale,up=await original();
      if(!up.ok || request.method==='HEAD')return up;
      const data=await up.json(),records=[];
      if(url.pathname==='/api/product-options'){
        for(const group of data.groups||[]){records.push([group,'name']);for(const v of group.values||[])records.push([v,'label']);}
      }else for(const product of data.products||[])records.push([product,'title']);
      const {result,failed}=await translatePublished(records.map(([o,k])=>o[k]),target,await localeDict(env,target));
      records.forEach(([o,k])=>{o[k]=result.get(o[k])||o[k];});
      return Response.json(data,{headers:{'cache-control':failed?'no-store':'public, max-age=600','content-language':languageTag(target)}});
    }
    if(clean.endsWith('.xml') || !edition.test(clean) || /\.(?!html$)[a-z\d]{1,10}$/i.test(clean) || /\.(?:json|xml|js|css)$/i.test(clean))return original();
    const cat=/^\/catalog(?:\/|$)/.test(clean);
    let staticEdition=!cat && clean!=='/' && !ORIGINAL.has(lang);
    // Product and catalogue markup already has its own vanilla client; use the public
    // English renderer as the source so a partial word-by-word title is never retranslated.
    let translateAll=!ORIGINAL.has(lang) || (cat && lang==='en');
    const u=new URL(url);
    if(lang!=='en' && url.pathname==='/'+lang)return Response.redirect(url.origin+'/'+lang+'/'+url.search,308);
    if(translateAll)u.pathname=clean;
    const cacheable=!url.search && !request.headers.has('authorization') && !request.headers.has('cookie');
    const cache=cacheable && globalThis.caches?.default;
    const cacheKey=new URL(url);cacheKey.searchParams.set('__joyagoo_locale_version','20261122-1');
    if(cache){const found=await cache.match(cacheKey.href);if(found)return request.method==='HEAD'?new Response(null,found):found;}
    let r=await original(new Request(u,{method:'GET',headers:{accept:'text/html'}}));
    if(!cat && lang!=='en' && !staticEdition && r.status===404){
      u.pathname=clean;
      const fallback=await original(new Request(u,{headers:{accept:'text/html'}}));
      if(fallback.ok){r=fallback;staticEdition=true;translateAll=true;}
    }
    if(r.status>=300 && r.status<400 && translateAll){
      const dest=r.headers.get('location');if(dest)return Response.redirect(new URL(localizedUrl(new URL(dest,u).href,lang),url),r.status);
    }
    if(!r.ok || !r.headers.get('content-type')?.includes('text/html'))return request.method==='HEAD'?new Response(null,r):r;
    const out=await rewritePage(r,url,lang,clean,translateAll ? await localeDict(env,lang) : {},translateAll,staticEdition);
    if(cache && out.headers.get('x-joyagoo-translation')==='complete' && !out.headers.has('set-cookie') && !/private|no-store/i.test(out.headers.get('cache-control')||'')){
      const copy=new Response(out.clone().body,out);copy.headers.set('cache-control','public, max-age=300');
      ctx?.waitUntil(cache.put(cacheKey.href,copy).catch(()=>{}));
    }
    return request.method==='HEAD'?new Response(null,out):out;
  }};
}
