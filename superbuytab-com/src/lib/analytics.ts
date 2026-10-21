// Keep search terms, addresses, full URLs and other free text out of custom events.
export function installAnalytics(doc:Document,send:(event:string,params:Record<string,string|number>)=>void){
 const locale=doc.documentElement.lang;
 const withoutLocale=(path:string)=>path.replace(/^\/(?:de|es|fr|it|pl|pt|ro|sv|nl|da|fi|el|cs|hu|bg|sk|hr|sl|lt|lv|et|ga|mt)(?=\/)/,'');
 const source=withoutLocale(doc.location.pathname);
 const sourceArticle=source.match(/^\/articles\/([a-z-]+)\/$/)?.[1];
 const sourceCategory=source.match(/^\/categories\/([a-z-]+)\/$/)?.[1];
 doc.addEventListener('click',event=>{
  const target=event.target as Element|null;
  const anchor=target?.closest?.('a[href]') as HTMLAnchorElement|null;
  if(!anchor)return;
  const url=new URL(anchor.href,doc.location.href),route=withoutLocale(url.pathname);
  const shared={language:locale,source_type:sourceArticle?'article':sourceCategory?'category':'other'};
  if(url.origin===doc.location.origin){
   if(sourceArticle&&(route==='/spreadsheet/'||route.startsWith('/categories/'))){
    send('article_to_catalog',{...shared,article_slug:sourceArticle,destination_category:url.searchParams.get('category')||route.split('/')[2]||'all',transport_type:'beacon'});
   }
   const product=route.match(/^\/products\/([a-z-]+)\/(\d+)\/$/);
   if(product)send('product_click',{...shared,product_category:product[1],product_id:product[2],transport_type:'beacon'});
  }else if(url.hostname==='www.superbuy.com'&&anchor.rel.split(/\s+/).includes('sponsored')){
   send('outbound_superbuy',{...shared,link_type:anchor.classList.contains('buy-button')?'product':'register',transport_type:'beacon'});
  }
 });
 doc.addEventListener('submit',event=>{
  const form=event.target as HTMLFormElement;
  if(!form.matches?.('form.search-form'))return;
  const value=String(new FormData(form).get('q')||'').trim();
  if(value)send('catalogue_search',{language:locale,query_length:value.length,transport_type:'beacon'});
 });
}
