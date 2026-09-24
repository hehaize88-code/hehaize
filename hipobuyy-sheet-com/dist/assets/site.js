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
  if(value) window.location.href='https://cnbuycha.com/AllProducts/?q='+encodeURIComponent(value);
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
