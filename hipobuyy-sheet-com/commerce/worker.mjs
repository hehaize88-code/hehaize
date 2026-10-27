
const RELEASE='hipobuy-20261027-search-v1';
function finish(response,request) {
 const headers=new Headers(response.headers);headers.set('x-hipobuy-release',RELEASE);headers.set('x-content-type-options','nosniff');headers.set('referrer-policy','strict-origin-when-cross-origin');
 return new Response(request.method==='HEAD'?null:response.body,{status:response.status,headers});
}
export default {
 async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
  if(url.hostname==='www.hipobuyy-sheet.com'){url.hostname='hipobuyy-sheet.com';return Response.redirect(url,301)}
  if(url.pathname==='/')return Response.redirect(url.origin+'/en/'+url.search,302);
  const m=url.pathname.match(/^\/(en|de|es|fr|it)\/(spreadsheet|finds)\/?$/);
  if(m)return Response.redirect(url.origin+'/'+m[1]+'/catalog/'+url.search,301);
  if(url.pathname==='/search.html'||url.pathname==='/AllProducts/'){
   const target=new URL('/en/catalog/',url);target.search=url.search;
   if(target.searchParams.has('keywords')){target.searchParams.set('q',target.searchParams.get('keywords'));target.searchParams.delete('keywords');target.searchParams.delete('channelid')}
   return Response.redirect(target,301);
  }
  if(url.pathname==='/catalog-sitemap.xml'){
   try{
    const source=await upstream('/sitemap.xml');
    const paths=[...new Set([...source.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
    if(!paths.length)throw Error('No catalogue entries');
    const body='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+LANGS.flatMap(lang=>paths.map(p=>'<url><loc>https://hipobuyy-sheet.com'+localPath(p,lang)+'</loc></url>')).join('')+'</urlset>';
    return finish(new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=300'}}),request);
   }catch{return finish(new Response('Catalogue temporarily unavailable',{status:503,headers:{'retry-after':'60'}}),request)}
  }
  const catalog=await catalogueRoute(request,env);
  if(catalog)return finish(catalog,request);
  return finish(await env.ASSETS.fetch(request),request);
 }
};
