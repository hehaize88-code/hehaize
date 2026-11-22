// Public seller listings are the source of style images and concrete SKU identifiers.
export function readSellerVariants(html, id) {
  const tag = html.match(/<script\b[^>]*\bid="__rocker-render-inject__"[^>]*>/)?.[0];
  const value = tag?.match(/\bdata-obj="([^"]*)"/)?.[1];
  if (!value) throw Error('Listing data unavailable');
  const model = JSON.parse(value.replace(/&(?:quot|amp|apos|lt|gt|#\d+|#x[0-9a-f]+);/gi, entity => {
    const named = {'&quot;':'"', '&amp;':'&', '&apos;':"'", '&lt;':'<', '&gt;':'>'};
    return named[entity] ?? String.fromCodePoint(parseInt(entity.slice(entity[2] === 'x' ? 3 : 2), entity[2] === 'x' ? 16 : 10));
  })).result?.default_model;
  if (String(model?.item_info?.item_id) !== id) throw Error('Listing identity mismatch');
  const properties = model.sku_properties || {};
  const styles = new Map();
  const options = new Map();
  function sellerImage(raw) {
    try {
      const url = new URL(raw, 'https://weidian.com');
      return url.protocol === 'https:' && /(^|\.)geilicdn\.com$/.test(url.hostname) ? url.href : '';
    } catch { return ''; }
  }
  for (const group of properties.attr_list || []) {
    for (const v of group.attr_values || []) {
      const key = String(v.attr_id), name = String(v.attr_value || key);
      options.set(key, name);
      const image = sellerImage(v.img);
      if (image) styles.set(key, {id:key, name, image, skus:[]});
    }
  }
  const skus = Object.values(properties.sku || {});
  for (const sku of skus) {
    const key = String(sku.id);
    if (!/^\d+$/.test(key)) continue;
    const attributes = String(sku.attr_ids || '').split('-');
    const targets = attributes.filter(a => styles.has(a));
    if (!targets.length) {
      const image = sellerImage(sku.img);
      if (!image) continue;
      if (!styles.has(image)) styles.set(image, {id:key, name:String(sku.title || key), image, skus:[]});
      targets.push(image);
    }
    for (const target of targets) {
      const name = attributes.filter(a => a !== target).map(a => options.get(a)).filter(Boolean).join(' / ');
      styles.get(target).skus.push({id:key, name:name || String(sku.title || key)});
    }
  }
  return {styles:[...styles.values()]};
}
const sellerCache = new Map();
export async function loadSellerVariants(id) {
  if (!/^\d{5,20}$/.test(id)) return {styles:[]};
  const cached = sellerCache.get(id);
  if (cached && cached.until > Date.now()) return cached.data;
  try {
    const response = await fetch('https://weidian.com/item.html?itemID=' + id, {signal:AbortSignal.timeout(8000), cf:{cacheEverything:true, cacheTtl:1800}});
    if (!response.ok) throw Error('Seller unavailable');
    const data = readSellerVariants(await response.text(), id);
    if (sellerCache.size >= 60) sellerCache.delete(sellerCache.keys().next().value);
    sellerCache.set(id, {data, until:Date.now() + 900000});
    return data;
  } catch { return {styles:[], unavailable:true}; }
}
export function readAgentLinks(html, id) {
  const links = [];
  if (!/^\d{5,20}$/.test(id)) return links;
  const item = new RegExp('(?:^|[^0-9])' + id + '(?:$|[^0-9])');
  for (const match of html.matchAll(/<a\b[^>]*class="platform-option"[^>]*>[\s\S]*?<\/a>/g)) {
    try {
      const tag = match[0];
      const url = new URL(tag.match(/href="([^"]+)"/)[1].replaceAll('&amp;', '&'));
      const name = tag.match(/<span>([^<>]+)<\/span>/)[1].trim();
      if (url.protocol !== 'https:' || url.username || url.password || !item.test(decodeURIComponent(url.href))) continue;
      if (url.hostname.replace(/^www\./,'') === 'hipobuy.com' || links.some(([n])=>n===name)) continue;
      links.push([name,url.href]);
    } catch { continue; }
  }
  return links;
}
export function agentLinks(id) {
  if (!/^\d{5,20}$/.test(id)) return [];
  const url = encodeURIComponent('https://weidian.com/item.html?itemID='+id);
  return [
    ['Oopbuy', 'https://oopbuy.com/goods/details?id='+id+'&channel=weidian'],
    ['Kakobuy', 'https://www.kakobuy.com/item/details?url='+url],
    ['Superbuy','https://www.superbuy.com/en/page/buy/?url='+url],
    ['Sugargoo','https://www.sugargoo.com/products?productLink='+url],
    ['Lovegobuy','https://www.lovegobuy.com/product?id='+id+'&shop_type=weidian'],
    ['USFans','https://www.usfans.com/product/3/'+id],
    ['Litbuy','https://litbuy.com/product/2/'+id]
  ];
}
export function purchasePanel(p, variants, t, esc) {
  const {styles} = variants;
  const safeTitle = esc(p.title), source = /^\d{5,20}$/.test(p.sourceId) ? 'https://weidian.com/item.html?itemID='+p.sourceId : '';
  const firstImage = p.images[0] || styles[0]?.image;
  const mainImage = firstImage ? '<img id="purchase-photo" src="'+esc(firstImage)+'" width="750" height="750" alt="'+safeTitle+'">' : '';
  const anchors = (p.agentLinks?.length ? p.agentLinks : agentLinks(p.sourceId)).map(([name, href])=>'<a href="'+esc(href)+'" target="_blank" rel="sponsored noopener noreferrer">'+esc(name)+'</a>').join('');
  const thumbList = styles.map((s,idx)=>'<button type="button" data-style="'+idx+'" aria-pressed="false" aria-label="'+esc(s.name)+'"><img src="'+esc(s.image)+'" width="72" height="72" loading="lazy" alt="'+esc(s.name)+'"></button>').join('');
  const skus = styles.map((s,idx)=>'<template data-choices="'+idx+'">'+s.skus.map(k=>'<option value="'+esc(k.id)+'">'+esc(k.name)+'</option>').join('')+'</template>').join('');
  const styleUI = styles.length ? '<div class="purchase-styles"><h2>Styles</h2><div class="style-grid">'+thumbList+'</div><p data-selection aria-live="polite"></p><label data-sku-label hidden>Option <select data-sku aria-label="Option"></select></label>'+skus+'</div>' : (variants.unavailable ? '<p>Style photos are temporarily unavailable.</p>' : '');
  const actions = source ? '<a class="buy-button" data-track-event="hipobuy_product_click" href="https://hipobuy.com/product/weidian/'+p.sourceId+'" target="_blank" rel="noopener noreferrer">'+esc(t[9])+'</a><div class="purchase-actions"><details><summary>Other buying agents</summary><div>'+anchors+'</div></details><button type="button" data-copy-source="'+esc(source)+'" data-i18n-item="Copy Weidian link" data-i18n-style="Copy selected Weidian link" data-i18n-success="Copied" data-i18n-option="Choose an option" data-i18n-unavailable="Style link unavailable">Copy Weidian link</button></div><span data-copy-status role="status"></span>' : '';
  const price = p.price && Number.isFinite(Number(p.price)) ? '<strong data-usd="'+esc(p.price)+'">$'+Number(p.price).toFixed(2)+'</strong>' : '—';
  const photos = p.images.slice(1);
  return '<section class="purchase-layout"><div class="purchase-image">'+mainImage+'</div><div class="purchase-info"><h1>'+safeTitle+'</h1><p>'+esc(t[14])+' '+esc(p.sourceId)+'</p><p class="detail-price">'+price+'</p>'+actions+styleUI+'</div></section>'+
    (photos.length ? '<section class="purchase-gallery"><h2>QC / detail photos <small>'+photos.length+'</small></h2><div>'+photos.map((im,i)=>'<a href="'+esc(im)+'" target="_blank" rel="noopener noreferrer"><img src="'+esc(im)+'" loading="lazy" width="220" height="220" alt="'+safeTitle+' '+(i+2)+'"></a>').join('')+'</div></section>' : '');
}
