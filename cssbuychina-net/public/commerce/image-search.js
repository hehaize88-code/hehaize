import {acceptsImage,fingerprint} from './image-search-core.mjs';
import {matchingPhotoPath} from './image-index-loader.mjs';

export function initializeImageSearch({locale,dictionary,titleText}) {
 const input=document.getElementById('image-file');if(!input)return;
 const t=value=>dictionary[value]||value;
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const status=document.getElementById('image-status'),results=document.getElementById('image-results'),preview=document.getElementById('image-preview');
 const retry=document.createElement('button');retry.type='button';retry.className='image-search-link';retry.textContent=t('Search again');retry.hidden=true;status.after(retry);
 const scope=document.createElement('p');scope.className='catalog-note';scope.textContent=t('Search product, detail and style photos.');input.closest('label').before(scope);
 let sequence=0,objectUrl=null,worker=null,currentImage=null;
 const number=value=>Number(value).toLocaleString(locale);
 function stop(){sequence++;worker?.terminate();worker=null;results.setAttribute('aria-busy','false');}
 function render(result){
  results.innerHTML=result.items.map(({p})=>{
   const url=new URL(p.image,'https://cnbuycha.com');
   if(/(^|\.)geilicdn\.com$/.test(url.hostname)&&/\.(?:jpe?g|png)$/i.test(url.pathname)){url.pathname+='.webp';url.search='?w=1200&h=1200';}
   const amount=p.price!==''&&Number.isFinite(Number(p.price))?Number(p.price):null;
   return `<article class="catalog-card"><a href="${base}${esc(matchingPhotoPath(p))}"><img src="${esc(url.href)}" alt="${esc(titleText(p.title))}" width="400" height="400" loading="lazy" referrerpolicy="no-referrer"><h2>${esc(titleText(p.title))}</h2><div class="card-meta"><strong data-price-amount="${amount??''}" data-price-currency="USD">${amount===null?'—':'$'+amount.toFixed(2)}</strong><span data-currency-code>USD</span></div></a></article>`;
  }).join('');
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
   if(query.variation<3){status.textContent=t('This image has too little visible detail. Choose a clear photo of a single item.');results.setAttribute('aria-busy','false');retry.hidden=false;return;}
   worker=new Worker('/commerce/image-search-worker.js',{type:'module'});
   const done=()=>{worker?.terminate();worker=null;results.setAttribute('aria-busy','false');retry.hidden=false;};
   worker.onmessage=({data})=>{
    if(turn!==sequence||data.id!==turn)return;
    if(data.type==='progress')status.textContent=`${t('Comparing images…')} ${number(data.loaded)} / ${number(data.total)}`;
    else if(data.type==='result'){render(data.result);done();}
    else {status.textContent=t('Catalogue images could not be loaded. Check your connection and select Search again.');done();}
   };
   worker.onerror=()=>{if(turn===sequence){status.textContent=t('Catalogue images could not be loaded. Check your connection and select Search again.');done();}};
   status.textContent=t('Loading catalogue images…');worker.postMessage({id:turn,query});
  }catch{if(turn===sequence){stop();status.textContent=t('This image could not be read. Save it as JPG, PNG or WebP and try again.');retry.hidden=false;}}
 }
 input.addEventListener('change',async()=>{
  stop();const turn=sequence,file=input.files[0];currentImage=null;results.replaceChildren();retry.hidden=true;preview.hidden=true;
  if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;preview.removeAttribute('src');
  if(!file){status.textContent='';return;}
  if(!acceptsImage(file)){status.textContent=t('Choose a JPG, PNG, WebP or GIF up to 20 MB.');return;}
  try{
   objectUrl=URL.createObjectURL(file);const image=new Image();image.src=objectUrl;status.textContent=t('Reading your photo…');await image.decode();if(turn!==sequence)return;
   if(image.naturalWidth*image.naturalHeight>40_000_000){status.textContent=t('This photo is too large to process safely. Resize it to under 40 megapixels and try again.');return;}
   preview.src=image.src;preview.hidden=false;currentImage=image;await compare();
  }catch{if(turn===sequence)status.textContent=t('This image could not be read. Save it as JPG, PNG or WebP and try again.');}
 });
 retry.addEventListener('click',compare);
 window.addEventListener('pagehide',()=>{stop();if(objectUrl)URL.revokeObjectURL(objectUrl);});
}
