import {validProduct} from './image-search-core.mjs?v=20261111-area-v2';
const manifestPath='/catalog-image-index.json';
export async function loadImageIndex({fetcher=fetch,signal,onProgress=()=>{}}={}){
 const get=async url=>{const r=await fetcher(url,{signal,...(url===manifestPath?{cache:'no-cache'}:{})});if(!r.ok)throw Error('Index unavailable');return r.json();};
 const manifest=await get(manifestPath);
 let records=[];
 {
  if(manifest.version!==2||manifest.descriptorAlgorithm!=='area-v2'||!Array.isArray(manifest.shards)||!manifest.shards.length||manifest.shards.length>500)throw Error('Invalid index manifest');
  const shards=manifest.shards;
  if(shards.some(s=>!/^\/catalog-image-index\/[a-z0-9.-]+\.json$/.test(s.url)||!Number.isSafeInteger(s.count)||s.count<=0))throw Error('Invalid index shard');
  let cursor=0,loaded=0;const batches=new Array(shards.length);const total=shards.reduce((n,s)=>n+s.count,0);
  await Promise.all(Array.from({length:Math.min(4,shards.length)},async()=>{
   while(cursor<shards.length){const i=cursor++,shard=shards[i],data=await get(shard.url);
    if(!Array.isArray(data.products)||data.products.length!==shard.count||data.products.some(p=>!validProduct(p)))throw Error('Incomplete index shard');
    batches[i]=data.products;loaded+=data.products.length;onProgress(loaded,total);
   }
  }));
  records=batches.flat();
 }
 const products=records.filter(validProduct);
 if(!products.length||products.length!==records.length)throw Error('Invalid index records');
 const productCount=new Set(products.map(p=>p.path)).size;
 if(manifest.indexedImageCount!==products.length||manifest.indexedProductCount!==productCount)throw Error('Index coverage mismatch');
 return {products,productCount,imageCount:products.length,catalogCount:manifest.catalogCount||productCount,
  algorithm:manifest.descriptorAlgorithm||'legacy',failedImageCount:manifest.failedImageCount||0,
  discoveredImageCount:manifest.discoveredImageCount||products.length,failedDetailCount:manifest.failedDetailCount||0,failedStylePageCount:manifest.failedStylePageCount||0,unattemptedStylePageCount:manifest.unattemptedStylePageCount||0,
  updatedAt:/^\d{4}-\d{2}-\d{2}$/.test(manifest.updatedAt)?manifest.updatedAt:''};
}
export function matchingPhotoPath(product){
 const params=new URLSearchParams();
 if(product.kind==='style'&&/^\d+$/.test(product.styleId||''))params.set('style',product.styleId);
 else if(product.kind==='seller'&&Number.isSafeInteger(product.imageIndex)&&product.imageIndex>=0)params.set('seller',String(product.imageIndex+1));
 else if(Number.isSafeInteger(product.imageIndex)&&product.imageIndex>=0)params.set('photo',String(product.imageIndex+1));
 return product.path+(params.size?'?'+params:'');
}
