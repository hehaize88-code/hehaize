import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import worker from '../_worker.js';
const ctx={waitUntil(){},passThroughOnException(){}};
const root=new URL('../',import.meta.url);
const env={ASSETS:{async fetch(request){const path=new URL(request.url).pathname;try{return new Response(await readFile(new URL('.'+path,root)),{headers:{'content-type':path.endsWith('.xml')?'application/xml':'text/plain'}})}catch{return new Response('',{status:404})}}}};
test('legacy URLs keep exact product, language and query destinations',async()=>{
 for(const [from,to] of [['/product/3402','/catalog/shoes/1011.html'],['/de/products?keywords=running+shoes&sort=price','/de/catalog/?sort=price&q=running+shoes'],['/category/jerseys','/catalog/jersey/']]){
  const r=await worker.fetch(new Request('https://cssbuychina.net'+from),env,ctx);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://cssbuychina.net'+to);
 }
});
test('production bundle serves CSSBuy purchase links and dynamic sitemap',async()=>{
 const saved=globalThis.fetch;
 try{
  globalThis.fetch=async u=>new Response(String(u).endsWith('/sitemap.xml')?'<urlset><url><loc>https://cnbuycha.com/AllProducts/</loc></url><url><loc>https://cnbuycha.com/accessories/3458.html</loc></url></urlset>':await readFile(new URL('tests/fixtures/source-detail.html',root),'utf8'));
  const r=await worker.fetch(new Request('https://cssbuychina.net/es/catalog/accessories/3458.html'),env,ctx);const html=await r.text();assert.equal(r.status,200);assert.match(html,/https:\/\/www.cssbuy.com\/shop\/goodsDetail\?type=micro&amp;id=7874413518/);assert.doesNotMatch(html,/uufinds/i);assert.match(html,/gtag/);
  const xml=await(await worker.fetch(new Request('https://cssbuychina.net/catalog-sitemap.xml'),env,ctx)).text();for(const p of ['','/de','/es','/pt-br'])assert.ok(xml.includes('https://cssbuychina.net'+p+'/catalog/accessories/3458.html'));assert.equal((xml.match(/<url>/g)||[]).length,8);
  const index=await(await worker.fetch(new Request('https://cssbuychina.net/sitemap.xml'),env,ctx)).text();assert.match(index,/sitemapindex/);assert.match(index,/editorial-sitemap.xml/);assert.match(index,/catalog-sitemap.xml/);
 }finally{globalThis.fetch=saved}
});
