// Public seller listings are the source of style images and concrete SKU identifiers.
function readSellerVariants(html, id) {
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
async function loadSellerVariants(id) {
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
function readAgentLinks(html, id) {
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
function agentLinks(id) {
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
function purchasePanel(p, variants, t, esc) {
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

const CHROME={"en": {"header": "<div class=\"topline\"><div class=\"wrap\"><strong>INDEPENDENT GUIDE</strong> · Independent Hipobuy spreadsheet</div></div><header><div class=\"wrap nav\"><div class=\"brand-actions\"><a class=\"register-left\" href=\"https://hipobuy.com/register\" target=\"_blank\" rel=\"noopener noreferrer\" data-track-event=\"hipobuy_register_click\">Register on Hipobuy ↗</a><a class=\"logo\" href=\"/en/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo1.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a></div><nav class=\"navlinks\" aria-label=\"Main navigation\"><a class=\"\" href=\"/en/\">Home</a><a class=\"\" href=\"/en/spreadsheet/\">Spreadsheet</a><a class=\"\" href=\"/en/guide/\">Guide</a><a class=\"\" href=\"/en/qc/\">QC</a><a class=\"\" href=\"/en/shipping/\">Shipping</a><a class=\"\" href=\"/en/faq/\">FAQ</a><a class=\"\" href=\"/en/articles/\">Articles</a></nav><a class=\"search-camera\" href=\"/en/catalog/image-search/\" aria-label=\"Search by image\" title=\"Search by image\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><path d=\"M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/></svg></a><select class=\"langs\" id=\"language\" aria-label=\"Language\"><option value=\"/en/__CATALOG__/\" selected>EN</option><option value=\"/de/__CATALOG__/\" >DE</option><option value=\"/es/__CATALOG__/\" >ES</option><option value=\"/fr/__CATALOG__/\" >FR</option><option value=\"/it/__CATALOG__/\" >IT</option></select><span class=\"fx-control\"><select data-currency-select aria-label=\"Currency\"><option value=\"USD\">USD</option><option value=\"CNY\">CNY</option><option value=\"EUR\">EUR</option><option value=\"GBP\">GBP</option><option value=\"CAD\">CAD</option><option value=\"AUD\">AUD</option><option value=\"HKD\">HKD</option><option value=\"JPY\">JPY</option><option value=\"KRW\">KRW</option><option value=\"BRL\">BRL</option><option value=\"CHF\">CHF</option><option value=\"CZK\">CZK</option><option value=\"DKK\">DKK</option><option value=\"HUF\">HUF</option><option value=\"IDR\">IDR</option><option value=\"ILS\">ILS</option><option value=\"INR\">INR</option><option value=\"ISK\">ISK</option><option value=\"MXN\">MXN</option><option value=\"MYR\">MYR</option><option value=\"NOK\">NOK</option><option value=\"NZD\">NZD</option><option value=\"PHP\">PHP</option><option value=\"PLN\">PLN</option><option value=\"RON\">RON</option><option value=\"SEK\">SEK</option><option value=\"SGD\">SGD</option><option value=\"THB\">THB</option><option value=\"TRY\">TRY</option><option value=\"ZAR\">ZAR</option><option value=\"TWD\">TWD</option><option value=\"VND\">VND</option></select><span data-fx-error hidden role=\"status\">Exchange rates unavailable. Prices shown in USD.</span></span></div></header>", "footer": "<footer class=\"foot\"><div class=\"wrap\"><div class=\"foot-grid\"><div><a class=\"logo\" href=\"/en/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo2.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a><p>Independent Hipobuy finds directory. Registration, purchases, payments and order support are handled on hipobuy.com.</p></div><nav><a href=\"/en/spreadsheet/\">Spreadsheet</a><a href=\"/en/guide/\">Guide</a><a href=\"/en/qc/\">QC</a><a href=\"/en/shipping/\">Shipping</a><a href=\"/en/faq/\">FAQ</a><a href=\"/en/articles/\">Articles</a></nav></div><div class=\"foot-base\"><a href=\"https://www.exchangerate-api.com/\" rel=\"external noopener\">Exchange rates by ExchangeRate-API</a> · © 2026 Hipobuyy Sheet · Independent discovery resource</div></div></footer>"}, "de": {"header": "<div class=\"topline\"><div class=\"wrap\"><strong>UNABHÄNGIGER RATGEBER</strong> · Unabhängige Hipobuy Tabelle</div></div><header><div class=\"wrap nav\"><div class=\"brand-actions\"><a class=\"register-left\" href=\"https://hipobuy.com/register\" target=\"_blank\" rel=\"noopener noreferrer\" data-track-event=\"hipobuy_register_click\">Bei Hipobuy registrieren ↗</a><a class=\"logo\" href=\"/de/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo1.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a></div><nav class=\"navlinks\" aria-label=\"Hauptnavigation\"><a class=\"\" href=\"/de/\">Start</a><a class=\"\" href=\"/de/spreadsheet/\">Tabelle</a><a class=\"\" href=\"/de/guide/\">Anleitung</a><a class=\"\" href=\"/de/qc/\">QC</a><a class=\"\" href=\"/de/shipping/\">Versand</a><a class=\"\" href=\"/de/faq/\">Hinweise</a><a class=\"\" href=\"/de/articles/\">Artikel</a></nav><a class=\"search-camera\" href=\"/de/catalog/image-search/\" aria-label=\"Bildersuche\" title=\"Bildersuche\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><path d=\"M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/></svg></a><select class=\"langs\" id=\"language\" aria-label=\"Language\"><option value=\"/en/__CATALOG__/\" >EN</option><option value=\"/de/__CATALOG__/\" selected>DE</option><option value=\"/es/__CATALOG__/\" >ES</option><option value=\"/fr/__CATALOG__/\" >FR</option><option value=\"/it/__CATALOG__/\" >IT</option></select><span class=\"fx-control\"><select data-currency-select aria-label=\"Currency\"><option value=\"USD\">USD</option><option value=\"CNY\">CNY</option><option value=\"EUR\">EUR</option><option value=\"GBP\">GBP</option><option value=\"CAD\">CAD</option><option value=\"AUD\">AUD</option><option value=\"HKD\">HKD</option><option value=\"JPY\">JPY</option><option value=\"KRW\">KRW</option><option value=\"BRL\">BRL</option><option value=\"CHF\">CHF</option><option value=\"CZK\">CZK</option><option value=\"DKK\">DKK</option><option value=\"HUF\">HUF</option><option value=\"IDR\">IDR</option><option value=\"ILS\">ILS</option><option value=\"INR\">INR</option><option value=\"ISK\">ISK</option><option value=\"MXN\">MXN</option><option value=\"MYR\">MYR</option><option value=\"NOK\">NOK</option><option value=\"NZD\">NZD</option><option value=\"PHP\">PHP</option><option value=\"PLN\">PLN</option><option value=\"RON\">RON</option><option value=\"SEK\">SEK</option><option value=\"SGD\">SGD</option><option value=\"THB\">THB</option><option value=\"TRY\">TRY</option><option value=\"ZAR\">ZAR</option><option value=\"TWD\">TWD</option><option value=\"VND\">VND</option></select><span data-fx-error hidden role=\"status\">Exchange rates unavailable. Prices shown in USD.</span></span></div></header>", "footer": "<footer class=\"foot\"><div class=\"wrap\"><div class=\"foot-grid\"><div><a class=\"logo\" href=\"/de/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo2.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a><p>Unabhängiges Hipobuy-Verzeichnis. Registrierung, Kauf, Zahlung und Bestellhilfe erfolgen auf hipobuy.com.</p></div><nav><a href=\"/de/spreadsheet/\">Tabelle</a><a href=\"/de/guide/\">Anleitung</a><a href=\"/de/qc/\">QC</a><a href=\"/de/shipping/\">Versand</a><a href=\"/de/faq/\">Hinweise</a><a href=\"/de/articles/\">Artikel</a></nav></div><div class=\"foot-base\"><a href=\"https://www.exchangerate-api.com/\" rel=\"external noopener\">Exchange rates by ExchangeRate-API</a> · © 2026 Hipobuyy Sheet · Unabhängige Produktsuche</div></div></footer>"}, "es": {"header": "<div class=\"topline\"><div class=\"wrap\"><strong>GUÍA INDEPENDIENTE</strong> · Hoja independiente de Hipobuy</div></div><header><div class=\"wrap nav\"><div class=\"brand-actions\"><a class=\"register-left\" href=\"https://hipobuy.com/register\" target=\"_blank\" rel=\"noopener noreferrer\" data-track-event=\"hipobuy_register_click\">Registrarse en Hipobuy ↗</a><a class=\"logo\" href=\"/es/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo1.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a></div><nav class=\"navlinks\" aria-label=\"Navegación principal\"><a class=\"\" href=\"/es/\">Inicio</a><a class=\"\" href=\"/es/spreadsheet/\">Hoja</a><a class=\"\" href=\"/es/guide/\">Guía</a><a class=\"\" href=\"/es/qc/\">QC</a><a class=\"\" href=\"/es/shipping/\">Envío</a><a class=\"\" href=\"/es/faq/\">Notas</a><a class=\"\" href=\"/es/articles/\">Artículos</a></nav><a class=\"search-camera\" href=\"/es/catalog/image-search/\" aria-label=\"Buscar por imagen\" title=\"Buscar por imagen\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><path d=\"M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/></svg></a><select class=\"langs\" id=\"language\" aria-label=\"Language\"><option value=\"/en/__CATALOG__/\" >EN</option><option value=\"/de/__CATALOG__/\" >DE</option><option value=\"/es/__CATALOG__/\" selected>ES</option><option value=\"/fr/__CATALOG__/\" >FR</option><option value=\"/it/__CATALOG__/\" >IT</option></select><span class=\"fx-control\"><select data-currency-select aria-label=\"Currency\"><option value=\"USD\">USD</option><option value=\"CNY\">CNY</option><option value=\"EUR\">EUR</option><option value=\"GBP\">GBP</option><option value=\"CAD\">CAD</option><option value=\"AUD\">AUD</option><option value=\"HKD\">HKD</option><option value=\"JPY\">JPY</option><option value=\"KRW\">KRW</option><option value=\"BRL\">BRL</option><option value=\"CHF\">CHF</option><option value=\"CZK\">CZK</option><option value=\"DKK\">DKK</option><option value=\"HUF\">HUF</option><option value=\"IDR\">IDR</option><option value=\"ILS\">ILS</option><option value=\"INR\">INR</option><option value=\"ISK\">ISK</option><option value=\"MXN\">MXN</option><option value=\"MYR\">MYR</option><option value=\"NOK\">NOK</option><option value=\"NZD\">NZD</option><option value=\"PHP\">PHP</option><option value=\"PLN\">PLN</option><option value=\"RON\">RON</option><option value=\"SEK\">SEK</option><option value=\"SGD\">SGD</option><option value=\"THB\">THB</option><option value=\"TRY\">TRY</option><option value=\"ZAR\">ZAR</option><option value=\"TWD\">TWD</option><option value=\"VND\">VND</option></select><span data-fx-error hidden role=\"status\">Exchange rates unavailable. Prices shown in USD.</span></span></div></header>", "footer": "<footer class=\"foot\"><div class=\"wrap\"><div class=\"foot-grid\"><div><a class=\"logo\" href=\"/es/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo2.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a><p>Directorio independiente de Hipobuy. El registro, las compras, los pagos y la asistencia de pedidos se gestionan en hipobuy.com.</p></div><nav><a href=\"/es/spreadsheet/\">Hoja</a><a href=\"/es/guide/\">Guía</a><a href=\"/es/qc/\">QC</a><a href=\"/es/shipping/\">Envío</a><a href=\"/es/faq/\">Notas</a><a href=\"/es/articles/\">Artículos</a></nav></div><div class=\"foot-base\"><a href=\"https://www.exchangerate-api.com/\" rel=\"external noopener\">Exchange rates by ExchangeRate-API</a> · © 2026 Hipobuyy Sheet · Directorio independiente</div></div></footer>"}, "fr": {"header": "<div class=\"topline\"><div class=\"wrap\"><strong>GUIDE INDÉPENDANT</strong> · Tableau Hipobuy indépendant</div></div><header><div class=\"wrap nav\"><div class=\"brand-actions\"><a class=\"register-left\" href=\"https://hipobuy.com/register\" target=\"_blank\" rel=\"noopener noreferrer\" data-track-event=\"hipobuy_register_click\">S’inscrire sur Hipobuy ↗</a><a class=\"logo\" href=\"/fr/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo1.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a></div><nav class=\"navlinks\" aria-label=\"Navigation principale\"><a class=\"\" href=\"/fr/\">Accueil</a><a class=\"\" href=\"/fr/spreadsheet/\">Tableau</a><a class=\"\" href=\"/fr/guide/\">Guide</a><a class=\"\" href=\"/fr/qc/\">QC</a><a class=\"\" href=\"/fr/shipping/\">Livraison</a><a class=\"\" href=\"/fr/faq/\">Repères</a><a class=\"\" href=\"/fr/articles/\">Articles</a></nav><a class=\"search-camera\" href=\"/fr/catalog/image-search/\" aria-label=\"Recherche par image\" title=\"Recherche par image\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><path d=\"M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/></svg></a><select class=\"langs\" id=\"language\" aria-label=\"Language\"><option value=\"/en/__CATALOG__/\" >EN</option><option value=\"/de/__CATALOG__/\" >DE</option><option value=\"/es/__CATALOG__/\" >ES</option><option value=\"/fr/__CATALOG__/\" selected>FR</option><option value=\"/it/__CATALOG__/\" >IT</option></select><span class=\"fx-control\"><select data-currency-select aria-label=\"Currency\"><option value=\"USD\">USD</option><option value=\"CNY\">CNY</option><option value=\"EUR\">EUR</option><option value=\"GBP\">GBP</option><option value=\"CAD\">CAD</option><option value=\"AUD\">AUD</option><option value=\"HKD\">HKD</option><option value=\"JPY\">JPY</option><option value=\"KRW\">KRW</option><option value=\"BRL\">BRL</option><option value=\"CHF\">CHF</option><option value=\"CZK\">CZK</option><option value=\"DKK\">DKK</option><option value=\"HUF\">HUF</option><option value=\"IDR\">IDR</option><option value=\"ILS\">ILS</option><option value=\"INR\">INR</option><option value=\"ISK\">ISK</option><option value=\"MXN\">MXN</option><option value=\"MYR\">MYR</option><option value=\"NOK\">NOK</option><option value=\"NZD\">NZD</option><option value=\"PHP\">PHP</option><option value=\"PLN\">PLN</option><option value=\"RON\">RON</option><option value=\"SEK\">SEK</option><option value=\"SGD\">SGD</option><option value=\"THB\">THB</option><option value=\"TRY\">TRY</option><option value=\"ZAR\">ZAR</option><option value=\"TWD\">TWD</option><option value=\"VND\">VND</option></select><span data-fx-error hidden role=\"status\">Exchange rates unavailable. Prices shown in USD.</span></span></div></header>", "footer": "<footer class=\"foot\"><div class=\"wrap\"><div class=\"foot-grid\"><div><a class=\"logo\" href=\"/fr/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo2.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a><p>Répertoire Hipobuy indépendant. Inscription, achats, paiements et suivi des commandes se font sur hipobuy.com.</p></div><nav><a href=\"/fr/spreadsheet/\">Tableau</a><a href=\"/fr/guide/\">Guide</a><a href=\"/fr/qc/\">QC</a><a href=\"/fr/shipping/\">Livraison</a><a href=\"/fr/faq/\">Repères</a><a href=\"/fr/articles/\">Articles</a></nav></div><div class=\"foot-base\"><a href=\"https://www.exchangerate-api.com/\" rel=\"external noopener\">Exchange rates by ExchangeRate-API</a> · © 2026 Hipobuyy Sheet · Répertoire indépendant</div></div></footer>"}, "it": {"header": "<div class=\"topline\"><div class=\"wrap\"><strong>GUIDA INDIPENDENTE</strong> · Tabella Hipobuy indipendente</div></div><header><div class=\"wrap nav\"><div class=\"brand-actions\"><a class=\"register-left\" href=\"https://hipobuy.com/register\" target=\"_blank\" rel=\"noopener noreferrer\" data-track-event=\"hipobuy_register_click\">Registrati su Hipobuy ↗</a><a class=\"logo\" href=\"/it/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo1.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a></div><nav class=\"navlinks\" aria-label=\"Navigazione principale\"><a class=\"\" href=\"/it/\">Home</a><a class=\"\" href=\"/it/spreadsheet/\">Tabella</a><a class=\"\" href=\"/it/guide/\">Guida</a><a class=\"\" href=\"/it/qc/\">QC</a><a class=\"\" href=\"/it/shipping/\">Spedizione</a><a class=\"\" href=\"/it/faq/\">Note</a><a class=\"\" href=\"/it/articles/\">Articoli</a></nav><a class=\"search-camera\" href=\"/it/catalog/image-search/\" aria-label=\"Ricerca per immagine\" title=\"Ricerca per immagine\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><path d=\"M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.5\"/></svg></a><select class=\"langs\" id=\"language\" aria-label=\"Language\"><option value=\"/en/__CATALOG__/\" >EN</option><option value=\"/de/__CATALOG__/\" >DE</option><option value=\"/es/__CATALOG__/\" >ES</option><option value=\"/fr/__CATALOG__/\" >FR</option><option value=\"/it/__CATALOG__/\" selected>IT</option></select><span class=\"fx-control\"><select data-currency-select aria-label=\"Currency\"><option value=\"USD\">USD</option><option value=\"CNY\">CNY</option><option value=\"EUR\">EUR</option><option value=\"GBP\">GBP</option><option value=\"CAD\">CAD</option><option value=\"AUD\">AUD</option><option value=\"HKD\">HKD</option><option value=\"JPY\">JPY</option><option value=\"KRW\">KRW</option><option value=\"BRL\">BRL</option><option value=\"CHF\">CHF</option><option value=\"CZK\">CZK</option><option value=\"DKK\">DKK</option><option value=\"HUF\">HUF</option><option value=\"IDR\">IDR</option><option value=\"ILS\">ILS</option><option value=\"INR\">INR</option><option value=\"ISK\">ISK</option><option value=\"MXN\">MXN</option><option value=\"MYR\">MYR</option><option value=\"NOK\">NOK</option><option value=\"NZD\">NZD</option><option value=\"PHP\">PHP</option><option value=\"PLN\">PLN</option><option value=\"RON\">RON</option><option value=\"SEK\">SEK</option><option value=\"SGD\">SGD</option><option value=\"THB\">THB</option><option value=\"TRY\">TRY</option><option value=\"ZAR\">ZAR</option><option value=\"TWD\">TWD</option><option value=\"VND\">VND</option></select><span data-fx-error hidden role=\"status\">Exchange rates unavailable. Prices shown in USD.</span></span></div></header>", "footer": "<footer class=\"foot\"><div class=\"wrap\"><div class=\"foot-grid\"><div><a class=\"logo\" href=\"/it/\" aria-label=\"Hipobuyy Sheet\"><span class=\"logo-image-shell\"><img class=\"logo-image\" src=\"/assets/hipobuy-official-logo2.png\" width=\"244\" height=\"56\" alt=\"HIPOBUY\"></span></a><p>Catalogo Hipobuy indipendente. Registrazione, acquisti, pagamenti e assistenza ordini avvengono su hipobuy.com.</p></div><nav><a href=\"/it/spreadsheet/\">Tabella</a><a href=\"/it/guide/\">Guida</a><a href=\"/it/qc/\">QC</a><a href=\"/it/shipping/\">Spedizione</a><a href=\"/it/faq/\">Note</a><a href=\"/it/articles/\">Articoli</a></nav></div><div class=\"foot-base\"><a href=\"https://www.exchangerate-api.com/\" rel=\"external noopener\">Exchange rates by ExchangeRate-API</a> · © 2026 Hipobuyy Sheet · Catalogo indipendente</div></div></footer>"}};
function nav(lang,path,query=''){return CHROME[lang].header.replaceAll('__CATALOG__/',path.replace(/^\//,'')+query)}
function footer(lang){return CHROME[lang].footer}

// Buyer decisions beside a real source listing; no inferred material or QC claims.
const PRODUCT_GUIDE_COPY = {
 en:['Before you buy','Original Weidian listing','Images in this gallery','Match the exact size, colour and version on the seller listing. Gallery images do not establish the condition of your own warehouse order.','The displayed USD item price excludes international shipping. Confirm current options, domestic delivery and the final parcel quote.','Check warehouse QC photos','Plan shipping weight and cost','Understand product links and IDs','Compare jacket sizes and packing'],
 de:['Vor dem Kauf','Ursprüngliches Weidian-Angebot','Bilder in dieser Galerie','Vergleiche genaue Größe, Farbe und Version im Verkäuferangebot. Galeriebilder belegen nicht den Zustand deiner eigenen Lagerbestellung.','Der angezeigte USD-Warenpreis enthält keinen internationalen Versand. Prüfe aktuelle Varianten, Inlandslieferung und endgültiges Paketangebot.','Lager-QC-Fotos prüfen','Versandgewicht und Kosten planen','Produktlinks und IDs verstehen','Jackengrößen und Verpackung vergleichen'],
 es:['Antes de comprar','Anuncio original de Weidian','Imágenes de esta galería','Comprueba talla, color y versión exactos en el anuncio. Las imágenes de la galería no demuestran el estado de tu propio pedido en el almacén.','El precio del artículo en USD excluye envío internacional. Confirma opciones actuales, entrega nacional y presupuesto final del paquete.','Revisa las fotos QC del almacén','Planifica peso y coste del envío','Comprende enlaces e identificadores','Compara tallas y embalaje de chaquetas'],
 fr:['Avant l’achat','Annonce Weidian d’origine','Images de cette galerie','Comparez taille, couleur et version exactes sur l’annonce. Les images ne prouvent pas l’état de votre propre commande en entrepôt.','Le prix de l’article en USD exclut le transport international. Vérifiez options actuelles, livraison intérieure et devis final du colis.','Vérifier les photos QC en entrepôt','Prévoir poids et coût de livraison','Comprendre les liens et identifiants','Comparer tailles et emballage des vestes'],
 it:['Prima dell’acquisto','Annuncio originale Weidian','Immagini di questa galleria','Confronta taglia, colore e versione esatti nell’annuncio. Le immagini non dimostrano lo stato del tuo ordine personale in magazzino.','Il prezzo del prodotto in USD esclude la spedizione internazionale. Conferma opzioni, consegna nazionale e preventivo finale del pacco.','Controlla le foto QC del magazzino','Pianifica peso e costo di spedizione','Comprendi link e identificatori','Confronta taglie e imballaggio delle giacche']
};
function productHelp(lang,category,product,escapeHtml) {
 const t=PRODUCT_GUIDE_COPY[lang]||PRODUCT_GUIDE_COPY.en;
 const links=[['qc-photo-checklist',t[5]],['hipobuy-shipping-calculator',t[6]],category==='jackets'?['hipobuy-jacket-finds',t[8]]:['hipobuy-product-links',t[7]]];
 const source=/^https:\/\/weidian\.com\//.test(product.sourceUrl)?`<a href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">${t[1]} ↗</a>`:'';
 return `<div class="product-evidence"><p>${source}</p><p>${t[2]}: ${product.images.length}</p><p>${t[3]}</p><p>${t[4]}</p></div><nav class="product-guide-links" aria-label="${t[0]}"><strong>${t[0]}</strong>${links.map(([slug,label])=>`<a href="/${lang}/articles/${slug}/">${label} →</a>`).join('')}</nav>`;
}

function categoryHelp(lang) {
 const t=PRODUCT_GUIDE_COPY[lang]||PRODUCT_GUIDE_COPY.en;
 const links=[['hipobuy-product-links',t[7]],['qc-photo-checklist',t[5]],['hipobuy-shipping-calculator',t[6]]];
 return `<nav class="category-guide-links" aria-label="${t[0]}"><strong>${t[0]}</strong>${links.map(([slug,label])=>`<a href="/${lang}/articles/${slug}/">${label} →</a>`).join('')}</nav>`;
}

// Public catalogue adapter. All catalogue reads come from cnbuycha.com.
const DATA_ORIGIN = 'https://cnbuycha.com';
const REGISTER_URL = 'https://hipobuy.com/register';
const CATEGORIES = ['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const LANGS = ['en','es','de','fr','it'];
const COPY = {
 en: ['Products & QC photos','Search products or source ID','Search','Latest','Popular','Price: low to high','Search by image','Browse the full spreadsheet','Product photos / QC','Open in Hipobuy','Register on Hipobuy','Previous','Next','No products found. Try another keyword.','Product ID','Product images from the source catalogue. Check the exact item, option and photo context before buying.','Choose an image to find visually similar catalogue products. Images are compared on your device.','Related products','All products','Image search compares visual similarity; it does not confirm an identical item.','Catalogue temporarily unavailable. Please try again.'],
 de: ['Produkte & QC-Bilder','Produkte oder Artikel-ID suchen','Suchen','Neueste','Beliebt','Preis: aufsteigend','Bildersuche','Das komplette Spreadsheet ansehen','Produktbilder / QC','Bei Hipobuy öffnen','Bei Hipobuy registrieren','Zurück','Weiter','Keine Produkte gefunden. Versuche einen anderen Suchbegriff.','Artikel-ID','Bilder aus dem Quellkatalog. Prüfe den genauen Artikel, die Variante und den Bildkontext vor dem Kauf.','Wähle ein Bild für ähnliche Produkte aus dem Katalog. Der Vergleich erfolgt auf deinem Gerät.','Ähnliche Produkte','Alle Produkte','Visuelle Ähnlichkeit bestätigt nicht, dass es derselbe Artikel ist.','Katalog vorübergehend nicht verfügbar. Bitte erneut versuchen.'],
 pl: ['Produkty i zdjęcia QC','Szukaj produktu lub ID','Szukaj','Najnowsze','Popularne','Cena: rosnąco','Szukaj obrazem','Przeglądaj cały spreadsheet','Zdjęcia produktu / QC','Otwórz w Hipobuy','Zarejestruj się w Hipobuy','Wstecz','Dalej','Brak produktów. Spróbuj innego hasła.','ID produktu','Zdjęcia z katalogu źródłowego. Przed zakupem sprawdź produkt, wariant i kontekst zdjęć.','Wybierz zdjęcie, aby znaleźć podobne produkty. Porównanie odbywa się na Twoim urządzeniu.','Podobne produkty','Wszystkie produkty','Podobieństwo zdjęć nie potwierdza identyczności produktu.','Katalog jest chwilowo niedostępny. Spróbuj ponownie.'],
 'pt': ['Produtos e fotos QC','Buscar produto ou ID','Buscar','Novidades','Populares','Preço: menor primeiro','Buscar por imagem','Explorar a planilha completa','Fotos do produto / QC','Abrir no Hipobuy','Cadastrar no Hipobuy','Anterior','Próxima','Nenhum produto encontrado. Tente outra palavra.','ID do produto','Imagens do catálogo de origem. Confira o item, a opção e o contexto das fotos antes de comprar.','Escolha uma imagem para encontrar produtos semelhantes. A comparação ocorre no seu dispositivo.','Produtos relacionados','Todos os produtos','Semelhança visual não confirma que seja o mesmo produto.','Catálogo temporariamente indisponível. Tente novamente.']
};
COPY.es = ["Productos y fotos QC", "Buscar productos o ID de origen", "Buscar", "Novedades", "Populares", "Precio: de menor a mayor", "Buscar por imagen", "Explorar la hoja completa", "Fotos del producto / QC", "Abrir en Hipobuy", "Registrarse en Hipobuy", "Anterior", "Siguiente", "No se encontraron productos. Prueba otra palabra.", "ID del producto", "Imágenes del catálogo de origen. Comprueba el artículo, la variante y el contexto de las fotos antes de comprar.", "Elige una imagen para buscar productos visualmente similares. La comparación se realiza en tu dispositivo.", "Productos relacionados", "Todos los productos", "La similitud visual no confirma que sea el mismo artículo.", "Catálogo no disponible temporalmente. Inténtalo de nuevo."];
COPY.fr = ["Produits et photos QC", "Rechercher un produit ou son ID", "Rechercher", "Nouveautés", "Populaires", "Prix croissant", "Recherche par image", "Voir tout le spreadsheet", "Photos du produit / QC", "Ouvrir sur Hipobuy", "S’inscrire sur Hipobuy", "Précédent", "Suivant", "Aucun produit trouvé. Essayez un autre mot.", "ID du produit", "Images du catalogue source. Vérifiez le produit, la variante et le contexte des photos avant tout achat.", "Choisissez une image pour rechercher des produits similaires. La comparaison se fait sur votre appareil.", "Produits associés", "Tous les produits", "La ressemblance visuelle ne confirme pas qu’il s’agit du même article.", "Catalogue temporairement indisponible. Réessayez."];
COPY.it = ["Prodotti e foto QC", "Cerca prodotti o ID originale", "Cerca", "Novità", "Popolari", "Prezzo crescente", "Ricerca per immagine", "Esplora tutto lo spreadsheet", "Foto del prodotto / QC", "Apri su Hipobuy", "Registrati su Hipobuy", "Precedente", "Successivo", "Nessun prodotto trovato. Prova un’altra parola.", "ID prodotto", "Immagini dal catalogo originale. Controlla articolo, variante e contesto delle foto prima dell’acquisto.", "Scegli un’immagine per trovare prodotti simili. Il confronto avviene sul tuo dispositivo.", "Prodotti correlati", "Tutti i prodotti", "La somiglianza visiva non conferma che sia lo stesso articolo.", "Catalogo temporaneamente non disponibile. Riprova."];
const CATEGORY_LABELS = {
 fr:["Tous les produits", "Chaussures", "Sweats à capuche", "T-shirts", "Vestes", "Pantalons / Shorts", "Chapeaux", "Accessoires", "Ensembles", "Électronique", "Autres", "Maillots"],
 it:["Tutti i prodotti", "Scarpe", "Felpe", "T-shirt", "Giacche", "Pantaloni / Shorts", "Cappelli", "Accessori", "Completi", "Elettronica", "Altro", "Maglie sportive"],
 es:["Todos", "Calzado", "Sudaderas", "Camisetas", "Chaquetas", "Pantalones / Shorts", "Gorras", "Accesorios", "Conjuntos", "Electrónica", "Otros", "Camisetas deportivas"],
 en:['All products','Shoes','Hoodies','T-Shirts','Jackets','Pants / Shorts','Headwear','Accessories','Short Sets','Electronics','Other','Jerseys'],
 de:['Alle Produkte','Schuhe','Hoodies','T-Shirts','Jacken','Hosen / Shorts','Kopfbedeckungen','Accessoires','Sets','Elektronik','Weitere','Trikots'],
 pl:['Wszystkie','Buty','Bluzy','T-shirty','Kurtki','Spodnie / Szorty','Czapki','Akcesoria','Zestawy','Elektronika','Inne','Koszulki sportowe'],
 'pt':['Todos','Calçados','Moletons','Camisetas','Jaquetas','Calças / Shorts','Bonés','Acessórios','Conjuntos','Eletrônicos','Outros','Camisas esportivas']
};
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,x)=>String.fromCodePoint(x[0].toLowerCase()==='x'?parseInt(x.slice(1),16):Number(x))).replace(/&(amp|quot|apos|lt|gt);/g,(_,x)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[x]));
const textOnly = s => decode(String(s||'').replace(/<[^>]*>/g,''));
const first = (s,re) => decode(s.match(re)?.[1]||'');
function imageUrl(raw) {
 try { const u=new URL(decode(raw),DATA_ORIGIN); return u.protocol==='https:'?u.href:''; } catch {return '';}
}
function parseList(html) {
 const products=[];
 for(const m of html.matchAll(/<article class="product-card[^>]*>([\s\S]*?)<\/article>/g)) {
  const b=m[1], path=first(b,/<a href="([^"]+)"/);
  if(!/^\/[a-z0-9-]+\/\d+\.html$/i.test(path))continue;
  products.push({path,title:textOnly(first(b,/<h3>([\s\S]*?)<\/h3>/)),image:imageUrl(first(b,/<img[^>]+src="([^"]+)"/)),price:first(b,/data-currency="USD"[^>]*>([\d.]+)/),views:Number(first(b,/product-views[^>]*>[\s\S]*?<span>(\d+)<\/span>/))});
 }
 const total=Number(first(html,/<div class="results-summary">([\d,]+) products/).replaceAll(',',''));
 const pages=Math.max(1,Math.ceil(total/60));
 return {products,pages,total};
}
function parseDetail(html) {
 const section=html.split('<section class="product-detail"')[1]?.split('</section>')[0]||'';
 const sourceUrl=first(section,/href="(https:\/\/weidian\.com\/[^\"]+)"/);
 const id=sourceUrl?new URL(sourceUrl).searchParams.get('itemID')||'':'';
 const images=[...section.matchAll(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/g)].map(m=>imageUrl(m[1])).filter(Boolean);
 return {title:textOnly(first(section,/<h1[^>]*>([\s\S]*?)<\/h1>/)),sourceId:id,price:first(section,/<meta itemprop="price" content="([^"]+)"/),images:[...new Set(images)],sourceUrl,agentLinks:readAgentLinks(html,id),related:parseList(html).products};
}
// Hipobuy accepts the original Weidian item ID, not the catalogue row ID.
function buyUrl(sourceId) {
 if(!/^\d{5,20}$/.test(String(sourceId)))return null;
 return 'https://hipobuy.com/product/weidian/'+sourceId;
}
const prefix=lang=>`/${lang}`;
const base=lang=>`${prefix(lang)}/catalog`;
const localPath=(path,lang)=>`${base(lang)}${path==='/AllProducts/'?'/':path}`;
const money=p=>Number.isFinite(Number(p))&&p!==''?'$'+Number(p).toFixed(2):'—';
const labels=lang=>COPY[lang]||COPY.en;
function shell(lang,path,title,description,body,{noindex=false,status=200,query=''}={}) {
 const canonical='https://hipobuyy-sheet.com'+prefix(lang)+path;
 const crumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Hipobuy Spreadsheet',item:'https://hipobuyy-sheet.com/'+lang+'/'},{'@type':'ListItem',position:2,name:title,item:canonical}]};
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Hipobuy Spreadsheet</title><meta name="description" content="${escapeHtml(description)}"><script type="application/ld+json">${JSON.stringify(crumbs).replaceAll('<','\\u003c')}</script><meta name="robots" content="${noindex?'noindex,follow':'index, follow'}"><link rel="canonical" href="${canonical}">${LANGS.map(l=>`<link rel="alternate" hreflang="${l}" href="https://hipobuyy-sheet.com${prefix(l)}${path}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://hipobuyy-sheet.com/en${path}"><link rel="icon" href="/assets/hipobuy-favicon.png"><link rel="stylesheet" href="/assets/catalog.css?v=20261012"><link rel="stylesheet" href="/assets/site.css?v=20261027-search"><script src="/assets/site.js?v=20261027-search" defer></script><script src="/assets/catalog.js?v=20261027-search" defer></script><link rel="stylesheet" href="/assets/mobile-inner.css?v=20261013-mobile-1"><script defer src="/assets/mobile-inner.js?v=20261013-mobile-1"></script><link rel="stylesheet" href="/assets/purchase.css?v=1"><script defer src="/assets/purchase.js?v=1"></script></head><body class="catalog-page mobile-inner">${nav(lang,path,query)}<main class="catalog-main" data-locale="${lang}">${body}</main>${footer(lang)}</body></html>`;
 return new Response(html,{status,headers:{'content-type':'text/html; charset=utf-8','content-language':lang,'cache-control':status>=400?'no-store':'public, max-age=0, s-maxage=60','x-content-type-options':'nosniff','x-catalog-source':DATA_ORIGIN,'x-hipobuy-release':'20261017-five-language-seo'}});
}
function card(p,lang) {
 return `<article class="catalog-card"><a href="${localPath(p.path,lang)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" width="400" height="400" loading="lazy"><h2>${escapeHtml(p.title)}</h2><div class="card-meta"><strong data-usd="${escapeHtml(p.price)}">${money(p.price)}</strong><span>${({en:'Photos',de:'Bilder',es:'Fotos',fr:'Photos',it:'Foto'})[lang]} ↗</span></div></a></article>`;
}
function searchForm(lang,q='',category='AllProducts',sort='new') {
 const t=labels(lang);
 return `<form class="catalog-search" action="${localPath('/'+category+'/',lang)}" method="get" role="search"><label class="sr-only" for="catalog-query">${t[1]}</label><input id="catalog-query" name="q" value="${escapeHtml(q)}" placeholder="${t[1]}" type="search" maxlength="100"><input type="hidden" name="sort" value="${sort}"><button>${t[2]} →</button></form>`;
}
async function upstream(path,params) {
 const u=new URL(path,DATA_ORIGIN);if(params)u.search=params.toString();
 const r=await fetch(u.href,{headers:{accept:'text/html'},redirect:'follow',signal:AbortSignal.timeout(18000)});
 if(new URL(r.url||u.href).origin!==DATA_ORIGIN)throw new Error('Unexpected catalogue destination');
 if(!r.ok){const error=new Error('Catalogue response '+r.status);error.status=r.status;throw error;}
 return r.text();
}
async function catalogueRoute(request,env) {
 const url=new URL(request.url),match=url.pathname.match(/^\/(?:(en|es|de|fr|it)\/)?catalog(?:\/(.*))?$/);
 if(url.pathname==='/api/image-search/results') {
  const paths=url.searchParams.getAll('p');
  if(paths.length>24||paths.some(p=>!/^\/[a-z0-9-]+\/\d+\.html$/.test(p)))return Response.json({error:'Invalid path'},{status:400});
  const response=await env.ASSETS.fetch(new Request(new URL('/assets/image-search-names.json',url)));
  if(!response.ok)return Response.json({error:'Index unavailable'},{status:503});
  const names=await response.json();
  if(paths.some(p=>!Object.hasOwn(names,p)))return Response.json({error:'Index updated'},{status:409});
  return Response.json({titles:paths.map(p=>names[p])},{headers:{'cache-control':'public,max-age=300'}});
 }
 if(url.pathname==='/api/catalog') {
  if(request.method!=='GET')return new Response(null,{status:405});
  try{const q=new URLSearchParams();for(const k of ['q','sort','page'])if(url.searchParams.has(k))q.set(k,url.searchParams.get(k).slice(0,100));
   const result=parseList(await upstream('/AllProducts/',q));return Response.json(result,{headers:{'cache-control':'public, max-age=60'}});
  }catch{return Response.json({error:'Catalogue unavailable'},{status:502});}
 }
 if(!match)return null;
 if(!match[1])return Response.redirect(url.origin+'/en'+url.pathname+url.search,308);
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
 const lang=match[1]||'en',tail=match[2]||'',t=labels(lang),path='/catalog/'+tail;
 if(!url.pathname.endsWith('/')&&!tail.endsWith('.html'))return Response.redirect(url.origin+url.pathname+'/'+url.search,308);
 if(tail==='AllProducts/')return Response.redirect(url.origin+base(lang)+'/'+url.search,301);
 if(tail==='search.html') {
  const destination=new URL(base(lang)+'/',url.origin);destination.search=url.search;
  destination.searchParams.set('q',destination.searchParams.get('keywords')||destination.searchParams.get('q')||'');
  destination.searchParams.delete('keywords');destination.searchParams.delete('channelid');
  return Response.redirect(destination.href,302);
 }
 if(tail==='image-search/') {
  return shell(lang,path,`Hipobuy ${t[6]}`,t[16],`<p class="catalog-eyebrow">HIPOBUY SPREADSHEET</p><h1>${t[6]}</h1><p>${t[16]}</p><section class="image-search-panel"><label for="image-file" class="image-drop">${t[6]}<input id="image-file" type="file" data-i18n-indexed="Indexed products" data-i18n-images="Searchable images" data-i18n-searching="Searching catalogue images…" data-i18n-format="Choose a JPEG, PNG or WebP under 10 MB." data-i18n-failure="Image search is temporarily unavailable. Please try again." data-i18n-matches="Matching products" data-i18n-empty="No similar products found." accept="image/jpeg,image/png,image/webp"></label><img id="image-preview" alt="" hidden><p id="image-status" role="status" aria-live="polite"></p><p class="catalog-note">${t[19]}</p></section><div class="catalog-grid" id="image-results"></div>`,{noindex:true});
 }
 try {
  if(/^[a-z0-9-]+\/\d+\.html$/i.test(tail)) {
   const product=parseDetail(await upstream('/'+tail));if(!product.title)return shell(lang,path,'Product unavailable','',`<h1>${t[13]}</h1>`,{status:404,noindex:true});
   const variants = await loadSellerVariants(product.sourceId);
   const panel = purchasePanel(product, variants, t, escapeHtml);
   return shell(lang,path,product.title,`${product.title}. ${t[8]}. ${t[15]}`,`<a class="back" href="${base(lang)}/">← ${t[7]}</a>${panel}${productHelp(lang,tail.split('/')[0],product,escapeHtml)}<h2>${t[17]}</h2><div class="catalog-grid">${product.related.slice(0,8).map(p=>card(p,lang)).join('')}</div>`);
  }
  const cat=tail.replace(/\/$/,'')||'AllProducts';if(!CATEGORIES.includes(cat))return shell(lang,path,'Not found','',`<h1>404</h1>`,{status:404,noindex:true});
  const q=(url.searchParams.get('q')||url.searchParams.get('keywords')||'').trim().slice(0,100);
  const sort=['new','click','price'].includes(url.searchParams.get('sort'))?url.searchParams.get('sort'):'new';
  const page=Math.min(10000,Math.max(1,Number.parseInt(url.searchParams.get('page')||'1')||1));
  const params=new URLSearchParams({q,sort,page:String(page)}),data=parseList(await upstream('/'+cat+'/',params));
  const route=localPath('/'+cat+'/',lang),link=(s,p=1)=>`${route}?${new URLSearchParams({q,sort:s,page:String(p)})}`;
  const names=CATEGORY_LABELS[lang]||CATEGORY_LABELS.en,categoryTitle=names[CATEGORIES.indexOf(cat)];
  const title=cat==='AllProducts'?t[0]:`Hipobuy ${categoryTitle} Spreadsheet`;
  return shell(lang,path,title,`${title}. ${t[15]}`,`<p class="catalog-eyebrow">HIPOBUY SPREADSHEET</p><h1>${title}</h1><div class="catalog-tools">${searchForm(lang,q,cat,sort)}<a class="image-search-link" href="${base(lang)}/image-search/"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/></svg> ${t[6]}</a></div><nav class="category-filters">${CATEGORIES.map((c,i)=>`<a href="${localPath('/'+c+'/',lang)}" ${c===cat?'aria-current="page"':''}>${names[i]}</a>`).join('')}</nav><div class="sort-row">${[['new',t[3]],['click',t[4]],['price',t[5]]].map(([s,n])=>`<a href="${link(s)}" ${sort===s?'aria-current="page"':''}>${n}</a>`).join('')}<span>${data.total.toLocaleString()} · ${page} / ${Math.max(page,data.pages)}</span></div><div class="catalog-grid">${data.products.length?data.products.map(p=>card(p,lang)).join(''):`<p class="empty-state">${t[13]}</p>`}</div>${categoryHelp(lang)}<nav class="catalog-pagination">${page>1?`<a href="${link(sort,page-1)}">← ${t[11]}</a>`:''}${page<data.pages?`<a href="${link(sort,page+1)}">${t[12]} →</a>`:''}</nav>`,{noindex:!!q||sort!=='new'||page>1,query:url.search});
 } catch(error) { if(error.status===404)return shell(lang,path,'404','',`<h1>404</h1>`,{status:404,noindex:true}); return shell(lang,path,t[20],t[20],`<h1>${t[20]}</h1><a href="${base(lang)}/">${t[7]}</a>`,{status:503,noindex:true}); }
}
// Reference-site ordering. Use these same route codes for language alternates and sitemaps.
const SITE_LOCALES = Object.freeze({
  en:'English', de:'Deutsch', fr:'Français', es:'Español', it:'Italiano',
  nl:'Nederlands', pt:'Português', pl:'Polski', ro:'Română', sv:'Svenska',
  'zh-cn':'简体中文', da:'Dansk', fi:'Suomi', el:'Ελληνικά', cs:'Čeština',
  hu:'Magyar', bg:'Български', sk:'Slovenčina', hr:'Hrvatski', ja:'日本語',
  ko:'한국어', vi:'Tiếng Việt', th:'ไทย', id:'Bahasa Indonesia'
});
const nativeEditorial = new Set(['en','de','es','fr','it']);
const localizedLabels = new Set(['aria-label','title','placeholder','alt','data-error','data-actual-label','data-volume-label','data-billed-label','data-cost-label','data-norate']);
const machineLocale = lang => lang === 'zh-cn' ? 'zh-CN' : lang;
const localeEscape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decodeEntities = s => s.replace(/&(amp|lt|gt|quot|apos|nbsp|#(?:[0-9]+|x[\da-f]+));/gi,(s,k)=>{
  if(k[0]!=='#')return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '})[k.toLowerCase()];
  const n=k[1].toLowerCase()==='x'?parseInt(k.slice(2),16):Number(k.slice(1));
  return n>0 && n<=0x10ffff?String.fromCodePoint(n):s;
});
const translationMemo = new Map();
const localeVersion = '20261122-locale-6';
const namedBrands = /^(?:HipoBuyy?(?: Sheet)?|Oopbuy|Kakobuy|Weidian|CNFans|Superbuy|USFans|Sugargoo|Litbuy|Lovegobuy|CSSBuy|Rizzitgo|Joyagoo|Nike|Adidas|SKU|USD|EUR|CNY|GBP|CAD|AUD|JPY|HKD|PLN|SEK|CHF|DKK|NOK|KRW|IDR|MXN|BRL|QC|FAQ)$/i;
function needsTranslation(text,lang,translatePage) {
  return /\p{L}/u.test(text) && !namedBrands.test(text) && !/^(?:https?:\/\/|www\.|[\w.-]+@\w|(?=[0-9A-Z-]*\d)[0-9A-Z-]+$)/.test(text) &&
    (translatePage || lang==='en' && /[\u3400-\u9fff]/.test(text));
}
function pageLink(value,lang,origin) {
  if(!value||(!value.startsWith('/')&&!value.startsWith('http')))return value;
  let u;try {u=new URL(value,origin)}catch{return value}
  if(u.origin!==origin && u.hostname!=='hipobuyy-sheet.com')return value;
  const first=u.pathname.split('/')[1];
  if(!Object.hasOwn(SITE_LOCALES,first))return value;
  u.pathname=u.pathname.replace(/^\/[^/]+/,'/'+lang);
  return value.startsWith('/') ? u.pathname+u.search+u.hash : u.href;
}
let providerRetryAfter=0;
async function requestTranslation(batch,lang,fetchTranslation) {
  if(Date.now()<providerRetryAfter)throw Error('Translation service 429');
  const url=new URL('https://translate.googleapis.com/translate_a/single');
  url.search=new URLSearchParams({client:'gtx',sl:'auto',tl:machineLocale(lang),dt:'t',q:batch.join('\n')});
  let response;
  for(let attempt=0;attempt<2;attempt++){
    try {
      response=await fetchTranslation(url,{signal:AbortSignal.timeout(12000),cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':604800,'300-599':0}}});
      if(response.ok)break;
      if(response.status===429){providerRetryAfter=Date.now()+60000;throw Error('Translation service 429')}
      if(attempt||response.status<500&&response.status!==429)throw Error('Translation service '+response.status);
    } catch(error){if(attempt||Date.now()<providerRetryAfter)throw error}
  }
  if(!response?.ok)throw Error('Translation service unavailable');
  const data=await response.json();
  const result=data[0].map(row=>row[0]||'').join('').trim().split(/\r?\n/);
  if(result.length!==batch.length || result.some(s=>!s.trim())) {
    if(batch.length===1 && result.some(s=>s.trim()))return [result.join(' ')];
    if(batch.length<2)throw Error('Empty translation');
    const half=Math.ceil(batch.length/2);
    return [...await requestTranslation(batch.slice(0,half),lang,fetchTranslation),...await requestTranslation(batch.slice(half),lang,fetchTranslation)];
  }
  return result.map(s=>s.trim());
}
// Protect commercial names embedded in prose, without treating a colour such as
// "Purple" by itself as a brand. Match longer model families before their brands.
const productNamePattern = /(?<![\p{L}\p{N}])(?:Nike\s+(?:Air\s+Force\s+1|ZoomX\s+Vaporfly\s+Next%|Free\s+Metcon\s*\d+|Air\s+Max(?:\s+(?:\d+|Plus|DN|SC))?|Dunk\s+(?:Low|High))|Air\s+Jordan\s+\d+(?:\s+Retro)?|New\s+Balance(?:\s+(?:\d+[A-Za-z]*|[A-Za-z]+\d+))?|Pol[eè]ne(?:\s+Paris)?|Numéro Neuf|Audemars Piguet(?: Royal Pop)?|Giuseppe Zanotti|Dr\. Martens|Christian Louboutin|Saint Laurent(?: Opyum)?|The North Face|Stone Island|Canada Goose|Chrome Hearts|Louis Vuitton|Ralph Lauren|Purple Brand|Off-White|Hello Kitty|Valley Dreams|Vale Dreams|Balmain|Amiri|Nike|Adidas|Jordan|Burberry|SWATCH|Lego|Diesel|Rimowa|Gucci|Prada|Dior|Balenciaga|Valentino|Fendi|Chanel|Moncler|Asics|Salomon|Onitsuka Tiger|Hipobuyy?|Weidian|Oopbuy|Kakobuy|Superbuy|Sugargoo)(?![\p{L}\p{N}])/giu;
const slashNamePattern = /[A-Za-z][A-Za-z0-9'.-]*(?:\s*\/\s*[A-Za-z][A-Za-z0-9'.-]*)+/g;
function protectProductNames(text) {
  const parts=[];
  const hide=s=>{const marker='⟪'+(parts.length+1)+'⟫';parts.push([marker,s]);return marker};
  const lists=text.replace(slashNamePattern,list=>{
    const names=list.split(/\s*\/\s*/);
    const known=names.filter(name=>[...name.matchAll(productNamePattern)].some(m=>m[0].length===name.length));
    // Purple is a clothing label in named designer lists. Black/White sizes and
    // other unbranded option groups stay available for normal translation.
    return known.length>=2 || known.length===names.length-1&&names.includes('Purple')?hide(list):list;
  });
  return {input:lists.replace(productNamePattern,hide),parts};
}
async function translateProductBatch(batch,lang,fetchTranslation){
  const masked=batch.map(protectProductNames);
  const inputs=masked.map(m=>m.input);
  const values=await requestTranslation(inputs,lang,fetchTranslation);
  return Promise.all(values.map(async (value,index)=>{
    const {parts,input}=masked[index];
    if(parts.every(([marker])=>value.includes(marker))){
      for(const [marker,name] of parts)value=value.replaceAll(marker,name);
      return value;
    }
    // Some language engines rewrite bracket glyphs. Translate only the words
    // surrounding each name if a protected marker was lost.
    const names=new Map(parts), chunks=input.split(/(⟪\d+⟫)/);
    const descriptors=[...new Set(chunks.filter(s=>!names.has(s)&&/\p{L}/u.test(s)).map(s=>s.trim()))];
    const results=descriptors.length?await requestTranslation(descriptors,lang,fetchTranslation):[];
    const translated=new Map(descriptors.map((s,i)=>[s,results[i]]));
    return chunks.map(s=>names.get(s)??(translated.has(s.trim())?s.replace(/\S[\s\S]*\S|\S/,translated.get(s.trim())):s)).join('');
  }));
}
const bundledLocales=new Map();
async function localeAsset(env,path,origin) {
  if(bundledLocales.has(path))return bundledLocales.get(path);
  try {
    const res=await env.ASSETS.fetch(new Request(new URL('/assets/'+path,origin)));
    if(!res.ok)return null;
    const bytes=await res.arrayBuffer(),magic=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));
    const uncompressed=magic[0]===31&&magic[1]===139?
      new Response(new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'))):new Response(bytes);
    const values=await uncompressed.json();
    if(!values||typeof values!=='object'||Array.isArray(values))return null;
    if(bundledLocales.size>=9)bundledLocales.delete(bundledLocales.keys().next().value);
    bundledLocales.set(path,values);return values;
  } catch{return null}
}
async function bundledDictionary(env,lang,url){
  if(!env?.ASSETS || !Object.hasOwn(SITE_LOCALES,lang))return [];
  const paths=['locales/'+lang+'.json','catalog-locales/'+lang+'.json'];
  if(!nativeEditorial.has(lang)&&!url.pathname.startsWith('/api/')&&!/^\/[^/]+\/catalog(?:\/|$)/.test(url.pathname))paths.push('editorial-locales/'+lang+'.json.gz');
  return (await Promise.all(paths.map(p=>localeAsset(env,p,url.origin)))).filter(Boolean);
}
function dictionaryEntry(text,dict){
  for(const d of dict||[])if(Object.hasOwn(d,text)&&typeof d[text]==='string'&&d[text].length)return d[text];
}
function dictionaryPhrase(text,dict){
  const exact=dictionaryEntry(text,dict);if(exact)return exact;
  const id=/^Product ID (\d+)$/.exec(text), numbered=/^(.+?)((?::| )\s*\d+)$/.exec(text);
  if(id){const prefix=dictionaryEntry('Product ID',dict);if(prefix)return prefix+' '+id[1]}
  if(numbered){const base=dictionaryEntry(numbered[1],dict);if(base)return base+numbered[2]}
  const suffix=' | Hipobuy Spreadsheet',desc='. Product photos / QC. Product images from the source catalogue. Check the exact item, option and photo context before buying.';
  if(text.endsWith(suffix)){const title=dictionaryEntry(text.slice(0,-suffix.length),dict), tail=dictionaryEntry('Hipobuy Spreadsheet',dict);if(title&&tail)return title+' | '+tail}
  if(text.endsWith(desc)){const pieces=[text.slice(0,-desc.length),'Product photos / QC',desc.slice('. Product photos / QC. '.length)].map(k=>dictionaryEntry(k,dict));if(pieces.every(Boolean))return pieces.join('. ')}
}
function localeFailureCode(error){
  const status=/^Translation service (\d{3})$/.exec(error?.message||'');
  if(status)return 'provider-'+status[1];
  if(error?.name==='TimeoutError'||error?.name==='AbortError')return 'provider-timeout';
  if(error?.message==='Translation service unavailable')return 'provider-unavailable';
  if(error?.message==='Empty translation')return 'provider-empty';
  if(error?.name==='SyntaxError')return 'provider-format';
  if(error?.name==='TypeError')return 'type-error';
  return 'render-error';
}
async function localeStrings(strings,lang,fetchTranslation=fetch,dictionary=null) {
  const found=new Map(), groups=[];
  let group=[],length=0;
  for(const s of new Set(strings)) {
    const cached=dictionaryPhrase(s,dictionary)||translationMemo.get(lang+'\n'+s);
    if(cached){found.set(s,cached);continue}
    // Keep Unicode-heavy URLs below conservative intermediary limits.
    const size=encodeURIComponent(s).length;
    if(group.length && (length+size>5500 || group.length>=45)){groups.push(group);group=[];length=0}
    group.push(s);length+=size+3;
  }
  if(group.length)groups.push(group);
  let next=0;
  await Promise.all(Array.from({length:Math.min(4,groups.length)},async()=>{
    while(next<groups.length){
      const batch=groups[next++];
      let values;try{values=await translateProductBatch(batch,lang,fetchTranslation)}
      catch(error){
        found.pending??=new Map();
        found.failureCode=localeFailureCode(error);
        for(const s of batch){found.set(s,s);found.pending.set(s,protectProductNames(s))}
        continue;
      }
      batch.forEach((s,i)=>{
        found.set(s,values[i]);
        if(translationMemo.size>=6000)translationMemo.delete(translationMemo.keys().next().value);
        translationMemo.set(lang+'\n'+s,values[i]);
      });
    }
  }));
  return found;
}
function rewriteStructured(value,key,lang,origin,mark) {
  if(Array.isArray(value))return key==='inLanguage'?value.map(machineLocale):value.map(v=>rewriteStructured(v,key,lang,origin,mark));
  if(value && typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,rewriteStructured(v,k,lang,origin,mark)]));
  if(typeof value!=='string')return value;
  if(key==='inLanguage')return machineLocale(lang);
  if(value.startsWith('https://')||value.startsWith('/'))return pageLink(value,lang,origin);
  return ['name','headline','description','text','articleBody','caption','articleSection','keywords'].includes(key)?mark(value,'json'):value;
}
async function localeHtml(response,lang,sourceLang,url,fetchTranslation,dictionary) {
  const source=await response.text(), markers=new Map(), originals=new Set();
  // Never submit user-entered search terms to the translation service. Existing templates
  // keep the query only in URLs and form values; mask it if a future template echoes it.
  const hiddenTerms=[...new Set(['q','keywords'].map(k=>url.searchParams.get(k)?.trim()).filter(Boolean))].sort((a,b)=>b.length-a.length);
  const nonce='hipol10n'+crypto.randomUUID().replaceAll('-','')+'_';
  let productDepth=0,skipDepth=0,ldDepth=0,scriptBody='',nodeText='';
  const mark=(text,context='html',force=false)=>{
    const normalized=decodeEntities(text).trim().replace(/\s+/g,' ');
    let raw=normalized;
    const replacements=[];
    for(const term of hiddenTerms){
      if(!raw.includes(term))continue;
      const placeholder='⟦'+replacements.length+'⟧';
      raw=raw.replaceAll(term,placeholder);
      replacements.push([placeholder,term]);
    }
    if(!needsTranslation(raw,lang,sourceLang!==lang || force && lang!=='en'))return text;
    const marker=nonce+markers.size+'_';
    markers.set(marker,{raw,context,replacements}); originals.add(raw);
    return text.replace(/\S[\s\S]*\S|\S/,marker);
  };
  const localized=new HTMLRewriter()
    .on('*',{element(el){
      const tag=el.tagName,cls=(el.getAttribute('class')||'').split(/\s+/);
      if(cls.includes('catalog-card')||cls.includes('fx-control')||el.getAttribute('data-product-category')!==null){productDepth++;el.onEndTag(()=>{productDepth--})}
      if(['style','script','textarea'].includes(tag) || tag==='select'&&(el.getAttribute('id')==='language'||cls.includes('langs')||el.hasAttribute('data-currency-select'))){
        skipDepth++;
        const ld=tag==='script'&&el.getAttribute('type')==='application/ld+json';
        if(ld){ldDepth++;scriptBody=''}
        el.onEndTag(end=>{
          if(ld){
            let out;try {
              const data=JSON.parse(scriptBody);
              if(data['@type']==='WebSite'&&Array.isArray(data.inLanguage))data.inLanguage=Object.keys(SITE_LOCALES);
              out=JSON.stringify(rewriteStructured(data,'',lang,url.origin,mark)).replaceAll('<','\\u003c');
            }catch{out=scriptBody}
            end.before(out,{html:true});ldDepth--;
          }
          skipDepth--;
        });
      }
      if(tag==='html')el.setAttribute('lang',machineLocale(lang));
      if(el.hasAttribute('data-locale'))el.setAttribute('data-locale',lang);
      for(const [k,v] of [...el.attributes]){
        if(k==='href'||k==='action'||tag==='meta'&&el.getAttribute('property')==='og:url'&&k==='content'){
          const href=pageLink(v,lang,url.origin);if(href!==v)el.setAttribute(k,href);
        }
        if(localizedLabels.has(k)||k.startsWith('data-i18n-')||k==='content'&&tag==='meta'&&/^(description|og:(title|description)|twitter:(title|description))$/.test(el.getAttribute('name')||el.getAttribute('property')||'')){
          const val=mark(v,'html',productDepth>0 || k==='aria-label'&&v==='Language');
          if(val!==v)el.setAttribute(k,val);
        }
      }
      if(tag==='select' && (el.getAttribute('id')==='language'||cls.includes('langs'))){
        const options=Object.entries(SITE_LOCALES).map(([code,name])=>'<option lang="'+machineLocale(code)+'" value="'+localeEscape(pageLink(url.pathname+url.search,code,url.origin))+'"'+(code===lang?' selected':'')+'>'+name+'</option>').join('');
        el.setInnerContent(options,{html:true});
      }
      if(tag==='link'&&el.getAttribute('hreflang'))el.remove();
      if(tag==='link'&&el.getAttribute('rel')==='canonical'){
        const canonical=el.getAttribute('href');
        const alternates=[...Object.keys(SITE_LOCALES),'x-default'].map(code=>'<link rel="alternate" hreflang="'+machineLocale(code)+'" href="'+localeEscape(pageLink(canonical,code==='x-default'?'en':code,url.origin))+'">');
        el.after(alternates.join(''),{html:true});
      }
    }})
    .onDocument({text(token){
      if(ldDepth){scriptBody+=token.text;token.remove();return}
      if(skipDepth)return;
      nodeText+=token.text;
      if(!token.lastInTextNode){token.remove();return}
      // Raw markup in a text token is safe to restore exactly as parsed.
      const changed=mark(nodeText,'html',productDepth>0);
      token.replace(changed,{html:true});nodeText='';
    }});
  const html=await localized.transform(new Response(source)).text();
  const translated=await localeStrings(originals,lang,fetchTranslation,dictionary);
  let result=html.replace(new RegExp(nonce+'\\d+_','g'),marker=>{
    const {raw,context,replacements}=markers.get(marker);
    let value=translated.get(raw);
    for(const [placeholder,term] of replacements)value=value.replaceAll(placeholder,term);
    return context==='json'?JSON.stringify(value).slice(1,-1).replaceAll('<','\\u003c'):localeEscape(value);
  });
  if(translated.pending?.size){
    const fragments=[];
    for(const {raw,replacements} of markers.values())if(translated.pending.has(raw))fragments.push([raw,replacements]);
    const payload=JSON.stringify({lang, pending:[...translated.pending], fragments}).replaceAll('<','\\u003c');
    result=result.replace(/<\/body>/i,()=>'<script type="application/json" id="hipo-locale-pending">'+payload+'</script><script type="module" src="/assets/locale-recovery.mjs"></script></body>');
  }
  const headers=new Headers(response.headers);
  if(translated.pending?.size){
    headers.set('x-hipobuy-locale-error',translated.failureCode);headers.set('x-hipobuy-locale-pending',String(translated.pending.size));headers.set('cache-control','no-store');
  }
  for(const key of ['content-length','content-encoding','etag','last-modified'])headers.delete(key);
  headers.set('content-language',machineLocale(lang));
  return new Response(result,{status:response.status,headers});
}
// coreFetch accepts (request,env,ctx). Wrap outside all routes so localized markup includes
// the product panel, image-search messages, and page-specific metadata.
async function localeResponse(request,env,ctx,coreFetch,fetchTranslation=fetch) {
  const url=new URL(request.url), lang=url.pathname.split('/')[1];
  const catalogApi=['/api/catalog','/api/image-search/results'].includes(url.pathname);
  const apiLang=catalogApi?url.searchParams.get('lang'):null;
  if(!Object.hasOwn(SITE_LOCALES,lang)&&!Object.hasOwn(SITE_LOCALES,apiLang))return coreFetch(request,env,ctx);
  if(!['GET','HEAD'].includes(request.method))return coreFetch(request,env,ctx);
  if(url.hostname==='www.hipobuyy-sheet.com')return coreFetch(request,env,ctx);
  const cache=globalThis.caches?.default;
  const key=new URL(url);key.searchParams.set('__hipo_locale_cache',localeVersion);
  const cached=cache?await cache.match(key.href):null;
  if(cached)return request.method==='HEAD'?new Response(null,cached):cached;
  let result;
  try {
    const dictionary=await bundledDictionary(env,apiLang||lang,url);
    if(catalogApi){
      const response=await coreFetch(request,env,ctx);
      if(!response.ok || request.method==='HEAD')return response;
      const data=await response.json(), titles=[...(data.products||[]).map(p=>p.title),...(data.titles||[])];
      const translated=await localeStrings(titles.filter(s=>typeof s==='string'&&needsTranslation(s,apiLang,apiLang!=='en')),apiLang,fetchTranslation,dictionary);
      if(data.products)for(const item of data.products)item.title=translated.get(item.title)||item.title;
      if(data.titles)data.titles=data.titles.map(s=>translated.get(s)||s);
      if(translated.pending?.size)data.localePending=[...translated.pending];
      result=Response.json(data,{headers:{'content-language':machineLocale(apiLang),'cache-control':translated.pending?.size?'no-store':'public,max-age=60',...(translated.pending?.size?{'x-hipobuy-locale-error':translated.failureCode}:{})}});
    }else{
      const sourceLang=nativeEditorial.has(lang)&&!/^\/[^/]+\/catalog(?:\/|$)/.test(url.pathname)?lang:'en';
      const sourceUrl=new URL(url);sourceUrl.pathname=sourceUrl.pathname.replace(/^\/[^/]+/,'/'+sourceLang);
      const nativeRequest=new Request(sourceUrl,new Request(request,{method:'GET'}));
      const response=await coreFetch(nativeRequest,env,ctx);
      if(response.status>=300&&response.status<400){
        const headers=new Headers(response.headers),loc=headers.get('location');
        if(loc)headers.set('location',pageLink(loc,lang,url.origin));
        return new Response(null,{status:response.status,headers});
      }
      if(!response.headers.get('content-type')?.includes('text/html'))return response;
      result=await localeHtml(response,lang,sourceLang,url,fetchTranslation,dictionary);
    }
  } catch(error) {
    console.error('Locale render failed',apiLang||lang,error?.message);
    return new Response('Temporarily unavailable',{status:503,headers:{'retry-after':'30','cache-control':'no-store','x-hipobuy-locale-error':localeFailureCode(error)}});
  }
  if(result.ok&&cache&&!url.searchParams.has('q')&&!url.searchParams.has('keywords')&&!result.headers.has('set-cookie')&&!/private|no-store/i.test(result.headers.get('cache-control')||'')){
    const copy=new Response(result.clone().body,result);
    copy.headers.set('cache-control','public,max-age=300');
    ctx?.waitUntil(cache.put(key.href,copy).catch(()=>{}));
  }
  return request.method==='HEAD'?new Response(null,result):result;
}


const RELEASE='hipobuy-20261122-catalog-v3';
function finish(response,request) {
 const headers=new Headers(response.headers);headers.set('x-hipobuy-release',RELEASE);headers.set('x-content-type-options','nosniff');headers.set('referrer-policy','strict-origin-when-cross-origin');
 return new Response(request.method==='HEAD'?null:response.body,{status:response.status,headers});
}
const coreHandler = {
 async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
  if(url.hostname==='www.hipobuyy-sheet.com'){url.hostname='hipobuyy-sheet.com';return Response.redirect(url,301)}
  if(url.pathname==='/')return Response.redirect(url.origin+'/en/'+url.search,302);
  const m=url.pathname.match(/^\/(en|de|es|fr|it)\/(spreadsheet|finds)\/?$/);
  if(m)return Response.redirect(url.origin+'/'+m[1]+'/catalog/'+url.search,301);
  if(url.pathname==='/search.html'||url.pathname==='/AllProducts/'){
   const target=new URL('/en/catalog/',url);target.search=url.search;
   if(target.searchParams.has('keywords')){target.searchParams.set('q',target.searchParams.get('keywords'));target.searchParams.delete('keywords');target.searchParams.delete('channelid')}
   return Response.redirect(target,301);
  }
  const shard=url.pathname.match(/^\/catalog-sitemap-([a-z-]+)\.xml$/);
  if(url.pathname==='/catalog-sitemap.xml' || (shard && Object.hasOwn(SITE_LOCALES,shard[1]))){
   try{
    const source=await upstream('/sitemap.xml');
    const paths=[...new Set([...source.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
    if(!paths.length)throw Error('No catalogue entries');
    const body='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(shard ? [shard[1]] : LANGS).flatMap(lang=>paths.map(p=>'<url><loc>https://hipobuyy-sheet.com'+localPath(p,lang)+'</loc></url>')).join('')+'</urlset>';
    return finish(new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=300'}}),request);
   }catch{return finish(new Response('Catalogue temporarily unavailable',{status:503,headers:{'retry-after':'60'}}),request)}
  }
  const catalog=await catalogueRoute(request,env);
  if(catalog)return finish(catalog,request);
  return finish(await env.ASSETS.fetch(request),request);
 }
};

export default {
  fetch(request, env, ctx) {
    return localeResponse(request, env, ctx, (r, e, c) => coreHandler.fetch(r, e, c));
  }
};
