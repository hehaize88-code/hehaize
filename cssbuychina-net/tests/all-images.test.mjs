import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import {acceptsImage,rankProducts} from '../public/commerce/image-search-core.mjs';
import {searchAllImages} from '../public/commerce/image-search-stream.mjs';
import {matchingPhotoPath} from '../public/commerce/image-index-loader.mjs';
import {initialGallery} from '../public/commerce/photo-selection.mjs';

const record=(path,index,hash='0'.repeat(64))=>({path,title:'Nike shoes',price:'20',image:`https://cnbuycha.com/media/products/3445/${index}.jpg`,kind:'gallery',imageIndex:index,hash,cells:Array(48).fill(128)});
test('a secondary image wins and duplicate photos do not duplicate product results',()=>{
 const query=record('/shoes/3445.html',2),first=record(query.path,0,'1'.repeat(64)),last=record(query.path,3,'1'.repeat(64));
 const results=rankProducts(query,[first,query,last,record('/shoes/3490.html',0,'1'.repeat(64))]);
 assert.equal(results.length,2);assert.equal(results[0].p.imageIndex,2);assert.equal(results[0].score,0);
});
test('matched catalogue, seller and style photos use distinct, validated deep links',()=>{
 const p=record('/shoes/3445.html',2);
 assert.equal(matchingPhotoPath(p),'/shoes/3445.html?photo=3&photoSource=catalogue');
 assert.equal(matchingPhotoPath({...p,kind:'seller'}),'/shoes/3445.html?photo=3&photoSource=seller');
 assert.equal(matchingPhotoPath({...p,kind:'style',styleId:'9835845198'}),'/shoes/3445.html?style=9835845198');
 assert.doesNotMatch(matchingPhotoPath({...p,kind:'style',styleId:'bad&x=1'}),/bad/);
});
test('late seller photo data preserves the requested catalogue image',()=>{
 const catalogue=['c1','c2','c3'],seller=['s1','s2','s3'];
 for(const query of ['photo=3&photoSource=catalogue','photo=3'])assert.deepEqual(initialGallery(new URLSearchParams(query),catalogue,seller),{photos:catalogue,index:2});
 assert.deepEqual(initialGallery(new URLSearchParams('photo=2&photoSource=seller'),catalogue,seller),{photos:seller,index:1});
 assert.deepEqual(initialGallery(new URLSearchParams(),catalogue,seller),{photos:seller,index:0});
 assert.equal(initialGallery(new URLSearchParams('photo=-1'),catalogue).index,0);
});
function fakeIndex(parts,override={}){
 const files=new Map();const shards=parts.map((products,i)=>{
  const bytes=Buffer.from(JSON.stringify({products})),url=`/catalog-image-index/part-${i}.json`;
  files.set(url,bytes);return {url,count:products.length,sha256:createHash('sha256').update(bytes).digest('hex')};
 });
 const manifest={version:2,descriptorAlgorithm:'area-v2',indexedImageCount:parts.flat().length,indexedProductCount:new Set(parts.flat().map(p=>p.path)).size,shards,...override};
 return {manifest,fetcher:async url=>url==='/catalog-image-index.json'?Response.json(manifest):new Response(files.get(url)),files};
}
test('every shard is searched, including a better photo in the final shard',async()=>{
 const query=record('/shoes/3445.html',2),index=fakeIndex([[record(query.path,0,'1'.repeat(64))],[record('/shoes/3490.html',0,'1'.repeat(64))],[query]]),progress=[];
 const result=await searchAllImages(query,{fetcher:index.fetcher,onProgress:n=>progress.push(n)});
 assert.equal(result.items[0].p.imageIndex,2);assert.equal(result.imageCount,3);assert.equal(result.productCount,2);assert.equal(progress.at(-1),3);
});
test('missing, corrupted or incomplete shards fail instead of silently searching only some images',async()=>{
 const p=record('/shoes/3445.html',0);
 for(const kind of ['checksum','count','coverage']){
  const index=fakeIndex([[p]]);
  if(kind==='checksum')index.files.set(index.manifest.shards[0].url,Buffer.from('{}'));
  if(kind==='count')index.manifest.indexedImageCount=2;
  if(kind==='coverage')index.manifest.indexedProductCount=2;
  await assert.rejects(searchAllImages(p,{fetcher:index.fetcher}));
 }
});
test('temporary shard failures honor Retry-After and still search every image',async()=>{
 const p=record('/shoes/3445.html',2),index=fakeIndex([[p]]),waits=[];let calls=0;
 const fetcher=async url=>url!='/catalog-image-index.json'&&calls++===0?new Response('',{status:429,headers:{'Retry-After':'2'}}):index.fetcher(url);
 const result=await searchAllImages(p,{fetcher,wait:async ms=>waits.push(ms)});
 assert.deepEqual(waits,[2000]);assert.equal(result.imageCount,1);assert.equal(result.items[0].p.imageIndex,2);
});
test('uploads reject oversized files and every locale has search feedback',async()=>{
 assert.equal(acceptsImage({name:'photo.jpg',type:'image/jpeg',size:20*1024*1024+1}),false);
 assert.equal(acceptsImage({name:'photo.gif',type:'image/gif',size:100}),true);
 for(const file of await fs.readdir(new URL('../public/assets/locales/',import.meta.url))){
  const dictionary=JSON.parse(await fs.readFile(new URL('../public/assets/locales/'+file,import.meta.url)));
  for(const key of ['Search product, detail and style photos.','No close visual match found.','Loading catalogue images…','Search again'])assert.ok(dictionary[key],file+': '+key);
 }
});
