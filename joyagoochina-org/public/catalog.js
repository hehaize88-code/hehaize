import {fingerprint} from './commerce/image-search-core.mjs';
import {matchingPhotoPath} from './commerce/image-index-loader.mjs?v=20261122';
import {resizeFingerprint} from './commerce/compact-search.mjs';
import {PRODUCT_UI} from './commerce/ui.js?v=20261122-24';
import {translateProductTitle} from './commerce/product-title.js?v=20261112-v4';
import {productGlossaries} from './commerce/product-glossaries.js';
(()=>{
 const locale=document.querySelector('[data-locale]')?.dataset.locale||'en';
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const main=document.getElementById('gallery-main');
 if(!document.querySelector('[data-product-detail]') && main && document.querySelector('[data-gallery-index]')){let current=0,start=null;const thumbs=[...document.querySelectorAll('[data-gallery-index]')];const go=i=>{current=Math.max(0,Math.min(thumbs.length-1,i));main.src=thumbs[current].querySelector('img').src;thumbs.forEach((t,n)=>t.setAttribute('aria-current',String(n===current)));document.querySelector('[data-gallery-prev]').disabled=current===0;document.querySelector('[data-gallery-next]').disabled=current===thumbs.length-1;};thumbs.forEach((t,i)=>t.addEventListener('click',()=>go(i)));document.querySelector('[data-gallery-prev]').onclick=()=>go(current-1);document.querySelector('[data-gallery-next]').onclick=()=>go(current+1);main.addEventListener('touchstart',e=>start=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>40)go(current+(e.changedTouches[0].clientX<start?1:-1));start=null;},{passive:true});main.tabIndex=0;main.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});let dragStart=null;main.draggable=false;main.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')dragStart=e.clientX;});main.addEventListener('pointerup',e=>{if(dragStart!==null&&Math.abs(e.clientX-dragStart)>40)go(current+(e.clientX<dragStart?1:-1));dragStart=null;});go(0);}
 document.addEventListener('click',event=>{const a=event.target.closest('[data-track-event]');if(a)window.gtag?.('event',a.dataset.trackEvent,{page_path:location.pathname,language:locale,destination_path:new URL(a.href).pathname,item_id:new URL(a.href).searchParams.get('id')||''});});
 document.querySelector('.catalog-search')?.addEventListener('submit',()=>window.gtag?.('event','search_submit',{page_path:location.pathname}));

 const input=document.getElementById('image-file');
 if(!input)return;
 const status=document.getElementById('image-status'), results=document.getElementById('image-results'), preview=document.getElementById('image-preview');
 const pager=document.getElementById('image-pages');
 const pageInput=pager.querySelector('input');
 const previous=pager.querySelector('[data-prev]'),next=pager.querySelector('[data-next]');
 let renderPage=null;
 previous.onclick=()=>renderPage(Number(pageInput.value)-1,true);
 next.onclick=()=>renderPage(Number(pageInput.value)+1,true);
 pageInput.onchange=()=>renderPage(Number(pageInput.value),true);
 pageInput.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();pageInput.blur();}};
 const t=key=>PRODUCT_UI[locale]?.[key]||key;
 const number=n=>Number(n).toLocaleString(locale);
 let sequence=0,worker=null,objectUrl=null,detailsPromise=null;
 const detailData=()=>detailsPromise??=Promise.all([
  fetch('/commerce/titles/'+locale+'.json').then(r=>r.ok?r.json():{}),
  fetch('/commerce/image-search-prices.json').then(r=>r.ok?r.json():{})
 ]).catch(()=>{detailsPromise=null;return [{},{}];});
 function thumbnail(src){
  const url=new URL(src,'https://cnbuycha.com');
  if(/(^|\.)geilicdn\.com$/.test(url.hostname)&&/\.(jpg|jpeg|png)$/i.test(url.pathname)){url.pathname+='.webp';url.search='?w=400&h=400';}
  return url.href;
 }
 results.addEventListener('error',event=>{
  const img=event.target;
  if(img.tagName==='IMG'&&img.dataset.original){const original=img.dataset.original;delete img.dataset.original;if(img.src!==original)img.src=original;}
 },true);
 function stop(){
  sequence++;
  worker?.terminate();worker=null;
  if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}
 }
 async function selectImage(file){
  stop();
  const turn=sequence;
  pager.hidden=true;pager.style.display='none';renderPage=null;results.replaceChildren();preview.hidden=true;status.textContent='';
  if(!file)return;
  if(file.size<=0 || file.size>10*1024*1024 || !(/^image\/(jpeg|png|webp)$/.test(file.type)||(!file.type&&/\.(jpe?g|png|webp)$/i.test(file.name)))){
   status.textContent=t('Choose a JPEG, PNG or WebP under 10 MB.');return;
  }
  objectUrl=URL.createObjectURL(file);
  try {
   const image=new Image();image.src=objectUrl;await image.decode();
   if(turn!==sequence)return;
   preview.src=image.src;preview.hidden=false;
   status.textContent=t('Loading image index…');
   const query=fingerprint(image);query.resize=resizeFingerprint(image);
   const current=new Worker('/commerce/visual-worker-20261122.js?v=2');worker=current;
   const metadata=detailData();
   current.onerror=()=>{if(turn===sequence){status.textContent=t('Image index unavailable. Please try again.');current.terminate();worker=null;}};
   current.onmessage=async({data})=>{
    if(turn!==sequence||data.id!==turn)return;
    if(data.type==='progress'){
     status.textContent=t('Comparing catalogue images…')+' '+Math.round(data.loaded/data.total*100)+'%';
     return;
    }
    current.terminate();worker=null;
    if(data.type!=='result'){status.textContent=t('Image index unavailable. Please try again.');return;}
    const [titles,prices]=await metadata;
    if(turn!==sequence)return;
    const index=data.result;
    const pageSize=24,pages=Math.ceil(index.items.length/pageSize);
    pager.querySelector('span').textContent=number(pages);
    pageInput.max=String(pages);
    renderPage=(requested,scroll=false)=>{
     const page=Math.min(Math.max(1,Math.floor(requested)||1),pages||1);
     pageInput.value=String(page);
     previous.disabled=page===1;next.disabled=page>=pages;
     const start=(page-1)*pageSize;
     results.innerHTML=index.items.slice(start,start+pageSize).map(({p})=>{
     const title=translateProductTitle(p.title,locale,productGlossaries,{[locale]:titles});
     const amount=prices[p.path]??(p.price?Number(p.price):null);
     const price=Number.isFinite(amount)?`<div class="card-meta"><strong data-price-amount="${amount}" data-price-currency="USD">$${amount.toFixed(2)}</strong><span data-currency-code>USD</span></div>`:'';
     return `<article class="catalog-card"><a href="${base}${esc(matchingPhotoPath(p))}"><img src="${esc(thumbnail(p.image))}" data-original="${esc(p.image)}" alt="${esc(title)}" width="400" height="400" loading="lazy" referrerpolicy="no-referrer"><h2>${esc(title)}</h2>${price}</a></article>`;
    }).join('');
    document.dispatchEvent(new Event('joyagoo:prices'));
    if(scroll)results.scrollIntoView({block:'start'});
    };
    renderPage(1);pager.hidden=pages<=1;pager.style.display=pages>1?'flex':'none';
    status.textContent=[t('Products indexed')+' '+number(index.productCount),t('Images')+' '+number(index.imageCount),t('Index updated')+' '+index.updatedAt].join(' · ');
   };
   current.postMessage({id:turn,query});
  }catch{if(turn===sequence)status.textContent=preview.hidden?t('Choose a JPEG, PNG or WebP under 10 MB.'):t('Image index unavailable. Please try again.');}
 }
 input.addEventListener('change',()=>{const file=input.files[0];input.value='';selectImage(file);});
 const drop=input.closest('label');
 drop.addEventListener('dragover',event=>event.preventDefault());
 drop.addEventListener('drop',event=>{event.preventDefault();selectImage(event.dataTransfer?.files[0]);});
 document.addEventListener('paste',event=>{const file=Array.from(event.clipboardData?.files||[]).find(f=>f.type.startsWith('image/'));if(file){event.preventDefault();selectImage(file);}});
 if(input.files.length)selectImage(input.files[0]);
 window.addEventListener('pagehide',stop);
})();
