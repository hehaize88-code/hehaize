import { parseHTML } from 'linkedom/worker';
export const ORIGIN = 'https://cnbuycha.com';
export const LOGO = 'https://nstatic.kakobuy.com/banner/202602/22/1080564df2b8f006455d32460b53b7d9.png';
export const FAVICON = 'https://kakobuy.com/favicon.ico';
export const REGISTER = 'https://kakobuy.com/register';
export const slugs = ['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
export type Product = { path: string; title: string; image: string; price: string; category: string };
const txt = (el: any) => (el?.textContent || '').trim();
const attr = (el: any, key: string) => el?.getAttribute(key) || '';
export const SOURCE_PAGE_SIZE = 60;
export const PAGE_SIZE = 20;
const pending = new Map<string, Promise<string>>();
export class CatalogError extends Error {
  constructor(message: string, public status = 503) { super(message); }
}
function imageURL(raw: string) {
  if (!raw || /placeholder/i.test(raw)) return '';
  try {
    const url = new URL(raw, ORIGIN);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return '';
    const localImage = url.origin === ORIGIN && /^\/(media|uploads|template)\//.test(url.pathname);
    // CnBuyCha's catalogue also returns original Weidian CDN photos.
    // Keep the exact source URL; never infer a photo from a product ID.
    const sourceImage = url.hostname === 'si.geilicdn.com';
    return localImage || sourceImage ? url.href : '';
  } catch { return ''; }
}
export async function source(path: string) {
  const url = new URL(path, ORIGIN);
  if (url.origin !== ORIGIN) throw new Error('Invalid catalog origin');
  // A short edge response cache is not an independent catalogue. Every language
  // shares the exact public source URL; no prices, images or inventory are invented.
  const key = 'https://kakobuypick.com/__catalog_source'+url.pathname+url.search;
  const cache = (globalThis as any).caches?.default as Cache | undefined;
  const cached = cache ? await cache.match(key).catch(() => undefined) : undefined;
  const age = cached ? Date.now() - Number(cached.headers.get('x-source-fetched-at')) : Infinity;
  if (cached && age >= 0 && age < 120000) return parseHTML(await cached.text()).document;
  if (!pending.has(key)) pending.set(key, (async () => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { Accept: 'text/html' } });
      if (!response.ok) throw new CatalogError(`Catalog HTTP ${response.status}`, response.status === 404 ? 404 : 503);
      const html = await response.text();
      if (html.length > 2500000 || !/product-card|product-title|results-summary/.test(html)) throw new CatalogError('Catalog markup unavailable');
      const doc = parseHTML(html).document;
      if (url.pathname.endsWith('.html')) {
        if (!txt(doc.querySelector('h1.product-title'))) throw new CatalogError('Product markup unavailable');
      } else if (url.pathname === '/') {
        if (!doc.querySelector('.category-item') || !cards(doc).length) throw new CatalogError('Home catalogue unavailable');
      } else {
        const summary = txt(doc.querySelector('.results-summary'));
        const total = Number(summary.replace(/\D/g,''));
        const page = Number(url.searchParams.get('page') || 1);
        if (!summary || !Number.isSafeInteger(total) || (total > (page-1)*SOURCE_PAGE_SIZE && !cards(doc).length)) throw new CatalogError('Listing markup unavailable');
      }
      if (cache) await cache.put(key, new Response(html, {headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=900','x-source-fetched-at':String(Date.now())}})).catch(() => {});
      return html;
    } catch (error) {
      if (cached && age >= 0 && age < 900000 && !(error instanceof CatalogError && error.status === 404)) return cached.text();
      throw error;
    }
  })());
  const inflight=pending.get(key)!;
  try { return parseHTML(await inflight).document; }
  finally { if(pending.get(key)===inflight)pending.delete(key); }
}
export function cards(doc: any): Product[] {
  return [...doc.querySelectorAll('article.product-card')].map((card: any) => {
    const path = attr(card.querySelector('a.product-title'), 'href');
    return { path, title: txt(card.querySelector('h3')), image: imageURL(attr(card.querySelector('img'),'src')), price: txt(card.querySelector('.product-price')), category: path.split('/')[1] };
  }).filter((p: Product) => /^\/[a-z-]+\/\d+\.html$/.test(p.path) && p.title);
}
export async function home() {
  const doc = await source('/');
  const categories = [...doc.querySelectorAll('.category-item')].map((el: any)=>({slug: attr(el,'href').split('/')[1], name: txt(el.querySelector('h3')), count: Number(txt(el.querySelector('.category-count')).replace(/\D/g,''))})).filter(c=>slugs.includes(c.slug));
  const products = cards(doc);
  if (!categories.length || !products.length) throw new Error('Catalog markup changed');
  return {categories, products};
}
export async function sourceListing(category: string, query: string, sort: string, page: number) {
  const params = new URLSearchParams({sort, page: String(page)});
  if (query) params.set('q',query.slice(0,120));
  const path = slugs.includes(category) ? `/${category}/` : '/AllProducts/';
  const doc = await source(`${path}?${params}`);
  const summary = txt(doc.querySelector('.results-summary'));
  if (!summary) throw new Error('Catalog markup changed');
  const total = Number(summary.replace(/\D/g,''));
  if (!Number.isSafeInteger(total) || total < 0) throw new CatalogError('Invalid catalogue count');
  return {products: cards(doc), total, pages: Math.max(1,Math.ceil(total/SOURCE_PAGE_SIZE))};
}
export async function listing(category: string, query: string, sort: string, page: number) {
  const sourcePage = Math.floor((page - 1) * PAGE_SIZE / SOURCE_PAGE_SIZE) + 1;
  const offset = ((page - 1) * PAGE_SIZE) % SOURCE_PAGE_SIZE;
  const data = await sourceListing(category, query, sort, sourcePage);
  return {...data, products:data.products.slice(offset, offset + PAGE_SIZE), pages:Math.max(1,Math.ceil(data.total/PAGE_SIZE))};
}
export function purchase(sourceUrl: string) {
  try {
    const u=new URL(sourceUrl);
    if (u.protocol !== 'https:' || !['weidian.com','www.weidian.com','item.taobao.com','detail.tmall.com','detail.1688.com'].includes(u.hostname)) return '';
    return `https://item2.kakobuy.com/item/details?url=${encodeURIComponent(u.href)}&affcode=rf8x8`;
  } catch { return ''; }
}
export async function detail(path: string) {
  if (!/^\/[a-z-]+\/\d+\.html$/.test(path)) throw new Error('Invalid product path');
  const doc = await source(path);
  const title=txt(doc.querySelector('h1.product-title'));
  if (!title) throw new Error('Product unavailable');
  const sourceUrl=attr(doc.querySelector('.weidian-btn'),'href');
  return {path,title,category:path.split('/')[1],price:txt(doc.querySelector('.product-detail .product-price')),sourceId:attr(doc.querySelector('meta[itemprop="sku"]'),'content'),sourceUrl,buy:purchase(sourceUrl),images:[...new Set([...doc.querySelectorAll('.gallery-slide img')].map((im:any)=>imageURL(attr(im,'src'))).filter(Boolean))] as string[],description:txt(doc.querySelector('.product-copy p')),related:cards(doc).slice(0,4)};
}
