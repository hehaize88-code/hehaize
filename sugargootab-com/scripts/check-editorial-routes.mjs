import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import worker from '../dist/server/index.js';
import {targets} from '../site-targets.mjs';
const dir=new URL('../src/content/editorial/',import.meta.url);
const locales=['en','de','es','fr','it','pl','pt','ro','sv','nl','da','fi','el','cs','hu','bg','sk','hr','sl','lt','lv','et','ga','mt'];
let checked=0;
for(const lang of locales){
 const data=JSON.parse(fs.readFileSync(new URL(lang+'.json',dir),'utf8'));
 const prefix=lang==='en'?'':'/'+lang;
 const paths=['/faq/','/articles/',...data.articles.map(a=>'/articles/'+a.slug+'/')];
 for(const path of paths){
  const url=targets.production+prefix+path;
  const response=await worker.fetch(new Request(url),{}, {waitUntil(){}});
  assert.equal(response.status,200,url);
  const {document:d}=parseHTML(await response.text());
  const analytics=d.querySelectorAll('script[src^="https://www.googletagmanager.com/gtag/js"]');
  assert.equal(analytics.length,1,url+' one Analytics loader');
  assert.equal(analytics[0].getAttribute('src'),'https://www.googletagmanager.com/gtag/js?id=G-SDSLG4QJR3',url+' dedicated Analytics stream');
  assert(analytics[0].hasAttribute('async'),url+' nonblocking Analytics');
  assert.equal([...d.querySelectorAll('script:not([src])')].filter(s=>s.textContent.includes("gtag('config', 'G-SDSLG4QJR3'")).length,1,url+' one page-view configuration');
  assert.equal(d.documentElement.lang,lang,url+' language');
  assert.equal(d.querySelector('link[rel=canonical]')?.getAttribute('href'),url,url+' canonical');
  assert.equal(d.querySelectorAll('link[rel=alternate][hreflang]').length,25,url+' alternates');
  assert.equal(d.querySelector('meta[name=robots]')?.getAttribute('content'),'index,follow,max-image-preview:large',url+' production indexing');
  const nav=[...d.querySelectorAll('.site-header nav a')].map(a=>a.getAttribute('href'));
  assert(nav.includes(prefix+'/faq/')&&nav.includes(prefix+'/articles/'),url+' navigation');
  const schemas=[...d.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent));
  assert.equal(schemas[0]['@type'],'WebSite');
  if(path==='/faq/'){
   assert.equal(d.querySelectorAll('[data-faq-item]').length,30,url+' questions');
   assert.equal(schemas.find(s=>s['@type']==='FAQPage')?.mainEntity.length,30,url+' FAQ schema');
   assert.equal(d.querySelector('h1')?.textContent,data.ui.faqTitle+'.');
  }else if(path==='/articles/'){
   assert.equal(d.querySelectorAll('.article-card').length,13,url+' article index');
  }else{
   const a=data.articles.find(a=>path==='/articles/'+a.slug+'/');
   assert.equal(d.querySelector('h1')?.textContent,a.title,url+' translated title');
   assert.equal(d.querySelectorAll('.article-section').length,a.sections.length,url+' sections');
   assert.equal(d.querySelectorAll('[data-reading-section]').length,a.sections.length+2,url+' reading disclosures');
   assert(d.querySelector('[data-expand-reading]')?.textContent.trim(),url+' localized expand control');
   assert(d.querySelector('[data-collapse-reading]')?.textContent.trim(),url+' localized collapse control');
   assert.equal(d.querySelectorAll('.article-section p').length,a.sections.reduce((n,s)=>n+s.paragraphs.length,0),url+' paragraphs');
   assert.equal(d.querySelectorAll('.article-checklist li').length,a.checklist.length,url+' checklist');
   assert.equal(d.querySelectorAll('.article-related .article-card').length,2,url+' related links');
   const schema=schemas.find(s=>s['@type']==='Article');
   assert.equal(schema?.headline,a.title,url+' article schema');
   assert.equal(schema?.inLanguage,lang,url+' schema language');
   assert.equal(schema?.datePublished,a.published,url+' original publication date');
   assert.equal(schema?.dateModified,a.updated,url+' modification date');
   assert.equal(d.querySelector('.article-catalog-cta a')?.getAttribute('href'),prefix+'/spreadsheet/',url+' localized catalogue action');
   assert.equal(d.querySelectorAll('.article-catalog-cta [data-track]').length,2,url+' tracked actions');
   assert.deepEqual(schema?.citation,a.sources.map(s=>s.url),url+' citations');
   for(const code of locales){
    const expected=(code==='en'?'':'/'+code)+path;
    assert.equal(d.querySelector('.language-menu a[lang="'+code+'"]')?.getAttribute('href'),expected,url+' language switch '+code);
   }
  }
  checked++;
 }
}
const unknown=await worker.fetch(new Request(targets.production+'/articles/missing-article/'),{}, {waitUntil(){}});
assert.equal(unknown.status,404);
console.log(JSON.stringify({locales:locales.length,editorialRoutes:checked,unknownArticleStatus:unknown.status,failures:0}));
