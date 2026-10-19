// Track intent on Kakobuy Pick, never claim a completed purchase or registration.
export function installEngagementTracking(doc, location, send) {
  const lang=doc.documentElement.lang || 'en';
  const localPath=path=>path.replace(/^\/(?:de|es|fr|it|pl|pt|ro|sv|nl|da|fi|el|cs|hu|bg|sk|hr|sl|lt|lv|et|ga|mt)(?=\/)/,'');
  const current=localPath(location.pathname);
  const emit=(name,params)=>send(name,{language:lang,page_path:location.pathname,...params});
  doc.addEventListener('click',event=>{
    const link=event.target?.closest?.('a[href]');
    if(!link || event.defaultPrevented || (event.button!==undefined && event.button!==0))return;
    let url;try{url=new URL(link.getAttribute('href'),location.href);}catch{return;}
    if(url.origin===location.origin){
      const path=localPath(url.pathname);
      const product=path.match(/^\/products\/([a-z-]+)\/(\d+)\.html$/);
      const article=path.match(/^\/articles\/([a-z-]+)\/$/);
      const category=path.match(/^\/category\/([a-z-]+)\/$/);
      if(product)emit('select_item',{item_list_id:current,items:[{item_id:product[2],item_category:product[1]}]});
      else if(article && path!==current)emit('article_open',{article_slug:article[1]});
      else if(category && path!==current)emit('category_click',{item_category:category[1]});
    }else if(url.hostname==='item2.kakobuy.com' && url.pathname==='/item/details'){
      const product=current.match(/^\/products\/([a-z-]+)\/(\d+)\.html$/);
      emit('outbound_product_click',{link_domain:url.hostname,...(product?{item_id:product[2],item_category:product[1]}:{})});
    }else if(['kakobuy.com','www.kakobuy.com'].includes(url.hostname) && /^\/register\/?$/.test(url.pathname)){
      emit('registration_click',{link_domain:url.hostname});
    }
  });
  doc.addEventListener('submit',event=>{
    const form=event.target;
    if(!form?.matches?.('.search-form'))return;
    const query=form.querySelector('input[name="q"]')?.value.trim();
    if(!query)return;
    // Counts searches without sending free-form text or duplicating view_search_results.
    emit('catalog_search',{search_scope:current.match(/^\/category\/([a-z-]+)\/$/)?.[1]||'all',search_length:Math.min(query.length,120)});
  });
}
