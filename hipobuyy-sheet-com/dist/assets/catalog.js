(()=>{
 const locale=document.querySelector('[data-locale]')?.dataset.locale||'en';
 const base=('/'+locale)+'/catalog';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const home=document.getElementById('hipo-live-products');if(home)fetch('/api/catalog?lang='+encodeURIComponent(locale)).then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(data.products?.length)home.innerHTML=data.products.slice(0,4).map(p=>`<article class="catalog-card"><a href="${base}${esc(p.path)}"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="400" height="400" loading="lazy"><h2>${esc(p.title)}</h2><div class="card-meta"><strong data-usd="${esc(p.price)}">${p.price && Number.isFinite(Number(p.price)) ? '$'+Number(p.price).toFixed(2) : '—'}</strong></div></a></article>`).join('')}).catch(()=>{});
 if(document.getElementById('image-file')) import('/assets/image-search-ui.mjs').catch(() => {
   const input = document.getElementById('image-file');
   document.getElementById('image-status').textContent = input.dataset.i18nFailure;
 });
})();
