import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const mod=await import('data:text/javascript;base64,'+fs.readFileSync(path.join(dist,'_worker.js')).toString('base64'));
const worker=mod.default;
const langs=['en','de','es','fr','it'];
const editorial=JSON.parse(fs.readFileSync(path.join(root,'content/editorial.json')));
assert.equal(editorial.length,28);
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
const index=JSON.parse(fs.readFileSync(path.join(dist,'assets/catalog-image-index.json')));
assert.equal(index.source,'https://cnbuycha.com');assert.equal(index.products.length,index.indexedCount);assert(index.indexedCount>=index.catalogCount*.95);
assert(index.products.every(p=>p.hash.length===64&&p.cells.length===48&&/^\/[a-z0-9-]+\/\d+\.html$/.test(p.path)));
// Captured live responses verify source-to-storefront mapping and upstream query forwarding.
if(process.env.SOURCE_FIXTURES){
 const dir=process.env.SOURCE_FIXTURES;let requested;
 globalThis.fetch=async url=>{requested=new URL(url);const file=requested.pathname.endsWith('3458.html')?'example-detail.html':requested.pathname.endsWith('3459.html')?'detail.html':requested.pathname==='/sitemap.xml'?'source-sitemap.xml':requested.searchParams.get('q')==='7867456361'?'exact-source.html':requested.pathname==='/shoes/'?'sorted-source.html':'live-catalog.html';return new Response(fs.readFileSync(path.join(dir,file),'utf8'))};
 let r=await worker.fetch(new Request('https://hipobuyy-sheet.com/de/catalog/shoes/?q=Nike&sort=price&page=1'),{});
 assert.equal(r.status,200);let html=await r.text();assert.equal(requested.href,'https://cnbuycha.com/shoes/?q=Nike&sort=price&page=1');assert.match(html,/name="robots" content="noindex,follow"/);assert(html.includes('q=Nike&amp;sort=price')||html.includes('q=Nike&sort=price'));
 const source=mod.parseDetail(fs.readFileSync(path.join(dir,'detail.html'),'utf8'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/fr/catalog/other-stuff/3459.html'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('href="https://hipobuy.com/product/weidian/'+source.sourceId+'"'));assert(html.includes('id="gallery-main" src="'+source.images[0]+'"'));assert.equal((html.match(/data-gallery-index=/g)||[]).length,source.images.length);assert(!html.includes('superbuy.com'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/accessories/3458.html'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('href="https://hipobuy.com/product/weidian/7867456361"'));assert(!html.includes('product/weidian/3458'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/?q=7867456361'),{});html=await r.text();assert.equal(r.status,200);assert(html.includes('/en/catalog/accessories/3458.html'));
 r=await worker.fetch(new Request('https://hipobuyy-sheet.com/catalog-sitemap.xml'),{});assert.equal(r.status,200);html=await r.text();assert(html.includes('/en/catalog/accessories/3458.html'));assert(html.includes('/it/catalog/accessories/3458.html'));
 globalThis.fetch=async()=>new Response('',{status:503});r=await worker.fetch(new Request('https://hipobuyy-sheet.com/en/catalog/'),{});assert.equal(r.status,503);assert.match(await r.text(),/noindex,follow/);
 assertions+=23;
}
console.log('PASS:',assertions,'release checks;',editorial.length*langs.length,'translated articles; 5 locales; image coverage',index.indexedCount+'/'+index.catalogCount);
