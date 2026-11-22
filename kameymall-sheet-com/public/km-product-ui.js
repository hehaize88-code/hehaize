(function productClient() {
  const panel = document.querySelector('[data-km-product]');
  if (!panel) return;
  const model = JSON.parse(document.getElementById('km-data').textContent);
  const get = id => document.getElementById(id);
  const hero = get('km-hero'), price = get('km-price'), currency = get('km-currency'), copy = get('km-copy');
  const status = get('km-status'), label = get('km-selection'), buttons = [...panel.querySelectorAll('[data-km-choice]')];
  const menus = [...panel.querySelectorAll('[data-km-group]')];
  const groups = model.groupIds, selected = groups.map(ids => ids.length === 1 ? ids[0] : '');
  const variants = model.variants.map(([id, ids, cny, stock]) => ({id, attrs: String(ids).split('-'), cny: Number(cny), stock: Number(stock)}));
  const q = new URLSearchParams(location.search), source = new URL('https://weidian.com/item.html');
  source.searchParams.set('itemID',model.id);
  let value = model.cny, rates = model.rates, active, currentSource = source.href;
  function formatPrice() {
    let code = currency.value;
    if (!(rates[code] > 0)) code = 'CNY';
    price.textContent = new Intl.NumberFormat(document.documentElement.lang || 'en', {style:'currency',currency:code}).format(value*rates[code]);
  }
  function choiceLabel(id) {
    const button = buttons.find(b=>b.dataset.kmChoice===id);
    if (button) return button.title || button.textContent.trim();
    for (const menu of menus) {
      const option = [...menu.options].find(o=>o.value===id);
      if (option) return option.textContent;
    }
    return '';
  }
  function sync() {
    for (let g=0;g<groups.length;g++) {
      if (!selected[g]) continue;
      const choice=buttons.find(b=>b.dataset.kmChoice===selected[g]);
      if(choice?.dataset.image) hero.src=choice.dataset.image;
    }
    for(const b of buttons) b.setAttribute('aria-pressed',String(selected[Number(b.dataset.group)]===b.dataset.kmChoice));
    for(const menu of menus)menu.value=selected[Number(menu.dataset.kmGroup)]||'';
    const available=variants.filter(v=>selected.every(id=>!id||v.attrs.includes(id)));
    active=selected.every(Boolean)&&available.length===1?available[0]:null;
    const prices=available.filter(v=>Number.isFinite(v.cny)&&v.cny>0).map(v=>v.cny);
    value=active?.cny>0?active.cny:prices.length&&selected.some(Boolean)?Math.min(...prices):model.cny;
    formatPrice();
    label.textContent=selected.filter(Boolean).map(choiceLabel).join(' · ');
    const original=new URL(source);
    if(active)original.searchParams.set('skuId',active.id);
    currentSource=original.href;
    const partial=selected.some(Boolean)&&!active;
    copy.disabled=partial;
    const msg=partial?(available.length?'km-need':'km-invalid'):'';
    status.textContent=msg?get(msg).textContent:'';
    get('km-copy-label').textContent=get(active?'km-sku-label':'km-base-label').textContent;
    for (const link of panel.querySelectorAll('[data-wrap]')) {
      const url=new URL(link.href);url.searchParams.set(link.dataset.wrap,currentSource);link.href=url.href;
    }
  }
  function choose(group,id) {
    selected[group]=id;
    sync();
    const url = new URL(location.href);
    const styleButton=buttons.find(b=>b.dataset.kmChoice===id&&b.dataset.image);
    if(styleButton)url.searchParams.set('style',id);
    if(active)url.searchParams.set('sku',active.id);else url.searchParams.delete('sku');
    url.searchParams.delete('photo');history.replaceState(null,'',url.href);
  }
  for(const b of buttons)b.addEventListener('click',()=>choose(Number(b.dataset.group),b.dataset.kmChoice));
  for(const menu of menus)menu.addEventListener('change',()=>choose(Number(menu.dataset.kmGroup),menu.value));
  for(const b of panel.querySelectorAll('[data-km-photo]'))b.addEventListener('click',()=>{hero.src=b.dataset.kmPhoto;hero.alt=b.querySelector('img')?.alt||'';get('km-zoom-img').src=hero.src;panel.querySelector('dialog').showModal();});
  copy.addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(currentSource);status.textContent=get('km-copied').textContent;}
    catch {const field=get('km-manual');field.hidden=false;field.value=currentSource;field.focus();field.select();}
  });
  const sku=variants.find(v=>v.id===q.get('sku'));
  for(let g=0;g<groups.length;g++){
    const v=sku?.attrs.find(id=>groups[g].includes(id))||q.get('style');
    if(v&&groups[g].includes(v))selected[g]=v;
  }
  try {const saved=localStorage.getItem('km-currency');if(rates[saved]&&[...currency.options].some(o=>o.value===saved))currency.value=saved;}catch{}
  currency.addEventListener('change',()=>{try{localStorage.setItem('km-currency',currency.value);}catch{}formatPrice();window.dispatchEvent(new CustomEvent('km-currency-change',{detail:currency.value}));});
  window.addEventListener('km-currency-change',e=>{if(rates[e.detail]&&currency.value!==e.detail){currency.value=e.detail;formatPrice();}});
  sync();
  const requested=q.get('photo');
  if(requested&&[model.cover,...Array.from(panel.querySelectorAll('[data-km-photo]'),el=>el.dataset.kmPhoto)].includes(requested))hero.src=requested;
  const dialogs=panel.querySelector('dialog');
  get('km-zoom').addEventListener('click',()=>{get('km-zoom-img').src=hero.currentSrc||hero.src;dialogs.showModal();});
  get('km-close').addEventListener('click',()=>dialogs.close());
  dialogs.addEventListener('click',e=>{if(e.target===dialogs)dialogs.close();});
  fetch('/kamey-product/rates').then(r=>r.ok?r.json():null).then(r=>{if(r?.rates?.USD){rates=r.rates;formatPrice();get('km-rate-date').textContent=r.asOf.slice(0,10);}}).catch(()=>{});
})();
