import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseList,parseDetail,buyUrl,catalogueRoute,LANGS,COPY,CATEGORY_LABELS} from '../commerce/catalog.js';
import {renderHome} from '../commerce/home.js';
import {commerceRoutes,RELEASE} from '../commerce/routes.js';
import {EXTRA} from '../commerce/translations.js';
import {EDITORIAL,SNAPSHOT,LEGACY_PRODUCTS} from '../commerce/content.js';
const listing=await readFile(new URL('./fixtures/cnbuycha-list.html',import.meta.url),'utf8');
const detail=await readFile(new URL('./fixtures/cnbuycha-detail.html',import.meta.url),'utf8');
async function mockFetch(response,run){const original=globalThis.fetch;globalThis.fetch=response;try{await run()}finally{globalThis.fetch=original}}
test('real source list keeps all 60 results and 3436-product pagination',()=>{const p=parseList(listing);assert.equal(p.total,3436);assert.equal(p.pages,58);assert.equal(p.products.length,60);assert.deepEqual(p.products[0],{path:'/shoes/3459.html',title:'Lego',image:'https://cnbuycha.com/media/products/3459/60e678b3-3d2e-4ef2-b0e3-07fe8fce94f2.jpg?v=2',price:'22.22',views:4});});
test('real example uses source ID 7874413518, never internal ID 3459, and all five photos',()=>{const p=parseDetail(detail);assert.equal(p.sourceId,'7874413518');assert.equal(p.images.length,5);assert.match(p.images[0],/60e678b3/);assert.equal(p.price,'22.22');assert.equal(buyUrl(p.sourceId),'https://joyagoo.com/product?id=7874413518&platform=WEIDIAN');});
test('per-item purchase handoffs cannot reuse the example ID',()=>{for(const id of ['7861175344','7788829484','7874413518']){const u=new URL(buyUrl(id));assert.equal(u.hostname,'joyagoo.com');assert.equal(u.pathname,'/product');assert.equal(u.searchParams.get('id'),id);assert.equal(u.searchParams.get('platform'),'WEIDIAN');}assert.equal(buyUrl('3459'),null);assert.equal(buyUrl('x<script>'),null);assert.equal(parseDetail(detail.replace('ID: 7874413518','ID: ')).sourceId,'');});
test('keyword, category, sort and page are delegated to the source, and language switching keeps the query',async()=>{let called;await mockFetch(async u=>{called=new URL(u);return new Response(listing)},async()=>{const r=await catalogueRoute(new Request('https://joyagoochina.org/de/catalog/shoes/?q=Nike%20%26%20Air&sort=price&page=2'),{});assert.equal(r.status,200);assert.equal(called.origin,'https://cnbuycha.com');assert.equal(called.pathname,'/shoes/');assert.equal(called.searchParams.get('q'),'Nike & Air');assert.equal(called.searchParams.get('sort'),'price');assert.equal(called.searchParams.get('page'),'2');const html=await r.text();assert.match(html,/<html lang="de"/);assert.match(html,/noindex,follow/);assert.match(html,/joyagoo.com\/login/);assert.match(html,/\/fr\/catalog\/shoes\/\?q=Nike%20%26%20Air/);assert.match(html,/2 \/ 58/);});});
test('every language has complete navigation, categories, homepage, article links and image search',async()=>{for(const lang of LANGS){assert.equal(COPY[lang].length,21,lang);assert.equal(CATEGORY_LABELS[lang].length,12,lang);assert.ok(Object.values(EXTRA[lang]).every(v=>typeof v==='string'&&v.length),lang);assert.equal(EDITORIAL[lang].articles.length,4,lang);const html=await renderHome(lang,SNAPSHOT.products).text();assert.match(html,new RegExp('<html lang="'+lang+'"'));assert.match(html,/<h1>Joyagoo Spreadsheet/);assert.equal((html.match(/class="hero-find"/g)||[]).length,4);assert.match(html,/hreflang="x-default"/);assert.doesNotMatch(html,/undefined|UUFinds|uufinds/);const pre=lang==='en'?'':'/'+lang;const image=await catalogueRoute(new Request('https://joyagoochina.org'+pre+'/catalog/image-search/'),{});assert.equal(image.status,200);assert.match(await image.text(),/id="image-file"/);}});
test('invalid paths cannot proxy admin or another host',async()=>{let calls=0;await mockFetch(async()=>{calls++;throw Error()},async()=>{for(const path of ['yc.php/','admin/1.html','https://evil.example/']){const r=await catalogueRoute(new Request('https://joyagoochina.org/catalog/'+path),{});assert.equal(r.status,404);}assert.equal(calls,0)});});
test('source failure and removed source item are distinct errors',async()=>{await mockFetch(async()=>new Response('Unavailable',{status:503}),async()=>{const r=await catalogueRoute(new Request('https://joyagoochina.org/catalog/'),{});assert.equal(r.status,503);assert.equal(r.headers.get('cache-control'),'no-store')});await mockFetch(async()=>new Response('Missing',{status:404}),async()=>{const r=await catalogueRoute(new Request('https://joyagoochina.org/catalog/shoes/99999.html'),{});assert.equal(r.status,404)});});
test('full detail route exposes the correct buy URL and five ordered thumbnail controls',async()=>{await mockFetch(async()=>new Response(detail),async()=>{const r=await catalogueRoute(new Request('https://joyagoochina.org/fr/catalog/shoes/3459.html'),{});const html=await r.text();assert.equal(r.status,200);assert.match(html,/https:\/\/joyagoo.com\/product\?id=7874413518&amp;platform=WEIDIAN/);assert.equal((html.match(/data-gallery-index=/g)||[]).length,5);assert.doesNotMatch(html,/cnbuycha.com\/yc.php|wa.me|uufinds/)});});
test('old product and search links redirect without changing the item or search term',async()=>{for(const [old,path] of Object.entries(LEGACY_PRODUCTS)){const r=await commerceRoutes(new Request('https://joyagoochina.org/es'+old),{},{});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://joyagoochina.org/es/catalog'+path)}const r=await commerceRoutes(new Request('https://joyagoochina.org/de/search.html?keywords=coat&channelid=2'),{},{});assert.equal(r.headers.get('location'),'https://joyagoochina.org/de/catalog/?q=coat');});
test('homepage uses live items, while failed reads clearly date the snapshot',async()=>{await mockFetch(async()=>new Response(listing),async()=>{const r=await commerceRoutes(new Request('https://joyagoochina.org/'),{},{});const html=await r.text();assert.match(html,/Lego/);assert.equal(r.headers.has('x-catalog-snapshot'),false)});await mockFetch(async()=>{throw Error()},async()=>{const r=await commerceRoutes(new Request('https://joyagoochina.org/it/'),{},{});assert.equal(r.headers.get('x-catalog-snapshot'),SNAPSHOT.date);assert.match(await r.text(),new RegExp(SNAPSHOT.date))});});
test('image index covers all catalogue products and verifies every gallery, style and seller shard',async()=>{
 const {createHash}=await import('node:crypto');
 const {gunzipSync}=await import('node:zlib');
 const asset=path=>readFile(new URL('../public'+path,import.meta.url));
 const manifest=JSON.parse(await asset('/catalog-image-index.json'));
 assert.equal(manifest.descriptorAlgorithm,'compact-rgb-dhash');
 const counts={source:0,gallery:0,style:0},paths=new Set();
 for(const shard of manifest.shards){
  const bytes=await asset(shard.url);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),shard.sha256);
  let count=0;
  for(const [path,images] of JSON.parse(gunzipSync(bytes))){
   assert.match(path,/^\/[a-z0-9-]+\/\d+\.html$/);assert.ok(!paths.has(path));paths.add(path);
   for(const [url,hash,color,type] of images){
    assert.match(url,/^(?:https:\/\/|\/)/);assert.match(hash,/^[a-f0-9]{16,17}$/);
    assert.equal(Buffer.from(color,'base64').length,48);assert.ok(type in counts);counts[type]++;count++;
   }
  }
  assert.equal(count,shard.count);
 }
 assert.equal(paths.size,manifest.catalogCount);
 assert.equal(counts.style,manifest.styleImageCount);
 assert.equal(counts.gallery,manifest.sellerImageCount);
 assert.equal(counts.source,manifest.galleryImageCount);
 assert.equal(Object.values(counts).reduce((sum,n)=>sum+n,0),manifest.indexedImageCount);
});
test('catalogue sitemap splits all 24 locales and keeps only canonical product paths',async()=>{
 await mockFetch(async()=>new Response('<urlset><url><loc>https://cnbuycha.com/AllProducts/</loc></url><url><loc>https://cnbuycha.com/shoes/3459.html</loc></url></urlset>'),async()=>{
  const route=path=>commerceRoutes(new Request('https://joyagoochina.org'+path),{},{}).then(r=>r.text());
  const index=await route('/catalog-sitemap.xml');
  assert.equal((index.match(/<sitemap>/g)||[]).length,24);
  const xml=await route('/catalog-sitemap-ja.xml');
  assert.equal((xml.match(/<url>/g)||[]).length,2);
  assert.match(xml,/\/ja\/catalog\/shoes\/3459.html/);
  assert.doesNotMatch(xml,/AllProducts|\?q=/);
 });
});

test('default catalogue query variants redirect before upstream reads and retain attribution',async()=>{
 let calls=0;
 await mockFetch(async()=>{calls++;throw Error('unexpected upstream')},async()=>{
  for(const method of ['GET','HEAD'])for(const lang of LANGS){
   const prefix=lang==='en'?'':'/'+lang;
   const r=await catalogueRoute(new Request(`https://joyagoochina.org${prefix}/catalog/shoes/?q=&sort=new&page=1&utm_source=search`,{method}),{});
   assert.equal(r.status,308);assert.equal(r.headers.get('location'),`https://joyagoochina.org${prefix}/catalog/shoes/?utm_source=search`);
  }
  const filtered=await catalogueRoute(new Request('https://joyagoochina.org/catalog/?q=coat&sort=new&page=1'),{});
  assert.equal(filtered.headers.get('location'),'https://joyagoochina.org/catalog/?q=coat');
  assert.equal(calls,0);
 });
});
test('default listing navigation emits clean links while pagination remains usable',async()=>{
 await mockFetch(async()=>new Response(listing),async()=>{
  const r=await catalogueRoute(new Request('https://joyagoochina.org/catalog/shoes/'),{}),html=await r.text();
  assert.doesNotMatch(html,/href="[^\"]*\?q=&/);assert.doesNotMatch(html,/href="[^\"]*[?&]page=1[&\"]/);
  assert.match(html,/href="\/catalog\/shoes\/\?page=2"/);assert.match(html,/href="\/catalog\/shoes\/" aria-current="page"/);
 });
});


test('commerce response decoration preserves immutable redirects for GET and HEAD',async()=>{
 for(const method of ['GET','HEAD'])for(const path of ['/catalog/shoes/?q=&sort=new&page=1','/pl/catalog/shoes/?page=1','/catalog/AllProducts/','/catalog/shoes']){
  const r=await commerceRoutes(new Request('https://joyagoochina.org'+path,{method}),{},{});
  assert.ok([301,308].includes(r.status),path);assert.ok(r.headers.get('location'),path);assert.equal(r.headers.get('x-joyagoo-release'),RELEASE,path);
 }
});
