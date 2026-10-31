import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import fs from 'node:fs/promises';
import worker from '../dist/server/index.js';
const origin='https://kakobuypick.com';
const request=path=>worker.fetch(new Request(origin+path),{},{});
const originalFetch=globalThis.fetch,originalCaches=globalThis.caches;
const stored=new Map();let calls=0,mode='ok';
globalThis.caches={default:{async match(key){return stored.get(String(key))?.clone();},async put(key,response){stored.set(String(key),response.clone());}}};
globalThis.fetch=async input=>{
  calls++;
  const url=new URL(String(input));
  assert.equal(url.origin,'https://cnbuycha.com');
  if(mode==='error')return new Response('Unavailable',{status:503});
  if(mode==='missing')return new Response('Not found',{status:404});
  if(mode==='incomplete')return new Response('<div class="results-summary">63 products</div>');
  const start=(Number(url.searchParams.get('page')||1)-1)*60+1;
  const products=Array.from({length:Math.max(0,Math.min(60,64-start))},(_,i)=>`<article class="product-card"><a class="product-title" href="/jackets/${start+i}.html"><h3>Jacket ${start+i}</h3></a><img src="/media/products/test.jpg"><span class="product-price">12.00</span></article>`).join('');
  return new Response('<div class="results-summary">63 products</div>'+products);
};
const doc=async path=>{const response=await request(path);return {response,document:parseHTML(await response.text()).document};};
const ageCache=async ms=>{for(const [key,response] of stored){const headers=new Headers(response.headers);headers.set('x-source-fetched-at',String(Date.now()-ms));stored.set(key,new Response(await response.text(),{headers}));}};
try{
  const seen=[];
  for(const [page,count] of [[1,20],[2,20],[3,20],[4,3]]){
    const path='/category/jackets/'+(page>1?`?page=${page}`:'');
    const {response,document}=await doc(path);
    assert.equal(response.status,200,path);
    assert.equal(response.headers.get('x-robots-tag'),'index,follow,max-image-preview:large');
    assert.equal(document.querySelector('link[rel=canonical]').href,origin+path);
    assert.equal(document.querySelector('link[hreflang=pl]').href,origin+'/pl'+path);
    const schema=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const list=schema['@graph'].find(x=>x['@type']==='CollectionPage').mainEntity.itemListElement;
    assert.equal(list.length,count);
    assert.equal(list[0].position,(page-1)*20+1);
    seen.push(...list.map(x=>x.url));
    assert.equal(!!document.querySelector('.category-advice'),page===1);
    if(page===2)assert.ok(document.querySelector('.pagination a[href="/category/jackets/"]'));
  }
  assert.equal(new Set(seen).size,63,'Every product is reachable once through the four visible pages');
  assert.equal(calls,2,'Adjacent 20-item pages reuse the same 60-item source response');
  for(const page of ['0','-1','invalid','1501','5']){
    const result=await request('/category/jackets/?page='+page);
    assert.equal(result.status,404,page);
    assert.equal(result.headers.get('x-robots-tag'),'noindex,follow');
  }
  for(const [path,target] of [['/spreadsheet/?page=1&q=&sort=new','/spreadsheet/'],['/pl/category/jackets/?sort=new&page=2','/pl/category/jackets/?page=2']]){
    const result=await request(path);assert.equal(result.status,301);assert.equal(result.headers.get('location'),target);
  }
  for(const path of ['/category/jackets/?q=coat','/category/jackets/?sort=price']){
    const {response,document}=await doc(path);assert.equal(response.status,200);assert.equal(response.headers.get('x-robots-tag'),'noindex,follow');assert.equal(document.querySelector('link[rel=canonical]').href,origin+'/category/jackets/');
  }
  for(const lang of 'en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt'.split(' ')){
    const content=JSON.parse(await fs.readFile(new URL(`../src/content/editorial/${lang}.json`,import.meta.url),'utf8'));
    for(const [category,advice] of Object.entries(content.seo.categoryAdvice)){
      const path=(lang==='en'?'':`/${lang}`)+`/category/${category}/`;
      const {response,document}=await doc(path);
      assert.equal(response.status,200,path);
      assert.equal(document.documentElement.lang,lang,path);
      assert.equal(document.querySelector('.category-advice h2').textContent,advice.heading,path);
      assert.equal(document.querySelector('.category-advice p').textContent,advice.text,path);
      assert.equal(document.querySelector('link[rel=canonical]').href,origin+path,path);
      assert.equal(document.querySelectorAll('link[hreflang]').length,25,path);
    }
  }
  stored.clear();calls=0;
  const concurrent=await Promise.all([request('/category/jackets/'),request('/pl/category/jackets/')]);
  concurrent.forEach(response=>assert.equal(response.status,200));
  assert.equal(calls,1,'Concurrent language requests share one upstream request');
  await ageCache(180000);mode='incomplete';
  assert.equal((await request('/category/jackets/')).status,200,'Broken source markup uses last-good content instead of caching an empty successful page');
  await ageCache(180000);mode='error';
  assert.equal((await request('/category/jackets/')).status,200,'A recent last-good source response survives a brief upstream outage');
  await ageCache(180000);mode='missing';
  assert.equal((await request('/category/jackets/')).status,404,'A confirmed upstream removal is not hidden by stale data');
  await ageCache(901000);mode='error';
  const failure=await request('/category/jackets/');
  assert.equal(failure.status,503);assert.equal(failure.headers.get('cache-control'),'no-store');assert.equal(failure.headers.get('retry-after'),'300');
  assert.equal(failure.headers.get('x-robots-tag'),'noindex,follow');
  const redirect=await worker.fetch(new Request('http://www.kakobuypick.com/pl/articles/?page=2'),{},{});
  assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),origin+'/pl/articles/?page=2');
  console.log('PASS 264 localized category notes; catalogue pagination, canonical/hreflang, filters, bounded cache fallback, removal handling and HTTPS redirect');
}finally{globalThis.fetch=originalFetch;if(originalCaches===undefined)delete globalThis.caches;else globalThis.caches=originalCaches;}
