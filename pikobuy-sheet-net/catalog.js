(()=>{
 const locale=document.querySelector('[data-locale]')?.dataset.locale||'en';
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const corrected=path=>path==='/shoes/3448.html'?'/other-stuff/3448.html':path;
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const main=document.getElementById('gallery-main');
 if(main){let current=0,start=null;const thumbs=[...document.querySelectorAll('[data-gallery-index]')];const go=i=>{current=Math.max(0,Math.min(thumbs.length-1,i));main.src=thumbs[current].querySelector('img').src;thumbs.forEach((t,n)=>t.setAttribute('aria-current',String(n===current)));document.querySelector('[data-gallery-prev]').disabled=current===0;document.querySelector('[data-gallery-next]').disabled=current===thumbs.length-1;};thumbs.forEach((t,i)=>t.addEventListener('click',()=>go(i)));document.querySelector('[data-gallery-prev]').onclick=()=>go(current-1);document.querySelector('[data-gallery-next]').onclick=()=>go(current+1);main.addEventListener('touchstart',e=>start=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>40)go(current+(e.changedTouches[0].clientX<start?1:-1));start=null;},{passive:true});go(0);}
 const home=document.getElementById('piko-live-products');if(home)fetch('/api/catalog').then(r=>{if(!r.ok)throw Error();return r.json()}).then(async data=>{const titleFor=await window.pikoProductTitles(locale);if(data.products?.length)home.innerHTML=data.products.slice(0,4).map(p=>`<article class="catalog-card"><a href="${base}${esc(corrected(p.path))}"><img src="${esc(p.image)}" alt="${esc(titleFor(p.title))}" width="400" height="400" loading="lazy"><h2>${esc(titleFor(p.title))}</h2><div class="card-meta"><strong>$${Number(p.price).toFixed(2)}</strong><span>USD · QC ↗</span></div></a></article>`).join('')}).catch(()=>{});
 if(document.getElementById('image-file') || document.getElementById('search-main')){
   import('/assets/image-search-v1.mjs').catch(error=>console.error('Image search initialization failed',error));
 }
})();
