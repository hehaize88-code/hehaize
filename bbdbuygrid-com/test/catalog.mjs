import assert from 'node:assert/strict';
import worker,{locales} from '../worker/index.js';
let total=3467,requests=[];
globalThis.fetch=async input=>{
 const u=new URL(input);requests.push(u);
 const page=Number(u.searchParams.get('page')),start=(page-1)*60;
 const count=Math.max(0,Math.min(60,total-start));
 return new Response(`<div class="results-summary">${total.toLocaleString('en-US')} products</div>`+Array.from({length:count},(_,i)=>`<article class="product-card"><a href="/shoes/${start+i+1}.html"><img src="https://cnbuycha.com/image.jpg"><h3>Item ${start+i+1}</h3><span class="product-price">12.00</span></a></article>`).join(''));
};
async function render(path){const r=await worker.fetch(new Request('https://preview.test'+path));assert.equal(r.status,200);return r.text()}
for(const lang of Object.keys(locales)){
 const html=await render(`/${lang}/spreadsheet/`);
 assert.match(html,/<strong>1<\/strong> \/ <strong>289<\/strong>/);
 assert.match(html,/max="289"/);assert.ok(!html.includes('undefined'));
}
let html=await render('/en/spreadsheet/?page=6');assert.ok(html.includes('Item 61'));assert.ok(html.includes('Item 72'));assert.ok(!html.includes('Item 73'));
html=await render('/en/spreadsheet/?page=289');assert.match(html,/<strong>289<\/strong> \/ <strong>289<\/strong>/);assert.ok(html.includes('Item 3467'));assert.ok(!html.includes('page=290'));
html=await render('/en/spreadsheet/?page=9999');assert.match(html,/<strong>289<\/strong> \/ <strong>289<\/strong>/);assert.ok(html.includes('Item 3467'));
total=25;html=await render('/fr/categories/?category=shoes&q=Air%20%26%20Max&sort=price&page=2');
assert.match(html,/<strong>2<\/strong> \/ <strong>3<\/strong>/);assert.match(html,/name="category" value="shoes"/);assert.match(html,/name="q" value="Air &amp; Max"/);assert.match(html,/name="sort" value="price"/);
assert.equal(requests.at(-1).searchParams.get('q'),'Air & Max');
total=0;html=await render('/en/spreadsheet/?q=missing');assert.match(html,/<strong>1<\/strong> \/ <strong>1<\/strong>/);assert.ok(!html.includes('page=2'));
console.log('PASS: 24 languages, source-page boundaries, last page, out-of-range clamping, filtered counts, filter preservation, empty results.');
