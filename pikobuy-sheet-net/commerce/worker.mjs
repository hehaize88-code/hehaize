const RELEASE = '20261109-content-v1';
async function catalogSitemap(locale) {
 try {
  const xml=await upstream('/sitemap.xml');
  const paths=[...new Set([...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
  if(!paths.length)throw Error('Empty catalogue');
  const entries=paths.map(p=>'<url><loc>https://pikobuy-sheet.net'+localPath(p,locale)+'</loc></url>').join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300, s-maxage=600'}});
 }catch{return new Response('Sitemap temporarily unavailable',{status:503,headers:{'retry-after':'60'}})}
}
const worker = {
 async fetch(request,env) {
  const url=new URL(request.url);
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
  if(url.hostname==='www.pikobuy-sheet.net'){url.hostname='pikobuy-sheet.net';return Response.redirect(url.href,301)}
  if(url.pathname==='/api/exchange-rates')return exchangeRates();
  if(url.pathname==='/catalog-sitemap.xml')return new Response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+LANGS.map(l=>'<sitemap><loc>https://pikobuy-sheet.net/catalog-sitemap-'+l+'.xml</loc></sitemap>').join('')+'</sitemapindex>',{headers:{'content-type':'application/xml'}});
  const sitemapLocale=url.pathname.match(/^\/catalog-sitemap-([a-z]{2})\.xml$/)?.[1];
  if(LANGS.includes(sitemapLocale))return catalogSitemap(sitemapLocale);
  const lang=LANGUAGES.includes(url.pathname.split('/')[1]) ? url.pathname.split('/')[1] : 'en';
  const pre=prefix(lang),bare=url.pathname.slice(pre.length).replace(/\/$/,'')||'/';
  let target;
  if(['/finds','/spreadsheet','/products','/AllProducts','/search.html'].includes(bare))target=pre+'/catalog/';
  else if(bare==='/articles')target=pre+'/seo-articles/';
  else if(bare==='/qc')target=pre+'/guides/pikobuy-qc-checklist/';
  else if(bare==='/shipping')target=pre+'/guides/pikobuy-shipping-cost/';
  else if(bare==='/sitemap-main.xml')target='/sitemap.xml';
  else if(/^\/categories\//.test(bare)){
   const cat=bare.split('/')[2]==='hoodies'?'hoodies-sweaters':bare.split('/')[2];
   if(CATEGORIES.includes(cat))target=pre+'/catalog/'+cat+'/';
  } else if(/^\/finds\//.test(bare)&&PRODUCT_DESTINATIONS[bare.split('/')[2]]){
   const original=new URL(PRODUCT_DESTINATIONS[bare.split('/')[2]]);
   target=localPath(original.pathname,lang)+original.search;
  }
  if(target){const next=new URL(target,url.origin);for(const [key,value] of url.searchParams)next.searchParams.set(key,value);return Response.redirect(next.href,301)}
  const catalog=await catalogueRoute(request,env);
  if(catalog){
   if(request.method==='HEAD')return new Response(null,{status:catalog.status,headers:catalog.headers});
   if(!catalog.headers.get('content-type')?.includes('text/html'))return catalog;
   let html=routeMarkup(await catalog.text(),lang,url.pathname,url.search);
   html=await localizeMarkup(html,lang,env,request,false);
   return new Response(html,{status:catalog.status,headers:catalog.headers});
  }
  const canonical=url.pathname.endsWith('/index.html')?url.pathname.slice(0,-10):url.pathname.endsWith('/')?url.pathname:url.pathname+'/';
  const storagePath=path=>ROUTES.has(path)?path:path.slice(pre.length)||'/';
  if(ROUTES.has(storagePath(canonical))&&canonical!==url.pathname){url.pathname=canonical;return Response.redirect(url.href,301)}
  const assetPath=storagePath(url.pathname);
  const editorial=ROUTES.has(assetPath);
  const allowed=editorial||STATIC_FILES.has(url.pathname)||url.pathname.startsWith('/assets/');
  const response=await env.ASSETS.fetch(allowed?(editorial?new Request(new URL(assetPath,url),request):request):new Request(new URL('/404.html',url),request));
  const headers=new Headers(response.headers);headers.set('x-pikobuy-release',RELEASE);headers.set('x-content-type-options','nosniff');
  const status=allowed?response.status:404;
  if(status===404)headers.set('x-robots-tag','noindex');
  if(headers.get('content-type')?.includes('text/html')){
   headers.set('content-language',lang);headers.set('cache-control','public, max-age=0, s-maxage=60');
   // Versioned research assets on all editorial routes; preserve the existing mobile reading behaviour on inner pages.
   if(status===200 && editorial && request.method!=='HEAD') {
    let html=(await response.text()).replaceAll('/assets/piko-site-20261012-catalog-v1.js','/assets/piko-site-20261016-research-v1.js');
    if(!html.includes('/assets/piko-seo-20261016-v1.css')) html=html.replace('</head>','<link rel="stylesheet" href="/assets/piko-seo-20261016-v1.css"></head>');
    if(bare!=='/' && !html.includes('/assets/piko-mobile-20261109-v1.js')) html=html.replace('</head>','<link rel="stylesheet" href="/assets/piko-mobile-20261013-v1.css"><script src="/assets/piko-mobile-20261013-v1.js" defer></script></head>').replace(/<body([^>]*)>/,(_,attrs)=>'<body'+(/\bclass="/.test(attrs)?attrs.replace(/\bclass="/,'class="piko-compact-page '):attrs+' class="piko-compact-page"')+'>');
    html=routeMarkup(html,lang,url.pathname,url.search);
    if(lang!=='en')html=await localizeMarkup(html,lang,env,request,true);
    headers.delete('content-length');headers.delete('etag');
    return new Response(html,{status,headers});
   }
  }
  return new Response(request.method==='HEAD'?null:response.body,{status,headers});
 }
};
export default worker;
