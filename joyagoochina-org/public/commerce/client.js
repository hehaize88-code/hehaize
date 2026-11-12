import {PRODUCT_UI} from './ui.js';
const localeCodes=["en", "zh", "de", "pl", "es", "it", "fr", "pt", "ro", "sv"];
const htmlLocale=code=>code==='zh'?'zh-CN':code;
const loadDictionary=async code=>PRODUCT_UI[code]||{};

const pathLocale = document.documentElement.lang.toLowerCase().replace('zh-cn','zh');
const locale = localeCodes.includes(pathLocale) ? pathLocale : 'en';
const dictionary = await loadDictionary(locale);
const t = value => dictionary[value] || value;
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let rates = null, ratePromise = null;
const currencySelects = [...document.querySelectorAll('[data-currency-select]')];
let currency = 'USD';
try { const saved = localStorage.getItem('joyagoo-currency'); if(/^[A-Z]{3}$/.test(saved||'')&&currencySelects[0]?.querySelector(`option[value="${saved}"]`))currency = saved; } catch {}
const formatPrice = (value, code) => new Intl.NumberFormat(htmlLocale(locale), {style:'currency', currency:code}).format(value);
function setRateStatus(error = false) {
 const targetDate = rates?.dates[currency] || rates?.dates.CNY;
 document.querySelectorAll('[data-rate-status]').forEach(node => {
  node.textContent = error ? t('Exchange rates are temporarily unavailable. Prices remain in their original currency.') : targetDate ? `${t('Reference rates')}: Frankfurter · ${t('Rate date')}: ${targetDate}` : '';
 });
}
function renderPrices() {
 for (const node of document.querySelectorAll('[data-price-amount]')) {
  const amount = Number(node.dataset.priceAmount), original = node.dataset.priceCurrency || 'USD';
  if (node.dataset.priceAmount === '' || !Number.isFinite(amount) || amount < 0) continue;
  let code = original, converted = amount;
  if (original === currency || rates?.rates[original] && rates?.rates[currency]) {
   code = currency; converted = original === currency ? amount : amount / rates.rates[original] * rates.rates[currency];
  }
  const formatted = (node.dataset.priceFrom==='true'?t('From')+' ':'') + formatPrice(converted, code);
  if (node.textContent !== formatted) node.textContent = formatted;
  node.dataset.displayCurrency = code;
  node.title = `${t('Reference price')}: ${formatPrice(amount, original)}`;
  const codeNode = node.closest('.card-meta,.detail-price,.live-product-price,.seo-live-card strong')?.querySelector('[data-currency-code]');
  if (codeNode && codeNode.textContent !== code) codeNode.textContent = code;
 }
}
async function getRates() {
 if (ratePromise) return ratePromise;
 ratePromise = (async () => {
  try {
   const saved = JSON.parse(localStorage.getItem('joyagoo-reference-rates') || 'null');
   if (saved?.fetched > Date.now()-6*3600000 && saved?.data?.rates?.CNY && saved.data.rates.EUR) return saved.data;
  } catch {}
  const response = await fetch('/api/exchange-rates', {signal:AbortSignal.timeout(12000)});
  if (!response.ok) throw Error('rates');
  const value = await response.json();
  if(value.base!=='USD'||!value.rates?.CNY||!value.rates?.EUR)throw Error('rates');
  try {localStorage.setItem('joyagoo-reference-rates', JSON.stringify({fetched:Date.now(),data:value}));}catch{}
  return value;
 })().then(value=>{rates=value;renderPrices();setRateStatus();return value;}).catch(error=>{ratePromise=null;setRateStatus(true);throw error;});
 return ratePromise;
}
for(const select of currencySelects) {
 select.value=currency;
 select.addEventListener('change', async()=>{
  currency=select.value;currencySelects.forEach(other=>other.value=currency);
  try{localStorage.setItem('joyagoo-currency',currency);}catch{}
  renderPrices();
  try{await getRates();}catch{}
 });
}
renderPrices();getRates().catch(()=>{});
let scheduled=false;
new MutationObserver(records=>{
 if(!records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1&&(node.matches?.('[data-price-amount]')||node.querySelector?.('[data-price-amount]')))))return;
 if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;renderPrices();});}
}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('joyagoo:prices',renderPrices);

