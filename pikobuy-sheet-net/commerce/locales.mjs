// Keys in the local dictionaries represent published site copy. Form values and URLs are never translation inputs.
const nativeLocales = new Set(['en','de','fr','es','it','pl','pt']);
const localePrefix = lang => lang === 'en' ? '' : '/' + lang;
const localeKey = s => decode(s).replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const localeCache = new Map();
async function localePack(env,request,lang) {
 if(localeCache.has(lang)) return localeCache.get(lang);
 try {
  const r=await env.ASSETS.fetch(new Request(new URL('/assets/locale-packs/'+lang+'.json',request.url)));
  if(r.ok){const pack=await r.json();if(localeCache.size>=4)localeCache.delete(localeCache.keys().next().value);localeCache.set(lang,pack);return pack;}
 } catch {}
 return {};
}
const currencies = 'USD EUR GBP CNY CAD AUD PLN BRL SEK DKK RON CZK HUF BGN JPY KRW VND THB IDR CHF NZD NOK SGD HKD TWD'.split(' ');
const publishedRates = {"date":"Sun, 22 Nov 2026 00:02:32 +0000","rates":{"USD":1,"EUR":0.911256,"GBP":0.763601,"CNY":6.693346,"CAD":1.433441,"AUD":1.507035,"PLN":4.059578,"BRL":5.937879,"SEK":10.219547,"DKK":6.805787,"RON":4.871523,"CZK":22.291402,"HUF":340.052586,"BGN":1.78226,"JPY":158.747474,"KRW":1343.330639,"VND":25783.122794,"THB":33.918378,"IDR":18291.407129,"CHF":0.840341,"NZD":1.824946,"NOK":9.768265,"SGD":1.289578,"HKD":7.838737,"TWD":32.980334}};
async function exchangeRates(){
 try {
  const r=await fetch('https://open.er-api.com/v6/latest/USD',{cf:{cacheEverything:true,cacheTtl:21600},signal:AbortSignal.timeout(8000)});
  const data=await r.json();
  if(!r.ok||data.result!=='success'||data.base_code!=='USD'||data.rates.USD!==1)throw Error();
  return Response.json({date:data.time_last_update_utc,rates:Object.fromEntries(currencies.filter(c=>Number.isFinite(data.rates[c])&&data.rates[c]>0).map(c=>[c,data.rates[c]]))},{headers:{'cache-control':'public, max-age=21600'}});
 }catch{return Response.json(publishedRates,{headers:{'cache-control':'public, max-age=300'}})}
}
async function translatePublishedText(strings,lang,source='en') {
 const out=new Map(), batches=[];
 let chunk=[], size=0;
 for(const key of strings){
  if(chunk.length && size+key.length>1400){batches.push(chunk);chunk=[];size=0}
  chunk.push(key);size+=key.length+1;
 }
 if(chunk.length)batches.push(chunk);
 async function process(batch){
  const url=new URL('https://translate.googleapis.com/translate_a/single');
  url.search=new URLSearchParams({client:'gtx',sl:source,tl:lang==='zh'?'zh-CN':lang,dt:'t',q:batch.join('\n')});
  const r=await fetch(url.href,{cf:{cacheTtl:2592000,cacheEverything:true},signal:AbortSignal.timeout(9000)});
  if(!r.ok)throw Error('Translation unavailable');
  const json=await r.json();
  const values=json[0].map(seg=>seg[0]).join('').trim().split(/\s*\n\s*/);
  if(values.length===batch.length)batch.forEach((key,i)=>{if(values[i])out.set(key,values[i])});
 }
 let cursor=0;
 await Promise.all(Array.from({length:Math.min(4,batches.length)},async()=>{
  while(cursor<batches.length){const batch=batches[cursor++];try{await process(batch)}catch{}}
 }));
 return out;
}
function localeTokens(html) {
 return html.match(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<(?:[^>"']|"[^"]*"|'[^']*')+>|[^<]+|</gi)||[];
}
async function localizeMarkup(html,lang,env,request,editorial){
 const pack=lang==='en'?{}:await localePack(env,request,lang);
 const titleFor=await loadProductTitles(env,request,lang);
 const missing=new Set(), tokens=localeTokens(html);
 const authored=editorial&&nativeLocales.has(lang);
 const attrPattern=/\b(alt|title|aria-label|placeholder|data-label|data-style-name)="([^"]*)"/gi;
 const sensitive=/^(?:https?:|\/|[\d$€£¥ .,/%×–+()–-]+$)/;
 function lookup(raw,map,collect){
  const key=localeKey(raw);
  if(/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(key))return raw;
  if(!key || sensitive.test(key)||!/[\p{L}]/u.test(key)||key.length>4500)return raw;
  let tr=Object.hasOwn(pack,key)?pack[key]:map?.get(key);
  if(!tr){
   const parts=key.match(/^([←→↗\s]*)([\s\S]*?)([\s·:→↗\d]*)$/u);
   if(parts && parts[2]!==key && Object.hasOwn(pack,parts[2]))tr=parts[1]+pack[parts[2]]+parts[3];
  }
  if(!tr){const title=titleFor(key);if(title!==key)tr=title;}
  if(!tr && collect && !authored && (lang!=='en'||/[\p{Script=Han}]/u.test(key)))missing.add(key);
  return typeof tr==='string'?raw.replace(/\S[\s\S]*\S|\S/,()=>escapeHtml(tr)):raw;
 }
 function pass(map,collect){
  let skipMenu=false,skipOption=false;
  return tokens.map(token=>{
   if(/^<details\b[^>]*class="piko-language"/i.test(token))skipMenu=true;
   if(/^<\/details/i.test(token)&&skipMenu){skipMenu=false;return token}
   if(/^<select\b[^>]*data-piko-currency/i.test(token))skipOption=true;
   if(/^<\/select/i.test(token))skipOption=false;
   if (/^<script[^>]+type="application\/ld\+json"/i.test(token)) {
    const start=token.indexOf('>')+1,end=token.toLowerCase().lastIndexOf('</script>');
    try {
     const schema=JSON.parse(token.slice(start,end),(key,value)=>{
      if(typeof value!=='string')return value;
      if(['headline','description','name','text'].includes(key))return decode(lookup(value,map,collect));
      if(key==='inLanguage')return lang;
      if(value.startsWith('https://pikobuy-sheet.net/')){
       return value.replace(/^https:\/\/pikobuy-sheet\.net(?:\/(?:de|fr|es|it|pl|pt)(?=\/|$))?/, 'https://pikobuy-sheet.net'+localePrefix(lang));
      }
      return value;
     });
     return token.slice(0,start)+JSON.stringify(schema).replaceAll('<','\\u003c')+token.slice(end);
    }catch{return token}
   }
   if(skipMenu || skipOption){
    return token.replace(/aria-label="(Language|Currency)"/g,(_,word)=>'aria-label="'+lookup(word,map,collect)+'"');
   }
   if(/^<(script|style|!)/i.test(token))return token;
   if(token[0]!=='<')return lookup(token,map,collect);
   const attrs=token.replace(attrPattern,(_,name,value)=>name+'="'+lookup(value,map,collect)+'"');
   if(/^<meta\b/i.test(attrs)&&/(name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"/.test(attrs))return attrs.replace(/content="([^"]*)"/,(_,v)=>'content="'+lookup(v,map,collect)+'"');
   return attrs;
  }).join('');
 }
 const firstPass=pass(null,true);
 return missing.size?pass(await translatePublishedText(missing,lang,'auto'),false):firstPass;
}
function routeMarkup(html,lang,path,search){
 const pre=localePrefix(lang);
 const bare=path.replace(/^\/(?:de|fr|es|it|pl|pt|nl|ro|sv|zh|da|fi|el|cs|hu|bg|sk|hr|ja|ko|vi|th|id)(?=\/|$)/,'')||'/';
 html=html.replace(/<header class="piko-header">[\s\S]*?<\/header>/,()=>nav(lang,bare,search))
  .replace(/<html lang="[^"]*"/,'<html lang="'+lang+'"')
  .replace(/data-locale="[^"]*"/g,'data-locale="'+lang+'"')
  .replace(/<link\b(?=[^>]*rel="alternate")(?=[^>]*hreflang=)[^>]*>/gi,'')
  .replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/i,'<link rel="canonical" href="https://pikobuy-sheet.net'+escapeHtml(path)+'">')
  .replace('</head>',LANGUAGES.concat('x-default').map(l=>'<link rel="alternate" hreflang="'+l+'" href="https://pikobuy-sheet.net'+(l==='x-default'?'':localePrefix(l))+escapeHtml(bare)+'">').join('')+'<link rel="stylesheet" href="/assets/piko-controls-20261122.css"><script defer src="/assets/piko-currency-20261122.js"></script></head>')
  .replace(/<script src="\/catalog\.js[^"]*" defer><\/script>/,'<script defer src="/assets/product-titles.js"></script><script src="/catalog.js?v=20261122" defer></script>');
 html=html.replace('</footer>','<small> · <a rel="external" href="https://www.exchangerate-api.com/">ExchangeRate-API</a></small></footer>');
 const selector='<select data-piko-currency class="piko-currency" aria-label="Currency">'+currencies.map(c=>'<option>'+c+'</option>').join('')+'</select>';
 html=html.replace('</details></header>','</details>'+selector+'</header>');
 html=html.replace(/site-shell\.css\?v=\d+/g,'site-shell.css?v=20261122')
  .replace(/<script src="\/assets\/piko-mobile-(20261109|20261013)-v1.js"/g,'<script src="/assets/piko-mobile-20261122.js"')
  .replace('</body>','<template id="piko-reading-labels">'+['Expand all sections','Collapse sections','Tap a heading to read','Show more','Show fewer'].map(word=>'<span>'+word+'</span>').join('')+'</template></body>');
 if(!pre)return html;
 // The language menu owns its destination paths. Rewrite only ordinary internal links.
 return html.replace(/<(a|form)\b[^>]*>/gi,tag=>{
  if(/\bhreflang=/.test(tag))return tag;
  return tag.replace(/(href|action)="(\/[^"]*)"/,(_,attr,href)=>{
   if(/^\/\/|^\/(?:assets|api)\//.test(href))return attr+'="'+href+'"';
   const original=href.replace(/^\/(?:de|fr|es|it|pl|pt|nl|ro|sv|zh|da|fi|el|cs|hu|bg|sk|hr|ja|ko|vi|th|id)(?=\/|$)/,'');
   return attr+'="'+pre+(original||'/')+'"';
  });
 });
}
