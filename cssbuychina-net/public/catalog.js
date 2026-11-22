import {loadDictionary} from '/assets/locale-core.mjs?v=20261112-all-images';
import {localizedProductTitle} from '/commerce/product-title.js';
import {productGlossaries} from '/commerce/product-glossaries.js';
import {initializeImageSearch} from '/commerce/image-search.js';
{
 const locale=document.querySelector('[data-locale]')?.dataset.locale||'en';
 const [baseDictionary, productNames] = await Promise.all([
   loadDictionary(locale),
   document.getElementById('image-file') ? readProductNames(locale) : Promise.resolve({})
 ]);
 const dictionary = Object.assign(Object.create(null), baseDictionary, productNames);
 const titleText=s=>localizedProductTitle(s,locale,dictionary,productGlossaries);
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const main=document.getElementById('gallery-main');
 if(main&&!document.querySelector('[data-product-detail]')){let current=0,start=null;const thumbs=[...document.querySelectorAll('[data-gallery-index]')];const go=i=>{current=Math.max(0,Math.min(thumbs.length-1,i));main.src=thumbs[current].querySelector('img').src;thumbs.forEach((t,n)=>t.setAttribute('aria-current',String(n===current)));document.querySelector('[data-gallery-prev]').disabled=current===0;document.querySelector('[data-gallery-next]').disabled=current===thumbs.length-1;};thumbs.forEach((t,i)=>t.addEventListener('click',()=>go(i)));document.querySelector('[data-gallery-prev]').onclick=()=>go(current-1);document.querySelector('[data-gallery-next]').onclick=()=>go(current+1);main.addEventListener('touchstart',e=>start=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>40)go(current+(e.changedTouches[0].clientX<start?1:-1));start=null;},{passive:true});go(0);}
 document.addEventListener('click',event=>{const a=event.target.closest('[data-track-event]');if(a)window.gtag?.('event',a.dataset.trackEvent,{page_path:location.pathname,page_hostname:location.hostname,site_language:locale,item_id:new URL(a.href).searchParams.get('id')||''});});
 document.querySelector('.catalog-search')?.addEventListener('submit',()=>window.gtag?.('event','search_submit',{page_path:location.pathname,page_hostname:location.hostname,site_language:locale}));

 initializeImageSearch({locale,dictionary,titleText});
}

async function readProductNames(locale) {
 try {
   const language = locale === 'pt-br' ? 'pt' : locale;
   const response = await fetch('/assets/catalog-titles/' + language + '.json.gz');
   if (!response.ok) return {};
   const bytes = await response.arrayBuffer();
   const data = new Uint8Array(bytes);
   if (data[0] === 31 && data[1] === 139) {
     const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'));
     return await new Response(stream).json();
   }
   return await new Response(bytes).json();
 } catch {
   return {};
 }
}

