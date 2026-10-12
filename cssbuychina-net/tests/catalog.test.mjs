import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseList,parseDetail,buyUrl,catalogueRoute,REGISTER_URL} from '../commerce/catalog.js';
const list=await readFile(new URL('./fixtures/source-list.html',import.meta.url),'utf8');
const detail=await readFile(new URL('./fixtures/source-detail.html',import.meta.url),'utf8');
test('parses the source renderer, preserving USD prices and gallery order',()=>{
 const data=parseList(list);assert.equal(data.total,121);assert.equal(data.pages,3);assert.equal(data.products[0].path,'/accessories/3458.html');assert.equal(data.products[0].price,'25.00');assert.equal(data.products[0].image,'https://cnbuycha.com/media/products/3458/main.webp?v=2');
 const p=parseDetail(detail);assert.equal(p.sourceId,'7874413518');assert.deepEqual(p.images,['https://cnbuycha.com/media/products/3458/main.webp?v=2','https://cnbuycha.com/media/products/3458/qc.webp?v=2']);
 assert.equal(buyUrl(p.sourceId),'https://www.cssbuy.com/shop/goodsDetail?type=micro&id=7874413518');assert.equal(buyUrl('3458'),null);assert.equal(buyUrl('https://bad.example'),null);assert.equal(REGISTER_URL,'https://www.cssbuy.com/index');
});
test('forwards category, search, sorting and page; keeps them across languages',async()=>{
 const original=globalThis.fetch;let requested;
 globalThis.fetch=async u=>{requested=new URL(u);return new Response(list,{headers:{'content-type':'text/html'}})};
 try{
  for(const locale of ['','/de','/es','/pt-br']){
   const r=await catalogueRoute(new Request('https://cssbuychina.net'+locale+'/catalog/accessories/?q=bag&sort=price&page=2'),{});assert.equal(r.status,200);const html=await r.text();assert.equal(requested.origin,'https://cnbuycha.com');assert.equal(requested.pathname,'/accessories/');assert.equal(requested.searchParams.get('q'),'bag');assert.equal(requested.searchParams.get('sort'),'price');assert.equal(requested.searchParams.get('page'),'2');
   assert.ok(html.includes('href="/de/catalog/accessories/?q=bag&amp;sort=price&amp;page=2"'));assert.match(html,/noindex,follow/);assert.ok(html.includes(locale+'/catalog/accessories/3458.html'));assert.match(html,/hreflang="x-default"/);assert.doesNotMatch(html,/uufinds/i);
  }
 }finally{globalThis.fetch=original}
});
test('detail uses marketplace source ID and handles missing and unavailable data distinctly',async()=>{
 const original=globalThis.fetch;try{
  globalThis.fetch=async()=>new Response(detail);
  let r=await catalogueRoute(new Request('https://cssbuychina.net/catalog/accessories/3458.html'),{});const html=await r.text();assert.match(html,/id=7874413518/);assert.ok(html.indexOf('main.webp?v=2')<html.indexOf('qc.webp?v=2'));assert.match(html,/data-gallery-next/);
  globalThis.fetch=async()=>new Response('',{status:404});r=await catalogueRoute(new Request('https://cssbuychina.net/catalog/accessories/9999.html'),{});assert.equal(r.status,404);
  globalThis.fetch=async()=>{throw Error('timeout')};r=await catalogueRoute(new Request('https://cssbuychina.net/catalog/'),{});assert.equal(r.status,503);
 }finally{globalThis.fetch=original}
});
test('image search exposes accessible controls in every existing language and a complete source index',async()=>{
 const index=JSON.parse(await readFile(new URL('../public/catalog-image-index.json',import.meta.url),'utf8'));
 assert.equal(index.products.length,index.indexedCount);assert.ok(index.indexedCount>3000);
 assert.ok(index.products.every(p=>/^\/[a-z0-9-]+\/\d+\.html$/.test(p.path)&&p.hash.length===64&&p.cells.length===48));
 for(const l of ['','/de','/es','/pt-br']){const r=await catalogueRoute(new Request('https://cssbuychina.net'+l+'/catalog/image-search/'),{});const html=await r.text();assert.equal(r.status,200);assert.match(html,/type="file"/);assert.match(html,/aria-live="polite"/);assert.match(html,/noindex,follow/)}
});
