import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../out/',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
for(const locale of ['', 'en-gb/','de/','pl/','pt-br/']){
 const html=await read(locale+'index.html');
 assert.match(html,/https:\/\/www.uufinds.com\/register/,'Official registration must be present');
 assert.match(html,new RegExp(`action="/${locale}catalog/"`),'Search remains in the matching locale');
 assert.match(html,/UUFinds Spreadsheet/,'Primary homepage keyword');
 assert.match(html,/rel="canonical"/);assert.match(html,/hreflang="x-default"/i);
 assert.equal((html.match(/class="seo-live-card"/g)||[]).length,4);
 assert.equal((html.match(/class="seo-article-grid"/g)||[]).length,1);
 assert(!html.includes('action="https://cnbuycha.com/search.html"'));
 const article=await read(locale+'articles/index.html');assert(!article.includes('<title>404:'));
}
const index=JSON.parse(await read('catalog-image-index.json'));
assert.equal(index.source,'https://cnbuycha.com');
let photos=index.products;
if(index.version===2){
 assert.equal(index.descriptorAlgorithm,'area-v2');
 photos=[];for(const shard of index.shards){const chunk=JSON.parse(await read(shard.url.replace(/^\//,'')));assert.equal(chunk.products.length,shard.count);photos.push(...chunk.products);}
 assert.equal(photos.length,index.indexedImageCount);assert.equal(new Set(photos.map(p=>p.path)).size,index.indexedProductCount);
 assert(index.indexedImageCount>index.indexedProductCount*2,'Index must contain detail images as well as first images');
 const jacket=photos.filter(p=>p.path==='/jackets/3485.html'&&p.kind==='gallery');assert.equal(jacket.length,4,'All screenshot product gallery images must be searchable');
 assert.deepEqual(jacket.map(p=>p.imageIndex).sort(),[0,1,2,3]);
}else{assert.equal(photos.length,index.indexedCount);}
assert(new Set(photos.map(p=>p.path)).size>3000);
for(const p of photos){assert.match(p.hash,/^[01]{64}$/);assert.equal(p.cells.length,48);assert.match(p.path,/^\/[a-z0-9-]+\/\d+\.html$/i);assert(Number.isFinite(Number(p.price)));}
// Every visible language link on an editorial page has a matching document.
for(const path of ['faq','articles','how-it-works','about','privacy','guides/uufinds-qc-checklist']){
 const page=await read(path+'/index.html'),panel=page.match(/<div class="language-panel">([\s\S]*?)<\/div>/)?.[1];assert(panel);
 const targets=[...panel.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1]);assert.equal(targets.length,5);
 for(const target of targets){assert(target.endsWith('/'+path+'/'),target+' preserves current page');assert(!target.includes('/catalog/'));assert((await read(target.slice(1)+'index.html')).includes('<html'));}
}
const worker=await read('_worker.js');assert.match(worker,/catalogueRoute/);assert.match(worker,/catalog-sitemap.xml/);
const workerSource=await readFile(new URL('../commerce/pages-worker.js',import.meta.url),'utf8');
const cacheDeclaration=workerSource.match(/const HTML_CACHE_VERSION = "[^"]+";/)?.[0];
assert(cacheDeclaration,'Source worker declares its cache version');
assert(worker.includes(cacheDeclaration),'Published worker must use the current source cache version');
for(const file of ['favicon.ico','uufinds-official-logo.png','catalog.css','catalog.js'])assert((await stat(new URL(file,root))).size>0);
console.log(`Validated five localized homepages, existing article archives, official links and ${photos.length} indexed source photos.`);
