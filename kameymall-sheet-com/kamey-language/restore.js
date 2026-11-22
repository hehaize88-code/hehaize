function restoreFindBrowser(noMatches,lang){
  const analytics=(name,params)=>window.gtag?.('event',name,{...params,language:lang,source_page:location.pathname,transport_type:'beacon'});
  for(const browser of document.querySelectorAll('.find-browser')){
    const find=browser.querySelector('.table-search input'),select=browser.querySelector('select');
    const clear=browser.querySelector('.clear-filter'),body=browser.querySelector('.table-body');
    if(!find||!select||!body)continue;
    const rows=Array.from(body.querySelectorAll('.product-row'));
    const empty=document.createElement('p');empty.className='empty-state';empty.textContent=noMatches;empty.hidden=true;body.append(empty);
    const filter=()=>{
      const q=find.value.trim().toLocaleLowerCase(lang);
      for(const row of rows){
        const category=row.querySelector('.category-cell');
        const key=(category?.getAttribute('href')||'').split('/').filter(Boolean).pop();
        row.hidden=(select.value!=='all'&&key!==select.value)||!row.textContent.toLocaleLowerCase(lang).includes(q);
      }
      empty.hidden=rows.some(row=>!row.hidden);
    };
    find.addEventListener('input',filter);select.addEventListener('change',filter);
    clear?.addEventListener('click',()=>{find.value='';select.value='all';filter();});
  }
  document.addEventListener('click',event=>{
    const a=event.target.closest?.('a[href]');if(!a)return;
    const url=new URL(a.href,location.href);
    if(url.hostname!=='cnbuycha.com')return;
    const product=a.closest('.product-row, .catalog-product, .product-visual');
    const params={link_domain:url.hostname,link_url:a.href,outbound:true};
    if(product){params.item_id=product.querySelector('code')?.textContent;params.item_name=product.querySelector('.product-name,h2')?.textContent;}
    analytics(product?'product_click':url.pathname==='/AllProducts/'?'main_site_browse_click':'category_click',params);
  });
  document.addEventListener('submit',event=>{
    if(event.target.matches?.('form.hero-search')) analytics('main_search_submit',{link_domain:new URL(event.target.action,location.href).hostname});
  });
}

const settings=document.currentScript?.dataset;
if(settings)restoreFindBrowser(settings.empty,settings.lang);
