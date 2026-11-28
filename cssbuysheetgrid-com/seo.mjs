import {langs,dict} from './locales.mjs';
import {articles} from './editorial.mjs';
import {visualResponse} from './visual.mjs';
import baseline from './product-paths.json';

export const siteOrigin='https://cssbuysheetgrid.com';
const baseHost=new URL(siteOrigin).hostname;
const languages=Object.keys(langs);
const editorialLangs=['en','zh'];
const allowedArticles=new Set(articles.map(a=>a.slug));
const categories=['shoes','sweatshirts','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const productPath=/^\/[a-z0-9-]+\/\d+\.html$/;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const xml=(body)=>new Response('<?xml version="1.0" encoding="UTF-8"?>\n'+body,{headers:{'Content-Type':'application/xml; charset=UTF-8','Cache-Control':'public, max-age=900','X-Content-Type-Options':'nosniff'}});
const notFound=()=>new Response('Page not found',{status:404,headers:{'Content-Type':'text/plain; charset=UTF-8','X-Robots-Tag':'noindex'}});
const itemSuffix=path=>'spreadsheet/?'+new URLSearchParams({item:path});
let cachedPaths=baseline, nextRefresh=0, pending;
async function productPaths() {
 if(Date.now()<nextRefresh)return cachedPaths;
 if(pending)return pending;
 pending=(async()=>{
  try {
   const fetchAsset=async path=>{
    const response=await visualResponse(new Request(siteOrigin+'/_visual'+path));
    if(!response.ok)throw Error('Unavailable index');
    return response;
   };
   const m=await (await fetchAsset('/catalog-image-index.json')).json();
   if(!/^\/assets\/visual-index\/[a-f0-9]{16}\/titles\.json$/.test(m.titles?.url))throw Error('Unexpected index');
   const bytes=await (await fetchAsset(m.titles.url)).arrayBuffer();
   const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),v=>v.toString(16).padStart(2,'0')).join('');
   const rows=Object.keys(JSON.parse(new TextDecoder().decode(bytes)));
   if(hash!==m.titles.sha256||!rows.length||rows.length!==m.catalogCount||rows.some(p=>!productPath.test(p)))throw Error('Incomplete index');
   cachedPaths=rows.sort();nextRefresh=Date.now()+3600000;
  }catch{nextRefresh=Date.now()+300000}finally{pending=undefined}
  return cachedPaths;
 })();return pending;
}
function mainUrls(){
 const urls=[];
 for(const lang of languages){
  const base=siteOrigin+'/'+lang+'/'; urls.push(base,base+'spreadsheet/',base+'image-search/');
  for(const cat of categories)urls.push(base+'spreadsheet/?cat='+cat);
  if(editorialLangs.includes(lang))urls.push(base+'faq/',base+'articles/',...articles.map(a=>base+'articles/'+a.slug+'/'));
 }
 return urls;
}
const urlset=links=>xml('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+links.map(loc=>'<url><loc>'+escape(loc)+'</loc></url>').join('')+'</urlset>');
export async function siteRoute(url,env={}){
 if(url.hostname==='www.'+baseHost||url.protocol==='http:'&&url.hostname===baseHost)return Response.redirect(siteOrigin+url.pathname+url.search,308);
 if(url.pathname==='/robots.txt')return new Response('User-agent: *\nAllow: /\nSitemap: '+siteOrigin+'/sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
 if(url.pathname==='/sitemap.xml'){
  const paths=['/sitemap-pages.xml',...languages.map(l=>'/sitemap-products-'+l+'.xml')];
  return xml('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<sitemap><loc>'+siteOrigin+p+'</loc></sitemap>').join('')+'</sitemapindex>');
 }
 if(url.pathname==='/sitemap-pages.xml')return urlset(mainUrls());
 const productMap=url.pathname.match(/^\/sitemap-products-([a-z]{2})\.xml$/);
 if(productMap&&languages.includes(productMap[1]))return urlset((await productPaths()).map(p=>siteOrigin+'/'+productMap[1]+'/'+itemSuffix(p)));
 if(url.pathname==='/BingSiteAuth.xml'&&env.BING_VERIFICATION)return xml('<users><user>'+escape(env.BING_VERIFICATION)+'</user></users>');
 if(url.pathname.startsWith('/_visual/')||['/exchange-rates.json','/currency.js','/favicon.ico'].includes(url.pathname))return null;
 const path=url.pathname.split('/').filter(Boolean);
 if(!path.length)return Response.redirect(siteOrigin+'/en/'+url.search,308);
 const [lang,section,slug]=path;
 if(!languages.includes(lang)||path.length>3||section&&!['spreadsheet','image-search','articles','faq'].includes(section)||slug&&(section!=='articles'||!allowedArticles.has(slug)))return notFound();
 if((section==='articles'||section==='faq')&&!editorialLangs.includes(lang))return Response.redirect(siteOrigin+'/en/'+path.slice(1).join('/')+'/',308);
 if(!url.pathname.endsWith('/'))return Response.redirect(siteOrigin+url.pathname+'/'+url.search,308);
 const item=url.searchParams.get('item');
 if(item&&(!productPath.test(item)||section&&section!=='spreadsheet'))return notFound();
 if(!section&&(item||['q','page','cat','sort','size'].some(k=>url.searchParams.has(k))))return Response.redirect(siteOrigin+'/'+lang+'/spreadsheet/'+url.search,308);
 return null;
}
export function seoMetadata(url,lang,title,status,env={}){
 const params=url.searchParams, section=url.pathname.split('/')[2]||'', suffix=url.pathname.split('/').slice(2).join('/');
 const editorial=['faq','articles'].includes(section);
 const item=params.get('item'), cat=params.get('cat');
 const canonicalSuffix=item?itemSuffix(item):section==='spreadsheet'&&cat&&categories.includes(cat)?'spreadsheet/?cat='+cat:suffix;
 const href=l=>siteOrigin+'/'+l+'/'+canonicalSuffix;
 const unindexed=status!==200||Boolean(params.get('q'))||(!item&&['sort','size','page'].some(k=>params.has(k)))||section==='spreadsheet'&&cat&&!categories.includes(cat);
 const robots=unindexed?'noindex, follow':'index, follow';
 const alternates=unindexed?'':[...(editorial?editorialLangs:languages),'x-default'].map(l=>'<link rel="alternate" hreflang="'+l+'" href="'+escape(href(l==='x-default'?'en':l))+'">').join('');
 const canonical=status===200?'<link rel="canonical" href="'+escape(href(lang))+'">':'';
 const entry=editorial&&articles.find(a=>url.pathname.endsWith('/'+a.slug+'/'));
 const description=entry&&lang==='en'?entry.summary:item?title+' | '+dict[lang].details:dict[lang].intro;
 const verification=[['google-site-verification',env.GSC_VERIFICATION],['msvalidate.01',env.BING_VERIFICATION]].filter(([,v])=>v).map(([k,v])=>'<meta name="'+k+'" content="'+escape(v)+'">').join('');
 const id=String(env.GA4_ID||'');
 const analytics=/^G-[A-Z0-9]+$/.test(id)?'<script async src="https://www.googletagmanager.com/gtag/js?id='+id+'"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","'+id+'");</script>':'';
 return {robots,head:'<meta name="robots" content="'+robots+'"><meta name="description" content="'+escape(description)+'">'+canonical+alternates+verification+analytics};
}
