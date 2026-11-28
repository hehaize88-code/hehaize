const htmlEntities = value => String(value || '').replace(/&(#x[\da-f]+|#\d+|quot|apos|amp|lt|gt);/gi, (_, entity) => {
 if (entity[0] === '#') { const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2),16) : Number(entity.slice(1)); return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '\ufffd'; }
 return ({quot:'"',apos:"'",amp:'&',lt:'<',gt:'>'})[entity.toLowerCase()];
});
const secureImage = value => {
  try { const u = new URL(typeof value==='string'?value:value?.url||value?.img||value?.src); return u.protocol === 'https:' && /(^|\.)geilicdn\.com$/.test(u.hostname) ? u.href : ''; } catch { return ''; }
};

function parseWeidianOptions(html, expectedId) {
  const tag = html.match(/<script\b[^>]*\bid=["']__rocker-render-inject__["'][^>]*>/i)?.[0] || '';
  const raw = tag.match(/\bdata-obj=(['"])([\s\S]*?)\1/)?.[2];
  if (!raw) throw Error('Options unavailable');
  return optionsFromModel(JSON.parse(htmlEntities(raw)).result?.default_model,expectedId);
}
function optionsFromModel(model,expectedId){
  if (String(model?.item_info?.item_id) !== String(expectedId)) throw Error('Product identity mismatch');
  const properties = model.sku_properties || {};
  const groups = (properties.attr_list || []).slice(0, 8).map(group => ({
    name: String(group.attr_title || '').slice(0, 120),
    values: (group.attr_values || []).slice(0, 500).map(value => ({
      id: String(value.attr_id), label: String(value.attr_value || '').slice(0, 160), image: secureImage(value.img),
    })).filter(value => /^\d+$/.test(value.id)),
  }));
  const variants = Object.values(properties.sku || {}).slice(0, 5000).map(sku => ({
    id: String(sku.id), attrs: String(sku.attr_ids || '').split('-'),
    price: Number(sku.price), available: Number(sku.stock) > 0,
  })).filter(sku => /^\d+$/.test(sku.id) && Number.isFinite(sku.price) && sku.price >= 0);
  return { sourceId: String(expectedId), groups, variants,
    images: [...new Set((typeof model.item_info.imgs==='string'?[model.item_info.imgs]:Object.values(model.item_info.imgs||{})).map(secureImage).filter(Boolean))].slice(0, 100),
    sourceUrl: `https://weidian.com/item.html?itemID=${expectedId}`,
  };
}

const CURRENCIES = ['USD','EUR','GBP','CNY','BRL','AUD','CAD','CHF','CZK','DKK','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','ZAR'];
function normalizeRates(rows) {
  if (!Array.isArray(rows)) throw Error('Invalid exchange rates');
  const rates = { USD: 1 }, dates = {};
  for (const row of rows) {
    if (row.base === 'USD' && CURRENCIES.includes(row.quote) && Number.isFinite(row.rate) && row.rate > 0 && /^\d{4}-\d{2}-\d{2}$/.test(row.date)) {
      rates[row.quote] = row.rate; dates[row.quote] = row.date;
    }
  }
  if (!rates.EUR || !rates.CNY) throw Error('Incomplete exchange rates');
  return { base: 'USD', rates, dates, source: 'Frankfurter', sourceUrl: 'https://frankfurter.dev/' };
}

async function experienceRoute(request) {
  const url = new URL(request.url);
  if (!['/api/product-options', '/api/exchange-rates'].includes(url.pathname)) return null;
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  try {
    if (url.pathname === '/api/product-options') {
      const id = url.searchParams.get('id') || '';
      if (!/^\d{5,20}$/.test(id)) return Response.json({ error: 'Invalid product ID' }, { status: 400 });
      const api=new URL('https://thor.weidian.com/detail/getItemInfo/1.0');
      api.searchParams.set('param',JSON.stringify({vitemId:id,from:'h5'}));
      const cache={cacheEverything:true,cacheTtlByStatus:{'200-299':1800,'400-599':0}};
      let options;
      try{
        const r=await fetch(api,{signal:AbortSignal.timeout(6000),cf:cache});
        if(r.ok)options=optionsFromModel((await r.json()).result?.default_model,id);
      }catch{}
      if(!options){
        const r=await fetch(`https://weidian.com/item.html?itemID=${id}`,{signal:AbortSignal.timeout(7000),cf:cache});
        if(!r.ok)throw Error('Source unavailable');
        options=parseWeidianOptions(await r.text(),id);
      }
      const lang=url.searchParams.get('lang')||'en';
      const colors={'黑色':'black','白色':'white','蓝色':'blue','红色':'red','绿色':'green','灰色':'grey','粉色':'pink','棕色':'brown','黄色':'yellow','米色':'beige','紫色':'purple','橙色':'orange'};
      const dictionary=dictionaries[lang]||{};
      for(const group of options.groups){
        for(const value of group.values){
          const raw=value.label;const clean=raw.replace(/黑色|白色|蓝色|红色|绿色|灰色|粉色|棕色|黄色|米色|紫色|橙色/g,m=>' '+colors[m]+' ').trim();
          value.label=dictionary[raw]||translateProductTitle(clean,lang,productGlossaries);
        }
      }
      return Response.json(options, { headers: { 'cache-control': 'public, max-age=600, s-maxage=21600' } });
    }
    const response = await fetch('https://api.frankfurter.dev/v2/rates?base=USD&quotes=' + CURRENCIES.filter(code => code !== 'USD').join(','), {
      signal: AbortSignal.timeout(8000), cf: { cacheTtl: 21600, cacheEverything: true },
    });
    if (!response.ok) throw Error('Rates unavailable');
    return Response.json(normalizeRates(await response.json()), { headers: { 'cache-control': 'public, max-age=3600, s-maxage=21600' } });
  } catch {
    return Response.json({ error: 'Temporarily unavailable' }, { status: 503, headers: { 'cache-control': 'no-store', 'retry-after': '60' } });
  }
}

function localizeCatalogueHtml(html, dictionary, locale) {
 const decodeText = s => s.replace(/&(#x[\da-f]+|#\d+|quot|apos|amp|lt|gt|nbsp);/gi, (_, entity) => {
  if(entity[0]==='#'){const code=entity[1].toLowerCase()==='x'?parseInt(entity.slice(2),16):Number(entity.slice(1));return code>0&&code<=0x10ffff?String.fromCodePoint(code):'\ufffd';}
  return ({quot:'"',apos:"'",amp:'&',lt:'<',gt:'>',nbsp:' '})[entity.toLowerCase()];
 });
 const encodeText = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const translate = s => {
  const trimmed=s.trim(),value=decodeText(trimmed); let found;
  // Reuse reviewed base labels for decorated buttons and numbered photos.
  const parts=value.match(/^(←\s*)?(.+?)(\s*[↗→]|\s+\d+)?$/);
  if(parts&&(parts[1]||parts[3])&&dictionary[parts[2]])found=(parts[1]||'')+dictionary[parts[2]]+(parts[3]||'');
  if(!found&&value.includes(' | ')){
   const sections=value.split(' | ');
   if(sections.every(part=>dictionary[part]||part==='UUFinds Sheet'))found=sections.map(part=>dictionary[part]||part).join(' | ');
  }
  if(!found)found=dictionary[value];
  if(!found&&value.endsWith(':')&&dictionary[value.slice(0,-1)])found=dictionary[value.slice(0,-1)]+':';
  if(!found&&/^UUFinds (.+) Spreadsheet$/.test(value)){const category=value.match(/^UUFinds (.+) Spreadsheet$/)[1];found=(dictionary['UUFinds spreadsheet']||'UUFinds Spreadsheet')+' · '+(dictionary[category]||category);}
  if(!found&&value.startsWith('UUFinds ')&&dictionary[value.slice(7)])found='UUFinds '+dictionary[value.slice(7)];
  if(!found&&value.includes(' | '))found=value.split(' | ').map(part=>dictionary[part]||part).join(' | ');
  return found?s.replace(trimmed,encodeText(found)):s;
 };
 const protectedBlocks = [];
 html=html.replace(/<a\b[^>]*(?:data-locale-code|data-agent)="[^"]+"[^>]*>[\s\S]*?<\/a>/gi,value=>`<!--LOCALE_BLOCK_${protectedBlocks.push(value)-1}-->`);
 html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, value => {
  if(value.includes('application/ld+json'))try{const data=JSON.parse(value.replace(/^<script[^>]*>|<\/script>$/gi,''));const walk=(v,key='')=>Array.isArray(v)?v.map(x=>walk(x,key)):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,walk(x,k)])):typeof v==='string'&&!key.startsWith('@')?(key==='inLanguage'?htmlLocale(locale):dictionary[v]||v):v;value='<script type="application/ld+json">'+JSON.stringify(walk(data)).replaceAll('<','\\u003c')+'</script>';}catch{}
  return `<!--LOCALE_BLOCK_${protectedBlocks.push(value)-1}-->`;
 });
 html = html.replace(/>([^<>]+)</g, (_, value) => '>' + translate(value) + '<')
  .replace(/<meta\b[^>]*>/gi,tag=>tag.replace(/content="([^"]*)"/,(whole,value)=>{const decoded=decodeText(value);const translated=dictionary[decoded]||decoded.split('. ').map(part=>dictionary[part]||part).join('. ');return `content="${encodeText(translated)}"`;}))
  .replace(/\b(alt|aria-label|title|placeholder)="([^"]*)"/g, (_, key, value) => `${key}="${translate(value)}"`)
  .replace(/<html lang="[^"]+"/, `<html lang="${htmlLocale(locale)}"`)
  .replace(/<!--LOCALE_BLOCK_(\d+)-->/g, (_, n) => protectedBlocks[Number(n)]);
 return html;
}

