const cssBuyLogo = 'https://assets.cssbuy.com/static/icon/logo.svg';
const cssBuyIcon = 'https://assets.cssbuy.com/icon/css_192.png';

export const brandIcon = '<link rel="icon" type="image/png" sizes="192x192" href="' + cssBuyIcon + '"><link rel="apple-touch-icon" href="' + cssBuyIcon + '">';
export function brandLogo(lang) {
  const code = /^[a-z]{2}(?:-[A-Za-z]{2})?$/.test(lang) ? lang : 'en';
  return '<a class="logo" href="/' + code + '/"><img src="' + cssBuyLogo + '" alt="CSSBuy" style="display:block;width:118px;max-width:24vw;height:38px;object-fit:contain;object-position:left center"></a>';
}
const fxCurrencies = 'USD AUD BRL CAD CHF CNY CZK DKK EUR GBP HKD HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON SEK SGD THB TRY TWD ZAR'.split(' ');
const fxSeed = {"date":"Sun, 22 Nov 2026 00:02:32 +0000","rates":{"USD":1,"AUD":1.507035,"BRL":5.937879,"CAD":1.433441,"CHF":0.840341,"CNY":6.693346,"CZK":22.291402,"DKK":6.805787,"EUR":0.911256,"GBP":0.763601,"HKD":7.838737,"HUF":340.052586,"IDR":18291.407129,"ILS":3.346289,"INR":92.889095,"ISK":124.934687,"JPY":158.747474,"KRW":1343.330639,"MXN":19.123957,"MYR":4.112786,"NOK":9.768265,"NZD":1.824946,"PHP":63.984688,"PLN":4.059578,"RON":4.871523,"SEK":10.219547,"SGD":1.289578,"THB":33.918378,"TRY":50.602045,"TWD":32.980334,"ZAR":17.529792}};
let fxLast = fxSeed;
let fxRefreshAt = 0;
let fxPending;
function fxValid(rates) {
  return rates?.USD === 1 && fxCurrencies.every(code => Number.isFinite(rates[code]) && rates[code] > 0);
}
async function fetchFxRates() {
  const now = Date.now();
  if (now < fxRefreshAt) return fxLast;
  if (fxPending) return fxPending;
  fxPending = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      const url = 'https://open.er-api.com/v6/latest/USD';
      const response = await fetch(url, {signal: controller.signal, cf: {cacheEverything: true, cacheTtlByStatus: {'200-299': 3600, '400-599': 0}}});
      if (!response.ok) throw new Error('Rate service unavailable');
      const data = await response.json();
      const date = Date.parse(data.time_last_update_utc);
      if (data.base_code !== 'USD' || !fxValid(data.rates) || !Number.isFinite(date) || date < Date.parse(fxLast.date)) throw new Error('Invalid rate response');
      fxLast = {date: new Date(date).toISOString(), rates: Object.fromEntries(fxCurrencies.map(code => [code, data.rates[code]]))};
      fxRefreshAt = now + 3600000;
    } catch {
      fxRefreshAt = now + 60000;
    } finally {
      clearTimeout(timeout);
      fxPending = undefined;
    }
    return fxLast;
  })();
  return fxPending;
}

function fxClient() {
  const select = document.querySelector('[data-currency-picker]');
  if (!select) return;
  const seed = JSON.parse(document.querySelector('#cssbuy-fx-seed').textContent);
  let current = seed;
  const get = key => {try {return localStorage.getItem(key);} catch {return null;}};
  const put = (key, value) => {try {localStorage.setItem(key, value);} catch {}};
  function valid(rateSet) {
    return rateSet?.rates?.USD === 1 && [...select.options].every(opt => Number.isFinite(rateSet.rates[opt.value]) && rateSet.rates[opt.value] > 0) && Date.parse(rateSet.date) >= Date.parse(current.date);
  }
  try {
    const cached = JSON.parse(get('cssbuy-lookbook-fx'));
    if (valid(cached)) current = cached;
  } catch {}
  const preferred = get('cssbuy-lookbook-currency');
  if ([...select.options].some(o => o.value === preferred)) select.value = preferred;
  function render() {
    const code = select.value;
    const locale = document.documentElement.lang || 'en';
    const format = new Intl.NumberFormat(locale, {style: 'currency', currency: code});
    const effectiveDate = new Date(current.date).toLocaleDateString(locale);
    for (const el of document.querySelectorAll('[data-usd],[data-sku-cny]')) {
      const cny = el.hasAttribute('data-sku-cny');
      const raw = cny ? el.dataset.skuCny : el.dataset.usd;
      if (raw === '' || !Number.isFinite(Number(raw))) continue;
      const usd = Number(raw) / (cny ? current.rates.CNY : 1);
      el.textContent = format.format(usd * current.rates[code]);
      el.title = (cny ? 'CNY' : 'USD') + ' → ' + code + ' · ' + effectiveDate;
    }
    select.title = 'ExchangeRate-API · ' + effectiveDate;
    document.documentElement.dataset.currency = code;
  }
  select.addEventListener('change', () => {put('cssbuy-lookbook-currency', select.value); render();});
  window.addEventListener('currency-refresh', render);
  render();
  async function refresh() {
    try {
      const response = await fetch('/exchange-rates.json');
      if (!response.ok) return;
      const fresh = await response.json();
      if (!valid(fresh)) return;
      current = fresh;
      put('cssbuy-lookbook-fx', JSON.stringify(fresh));
      render();
    } catch {}
  }
  refresh();
  setInterval(() => {if (!document.hidden) refresh();}, 3600000);
}
export function currencyPicker(lang) {
  const labels = {en:'Currency',zh:'货币',de:'Währung',es:'Moneda',fr:'Devise',it:'Valuta',pl:'Waluta',pt:'Moeda',ro:'Monedă',sv:'Valuta',nl:'Valuta',da:'Valuta',fi:'Valuutta',el:'Νόμισμα',cs:'Měna',hu:'Pénznem',bg:'Валута',sk:'Mena',hr:'Valuta',sl:'Valuta',lt:'Valiuta',lv:'Valūta',et:'Valuuta',ja:'通貨',ko:'통화',vi:'Tiền tệ',th:'สกุลเงิน',id:'Mata uang'};
  return '<select data-currency-picker aria-label="' + (labels[lang] || labels.en) + '">' + fxCurrencies.map(code => '<option value="' + code + '">' + code + '</option>').join('') + '</select>';
}
export function fxPrice(usd, lang) {
  if (usd == null || String(usd).trim() === '' || !Number.isFinite(Number(usd))) return '';
  const value = Number(usd);
  return '<span data-usd="' + value + '">' + new Intl.NumberFormat(lang, {style:'currency', currency:'USD'}).format(value) + '</span>';
}
export function fxScripts() {
  return '<script id="cssbuy-fx-seed" type="application/json">' + JSON.stringify(fxSeed) + '</script><script src="/currency.js" defer></script>';
}
export const fxCredit = '<a href="https://www.exchangerate-api.com/" target="_blank" rel="noopener" lang="en">ExchangeRate-API</a>';
export async function fxRoute(pathname) {
  if (pathname === '/exchange-rates.json') {
    const result = await fetchFxRates();
    return Response.json(result, {headers:{'Cache-Control':'public,max-age=60'}});
  }
  if (pathname === '/currency.js') return new Response('(' + fxClient.toString() + ')()', {headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'public,max-age=300'}});
  return null;
}
