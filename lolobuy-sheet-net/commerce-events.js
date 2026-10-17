/* Preserve the established event names; exclude query text and URL parameters. */
(() => {
 if(window.__loloCommerceEvents)return;
 window.__loloCommerceEvents=true;
 const language=()=>location.pathname.match(/^\/(es|de|fr|it)(?:\/|$)/)?.[1]||'en';
 const send=(name,params)=>window.gtag?.('event',name,{page_path:location.pathname,content_language:language(),...params});
 document.addEventListener('click',event=>{
  const anchor=event.target.closest?.('a[href]');if(!anchor)return;
  const url=new URL(anchor.href,location.href),internal=url.origin===location.origin;
  let name=anchor.dataset.trackEvent;
  if(!name&&anchor.dataset.localeTarget)name='language_change';
  if(!name&&internal&&/\/catalog\/.+\/\d+\.html$/.test(url.pathname))name='product_detail_click';
  if(!name&&internal&&/\/articles\/[^/]+$/.test(url.pathname))name='article_click';
  if(!name&&internal&&/\/catalog\/?$/.test(url.pathname))name='catalog_click';
  if(!name)return;
  const itemId=url.hostname==='www.lolobuy.com'?url.pathname.match(/^\/productDetail\/(\d+)$/)?.[1]:undefined;
  send(name,{destination:url.pathname,link_domain:url.hostname,outbound:!internal,...(itemId?{item_id:itemId}:{}),...(anchor.dataset.localeTarget?{target_language:anchor.dataset.localeTarget}:{})});
 });
 document.addEventListener('submit',event=>{
  if(!event.target.matches?.('form.catalog-search,form.product-search'))return;
  const query=String(new FormData(event.target).get('q')||'');
  send('search_submit',{query_length:query.length,search_location:event.target.classList.contains('catalog-search')?'catalog':'editorial'});
 });
})();
