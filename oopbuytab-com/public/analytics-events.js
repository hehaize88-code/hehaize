// Measure intent, not purchases. No query text, recipient information or payment data is sent.
(()=>{
 const send=(name,extra={})=>{
  if(typeof window.gtag!=='function')return;
  window.gtag('event',name,{page_locale:document.body.dataset.locale||document.documentElement.lang,article_slug:document.body.dataset.article||undefined,product_id:document.body.dataset.product||undefined,transport_type:'beacon',...extra});
 };
 document.addEventListener('click',event=>{
  const link=event.target?.closest?.('a[href]');if(!link)return;
  let url;try{url=new URL(link.href,location.href)}catch{return}
  if(url.hostname==='oopbuy.com'&&url.pathname.startsWith('/product/'))send('product_outbound_click',{destination_host:url.hostname});
  else if(url.hostname==='oopbuy.com'&&url.pathname==='/login')send('registration_click');
  else if(url.hostname==='oopbuy.com'&&url.pathname==='/estimation')send('shipping_estimator_click');
  else if(url.origin===location.origin&&/\/products\//.test(url.pathname))send('product_detail_click',{product_path:url.pathname});
  if(document.body.dataset.article&&url.origin===location.origin&&/\/(spreadsheet|category)\//.test(url.pathname))send('article_catalog_click');
  else if(document.body.dataset.article&&url.origin===location.origin&&/\/articles\/[^/]+\//.test(url.pathname)&&!url.hash)send('article_related_click',{target_article:url.pathname.split('/').filter(Boolean).at(-1)});
 });
 document.addEventListener('submit',event=>{
  const form=event.target;if(!(form instanceof HTMLFormElement))return;
  const query=form.querySelector('input[name="q"]');
  if(query?.value.trim())send('catalog_search',{query_length:Math.min(query.value.trim().length,120)});
 });
})();
