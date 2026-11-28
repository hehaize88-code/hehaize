const siteOrigin='https://uufindsgrid.com';
const siteLocales=localeList.map(([code])=>code).filter(code=>code!=='en-gb');
function canonical(url){
 const clean=new URL(url.pathname,siteOrigin);
 for(const key of ['cat','page','q','sort']){
  const val=url.searchParams.get(key);
  if(val && !(key==='page'&&val==='1') && !(key==='cat'&&val==='AllProducts') && !(key==='sort'&&val==='new')) clean.searchParams.set(key,val);
 }
 return clean.href;
}
function alternates(url){
 const href=canonical(url);
 return [...siteLocales,'x-default'].map(lang=>'<link rel="alternate" hreflang="'+lang+'" href="'+h(href.replace(/(\.com\/)[a-z-]+\//,'$1'+(lang==='x-default'?'en':lang)+'/'))+'">').join('');
}
function sitemap(path){
 const index=path==='/sitemap.xml';
 const lang=path.match(/^\/sitemaps\/([a-z-]+)\.xml$/)?.[1];
 if(!index&&!siteLocales.includes(lang))return new Response('Not found',{status:404});
 const urls=index?siteLocales.map(l=>siteOrigin+'/sitemaps/'+l+'.xml'):['/','/image-search/','/spreadsheet/','/faq/','/how-to-buy/','/articles/','/articles/image-search/','/articles/qc-photos/','/articles/styles-and-prices/',...productPaths].map(p=>siteOrigin+'/'+lang+p);
 const tag=index?'sitemap':'url', root=index?'sitemapindex':'urlset';
 return new Response('<?xml version="1.0" encoding="UTF-8"?><'+root+' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(u=>'<'+tag+'><loc>'+h(u)+'</loc></'+tag+'>').join('')+'</'+root+'>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=900'}});
}
