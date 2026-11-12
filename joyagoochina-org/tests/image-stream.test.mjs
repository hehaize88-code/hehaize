import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {searchAllImages} from '../public/commerce/image-search-stream.mjs';
import {matchingPhotoPath} from '../public/commerce/image-index-loader.mjs';

const query={hash:'0'.repeat(64),cells:Array(48).fill(100)};
const record=(path,extra={})=>({path,title:'Example jacket',image:'https://example.com/photo.jpg',price:10,...query,...extra});
function fixture(groups,overrides={}){
 const data=new Map(),shards=groups.map((products,i)=>{
  const url=`/catalog-image-index/test-${i}.json`,bytes=JSON.stringify({products});data.set(url,bytes);
  return {url,count:products.length,sha256:createHash('sha256').update(bytes).digest('hex')};
 });
 const manifest={version:2,descriptorAlgorithm:'area-v2',indexedImageCount:groups.flat().length,indexedProductCount:new Set(groups.flat().map(p=>p.path)).size,catalogCount:2,updatedAt:'2026-11-12',shards,...overrides};
 const fetcher=async url=>new Response(url==='/catalog-image-index.json'?JSON.stringify(manifest):data.get(url),{status:data.has(url)||url==='/catalog-image-index.json'?200:404});
 return {manifest,data,fetcher};
}
test('full scan finds a non-cover photo in the last shard and deduplicates products',async()=>{
 const f=fixture([[record('/jackets/1.html',{hash:'1'.repeat(64),imageIndex:0})],[record('/shoes/2.html',{hash:'1'.repeat(64)})],[record('/jackets/1.html',{imageIndex:4})]]);
 const progress=[];const result=await searchAllImages(query,{fetcher:f.fetcher,onProgress:(n,total)=>progress.push([n,total])});
 assert.equal(result.imageCount,3);assert.equal(result.productCount,2);assert.equal(result.items[0].p.imageIndex,4);assert.equal(result.items[0].score,0);
 assert.equal(matchingPhotoPath(result.items[0].p),'/jackets/1.html?photo=5');assert.deepEqual(progress.at(-1),[3,3]);
 assert.equal(new Set(result.items.map(x=>x.p.path)).size,result.items.length);
});
test('style matches preserve the actual style identifier',async()=>{
 const f=fixture([[record('/bags/3.html',{kind:'style',styleId:'835901',imageIndex:91})]]);
 const result=await searchAllImages(query,{fetcher:f.fetcher});
 assert.equal(matchingPhotoPath(result.items[0].p),'/bags/3.html?style=835901');
});
test('corrupt or missing shards cannot silently return incomplete results',async()=>{
 const f=fixture([[record('/bags/3.html')]]);f.data.set(f.manifest.shards[0].url,'{}');
 await assert.rejects(searchAllImages(query,{fetcher:f.fetcher}),/integrity/);
 f.data.clear();await assert.rejects(searchAllImages(query,{fetcher:f.fetcher}),/Missing image shard/);
});
test('declared product and image coverage must match the scanned data',async()=>{
 const f=fixture([[record('/bags/3.html')]],{indexedProductCount:2});
 await assert.rejects(searchAllImages(query,{fetcher:f.fetcher}),/coverage mismatch/);
 f.manifest.indexedImageCount=2;
 await assert.rejects(searchAllImages(query,{fetcher:f.fetcher}),/Incomplete image index/);
});
test('transient shard failure retries, but a long Retry-After is respected',async()=>{
 const f=fixture([[record('/bags/3.html')]]);let calls=0;
 const fetcher=async(url,opts)=>url.includes('/test-')&&++calls===1?new Response('',{status:503}):f.fetcher(url,opts);
 assert.equal((await searchAllImages(query,{fetcher})).imageCount,1);assert.equal(calls,2);
 let limited=0;await assert.rejects(searchAllImages(query,{fetcher:async()=>{limited++;return new Response('',{status:429,headers:{'retry-after':'120'}});}}),/Index unavailable/);assert.equal(limited,1);
});
