import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseList,parseDetail,buyUrl,LANGS,catalogueRoute} from '../commerce/catalog.mjs';
import worker from '../_worker.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const list=`<div class="results-summary">121 products</div><article class="product-card"><a href="/shoes/42.html"><img src="/media/front.jpg"><h3>Shoe &amp; bag</h3><span data-currency="USD">12.50</span><div class="product-views"><span>23</span></div></a></article>`;
const detail=`<section class="product-detail"><meta itemprop="sku" content="7874413518"><h1>Shoe &amp; bag</h1><meta itemprop="price" content="12.50"><img itemprop="image" src="/media/front.jpg"><img itemprop="image" src="/media/qc.jpg"><img itemprop="image" src="/media/front.jpg"><a href="https://weidian.com/item.html?itemID=7874413518">Source</a></section>`;
let requested=[];
globalThis.fetch=async url=>{const u=new URL(url);requested.push(u);return new Response(u.pathname.endsWith('.html')?detail:u.pathname==='/sitemap.xml'?'<urlset><url><loc>https://cnbuycha.com/shoes/42.html</loc></url></urlset>':list,{headers:{'content-type':'text/html'}})};
const env={ASSETS:{fetch:async request=>{
 let p=new URL(request.url).pathname;if(p.endsWith('/'))p+='index.html';
 try{return new Response(fs.readFileSync(root+p),{headers:{'content-type':p.endsWith('.html')?'text/html':'text/plain'}})}catch{return new Response('Missing',{status:404})}
}}};
test('source parsing preserves price, decoded title, ID, main image and gallery order',()=>{
 const p=parseList(list);assert.equal(p.total,121);assert.equal(p.pages,3);assert.equal(p.products[0].price,'12.50');assert.equal(p.products[0].title,'Shoe & bag');
 const d=parseDetail(detail);assert.equal(d.sourceId,'7874413518');assert.deepEqual(d.images,['https://cnbuycha.com/media/front.jpg','https://cnbuycha.com/media/qc.jpg']);
});
test('purchase URLs use each original item ID and encode the nested URL',()=>{
 for(const id of ['7874413518','1234567890']){const u=new URL(buyUrl(id));assert.equal(u.origin,'https://www.pikobuy.com');assert.equal(new URL(u.searchParams.get('productUrl')).searchParams.get('itemID'),id)}
 assert.equal(buyUrl('42'),null);assert.equal(buyUrl('12345&x=1'),null);
});
test('all seven catalogue languages retain complete navigation and localized labels',async()=>{
 for(const lang of LANGS){const pre=lang==='en'?'':'/'+lang;const r=await worker.fetch(new Request('https://pikobuy-sheet.net'+pre+'/catalog/'),env);assert.equal(r.status,200);const s=await r.text();assert.ok(s.includes(`<html lang="${lang}">`));assert.ok(s.includes(pre+'/guides/pikobuy-qc-checklist/'));assert.ok(s.includes(pre+'/guides/pikobuy-shipping-cost/'));assert.ok(s.includes(pre+'/seo-articles/'));assert.ok(s.includes(pre+'/faq/'));assert.ok(s.includes('mode=register&amp;redirect=/home'));assert.ok(s.includes('hreflang="x-default"'));}
});
test('query, sorting, paging and language links preserve state; search is noindex',async()=>{
 const r=await catalogueRoute(new Request('https://pikobuy-sheet.net/fr/catalog/shoes/?q=shirt&sort=price&page=2'),env);const s=await r.text();const u=requested.at(-1);assert.equal(u.pathname,'/shoes/');assert.equal(u.searchParams.get('q'),'shirt');assert.equal(u.searchParams.get('sort'),'price');assert.equal(u.searchParams.get('page'),'2');assert.ok(s.includes('noindex,follow'));assert.ok(s.includes('/de/catalog/shoes/?q=shirt&amp;sort=price&amp;page=2'));
});
test('detail page renders the matching purchase link and ordered photos',async()=>{
 const r=await worker.fetch(new Request('https://pikobuy-sheet.net/catalog/shoes/42.html'),env);const s=await r.text();assert.equal(r.status,200);assert.ok(s.includes(buyUrl('7874413518')));assert.ok(s.includes('data-gallery-index="1"'));assert.ok(s.indexOf('/media/front.jpg')<s.indexOf('/media/qc.jpg'));
});
test('legacy product and listing routes stay on this site and retain locale/query',async()=>{
 let r=await worker.fetch(new Request('https://pikobuy-sheet.net/de/finds/hoka-speedgoat-5-3359/'),env);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://pikobuy-sheet.net/de/catalog/shoes/3328.html');
 r=await worker.fetch(new Request('https://pikobuy-sheet.net/pt/search.html?keywords=shirt&sort=price'),env);const u=new URL(r.headers.get('location'));assert.equal(u.pathname,'/pt/catalog/');assert.equal(u.searchParams.get('keywords'),'shirt');assert.equal(u.searchParams.get('sort'),'price');
});
test('sitemap includes product routes for each language and excludes search URLs',async()=>{
 const r=await worker.fetch(new Request('https://pikobuy-sheet.net/catalog-sitemap.xml'),env);const s=await r.text();for(const lang of LANGS)assert.ok(s.includes((lang==='en'?'':'/'+lang)+'/catalog/shoes/42.html'));assert.ok(!s.includes('?q='));
});
test('unknown routes, private source routes and upstream failures cannot become soft 200s',async()=>{
 let r=await worker.fetch(new Request('https://pikobuy-sheet.net/commerce/catalog.mjs'),env);assert.equal(r.status,404);
 const saved=fetch;globalThis.fetch=async()=>new Response('Unavailable',{status:503});r=await worker.fetch(new Request('https://pikobuy-sheet.net/catalog/'),env);assert.equal(r.status,503);assert.equal(r.headers.get('cache-control'),'no-store');globalThis.fetch=saved;
});
test('homepage, FAQ, articles and guides all retain shared registration/navigation',async()=>{
 for(const lang of LANGS){const pre=lang==='en'?'':'/'+lang;for(const route of ['/','/faq/','/seo-articles/','/guides/pikobuy-qc-checklist/']){const r=await worker.fetch(new Request('https://pikobuy-sheet.net'+pre+route),env);assert.equal(r.status,200);const s=await r.text();assert.ok(s.includes('piko-header'));assert.ok(s.includes(pre+'/catalog/'));assert.ok(s.includes('/pikobuy-icon.png'));assert.ok(s.includes('mode=register&amp;redirect=/home'));}}
});
test('image-search data is complete, dated and sourced only from cnbuycha',()=>{
 const data=JSON.parse(fs.readFileSync(root+'/catalog-image-index.json'));assert.equal(data.source,'https://cnbuycha.com');assert.equal(data.catalogCount,data.indexedCount);assert.equal(data.indexedCount,data.products.length);assert.ok(data.products.length>3400);for(const p of data.products){assert.equal(p.hash.length,64);assert.equal(p.cells.length,48);assert.match(p.path,/^\/[a-z0-9-]+\/\d+\.html$/i)}
});
