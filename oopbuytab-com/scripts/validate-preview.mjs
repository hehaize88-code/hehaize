import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom/worker';

const out=path.resolve('../docs/oopbuytab-com'),base='/hehaize/oopbuytab-com';
const locales=(await fs.readdir('src/content/editorial')).filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5));
const reference=JSON.parse(await fs.readFile('src/content/editorial/en.json','utf8'));
const categories=Object.keys(reference.categoryIntros);
const routes=['/','/spreadsheet/','/finds/','/guide/','/faq/','/articles/','/qc/','/shipping/','/image-search/',...reference.articles.map(a=>'/articles/'+a.slug+'/'),...categories.map(c=>'/category/'+c+'/'),'/products/shoes/3470.html'];
let pages=0,references=0,fragments=0;const allSets=[];
const exists=new Map();
async function checkFile(file){if(!exists.has(file))exists.set(file,fs.access(file).then(()=>true,()=>false));return exists.get(file);}
for(const lang of locales)for(const route of routes){
 const current=(lang==='en'?'':'/'+lang)+route;
 const {document}=parseHTML(await fs.readFile(path.join(out,current.endsWith('/')?current+'index.html':current),'utf8'));
 assert.equal(document.documentElement.lang,lang,current+' language');
 assert(document.querySelector('title')?.textContent.trim(),current+' title');
 assert(document.querySelector('meta[name="description"]')?.getAttribute('content').trim(),current+' description');
 assert(document.querySelector('meta[name="robots"]')?.getAttribute('content').includes('noindex'),current+' noindex');
 assert.equal(document.querySelectorAll('link[rel="alternate"][hreflang]').length,25,current+' alternates');
 assert.equal(document.querySelectorAll('h1').length,1,current+' heading');
 assert(!document.body.textContent.includes('Continue on CNBuyCha'),current+' removed CTA');
 if(route==='/faq/')assert.equal(document.querySelectorAll('.faq-answer').length,28,current+' FAQs');
 if(route==='/articles/')assert.equal(document.querySelectorAll('.article-card').length,10,current+' articles');
 if(reference.articles.some(a=>route==='/articles/'+a.slug+'/')){
  assert.equal(document.querySelectorAll('.reading-section').length,9,current+' article sections');
  assert.equal(document.querySelectorAll('.section-prose>p').length,27,current+' full paragraphs');
 }
 const catalog=document.querySelector('.catalog-results');
 if(catalog){assert.equal(catalog.querySelectorAll('.product-card').length,20,current+' first page');assert(catalog.querySelector('.pagination-jump'),current+' jump');}
 for(const el of document.querySelectorAll('[href],[src]'))for(const attr of ['href','src']){
  const raw=el.getAttribute(attr);if(!raw||!raw.startsWith(base+'/'))continue;
  const url=new URL(raw,'https://preview.example');let file=decodeURIComponent(url.pathname.slice(base.length));
  if(file.endsWith('/'))file+='index.html';
  assert(await checkFile(path.join(out,file)),current+' missing '+raw);references++;
 }
 for(const source of document.querySelectorAll('.source-notes a'))assert.equal(new URL(source.href).hostname,'oopbuy.com',current+' official source');
 pages++;
}
for(const category of ['all',...categories])for(const sort of ['new','click','price']){
 const folder=path.join(out,'catalog',category,sort);
 const files=(await fs.readdir(folder)).filter(f=>f.endsWith('.html')).sort((a,b)=>parseInt(a)-parseInt(b));
 const products=[];let total;let lastPrice=-Infinity;
 for(let i=0;i<files.length;i++){
  const {document}=parseHTML(await fs.readFile(path.join(folder,files[i]),'utf8'));const fragment=document.querySelector('.catalog-fragment');
  assert(fragment,'catalog body');total=Number(fragment.dataset.total);
  assert.equal(Number(fragment.dataset.page),i+1,'sequential page');assert.equal(Number(fragment.dataset.pages),files.length,'page count');
  assert.equal(fragment.dataset.sort,sort,'sort');
  const cards=[...fragment.querySelectorAll('.product-card')];assert.equal(cards.length,Math.min(20,total-i*20),'page size');
  for(const card of cards){
   products.push(card.dataset.productPath);
   if(category!=='all')assert.equal(card.dataset.category,category,'category');
   const price=Number(card.querySelector('.card-price').textContent.replace(/[^\d.]/g,''));
   if(sort==='price'){assert(price>=lastPrice,'ascending price');lastPrice=price;}
  }
  fragments++;
 }
 assert.equal(products.length,total,'catalog total');assert.equal(new Set(products).size,total,'unique products');
 if(category==='all')allSets.push(products.sort());
}
assert.deepEqual(allSets[0],allSets[1],'popular has same catalog');assert.deepEqual(allSets[0],allSets[2],'price has same catalog');
assert.equal(pages,744,'all language routes');assert.equal(locales.length,24,'languages');
console.log(JSON.stringify({pages,locales:locales.length,internalReferences:references,catalogFragments:fragments,uniqueProducts:allSets[0].length,checks:'links, metadata, full text, FAQ, pagination, category membership, unique items, price order'}));
