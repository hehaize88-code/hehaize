const currencyCodes = ['USD','CNY','EUR','GBP','AUD','CAD','CHF','JPY','KRW','PLN','CZK','DKK','SEK','NOK','HUF','RON','BGN','THB','VND','IDR','BRL','NZD','SGD','HKD','TWD'];

function decodeAttribute(value) {
  return value.replace(/&(#(?:x[\da-f]+|\d+)|amp|lt|gt|quot|apos);/gi,(entity,code)=>{
    if(code[0] !== '#') return {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[code] ?? entity;
    const point = code[1].toLowerCase()==='x' ? parseInt(code.slice(2),16) : Number(code.slice(1));
    return point<=0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

function imageAddress(value) {
  if(typeof value!=='string') return '';
  try {
    const url = new URL(value,'https://weidian.com');
    return url.protocol==='https:' && /(^|\.)(geilicdn\.com|weidian\.com)$/i.test(url.hostname) ? url.href : '';
  } catch { return ''; }
}

export function readWeidianOptions(page,id) {
  const attribute = page.match(/<script\b[^>]*\bid="__rocker-render-inject__"[^>]*\bdata-obj="([^"]*)"/i)?.[1];
  if(!attribute) throw Error('Product data unavailable');
  const model=JSON.parse(decodeAttribute(attribute)).result?.default_model;
  if(String(model?.item_info?.item_id)!==id) throw Error('Wrong product');
  const properties=model.sku_properties || {};
  const groups=(properties.attr_list||[]).map(group=>({
    name:String(group.attr_title||''),
    values:(group.attr_values||[]).map(value=>({id:String(value.attr_id),name:String(value.attr_value||''),image:imageAddress(value.img)}))
  })).filter(group=>group.values.length);
  const variants=Object.values(properties.sku||{}).filter(sku=>/^\d+$/.test(String(sku.id))).map(sku=>({
    id:String(sku.id), attributes:String(sku.attr_ids||'').split('-'),
    image:imageAddress(sku.img), price:sku.price==null?null:Number(sku.price), stock: Number(sku.stock)
  }));
  return {images:[...new Set((model.item_info.imgs||[]).map(imageAddress).filter(Boolean))],groups,variants};
}

const response=(body,type,ttl=3600)=>new Response(body,{headers:{'content-type':type,'cache-control':'public, max-age='+ttl,'x-content-type-options':'nosniff'}});
export async function commerceRoute(request) {
  const path=new URL(request.url).pathname;
  if(!path.startsWith('/lolo-commerce/')) return null;
  if(request.method!=='GET' && request.method!=='HEAD') return new Response(null,{status:405});
  if(path==='/lolo-commerce/v1.css') return response(commerceCSS,'text/css; charset=utf-8');
  const item=path.match(/^\/lolo-commerce\/item\/(\d{5,20})$/);
  const rates=path==='/lolo-commerce/rates';
  if(!item && !rates) return new Response(null,{status:404});
  const cache=globalThis.caches?.default, cacheKey=new Request(new URL(path,request.url));
  const cached=cache && await cache.match(cacheKey);
  if(cached) return cached;
  try {
    const remote=await fetch(rates?'https://open.er-api.com/v6/latest/USD':'https://weidian.com/item.html?itemID='+item[1],{signal:AbortSignal.timeout(12000)});
    if(!remote.ok) throw Error();
    let value;
    if(rates) {
      const result=await remote.json();
      if(result.result!=='success' || result.base_code!=='USD' || !(result.rates?.CNY>0)) throw Error();
      value={rates:Object.fromEntries(currencyCodes.filter(c=>result.rates[c]>0).map(c=>[c,result.rates[c]])),asOf:result.time_last_update_utc};
    } else value=readWeidianOptions(await remote.text(),item[1]);
    const result=response(JSON.stringify(value),'application/json; charset=utf-8',rates?3600:900);
    if(cache) await cache.put(cacheKey,result.clone()).catch(()=>{});
    return result;
  } catch {return new Response(null,{status:503,headers:{'cache-control':'no-store'}});}
}

export function commerceHTML(html) {
  return html.replace('</head>','<link rel="stylesheet" href="/lolo-commerce/v1.css"><script defer src="/commerce-client.js?v=20261122b"></script></head>');
}

const commerceCSS = `
.lc-currency{max-width:5.6rem;min-width:4.3rem;padding:.35rem .2rem;font:inherit;background:transparent;color:inherit;border:1px solid #8886;border-radius:.4rem}.lolo-header:has(.lc-currency){flex-wrap:wrap}
.catalog-detail .catalog-product-info{min-width:0}.catalog-detail .buy-button{display:block;text-align:center}.lc-actions{display:flex;align-items:start;gap:.5rem;margin:.6rem 0 1rem}.lc-actions>*{flex:1;min-width:0}.lc-actions button,.lc-actions summary,.lc-group button,.lc-group select{font:inherit;color:inherit;background:var(--background,#fff);border:1px solid #aaa;border-radius:.5rem;padding:.65rem;cursor:pointer}.lc-actions summary{text-align:center}.lc-actions details a{display:block;padding:.4rem}.lc-group{border:0;padding:0;margin:.7rem 0;min-width:0}.lc-group legend{padding:0 0 .4rem;font-weight:600}.lc-options{display:grid;grid-template-columns:repeat(auto-fill,minmax(3.7rem,1fr));max-height:14rem;overflow-y:auto;gap:.35rem;padding:.2rem}.lc-options button{padding:.12rem;max-width:100%;aspect-ratio:1;overflow:hidden}.lc-options button img{display:block;width:100%;height:100%;object-fit:cover;border-radius:.3rem}.lc-options button[aria-pressed=true]{outline:2px solid currentColor;outline-offset:0}.lc-group select{max-width:100%}.lc-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(8rem,40%),1fr));gap:.5rem}.lc-gallery img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:.55rem}.lc-status:empty{display:none}.lc-rates-credit{font-size:.8rem}.catalog-gallery .lc-selected{width:100%;height:auto;aspect-ratio:1;object-fit:contain}.lc-qc{margin:2rem 0}.lc-options button:focus-visible{outline:3px solid #245df5}.lc-actions button:disabled{opacity:.6}`;
