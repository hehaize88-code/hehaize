import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import worker from '../dist/server/index.js';
import {installAnalytics} from '../src/lib/analytics.ts';
const locales=['en','de','es','fr','it','pl','pt','ro','sv','nl','da','fi','el','cs','hu','bg','sk','hr','sl','lt','lv','et','ga','mt'];
const origin='https://superbuytab.com';
const render=async path=>{const response=await worker.fetch(new Request(origin+path),{},{});return {response,doc:parseHTML(await response.text()).document};};
const english=JSON.parse(await readFile('src/lib/seo-copy/en.json','utf8'));
for(const lang of locales){
 const prefix=lang==='en'?'':'/'+lang;
 const copy=JSON.parse(await readFile(`src/lib/seo-copy/${lang}.json`,'utf8'));
 assert.deepEqual(Object.keys(copy).sort(),Object.keys(english).sort());
 for(const key of Object.keys(english)){assert(copy[key]?.trim(),lang+' '+key);if(lang!=='en')assert.notEqual(copy[key],english[key],lang+' English SEO fallback: '+key);}
 for(const category of ['shoes','hoodies-sweaters']){
  const path=prefix+`/categories/${category}/`,{response,doc}=await render(path);
  assert.equal(response.status,200,path);
  assert.equal(doc.documentElement.lang,lang);
  assert.equal(doc.querySelector('link[rel=canonical]').href,origin+path);
  assert.equal(response.headers.get('X-Robots-Tag'),'index, follow');
  assert.equal(doc.querySelectorAll('link[hreflang]').length,25);
  assert.equal(doc.querySelectorAll('h1').length,1);
  assert.equal(doc.querySelectorAll('.product-card').length,8);
  assert(doc.querySelector(`a[href="${prefix}/spreadsheet/?category=${category}"]`));
  assert(doc.querySelector(`.category-actions a[href^="${prefix}/articles/"]`));
  assert(!doc.body.textContent.includes('undefined'));
 }
}
const home=await render('/'),catalog=await render('/spreadsheet/');
assert.notEqual(home.doc.title,catalog.doc.title);
assert.notEqual(home.doc.querySelector('meta[name=description]').content,catalog.doc.querySelector('meta[name=description]').content);
assert.equal(home.doc.querySelectorAll('.home-articles .article-card').length,4);
assert(home.doc.querySelector('.home-articles a[href="/articles/superbuy-shipping-to-uk/"]'));
for(const path of ['/articles/superbuy-shipping-to-uk/','/articles/superbuy-shipping-to-usa/']){
 const {doc}=await render(path),schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
 assert.equal(schema.datePublished,'2026-10-21');assert.equal(schema.dateModified,path.includes('to-uk')?'2026-10-28':'2026-10-21');
}
const old=await render('/articles/superbuy-fees/');
assert.equal(JSON.parse(old.doc.querySelector('script[type="application/ld+json"]').textContent).datePublished,'2026-10-19');
// Verify discoverability of every newly published language, including sitemap dates.
const sitemap=await worker.fetch(new Request(origin+'/sitemap.xml'),{},{});
const xml=await sitemap.text();
for(const lang of locales){
 const prefix=lang==='en'?'':'/'+lang;
 for(const slug of ['superbuy-links-not-working','why-superbuy-shipping-expensive','superbuy-1688-guide']){
  assert(xml.includes(`<loc>${origin}${prefix}/articles/${slug}/</loc><lastmod>2026-10-28</lastmod>`));
 }
 const {doc}=await render(prefix+'/');
 assert.equal(doc.querySelectorAll('.task-links a').length,4);
 for(const link of doc.querySelectorAll('.task-links a'))assert(link.getAttribute('href').startsWith(prefix+'/'));
}

// Verify event behavior without sending any test traffic to GA4.
const {document,Event}=parseHTML('<html lang="de"><body><a id="catalog" href="/de/spreadsheet/?category=shoes"><span>Browse</span></a><a id="category" href="/de/categories/shoes/">Shoes</a><a id="product" href="/de/products/shoes/3470/">Product</a><a id="language" href="/fr/articles/superbuy-fees/">French</a><a id="buy" class="buy-button" rel="sponsored noopener noreferrer" href="https://www.superbuy.com/en/page/buy/?partnercode=ES7pVI">Buy</a><a id="official" href="https://www.superbuy.com/en/page/guide/feecomposition/">Source</a><form class="search-form"><input name="q" value="private search terms" /></form></body></html>');
document.location=new URL(origin+'/de/articles/superbuy-fees/');
const events=[];installAnalytics(document,(name,params)=>events.push({name,params}));
for(const selector of ['#catalog span','#category','#product','#language','#buy','#official'])document.querySelector(selector).dispatchEvent(new Event('click',{bubbles:true}));
assert.deepEqual(events.map(e=>e.name),['article_to_catalog','article_to_catalog','product_click','outbound_superbuy']);
assert.equal(events[0].params.destination_category,'shoes');
assert.equal(events[2].params.product_id,'3470');assert.equal(events[3].params.link_type,'product');
const native=globalThis.FormData;
try{
 globalThis.FormData=class{constructor(form){this.form=form;}get(name){return this.form.querySelector(`[name="${name}"]`).value;}};
 document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true}));
}finally{globalThis.FormData=native;}
assert.equal(events.at(-1).name,'catalogue_search');assert.equal(events.at(-1).params.query_length,20);
assert(!JSON.stringify(events).includes('private search terms'));
assert(events.every(e=>e.params.language==='de'));
const guide=document.createElement('a');guide.href='/de/articles/superbuy-links-not-working/';document.body.appendChild(guide);
guide.dispatchEvent(new Event('click',{bubbles:true}));
assert.equal(events.at(-1).name,'guide_click');assert.equal(events.at(-1).params.article_slug,'superbuy-links-not-working');
assert.equal(events.at(-1).params.source_type,'article');
console.log(JSON.stringify({passed:true,categoryPages:48,localizedSEOCopy:24,clickEvents:4,privateSearchTextExcluded:true,publishedDates:'preserved'}));
