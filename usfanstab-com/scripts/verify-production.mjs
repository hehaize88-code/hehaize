import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';
const call=p=>worker.fetch(new Request('https://usfanstab.com'+p),{}, {waitUntil(){}});
let count=0;
for(const l of ['en','de','fr','es','it','pt','pl','zh']){
 const r=await call('/sitemap-'+l+'.xml');const s=await r.text();assert.equal(r.status,200);assert(r.headers.get('content-type').includes('xml'));assert.equal((s.match(/<url>/g)||[]).length,3497);assert(s.includes('usfanstab.com'+(l==='en'?'':'/'+l)+'/product/shoes/3470.html'));count++;
 const f=await call((l==='en'?'':'/'+l)+'/faq/');const h=await f.text();assert.equal(f.status,200);assert(!f.headers.has('x-robots-tag'));assert(h.includes('index,follow,max-image-preview:large'));assert.equal((h.match(/hreflang=/g)||[]).length,9);count++;
}
const robots=await call('/robots.txt');assert((await robots.text()).includes('Allow: /'));
const red=await worker.fetch(new Request('https://www.usfanstab.com/de/faq/?x=1'),{},{});assert.equal(red.status,308);assert.equal(red.headers.get('location'),'https://usfanstab.com/de/faq/?x=1');
const prev=await worker.fetch(new Request('https://usfanstab-com.example.workers.dev/faq/'),{},{});assert.equal(prev.headers.get('x-robots-tag'),'noindex, nofollow');
const bad=await call('/sitemap-xx.xml');assert.equal(bad.status,404);
console.log('PASS',count,'locale sitemap and SEO checks, robots, www redirect, preview noindex, invalid sitemap');
