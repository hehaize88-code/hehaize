import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const mod=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(path.join(dist,'_worker.js'),'utf8')+'\nexport {coreHandler, buyUrl, parseDetail};').toString('base64'));
// Exercise the underlying catalogue independently of the Worker HTMLRewriter.
const worker=mod.coreHandler;
const langs=['en','de','es','fr','it'];
const editorial=JSON.parse(fs.readFileSync(path.join(root,'content/editorial.json')));
assert.equal(editorial.length,31);
assert.equal(mod.buyUrl('7867456361'),'https://hipobuy.com/product/weidian/7867456361');
assert.equal(mod.buyUrl('javascript:alert(1)'),null);
assert.equal(mod.buyUrl('3458'),null);
let assertions=0;
for(const lang of langs){
 const home=fs.readFileSync(path.join(dist,lang,'index.html'),'utf8');
 assert.match(home,/<a class="register-left" href="https:\/\/hipobuy.com\/register"/);
 assert.match(home,new RegExp('<a class="logo" href="/'+lang+'/"'));
 assert.match(home,/<link rel="icon" type="image\/png" href="\/assets\/hipobuy-favicon.png">/);
 assert.equal((home.match(/class="article-card"/g)||[]).length,4);
 assert.equal((home.match(/<details class="faq-item"/g)||[]).length,4);
 assert.match(home,new RegExp('action="/'+lang+'/catalog/"'));
 assert.equal((home.match(/class="catalog-card"/g)||[]).length,4);
 for(const record of editorial){
  const html=fs.readFileSync(path.join(dist,lang,'articles',record.slug,'index.html'),'utf8');
  assert.match(html,new RegExp('<html lang="'+lang+'"'));
  assert.equal((html.match(/hreflang=/g)||[]).length,6);
  assert.match(html,new RegExp('href="https://hipobuyy-sheet.com/'+lang+'/articles/'+record.slug+'/"'));
  assert(!html.includes('href="https://cnbuycha.com'));
  assertions+=4;
 }
 const r=await worker.fetch(new Request('https://hipobuyy-sheet.com/'+lang+'/catalog/image-search/'),{});
 assert.equal(r.status,200);const html=await r.text();
 assert.match(html,/<input id="image-file" type="file"/);
 assert.match(html,new RegExp('<html lang="'+lang+'"'));
 for(const l of langs)assert(html.includes('value="/'+l+'/catalog/image-search/"'));
 assert.match(html,/name="robots" content="noindex,follow"/);
 for(const route of ['spreadsheet','finds']){
  const redirect=await worker.fetch(new Request('https://hipobuyy-sheet.com/'+lang+'/'+route+'/'),{});
  assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'https://hipobuyy-sheet.com/'+lang+'/catalog/');
 }
 assertions+=20;
}
const {imageMeta, imageShards}=await import('../dist/assets/image-search-data.mjs');
const {supplement}=await import('../dist/assets/image-search-supplement.mjs');
const {gunzipSync}=await import('node:zlib');
const extra=supplement.base===imageMeta.revision;
const shards=extra?[...imageShards,supplement.shard]:imageShards;
const productPaths=new Set();
let images=0;
for (const shard of shards){
 const rows=JSON.parse(gunzipSync(Buffer.from(shard,'base64')));
 for(const [path,entries] of rows){
  assert.match(path,/^\/[a-z0-9-]+\/\d+\.html$/);
  assert(!productPaths.has(path));
  const valid=entries.filter(e=>e[1]&&e[2]);
  if(valid.length)productPaths.add(path);
  for(const [,hash,cells] of valid){
   assert.match(hash,/^[a-f0-9]{16,17}$/i);
   assert.equal(Buffer.from(cells,'base64').length,48);
   images++;
  }
 }
}
assert.equal(images,imageMeta.images+(extra?supplement.images:0));
// Captured live responses verify source-to-storefront mapping and upstream query forwarding.
if(process.env.SOURCE_FIXTURES){
 const dir=process.env.SOURCE_FIXTURES;let requested;
 globalThis.fetch=async url=>{requested=new URL(url);const file=requested.pathname.endsWith('3458.html')?'example-detail.html':requested.pathname.endsWith('3459.html')?'detail.html':requested.pathname==='/sitemap.xml'?'source-sitemap.xml':requested.searchParams.get('q')==='7867456361'?'exact-source.html':requested.pathname==='/shoes/'?'sorted-source.html':'live-catalog.html';return new Response(fs.readFileSync(path.join(dir,file),'utf8'))};
 let r=await worker.fetch(new Request('https://hipobuyy-sheet.com/de/catalog/shoes/?q=Nike&sort=price&page=1'),{});
 assert.equal(r.status,200);let html=await r.text();assert.equal(requested.href,'https://cnbuycha.com/shoes/?q=Nike&sort=price&page=1');assert.match(html,/name="robots" content="noindex,follow"/);assert(html.includes('q=Nike&amp;sort=price')||html.includes('q=Nike&sort=price'));
 const source=mod.parseDetail(fs.readFileSync(path.join(dir,'detail.html'),'utf8'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/fr/catalog/other-stuff/3459.html'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('href="https://hipobuy.com/product/weidian/'+source.sourceId+'"'));assert(html.includes('id="purchase-photo" src="'+source.images[0]+'"'));assert.equal((html.match(/class="purchase-gallery"/g)||[]).length,source.images.length>1?1:0);assert(html.includes('data-copy-source="https://weidian.com/item.html?itemID='+source.sourceId+'"'));assert(html.includes('Other buying agents') || html.includes('purchase-actions'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/accessories/3458.html'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('href="https://hipobuy.com/product/weidian/7867456361"'));assert(!html.includes('product/weidian/3458'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/?q=7867456361'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('/en/catalog/accessories/3458.html'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/catalog-sitemap.xml'),{});assert.equal(r.status,200);html=await r.text();assert(html.includes('/en/catalog/accessories/3458.html'));assert(html.includes('/it/catalog/accessories/3458.html'));
 globalThis.fetch=async()=>new Response('',{status:503});r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/'),{});assert.equal(r.status,503);assert.match(await r.text(),/noindex,follow/);
 assertions+=23;
}
console.log('PASS:',assertions,'core checks;',images,'indexed images across',productPaths.size,'products.');
