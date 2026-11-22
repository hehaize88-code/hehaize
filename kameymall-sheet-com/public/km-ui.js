(() => {
  const selector = document.querySelector('.km-currency');
  const source = document.querySelector('#km-cny');
  if (!selector || !source) return;
  const prices = JSON.parse(source.textContent);
  const rows = [...document.querySelectorAll('.product-row,.catalog-product-card')];
  function selectCurrency(currency, rate) {
    const formatter = new Intl.NumberFormat(document.documentElement.lang || 'en', {style:'currency',currency});
    for(const row of rows) {
      const id = row.querySelector('code')?.textContent.match(/KMS-(\d+)/)?.[1];
      const price = row.querySelector('.price-cell strong,.catalog-product-meta strong');
      if(id && price && Number.isFinite(prices[id])) price.textContent = formatter.format(prices[id] * rate);
    }
  }
  const preferred = localStorage.getItem('km-currency') || 'USD';
  let rates = { CNY: 1 };
  function update(currency) {
    const available = Number.isFinite(rates[currency]) && rates[currency] > 0;
    selector.value = available ? currency : 'CNY';
    selectCurrency(selector.value, rates[selector.value]);
  }
  update('CNY');
  selector.disabled = true;
  fetch('/kamey-product/rates').then(r=>r.ok?r.json():null).then(data=>{
    if(data?.rates) {
      rates={...data.rates,CNY:1};
      const date = document.getElementById('km-rate-asof');
      if(date && data.asOf) date.textContent=data.asOf;
    }
  }).catch(()=>{}).finally(()=>{
    for(const option of selector.options) option.disabled = !(rates[option.value]>0);
    selector.disabled=false;
    update(preferred);
  });
  selector.addEventListener('change',()=>{localStorage.setItem('km-currency',selector.value);update(selector.value);});
})();
