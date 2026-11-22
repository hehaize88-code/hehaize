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
  if(path==='/lolo-commerce/v1.js') return response('('+initCommerce.toString()+')('+JSON.stringify(currencyCodes)+');','text/javascript; charset=utf-8');
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
  return html.replace('</head>','<link rel="stylesheet" href="/lolo-commerce/v1.css"><script defer src="/lolo-commerce/v1.js"></script></head>');
}

const commerceCSS = `
.lc-currency{max-width:5.6rem;min-width:4.3rem;padding:.35rem .2rem;font:inherit;background:transparent;color:inherit;border:1px solid #8886;border-radius:.4rem}.lolo-header:has(.lc-currency){flex-wrap:wrap}
.catalog-detail .catalog-product-info{min-width:0}.catalog-detail .buy-button{display:block;text-align:center}.lc-actions{display:flex;align-items:start;gap:.5rem;margin:.6rem 0 1rem}.lc-actions>*{flex:1;min-width:0}.lc-actions button,.lc-actions summary,.lc-group button,.lc-group select{font:inherit;color:inherit;background:var(--background,#fff);border:1px solid #aaa;border-radius:.5rem;padding:.65rem;cursor:pointer}.lc-actions summary{text-align:center}.lc-actions details a{display:block;padding:.4rem}.lc-group{border:0;padding:0;margin:.7rem 0;min-width:0}.lc-group legend{padding:0 0 .4rem;font-weight:600}.lc-options{display:grid;grid-template-columns:repeat(auto-fill,minmax(3.7rem,1fr));max-height:14rem;overflow-y:auto;gap:.35rem;padding:.2rem}.lc-options button{padding:.12rem;max-width:100%;aspect-ratio:1;overflow:hidden}.lc-options button img{display:block;width:100%;height:100%;object-fit:cover;border-radius:.3rem}.lc-options button[aria-pressed=true]{outline:2px solid currentColor;outline-offset:0}.lc-group select{max-width:100%}.lc-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(8rem,40%),1fr));gap:.5rem}.lc-gallery img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:.55rem}.lc-status:empty{display:none}.lc-rates-credit{font-size:.8rem}.catalog-gallery .lc-selected{width:100%;height:auto;aspect-ratio:1;object-fit:contain}.lc-qc{margin:2rem 0}.lc-options button:focus-visible{outline:3px solid #245df5}.lc-actions button:disabled{opacity:.6}`;
function initCommerce(currencyCodes) {
  const make=(tag,text,cls)=>{const e=document.createElement(tag); if(text)e.textContent=text;if(cls)e.className=cls;return e;};
  const getJSON=async path=>{const r=await fetch(path);if(!r.ok)throw Error();return r.json();};
  const header=document.querySelector('.lolo-header');
  const select=make('select',null,'lc-currency');
  select.setAttribute('aria-label','Currency');
  select.setAttribute('translate','no');
  for(const code of currencyCodes)select.add(new Option(code,code));
  if(header)header.append(select);
  let currency='USD',rates={USD:1},asOf='',pendingRates;
  const remember=value=>{try{localStorage.setItem('lolo-currency',value);}catch{}};
  const convert=(value,from,to)=>{
    if(from===to)return value;
    if(!rates[to]||!rates[from])return null;
    return value*rates[to]/rates[from];
  };
  const money=(amount,code)=>new Intl.NumberFormat(document.documentElement.lang||'en',{style:'currency',currency:code}).format(amount);
  function refreshPrices() {
    for(const price of document.querySelectorAll('.detail-price,.card-meta strong,article a strong')) {
      if(!price.dataset.baseAmount) {
        const initial=price.textContent.trim().match(/^\$\s*([\d,]+(?:\.\d+)?)\s*(?:USD)?$/);
        if(!initial)continue;
        price.dataset.baseAmount=initial[1].replaceAll(',','');
        price.dataset.baseCurrency='USD';
        price.setAttribute('translate','no');
      }
      const unit=price.dataset.baseCurrency;
      const amount=Number(price.dataset.baseAmount);
      const converted=convert(amount,unit,currency);
      const display=converted==null?unit:currency;
      const label=money(converted??amount,display)+' '+display;
      if(price.textContent!==label)price.textContent=label;
      if(asOf)price.title='ExchangeRate-API · '+asOf;
      const meta=price.closest('.card-meta')?.querySelector('span');
      if(meta && /USD\s*·/.test(meta.textContent))meta.textContent=meta.textContent.replace(/USD\s*·\s*/,'');
    }
  }
  function getRates(){
    if(!pendingRates)pendingRates=getJSON('/lolo-commerce/rates').then(data=>{
      rates=data.rates;asOf=data.asOf;
      for(const option of select.options)option.disabled=!rates[option.value];
      return rates;
    }).catch(error=>{pendingRates=undefined;throw error;});
    return pendingRates;
  }
  let requestVersion=0;
  async function setCurrency(value) {
    const version=++requestVersion;
    const errorNote=header?.querySelector('.lc-rate-error');
    errorNote?.remove();
    if(value!=='USD') {
      try{await getRates();if(!rates[value])throw Error();}
      catch{
        if(version!==requestVersion)return;
        select.value=currency;
        const note=make('span','Exchange rate unavailable. Try again.','lc-rate-error');
        note.setAttribute('role','status');select.after(note);return;
      }
    }
    if(version!==requestVersion)return;
    currency=value;select.value=value;remember(value);refreshPrices();
  }
  select.addEventListener('change',()=>setCurrency(select.value));
  refreshPrices();
  try{const saved=localStorage.getItem('lolo-currency');if(currencyCodes.includes(saved))setCurrency(saved);}catch{}
  let scheduled=false;
  const watch=document.querySelector('main');
  if(watch)new MutationObserver(records=>{
    if(scheduled || !records.some(record=>[...record.addedNodes].some(n=>n.nodeType===1)))return;
    scheduled=true;requestAnimationFrame(()=>{scheduled=false;refreshPrices();});
  }).observe(watch,{childList:true,subtree:true});

  const detail=document.querySelector('.catalog-detail');
  const info=detail?.querySelector('.catalog-product-info');
  const buy=info?.querySelector('.buy-button');
  const id=buy?.href.match(/\/productDetail\/(\d+)(?:\?|$)/)?.[1];
  if(!info||!id)return;
  const originalURL=new URL('https://weidian.com/item.html');
  originalURL.searchParams.set('itemID',id);
  const price=info.querySelector('.detail-price');
  const label=info.querySelector('h1')?.textContent||'';
  const gallery=detail.querySelector('.catalog-gallery');
  const mainImage=gallery?.querySelector('#gallery-main');
  const qc=[...new Set([...gallery.querySelectorAll('.gallery-thumbs img')].map(im=>im.src))];
  const originalTitle=info.querySelector('h2');
  originalTitle?.nextElementSibling?.remove();originalTitle?.remove();
  function addPhotoGroup(title,urls,anchor) {
    if(!urls.length)return anchor;
    const section=make('section',null,'lc-qc'), grid=make('div',null,'lc-gallery');
    section.append(make('h2',title),grid);
    urls.forEach((url,index)=>{
      const a=make('a'),img=make('img');a.href=url;a.target='_blank';a.rel='noopener noreferrer';
      img.alt=title+' '+(index+1);img.src=url;img.loading='lazy';img.width=200;img.height=200;a.append(img);grid.append(a);
    });
    anchor.after(section);return section;
  }
  const qcSection=addPhotoGroup('QC photos',qc,detail);
  if(mainImage){
    const top=mainImage.cloneNode();top.removeAttribute('id');top.className='lc-selected';gallery.replaceChildren(top);
  }
  const top=gallery.querySelector('.lc-selected');
  const actions=make('div',null,'lc-actions'),agents=make('details'),copy=make('button','Copy Weidian link'),status=make('p',null,'lc-status');
  status.setAttribute('role','status');copy.type='button';agents.append(make('summary','Other buying agents'));actions.append(agents,copy);buy.after(actions);actions.after(status);
  const copyOptions=make('button','Copy style and size');copyOptions.type='button';copyOptions.hidden=true;status.before(copyOptions);
  let activeSku=null, hasSelection=false, selectionText='';
  function updateLinks(){
    const original=new URL(originalURL);

    const links=[
      ['Superbuy','https://www.superbuy.com/en/page/buy/?url='+encodeURIComponent(original.href)],
      ['Oopbuy','https://oopbuy.com/goods/details?id='+id+'&channel=weidian'],
      ['Kakobuy','https://kakobuy.com/item/details?url='+encodeURIComponent(original.href)],
      ['Litbuy','https://litbuy.com/product/weidian/'+id],
      ['HipoBuy','https://hipobuy.com/product/weidian/'+id]
    ];
    for(const a of agents.querySelectorAll('a'))a.remove();
    for(const [name,url] of links){
      const a=make('a',name);a.href=url;a.target='_blank';a.rel='nofollow noopener noreferrer';a.setAttribute('translate','no');agents.append(a);
    }
    const primary=new URL(buy.href);primary.searchParams.set('url',original.href);buy.href=primary.href;
    copyOptions.hidden=!activeSku;
  }
  async function copyValue(value,message) {
    try{await navigator.clipboard.writeText(value);status.textContent=message;}
    catch{
      const field=make('textarea');field.readOnly=true;field.value=value;status.replaceChildren(field);field.select();
    }
  }
  copy.onclick=()=>copyValue(originalURL.href,'Weidian product link copied.');
  copyOptions.onclick=()=>{if(activeSku)copyValue(originalURL.href+'\n'+selectionText+'\nSKU '+activeSku.id,'Product link and selected options copied. Confirm these options on Weidian.');};
  updateLinks();
  async function options() {
    let data;
    try{data=await getJSON('/lolo-commerce/item/'+id);}catch{
      const note=make('p','Style information is temporarily unavailable.');
      const retry=make('button','Retry');retry.type='button';note.append(' ',retry);status.after(note);
      retry.onclick=()=>{note.remove();options();};return;
    }
    if(data.images[0]&&top)top.src=data.images[0];
    const variantImages=new Set(data.groups.flatMap(g=>g.values.map(v=>v.image)).filter(Boolean));
    addPhotoGroup('Product details',data.images.filter((src,i)=>i>0&&!variantImages.has(src)),qcSection);
    if(!data.groups.length)return;
    const chosen=new Map(), controls=new Map(), section=make('section'), originalPrice=price?.dataset.baseAmount;
    section.append(make('h2','Styles'));
    status.after(section);
    const selectedLabel=make('p');section.append(selectedLabel);
    function choose(index,value) {
      if(value)chosen.set(index,value);else chosen.delete(index);
      const keys=[...chosen.values()].map(v=>v.id);
      hasSelection=keys.length>0;
      const matches=data.variants.filter(s=>keys.every(key=>s.attributes.includes(key)));
      activeSku=keys.length===data.groups.length && matches.length===1?matches[0]:null;
      for(const [idx,{buttons,field}] of controls){
        for(const [v,button] of buttons)button.setAttribute('aria-pressed',String(chosen.get(idx)?.id===v));
        if(field)field.value=chosen.get(idx)?.id||'';
      }
      selectionText=[...chosen.entries()].map(([idx,v])=>data.groups[idx].name+' · '+v.name).join(' / ');
      selectedLabel.textContent=selectionText;
      if(top)top.src=activeSku?.image || [...chosen.values()].find(v=>v.image)?.image || data.images[0] || qc[0] || top.src;
      if(price && originalPrice) {
        const variant=Number(activeSku?.price);
        price.dataset.baseAmount=activeSku && variant>0 ? String(variant) : originalPrice;
        price.dataset.baseCurrency=activeSku && variant>0 ? 'CNY':'USD';
        refreshPrices();
        if(price.dataset.baseCurrency==='CNY' && currency!=='CNY')getRates().then(refreshPrices).catch(()=>{});
      }
      status.textContent=hasSelection && !matches.length?'This combination is unavailable.':hasSelection && !activeSku?'Select the remaining options to copy the product link with style and size.':'';
      updateLinks();
    }
    data.groups.forEach((g,index)=>{
      const fs=make('fieldset',null,'lc-group'),legend=make('legend',g.name);
      fs.append(legend);section.append(fs);const buttons=new Map();
      if(g.values.some(v=>v.image)){
        const grid=make('div',null,'lc-options');fs.append(grid);
        for(const value of g.values) {
          const button=make('button');button.type='button';button.title=value.name;button.setAttribute('aria-label',value.name);button.setAttribute('aria-pressed','false');
          if(value.image){const img=make('img');img.src=value.image;img.loading='lazy';img.alt='';button.append(img);}else button.textContent=value.name;
          button.onclick=()=>choose(index,value);grid.append(button);buttons.set(value.id,button);
        }
        controls.set(index,{buttons});
      } else {
        const field=make('select');field.setAttribute('aria-label',g.name);field.add(new Option('Choose an option',''));
        for(const v of g.values)field.add(new Option(v.name,v.id));fs.append(field);controls.set(index,{buttons,field});
        field.onchange=()=>choose(index,g.values.find(v=>v.id===field.value));
      }
    });
  }
  options();
}
