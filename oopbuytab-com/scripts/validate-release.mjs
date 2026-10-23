import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {parseHTML,DOMParser} from 'linkedom';
import worker from '../dist/cloudflare/worker.js';
const directory='src/content/editorial';
const langs=(await fs.readdir(directory)).filter(n=>n.endsWith('.json')).map(n=>n.slice(0,-5));
const reference=JSON.parse(await fs.readFile(`${directory}/en.json`));
const manifest=JSON.parse(await fs.readFile('src/content/seo/product-paths.json'));
const coreCount=langs.length*(19+reference.articles.length);
const origin='https://oopbuytab.com';
const local=(lang,path)=>(lang==='en'?'':'/'+lang)+path;
async function get(path){const r=await worker.fetch(new Request(origin+path),{},{});return {r,text:await r.text()};}
let articleCount=0;
for(const lang of langs){
 const content=JSON.parse(await fs.readFile(`${directory}/${lang}.json`));
 for(const article of content.articles){
  const path=local(lang,`/articles/${article.slug}/`),{r,text}=await get(path),doc=parseHTML(text).document;
  assert.equal(r.status,200,path);assert(r.headers.get('x-robots-tag').startsWith('index,follow'),path);
  assert.equal(doc.documentElement.lang,lang,path+' lang');
  assert.equal(doc.querySelector('h1').textContent,article.title,path+' title');
  assert.equal(doc.querySelector('meta[name="description"]').content,article.description,path+' description');
  assert.equal(doc.querySelector('link[rel="canonical"]').href,origin+path,path+' canonical');
  assert.equal(doc.querySelectorAll('link[rel="alternate"]').length,25,path+' alternatives');
  for(const target of langs)assert.equal(doc.querySelector(`link[hreflang="${target}"]`).href,origin+local(target,`/articles/${article.slug}/`));
  assert.equal(doc.querySelectorAll('.reading-section').length,article.sections.length,path+' sections');
  assert.equal(doc.querySelectorAll('.section-prose p').length,article.sections.length*3,path+' paragraphs');
  for(const [i,s] of article.sections.entries())assert.equal([...doc.querySelectorAll(`#section-${i} .section-prose p`)].map(p=>p.textContent).join(''),s.text.split(/\n\s*\n/).join(''),path+' text');
  const schemas=[...doc.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent));
  const schema=schemas.find(x=>x['@type']==='Article');assert.equal(schema.datePublished,article.published);assert.equal(schema.dateModified,article.modified);assert(schemas.some(x=>x['@type']==='BreadcrumbList'));
  assert.equal(doc.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length,1);
  assert.equal(doc.querySelectorAll('script[src="/analytics-events.js"]').length,1);
  assert.equal(doc.querySelector('.article-actions a').href,local(lang,'/spreadsheet/'));
  articleCount++;
 }
 const {r,text}=await get(local(lang,'/articles/'));assert.equal(r.status,200);assert.equal(parseHTML(text).document.querySelectorAll('.journal .article-card').length,reference.articles.length);
}
const parser=new DOMParser();
const root=await get('/sitemap.xml');assert.equal(root.r.status,200);
const maps=[...parser.parseFromString(root.text,'text/xml').querySelectorAll('sitemap loc')].map(x=>x.textContent);
assert.equal(maps.length,langs.length+1);
let productCount=0;
for(const url of maps){
 const {r,text}=await get(new URL(url).pathname);assert.equal(r.status,200,url);
 const doc=parser.parseFromString(text,'text/xml'),urls=[...doc.querySelectorAll('url')];assert(urls.length<50000);
 if(url.includes('sitemap-products/')){
  const lang=url.split('/').at(-1).replace('.xml','');assert.equal(urls.length,manifest.paths.length);
  for(const el of urls)assert(el.querySelector('loc').textContent.startsWith(origin+local(lang,'/products/')));
  productCount+=urls.length;
 }else{assert.equal(urls.length,coreCount);for(const a of reference.articles){assert(urls.some(el=>el.querySelector('loc').textContent===origin+`/articles/${a.slug}/`&&el.querySelector('lastmod').textContent===a.modified));}}
}
const missing=await get('/sitemap-products/zz.xml');assert.equal(missing.r.status,404);
const unknown=await get('/articles/does-not-exist/');assert.equal(unknown.r.status,404);assert(unknown.r.headers.get('x-robots-tag').includes('noindex'));
const analytics=await get('/analytics-events.js');assert.equal(analytics.r.status,200);assert(analytics.text.includes('article_catalog_click'));
const redirect=await worker.fetch(new Request('https://www.oopbuytab.com/de/articles/oopbuy-payment-methods/'),{},{});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),origin+'/de/articles/oopbuy-payment-methods/');
console.log(JSON.stringify({articles:articleCount,articleIndexes:langs.length,coreSitemapURLs:coreCount,productSitemapURLs:productCount,sitemaps:maps.length,status:'passed'}));