const detail = document.querySelector('[data-product-detail]');
if(detail) initDetail();
function initDetail(){
 const main = document.getElementById('gallery-main'), originalImages=[...document.querySelectorAll('[data-gallery-index] img')].map(img=>img.src);
 const viewer=document.querySelector('.photo-viewer'),viewerImage=viewer.querySelector('img');
 const selected = new Map();
 let options=null,styleGroup=-1,images=[...originalImages],current=0,viewerImages=[],viewerIndex=0,loading=false;
 const status=detail.querySelector('[data-options-status]'),grid=detail.querySelector('[data-style-grid]'),groups=detail.querySelector('[data-option-groups]'),retry=detail.querySelector('[data-options-retry]');
 const price=detail.querySelector('[data-detail-price]'),initialPrice=price.dataset.priceAmount,initialCurrency=price.dataset.priceCurrency;
 const selectionNote=detail.querySelector('[data-selected-option]'),copy=detail.querySelector('[data-copy-source]'),copyStatus=detail.querySelector('[data-copy-status]');
 const prev=detail.querySelector('[data-gallery-prev]'),next=detail.querySelector('[data-gallery-next]'),counter=detail.querySelector('.gallery-counter');
 const styleStatus=detail.querySelector('[data-style-count]');
 main.referrerPolicy='no-referrer';viewerImage.referrerPolicy='no-referrer';
 const optionLabel=value=>/^(conventional standard|one size|均码|均碼)$/i.test(value.trim())?t('One size'):t(value.trim()).replace(/\bWomen['’]s style|女款/gi,t('Women’s style')).replace(/\bMen['’]s style|男款/gi,t('Men’s style'));
 const imageDisplay=url=>{const parsed=new URL(url);if(/(^|\.)geilicdn\.com$/.test(parsed.hostname)&&/\.(?:jpe?g|png)$/i.test(parsed.pathname)){parsed.pathname+='.webp';parsed.search='?w=1200&h=1200';}return parsed.href;};
 const photo=(url)=>{try{const parsed=new URL(url);return parsed.protocol==='https:'?parsed.href:'';}catch{return '';}};
 function showPhoto(index){
  if(!images.length){main.hidden=true;counter.textContent=t('Photo unavailable');prev.disabled=next.disabled=true;return;}
  current=Math.max(0,Math.min(index,images.length-1));main.hidden=false;main.src=imageDisplay(images[current]);counter.textContent=`${current+1} / ${images.length}`;
  prev.disabled=current===0;next.disabled=current===images.length-1;
  detail.querySelectorAll('[data-gallery-index]').forEach((button,i)=>button.setAttribute('aria-current',String(images===originalImages&&i===current||images[current]===originalImages[i])));
 }
 detail.querySelectorAll('[data-gallery-index]').forEach((button,i)=>button.addEventListener('click',()=>{images=originalImages;showPhoto(i);}));
 prev.addEventListener('click',()=>showPhoto(current-1));next.addEventListener('click',()=>showPhoto(current+1));
 detail.querySelector('.gallery-main').addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showPhoto(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(current-1);}});
 let touchX=null;main.addEventListener('touchstart',e=>touchX=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(touchX!==null&&Math.abs(e.changedTouches[0].clientX-touchX)>40)showPhoto(current+(e.changedTouches[0].clientX<touchX?1:-1));touchX=null;},{passive:true});
 main.addEventListener('error',()=>{main.hidden=true;counter.textContent=t('Photo unavailable');});
 function renderViewer(){viewerImage.src=imageDisplay(viewerImages[viewerIndex]);viewer.querySelector('[data-viewer-counter]').textContent=`${viewerIndex+1} / ${viewerImages.length}`;viewer.querySelector('[data-viewer-prev]').disabled=viewerIndex===0;viewer.querySelector('[data-viewer-next]').disabled=viewerIndex===viewerImages.length-1;}
 function openViewer(list,index=0){viewerImages=list.filter(Boolean);if(!viewerImages.length)return;viewerIndex=Math.max(0,Math.min(index,viewerImages.length-1));renderViewer();viewer.showModal();}
 detail.querySelector('[data-enlarge]').addEventListener('click',()=>openViewer(images,current));main.addEventListener('click',()=>openViewer(images,current));
 const photoTiles=[...document.querySelectorAll('[data-photo-src]')];photoTiles.forEach((button,i)=>button.addEventListener('click',()=>openViewer(photoTiles.map(x=>x.dataset.photoSrc),i)));
 viewer.querySelector('[data-close-viewer]').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
 viewer.querySelector('[data-viewer-prev]').addEventListener('click',()=>{viewerIndex=Math.max(0,viewerIndex-1);renderViewer();});viewer.querySelector('[data-viewer-next]').addEventListener('click',()=>{viewerIndex=Math.min(viewerImages.length-1,viewerIndex+1);renderViewer();});
 viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){viewerIndex=Math.max(0,viewerIndex-1);renderViewer();}if(event.key==='ArrowRight'){viewerIndex=Math.min(viewerImages.length-1,viewerIndex+1);renderViewer();}});
 function selectionLabels(){return options.groups.map((group,index)=>group.values.find(value=>value.id===selected.get(index))?.label).filter(Boolean).map(optionLabel);}
 function matchingVariants(){return options.variants.filter(variant=>[...selected.values()].every(id=>variant.attrs.includes(id)));}
 function activeVariant(){return selected.size===options.groups.length?matchingVariants()[0]:null;}
 function updateSelection(){
  copyStatus.textContent='';
  for(const button of grid.querySelectorAll('[data-style]'))button.setAttribute('aria-pressed',String(selected.get(styleGroup)===button.dataset.style));
  const matching=matchingVariants(),available=matching.filter(value=>value.available),variant=activeVariant();
  for(const select of groups.querySelectorAll('select')){
   const groupIndex=Number(select.dataset.optionGroup);
   for(const option of select.options){if(!option.value)continue;option.disabled=!options.variants.some(v=>v.available&&v.attrs.includes(option.value)&&[...selected.entries()].every(([key,id])=>key===groupIndex||v.attrs.includes(id)));}
  }
  const prices=(available.length?available:matching).map(value=>value.price).filter(Number.isFinite);
  if(selected.size&&prices.length){price.dataset.priceAmount=String(Math.min(...prices));price.dataset.priceCurrency='CNY';}
  else if(selected.size){price.dataset.priceAmount='';price.textContent='—';}
  else{price.dataset.priceAmount=initialPrice;price.dataset.priceCurrency=initialCurrency;}
  price.dataset.priceFrom=String(selected.size>0&&new Set(prices).size>1);
  renderPrices();
  const sourcePrice=detail.querySelector('[data-source-price]');if(sourcePrice)sourcePrice.textContent=selected.size&&prices.length?`${t('Reference price')}: ${formatPrice(Math.min(...prices),'CNY')}${prices.some(value=>value!==prices[0])?' – '+formatPrice(Math.max(...prices),'CNY'):''}`:'';
  selectionNote.textContent=selected.size?`${t('Selected option')}: ${selectionLabels().join(' · ')}${variant?' · '+t('SKU')+': '+variant.id:''}${matching.length&&!available.length?' · '+t('Out of stock'):''}${!matching.length?' · '+t('This combination is unavailable. Choose another option.'):''}`:t('Select a style and size to see its source price.');
  copy.textContent=selected.size?t('Copy link and selected option'):t('Copy Weidian link');
  // Share selection on this site; never invent a Weidian SKU URL parameter.
  const url=new URL(location.href);url.searchParams.delete('style');url.searchParams.delete('option');
  if(selected.has(styleGroup))url.searchParams.set('style',selected.get(styleGroup));
  if(variant)url.searchParams.set('option',variant.id);
  history.replaceState(null,'',url.pathname+url.search+url.hash);
  document.querySelectorAll('.catalog-languages a').forEach(link=>{const next=new URL(link.href);next.search=url.search;link.href=next.href;});
 }
 function chooseStyle(id){
  selected.set(styleGroup,id);
  const value=options.groups[styleGroup].values.find(value=>value.id===id);if(value?.image){images=[value.image];showPhoto(0);}
  updateSelection();
 }
 async function loadOptions(){
  if(loading)return;loading=true;retry.hidden=true;status.hidden=false;status.textContent=t('Loading styles…');
  try{
   const response=await fetch('/api/product-options?'+new URLSearchParams({id:detail.dataset.sourceId}),{signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw Error('options');const data=await response.json();
   if(data.sourceId!==detail.dataset.sourceId||!Array.isArray(data.groups)||!Array.isArray(data.variants))throw Error('identity');
   options=data;styleGroup=options.groups.findIndex(group=>group.values.some(value=>photo(value.image)));
   const count=styleGroup>=0?options.groups[styleGroup].values.length:0;styleStatus.textContent=count?String(count):'';
   grid.replaceChildren();groups.replaceChildren();selected.clear();
   if(styleGroup>=0){
    grid.innerHTML=options.groups[styleGroup].values.map(value=>`<button type="button" data-style="${esc(value.id)}" aria-pressed="false" aria-label="${esc(t('Style')+': '+optionLabel(value.label))}" title="${esc(value.label)}">${photo(value.image)?`<img referrerpolicy="no-referrer" src="${esc(imageDisplay(value.image))}" alt="" width="80" height="80" loading="lazy">`:''}<span>${esc(optionLabel(value.label))}</span></button>`).join('');
    grid.querySelectorAll('[data-style]').forEach(button=>button.addEventListener('click',()=>chooseStyle(button.dataset.style)));
   }
   options.groups.forEach((group,index)=>{
    if(index===styleGroup)return;
    const label=document.createElement('label');label.className='option-group';const title=document.createElement('span');title.textContent=t(/size|尺码|尺寸|码数/i.test(group.name)?'Size':group.name)||t('Available options');label.append(title);
    const select=document.createElement('select');select.dataset.optionGroup=String(index);select.setAttribute('aria-label',title.textContent);
    select.innerHTML=`<option value="">${esc(t(/size|尺码|尺寸|码数/i.test(group.name)?'Select a size':'Available options'))}</option>`+group.values.map(value=>`<option value="${esc(value.id)}">${esc(optionLabel(value.label))}</option>`).join('');
    select.addEventListener('change',()=>{if(select.value)selected.set(index,select.value);else selected.delete(index);updateSelection();});label.append(select);groups.append(label);
   });
   status.textContent=options.groups.length?'':t('No selectable styles are provided for this product.');status.hidden=!!options.groups.length;
   const params=new URL(location.href).searchParams,savedVariant=options.variants.find(variant=>variant.id===params.get('option'));
   if(savedVariant){options.groups.forEach((group,index)=>{const value=group.values.find(value=>savedVariant.attrs.includes(value.id));if(value)selected.set(index,value.id);});}
   else if(styleGroup>=0&&options.groups[styleGroup].values.some(value=>value.id===params.get('style')))selected.set(styleGroup,params.get('style'));
   groups.querySelectorAll('select').forEach(select=>select.value=selected.get(Number(select.dataset.optionGroup))||'');
   if(selected.has(styleGroup))chooseStyle(selected.get(styleGroup));else updateSelection();
  }catch{status.textContent=t('Styles could not be loaded. Open the original listing to check the available options.');retry.hidden=false;}
  finally{loading=false;}
 }
 retry.addEventListener('click',loadOptions);
 copy.addEventListener('click',async()=>{
  let value=detail.dataset.sourceUrl;
  if(options&&selected.size){value+='\n'+t('Selected option')+': '+selectionLabels().join(' · ');const variant=activeVariant();if(variant)value+='\nSKU: '+variant.id;}
  try{await navigator.clipboard.writeText(value);copyStatus.textContent=t('Copied')+(selected.size?' · '+t('The original link opens the product. The copied style, size and SKU help you select the same option there.'):'');}
  catch{const fallback=detail.querySelector('[data-copy-fallback]');fallback.hidden=false;fallback.value=value;fallback.focus();fallback.select();copyStatus.textContent=t('Copy failed. Select and copy the link below.');}
 });
 const agentQuery=detail.querySelector('#agent-query');agentQuery.addEventListener('input',()=>{let count=0;detail.querySelectorAll('[data-agent]').forEach(link=>{link.hidden=!link.dataset.agent.includes(agentQuery.value.trim().toLowerCase());if(!link.hidden)count++;});detail.querySelector('[data-no-agents]').hidden=count>0;});
 const initialPhoto=Number(new URL(location.href).searchParams.get('photo')||1);
 showPhoto(Number.isSafeInteger(initialPhoto)&&initialPhoto>0?initialPhoto-1:0);loadOptions();
}

const styleGrid=document.querySelector('[data-style-grid]');
if(styleGrid){let drag=null,suppress=false;styleGrid.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0)drag={y:e.clientY,top:styleGrid.scrollTop,moved:false};});window.addEventListener('pointermove',e=>{if(drag&&Math.abs(e.clientY-drag.y)>5){drag.moved=true;styleGrid.scrollTop=drag.top+drag.y-e.clientY;styleGrid.classList.add('is-dragging');}});window.addEventListener('pointerup',()=>{if(drag?.moved){suppress=true;setTimeout(()=>suppress=false,0);}drag=null;styleGrid.classList.remove('is-dragging');});styleGrid.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();}},true);styleGrid.addEventListener('dragstart',e=>e.preventDefault());}
