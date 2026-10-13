const RELEASE = '20261013-mobile-v1';
async function catalogSitemap() {
 try {
  const xml=await upstream('/sitemap.xml');
  const paths=[...new Set([...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
  if(!paths.length)throw Error('Empty catalogue');
  const entries=LANGS.flatMap(lang=>paths.map(p=>'<url><loc>https://pikobuy-sheet.net'+localPath(p,lang)+'</loc></url>')).join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300, s-maxage=600'}});
 }catch{return new Response('Sitemap temporarily unavailable',{status:503,headers:{'retry-after':'60'}})}
}
const worker = {
 async fetch(request,env) {
  const url=new URL(request.url);
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
  if(url.hostname==='www.pikobuy-sheet.net'){url.hostname='pikobuy-sheet.net';return Response.redirect(url.href,301)}
  if(url.pathname==='/catalog-sitemap.xml')return catalogSitemap();
  const lang=url.pathname.match(/^\/(de|fr|es|it|pl|pt)(?=\/|$)/)?.[1]||'en';
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
  if(catalog)return request.method==='HEAD'?new Response(null,{status:catalog.status,headers:catalog.headers}):catalog;
  const canonical=url.pathname.endsWith('/index.html')?url.pathname.slice(0,-10):url.pathname.endsWith('/')?url.pathname:url.pathname+'/';
  if(ROUTES.has(canonical)&&canonical!==url.pathname){url.pathname=canonical;return Response.redirect(url.href,301)}
  const allowed=ROUTES.has(url.pathname)||STATIC_FILES.has(url.pathname)||url.pathname.startsWith('/assets/');
  const response=await env.ASSETS.fetch(allowed?request:new Request(new URL('/404.html',url),request));
  const headers=new Headers(response.headers);headers.set('x-pikobuy-release',RELEASE);headers.set('x-content-type-options','nosniff');
  const status=allowed?response.status:404;
  if(status===404)headers.set('x-robots-tag','noindex');
  if(headers.get('content-type')?.includes('text/html')){
   headers.set('content-language',lang);headers.set('cache-control','public, max-age=0, s-maxage=60');
   // Inject only into successful editorial inner routes. Home HTML stays byte-for-byte unchanged.
   if(status===200 && ROUTES.has(url.pathname) && bare!=='/' && request.method!=='HEAD') {
    const html=(await response.text()).replace('</head>','<link rel="stylesheet" href="/assets/piko-mobile-20261013-v1.css"><script src="/assets/piko-mobile-20261013-v1.js" defer></script></head>').replace(/<body([^>]*)>/,(_,attrs)=>'<body'+(/\bclass="/.test(attrs)?attrs.replace(/\bclass="/,'class="piko-compact-page '):attrs+' class="piko-compact-page"')+'>');
    headers.delete('content-length');headers.delete('etag');
    return new Response(html,{status,headers});
   }
  }
  return new Response(request.method==='HEAD'?null:response.body,{status,headers});
 }
};
export default worker;
