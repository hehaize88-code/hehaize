// GA4: collect visits only on the production domain, including its www alias.
if (['hipobuyy-sheet.com', 'www.hipobuyy-sheet.com'].includes(window.location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-F6G27KWPPQ');
  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-F6G27KWPPQ';
  document.head.appendChild(googleTag);
}

document.querySelectorAll('form[data-shop-search]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  const value=form.querySelector('input[type=search]').value.trim();
  if(value) {
    editorialEvent('catalog_search_submit');
    window.location.href='https://cnbuycha.com/AllProducts/?q='+encodeURIComponent(value);
  }
}));
document.querySelectorAll('[data-category-filter]').forEach(button=>button.addEventListener('click',()=>{
  const chosen=button.dataset.categoryFilter;
  document.querySelectorAll('[data-category-filter]').forEach(item=>item.classList.toggle('on',item===button));
  let count=0;
  document.querySelectorAll('[data-product-category]').forEach(item=>{
    const visible=chosen==='all'||item.dataset.productCategory===chosen;
    item.classList.toggle('hide',!visible);
    if(visible)count++;
  });
  const empty=document.getElementById('empty');if(empty)empty.classList.toggle('hide',count>0);
}));
const language=document.getElementById('language');if(language)language.addEventListener('change',()=>{window.location.href=language.value});

// Lightweight first-party events; search text and personal form data are not collected.
function editorialEvent(name,params={}){
  if(typeof window.gtag==='function')window.gtag('event',name,{page_language:document.documentElement.lang,...params});
}
document.addEventListener('click',event=>{
  const a=event.target.closest('a[href]');if(!a)return;
  const u=new URL(a.href,window.location.href);
  if(['cnbuycha.com','www.cnbuycha.com'].includes(u.hostname)){
    const match=u.pathname.match(/\/(\d+)\.html$/);
    editorialEvent(match?'outbound_product_click':'outbound_category_click',{link_path:u.pathname,...(match?{item_id:match[1]}:{})});
  }else if(u.origin===location.origin&&u.pathname!==location.pathname&&/\/articles\/[^/]+\/$/.test(u.pathname))editorialEvent('article_open',{article_path:u.pathname});
});
document.querySelectorAll('[data-parcel-calculator]').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(form);const n=k=>Number(data.get(k));const out=form.querySelector('output');
    const fields=['weight','length','width','height','divisor','rounding'];
    if(fields.some(k=>!Number.isFinite(n(k))||n(k)<=0)||['rate','fee'].some(k=>!Number.isFinite(n(k))||n(k)<0)){
      out.textContent=form.dataset.error;out.setAttribute('role','alert');return;
    }
    out.removeAttribute('role');
    const actual=n('weight'),volume=n('length')*n('width')*n('height')/n('divisor');
    const raw=data.get('basis')==='actual'?actual:Math.max(actual,volume);
    const billed=Math.ceil((raw-1e-10)/n('rounding'))*n('rounding');
    const cost=n('fee')+billed*n('rate');
    if(!Number.isFinite(volume)||!Number.isFinite(billed)||!Number.isFinite(cost)){out.textContent=form.dataset.error;out.setAttribute('role','alert');return;}
    const fmt=new Intl.NumberFormat(document.documentElement.lang,{maximumFractionDigits:3});
    const lines=[`${form.dataset.actualLabel}: ${fmt.format(actual)} kg`,`${form.dataset.volumeLabel}: ${fmt.format(volume)} kg`,`${form.dataset.billedLabel}: ${fmt.format(billed)} kg`];
    lines.push(String(data.get('rate')).trim()?`${form.dataset.costLabel}: ${new Intl.NumberFormat(document.documentElement.lang,{style:'currency',currency:'USD'}).format(cost)}`:form.dataset.norate);
    out.replaceChildren(...lines.map(x=>{const p=document.createElement('div');p.textContent=x;return p;}));
    editorialEvent('shipping_estimate_calculated',{billing_basis:data.get('basis')});
  });
});
