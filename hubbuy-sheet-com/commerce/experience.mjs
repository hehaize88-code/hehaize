// Public catalogue enhancements. No accounts, database or paid APIs.
const htmlEntities = value => String(value || '').replace(/&(#x[\da-f]+|#\d+|quot|apos|amp|lt|gt);/gi, (_, entity) => {
 if (entity[0] === '#') { const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2),16) : Number(entity.slice(1)); return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '\ufffd'; }
 return ({quot:'"',apos:"'",amp:'&',lt:'<',gt:'>'})[entity.toLowerCase()];
});
const secureImage = value => {
  try { const u = new URL(value); return u.protocol === 'https:' && /(^|\.)geilicdn\.com$/.test(u.hostname) ? u.href : ''; } catch { return ''; }
};

export function parseWeidianOptions(html, expectedId) {
  const tag = html.match(/<script\b[^>]*\bid=["']__rocker-render-inject__["'][^>]*>/i)?.[0] || '';
  const raw = tag.match(/\bdata-obj=(['"])([\s\S]*?)\1/)?.[2];
  if (!raw) throw Error('Options unavailable');
  const model = JSON.parse(htmlEntities(raw)).result?.default_model;
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
    images: [...new Set((model.item_info.imgs || []).map(secureImage).filter(Boolean))].slice(0, 100),
    sourceUrl: `https://weidian.com/item.html?itemID=${expectedId}`,
  };
}

export const CURRENCIES = ['USD','EUR','GBP','CNY','BRL','AUD','CAD','CHF','CZK','DKK','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','SEK','SGD','THB','TRY','ZAR'];
export function normalizeRates(rows) {
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

export async function experienceRoute(request) {
  const url = new URL(request.url);
  if (!['/api/product-options', '/api/exchange-rates'].includes(url.pathname)) return null;
  if (request.method !== 'GET') return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  try {
    if (url.pathname === '/api/product-options') {
      const id = url.searchParams.get('id') || '';
      if (!/^\d{5,20}$/.test(id)) return Response.json({ error: 'Invalid product ID' }, { status: 400 });
      const response = await fetch(`https://weidian.com/item.html?itemID=${id}`, {
        headers: { accept: 'text/html' }, signal: AbortSignal.timeout(14000), cf: { cacheTtl: 21600, cacheEverything: true },
      });
      if (!response.ok || (response.url && new URL(response.url).hostname !== 'weidian.com')) throw Error('Source unavailable');
      const html = await response.text();
      if (html.length > 3000000) throw Error('Source too large');
      return Response.json(parseWeidianOptions(html, id), { headers: { 'cache-control': 'public, max-age=600, s-maxage=21600' } });
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
