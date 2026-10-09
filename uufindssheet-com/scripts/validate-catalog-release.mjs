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
assert.equal(index.source,'https://cnbuycha.com');assert.equal(index.products.length,index.indexedCount);assert.equal(index.catalogCount,index.indexedCount,'Every readable source image must be indexed');
assert(index.products.length>3000);assert.equal(new Set(index.products.map(p=>p.path)).size,index.products.length);
for(const p of index.products){assert.match(p.hash,/^[01]{64}$/);assert.equal(p.cells.length,48);assert.match(p.path,/^\/[a-z0-9-]+\/\d+\.html$/i);assert(Number.isFinite(Number(p.price)));}
const worker=await read('_worker.js');assert.match(worker,/catalogueRoute/);assert.match(worker,/catalog-sitemap.xml/);
const workerSource=await readFile(new URL('../commerce/pages-worker.js',import.meta.url),'utf8');
const cacheDeclaration=workerSource.match(/const HTML_CACHE_VERSION = "[^"]+";/)?.[0];
assert(cacheDeclaration,'Source worker declares its cache version');
assert(worker.includes(cacheDeclaration),'Published worker must use the current source cache version');
for(const file of ['favicon.ico','uufinds-official-logo.png','catalog.css','catalog.js'])assert((await stat(new URL(file,root))).size>0);
console.log(`Validated five localized homepages, existing article archives, official links and ${index.indexedCount} indexed source images.`);
