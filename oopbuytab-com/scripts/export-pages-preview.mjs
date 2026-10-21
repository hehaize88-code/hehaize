/** Static review export with source-backed shared HTML pagination. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parseHTML } from 'linkedom/worker';
import { categoryNames, translate } from '../src/lib/i18n.ts';
const root = process.cwd();
const out = path.resolve(root, '../docs/oopbuytab-com');
const base = '/hehaize/oopbuytab-com';
const origin = 'https://cnbuycha.com';
const availableLocales = (await fs.readdir('src/content/editorial')).filter(x => x.endsWith('.json')).map(x => x.slice(0,-5)).sort();
const locales = process.env.PREVIEW_LOCALES ? process.env.PREVIEW_LOCALES.split(',').filter(x=>availableLocales.includes(x)) : availableLocales;
if(!locales.length)throw new Error('No valid preview locales');
const categories = ['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const articles = JSON.parse(await fs.readFile('src/content/editorial/en.json', 'utf8')).articles.map(x => '/articles/'+x.slug+'/');
const routes = ['/', '/spreadsheet/', '/finds/', '/guide/', '/faq/', '/articles/', '/qc/', '/shipping/', '/image-search/', ...articles, ...categories.map(x=>'/category/'+x+'/'), '/products/shoes/3470.html'];
const localized=(lang,route)=> (lang==='en'?'':'/'+lang)+route;
const routeSet=new Set(locales.flatMap(lang=>routes.map(route=>localized(lang,route))));
async function catalogFragment(lang,category,sort){
 const {document}=parseHTML(await fs.readFile(path.join(out,'catalog',category,sort,'1.html'),'utf8'));
 const fragment=document.querySelector('.catalog-fragment');
 const names=Object.fromEntries(categories.map((slug,i)=>[slug,categoryNames(lang)[i]])),labels=translate(lang);
 for(const card of fragment.querySelectorAll('.product-card')){
  card.querySelector('.card-category').textContent=names[card.dataset.category];
  card.querySelector('[data-photo-missing]').textContent=labels.photoMissing;
  for(const a of card.querySelectorAll('[aria-label]'))a.setAttribute('aria-label',labels.view+': '+card.querySelector('h3').textContent);
  if(card.dataset.productPath==='/shoes/3470.html')for(const a of card.querySelectorAll('a'))a.setAttribute('href',localized(lang,'/products/shoes/3470.html'));
 }
 return fragment;
}
// Deduplicate source requests in memory for this build only; no catalogue data files.
const liveFetch=globalThis.fetch;
const requests=new Map();
globalThis.fetch=async(input,init)=>{
 const key=String(input instanceof Request?input.url:input);
 if(new URL(key).origin!==origin)return liveFetch(input,init);
 if(!requests.has(key))requests.set(key,(async()=>{const r=await liveFetch(input,{...init,signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error('CNBuyCha HTTP '+r.status);return {body:await r.text(),status:r.status,headers:[...r.headers]};})());
 const r=await requests.get(key);return new Response(r.body,{status:r.status,headers:r.headers});
};
const app=(await import(pathToFileURL(path.resolve(process.env.PREVIEW_SERVER_ENTRY||'dist/server/index.js')))).default;
await fs.mkdir(out,{recursive:true});
// Catalogue fragments are generated first. Keep them while refreshing page shells.
for(const entry of await fs.readdir(out))if(entry!=='catalog')await fs.rm(path.join(out,entry),{recursive:true,force:true});
for(const file of ['favicon.png','oopbuy-logo.svg','oopbuy-logo.png','oopbuy-logo-pc.png','catalog-pagination.js'])await fs.copyFile('public/'+file,path.join(out,file));
const stamp=(await fs.readFile(path.join(out,'catalog/generated.txt'),'utf8')).trim();let count=0;
for(const lang of locales){
 const content=JSON.parse(await fs.readFile('src/content/editorial/'+lang+'.json','utf8'));
 for(const route of routes){
  const current=localized(lang,route);
  const response=await app.fetch(new Request('https://oopbuytab.com'+current),{}, {waitUntil(){}});
  if(response.status!==200)throw new Error(current+' returned '+response.status);
  const {document:doc}=parseHTML(await response.text());
  if(doc.querySelector('.hero-unavailable')||doc.querySelector('.catalog-results .empty-state'))throw new Error('Missing live catalogue '+current);
  for(const el of doc.querySelectorAll('style')){
   const css=el.textContent;const name='preview-'+createHash('sha256').update(css).digest('hex').slice(0,12)+'.css';
   await fs.writeFile(path.join(out,name),css);const link=doc.createElement('link');link.setAttribute('rel','stylesheet');link.setAttribute('href',base+'/'+name);el.replaceWith(link);
  }
  const sourcePath=route.startsWith('/category/')?'/'+route.split('/')[2]+'/':'/AllProducts/';
  for(const form of doc.querySelectorAll('form')){
   if(form.classList.contains('faq-search'))continue;
   if(form.classList.contains('catalog-sort')||form.classList.contains('pagination-jump')){form.setAttribute('action',base+current);continue;}
   form.setAttribute('action',origin+(form.classList.contains('header-search')?'/AllProducts/':sourcePath));
   form.setAttribute('method','get');
  }
  const catalog=doc.querySelector('.catalog-results');
  if(catalog){
   catalog.setAttribute('data-catalog-base',base);
   const fragment=await catalogFragment(lang,catalog.dataset.category,catalog.dataset.sort);
   for(const key of ['total','pages','page'])catalog.dataset[key]=fragment.dataset[key];
   catalog.querySelector('.catalog-toolbar b').textContent=Number(fragment.dataset.total).toLocaleString(lang);
   catalog.querySelector('.pagination-jump input[name="page"]').max=fragment.dataset.pages;
   catalog.querySelector('.pagination .page-total').textContent='/ '+fragment.dataset.pages;
   catalog.querySelector('.product-grid').replaceChildren(...fragment.children);
   const script=doc.createElement('script');script.setAttribute('src',base+'/catalog-pagination.js');script.setAttribute('defer','');doc.body.append(script);
  }
  if(route==='/'){
   const fragment=await catalogFragment(lang,'all','new');
   const cards=[...fragment.children];
   [...doc.querySelectorAll('.hero-product')].forEach((hero,i)=>{
    const card=cards[i],image=card.querySelector('img'),title=card.querySelector('h3').textContent;
    hero.setAttribute('href',card.querySelector('a').getAttribute('href'));
    hero.querySelector('.hero-product-caption>span').textContent=title;
    hero.querySelector('.hero-product-caption>b').textContent=card.querySelector('.card-price').firstChild.textContent.trim();
    const heroImage=hero.querySelector('img');
    if(image&&heroImage){heroImage.setAttribute('src',image.getAttribute('src'));heroImage.setAttribute('alt',title);}
    else if(heroImage)heroImage.remove();
   });
   doc.querySelector('.section .product-grid').replaceChildren(...cards.slice(0,8));
   for(const link of doc.querySelectorAll('.category-grid>a')){
    const category=link.getAttribute('href').split('/category/')[1]?.split('/')[0];
    if(category){const categoryPage=await catalogFragment(lang,category,'new');link.querySelector('small').textContent=categoryPage.dataset.total;}
   }
  }
  for(const el of doc.querySelectorAll('[href],[src]'))for(const attr of ['href','src']){
   const raw=el.getAttribute(attr);if(!raw||!raw.startsWith('/')||raw.startsWith('//')||raw.startsWith(base+'/'))continue;
   const url=new URL(raw,'https://oopbuytab.com');
   if(attr==='href'&&el.tagName==='A'){
    const p=url.pathname.replace(/^\/(?:de|es|fr|it|pl|pt|ro|sv|nl|da|fi|el|cs|hu|bg|sk|hr|sl|lt|lv|et|ga|mt)(?=\/)/,'');
    if(p.startsWith('/products/')&&!routeSet.has(url.pathname)){el.setAttribute(attr,origin+p.slice('/products'.length));continue;}
    el.setAttribute(attr,base+url.pathname+url.search+url.hash);
   }else el.setAttribute(attr,base+raw);
  }
  const notice=doc.createElement('div');notice.setAttribute('class','preview-notice');
  notice.textContent=content.ui.previewNotice.replace('{date}',stamp.slice(0,10));
  doc.querySelector('header').after(notice);
  const file=path.join(out,current.endsWith('/')?current+'index.html':current);await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,doc.toString());count++;
 }
 console.log(lang+': '+routes.length+' pages');
}
await fs.writeFile(path.resolve(out,'../.nojekyll'),'');
await fs.writeFile(path.resolve(out,'../robots.txt'),'User-agent: *\nDisallow: /\n');
await fs.writeFile(path.resolve(out,'../index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url='+base+'/"><title>OOPBuy Tab Preview</title></head><body><a href="'+base+'/">Open OOPBuy Tab preview</a></body></html>');
console.log(JSON.stringify({pages:count,sourceRequests:requests.size,output:out,fetchedAt:stamp}));
