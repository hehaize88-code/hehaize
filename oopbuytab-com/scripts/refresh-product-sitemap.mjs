// URL-only discovery manifest. Product content and images continue to come from CNBuyCha.
// Run deliberately after reviewing source availability; never during the production build.
import {parseHTML} from 'linkedom';
import {writeFile,mkdir} from 'node:fs/promises';
const origin='https://cnbuycha.com';
const categories=new Set(['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey']);
async function read(page){
 const response=await fetch(`${origin}/AllProducts/?sort=new&page=${page}`,{headers:{'User-Agent':'Mozilla/5.0 (compatible; OOPBuyTab/1.0; +https://oopbuytab.com)'},signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw new Error(`Source page ${page}: HTTP ${response.status}`);
 const doc=parseHTML(await response.text()).document;
 const summary=doc.querySelector('.results-summary')?.textContent||'';
 const total=Number(summary.replace(/\D/g,''));
 if(!total)throw new Error('Missing catalog count');
 const cards=[...doc.querySelectorAll('article.product-card')];
 return {total,paths:cards.filter(card=>{
  const p=card.querySelector('a.product-title')?.getAttribute('href')||'';
  const image=card.querySelector('img')?.getAttribute('src')||'';
  const title=card.querySelector('h3')?.textContent?.trim();
  const price=card.querySelector('.product-price')?.textContent||'';
  return /^\/[a-z-]+\/\d+\.html$/.test(p)&&categories.has(p.split('/')[1])&&title&&image&&!/placeholder/i.test(image)&&/[\d]/.test(price);
 }).map(card=>card.querySelector('a.product-title').getAttribute('href'))};
}
const first=await read(1),pageCount=Math.ceil(first.total/60),paths=[...first.paths];
// Keep concurrency low; fail rather than silently publishing an incomplete crawl.
for(let p=2;p<=pageCount;p+=3){
 const results=await Promise.all(Array.from({length:Math.min(3,pageCount-p+1)},(_,i)=>read(p+i)));
 for(const result of results){if(result.total!==first.total)throw new Error('Catalog changed during crawl; rerun');paths.push(...result.paths);}
 console.log(`Source pages ${Math.min(p+2,pageCount)}/${pageCount}`);
}
const unique=[...new Set(paths)].sort();
if(unique.length<first.total*.95)throw new Error(`Insufficient eligible URLs: ${unique.length}/${first.total}`);
await mkdir('src/content/seo',{recursive:true});
await writeFile('src/content/seo/product-paths.json',JSON.stringify({source:origin,checkedAt:new Date().toISOString(),sourceCount:first.total,paths:unique},null,2)+'\n');
console.log(`Saved ${unique.length} eligible URL paths; no product data copied.`);
