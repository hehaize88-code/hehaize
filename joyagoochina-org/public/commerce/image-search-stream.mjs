import {validProduct,rankProducts,selectResults} from './image-search-core.mjs';

// Scan every immutable shard, retaining only the strongest per-product matches.
// Memory is bounded by four shards, the small product-ID set and 24 results.
export async function searchAllImages(query,{fetcher=fetch,signal,onProgress=()=>{},limit=24}={}){
 const response=await fetcher('/catalog-image-index.json',{cache:'no-cache',signal});
 if(!response.ok)throw Error('Index unavailable');
 const manifest=await response.json(),shards=manifest.shards;
 if(manifest.version!==2||manifest.descriptorAlgorithm!=='area-v2'||!Array.isArray(shards)||!shards.length||shards.length>1000)throw Error('Invalid image index');
 const total=shards.reduce((n,s)=>n+s.count,0);
 if(total!==manifest.indexedImageCount||shards.some(s=>!/^\/catalog-image-index\/[a-z0-9.-]+\.json$/.test(s.url)||!Number.isSafeInteger(s.count)||s.count<1||!/^[a-f0-9]{64}$/.test(s.sha256)))throw Error('Incomplete image index');
 let cursor=0,loaded=0,best=[];const paths=new Set();
 await Promise.all(Array.from({length:Math.min(4,shards.length)},async()=>{
  while(cursor<shards.length){
   const shard=shards[cursor++],r=await fetcher(shard.url,{signal});if(!r.ok)throw Error('Missing image shard');
   const bytes=await r.arrayBuffer();
   const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');
   if(hash!==shard.sha256)throw Error('Image shard integrity mismatch');
   const data=JSON.parse(new TextDecoder().decode(bytes));
   if(!Array.isArray(data.products)||data.products.length!==shard.count||data.products.some(p=>!validProduct(p)))throw Error('Invalid image records');
   data.products.forEach(p=>paths.add(p.path));
   const candidates=rankProducts(query,data.products,limit);
   best=rankProducts(query,[...best.map(x=>x.p),...candidates.map(x=>x.p)],limit);
   loaded+=data.products.length;onProgress(loaded,total);
  }
 }));
 if(loaded!==manifest.indexedImageCount||paths.size!==manifest.indexedProductCount)throw Error('Image coverage mismatch');
 return {...selectResults(best),productCount:paths.size,imageCount:loaded,catalogCount:manifest.catalogCount,updatedAt:manifest.updatedAt,
  failedImageCount:manifest.failedImageCount||0,failedStylePageCount:manifest.failedStylePageCount||0,failedDetailCount:manifest.failedDetailCount||0};
}
