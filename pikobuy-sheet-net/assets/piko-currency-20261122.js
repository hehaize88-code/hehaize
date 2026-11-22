// Prices in the source catalogue are USD. Keep this value when switching currencies repeatedly.
(() => {
 const picker = document.querySelector('[data-piko-currency]');
 if (!picker) return;
 const locale = document.documentElement.lang;
 let rates = {USD:1};
 let saved;
 try {saved = JSON.parse(localStorage.getItem('piko-rates-v1'));} catch {}
 if (saved?.rates?.USD === 1) rates = saved.rates;
 if(saved?.date)picker.title=saved.date;
 let preferred;
 try {preferred = localStorage.getItem('piko-currency');} catch {}
 const format = (price, currency) => new Intl.NumberFormat(locale,{style:'currency',currency}).format(price*rates[currency]);
 function render() {
   const currency = picker.value;
   if (!rates[currency]) return;
   for (const node of document.querySelectorAll('[data-usd],.card-meta strong,.detail-price')) {
     let raw = node.dataset.usd;
     if (!raw) {
       const amount = node.textContent.trim().match(/^\$\s*([\d,]+(?:\.\d+)?)/);
       if (!amount) continue;
       raw = node.dataset.usd = amount[1].replaceAll(',','');
     }
     if (!Number.isFinite(+raw)) continue;
     const cny=node.dataset.cny;
     const value = cny && Number.isFinite(+cny) ? (rates.CNY ? format(+cny/rates.CNY,currency) : new Intl.NumberFormat(locale,{style:'currency',currency:'CNY'}).format(+cny)) : format(+raw,currency);
     if (node.textContent !== value) node.textContent = value;
     const note = node.closest('.card-meta')?.querySelector('span');
     if (note && /\b[A-Z]{3}\b/.test(note.textContent)) {
       const label = note.textContent.replace(/\b[A-Z]{3}\b/,currency);
       if (note.textContent !== label) note.textContent = label;
     }
   }
 }
 function sync() {
   for(const option of picker.options) option.disabled = !rates[option.value];
   picker.value = rates[preferred] ? preferred : 'USD';
   render();
 }
 picker.addEventListener('change',()=>{preferred=picker.value;try{localStorage.setItem('piko-currency',preferred)}catch{}render()});
 document.addEventListener('piko:price',render);
 new MutationObserver(records=>{if(records.some(r=>Array.from(r.addedNodes).some(n=>n.nodeType===1))) render()}).observe(document.body,{childList:true,subtree:true});
 sync();
 if (!saved || Date.now()-saved.time>12*3600000) fetch('/api/exchange-rates').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
   if(data.rates?.USD!==1) return;
   rates=data.rates;picker.title=data.date;try{localStorage.setItem('piko-rates-v1',JSON.stringify({time:Date.now(),rates,date:data.date}))}catch{}sync();
 }).catch(()=>{});
})();
