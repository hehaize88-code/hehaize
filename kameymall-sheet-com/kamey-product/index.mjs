import { products } from './products.mjs';
import { purchaseLinks } from './agents.mjs';
import { css } from './style.mjs';
import { snapshot } from './rates-snapshot.mjs';
import { splitLocale, localePath } from '../kamey-language/index.mjs';

const currencies = ['USD','CNY','AUD','BRL','CAD','CHF','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','ZAR','TWD','VND'];
const escape = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replaceAll('<','\\u003c').replaceAll('>','\\u003e').replaceAll('&','\\u0026');
export const sourceRoutes = Object.fromEntries(products.map(p=>[p.url,'/products/'+p.slug]));
const cleanRates = data => {
  if(data?.base_code!=='CNY'||data?.result!=='success'||!(data?.rates?.USD>0)||!Number.isFinite(Date.parse(data.time_last_update_utc)))throw Error('Invalid rates');
  const rates=Object.fromEntries(currencies.filter(c=>Number.isFinite(data.rates[c])&&data.rates[c]>0).map(c=>[c,data.rates[c]]));
  return {base:'CNY',rates,asOf:new Date(data.time_last_update_utc).toISOString().slice(0,10)};
};
const saved=cleanRates(snapshot);
let ratesState=null;
async function currentRates(){
  if(ratesState?.until>Date.now())return ratesState.value;
  try{
    const r=await fetch('https://open.er-api.com/v6/latest/CNY',{signal:AbortSignal.timeout(6500),cf:{cacheEverything:true,cacheTtl:14400}});
    if(!r.ok)throw Error('Unavailable');
    const value=cleanRates(await r.json());
    ratesState={value,until:Date.now()+3600000};return value;
  }catch{
    const value=ratesState?.value||saved;
    ratesState={value,until:Date.now()+60000};
    return value;
  }
}
const cached=(body,type,age=300)=>new Response(body,{headers:{'content-type':type,'cache-control':'public, max-age='+age,'x-content-type-options':'nosniff'}});
const sourceLink=id=>'https://weidian.com/item.html?itemID='+id;
const wrapKey = url=>Object.entries(Object.fromEntries(new URL(url).searchParams)).find(([,v])=>v.startsWith('https://weidian.com/'))?.[0];
function itemPage(p,lang){
  const path=url=>localePath(url,lang), canonical='https://kameymall-sheet.com'+path('/products/'+p.slug);
  const options=(p.groups||[]).map((g,i)=>{
    const visual=g.values.some(v=>v.image);
    const controls=visual?'<div class="km-styles">'+g.values.map(v=>'<button type="button" class="km-style" data-km-choice="'+escape(v.id)+'" data-group="'+i+'" data-image="'+escape(v.image||'')+'" aria-pressed="false" title="'+escape(v.label)+'" aria-label="'+escape(v.label)+'">'+(v.image?'<img src="'+escape(v.image)+'" width="68" height="68" loading="lazy" alt="">':escape(v.label))+'</button>').join('')+'</div>':
      '<select aria-label="'+escape(g.name)+'" data-km-group="'+i+'"><option value="">Choose an option</option>'+g.values.map(v=>'<option value="'+escape(v.id)+'">'+escape(v.label)+'</option>').join('')+'</select>';
    return '<fieldset class="km-choices"><legend>'+escape(g.name)+'</legend>'+controls+'</fieldset>';
  }).join('');
  const links=purchaseLinks(p.reference,sourceLink(p.reference));
  const allPhotoSection=(title,images)=>images.length?'<section class="km-photos"><h2>'+title+' <small translate="no">('+images.length+')</small></h2><div class="km-grid">'+images.map((u,i)=>'<button class="km-photo" type="button" data-km-photo="'+escape(u)+'" aria-label="Enlarge photo '+(i+1)+'"><img width="160" height="160" src="'+escape(u)+'" alt="'+escape(p.name)+' '+(i+1)+'" loading="lazy"></button>').join('')+'</div></section>':'';
  const details={id:p.reference,cny:p.cny,cover:p.image,groupIds:p.groups.map(g=>g.values.map(v=>v.id)),variants:p.variants,rates:saved.rates};
  const nav=[['Home','/'],['Spreadsheet','/finds'],['Categories','/categories'],['How to Buy','/how-to-buy'],['Guides','/guides'],['QC','/guides/what-to-inspect-before-ordering'],['Shipping','/articles/kameymall-shipping-cost-guide-2026'],['Articles','/articles'],['FAQ','/faq'],['Image search','/image-search/']];
  const schema={'@context':'https://schema.org','@type':'Product',name:p.name,sku:p.reference,image:['https://kameymall-sheet.com'+p.image,...p.gallery],url:canonical,offers:{'@type':'Offer',price:p.cny,priceCurrency:'CNY',url:sourceLink(p.reference)}};
  const buyUrl='https://www.kameymall.com/purchases/search/item?url='+encodeURIComponent(sourceLink(p.reference));
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(p.name)+' | KameyMall Sheet</title><meta name="description" content="'+escape(p.name)+' product photos, style options, prices and buying links."><link rel="canonical" href="'+escape(canonical)+'"><link rel="icon" href="/favicon.svg"><style>'+css+'</style><script type="application/ld+json">'+json(schema)+'</script></head><body><header class="km-nav"><div><a class="km-brand" href="'+path('/')+'"><img alt="KameyMall" src="/kameymall-logo.png"></a><nav>'+nav.map(([n,u])=>'<a href="'+path(u)+'">'+n+'</a>').join('')+'</nav><span data-km-menu></span></div></header><main class="km-main" data-km-product><nav class="km-crumb" aria-label="Breadcrumb"><a href="'+path('/finds')+'">Spreadsheet</a> / <a href="'+path('/categories/'+p.categoryKey)+'">'+escape(p.categoryKey)+'</a> / <span>'+escape(p.name)+'</span></nav><section class="km-top"><div><h2>Product photos</h2><button id="km-zoom" class="km-hero" type="button" aria-label="Enlarge product photo"><img id="km-hero" src="'+escape(p.image)+'" alt="'+escape(p.name)+'" width="640" height="640"></button></div><div><h1>'+escape(p.name)+'</h1><p class="km-id">Product ID <span translate="no">'+p.reference+'</span></p><div class="km-price"><strong id="km-price">'+escape(new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(p.cny*saved.rates.USD))+'</strong><select id="km-currency" aria-label="Currency" translate="no">'+currencies.filter(c=>saved.rates[c]).map(c=>'<option>'+c+'</option>').join('')+'</select></div><p class="km-fx">Exchange rate · <span id="km-rate-date" translate="no">'+saved.asOf+'</span> · <a translate="no" href="https://www.exchangerate-api.com/">ExchangeRate-API</a></p><a class="km-primary" data-wrap="url" href="'+escape(buyUrl)+'" target="_blank" rel="nofollow noopener">Open KameyMall</a><div class="km-actions"><details><summary class="km-secondary">Other buying agents</summary><div class="km-agents">'+links.map(([n,u])=>'<a translate="no" href="'+escape(u)+'" target="_blank" rel="nofollow noopener"'+(wrapKey(u)?' data-wrap="'+escape(wrapKey(u))+'"':'')+'>'+escape(n)+'</a>').join('')+'</div></details><button class="km-secondary" id="km-copy" type="button"><span id="km-copy-label">Copy Weidian link</span></button></div><p id="km-status" class="km-status" role="status"></p><input id="km-manual" aria-label="Weidian link" readonly hidden>'+options+'<p class="km-selection" id="km-selection" aria-live="polite"></p></div></section>'+allPhotoSection('QC & detail photos',p.gallery)+allPhotoSection('Seller photos',p.seller)+'<section class="km-photos"><h2>Related products</h2><div class="km-related">'+products.filter(v=>v.categoryKey===p.categoryKey&&v!==p).map(v=>'<a href="'+path('/products/'+v.slug)+'">'+escape(v.name)+'</a>').join('')+'</div></section><dialog><button type="button" id="km-close">Close</button><img id="km-zoom-img" alt="'+escape(p.name)+'"></dialog><div hidden><span id="km-need">Choose the remaining options to copy the exact SKU link.</span><span id="km-invalid">This option combination is unavailable.</span><span id="km-base-label">Copy Weidian link</span><span id="km-sku-label">Copy selected SKU link</span><span id="km-copied">Link copied</span></div></main><script id="km-data" type="application/json">'+json(details)+'</script><script src="/kamey-product/client.js" defer></script></body></html>';
}
export async function productRoute(request,env){
  const url=new URL(request.url), [lang,route]=splitLocale(url.pathname);
  if(!['GET','HEAD'].includes(request.method))return null;
  if(route==='/kamey-product/rates')return cached(request.method==='HEAD'?null:JSON.stringify(await currentRates()),'application/json; charset=utf-8',3600);
  if(route==='/kamey-product/client.js')return env.ASSETS.fetch(new Request(new URL('/km-product-ui.js',request.url),request));
  const match=route.match(/^\/(?:products|product(?:\/weidian)?)\/([\w-]+)\/?$/);
  if(!match)return null;
  const p=products.find(row=>row.slug===match[1]||row.reference===match[1]);
  if(!p)return null;
  const canonical=localePath('/products/'+p.slug,lang);
  if(url.pathname!==canonical){url.pathname=canonical;return Response.redirect(url.href,308);}
  return cached(request.method==='HEAD'?null:itemPage(p,lang),'text/html; charset=utf-8');
}
