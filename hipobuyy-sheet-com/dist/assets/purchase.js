(() => {
  const container = document.querySelector('.purchase-layout');
  if (container) {
    const copy = container.querySelector('[data-copy-source]');
    const selector = container.querySelector('[data-sku]');
    const choose = container.querySelector('[data-sku-label]');
    const status = container.querySelector('[data-copy-status]');
    let selected = false;
    function updateCopy() {
      copy.disabled = selected && !selector.value;
      copy.textContent = !selected ? copy.dataset.i18nItem : selector.value ? copy.dataset.i18nStyle :
        selector.options.length > 1 ? copy.dataset.i18nOption : copy.dataset.i18nUnavailable;
      status.textContent = '';
    }
    container.addEventListener('click', event => {
      const button = event.target.closest('button[data-style]');
      if (!button) return;
      container.querySelector('[aria-pressed="true"]')?.setAttribute('aria-pressed','false');
      button.setAttribute('aria-pressed','true');
      const img = button.querySelector('img'), photo = container.querySelector('#purchase-photo');
      photo.src = img.src;
      photo.alt = img.alt;
      container.querySelector('[data-selection]').textContent = button.getAttribute('aria-label');
      selector.replaceChildren(new Option(copy.dataset.i18nOption,''));
      const choices = container.querySelector('template[data-choices="'+button.dataset.style+'"]');
      selector.append(choices.content.cloneNode(true));
      choose.hidden = selector.options.length <= 2;
      selector.selectedIndex = selector.options.length === 2 ? 1 : 0;
      selected = true;
      updateCopy();
    });
    selector?.addEventListener('change',updateCopy);
    copy?.addEventListener('click',async () => {
      // Weidian's mobile product component reads prevSelectSkuId from hash.split('_')[3].
      const url = copy.dataset.copySource + (selected && selector.value ? '#___'+selector.value : '');
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = copy.dataset.i18nSuccess;
      } catch {
        const input = document.createElement('input');
        input.readOnly = true;
        input.value = url;
        status.replaceChildren(input);
        input.select();
      }
    });
  }
  const currency = document.querySelector('[data-currency-select]');
  if (!currency) return;
  const error = document.querySelector('[data-fx-error]');
  const ratesKey = 'hipobuy-usd-rates-v1';
  function saved(k) { try { return localStorage.getItem(k); } catch { return null; } }
  function save(k,v) { try { localStorage.setItem(k,v); } catch {} }
  const preferenceKey = 'hipobuy-currency';
  const chosen = saved(preferenceKey);
  if (Array.from(currency.options).some(o=>o.value===chosen)) currency.value=chosen;
  let rates, request;
  try { rates = JSON.parse(saved(ratesKey)); } catch {}
  async function load() {
    if (rates?.next > Date.now()) return rates;
    if (!request) {
      request = fetch('https://open.er-api.com/v6/latest/USD',{signal:AbortSignal.timeout(8000)})
        .then(async r=>{
          if (!r.ok) throw Error('Exchange rates unavailable');
          const d=await r.json();
          if (d.base_code !== 'USD' || d.rates?.USD !== 1 || !d.time_last_update_unix) throw Error('Invalid rates');
          rates = {values:d.rates, date:d.time_last_update_unix*1000, next:d.time_next_update_unix*1000};
          save(ratesKey,JSON.stringify(rates));
          return rates;
        }).catch(err=>{
          if (rates?.date > Date.now()-7*86400000) return rates;
          throw err;
        }).finally(()=>{request=null;});
    }
    return request;
  }
  function render(code,rate) {
    const format = new Intl.NumberFormat(document.documentElement.lang || 'en',{style:'currency',currency:code});
    document.querySelectorAll('[data-usd]').forEach(node=>{
      const usd = parseFloat(node.dataset.usd);
      if (Number.isFinite(usd)) node.textContent = format.format(usd*rate);
    });
  }
  async function update() {
    const code=currency.value;
    if (error) error.hidden=true;
    if (code==='USD') {render(code,1);return;}
    try {
      const data=await load(), rate=data.values[code];
      if (!(rate>0)) throw Error('Missing currency');
      if (currency.value===code) render(code,rate);
    } catch {
      if (currency.value!==code) return;
      currency.value='USD'; render('USD',1);
      if (error) error.hidden=false;
    }
  }
  currency.addEventListener('change',()=>{ save(preferenceKey,currency.value); update(); });
  for (const id of ['hipo-live-products','image-results']) {
    const grid=document.getElementById(id);
    if (grid) new MutationObserver(update).observe(grid,{childList:true});
  }
  update();
})();
