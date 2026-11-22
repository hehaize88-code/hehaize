import { dictionary, englishHashes } from './common.mjs';

export const LANGUAGES = [
  ['en','English'],['de','Deutsch'],['fr','Français'],['es','Español'],['it','Italiano'],['nl','Nederlands'],
  ['pt','Português'],['pl','Polski'],['ro','Română'],['sv','Svenska'],['zh','简体中文'],['da','Dansk'],
  ['fi','Suomi'],['el','Ελληνικά'],['cs','Čeština'],['hu','Magyar'],['bg','Български'],['sk','Slovenčina'],
  ['hr','Hrvatski'],['ja','日本語'],['ko','한국어'],['vi','Tiếng Việt'],['th','ไทย'],['id','Bahasa Indonesia'],
];
const codes = LANGUAGES.map(([code]) => code);
export const NATIVE_LANGUAGES = new Set(['en','de','fr','es','it','pl']);
const htmlEscape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fromHTML = value => String(value).replace(/&(amp|lt|gt|quot|apos|nbsp|#\d+|#x[0-9a-f]+);/gi,(m,x)=>{
  if(!x.startsWith('#')) return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0'})[x.toLowerCase()];
  const n=x[1].toLowerCase()==='x'?parseInt(x.slice(2),16):Number(x.slice(1));
  return n>0 && n<=0x10ffff?String.fromCodePoint(n):m;
});
const canonicalCode = code => ({'pt-br':'pt','zh-cn':'zh','zh-hans':'zh'}[code]||code);
export const languageTag = lang => lang==='zh'?'zh-CN':lang;
export function splitLocale(path){
  const match=/^\/([^/?#]+)(?=\/|$|[?#])/.exec(path), lang=canonicalCode(match?.[1]?.toLowerCase());
  if(!lang || !codes.includes(lang)) return ['en',path||'/'];
  const clean=path.slice(match[0].length);
  return [lang,clean.startsWith('/')?clean:'/'+clean];
}
export function localePath(path,lang){
  const clean=splitLocale(path)[1], prefix=lang==='en'?'':'/'+canonicalCode(lang);
  return clean==='/'?prefix||'/':prefix+clean;
}
export function languageMenu(path,lang){
  const links=LANGUAGES.map(([code,label])=>'<a href="'+htmlEscape(localePath(path,code))+'" lang="'+languageTag(code)+'" hreflang="'+languageTag(code)+'"'+(code===lang?' aria-current="true"':'')+'>'+label+'</a>').join('');
  const title=dictionary.Language?.[codes.indexOf(lang)]||'Language';
  return '<details class="language-menu km-language" translate="no"><summary aria-label="'+htmlEscape(title)+'">'+lang.toUpperCase()+' ▾</summary><div class="language-popover">'+links+'</div></details>';
}

// Shipped editions are immutable within a Worker version; up to 24 can be
// loaded. Locale changes, uploads and searches never call a translation service.
const editions=new Map();
export const hasEdition=lang=>editions.has(lang);
export function installEdition(lang,object){
  if(codes.includes(lang) && object && typeof object==='object' && !Array.isArray(object))editions.set(lang,object);
}
function editionValue(edition,source){
  if(!edition)return null;
  const s=source.replace(/\s+/g,' ').trim();
  const found=Object.hasOwn(edition,source)?edition[source]:Object.hasOwn(edition,s)?edition[s]:null;
  return typeof found==='string' && found.trim()?found:null;
}

const terms=/\b(?:KameyMall|Weidian|Tmall|Taobao|HOKA One One Speedgoat 5|Adidas Futurecraft 4D|New Balance(?: 1906R)?|Canada Goose|Polo Ralph Lauren|Saint Vanity|Syna World|Hello Kitty|Samsung Galaxy Watch8|Nike(?: Air (?:Force|Jordan) \d+)?|Adidas|Louis Vuitton|Gucci|Burberry|Prada|Miu Miu|The North Face|Chrome Hearts|Stone Island|Palm Angels|Moncler|Amiri|Balmain|Balenciaga|Asics|Salomon|Dior|Off[- ]White|Ralph Lauren|Supreme|Stussy|Corteiz|Alexander McQueen|Yeezy|Converse|Puma|Fear of God|Fendi|Diesel|Bottega Veneta|Timberland|Carhartt|Audemars Piguet Royal Oak|Audemars Piguet|Cartier|Swatch|Rolex|Jellycat|Celine|Coach|Oopbuy|Superbuy|Kakobuy|AllChinaBuy|CNFans|Sugargoo|Acbuy|Hipobuy|Joyagoo)\b|\b(?=[A-Za-z0-9-]*\d)(?=[A-Za-z0-9-]*[A-Za-z])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\b/gi;
const letter=/\p{L}/u;
const exempt=/^(?:https?:\/\/\S+|\S+@\S+|[\w.-]+\.(?:com|net)|(?:XS|S|M|L|XL|XXL|\dXL|QC|SKU|ID|USD|CNY|EUR|JPY|UK|EU|US|CM|KG|[A-Z]{3}\s*[\d.,]+))$/i;
function translatedMap(strings,lang){
  const output=new Map(),missing=[];
  const index=codes.indexOf(lang),edition=editions.get(lang);
  for(const source of new Set(strings)){
    let value=source;
    if(typeof source==='string' && source.trim() && letter.test(source) && !exempt.test(source) && index>=0){
      const curated=Object.hasOwn(dictionary,source) && dictionary[source][index];
      let translated=curated || editionValue(edition,source);
      if(!translated){
        const numbered=/^(.*?) (\d+)$/.exec(source);
        const base=numbered && Object.hasOwn(dictionary,numbered[1]) && dictionary[numbered[1]][index];
        if(base)translated=base+' '+numbered[2];
      }
      if(translated)value=translated;
      else if((lang!=='en' || /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(source))
        && letter.test(source.replace(terms,'')))missing.push(source);
    }
    output.set(source,value);
  }
  return {output,missing};
}
export function translateTexts(strings,lang){
  const {output}=translatedMap(strings,lang);
  return strings.map(s=>output.get(s)??s);
}

const legacyNames = ["New Balance 1906R", "HOKA One One Speedgoat 5 Trail Running Shoes", "Adidas Futurecraft 4D Running Shoes", "Adidas Futurecraft 4D Running Shoes - Innovative Tech Sneakers", "Canada Goose Sweatshirt", "Nike Sweater", "Off-White Hoodies (39 Styles)", "Off-White Hoodies [39 styles]", "Polo Ralph Lauren Long Sleeve", "Off-White Tee", "Louis Vuitton Tee", "Celine Coat", "Louis Vuitton Jacket", "Saint Vanity Windbreaker", "Hello Kitty Plush Pants", "Balenciaga Shorts", "Louis Vuitton Shorts", "GUCCI Hat", "GUCCI hat", "Designer Tie Collection", "LV Burberry Gucci Prada Dior Hermès Tie", "Syna World Mask", "Louis Vuitton Wallet", "COACH Backpack (Multiple Styles)", "COACH BACKPACK(+Styles)", "Nike Elite Backpack", "2024 Premier League Jersey", "2024 Premier League Jersey Haaland Havertz Jesus", "Germany World Cup Jersey (28 Styles)", "2024 Germany World Cup Muller Havertz Jersey(28 styles)", "Premier League Player-Version Jersey (12 Styles)", "Premier League club player version football jersey (12 Styles)", "Samsung Galaxy Watch8", "Audemars Piguet Royal Oak / AP x SWATCH / Rolex Watches", "Audemars Role Cartier Watches", "Audemars Role Cartier Watches Square dial Watches Swatch x AP Royal Pop Savonnette Pocket Watch Mechanical Black White Clock Pocket Watch", "Jellycat", "Gucci Perfume", "Keychain"];
function englishTextHash(text){
  let hash=2166136261;
  for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
  return hash>>>0;
}
function rewriteInternal(raw,lang,source){
  if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|data:|javascript:)/i.test(raw))return raw;
  let url;try{url=new URL(raw,source);}catch{return raw;}
  if(url.origin!==source.origin && url.origin!=='https://kameymall-sheet.com')return raw;
  const clean=splitLocale(url.pathname)[1];
  if(/^\/(?:api|assets|product-images|cdn-cgi|_next|kamey-language|kamey-search|kamey-product)(?:\/|$)/.test(clean)||/\.[a-z0-9]+\/?$/i.test(clean))return raw;
  return localePath(clean,lang)+url.search+url.hash;
}
function visitSchema(value,lang,source,translate,key=''){
  if(Array.isArray(value))return value.map(x=>visitSchema(x,lang,source,translate,key));
  if(value && typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,visitSchema(v,lang,source,translate,k)]));
  if(typeof value!=='string')return value;
  if(key==='inLanguage')return languageTag(lang);
  if(['name','headline','description','text','articleBody','alternativeHeadline'].includes(key))return translate(value);
  if(['url','@id','item','mainEntityOfPage'].includes(key)){
    const path=rewriteInternal(value,lang,source);return path.startsWith('/')?source.origin+path:path;
  }
  return value;
}
const menuCSS='<style>.km-language{position:relative;flex:none}.km-language summary{cursor:pointer;list-style:none;white-space:nowrap}.km-language .language-popover{position:absolute;inset:auto 0 auto auto;top:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-height:min(24rem,65svh);overflow-y:auto;overscroll-behavior:contain;width:min(19rem,84vw);z-index:90;border:1px solid #ced3db;border-radius:.75rem;padding:.55rem;background:#fff;box-shadow:0 8px 24px #18202c28;color:#20242a}.km-language:not([open]) .language-popover{display:none}.km-language .language-popover a{display:block;padding:.5rem;text-decoration:none;color:inherit;font-size:.875rem;line-height:1.2}.km-language a[aria-current=true]{font-weight:700}.km-language a:focus-visible,.km-language a:hover{background:#eef1f4}.find-browser [hidden]{display:none!important}</style>';
const ignoredTags=new Set(['script','style','svg','code','pre','textarea','noscript','template']);
const translatableMeta=new Set(['description','og:title','og:description','twitter:title','twitter:description']);
const canonicalOrigin='https://kameymall-sheet.com';
export async function localizePage(response,request,lang,{native=false}={}){
  if(!response?.headers.get('content-type')?.includes('text/html'))return response;
  const url=new URL(typeof request==='string'?request:request.url);
  const clean=splitLocale(url.pathname)[1],canon=canonicalOrigin+localePath(clean,lang);
  const menu=languageMenu(clean+url.search,lang);
  let html=await response.text();
  const legacy=/<script\b[^>]*>self\.__VINEXT_RSC_/.test(html);
  if(legacy){
    // Preserve analytics and independent product/search scripts. The React
    // bootstrap would replace the translated SSR DOM with the original locale.
    html=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,(tag,attrs,js)=>
      /^(?:self\.__VINEXT_RSC_|import\(["']\/assets\/[^"']*index-[^"']+\.js)/.test(js.trim())? '':tag);
  }
  const blocked=new Set(),schemaRows=[],slots=[],strings=new Set();
  const queryValues=Array.from(url.searchParams.values()).filter(Boolean).map(s=>s.toLowerCase());
  const prefix='__KML'+crypto.randomUUID().replaceAll('-','')+'_';
  const safeSource=s=>!queryValues.some(q=>s.toLowerCase().includes(q));
  const edition=editions.get(lang);
  const nativeFragments=new Map();
  const productNames=native?legacyNames.filter(name=>dictionary[name]?.[codes.indexOf(lang)]).sort((a,b)=>b.length-a.length):[];
  const needsTranslation=s=>safeSource(s) && (!native || Object.hasOwn(dictionary,s) || editionValue(edition,s) || englishHashes.has(englishTextHash(s)) || legacyNames.some(name=>s.includes(name)) || /[\p{Script=Han}]/u.test(s));
  function mark(raw){
    const trimmed=raw.trim();
    if(!trimmed)return raw;
    const value=fromHTML(trimmed);
    if(!letter.test(value)||!needsTranslation(value))return raw;
    const token=prefix+slots.length+'__';slots.push(value);
    if(native && !englishHashes.has(englishTextHash(value)) && !Object.hasOwn(dictionary,value) && productNames.some(s=>value.includes(s))){
      let translated=value;
      for(const name of productNames)translated=translated.split(name).join(dictionary[name][codes.indexOf(lang)]);
      nativeFragments.set(value,translated);
    }else strings.add(value);
    return raw.replace(trimmed,()=>token);
  }
  function block(el,type){
    const record={type,data:''};blocked.add(record);
    el.onEndTag(end=>{
      blocked.delete(record);
      if(type!=='schema')return;
      try{
        const schema=JSON.parse(record.data);
        visitSchema(schema,lang,url,s=>{if(needsTranslation(s))strings.add(s);return s;});
        end.before(prefix+'S'+schemaRows.length+'__');schemaRows.push(schema);
      }catch{end.before(record.data,{html:true});}
    });
  }
  const alternate=LANGUAGES.map(([code])=>'<link rel="alternate" hreflang="'+languageTag(code)+'" href="'+htmlEscape(canonicalOrigin+localePath(clean,code))+'">').join('')+
    '<link rel="alternate" hreflang="x-default" href="'+htmlEscape(canonicalOrigin+localePath(clean,'en'))+'">';
  const rewriter=new HTMLRewriter().on('*',{element(el){
    const tag=el.tagName,classes=(el.getAttribute('class')||'').split(/\s+/);
    if(el.hasAttribute('data-km-menu') || tag==='details'&&classes.includes('language-menu')){el.replace(menu,{html:true});block(el,'menu');return;}
    if(tag==='html'||tag==='main'&&el.hasAttribute('lang'))el.setAttribute('lang',languageTag(lang));
    if(tag==='head')el.append(alternate+menuCSS,{html:true});
    if(tag==='link'){
      const rel=el.getAttribute('rel');
      if(rel==='alternate'&&el.hasAttribute('hreflang'))el.remove();
      if(rel==='canonical')el.setAttribute('href',canon);
      if(legacy && (rel==='modulepreload'||rel==='preload'&&el.getAttribute('as')==='script'))el.remove();
    }
    if(tag==='script' && el.getAttribute('type')==='application/ld+json'){block(el,'schema');return;}
    if(ignoredTags.has(tag)||el.getAttribute('translate')==='no'){if(!el.selfClosing)block(el,'skip');return;}
    if(blocked.size)return;
    if(tag==='a' && el.hasAttribute('href') && !el.hasAttribute('hreflang')){
      el.setAttribute('href',rewriteInternal(el.getAttribute('href'),lang,url));
    }
    if(tag==='form' && el.hasAttribute('action'))el.setAttribute('action',rewriteInternal(el.getAttribute('action'),lang,url));
    if(tag==='meta'){
      const key=el.getAttribute('property')||el.getAttribute('name');
      if(translatableMeta.has(key)&&el.hasAttribute('content'))el.setAttribute('content',mark(el.getAttribute('content')));
      if(key==='og:url')el.setAttribute('content',canon);
      if(key==='og:locale')el.setAttribute('content',languageTag(lang).replace('-','_'));
    }
    for(const attr of ['alt','aria-label','title','placeholder'])if(el.hasAttribute(attr))el.setAttribute(attr,mark(el.getAttribute(attr)));
  }});
  let buffer='';
  rewriter.onDocument({text(chunk){
    const hidden=[...blocked].at(-1);
    if(hidden){if(hidden.type==='schema'){hidden.data+=chunk.text;chunk.remove();}return;}
    buffer+=chunk.text;if(!chunk.lastInTextNode){chunk.remove();return;}
    chunk.replace(mark(buffer),{html:true});buffer='';
  }});
  html=await rewriter.transform(new Response(html)).text();
  const noMatches='No matching products';
  if(legacy)strings.add(noMatches);
  const {output,missing}=translatedMap([...strings],lang);
  html=html.replace(new RegExp(prefix+'(S?)(\\d+)__','g'),(_,type,id)=>{
    if(type==='S')return JSON.stringify(visitSchema(schemaRows[Number(id)],lang,url,s=>output.get(s)??s)).replace(/</g,'\\u003c');
    const s=slots[Number(id)];return htmlEscape(nativeFragments.get(s)??output.get(s)??s);
  });
  if(legacy){
    const restore='<script defer src="/kamey-language/restore.js" data-lang="'+htmlEscape(lang)+'" data-empty="'+htmlEscape(output.get(noMatches)||noMatches)+'"></script>';
    const ga=/<script[^>]*src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js/i.test(html)?'':'<script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config","G-QY8MM7VZV2");</script>';
    html=html.replace(/<\/body>/i,()=>ga+restore+'</body>');
  }
  const headers=new Headers(response.headers);
  for(const k of ['content-length','content-encoding','etag'])headers.delete(k);
  headers.set('content-language',languageTag(lang));
  headers.set('x-km-translation',missing.length?'partial':'complete');
  if(missing.length)headers.set('cache-control','no-store');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}
