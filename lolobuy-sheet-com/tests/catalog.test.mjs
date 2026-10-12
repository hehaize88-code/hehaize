import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {catalogueRoute,parseList,parseDetail,buyUrl,LANGS} from '../commerce/catalog.mjs';
import {nav,navigation,SITE_REGISTER} from '../commerce/chrome.mjs';
const list=fs.readFileSync(new URL('./fixtures/catalog-list.html',import.meta.url),'utf8');
const detail=fs.readFileSync(new URL('./fixtures/catalog-detail.html',import.meta.url),'utf8');
let requested=[];const nativeFetch=globalThis.fetch;
globalThis.fetch=async(url)=>{requested.push(new URL(url));return new Response(String(url).includes('.html')?detail:list)};
test.after(()=>globalThis.fetch=nativeFetch);
test('uses real source data, all list results and ordered source images',()=>{
 const l=parseList(list),d=parseDetail(detail);assert.equal(l.total,3436);assert.equal(l.products.length,60);assert.equal(d.sourceId,'7874413518');assert.equal(d.images.length,5);assert.equal(d.images[0],l.products[0].image);assert.equal(d.price,l.products[0].price);
});
test('purchase URL exactly matches the requested format and rejects an internal ID',()=>{
 assert.equal(buyUrl('7874413518'),'https://www.lolobuy.com/productDetail/7874413518?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D7874413518');assert.equal(buyUrl('3459'),null);assert.equal(buyUrl('javascript:alert(1)'),null);
 const missing=detail.replaceAll('https://weidian.com/item.html?itemID=7874413518','https://example.com/unknown');assert.equal(parseDetail(missing).sourceId,'');
});
test('five languages preserve products, official navigation and exact buying destination',async()=>{
 for(const lang of LANGS){const p=lang==='en'?'':'/'+lang;const r=await catalogueRoute(new Request('https://lolobuy-sheet.com'+p+'/catalog/other-stuff/3459.html'),{});const html=await r.text();assert.equal(r.status,200);assert.equal(r.headers.get('content-language'),lang);assert.ok(html.includes(buyUrl('7874413518').replaceAll('&','&amp;')));assert.match(html,new RegExp('<html lang="'+lang+'"'));assert.equal((html.match(/data-gallery-index=/g)||[]).length,5);assert.ok(html.includes(nav(lang,'/catalog/other-stuff/3459.html')));assert.match(html,/hreflang="x-default"/);assert.match(html,/lolobuy-icon.png/);}
});
test('forwards keyword, category, sorting and page; filtered pages are noindex',async()=>{
 requested=[];const r=await catalogueRoute(new Request('https://lolobuy-sheet.com/de/catalog/shoes/?q=runner&sort=price&page=2'),{});const h=await r.text();assert.equal(requested[0].hostname,'cnbuycha.com');assert.equal(requested[0].pathname,'/shoes/');assert.equal(requested[0].searchParams.get('q'),'runner');assert.equal(requested[0].searchParams.get('sort'),'price');assert.equal(requested[0].searchParams.get('page'),'2');assert.match(h,/noindex,follow/);assert.match(h,/href="\/fr\/catalog\/shoes\/\?q=runner&amp;sort=price&amp;page=2"/);
});
test('unknown routes return 404 and upstream failures do not show fabricated products',async()=>{
 assert.equal((await catalogueRoute(new Request('https://lolobuy-sheet.com/catalog/no-such/'),{})).status,404);
 const old=globalThis.fetch;globalThis.fetch=async()=>new Response('unavailable',{status:503});const r=await catalogueRoute(new Request('https://lolobuy-sheet.com/catalog/'),{});assert.equal(r.status,503);assert.match(await r.text(),/temporarily unavailable/);globalThis.fetch=old;
});
test('image search is local, labelled honestly and uses complete source image index',async()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../public/catalog-image-index.json',import.meta.url)));assert.equal(data.source,'https://cnbuycha.com');assert.equal(data.indexedCount,data.catalogCount);assert.equal(data.products.length,3436);assert.ok(data.products.every(p=>p.hash?.length===64&&p.cells?.length===48));const r=await catalogueRoute(new Request('https://lolobuy-sheet.com/catalog/image-search/'),{});const h=await r.text();assert.match(h,/compared on your device/);assert.match(h,/visual similarity/);assert.match(h,/noindex,follow/);
});
test('all header destinations are shared and registration is the supplied official URL',()=>{
 assert.equal(SITE_REGISTER,'https://www.lolobuy.com/index');for(const lang of LANGS){assert.equal(navigation(lang).length,7);assert.ok(nav(lang,'/').includes(SITE_REGISTER));}
});
