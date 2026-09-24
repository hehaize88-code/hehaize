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
