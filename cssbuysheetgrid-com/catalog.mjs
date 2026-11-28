const origin = 'https://cnbuycha.com';
export const categories = ['AllProducts', 'shoes', 'hoodies-sweaters', 't-shirts', 'jackets', 'pants-shorts', 'headwear', 'accessories', 'short-sets', 'electronics', 'other-stuff', 'jersey'];
const productPath = /^\/[a-z0-9-]+\/\d+\.html$/i;

function plain(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&(amp|lt|gt|quot|apos|nbsp|#\d+|#x[\da-f]+);/gi, (entity, name) => {
    const named = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' '};
    if (name in named) return named[name];
    const point = name.startsWith('#x') ? parseInt(name.slice(2), 16) : Number(name.slice(1));
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  }).trim();
}

function attribute(tag, key) {
  return plain((tag || '').match(new RegExp('\\s' + key + '\\s*=\\s*["\']([^"\']*)["\']', 'i'))?.[1]);
}

function link(value) {
  if (!value) return null;
  try {
    const url = new URL(value, origin);
    return url.protocol === 'https:' && !url.username && !url.password ? url : null;
  } catch { return null; }
}

function media(tag) {
  const url = link(attribute(tag, 'src'));
  return url?.origin === origin ? url.href : '';
}

async function read(path) {
  const res = await fetch(new URL(path, origin).href, {headers:{Accept:'text/html'}, cf: {cacheTtlByStatus:{'200-299':120,'400-599':0}, cacheEverything: true}});
  if (!res.ok) throw Object.assign(new Error('Catalog HTTP ' + res.status), {status: res.status === 404 ? 404 : 503});
  return res.text();
}

export async function catalog({category, page = 1, q = '', sort = 'latest'} = {}) {
  const url = new URL('/' + (categories.includes(category) ? category : 'AllProducts') + '/', origin);
  if (q.trim()) url.searchParams.set('q', q.trim().slice(0, 180));
  if (['popular', 'click', 'price'].includes(sort)) url.searchParams.set('sort', sort === 'popular' ? 'click' : sort);
  if (+page > 1 && Number.isSafeInteger(+page)) url.searchParams.set('page', String(page));
  const html = await read(url.pathname + url.search);
  const items = [];
  for (const [, body] of html.matchAll(/<article\b[^>]*class=["'][^"']*product-card[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi)) {
    const href = link(attribute(body.match(/<a\b[^>]+>/i)?.[0], 'href'));
    const title = plain(body.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)?.[1]);
    const image = media(body.match(/<img\b[^>]+>/i)?.[0]);
    const price = plain(body.match(/class=["']product-price["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]);
    if (href?.origin === origin && productPath.test(href.pathname) && title) items.push({title, image, price, path: href.pathname});
  }
  const counter = plain(html.match(/class=["']results-summary["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]).match(/[\d,]+/);
  if (!counter) throw Object.assign(new Error('Unrecognized catalog response'), {status: 503});
  const total = Number(counter[0].replace(/,/g, ''));
  return {items, pages: Math.max(1, Math.ceil(total / 60)), total};
}

export async function detail(path) {
  if (!productPath.test(path)) throw Object.assign(new Error('Unknown item'), {status: 404});
  const html = await read(path);
  const title = plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
  const id = html.match(/class=["']product-id["'][^>]*>\s*ID:\s*(\d+)/i)?.[1];
  if (!id || !title) throw Object.assign(new Error('Unknown item'), {status: 404});
  const price = attribute(html.match(/<\w+\b[^>]*itemprop=["']price["'][^>]*>/i)?.[0], 'content');
  const images = [...new Set(Array.from(html.matchAll(/<img\b[^>]*itemprop=["']image["'][^>]*>/gi), m => media(m[0])).filter(Boolean))];
  const agents = {};
  let buy = '';
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const url = link(attribute(tag, 'href'));
    if (!url) continue;
    if (attribute(tag, 'class').split(/\s+/).includes('platform-option')) agents[url.hostname.replace(/^www\./,'')] = url.href;
    if (!buy && /(^|\.)(weidian\.com|taobao\.com|1688\.com)$/.test(url.hostname)) buy = url.href;
  }
  return {title, images, price, buy, agents, id, html};
}
