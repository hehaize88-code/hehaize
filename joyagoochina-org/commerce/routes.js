import {catalogueRoute,upstream,CATEGORIES,LANGS} from './catalog.js';
import {homepageRoute} from './home.js';
import {LEGACY_PRODUCTS} from './content.js';
export const RELEASE='2026-10-12-joyagoo-catalog-v1';
export const SITEMAP_INDEX='<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://joyagoochina.org/editorial-sitemap.xml</loc></sitemap><sitemap><loc>https://joyagoochina.org/catalog-sitemap.xml</loc></sitemap></sitemapindex>';
export async function commerceRoutes(request,env,ctx) {
 const url=new URL(request.url),locale=url.pathname.match(/^\/(zh|de|pl|es|it|fr|pt|ro|sv)(?=\/|$)/)?.[0]||'',bare=url.pathname.slice(locale.length)||'/';
 if(locale&&url.pathname===locale)return Response.redirect(url.origin+locale+'/'+url.search,301);
 if(bare==='/sitemap.xml')return new Response(SITEMAP_INDEX,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300'}});
 if(url.pathname==='/catalog-sitemap.xml'){
  try {
   const xml=await upstream('/sitemap.xml');
   const paths=[...new Set([...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
   const entries=LANGS.flatMap(l=>['/catalog/',...paths.filter(p=>p!='/AllProducts/').map(p=>'/catalog'+p)].map(p=>`<url><loc>https://joyagoochina.org${l==='en'?'':'/'+l}${p}</loc></url>`));
   if(entries.length>50000)throw Error('Catalogue sitemap needs splitting');
   return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries.join('')+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=600'}});
  }catch{return new Response('Sitemap temporarily unavailable',{status:503,headers:{'cache-control':'no-store'}});}
 }
 const normal=bare.endsWith('/')?bare:bare+'/';
 const oldProduct=LEGACY_PRODUCTS[normal];
 if(oldProduct)return Response.redirect(url.origin+locale+'/catalog'+oldProduct,301);
 if(['/spreadsheet/','/categories/','/finds/','/products/','/search.html/'].includes(normal)){
  const dest=new URL(locale+'/catalog/',url.origin);dest.search=url.search;
  if(dest.searchParams.has('keywords')){dest.searchParams.set('q',dest.searchParams.get('keywords'));dest.searchParams.delete('keywords');}
  dest.searchParams.delete('channelid');return Response.redirect(dest.href,301);
 }
 if(!['GET','HEAD'].includes(request.method))return catalogueRoute(request,env);
 const isHome=bare==='/',isCatalog=bare.startsWith('/catalog')||url.pathname==='/api/catalog';
 if(!isHome&&!isCatalog)return null;
 const edge=globalThis.caches?.default,keyURL=new URL(url);keyURL.searchParams.set('__commerce_version',RELEASE);
 const key=new Request(keyURL,{method:'GET'});
 if(edge&&request.method==='GET'){const cached=await edge.match(key);if(cached)return cached;}
 const response=isHome?await homepageRoute(request):await catalogueRoute(request,env);
 if(!response)return null;
 response.headers.set('x-joyagoo-release',RELEASE);
 if(edge&&ctx?.waitUntil&&request.method==='GET'&&response.status===200&&!response.headers.has('x-catalog-snapshot'))ctx.waitUntil(edge.put(key,response.clone()));
 return request.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;
}
