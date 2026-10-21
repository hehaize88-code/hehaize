/** Compile real CNBuyCha listings to shared HTML fragments for static pagination. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { source, cards, slugs, ORIGIN } from '../src/lib/catalog.ts';
const out = path.resolve('../docs/oopbuytab-com/catalog');
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, init) => originalFetch(input, {...init, signal:AbortSignal.timeout(60000)});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
function card(p){const href=ORIGIN+p.path;return `<article class="product-card" data-category="${esc(p.category)}" data-product-path="${esc(p.path)}"><a class="card-image" href="${esc(href)}" aria-label="${esc(p.title)}"><span class="missing-image" data-photo-missing>Photo unavailable</span>${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}" width="600" height="600" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">`:''}<span class="card-arrow">${arrow}</span></a><div class="card-info"><span class="card-category">${esc(p.category)}</span><a href="${esc(href)}"><h3>${esc(p.title)}</h3></a><div class="card-bottom"><span class="card-price">$${esc(p.price)} <small>USD</small></span><a href="${esc(href)}" aria-label="${esc(p.title)}">${arrow}</a></div></div></article>`;}
async function readPage(sort,page){
 for(let attempt=0;attempt<3;attempt++){
  try{const d=await source('/AllProducts/?'+new URLSearchParams({sort,page:String(page)}));const summary=d.querySelector('.results-summary')?.textContent||'';const total=Number(summary.replace(/\D/g,''));const items=cards(d);if(!total||!items.length)throw new Error('Empty catalogue response');return {total,items};}
  catch(e){if(attempt===2)throw e;await new Promise(r=>setTimeout(r,1200*(attempt+1)));}
 }
}
await fs.rm(out,{recursive:true,force:true});
let fileCount=0,expectedTotal;const counts={};
for(const sort of ['new','click','price']){
 const first=await readPage(sort,1);const sourcePages=Math.ceil(first.total/60);const batches=[first];
 if(expectedTotal!==undefined&&first.total!==expectedTotal)throw new Error('Catalogue total changed between sorts; retry the build');
 expectedTotal=first.total;
 for(let start=2;start<=sourcePages;start+=3){
  const pages=Array.from({length:Math.min(3,sourcePages-start+1)},(_,i)=>start+i);
  const rows=await Promise.all(pages.map(page=>readPage(sort,page)));
  if(rows.some(row=>row.total!==first.total))throw new Error('Catalogue total changed during export; retry the build');
  batches.push(...rows);if(start%12===2||start+3>sourcePages)console.log(sort+': source '+Math.min(start+2,sourcePages)+'/'+sourcePages);
 }
 const products=batches.flatMap(b=>b.items);
 if(products.length!==first.total||new Set(products.map(p=>p.path)).size!==first.total)throw new Error('Incomplete or duplicate source catalogue for '+sort);
 for(const category of ['all',...slugs]){
  const items=category==='all'?products:products.filter(p=>p.category===category);
  const pages=Math.max(1,Math.ceil(items.length/20));const folder=path.join(out,category,sort);await fs.mkdir(folder,{recursive:true});
  for(let page=1;page<=pages;page++){
   const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>CNBuyCha catalogue page</title></head><body><div class="catalog-fragment" data-total="${items.length}" data-pages="${pages}" data-page="${page}" data-sort="${sort}">${items.slice((page-1)*20,page*20).map(card).join('')}</div></body></html>`;
   await fs.writeFile(path.join(folder,page+'.html'),html);fileCount++;
  }
  counts[category]=items.length;
 }
 console.log(sort+': verified '+products.length+' distinct CNBuyCha products');
}
await fs.writeFile(path.join(out,'generated.txt'),new Date().toISOString()+'\n');
console.log(JSON.stringify({fragments:fileCount,counts,source:ORIGIN}));
