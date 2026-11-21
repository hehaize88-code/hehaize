import {labels} from './locale.mjs';

const fxChoices = 'USD EUR GBP CNY AUD BRL CAD CHF CZK DKK HKD HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON SEK SGD THB TRY ZAR'.split(' ');
const fxProvider = 'https://open.er-api.com/v6/latest/USD';
const fxMaxAge = 7 * 86400000;
let recentFX;
export function currencyControl(lang) {
  const t = labels(lang);
  return '<select data-fx-control aria-label="'+(t.currency || 'Currency')+'">'+fxChoices.map(code=>'<option value="'+code+'">'+code+'</option>').join('')+'</select>';
}
export function currencyScript(lang) {
  const t = labels(lang);
  return '<script defer src="/assets/hubbuy-currency.js" data-fx-error="'+(t.ratesUnavailable || 'Exchange rates unavailable.').replace(/[&"<>]/g,m=>({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[m]))+'"></script>';
}
function fxClient() {
  const controls = [...document.querySelectorAll('[data-fx-control]')];
  if (!controls.length) return;
  const script = document.currentScript;
  const selector = '[data-usd],[data-cny]';
  const lang = document.documentElement.lang || 'en';
  const store = {
    get(key) {try {return localStorage.getItem(key)} catch {return null}},
    set(key,value) {try {localStorage.setItem(key,value)} catch {}}
  };
  let chosen = store.get('hubbuy.currency') || 'USD';
  if (![...controls[0].options].some(o=>o.value===chosen)) chosen='USD';
  let feed;
  const now = Date.now();
  function valid(data) {
    return data && Number.isFinite(data.updated) && data.updated<=now+86400000 && now-data.updated<7*86400000 && data.rates?.USD===1 && data.rates?.CNY>0;
  }
  try {const cached = JSON.parse(store.get('hubbuy.fx.v1')); if(valid(cached)) feed=cached} catch {}
  const note = document.createElement('small');
  note.setAttribute('role','status');
  note.style.cssText='display:block;margin:8px 0;color:inherit';
  (document.querySelector('footer') || document.body).append(note);
  const text = document.createElement('span');
  const attribution = document.createElement('a');
  attribution.href='https://www.exchangerate-api.com/';
  attribution.textContent='ExchangeRate-API'; attribution.rel='noopener'; attribution.target='_blank';
  note.append(text,attribution);
  function format(el) {
    const cny=el.hasAttribute('data-cny'), base=cny?'CNY':'USD';
    const value = Number(el.getAttribute(cny?'data-cny':'data-usd'));
    if(!Number.isFinite(value)) return;
    const converted=feed?.rates?.[chosen] && feed.rates[base] ? value * feed.rates[chosen]/feed.rates[base] : value;
    const currency=feed?.rates?.[chosen] ? chosen : base;
    const formatted=new Intl.NumberFormat(lang,{style:'currency',currency}).format(converted);
    if(el.textContent!==formatted) el.textContent=formatted;
  }
  function render(message='') {
    controls.forEach(el=>{el.value=chosen});
    document.querySelectorAll(selector).forEach(format);
    text.textContent=(message ? message+' ' : '') + (feed ? new Date(feed.updated).toLocaleDateString(lang,{timeZone:'UTC'})+' · ' : '');
  }
  let pending;
  async function refresh() {
    if(!pending) pending=fetch('/api/rates',{credentials:'omit'}).then(async r=>{
      if(!r.ok) throw Error();
      const incoming=await r.json();
      if(!valid(incoming)) throw Error();
      feed=incoming;
      store.set('hubbuy.fx.v1',JSON.stringify(feed));
    }).finally(()=>{pending=null});
    return pending;
  }
  async function apply() {
    render();
    if(!feed || Date.now()-feed.updated>86400000) {
      try { await refresh(); render() }
      catch {
        if(!feed && chosen!=='USD') chosen='USD';
        render(script.dataset.fxError);
      }
    }
  }
  for(const control of controls) control.addEventListener('change',()=>{
    chosen=control.value;
    store.set('hubbuy.currency',chosen);
    apply();
  });
  new MutationObserver(records=>{
    for(const record of records) {
      if(record.type==='attributes') {if(record.target.matches(selector)) format(record.target); continue}
      for(const node of record.addedNodes) if(node.nodeType===1) {
        if(node.matches(selector)) format(node);
        node.querySelectorAll(selector).forEach(format);
      }
    }
  }).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-usd','data-cny']});
  apply();
}
export async function fxRoute(req) {
  const path = new URL(req.url).pathname;
  if(path==='/assets/hubbuy-currency.js') return new Response('('+fxClient.toString()+')();',{headers:{'content-type':'application/javascript; charset=utf-8','cache-control':'public,max-age=300'}});
  if(path!=='/api/rates') return new Response('Not found',{status:404});
  const now=Date.now();
  try {
    if(!recentFX || now-recentFX.checked>3600000) {
      const res=await fetch(fxProvider,{cf:{cacheEverything:true,cacheTtl:3600},signal:AbortSignal.timeout(8000)});
      if(!res.ok) throw Error('fx provider');
      const data=await res.json();
      const updated=Number(data.time_last_update_unix)*1000;
      if(data.base_code!=='USD'||data.result!=='success'||!Number.isFinite(updated)||now-updated>fxMaxAge||updated>now+86400000) throw Error('fx response');
      const rates=Object.fromEntries(fxChoices.map(code=>[code,Number(data.rates?.[code])]).filter(([,v])=>Number.isFinite(v)&&v>0));
      if(rates.USD!==1||!rates.CNY) throw Error('fx base');
      recentFX={updated,rates,checked:now};
    }
  } catch {
    if(!recentFX||now-recentFX.updated>fxMaxAge) return Response.json({error:'exchange_rates_unavailable'},{status:503,headers:{'cache-control':'no-store'}});
  }
  return Response.json({base:'USD',updated:recentFX.updated,rates:recentFX.rates,source:'ExchangeRate-API'},{headers:{'cache-control':'public,max-age=3600'}});
}
