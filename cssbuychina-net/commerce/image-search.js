import {compatibleSearch} from './compatible-search.mjs';
import {acceptsImage,fingerprint} from './image-search-core.mjs';
import {resizeFingerprint} from './compact-search.mjs';
import {matchingPhotoPath} from './image-index-loader.mjs';

export function initializeImageSearch({locale,dictionary,titleText}) {
 const input=document.getElementById('image-file');if(!input)return;
 const t=value=>dictionary[value]||value;
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const status=document.getElementById('image-status'),results=document.getElementById('image-results'),preview=document.getElementById('image-preview');
 const retry=document.createElement('button');retry.type='button';retry.className='image-search-link';retry.textContent=t('Search again');retry.hidden=true;status.after(retry);
 const scope=document.createElement('p');scope.className='catalog-note';scope.textContent=t('Search product, detail and style photos.');input.closest('label').before(scope);
 let sequence=0,objectUrl=null,worker=null,currentImage=null,prices=null;
 function loadVisiblePrices(){
  const cards=[...results.querySelectorAll('[data-live-result-price]')];
  if(!cards.length)return;
  const control=new AbortController();prices=control;
  const pending=[];let active=0;
  function run(){
   if(control.signal.aborted||!pending.length||active>=3)return;
   const card=pending.shift();active++;
   const detail=new URL(card.querySelector('a').href);detail.search='';
   fetch(detail,{signal:control.signal}).then(async response=>{
    if(!response.ok)return;
    const doc=new DOMParser().parseFromString(await response.text(),'text/html');
    const current=doc.querySelector('[data-detail-price]');
    if(!current||!current.dataset.priceAmount||!Number.isFinite(Number(current.dataset.priceAmount)))return;
    const target=card.querySelector('[data-price-amount]');
    target.dataset.priceAmount=current.dataset.priceAmount;
    target.dataset.priceCurrency=current.dataset.priceCurrency||'USD';
    target.textContent=current.textContent;
    card.querySelector('[data-currency-code]').textContent=target.dataset.priceCurrency;
    document.dispatchEvent(new Event('cssbuy:prices'));
   }).catch(()=>{}).finally(()=>{active--;run();});
  }
  if(!('IntersectionObserver' in window)){pending.push(...cards);for(let n=0;n<3;n++)run();return;}
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);pending.push(entry.target);run();}
  },{rootMargin:'120px'});
  control.signal.addEventListener('abort',()=>observer.disconnect(),{once:true});
  cards.forEach(card=>observer.observe(card));
 }
 const number=value=>Number(value).toLocaleString(locale);
 let recovery=null, watch;
 function stop(){sequence++;clearTimeout(watch);recovery?.abort();recovery=null;prices?.abort();prices=null;worker?.terminate();worker=null;results.setAttribute('aria-busy','false');}
 function render(result){
  results.innerHTML=result.items.map(({p})=>{
   const url=new URL(p.image,'https://cnbuycha.com');
   if(/(^|\.)geilicdn\.com$/.test(url.hostname)&&/\.(?:jpe?g|png)$/i.test(url.pathname)){url.pathname+='.webp';url.search='?w=1200&h=1200';}
   const amount=p.price!==''&&Number.isFinite(Number(p.price))?Number(p.price):null;
   return `<article class="catalog-card" ${amount===null?'data-live-result-price':''}><a href="${base}${esc(matchingPhotoPath(p))}"><img src="${esc(url.href)}" alt="${esc(titleText(p.title))}" width="400" height="400" loading="lazy" referrerpolicy="no-referrer"><h2>${esc(titleText(p.title))}</h2><div class="card-meta"><strong data-price-amount="${amount??''}" data-price-currency="USD">${amount===null?'—':'$'+amount.toFixed(2)}</strong><span data-currency-code>${amount===null?'':'USD'}</span></div></a></article>`;
  }).join('');
  loadVisiblePrices();
  const partial=result.pendingImageCount||result.failedImageCount||result.failedStylePageCount||result.failedDetailCount;
  status.textContent=`${result.items.length} ${t('closest photos')} · ${number(result.productCount)} ${t('products compared')} · ${t('Product photos')}: ${number(result.imageCount)} · ${t('Catalogue snapshot')}: ${result.updatedAt}`+(result.weak?' · '+t('No close visual match found.'):'')+(partial?' · '+t('Some product images could not be indexed. If a photo has no match, try the product name or ID.'):'');
  document.dispatchEvent(new Event('cssbuy:prices'));
 }
 async function compare(){
  stop();const turn=sequence;if(!currentImage)return;
  results.replaceChildren();results.setAttribute('aria-busy','true');retry.hidden=true;status.textContent=t('Comparing images…');
  await new Promise(resolve=>requestAnimationFrame(resolve));if(turn!==sequence)return;
  try{
   const query=fingerprint(currentImage);
   query.resize=resizeFingerprint(currentImage);
   if(query.variation<3){status.textContent=t('This image has too little visible detail. Choose a clear photo of a single item.');results.setAttribute('aria-busy','false');retry.hidden=false;return;}
   const done=()=>{clearTimeout(watch);worker?.terminate();worker=null;results.setAttribute('aria-busy','false');retry.hidden=false;};
   const progress=(loaded,total)=>{if(turn===sequence)status.textContent=t('Comparing images…')+' '+number(loaded)+' / '+number(total);};
   async function recover(){
    if(turn!==sequence || recovery)return;
    clearTimeout(watch);worker?.terminate();worker=null;
    recovery=new AbortController();
    status.textContent=t('Comparing images…');
    try{
     const result=await compatibleSearch(query,recovery.signal,progress);
     if(turn===sequence)render(result);
    }catch(error){
     if(turn===sequence)status.textContent=t('Catalogue images could not be loaded. Check your connection and select Search again.')+' ('+String(error.message).slice(0,100)+')';
    }finally{if(turn===sequence){done();recovery=null;}}
   }
   const arm=()=>{clearTimeout(watch);watch=setTimeout(recover,12000);};
   if(new URL(location.href).searchParams.get('mode')==='compat'){await recover();return;}
   try{worker=new Worker('/commerce/visual-worker-20261122b.js');}
   catch{await recover();return;}
   worker.onmessage=({data})=>{
    if(turn!==sequence || data.id!==turn || recovery)return;
    if(data.type==='progress'){arm();progress(data.loaded,data.total);}
    else if(data.type==='result'){render(data.result);done();}
    else recover();
   };
   worker.onerror=recover;
   worker.onmessageerror=recover;
   arm();status.textContent=t('Loading catalogue images…');worker.postMessage({id:turn,query});
  }catch{if(turn===sequence){stop();status.textContent=t('This image could not be read. Save it as JPG, PNG or WebP and try again.');retry.hidden=false;}}
 }
 async function selectImage(file){
  stop();const turn=sequence;currentImage=null;results.replaceChildren();retry.hidden=true;preview.hidden=true;
  if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;preview.removeAttribute('src');
  if(!file){status.textContent='';return;}
  if(!acceptsImage(file)){status.textContent=t('Choose a JPG, PNG, WebP or GIF up to 20 MB.');return;}
  try{
   objectUrl=URL.createObjectURL(file);const image=new Image();image.src=objectUrl;status.textContent=t('Reading your photo…');await image.decode();if(turn!==sequence)return;
   if(image.naturalWidth*image.naturalHeight>40_000_000){status.textContent=t('This photo is too large to process safely. Resize it to under 40 megapixels and try again.');return;}
   preview.src=image.src;preview.hidden=false;currentImage=image;await compare();
  }catch{if(turn===sequence)status.textContent=t('This image could not be read. Save it as JPG, PNG or WebP and try again.');}
 }
 input.addEventListener('change',()=>{const file=input.files[0];input.value='';selectImage(file);});
 if(input.files.length)selectImage(input.files[0]);
 document.addEventListener('paste',event=>{const file=Array.from(event.clipboardData?.files||[]).find(f=>f.type.startsWith('image/'));if(file){event.preventDefault();selectImage(file);}});
 const drop=input.closest('label');
 drop.addEventListener('dragover',event=>event.preventDefault());
 drop.addEventListener('drop',event=>{event.preventDefault();const file=event.dataTransfer.files[0];if(file)selectImage(file);});
 retry.addEventListener('click',compare);
 window.addEventListener('pagehide',()=>{stop();if(objectUrl)URL.revokeObjectURL(objectUrl);});
}

