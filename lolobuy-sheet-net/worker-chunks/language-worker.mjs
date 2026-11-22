/** Localized public pages and dynamic catalogue text. */
const languages = Object.freeze({
  en:'English', de:'Deutsch', fr:'Français', es:'Español', it:'Italiano',
  nl:'Nederlands', pt:'Português', pl:'Polski', ro:'Română', sv:'Svenska',
  'zh-cn':'简体中文', da:'Dansk', fi:'Suomi', el:'Ελληνικά', cs:'Čeština',
  hu:'Magyar', bg:'Български', sk:'Slovenčina', hr:'Hrvatski', ja:'日本語',
  ko:'한국어', vi:'Tiếng Việt', th:'ไทย', id:'Bahasa Indonesia'
});
const legacy = new Set(['en','de','fr','es','it']);
const tag = locale => locale === 'zh-cn' ? 'zh-CN' : locale;
const has = key => Object.hasOwn(languages,key);
const getLocale = path => {
  const first = path.split('/')[1]?.toLowerCase();
  return has(first) ? first : 'en';
};
function stripPrefix(path) {
  return has(path.split('/')[1]?.toLowerCase()) ? path.replace(/^\/[^/]+/,'') || '/' : path;
}
function pathFor(path, locale) {
  const clean = stripPrefix(path);
  if (locale === 'en') return clean;
  return '/' + locale + (clean === '/' ? '/' : clean);
}
const filePath = /^(?:\/(?:api|assets|social|worker-chunks|\.well-known|products-320|products-480)(?:\/|$)|\/(?:signin-with-chatgpt|callback)(?:\/|$))|\.(?!html?$)[a-z0-9]{1,8}$/i;
function pageLink(value, url, locale, absolute=false) {
  if (!value || /^[#?]/.test(value)) return value;
  let target; try { target=new URL(value,url); } catch { return value; }
  if (target.origin !== url.origin || filePath.test(target.pathname)) return value;
  target.pathname = pathFor(target.pathname,locale);
  return absolute ? target.href : target.pathname + target.search + target.hash;
}
const attrs = ['placeholder','aria-label','alt','title'];
const esc = value => String(value).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const unescapeText = value => value.replace(/&(amp|quot|lt|gt|apos|nbsp|#\d+|#x[\da-f]+);/gi,(original,s)=>{
  if (s.startsWith('#')) {
    const n = s[1].toLowerCase()==='x' ? parseInt(s.slice(2),16) : Number(s.slice(1));
    return n>0 && n<=0x10ffff ? String.fromCodePoint(n) : original;
  }
  return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0'})[s] || original;
});
const nonEnglishScript = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Cyrillic}\p{Script=Thai}\p{Script=Greek}]/u;
function words(s,locale,product=false) {
  return s && s.length<=12000 && /\p{L}/u.test(s) && !/^https?:\/\//i.test(s) &&
    (locale!=='en' || nonEnglishScript.test(s)) && !/^(?:USD|EUR|CNY|JPY|GBP|CAD|AUD|CHF|HKD|KRW|LoloBuy|Weidian|[\w.-]+\.(?:com|net)|[\d\s.,/·%$€¥-]+)$/i.test(s.trim());
}
function batches(strings) {
  const out=[]; let batch=[], size=0;
  for(const s of strings) {
    const len = encodeURIComponent(s).length + 3;
    if(batch.length && (size+len>6800 || batch.length>=45)) {out.push(batch);batch=[];size=0;}
    batch.push(s);size+=len;
  }
  if(batch.length)out.push(batch);
  return out;
}
const memory=new Map();
async function translate(strings,locale,origin,ctx) {
  const dict=new Map(),missing=[];
  for(const s of new Set(strings)){
    const value=memory.get(locale+'\n'+s);
    if(value)dict.set(s,value);else missing.push(s);
  }
  const groups=batches(missing);
  async function group(items) {
    const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(items)));
    const id = [...new Uint8Array(digest)].map(i=>i.toString(16).padStart(2,'0')).join('');
    const key = new Request(origin+'/_locale/cache/v1/'+locale+'/'+id);
    const cache=globalThis.caches?.default;
    let translated;
    try { const hit=await cache?.match(key); if(hit)translated=await hit.json(); } catch {}
    if(!translated){
      const endpoint = new URL('https://translate.googleapis.com/translate_a/t');
      endpoint.search = new URLSearchParams({client:'dict-chrome-ex',sl:'auto',tl:tag(locale)});
      for (const s of items) endpoint.searchParams.append('q',s);
      const resp=await fetch(endpoint,{signal:AbortSignal.timeout(9000)});
      if(!resp.ok)throw Error('Translation provider status '+resp.status);
      const body=await resp.json();
      translated=Array.isArray(body) ? body.map(x=>Array.isArray(x)?x[0]:x):null;
      if(!translated||translated.length!==items.length||translated.some(x=>typeof x!=='string'||!x.trim()))throw Error('Incomplete translations');
      if(cache)ctx?.waitUntil?.(cache.put(key,Response.json(translated,{headers:{'cache-control':'public, max-age=2592000'}})).catch(()=>{}));
    }
    items.forEach((s,i)=>{
      const result=translated[i]; dict.set(s,result);
      if(memory.size>=3500)memory.delete(memory.keys().next().value);
      memory.set(locale+'\n'+s,result);
    });
  }
  for(let i=0;i<groups.length;i+=4) await Promise.all(groups.slice(i,i+4).map(group));
  return dict;
}
function nav(url,locale) {
  const link=(id)=>{
    const u=new URL(url);u.pathname=pathFor(u.pathname,id);
    return '<a translate="no" data-locale-target="'+id+'" lang="'+tag(id)+'" hreflang="'+tag(id)+'" href="'+esc(u.pathname+u.search)+'"'+(id===locale?' aria-current="true"':'')+'>'+languages[id]+'</a>';
  };
  return '<summary aria-label="'+languages[locale]+'" translate="no">'+languages[locale]+' ⌄</summary><div translate="no">'+Object.keys(languages).map(link).join('')+'</div>';
}
const metaText = new Set(['description','og:title','og:description','twitter:title','twitter:description']);
function parsePass(html,url,locale,dict,retry=false) {
  const found=new Set();
  let skip=0, productDepth=0, buffer='';
  const rw=new HTMLRewriter();
  const change=(value,product=false,entity=false)=>{
    const raw=entity?unescapeText(value):value;
    const clean=raw.trim();
    if(!words(clean,locale,product))return null;
    if(!dict){found.add(clean);return null;}
    if(!dict.has(clean))return null;
    return raw.replace(clean,()=>dict.get(clean));
  };
  rw.on('script, style, template, noscript, code, pre, textarea, [translate=no], .lolo-language', {
    element(el){if(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'].includes(el.tagName))return;skip++;el.onEndTag(()=>{skip--});}
  });
  rw.on('h1,h2,h3,.catalog-card,.styles,[data-style-name]',{
    element(el){productDepth++;el.onEndTag(()=>{productDepth--});}
  });
  rw.onDocument({text(chunk){
    if(skip)return;
    buffer+=chunk.text;
    if(!chunk.lastInTextNode){if(dict)chunk.remove();return;}
    const raw=buffer;buffer='';
    const result=change(raw,productDepth>0,true);
    if(dict){if(result!==null)chunk.replace(result);else chunk.replace(raw,{html:true});}
  }});
  rw.on('*',{element(el){
    if(skip || el.getAttribute('translate')==='no')return;
    for(const name of attrs){
      const original=el.getAttribute(name); if(!original)continue;
      const out=change(original, name==='alt');
      if(out!==null)el.setAttribute(name,out);
    }
  }});
  rw.on('meta',{element(el){
    const name=el.getAttribute('name') || el.getAttribute('property');
    if(metaText.has(name)){
      const content=el.getAttribute('content');if(!content)return;
      const out=change(content); if(out!==null)el.setAttribute('content',out);
    }
    if(dict && name==='og:url')el.setAttribute('content', pageLink(el.getAttribute('content'),url,locale,true));
  }});
  if(dict){
    rw.on('html',{element(el){el.setAttribute('lang',tag(locale));if(retry)el.setAttribute('data-locale-retry','');}});
    rw.on('[data-locale]',{element(el){el.setAttribute('data-locale',locale);}});
    rw.on('.lolo-language',{element(el){el.setInnerContent(nav(url,locale),{html:true});}});
    rw.on('a[href], form[action]',{element(el){
      const attr=el.tagName==='a'?'href':'action';const href=el.getAttribute(attr);
      if(!skip&&href)el.setAttribute(attr,pageLink(href,url,locale));
    }});
    rw.on('link[rel=alternate][hreflang]',{element(el){el.remove();}});
    rw.on('link[rel=canonical]',{element(el){
      const canonical=new URL(el.getAttribute('href'),url);
      canonical.pathname=pathFor(canonical.pathname,locale);el.setAttribute('href',canonical.href);
    }});
    rw.on('head',{element(el){
      const canonical=new URL(url);canonical.hash='';canonical.search='';
      let extra='';
      for(const code of [...Object.keys(languages),'x-default']){
        canonical.pathname=pathFor(url.pathname,code==='x-default'?'en':code);
        extra+='<link rel="alternate" hreflang="'+tag(code)+'" href="'+esc(canonical.href)+'">';
      }
      extra+='<script defer src="/language-client.js?v=1"></script><link rel="stylesheet" href="/language-menu.css?v=1">';
      el.append(extra,{html:true});
    }});
  }
  return {found,body:rw.transform(new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}})).text()};
}
function rewriteSchemas(html,url,locale,found,dict) {
  const prose = new Set(['name','headline','description','text','caption','alternativeHeadline','articleSection']);
  const urls = new Set(['url','@id','item','mainEntityOfPage']);
  function visit(obj,key=''){
    if(Array.isArray(obj))return obj.map(v=>visit(v,key));
    if(obj && typeof obj==='object'){
      for(const [child,value] of Object.entries(obj))obj[child]=visit(value,child);
      return obj;
    }
    if(typeof obj!=='string')return obj;
    if(key==='inLanguage')return tag(locale);
    if(urls.has(key)&&obj.startsWith(url.origin))return pageLink(obj,url,locale,true);
    if(prose.has(key)&&words(obj,locale,true)){
      found?.add(obj);return dict?.get(obj)||obj;
    }
    return obj;
  }
  return html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,(original,opening,json,close)=>{
    try{
      const updated=visit(JSON.parse(json));
      return dict ? opening+JSON.stringify(updated).replace(/</g,'\\u003c')+close : original;
    }catch{return original;}
  });
}
async function localeSitemap(request,env,ctx,innerFetch,url) {
  const path=url.pathname;
  if(path==='/sitemap.xml'){
    const response=await innerFetch(request,env,ctx);
    if(!response.ok||request.method==='HEAD')return response;
    const body=await response.text();
    const additions=Object.keys(languages).filter(code=>!legacy.has(code)).flatMap(code=>
      ['catalog','editorial'].map(group=>'<sitemap><loc>'+url.origin+'/_locale/'+code+'/'+group+'-sitemap.xml</loc></sitemap>')
    ).join('');
    const headers=new Headers(response.headers);headers.delete('content-length');headers.delete('content-encoding');headers.delete('etag');
    return new Response(body.replace('</sitemapindex>',additions+'</sitemapindex>'),{headers});
  }
  const match=path.match(/^\/_locale\/([a-z-]+)\/(catalog|editorial)-sitemap\.xml$/);
  if(!match||legacy.has(match[1])||!has(match[1]))return null;
  const next=new URL('/'+match[2]+'-sitemap.xml',url);
  const response=await innerFetch(new Request(next,request),env,ctx);
  if(!response.ok || request.method==='HEAD')return response;
  const original=await response.text(),entries=[];
  for(const block of original.matchAll(/<url>([\s\S]*?)<\/url>/g)){
    const loc=block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if(!loc)continue;
    const dest=new URL(loc);
    if(dest.origin!==url.origin||getLocale(dest.pathname)!=='en')continue;
    dest.pathname=pathFor(dest.pathname,match[1]);
    const mod=block[1].match(/<lastmod>[^<]+<\/lastmod>/)?.[0]||'';
    entries.push('<url><loc>'+dest.href+'</loc>'+mod+'</url>');
  }
  if(!entries.length)return new Response('Sitemap temporarily unavailable',{status:503,headers:{'retry-after':'60'}});
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries.join('')+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=300'}});
}
export async function languageFetch(request,env,ctx,innerFetch) {
  const url=new URL(request.url);
  if(['GET','HEAD'].includes(request.method) && (url.pathname==='/sitemap.xml'||url.pathname.startsWith('/_locale/') && url.pathname.endsWith('-sitemap.xml'))){
    const sitemap=await localeSitemap(request,env,ctx,innerFetch,url);if(sitemap)return sitemap;
  }
  if(url.pathname==='/language-client.js')return env.ASSETS.fetch(request);
  if(url.pathname==='/language-menu.css')return new Response('.lolo-language[open]>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:min(19rem,88vw);max-height:min(22rem,60vh);overflow:auto;overscroll-behavior:contain}.lolo-language[open]>div>a{display:block;padding:.55rem .7rem;white-space:normal}',{headers:{'content-type':'text/css','cache-control':'public,max-age=3600'}});
  if(url.pathname==='/_locale/strings'){
    if(request.method!=='POST'||request.headers.get('origin')!==url.origin || !request.headers.get('content-type')?.startsWith('application/json'))return new Response(null,{status:403});
    if(Number(request.headers.get('content-length'))>32000)return new Response(null,{status:413});
    try {
      const body=await request.text();if(body.length>30000)return new Response(null,{status:413});
      const {locale,strings}=JSON.parse(body);
      if(!has(locale)||!Array.isArray(strings)||strings.length>60||strings.some(s=>typeof s!=='string'||s.length>5000))return new Response(null,{status:400});
      const map=await translate(strings,locale,url.origin,ctx);
      return Response.json(strings.map(s=>map.get(s)||s));
    }catch{return new Response(null,{status:503,headers:{'retry-after':'5'}});}
  }
  const locale=getLocale(url.pathname);
  if(!['GET','HEAD'].includes(request.method)||filePath.test(stripPrefix(url.pathname)))return innerFetch(request,env,ctx);
  if(url.hostname==='www.lolobuy-sheet.net'){url.hostname='lolobuy-sheet.net';return Response.redirect(url,308);}
  const source=new URL(url);
  if(!legacy.has(locale))source.pathname=stripPrefix(source.pathname);
  let response=await innerFetch(new Request(source,request),env,ctx);
  if(locale!=='en' && response.status===404 && legacy.has(locale)){
    const fallback=new URL(source);fallback.pathname=stripPrefix(source.pathname);
    const english=await innerFetch(new Request(fallback,request),env,ctx);
    if(english.ok||english.status>=300&&english.status<400)response=english;
  }
  if(response.status>=300&&response.status<400&&response.headers.has('location')){
    const dest=new URL(response.headers.get('location'),source);
    const localized=new URL(dest);
    if(dest.origin===url.origin)localized.pathname=pathFor(dest.pathname,locale);
    if(localized.href!==url.href||dest.href===url.href)return Response.redirect(localized,response.status);
    response=await innerFetch(new Request(dest,request),env,ctx);
  }
  if(!response.headers.get('content-type')?.includes('text/html')||request.method==='HEAD')return response;
  const html=await response.text();
  const schemaValues=new Set();
  rewriteSchemas(html,url,locale,schemaValues,null);
  const pass=parsePass(html,url,locale,null);await pass.body;
  for(const value of schemaValues)pass.found.add(value);
  let dict;
  try {dict=await translate(pass.found,locale,url.origin,ctx);}
  catch {
    // Keep the document accessible if the provider is briefly unavailable.
    // The observer retries public page text; do not cache partial translations.
    dict=new Map();
  }
  const headers=new Headers(response.headers);
  for(const key of ['content-length','content-encoding','etag','last-modified'])headers.delete(key);
  headers.set('content-language',tag(locale));
  const retry=pass.found.size>dict.size;
  if(retry){headers.set('cache-control','no-store');headers.set('x-locale-status','retry');headers.set('retry-after','60');}
  const localizedSchemas=rewriteSchemas(html,url,locale,null,dict);
  const output=await parsePass(localizedSchemas,url,locale,dict,retry).body;
  return new Response(output,{status:retry && !legacy.has(locale) && response.ok ? 503 : response.status,headers});
}