// Public catalogue enhancements. No accounts, database or paid APIs.

function purchasingPlatforms(sourceId) {
 if (!/^\d{5,20}$/.test(String(sourceId))) return [];
 const id = String(sourceId), source = encodeURIComponent(`https://weidian.com/item.html?itemID=${id}`);
 return [
  ['Superbuy', `https://www.superbuy.com/en/page/buy/?url=${source}`],
  ['CSSBuy', `https://www.cssbuy.com/shop/goodsDetail?type=micro&id=${id}`],
  ['Kakobuy', `https://kakobuy.com/item/details?url=${source}`],
  ['USFans', `https://www.usfans.com/product/3/${id}`],
  ['Sugargoo', `https://www.sugargoo.com/products?productLink=${source}`],
  ['Oopbuy', `https://oopbuy.com/goods/details?id=${id}&channel=weidian`],
  ['Hipobuy', `https://hipobuy.com/product/weidian/${id}`],
  ['Litbuy', `https://litbuy.com/product/2/${id}`],
  ['Lovegobuy', `https://www.lovegobuy.com/product?id=${id}&shop_type=weidian`],
  ['OrientDig', `https://orientdig.com/product/?shop_type=weidian&id=${id}`],
  ['Joyagoo', `https://joyagoo.com/product/?id=${id}&shop_type=weidian`],
 ];
}
function renderProductDetail(product,lang,t,buy) {
 const im=(url,i,kind='catalogue')=>`<button class="photo-tile" type="button" data-photo-src="${escapeHtml(url)}" data-photo-kind="${kind}" aria-label="Enlarge photo ${i+1}"><img src="${escapeHtml(url)}" alt="${escapeHtml(product.title)} ${i+1}" width="160" height="160" loading="lazy"><span>${i+1}</span></button>`;
 return `<a class="back" href="${base(lang)}/">← ${t[7]}</a>
<section class="catalog-detail" data-product-detail data-source-id="${escapeHtml(product.sourceId)}" data-source-url="${escapeHtml(product.sourceUrl)}">
 <div class="catalog-gallery"><div class="section-caption"><h2>Product photos</h2><span>${product.images.length}</span></div>
  <div class="gallery-main" tabindex="0" role="region" aria-label="Product photos"><button type="button" data-gallery-prev aria-label="Previous photo">‹</button><img id="gallery-main" src="${escapeHtml(product.images[0]||'')}" alt="${escapeHtml(product.title)}" width="800" height="800"><button type="button" data-gallery-next aria-label="Next photo">›</button><button class="gallery-zoom" type="button" data-enlarge aria-label="Enlarge photo">⤢</button><span class="gallery-counter" aria-live="polite">1 / ${product.images.length}</span></div>
  <div class="gallery-thumbs" aria-label="Product photos">${product.images.map((url,i)=>`<button type="button" data-gallery-index="${i}" aria-label="Image ${i+1}" aria-current="${i===0}"><img src="${escapeHtml(url)}" alt="" width="120" height="120" loading="lazy"></button>`).join('')}</div>
 </div>
 <div class="catalog-product-info"><p class="catalog-eyebrow">UUFINDS SPREADSHEET</p><h1>${escapeHtml(product.title)}</h1><p class="product-source-id">${t[14]}: <strong>${escapeHtml(product.sourceId)}</strong></p>
  <p class="detail-price"><span data-detail-price data-price-amount="${escapeHtml(product.price)}" data-price-currency="USD">${money(product.price)}</span> <small data-currency-code>USD</small></p><p class="detail-price-note" data-source-price></p><p class="detail-price-note">Estimated conversion. Shipping, taxes and platform fees are not included.</p><p class="rate-status" data-rate-status role="status"></p>
  ${buy?`<a class="buy-button" href="${escapeHtml(buy)}" target="_blank" rel="noopener noreferrer" data-track-event="uufinds_product_click">${t[9]} ↗</a>`:''}
  <div class="product-action-row"><details class="agent-picker"><summary>Other buying agents <span aria-hidden="true">⌄</span></summary><div class="agent-options"><p>Open this product with another buying agent. Confirm its price and available options there.</p><label class="sr-only" for="agent-query">Search buying agents</label><input id="agent-query" type="search" placeholder="Search buying agents"><div class="agent-list">${purchasingPlatforms(product.sourceId).map(([name,href])=>`<a href="${escapeHtml(href)}" data-agent="${name.toLowerCase()}" target="_blank" rel="noopener noreferrer">${name} <span aria-hidden="true">↗</span></a>`).join('')}</div><p data-no-agents hidden>No buying agents found.</p></div></details><button type="button" class="copy-source" data-copy-source>Copy Weidian link</button></div>
  <p class="copy-status" data-copy-status role="status"></p><textarea data-copy-fallback hidden readonly aria-label="Original Weidian listing"></textarea>
  <section class="product-styles" aria-labelledby="styles-title"><div class="section-caption"><h2 id="styles-title">Styles</h2><span data-style-count></span></div><p data-options-status role="status">Loading styles…</p><button data-options-retry type="button" hidden>Retry</button><div class="style-grid" tabindex="0" role="group" aria-label="Styles" data-style-grid></div><div data-option-groups></div><p class="selected-option" data-selected-option role="status"></p><p class="style-note">Style photos are a reference. Confirm the selected style and size on the buying platform.</p><a class="original-link" href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open on Weidian ↗</a></section>
 </div>
</section>
<section class="source-photos"><h2>QC photos</h2><p>No verified QC photos are available from the catalogue source for this item.</p></section><section class="source-photos" aria-labelledby="source-photos-title"><div class="section-caption"><h2 id="source-photos-title">Catalogue photos</h2><span>${product.images.length}</span></div><p>These are catalogue reference photos; they are not identified as warehouse QC.</p><div class="source-photo-grid">${product.images.map((url,i)=>im(url,i)).join('')}</div></section>

<dialog class="photo-viewer" aria-label="Product photos"><button type="button" data-close-viewer aria-label="Close">×</button><img alt="${escapeHtml(product.title)}"><button type="button" data-viewer-prev aria-label="Previous photo">‹</button><button type="button" data-viewer-next aria-label="Next photo">›</button><p data-viewer-counter></p></dialog>`;
}
const cameraIcon = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5l1.5-2h5L16 5h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="4" stroke="currentColor" stroke-width="1.7"/></svg>';

