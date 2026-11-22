// Reference-site ordering. Use these same route codes for language alternates and sitemaps.
const SITE_LOCALES = Object.freeze({
  en:'English', de:'Deutsch', fr:'Français', es:'Español', it:'Italiano',
  nl:'Nederlands', pt:'Português', pl:'Polski', ro:'Română', sv:'Svenska',
  'zh-cn':'简体中文', da:'Dansk', fi:'Suomi', el:'Ελληνικά', cs:'Čeština',
  hu:'Magyar', bg:'Български', sk:'Slovenčina', hr:'Hrvatski', ja:'日本語',
  ko:'한국어', vi:'Tiếng Việt', th:'ไทย', id:'Bahasa Indonesia'
});
const nativeEditorial = new Set(['en','de','es','fr','it']);
const localizedLabels = new Set(['aria-label','title','placeholder','alt','data-error','data-actual-label','data-volume-label','data-billed-label','data-cost-label','data-norate']);
const machineLocale = lang => lang === 'zh-cn' ? 'zh-CN' : lang;
const localeEscape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decodeEntities = s => s.replace(/&(amp|lt|gt|quot|apos|nbsp|#(?:[0-9]+|x[\da-f]+));/gi,(s,k)=>{
  if(k[0]!=='#')return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '})[k.toLowerCase()];
  const n=k[1].toLowerCase()==='x'?parseInt(k.slice(2),16):Number(k.slice(1));
  return n>0 && n<=0x10ffff?String.fromCodePoint(n):s;
});
const translationMemo = new Map();
const localeVersion = '20261122-locale-6';
const namedBrands = /^(?:HipoBuyy?(?: Sheet)?|Oopbuy|Kakobuy|Weidian|CNFans|Superbuy|USFans|Sugargoo|Litbuy|Lovegobuy|CSSBuy|Rizzitgo|Joyagoo|Nike|Adidas|SKU|USD|EUR|CNY|GBP|CAD|AUD|JPY|HKD|PLN|SEK|CHF|DKK|NOK|KRW|IDR|MXN|BRL|QC|FAQ)$/i;
function needsTranslation(text,lang,translatePage) {
  return /\p{L}/u.test(text) && !namedBrands.test(text) && !/^(?:https?:\/\/|www\.|[\w.-]+@\w|(?=[0-9A-Z-]*\d)[0-9A-Z-]+$)/.test(text) &&
    (translatePage || lang==='en' && /[\u3400-\u9fff]/.test(text));
}
function pageLink(value,lang,origin) {
  if(!value||(!value.startsWith('/')&&!value.startsWith('http')))return value;
  let u;try {u=new URL(value,origin)}catch{return value}
  if(u.origin!==origin && u.hostname!=='hipobuyy-sheet.com')return value;
  const first=u.pathname.split('/')[1];
  if(!Object.hasOwn(SITE_LOCALES,first))return value;
  u.pathname=u.pathname.replace(/^\/[^/]+/,'/'+lang);
  return value.startsWith('/') ? u.pathname+u.search+u.hash : u.href;
}
let providerRetryAfter=0;
async function requestTranslation(batch,lang,fetchTranslation) {
  if(Date.now()<providerRetryAfter)throw Error('Translation service 429');
  const url=new URL('https://translate.googleapis.com/translate_a/single');
  url.search=new URLSearchParams({client:'gtx',sl:'auto',tl:machineLocale(lang),dt:'t',q:batch.join('\n')});
  let response;
  for(let attempt=0;attempt<2;attempt++){
    try {
      response=await fetchTranslation(url,{signal:AbortSignal.timeout(12000),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':604800,'300-599':0}}});
      if(response.ok)break;
      if(response.status===429){providerRetryAfter=Date.now()+60000;throw Error('Translation service 429')}
      if(attempt||response.status<500&&response.status!==429)throw Error('Translation service '+response.status);
    } catch(error){if(attempt||Date.now()<providerRetryAfter)throw error}
  }
  if(!response?.ok)throw Error('Translation service unavailable');
  const data=await response.json();
  const result=data[0].map(row=>row[0]||'').join('').trim().split(/\r?\n/);
  if(result.length!==batch.length || result.some(s=>!s.trim())) {
    if(batch.length===1 && result.some(s=>s.trim()))return [result.join(' ')];
    if(batch.length<2)throw Error('Empty translation');
    const half=Math.ceil(batch.length/2);
    return [...await requestTranslation(batch.slice(0,half),lang,fetchTranslation),...await requestTranslation(batch.slice(half),lang,fetchTranslation)];
  }
  return result.map(s=>s.trim());
}
// Protect commercial names embedded in prose, without treating a colour such as
// "Purple" by itself as a brand. Match longer model families before their brands.
const productNamePattern = /(?<![\p{L}\p{N}])(?:Nike\s+(?:Air\s+Force\s+1|ZoomX\s+Vaporfly\s+Next%|Free\s+Metcon\s*\d+|Air\s+Max(?:\s+(?:\d+|Plus|DN|SC))?|Dunk\s+(?:Low|High))|Air\s+Jordan\s+\d+(?:\s+Retro)?|New\s+Balance(?:\s+(?:\d+[A-Za-z]*|[A-Za-z]+\d+))?|Pol[eè]ne(?:\s+Paris)?|Numéro Neuf|Audemars Piguet(?: Royal Pop)?|Giuseppe Zanotti|Dr\. Martens|Christian Louboutin|Saint Laurent(?: Opyum)?|The North Face|Stone Island|Canada Goose|Chrome Hearts|Louis Vuitton|Ralph Lauren|Purple Brand|Off-White|Hello Kitty|Valley Dreams|Vale Dreams|Balmain|Amiri|Nike|Adidas|Jordan|Burberry|SWATCH|Lego|Diesel|Rimowa|Gucci|Prada|Dior|Balenciaga|Valentino|Fendi|Chanel|Moncler|Asics|Salomon|Onitsuka Tiger|Hipobuyy?|Weidian|Oopbuy|Kakobuy|Superbuy|Sugargoo)(?![\p{L}\p{N}])/giu;
const slashNamePattern = /[A-Za-z][A-Za-z0-9'.-]*(?:\s*\/\s*[A-Za-z][A-Za-z0-9'.-]*)+/g;
function protectProductNames(text) {
  const parts=[];
  const hide=s=>{const marker='⟪'+(parts.length+1)+'⟫';parts.push([marker,s]);return marker};
  const lists=text.replace(slashNamePattern,list=>{
    const names=list.split(/\s*\/\s*/);
    const known=names.filter(name=>[...name.matchAll(productNamePattern)].some(m=>m[0].length===name.length));
    // Purple is a clothing label in named designer lists. Black/White sizes and
    // other unbranded option groups stay available for normal translation.
    return known.length>=2 || known.length===names.length-1&&names.includes('Purple')?hide(list):list;
  });
  return {input:lists.replace(productNamePattern,hide),parts};
}
async function translateProductBatch(batch,lang,fetchTranslation){
  const masked=batch.map(protectProductNames);
  const inputs=masked.map(m=>m.input);
  const values=await requestTranslation(inputs,lang,fetchTranslation);
  return Promise.all(values.map(async (value,index)=>{
    const {parts,input}=masked[index];
    if(parts.every(([marker])=>value.includes(marker))){
      for(const [marker,name] of parts)value=value.replaceAll(marker,name);
      return value;
    }
    // Some language engines rewrite bracket glyphs. Translate only the words
    // surrounding each name if a protected marker was lost.
    const names=new Map(parts), chunks=input.split(/(⟪\d+⟫)/);
    const descriptors=[...new Set(chunks.filter(s=>!names.has(s)&&/\p{L}/u.test(s)).map(s=>s.trim()))];
    const results=descriptors.length?await requestTranslation(descriptors,lang,fetchTranslation):[];
    const translated=new Map(descriptors.map((s,i)=>[s,results[i]]));
    return chunks.map(s=>names.get(s)??(translated.has(s.trim())?s.replace(/\S[\s\S]*\S|\S/,translated.get(s.trim())):s)).join('');
  }));
}
const bundledLocales=new Map();
async function localeAsset(env,path,origin) {
  if(bundledLocales.has(path))return bundledLocales.get(path);
  try {
    const res=await env.ASSETS.fetch(new Request(new URL('/assets/'+path,origin)));
    if(!res.ok)return null;
    const bytes=await res.arrayBuffer(),magic=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));
    const uncompressed=magic[0]===31&&magic[1]===139?
      new Response(new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'))):new Response(bytes);
    const values=await uncompressed.json();
    if(!values||typeof values!=='object'||Array.isArray(values))return null;
    if(bundledLocales.size>=9)bundledLocales.delete(bundledLocales.keys().next().value);
    bundledLocales.set(path,values);return values;
  } catch{return null}
}
async function bundledDictionary(env,lang,url){
  if(!env?.ASSETS || !Object.hasOwn(SITE_LOCALES,lang))return [];
  const paths=['locales/'+lang+'.json','catalog-locales/'+lang+'.json'];
  if(!nativeEditorial.has(lang)&&!url.pathname.startsWith('/api/')&&!/^\/[^/]+\/catalog(?:\/|$)/.test(url.pathname))paths.push('editorial-locales/'+lang+'.json.gz');
  return (await Promise.all(paths.map(p=>localeAsset(env,p,url.origin)))).filter(Boolean);
}
function dictionaryEntry(text,dict){
  for(const d of dict||[])if(Object.hasOwn(d,text)&&typeof d[text]==='string'&&d[text].length)return d[text];
}
function dictionaryPhrase(text,dict){
  const exact=dictionaryEntry(text,dict);if(exact)return exact;
  const id=/^Product ID (\d+)$/.exec(text), numbered=/^(.+?)((?::| )\s*\d+)$/.exec(text);
  if(id){const prefix=dictionaryEntry('Product ID',dict);if(prefix)return prefix+' '+id[1]}
  if(numbered){const base=dictionaryEntry(numbered[1],dict);if(base)return base+numbered[2]}
  const suffix=' | Hipobuy Spreadsheet',desc='. Product photos / QC. Product images from the source catalogue. Check the exact item, option and photo context before buying.';
  if(text.endsWith(suffix)){const title=dictionaryEntry(text.slice(0,-suffix.length),dict), tail=dictionaryEntry('Hipobuy Spreadsheet',dict);if(title&&tail)return title+' | '+tail}
  if(text.endsWith(desc)){const pieces=[text.slice(0,-desc.length),'Product photos / QC',desc.slice('. Product photos / QC. '.length)].map(k=>dictionaryEntry(k,dict));if(pieces.every(Boolean))return pieces.join('. ')}
}
function localeFailureCode(error){
  const status=/^Translation service (\d{3})$/.exec(error?.message||'');
  if(status)return 'provider-'+status[1];
  if(error?.name==='TimeoutError'||error?.name==='AbortError')return 'provider-timeout';
  if(error?.message==='Translation service unavailable')return 'provider-unavailable';
  if(error?.message==='Empty translation')return 'provider-empty';
  if(error?.name==='SyntaxError')return 'provider-format';
  if(error?.name==='TypeError')return 'type-error';
  return 'render-error';
}
async function localeStrings(strings,lang,fetchTranslation=fetch,dictionary=null) {
  const found=new Map(), groups=[];
  let group=[],length=0;
  for(const s of new Set(strings)) {
    const cached=dictionaryPhrase(s,dictionary)||translationMemo.get(lang+'\n'+s);
    if(cached){found.set(s,cached);continue}
    // Keep Unicode-heavy URLs below conservative intermediary limits.
    const size=encodeURIComponent(s).length;
    if(group.length && (length+size>5500 || group.length>=45)){groups.push(group);group=[];length=0}
    group.push(s);length+=size+3;
  }
  if(group.length)groups.push(group);
  let next=0;
  await Promise.all(Array.from({length:Math.min(4,groups.length)},async()=>{
    while(next<groups.length){
      const batch=groups[next++];
      let values;try{values=await translateProductBatch(batch,lang,fetchTranslation)}
      catch(error){
        found.pending??=new Map();
        found.failureCode=localeFailureCode(error);
        for(const s of batch){found.set(s,s);found.pending.set(s,protectProductNames(s))}
        continue;
      }
      batch.forEach((s,i)=>{
        found.set(s,values[i]);
        if(translationMemo.size>=6000)translationMemo.delete(translationMemo.keys().next().value);
        translationMemo.set(lang+'\n'+s,values[i]);
      });
    }
  }));
  return found;
}
function rewriteStructured(value,key,lang,origin,mark) {
  if(Array.isArray(value))return key==='inLanguage'?value.map(machineLocale):value.map(v=>rewriteStructured(v,key,lang,origin,mark));
  if(value && typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,rewriteStructured(v,k,lang,origin,mark)]));
  if(typeof value!=='string')return value;
  if(key==='inLanguage')return machineLocale(lang);
  if(value.startsWith('https://')||value.startsWith('/'))return pageLink(value,lang,origin);
  return ['name','headline','description','text','articleBody','caption','articleSection','keywords'].includes(key)?mark(value,'json'):value;
}
async function localeHtml(response,lang,sourceLang,url,fetchTranslation,dictionary) {
  const source=await response.text(), markers=new Map(), originals=new Set();
  // Never submit user-entered search terms to the translation service. Existing templates
  // keep the query only in URLs and form values; mask it if a future template echoes it.
  const hiddenTerms=[...new Set(['q','keywords'].map(k=>url.searchParams.get(k)?.trim()).filter(Boolean))].sort((a,b)=>b.length-a.length);
  const nonce='hipol10n'+crypto.randomUUID().replaceAll('-','')+'_';
  let productDepth=0,skipDepth=0,ldDepth=0,scriptBody='',nodeText='';
  const mark=(text,context='html',force=false)=>{
    const normalized=decodeEntities(text).trim().replace(/\s+/g,' ');
    let raw=normalized;
    const replacements=[];
    for(const term of hiddenTerms){
      if(!raw.includes(term))continue;
      const placeholder='⟦'+replacements.length+'⟧';
      raw=raw.replaceAll(term,placeholder);
      replacements.push([placeholder,term]);
    }
    if(!needsTranslation(raw,lang,sourceLang!==lang || force && lang!=='en'))return text;
    const marker=nonce+markers.size+'_';
    markers.set(marker,{raw,context,replacements}); originals.add(raw);
    return text.replace(/\S[\s\S]*\S|\S/,marker);
  };
  const localized=new HTMLRewriter()
    .on('*',{element(el){
      const tag=el.tagName,cls=(el.getAttribute('class')||'').split(/\s+/);
      if(cls.includes('catalog-card')||cls.includes('fx-control')||el.getAttribute('data-product-category')!==null){productDepth++;el.onEndTag(()=>{productDepth--})}
      if(['style','script','textarea'].includes(tag) || tag==='select'&&(el.getAttribute('id')==='language'||cls.includes('langs')||el.hasAttribute('data-currency-select'))){
        skipDepth++;
        const ld=tag==='script'&&el.getAttribute('type')==='application/ld+json';
        if(ld){ldDepth++;scriptBody=''}
        el.onEndTag(end=>{
          if(ld){
            let out;try {
              const data=JSON.parse(scriptBody);
              if(data['@type']==='WebSite'&&Array.isArray(data.inLanguage))data.inLanguage=Object.keys(SITE_LOCALES);
              out=JSON.stringify(rewriteStructured(data,'',lang,url.origin,mark)).replaceAll('<','\\u003c');
            }catch{out=scriptBody}
            end.before(out,{html:true});ldDepth--;
          }
          skipDepth--;
        });
      }
      if(tag==='html')el.setAttribute('lang',machineLocale(lang));
      if(el.hasAttribute('data-locale'))el.setAttribute('data-locale',lang);
      for(const [k,v] of [...el.attributes]){
        if(k==='href'||k==='action'||tag==='meta'&&el.getAttribute('property')==='og:url'&&k==='content'){
          const href=pageLink(v,lang,url.origin);if(href!==v)el.setAttribute(k,href);
        }
        if(localizedLabels.has(k)||k.startsWith('data-i18n-')||k==='content'&&tag==='meta'&&/^(description|og:(title|description)|twitter:(title|description))$/.test(el.getAttribute('name')||el.getAttribute('property')||'')){
          const val=mark(v,'html',productDepth>0 || k==='aria-label'&&v==='Language');
          if(val!==v)el.setAttribute(k,val);
        }
      }
      if(tag==='select' && (el.getAttribute('id')==='language'||cls.includes('langs'))){
        const options=Object.entries(SITE_LOCALES).map(([code,name])=>'<option lang="'+machineLocale(code)+'" value="'+localeEscape(pageLink(url.pathname+url.search,code,url.origin))+'"'+(code===lang?' selected':'')+'>'+name+'</option>').join('');
        el.setInnerContent(options,{html:true});
      }
      if(tag==='link'&&el.getAttribute('hreflang'))el.remove();
      if(tag==='link'&&el.getAttribute('rel')==='canonical'){
        const canonical=el.getAttribute('href');
        const alternates=[...Object.keys(SITE_LOCALES),'x-default'].map(code=>'<link rel="alternate" hreflang="'+machineLocale(code)+'" href="'+localeEscape(pageLink(canonical,code==='x-default'?'en':code,url.origin))+'">');
        el.after(alternates.join(''),{html:true});
      }
    }})
    .onDocument({text(token){
      if(ldDepth){scriptBody+=token.text;token.remove();return}
      if(skipDepth)return;
      nodeText+=token.text;
      if(!token.lastInTextNode){token.remove();return}
      // Raw markup in a text token is safe to restore exactly as parsed.
      const changed=mark(nodeText,'html',productDepth>0);
      token.replace(changed,{html:true});nodeText='';
    }});
  const html=await localized.transform(new Response(source)).text();
  const translated=await localeStrings(originals,lang,fetchTranslation,dictionary);
  let result=html.replace(new RegExp(nonce+'\\d+_','g'),marker=>{
    const {raw,context,replacements}=markers.get(marker);
    let value=translated.get(raw);
    for(const [placeholder,term] of replacements)value=value.replaceAll(placeholder,term);
    return context==='json'?JSON.stringify(value).slice(1,-1).replaceAll('<','\\u003c'):localeEscape(value);
  });
  if(translated.pending?.size){
    const fragments=[];
    for(const {raw,replacements} of markers.values())if(translated.pending.has(raw))fragments.push([raw,replacements]);
    const payload=JSON.stringify({lang, pending:[...translated.pending], fragments}).replaceAll('<','\\u003c');
    result=result.replace(/<\/body>/i,()=>'<script type="application/json" id="hipo-locale-pending">'+payload+'</script><script type="module" src="/assets/locale-recovery.mjs"></script></body>');
  }
  const headers=new Headers(response.headers);
  if(translated.pending?.size){
    headers.set('x-hipobuy-locale-error',translated.failureCode);headers.set('x-hipobuy-locale-pending',String(translated.pending.size));headers.set('cache-control','no-store');
  }
  for(const key of ['content-length','content-encoding','etag','last-modified'])headers.delete(key);
  headers.set('content-language',machineLocale(lang));
  return new Response(result,{status:response.status,headers});
}
// coreFetch accepts (request,env,ctx). Wrap outside all routes so localized markup includes
// the product panel, image-search messages, and page-specific metadata.
async function localeResponse(request,env,ctx,coreFetch,fetchTranslation=fetch) {
  const url=new URL(request.url), lang=url.pathname.split('/')[1];
  const catalogApi=['/api/catalog','/api/image-search/results'].includes(url.pathname);
  const apiLang=catalogApi?url.searchParams.get('lang'):null;
  if(!Object.hasOwn(SITE_LOCALES,lang)&&!Object.hasOwn(SITE_LOCALES,apiLang))return coreFetch(request,env,ctx);
  if(!['GET','HEAD'].includes(request.method))return coreFetch(request,env,ctx);
  if(url.hostname==='www.hipobuyy-sheet.com')return coreFetch(request,env,ctx);
  const cache=globalThis.caches?.default;
  const key=new URL(url);key.searchParams.set('__hipo_locale_cache',localeVersion);
  const cached=cache?await cache.match(key.href):null;
  if(cached)return request.method==='HEAD'?new Response(null,cached):cached;
  let result;
  try {
    const dictionary=await bundledDictionary(env,apiLang||lang,url);
    if(catalogApi){
      const response=await coreFetch(request,env,ctx);
      if(!response.ok || request.method==='HEAD')return response;
      const data=await response.json(), titles=[...(data.products||[]).map(p=>p.title),...(data.titles||[])];
      const translated=await localeStrings(titles.filter(s=>typeof s==='string'&&needsTranslation(s,apiLang,apiLang!=='en')),apiLang,fetchTranslation,dictionary);
      if(data.products)for(const item of data.products)item.title=translated.get(item.title)||item.title;
      if(data.titles)data.titles=data.titles.map(s=>translated.get(s)||s);
      if(translated.pending?.size)data.localePending=[...translated.pending];
      result=Response.json(data,{headers:{'content-language':machineLocale(apiLang),'cache-control':translated.pending?.size?'no-store':'public,max-age=60',...(translated.pending?.size?{'x-hipobuy-locale-error':translated.failureCode}:{})}});
    }else{
      const sourceLang=nativeEditorial.has(lang)&&!/^\/[^/]+\/catalog(?:\/|$)/.test(url.pathname)?lang:'en';
      const sourceUrl=new URL(url);sourceUrl.pathname=sourceUrl.pathname.replace(/^\/[^/]+/,'/'+sourceLang);
      const nativeRequest=new Request(sourceUrl,new Request(request,{method:'GET'}));
      const response=await coreFetch(nativeRequest,env,ctx);
      if(response.status>=300&&response.status<400){
        const headers=new Headers(response.headers),loc=headers.get('location');
        if(loc)headers.set('location',pageLink(loc,lang,url.origin));
        return new Response(null,{status:response.status,headers});
      }
      if(!response.headers.get('content-type')?.includes('text/html'))return response;
      result=await localeHtml(response,lang,sourceLang,url,fetchTranslation,dictionary);
    }
  } catch(error) {
    console.error('Locale render failed',apiLang||lang,error?.message);
    return new Response('Temporarily unavailable',{status:503,headers:{'retry-after':'30','cache-control':'no-store','x-hipobuy-locale-error':localeFailureCode(error)}});
  }
  if(result.ok&&cache&&!url.searchParams.has('q')&&!url.searchParams.has('keywords')&&!result.headers.has('set-cookie')&&!/private|no-store/i.test(result.headers.get('cache-control')||'')){
    const copy=new Response(result.clone().body,result);
    copy.headers.set('cache-control','public,max-age=300');
    ctx?.waitUntil(cache.put(key.href,copy).catch(()=>{}));
  }
  return request.method==='HEAD'?new Response(null,result):result;
}
