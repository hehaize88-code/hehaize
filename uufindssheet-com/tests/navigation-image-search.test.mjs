import test from 'node:test';import assert from 'node:assert/strict';
import {pageLanguages,pageLanguageHref} from '../public/assets/page-languages.mjs';
import {loadImageIndex,matchingPhotoPath} from '../public/assets/image-index-loader.mjs';
import {distance,rankProducts,meanRGB} from '../public/assets/image-search-core.mjs';
const photo=(n=0)=>({path:'/jackets/3485.html',title:'lv down jacket',price:'72.22',image:`https://cnbuycha.com/media/products/3485/${n}.jpg`,imageIndex:n,hash:'0'.repeat(64),cells:Array(48).fill(n*10)});
test('every available editorial language retains the exact document, query and section',()=>{
 for(const path of ['/faq/','/articles/','/how-it-works/','/guides/uufinds-qc-checklist/','/privacy/','/'])for(const locale of pageLanguages()){
  const u=new URL(pageLanguageHref(locale,path,'?page=2','#matching-results'),'https://uufindssheet.com');assert.equal(u.pathname,(locale==='en'?'':'/'+locale)+path);assert.equal(u.search,'?page=2');assert.equal(u.hash,'#matching-results');assert.ok(!u.pathname.includes('/catalog/'));
 }
 assert.deepEqual(pageLanguages(true),['en']);assert.ok(!pageLanguages().includes('es'),'unpublished editions must not be clickable');
});
test('multi-photo search ranks a product by its best matching secondary image, without duplicate product cards',()=>{
 const a=photo(0),b=photo(1),c={...photo(2),path:'/jackets/9999.html'};const ranked=rankProducts(b,[a,c,b]);assert.equal(ranked.length,2);assert.equal(ranked[0].p.imageIndex,1);assert.equal(ranked[0].score,0);assert.equal(matchingPhotoPath(b),'/jackets/3485.html?photo=2');assert.equal(matchingPhotoPath({...b,kind:'style',styleId:'12345'}),'/jackets/3485.html?style=12345');
});
test('area RGB means use half-up rounding to match the Python builder',()=>{assert.deepEqual(meanRGB([10,20,30,255,11,23,35,255]),[11,22,33]);assert.equal(distance(photo(),photo()),0);});
test('index loader loads and validates every shard, reports image/product counts and preserves secondary photos',async()=>{
 const m={version:2,descriptorAlgorithm:'area-v2',catalogCount:1,indexedProductCount:1,indexedImageCount:2,updatedAt:'2026-11-11',shards:[{url:'/catalog-image-index/part-a.json',count:1},{url:'/catalog-image-index/part-b.json',count:1}]};
 const data={'/catalog-image-index.json':m,'/catalog-image-index/part-a.json':{products:[photo(0)]},'/catalog-image-index/part-b.json':{products:[photo(1)]}};const progress=[];
 const result=await loadImageIndex({fetcher:async u=>Response.json(data[u]),onProgress:(a,b)=>progress.push([a,b])});assert.equal(result.productCount,1);assert.equal(result.imageCount,2);assert.equal(result.algorithm,'area-v2');assert.deepEqual(progress.at(-1),[2,2]);
 await assert.rejects(loadImageIndex({fetcher:async u=>u.endsWith('part-b.json')?new Response('error',{status:503}):Response.json(data[u])}),/unavailable/);
 await assert.rejects(loadImageIndex({fetcher:async()=>Response.json({products:[photo(0)]})}),/Invalid index manifest/,'old fingerprints must never silently mix with the new algorithm');
 m.indexedImageCount=3;await assert.rejects(loadImageIndex({fetcher:async u=>Response.json(data[u])}),/coverage mismatch/);m.indexedImageCount=2;
 m.shards[1].url='https://another-site.example/data.json';await assert.rejects(loadImageIndex({fetcher:async()=>Response.json(m)}),/Invalid index shard/);
});
