const config=JSON.parse(document.getElementById('page-config').textContent),{lang,t,x,product}=config;
const filters=document.querySelector('.filters');if(filters){const mq=matchMedia('(min-width:761px)');filters.open=mq.matches;mq.addEventListener('change',e=>filters.open=e.matches)}
const language=document.getElementById('language');if(language)language.onchange=e=>location.href=e.target.value;
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('mainphoto').src=b.dataset.photo}));
const currency=document.getElementById('currency');let rates=null;let selectedCurrency=localStorage.getItem('itaobuy-currency')||'USD';if(![...currency.options].some(o=>o.value===selectedCurrency))selectedCurrency='USD';currency.value=selectedCurrency;
function updatePrices(){const label=document.querySelector('.price-source');if(label)label.textContent=t.price.replace('USD',rates?.rates[selectedCurrency]?selectedCurrency:'USD');document.querySelectorAll('[data-usd]').forEach(e=>{const code=rates?.rates[selectedCurrency]?selectedCurrency:'USD';e.textContent=new Intl.NumberFormat(lang,{style:'currency',currency:code}).format(Number(e.dataset.usd)*(rates?.rates[code]||1));});}
async function initRates(){try{const cached=JSON.parse(localStorage.getItem('itaobuy-rates')||'null');if(cached&&Date.now()-cached.cached<86400000)rates=cached;else{const res=await fetch('/api/rates');if(!res.ok)throw Error();const data=await res.json();if(data.result!=='success'||!data.rates.EUR)throw Error();rates={rates:data.rates,date:data.time_last_update_utc,cached:Date.now()};localStorage.setItem('itaobuy-rates',JSON.stringify(rates));}document.getElementById('fxstatus').textContent=x.fxDate+': '+new Date(rates.date).toLocaleString(lang);updatePrices()}catch{rates=null;currency.value='USD';selectedCurrency='USD';currency.disabled=true;document.getElementById('fxstatus').textContent=x.fxError;updatePrices()}}
currency.onchange=()=>{selectedCurrency=currency.value;localStorage.setItem('itaobuy-currency',selectedCurrency);updatePrices()};initRates();
async function copy(text,button){try{await navigator.clipboard.writeText(text);const old=button.textContent;button.textContent=t.copied;setTimeout(()=>button.textContent=old,1800)}catch{prompt(t.copy,text)}}
if(product){let style='',size='',selectedSku=null;const copyButton=document.getElementById('copyStyle');function choose(){document.querySelectorAll('[data-style]').forEach(b=>b.classList.toggle('active',b.dataset.style===style));document.querySelectorAll('[data-size]').forEach(b=>b.classList.toggle('active',b.dataset.size===size));const candidates=product.skus.filter(s=>(!style||s.attrs.includes(style))&&(!size||s.attrs.includes(size)));selectedSku=style&&(!product.sizes.length||size)&&candidates.length===1?candidates[0]:null;const styleName=product.styles.find(s=>s.id===style)?.name||'';document.getElementById('selectedstyle').textContent=styleName;const status=document.getElementById('skuSelection');if(status)status.textContent=selectedSku?'SKU '+selectedSku.id+' · '+selectedSku.name.replace(/女款/g,x.genders[0]).replace(/男款/g,x.genders[1]):style?x.selectSize:x.selectStyle;}
document.querySelectorAll('[data-style]').forEach(b=>b.addEventListener('click',()=>{style=b.dataset.style;size='';choose()}));document.querySelectorAll('[data-size]').forEach(b=>b.addEventListener('click',()=>{size=b.dataset.size;choose()}));copyButton.onclick=()=>{if(product.styles.length&&!selectedSku){document.getElementById('skuSelection').textContent=!style?x.selectStyle:x.selectSize;document.getElementById('skuSelection').scrollIntoView({block:'nearest'});return}let url=copyButton.dataset.original;if(selectedSku)url+=(url.includes('?')?'&':'?')+'sku='+encodeURIComponent(selectedSku.id);copy(url,copyButton)};}

const styleGrid=document.querySelector('.styles');
if(styleGrid){
 let drag, suppressClick=false;
 styleGrid.addEventListener('pointerdown',event=>{
   if(event.pointerType==='mouse'&&event.button===0){
     drag={id:event.pointerId,y:event.clientY,top:styleGrid.scrollTop};suppressClick=false;
   }
 });
 styleGrid.addEventListener('dragstart',event=>event.preventDefault());
 styleGrid.addEventListener('pointermove',event=>{
   if(!drag||drag.id!==event.pointerId||!event.buttons)return;
   const offset=event.clientY-drag.y;
   if(Math.abs(offset)>5||suppressClick){
     suppressClick=true;styleGrid.setPointerCapture(event.pointerId);styleGrid.scrollTop=drag.top-offset;
   }
 });
 window.addEventListener('pointerup',()=>{drag=null});
 styleGrid.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false}},true);
}
