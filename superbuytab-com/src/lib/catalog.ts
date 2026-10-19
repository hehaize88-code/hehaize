import { parseHTML } from 'linkedom/worker';
export const ORIGIN = 'https://cnbuycha.com';
export const LOGO = '/brand/superbuy-logo.svg';
export const FAVICON = '/brand/favicon.svg';
export const REGISTER = 'https://www.superbuy.com/en/page/register/?ref=https%3A%2F%2Fwww.superbuy.com%2Fen%2Fpage%2Fbuy%2F%3Furl%3Dhttps%253A%252F%252Fweidian.com%252Fitem.html%253FitemID%253D7831516792%26partnercode%3DES7pVI';
export const PAGE_SIZE = 20;
export const slugs = ['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
export type Product = { path: string; title: string; image: string; price: string; category: string };
const txt = (el: any) => (el?.textContent || '').trim();
const attr = (el: any, key: string) => el?.getAttribute(key) || '';
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
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { Accept: 'text/html' } });
  if (!response.ok) throw new Error(`Catalog HTTP ${response.status}`);
  const html = await response.text();
  if (html.length > 2500000) throw new Error('Catalog response too large');
  return parseHTML(html).document;
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
export async function listing(category: string, query: string, sort: string, page: number) {
  const sourcePage = Math.floor((page - 1) / 3) + 1;
  const offset = ((page - 1) % 3) * PAGE_SIZE;
  const params = new URLSearchParams({sort: ['new','click','price'].includes(sort) ? sort : 'new', page: String(sourcePage)});
  if (query) params.set('q',query.slice(0,120));
  const path = slugs.includes(category) ? `/${category}/` : '/AllProducts/';
  const doc = await source(`${path}?${params}`);
  const summary = txt(doc.querySelector('.results-summary'));
  if (!summary) throw new Error('Catalog markup changed');
  const total = Number(summary.replace(/\D/g,''));
  return {products: cards(doc).slice(offset, offset + PAGE_SIZE), total, pages: Math.max(1,Math.ceil(total/PAGE_SIZE))};
}
export function purchase(sourceUrl: string) {
  try {
    const u=new URL(sourceUrl);
    if (u.protocol !== 'https:' || !['weidian.com','www.weidian.com','item.taobao.com','detail.tmall.com','detail.1688.com'].includes(u.hostname)) return '';
    if (u.username || u.password || u.port) return '';
    const link = new URL('https://www.superbuy.com/en/page/buy/');
    link.searchParams.set('url',u.href);
    link.searchParams.set('partnercode','ES7pVI');
    return link.href;
  } catch { return ''; }
}
export function productPath(path: string) { const match=path.match(/^\/([a-z-]+)\/(\d+)\.html$/); return match ? `/products/${match[1]}/${match[2]}/` : '/spreadsheet/'; }
export async function detail(path: string) {
  if (!/^\/[a-z-]+\/\d+\.html$/.test(path)) throw new Error('Invalid product path');
  const doc = await source(path);
  const title=txt(doc.querySelector('h1.product-title'));
  if (!title) throw new Error('Product unavailable');
  const sourceUrl=attr(doc.querySelector('.weidian-btn'),'href');
  return {path,title,category:path.split('/')[1],price:txt(doc.querySelector('.product-detail .product-price')),sourceId:attr(doc.querySelector('meta[itemprop="sku"]'),'content'),sourceUrl,buy:purchase(sourceUrl),images:[...new Set([...doc.querySelectorAll('.gallery-slide img')].map((im:any)=>imageURL(attr(im,'src'))).filter(Boolean))] as string[],description:txt(doc.querySelector('.product-copy p')),related:cards(doc).slice(0,4)};
}

