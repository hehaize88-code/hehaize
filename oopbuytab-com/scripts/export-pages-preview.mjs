/** Visual-review export. Live catalogue operations continue on CNBuyCha. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parseHTML } from 'linkedom/worker';
const root = process.cwd();
const out = path.resolve(root, '../docs/oopbuytab-com');
const base = '/hehaize/oopbuytab-com';
const origin = 'https://cnbuycha.com';
const locales = (await fs.readdir('src/content/editorial')).filter(x => x.endsWith('.json')).map(x => x.slice(0,-5)).sort();
const categories = ['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const articles = JSON.parse(await fs.readFile('src/content/editorial/en.json', 'utf8')).articles.map(x => '/articles/'+x.slug+'/');
const routes = ['/', '/spreadsheet/', '/finds/', '/guide/', '/faq/', '/articles/', '/qc/', '/shipping/', '/image-search/', ...articles, ...categories.map(x=>'/category/'+x+'/'), '/products/shoes/3470.html'];
const localized=(lang,route)=> (lang==='en'?'':'/'+lang)+route;
const routeSet=new Set(locales.flatMap(lang=>routes.map(route=>localized(lang,route))));
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
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
for(const file of ['favicon.png','oopbuy-logo.svg','oopbuy-logo.png','oopbuy-logo-pc.png'])await fs.copyFile('public/'+file,path.join(out,file));
const stamp=new Date().toISOString();let count=0;
for(const lang of locales){
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
   form.setAttribute('action',origin+(form.classList.contains('header-search')?'/AllProducts/':sourcePath));
   form.setAttribute('method','get');
  }
  const pagination=doc.querySelector('.pagination');
  if(pagination){const more=doc.createElement('a');more.setAttribute('class','button outline');more.setAttribute('href',origin+sourcePath);more.setAttribute('lang','en');more.textContent='Continue on CNBuyCha →';pagination.replaceWith(more);}
  for(const el of doc.querySelectorAll('[href],[src]'))for(const attr of ['href','src']){
   const raw=el.getAttribute(attr);if(!raw||!raw.startsWith('/')||raw.startsWith('//')||raw.startsWith(base+'/'))continue;
   const url=new URL(raw,'https://oopbuytab.com');
   if(attr==='href'&&el.tagName==='A'){
    const p=url.pathname.replace(/^\/(?:de|es|fr|it|pl|pt|ro|sv|nl|da|fi|el|cs|hu|bg|sk|hr|sl|lt|lv|et|ga|mt)(?=\/)/,'');
    if(p.startsWith('/products/')&&!routeSet.has(url.pathname)){el.setAttribute(attr,origin+p.slice('/products'.length));continue;}
    // Static routes intentionally carry no misleading search or pagination query.
    el.setAttribute(attr,base+url.pathname+url.hash);
   }else el.setAttribute(attr,base+raw);
  }
  const notice=doc.createElement('div');notice.setAttribute('lang','en');notice.setAttribute('style','padding:9px 20px;text-align:center;background:#fff2f7;color:#742b48;font:12px/1.5 system-ui');
  notice.textContent='Design preview · Products fetched from CNBuyCha on '+stamp.slice(0,10)+'. Search, sorting and more products open CNBuyCha.';
  doc.querySelector('header').after(notice);
  const file=path.join(out,current.endsWith('/')?current+'index.html':current);await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,doc.toString());count++;
 }
 console.log(lang+': '+routes.length+' pages');
}
await fs.writeFile(path.resolve(out,'../.nojekyll'),'');
await fs.writeFile(path.resolve(out,'../robots.txt'),'User-agent: *\nDisallow: /\n');
await fs.writeFile(path.resolve(out,'../index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url='+base+'/"><title>OOPBuy Tab Preview</title></head><body><a href="'+base+'/">Open OOPBuy Tab preview</a></body></html>');
console.log(JSON.stringify({pages:count,sourceRequests:requests.size,output:out,fetchedAt:stamp}));
