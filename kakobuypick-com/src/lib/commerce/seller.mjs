import {parseHTML} from 'linkedom/worker';

function sellerPhoto(value) {
  const raw = typeof value === 'string' ? value : value?.url || value?.src || value?.img;
  if (!raw) return '';
  try {
    const url = new URL(raw, 'https://weidian.com');
    return url.protocol === 'https:' && !url.username && !url.password && /(^|\.)geilicdn\.com$/.test(url.hostname) ? url.href : '';
  } catch { return ''; }
}

export function verifiedSeller(model, itemId) {
  if (String(model?.item_info?.item_id) !== itemId) return null;
  const properties = model.sku_properties || {};
  const skus = Object.values(properties.sku || {}).filter(s => /^\d+$/.test(s.id) && s.attr_ids).map(s => ({
    id: String(s.id), attrs: String(s.attr_ids).split('-'), image: sellerPhoto(s.img),
    price: /^\d+(\.\d+)?$/.test(String(s.price)) ? Number(s.price) : null,
  }));
  const groups = (properties.attr_list || []).map(group => ({
    name: String(group.attr_title || ''),
    values: (group.attr_values || []).filter(v => /^\d+$/.test(v.attr_id)).map(v => ({
      id: String(v.attr_id), name: String(v.attr_value || v.attr_id), image: sellerPhoto(v.img)
    }))
  })).filter(g => g.values.length);
  for (const group of groups) {
    if (groups.length > 1 && !/style|colou?r|款式|颜[色式]|顏色/i.test(group.name)) continue;
    for (const value of group.values) {
      if (value.image) continue;
      const matching = new Set(skus.filter(s => s.image && s.attrs.includes(value.id)).map(s => s.image));
      if (matching.size === 1) value.image = [...matching][0];
    }
  }
  const rawGallery = model.item_info.imgs || [];
  const gallery = typeof rawGallery === 'string' || sellerPhoto(rawGallery) ? [rawGallery] : Object.values(rawGallery);
  return {groups, skus, gallery: [...new Set(gallery.map(sellerPhoto).filter(Boolean))]};
}

async function fetchSeller(itemId) {
  if (!/^\d{6,16}$/.test(itemId)) return null;
  const options = {cf: {cacheEverything: true, cacheTtl: 900}};
  const endpoint = new URL('https://thor.weidian.com/detail/getItemInfo/1.0');
  endpoint.searchParams.set('param', JSON.stringify({vitemId: itemId, from:'h5'}));
  try {
    const res = await fetch(endpoint, {...options, signal: AbortSignal.timeout(14500)});
    if (res.ok) {
      const body = await res.json();
      const model = verifiedSeller(body.result?.default_model, itemId);
      if (model) return model;
    }
  } catch {}
  try {
    const res = await fetch('https://weidian.com/item.html?itemID='+itemId, {...options, signal: AbortSignal.timeout(12000)});
    if (res.ok) {
      const page = parseHTML(await res.text()).document;
      const payload = page.querySelector('#__rocker-render-inject__')?.getAttribute('data-obj');
      if (payload) return verifiedSeller(JSON.parse(payload).result?.default_model, itemId);
    }
  } catch {}
  return null;
}

const inFlight = new Map();

export async function loadSeller(itemId) {
  if (!/^\d{6,16}$/.test(itemId)) return null;
  const cache = globalThis.caches?.default;
  const key = 'https://kakobuypick.com/__seller-model/' + itemId;
  const cached = await cache?.match(key).catch(() => undefined);
  if (cached && Date.now() - Number(cached.headers.get('x-checked')) < 900000) return cached.json();
  let pending = inFlight.get(itemId);
  if (!pending) {
    pending = fetchSeller(itemId).then(async model => {
      if (model && cache) {
        await cache.put(key, Response.json(model, {headers: {
          'cache-control':'public,max-age=86400', 'x-checked':String(Date.now())
        }})).catch(() => {});
      }
      return model;
    }).finally(() => inFlight.delete(itemId));
    inFlight.set(itemId, pending);
  }
  return await pending || (cached ? cached.json() : null);
}
