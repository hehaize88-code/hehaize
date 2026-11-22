// The only inputs to the translation provider are content from the public catalogue,
// seller option lists, or the English editorial renderer. Never proxy arbitrary text.
const LANGS = 'en de fr es it nl pt-br pl ro sv zh da fi el cs hu bg sk hr ja ko vi th id'.split(' ');
const ORIGINAL = new Set(['en', 'de', 'es', 'pt-br']);
const ORIGIN = 'https://cssbuychina.net';
const languageTag = l => ({'pt-br':'pt-BR', zh:'zh-CN'}[l] || l);
const splitLocale = path => {
  const first = path.split('/')[1], lang = LANGS.includes(first) ? first : 'en';
  return [lang, LANGS.includes(first) ? path.slice(first.length + 1) || '/' : path];
};
const localPath = (path,lang) => lang === 'en' ? path : '/' + lang + (path === '/' ? '' : path);
const edition = /^\/(?:$|(?:about|contact|faq|privacy|terms|categories|how-it-works|shipping|qc)\/?$|(?:articles|guides)(?:\/[a-z0-9-]+)?\/?$|catalog(?:\/|$))/;
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s).replace(/&(amp|apos|quot|lt|gt|nbsp|#x[0-9a-f]+|#\d+);/gi,(orig,x)=>{
  if (x[0] !== '#') return ({amp:'&',apos:"'",quot:'"',lt:'<',gt:'>',nbsp:' '})[x.toLowerCase()];
  const n = x[1].toLowerCase() === 'x' ? parseInt(x.slice(2),16) : Number(x.slice(1));
  return n>0 && n<=0x10ffff ? String.fromCodePoint(n) : orig;
});
const brand = /\b(?:CSSBuy|Weidian|Taobao|Tmall|Nike(?: Air (?:Force|Jordan) \d+)?|Jordan|Adidas|New Balance|Louis Vuitton|LV|Gucci|Burberry|Prada|Miu Miu|The North Face|Chrome Hearts|Stone Island|Palm Angels|Moncler|Amiri|Balmain|Balenciaga|Asics|Salomon|Dior|Off[- ]White|Polo Ralph Lauren|Ralph Lauren|Supreme|Stussy|Corteiz|Alexander McQueen|Yeezy|Converse|Puma|Fear of God|Fendi|Diesel|Bottega Veneta|Arc'teryx|Timberland|Carhartt|DSquared2|Frankfurter|Oopbuy|Superbuy|Kakobuy|AllChinaBuy|CNFans|Sugargoo|Acbuy|Hipobuy|Joyagoo)\b|\b(?=[A-Za-z0-9-]*\d)(?=[A-Za-z0-9-]*[A-Za-z])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\b/gi;
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
  const params=new URLSearchParams({client:'dict-chrome-ex', sl:'auto',tl:lang==='pt-br'?'pt':tag(lang)});
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
export async function translatePublished(values,lang,dictionary={}) {
  const result=new Map(), pending=new Map(), inputs=new Set();
  for(const original of new Set(values)){
    if (!original || !words.test(original) || exempt.test(original)) {result.set(original,original);continue;}
    const exact=Object.hasOwn(dictionary,original) && dictionary[original];
    if(typeof exact==='string' && exact!==original && (original.match(brand)||[]).every(s=>exact.toLowerCase().includes(s.toLowerCase()))) {result.set(original,exact);continue;}
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
  if(!edition.test(clean))return raw;
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
const calculatorLabels=['Volumetric weight','Greater of actual and volumetric','Rounded comparison weight'];
function editorialRuntime(lang,labels){
  const settings=JSON.stringify({lang,labels}).replace(/</g,'\\u003c');
  return '<script type="module">('+pageRuntime.toString()+')('+settings+')</script>';
}
function pageRuntime({lang,labels}){
  const prefix=lang==='en'?'':'/'+lang;
  const form=document.querySelector('.parcel-calculator form');
  if(form){form.addEventListener('input',()=>{form.nextElementSibling.replaceChildren();});
    form.addEventListener('submit',e=>{
      e.preventDefault();if(!form.reportValidity())return;
      const n=Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,Number(v)]));
      if(Object.values(n).some(v=>!Number.isFinite(v)||v<=0))return;
      const volume=n.length*n.width*n.height/n.divisor;
      const greater=Math.max(volume,n.actual), amounts=[volume,greater,Math.ceil((greater-1e-10)/n.step)*n.step];
      const list=document.createElement('dl');list.className='calculator-results';
      labels.forEach((label,i)=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
        dt.textContent=label;dd.textContent=new Intl.NumberFormat(lang,{maximumFractionDigits:3}).format(amounts[i])+' kg';
        row.append(dt,dd);list.append(row);});
      form.nextElementSibling.replaceChildren(list);
      window.gtag?.('event','parcel_weight_calculate',{site_language:lang});
    });
  }
  const cards=document.querySelector('.seo-products');
  if(cards)fetch('/api/catalog?lang='+encodeURIComponent(lang)).then(r=>r.ok?r.json():null).then(data=>{
    if(!data?.products?.length)return;
    const nodes=data.products.slice(0,4).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/.test(p.path)).map(p=>{
      const a=document.createElement('a');a.className='seo-product';a.href=prefix+'/catalog'+p.path;
      const image=document.createElement('img');const src=new URL(p.image,'https://cnbuycha.com');if(src.protocol==='https:')image.src=src.href;
      image.alt=p.title;image.width=image.height=400;
      const div=document.createElement('div'),h=document.createElement('h2'),strong=document.createElement('strong'),price=document.createElement('span'),code=document.createElement('small'),qc=document.createElement('span');
      h.textContent=p.title;price.dataset.priceAmount=p.price;price.dataset.priceCurrency='USD';price.textContent=new Intl.NumberFormat(lang,{style:'currency',currency:'USD'}).format(Number(p.price));code.dataset.currencyCode='';code.textContent='USD';qc.textContent='QC ↗';
      strong.append(price,' ',code);div.append(h,strong,qc);a.append(image,div);return a;
    });
    if(nodes.length){cards.replaceChildren(...nodes);document.dispatchEvent(new Event('cssbuy:prices'));}
  }).catch(()=>{});
  document.addEventListener('click',e=>{const a=e.target.closest?.('a[data-track-event]');if(a)window.gtag?.('event',a.dataset.trackEvent,{page_path:location.pathname,page_hostname:location.hostname,site_language:lang,link_url:a.href});});
  document.addEventListener('submit',e=>{if(e.target.dataset.trackForm)window.gtag?.('event',e.target.dataset.trackForm,{page_path:location.pathname,site_language:lang});});
}
const metaNames=new Set(['description','og:title','og:description','twitter:title','twitter:description','application-name']);
// Retry exactly the public values selected by the server. The DOM is never a
// source of new translation inputs, even on a search results page.
async function recoverPublicText(config, batches, google, tag) {
  const replacements=new Map(),pending=new Map(),key='cssbuy-text-v1:'+config.lang;
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
  while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement?.closest('script,style,textarea,code,pre,.unified-language'))continue;
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
  headers.set('content-language',languageTag(lang));headers.set('x-cssbuy-translation',failed?'partial':'complete');
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
    if(cl.split(/\s+/).includes('unified-language')){
      // Preserve native language names and current code. The links still get rewritten.
      const id={};skipped.add(id);el.onEndTag(()=>skipped.delete(id));
    }
    if(tag==='summary' && skipped.size){
      el.setInnerContent('<span aria-hidden="true">◎</span>'+languageTag(lang).split('-')[0].toUpperCase()+'<b aria-hidden="true">⌄</b>',{html:true});
    }
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
  if(staticEdition)book.on('body',{element(el){
    const ga='<script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-QY8MM7VZV2")</script>';
    el.append(ga+'<script type="module" src="/commerce/client.js?v=20261122"></script>'+prefix+'runtime__',{html:true});
  }});
  let html=await book.transform(response).text();
  if(staticEdition)calculatorLabels.forEach(s=>sourceValues.add(s));
  const {result,failed,missing}=await translatePublished(sourceValues,lang,dictionary);
  const replacements=new Map(rows.map(([m,v])=>[m,esc(result.get(v)||v)]));
  for(const [m,obj] of schemas)replacements.set(m,JSON.stringify(jsonText(obj,lang,s=>result.get(s)||s)).replace(/</g,'\\u003c'));
  if(staticEdition)replacements.set(prefix+'runtime__',editorialRuntime(lang,calculatorLabels.map(s=>result.get(s)||s)));
  html=html.replace(new RegExp(prefix+'(?:\\d+|schema\\d+|runtime)__','g'),m=>replacements.get(m)??m);
  if(missing.length)html=html.replace('</body>',()=>recoveryScript(lang,missing)+'</body>');
  return responseHtml(html,response,lang,failed);
}
const dictionaryCache=new Map();
async function localeDict(env,lang){
  if(!env?.ASSETS)return {};
  if(dictionaryCache.has(lang))return dictionaryCache.get(lang);
  const fetchJson=async(path,compressed=false)=>{
    try{
      const r=await env.ASSETS.fetch(new Request(ORIGIN+path));if(!r.ok || !r.body)return {};
      if(!compressed)return await r.json();
      const bytes=await r.arrayBuffer(),typed=new Uint8Array(bytes);
      const data=new Response(bytes);
      return typed[0]===31 && typed[1]===139?await new Response(data.body.pipeThrough(new DecompressionStream('gzip'))).json():await data.json();
    }catch{return {};}
  };
  const [base,names]=await Promise.all([
    lang==='en'?{}:fetchJson('/assets/locales/'+lang+'.json'),
    fetchJson('/assets/catalog-titles/'+(lang==='pt-br'?'pt':lang)+'.json.gz',true)
  ]);
  const combined=Object.assign(Object.create(null),base,names);
  if(dictionaryCache.size>=4)dictionaryCache.delete(dictionaryCache.keys().next().value);
  if(Object.keys(names).length)dictionaryCache.set(lang,combined);
  return combined;
}
export function withLocalization(worker){
  return {...worker,async fetch(request,env,ctx){
    const url=new URL(request.url),[lang,clean]=splitLocale(url.pathname);
    const original=(r=request)=>worker.fetch(r,env,ctx);
    if(!['GET','HEAD'].includes(request.method) || url.hostname==='www.cssbuychina.net')return original();
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
    if(!edition.test(clean) || /\.(?!html$)[a-z\d]{1,10}$/i.test(clean) || /\.(?:json|xml|js|css)$/i.test(clean))return original();
    const cat=/^\/catalog(?:\/|$)/.test(clean);
    let staticEdition=!cat && !ORIGINAL.has(lang);
    // Product and catalogue markup already has its own vanilla client; use the public
    // English renderer as the source so a partial word-by-word title is never retranslated.
    let translateAll=cat || staticEdition;
    const u=new URL(url);
    if(translateAll)u.pathname=clean;
    const cacheable=!url.search && !request.headers.has('authorization') && !request.headers.has('cookie');
    const cache=cacheable && globalThis.caches?.default;
    const cacheKey=new URL(url);cacheKey.searchParams.set('__cssbuy_locale_version','20261122-1');
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
    const out=await rewritePage(r,url,lang,clean,await localeDict(env,lang),translateAll,staticEdition);
    if(cache && out.headers.get('x-cssbuy-translation')==='complete' && !out.headers.has('set-cookie') && !/private|no-store/i.test(out.headers.get('cache-control')||'')){
      const copy=new Response(out.clone().body,out);copy.headers.set('cache-control','public, max-age=300');
      ctx?.waitUntil(cache.put(cacheKey.href,copy).catch(()=>{}));
    }
    return request.method==='HEAD'?new Response(null,out):out;
  }};
}
