import assert from 'node:assert/strict';
import { DOMParser } from 'linkedom';
import worker from '../dist/server/index.js';
const origin='https://kakobuypick.com';
const request=path=>worker.fetch(new Request(origin+path),{},{});
const originalFetch=globalThis.fetch;
let mode='ok';
const card=(id,category='jackets',image='/media/products/test.jpg')=>`<article class="product-card"><a class="product-title" href="/${category}/${id}.html"><h3>Source product ${id}</h3></a><img src="${image}"><span class="product-price">$12.00</span></article>`;
globalThis.fetch=async input=>{
  const url=new URL(String(input));
  assert.equal(url.origin,'https://cnbuycha.com');
  assert.equal(url.pathname,'/AllProducts/');
  if(mode==='error')return new Response('Unavailable',{status:503});
  if(mode==='invalid')return new Response('<h1>Access challenge</h1>');
  if(mode==='empty')return new Response('<div class="results-summary">0 products</div>');
  if(mode==='incomplete')return new Response('<div class="results-summary">63 products</div>');
  const page=Number(url.searchParams.get('page'));
  const body=page===1?Array.from({length:60},(_,i)=>card(i+1)).join(''):page===2?card(61)+card(61)+card(62,'unknown')+card(63,'shoes','/placeholder.jpg'):'';
  return new Response('<div class="results-summary">63 products</div>'+body);
};
try{
  const response=await request('/sitemap-products.xml');
  assert.equal(response.status,200);
  const index=new DOMParser().parseFromString(await response.text(),'text/xml');
  assert.equal(index.documentElement.tagName,'sitemapindex');
  assert.deepEqual([...index.querySelectorAll('loc')].map(x=>x.textContent),[origin+'/sitemaps/products-1.xml',origin+'/sitemaps/products-2.xml']);
  const all=[];
  for(const [page,count] of [[1,1440],[2,48]]){
    const result=await request(`/sitemaps/products-${page}.xml`);
    assert.equal(result.status,200);
    const text=await result.text();
    const xml=new DOMParser().parseFromString(text,'text/xml');
    assert.equal(xml.documentElement.tagName,'urlset');
    assert.equal(xml.querySelector('parsererror'),null);
    assert.equal(xml.documentElement.getAttribute('xmlns'),'http://www.sitemaps.org/schemas/sitemap/0.9');
    const urls=[...xml.querySelectorAll('loc')].map(x=>x.textContent);
    assert.equal(urls.length,count);
    assert.equal(new Set(urls).size,count);
    assert.ok(!text.includes('lastmod'));
    assert.ok(urls.every(x=>!x.includes('/unknown/')));
    all.push(...urls);
  }
  assert.ok(all.includes(origin+'/mt/products/shoes/63.html'),'A real product remains discoverable when its listing photo is missing');
  assert.equal(new Set(all).size,1488,'Source pages do not repeat first-page products');
  for(const page of ['0','01','3','501','abc'])assert.equal((await request(`/sitemaps/products-${page}.xml`)).status,404,page);
  for(mode of ['empty','invalid','incomplete','error']){
    for(const path of ['/sitemap-products.xml','/sitemaps/products-1.xml']){
      const result=await request(path);
      assert.equal(result.status,503,mode+' '+path);
      assert.equal(result.headers.get('cache-control'),'no-store');
      assert.equal(result.headers.get('retry-after'),'300');
    }
    assert.equal((await request('/sitemap.xml')).status,200,'Editorial sitemap is independent of catalogue availability');
  }
  console.log('PASS product sitemap index and shards: all source pages, 24 languages, real unique paths, bounded failures');
}finally{globalThis.fetch=originalFetch;}
