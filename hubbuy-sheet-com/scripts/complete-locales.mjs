import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {localeList,htmlLocale} from '../public/assets/locale-core.mjs';
import {experienceTranslations} from '../data/experience-translations.js';
import {catalogUiTranslations} from '../data/catalog-ui-translations.js';
import {portugueseEnglish} from '../data/portuguese-english.js';
import {translations} from '../data/i18n.js';
import {articles} from '../data/articles.js';
import {categoryPages} from '../data/categories.js';
import {localizeCatalogueHtml} from '../commerce/locale-support.mjs';

const site='https://hubbuy-sheet.com';
const local=(route,code)=>code==='en'?route:`/${code}${route}`;
const file=(root,route,code)=>resolve(root,'.'+local(route,code),'index.html');
const staticRoutes=['/','/articles/','/guides/how-to-buy/','/guides/qc-checks/','/guides/shipping/','/faq/','/about/','/contact/','/legal/privacy/','/legal/terms/',...categoryPages.map(c=>`/categories/${c.slug}/`),...articles.map(a=>`/articles/${a.slug}/`)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>s.replace(/&#(x[\da-f]+|\d+);/gi,(_,code)=>String.fromCodePoint(code[0].toLowerCase()==='x'?parseInt(code.slice(1),16):Number(code))).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function localUrl(value,locale){
 value=decode(value);
 if(!value.startsWith('/')&&!value.startsWith(site))return value;
 const url=new URL(decode(value),site);
 if(url.origin!==site||/^\/(?:assets|_next|brand|products-images)\//.test(url.pathname)||/\.(?:png|jpg|jpeg|webp|svg|gif|css|js|mjs|json|xml|ico|txt)$/i.test(url.pathname))return value;
 const segments=url.pathname.split('/').filter(Boolean);
 if(localeList.some(([code])=>code===segments[0]))segments.shift();
 return (value.startsWith(site)?site:'')+local('/'+segments.join('/')+(url.pathname.endsWith('/')&&segments.length?'/':''),locale)+url.search+url.hash;
}
function translateStructured(value,dictionary,locale,key=''){
 if(Array.isArray(value))return value.map(x=>translateStructured(x,dictionary,locale,key));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,translateStructured(v,dictionary,locale,k)]));
 if(typeof value!=='string'||key==='@type'||key==='@context')return value;
 if(key==='inLanguage')return htmlLocale(locale);
 if(value.startsWith(site))return localUrl(value,locale);
 return dictionary[value]||value;
}
export function localizeStaticDocument(html,route,locale,dictionary){
 // Static localized documents do not hydrate an English React tree over translations.
 html=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,(tag,attrs,body)=>{
  if(!/application\/ld\+json/.test(attrs))return '';
  try{return `<script type="application/ld+json">${JSON.stringify(translateStructured(JSON.parse(body),dictionary,locale)).replaceAll('<','\\u003c')}</script>`;}catch{return '';}
 }).replace(/<link\b[^>]*(?:as="script"|rel="modulepreload")[^>]*>/gi,'');
 html=localizeCatalogueHtml(html,dictionary,locale).replace(/\bdata-locale="[^"]*"/g,`data-locale="${locale}"`);
 html=html.replace(/<meta\b[^>]*>/gi,tag=>tag.replace(/content="([^"]*)"/,(whole,value)=>dictionary[decode(value)]?`content="${esc(dictionary[decode(value)])}"`:whole));
 html=html.replace(/<(?:a|form)\b[^>]*>/gi,tag=>{
  if(tag.includes('data-locale-code='))return tag;
  return tag.replace(/(href|action)="([^"]*)"/,(_,attr,url)=>`${attr}="${esc(localUrl(url,locale))}"`);
 });
 html=html.replace(/<a\b[^>]*data-locale-code="([^"]+)"[^>]*>[\s\S]*?<\/a>/g,(tag,code)=>{
  return tag.replace(/href="[^"]*"/,`href="${local(route,code)}"`).replace(/\saria-current="page"/g,'').replace('<a ',`<a ${code===locale?'aria-current="page" ':''}`).replace(/(<span class="language-check"[^>]*>)[\s\S]*?(<\/span>)/,`$1${code===locale?'✓':''}$2`);
 });
 const short=localeList.find(([code])=>code===locale)[2];
 html=html.replace(/(<summary[^>]*>[\s\S]*?<strong>)(?:EN|PT|DE)(<\/strong>)/,`$1${short}$2`);
 html=html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/gi,'').replace(/<meta\b[^>]*(?:name="robots"|property="og:(?:url|locale(?::alternate)?)")[^>]*>/gi,'');
 const alternate=localeList.map(([code])=>`<link rel="alternate" hreflang="${htmlLocale(code)}" href="${site}${local(route,code)}">`).join('');
 html=html.replace('</head>',`<link rel="canonical" href="${site}${local(route,locale)}">${alternate}<link rel="alternate" hreflang="x-default" href="${site}${route}"><meta property="og:url" content="${site}${local(route,locale)}"><meta property="og:locale" content="${htmlLocale(locale).replace('-','_')}"><meta name="robots" content="index,follow"></head>`);
 const body=html.match(/<article class="seo-article-body">([\s\S]*?)<\/article>/)?.[1];
 if(body){const text=decode(body.replace(/<[^>]+>/g,' '));const wordCount=[...new Intl.Segmenter(htmlLocale(locale),{granularity:'word'}).segment(text)].filter(item=>item.isWordLike).length;
  html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(tag,json)=>{try{const value=JSON.parse(json);if(value['@type']==='Article')value.wordCount=wordCount;return '<script type="application/ld+json">'+JSON.stringify(value).replaceAll('<','\\u003c')+'</script>';}catch{return tag;}});
 }
 return html.replace('</body>',`<!-- Static localized edition: ${htmlLocale(locale)} --><script defer src="/mobile-reading.js?v=20261111-locales-v3"></script><script defer src="/assets/catalog.js?v=20261111-detail-v3"></script><script type="module" src="/assets/experience.js?v=20261111-detail-v3"></script></body>`);
}
export async function completeLocales(outputRoot){
 const manifestFile=resolve('data/locale-manifest.json');
 if(!existsSync(manifestFile))throw Error('Complete locale manifest is required before publication');
 const manifest=JSON.parse(readFileSync(manifestFile,'utf8'));
 if(!manifest.full)throw Error('Locale generation/review is incomplete');
 const sources=new Map(staticRoutes.map(route=>[route,readFileSync(file(outputRoot,route,'en'),'utf8')]));
 let count=0;
 for(const [locale] of localeList){
  const asset=resolve('public/assets/locales',locale+'.json');
  if(!existsSync(asset))throw Error('Missing complete translation asset: '+locale);
  const generated=JSON.parse(readFileSync(asset,'utf8'));
  const completed=manifest.locales?.[locale];
  if(!completed?.full||completed.keyCount!==Object.keys(generated).length||completed.sha256!==createHash('sha256').update(readFileSync(asset)).digest('hex'))throw Error('Incomplete locale asset: '+locale);
  const dictionary={...translations[locale],...generated,...experienceTranslations[locale],...catalogUiTranslations[locale],...(locale==='pt-br'?Object.fromEntries(Object.keys(portugueseEnglish).map(key=>[key,key])):{})};
  // Highest priority UI overrides are already merged in the saved asset.
  for(const route of staticRoutes){
   const existing=file(outputRoot,route,locale);
   const source=(locale==='de'||locale==='pt-br')&&existsSync(existing)?readFileSync(existing,'utf8'):sources.get(route);
   const target=file(outputRoot,route,locale);mkdirSync(dirname(target),{recursive:true});
   writeFileSync(target,localizeStaticDocument(source,route,locale,dictionary));count++;
  }
  const urls=staticRoutes.map(route=>`<url><loc>${site}${local(route,locale)}</loc>${localeList.map(([code])=>`<xhtml:link rel="alternate" hreflang="${htmlLocale(code)}" href="${site}${local(route,code)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${site}${route}"/></url>`).join('');
  writeFileSync(resolve(outputRoot,`sitemap-${locale}.xml`),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`);
 }
 const mapNames=[...localeList.map(([code])=>`sitemap-${code}.xml`),...localeList.map(([code])=>`sitemap-catalog-${code}.xml`)];
 writeFileSync(resolve(outputRoot,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${mapNames.map(name=>`<sitemap><loc>${site}/${name}</loc></sitemap>`).join('')}</sitemapindex>`);
 writeFileSync(resolve(outputRoot,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
 console.log(`Complete locales: ${localeList.length} languages, ${staticRoutes.length} routes, ${count} documents.`);
}
