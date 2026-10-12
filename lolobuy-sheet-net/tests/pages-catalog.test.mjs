import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
import worker from '../dist/client/_worker.js';
const base=new URL('../dist/client/',import.meta.url);const nativeFetch=globalThis.fetch;
const list=fs.readFileSync(new URL('./fixtures/catalog-list.html',import.meta.url),'utf8'),detail=fs.readFileSync(new URL('./fixtures/catalog-detail.html',import.meta.url),'utf8');
globalThis.fetch=async(url)=>new Response(String(url).endsWith('/sitemap.xml')?'<urlset><url><loc>https://cnbuycha.com/other-stuff/3459.html</loc></url></urlset>':String(url).includes('.html')?detail:list);
test.after(()=>globalThis.fetch=nativeFetch);
const env={ASSETS:{async fetch(req){const p=new URL(req.url).pathname;try{return new Response(fs.readFileSync(new URL('.'+p,base)),{headers:{'content-type':p.endsWith('.svg')?'image/svg+xml':p.endsWith('.css')?'text/css':p.endsWith('.png')?'image/png':'application/javascript'}})}catch{return new Response('Not found',{status:404})}}}};
const get=p=>worker.fetch(new Request('https://lolobuy-sheet.net'+p,{headers:{accept:'text/html'}}),env,{});
test('deployed worker preserves every main editorial route and all five localized headers',async()=>{
 for(const lang of ['en','es','de','fr','it'])for(const route of ['/','/categories','/how-it-works','/qc-guide','/shipping','/articles','/faq']){const p=lang!=='en'&&route==='/'?'/'+lang:(lang==='en'?'':'/'+lang)+route,r=await get(p),h=await r.text();assert.equal(r.status,200,p);assert.match(h,/<header class="lolo-header"/);assert.match(h,/https:\/\/www.lolobuy.com\/index/);assert.equal((h.match(/<header[\s\S]*?<\/header>/)?.[0].match(/<nav[\s\S]*?<\/nav>/)?.[0].match(/<a /g)||[]).length,7,p);assert.ok(h.includes('lang="'+lang+'"'));const assets=[...h.matchAll(/(?:href|src)="(\/assets\/[^"?]+)/g)].map(m=>m[1]);assert.ok(assets.length);for(const a of assets)assert.ok(fs.existsSync(new URL('.'+a,base)),a);}
});
test('deployed catalogue, search and detail endpoints return the source data',async()=>{
 for(const p of ['/catalog/','/es/catalog/?q=shoes&sort=price','/fr/catalog/other-stuff/3459.html','/de/catalog/image-search/','/api/catalog'])assert.equal((await get(p)).status,200,p);
 const h=await(await get('/catalog/other-stuff/3459.html')).text();assert.match(h,/productDetail\/7874413518\?url=https%3A%2F%2Fweidian/);assert.match((await get('/catalog/')).headers.get('content-security-policy'),/img-src 'self' https:/);
});
test('legacy links keep locale, query and the same product',async()=>{
 for(const [p,target] of [['/de/finds?q=runner','/de/catalog/?q=runner'],['/products/3372','/catalog/accessories/3359.html'],['/it/products/3371','/it/catalog/headwear/3353.html']]){const r=await get(p);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://lolobuy-sheet.net'+target)}
});
test('sitemap entry point covers editorial and live catalogue URLs; nonexistent routes are 404',async()=>{
 const index=await(await get('/sitemap.xml')).text();assert.match(index,/<sitemapindex/);assert.match(index,/editorial-sitemap.xml/);assert.match(index,/catalog-sitemap.xml/);const editorial=await(await get('/editorial-sitemap.xml')).text();assert.ok((editorial.match(/<url>/g)||[]).length>=100);const catalog=await(await get('/catalog-sitemap.xml')).text();assert.equal((catalog.match(/<url>/g)||[]).length,5);assert.match(catalog,/\/fr\/catalog\/other-stuff\/3459.html/);assert.equal((await get('/does-not-exist')).status,404);
});
test('official artwork and catalogue assets are packaged',async()=>{
 for(const p of ['/lolobuy-official.svg','/lolobuy-icon.png','/catalog.css','/catalog.js','/site-shell.css','/catalog-image-index.json','/commerce-events.js'])assert.equal((await get(p)).status,200,p);
});
