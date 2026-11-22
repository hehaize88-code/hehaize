function decodeAttribute(value) {
  return value.replace(/&(#(?:x[\da-f]+|\d+)|amp|lt|gt|quot|apos);/gi,(entity,code)=>{
    if(code[0] !== '#') return {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[code] ?? entity;
    const point = code[1].toLowerCase()==='x' ? parseInt(code.slice(2),16) : Number(code.slice(1));
    return point<=0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

function imageAddress(value) {
  if(typeof value!=='string' || !value.trim()) return '';
  try {
    const url = new URL(value,'https://weidian.com');
    return url.protocol==='https:' && /(^|\.)(geilicdn\.com|weidian\.com)$/i.test(url.hostname) ? url.href : '';
  } catch { return ''; }
}

export function parseListingStyles(page,id) {
  const attribute = page.match(/<script\b[^>]*\bid="__rocker-render-inject__"[^>]*\bdata-obj="([^"]*)"/i)?.[1];
  if(!attribute) throw Error('Product data unavailable');
  const model=JSON.parse(decodeAttribute(attribute)).result?.default_model;
  if(String(model?.item_info?.item_id)!==id) throw Error('Wrong product');
  const properties=model.sku_properties || {};
  const groups=(properties.attr_list||[]).map(group=>({
    name:/^(?:款式|style)\s*0?$/i.test(group.attr_title||'')?'Styles':String(group.attr_title||'Styles'),
    values:(group.attr_values||[]).map(value=>({id:String(value.attr_id),name:String(value.attr_value||''),image:imageAddress(value.img)}))
  })).filter(group=>group.values.length);
  const variants=Object.values(properties.sku||{}).filter(sku=>/^\d+$/.test(String(sku.id))).map(sku=>({
    id:String(sku.id), name:String(sku.title||sku.id), attributes:String(sku.attr_ids||'').split('-'),
    image:imageAddress(sku.img), price:sku.price==null?null:Number(sku.price), stock: Number(sku.stock)
  }));
  if (!groups.length && variants.length) {
    groups.push({name:'Styles', values:variants.map(v=>({id:v.id,name:v.name,image:v.image}))});
    for (const variant of variants) variant.attributes=[variant.id];
  }
  if (!groups.some(g=>g.values.some(v=>v.image))) for (const value of (groups[0]?.values || [])) {
    if (!value.image) value.image=variants.find(v=>v.image && v.attributes.includes(value.id))?.image || '';
  }
  return {images:[...new Set((model.item_info.imgs||[]).map(imageAddress).filter(Boolean))],groups,variants};
}


export async function fetchListingStyles(id) {
  if (!/^\d{5,20}$/.test(id)) return null;
  try {
    const response=await fetch('https://weidian.com/item.html?itemID='+id,{
      signal:AbortSignal.timeout(6500), cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':1800,'400-599':0}}
    });
    return response.ok ? parseListingStyles(await response.text(),id) : null;
  } catch { return null; }
}

export function parseAgentLinks(page, id) {
  if (!/^\d{5,20}$/.test(id)) return [];
  const links=[];
  for (const match of page.matchAll(/<a\b([^>]*\bclass="platform-option"[^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href=decodeAttribute(match[1].match(/\bhref="([^"]+)"/i)?.[1] || '');
    const name=decodeAttribute(match[2].match(/<span>([^<]+)<\/span>/)?.[1] || '');
    try {
      const url=new URL(href);
      if (url.protocol==='https:' && !url.username && !url.password && new RegExp('(?:^|\\D)'+id+'(?:$|\\D)').test(decodeURIComponent(href)) && name && !/pikobuy/i.test(name)) {
        links.push({name,href:url.href});
      }
    } catch {}
  }
  return links;
}

export function detailView(product, listing, buy, t, escape, formatPrice) {
  const gallery=product.images;
  const groups=listing?.groups || [];
  const source=/^\d{5,20}$/.test(product.sourceId) ? 'https://weidian.com/item.html?itemID='+product.sourceId : '';
  const options=groups.map((group,index)=>{
    const thumbnails=group.values.some(value=>value.image);
    return '<fieldset class="piko-options" data-group="'+index+'"><legend>'+escape(group.name)+'</legend><div class="'+(thumbnails?'piko-swatches':'piko-options-list')+'">'+group.values.map(value=>
      '<button type="button" aria-pressed="false" data-option="'+escape(value.id)+'" title="'+escape(value.name)+'">'+(value.image?'<img loading="lazy" width="64" height="64" src="'+escape(value.image)+'" alt="'+escape(value.name)+'">':'<span>'+escape(value.name)+'</span>')+'</button>'
    ).join('')+'</div></fieldset>';
  }).join('');
  const agents=product.agents.length?'<details class="piko-agent-list"><summary>Other buying agents</summary><div>'+product.agents.map(a=>'<a rel="nofollow noopener noreferrer" target="_blank" href="'+escape(a.href)+'">'+escape(a.name)+'</a>').join('')+'</div></details>':'';
  const variants=(listing?.variants||[]).map(v=>[v.id,v.attributes,v.price,v.stock]);
  const mainImage=gallery[0] || listing?.images[0];
  const lower=gallery.slice(1);
  const seller=(listing?.images || []).filter(image=>image!==mainImage && !gallery.includes(image));
  const tiles=(images,indexed)=>images.map((im,i)=>'<a '+(indexed?'data-gallery-index="'+(i+1)+'" ':'')+'href="'+escape(im)+'" target="_blank" rel="noopener"><img src="'+escape(im)+'" alt="'+escape(product.title)+' '+(i+1)+'" width="200" height="200" loading="lazy"></a>').join('');
  return `<link rel="stylesheet" href="/assets/piko-detail-20261122.css"><script src="/assets/piko-detail-20261122.js" defer></script>
  <section class="piko-product" data-source="${source}" data-skus="${escape(JSON.stringify(variants))}">
    <div class="piko-product-hero">${mainImage?'<a data-product-photo href="'+escape(mainImage)+'" target="_blank" rel="noopener"><img src="'+escape(mainImage)+'" alt="'+escape(product.title)+'" width="680" height="680"></a>':''}</div>
    <div class="piko-purchase"><h1>${escape(product.title)}</h1><p class="piko-item-id">${t[14]} · ${escape(product.sourceId)}</p>
    <p class="detail-price" data-usd="${escape(product.price)}">${formatPrice(product.price)}</p>
    ${buy?'<a class="buy-button" href="'+escape(buy)+'" target="_blank" rel="noopener noreferrer" data-track-event="pikobuy_product_click">'+t[9]+'</a>':''}
    <div class="piko-product-actions">${agents}${source?'<button type="button" data-copy-source>Copy Weidian link</button>':''}</div><output data-copy-result aria-live="polite"></output>
    <span hidden data-copy-select>Choose an option before copying the link</span><span hidden data-copy-unavailable>A link for this combination is unavailable.</span>
    <span hidden data-copy-ok>Copied</span><span hidden data-copy-failed>Copy the link below</span>
    ${options}${!listing && source?'<p>Style information is temporarily unavailable.</p>':''}
    ${groups.length?'<p hidden data-sku-note>Confirm the selected options on Weidian.</p>':''}
    </div></section>
    ${lower.length?'<section class="piko-lower-photos"><h2>QC and detail photos</h2><div>'+tiles(lower,true)+'</div></section>':''}
    ${seller.length?'<section class="piko-lower-photos"><h2>Seller photos</h2><div>'+tiles(seller,false)+'</div></section>':''}`;
}
