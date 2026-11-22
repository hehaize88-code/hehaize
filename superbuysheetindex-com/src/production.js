const liveHost='superbuysheetindex.com';
const siteRoot='https://'+liveHost;
async function productionRoute(u){
 if(u.hostname==='www.'+liveHost||u.protocol==='http:'){u.protocol='https:';u.hostname=liveHost;return Response.redirect(u.href,308)}
 const headers={'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public,max-age=600'};
 const xml=(root,body)=>new Response('<?xml version="1.0" encoding="UTF-8"?><'+root+' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+body+'</'+root+'>',{headers});
 if(u.pathname==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+siteRoot+'/sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
 if(u.pathname==='/sitemap.xml')return xml('sitemapindex',Object.keys(locales).map(l=>'<sitemap><loc>'+siteRoot+'/sitemap-'+l+'.xml</loc></sitemap>').join(''));
 const lang=u.pathname.match(/^\/sitemap-([a-z]+)\.xml$/)?.[1];
 if(lang&&Object.hasOwn(locales,lang)){
  const upstream=await fetch(origin+'/sitemap.xml',{cf:{cacheTtl:600,cacheEverything:true}});
  if(!upstream.ok)return new Response('Catalog unavailable',{status:503});
  const raw=await upstream.text(),paths=new Set(['','spreadsheet/','categories/','guide/','image-search/']);
  for(const m of raw.matchAll(/<loc>https:\/\/cnbuycha\.com(\/[a-z-]+\/\d+\.html)<\/loc>/g))paths.add('product'+m[1]);
  if(paths.size===5)return new Response('Catalog unavailable',{status:503});
  return xml('urlset',[...paths].map(path=>'<url><loc>'+siteRoot+'/'+lang+'/'+path+'</loc></url>').join(''));
 }
}
