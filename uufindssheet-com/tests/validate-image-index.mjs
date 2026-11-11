import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../public');
const index=JSON.parse(await readFile(path.join(root,'catalog-image-index.json'),'utf8'));
assert.equal(index.version,2);assert.equal(index.descriptorAlgorithm,'area-v2');
assert.equal(index.source,'https://cnbuycha.com');assert.ok(index.catalogCount>3000);
const records=[];
for(const shard of index.shards){
 assert.match(shard.url,/^\/catalog-image-index\/part-\d{3}-[a-f0-9]{12}\.json$/);
 const content=await readFile(path.join(root,shard.url));
 assert.equal(content.length,shard.bytes);assert.equal(createHash('sha256').update(content).digest('hex'),shard.sha256);
 const rows=JSON.parse(content).products;assert.equal(rows.length,shard.count);assert.ok(rows.length<=250);
 records.push(...rows);
}
assert.equal(records.length,index.indexedImageCount);
assert.equal(new Set(records.map(r=>r.path)).size,index.indexedProductCount);
assert.equal(new Set(records.map(r=>r.path+'\0'+r.image)).size,records.length,'Each product/photo pair occurs once');
assert.equal(records.filter(r=>r.kind==='gallery').length,index.galleryImageCount);
assert.equal(records.filter(r=>r.kind==='style').length,index.styleImageCount);
for(const row of records){
 assert.match(row.path,/^\/[a-z0-9-]+\/\d+\.html$/);
 assert.match(row.image,/^https:\/\//);assert.match(row.hash,/^[01]{64}$/);
 assert.equal(row.cells.length,48);assert.ok(row.cells.every(c=>Number.isInteger(c)&&c>=0&&c<=255));
 assert.ok(Number.isInteger(row.imageIndex)&&row.imageIndex>=0);
 if(row.kind==='style')assert.match(row.styleId,/^\d+$/);
}
const jacket=records.filter(r=>r.path==='/jackets/3485.html'&&r.kind==='gallery');
assert.equal(jacket.length,4);assert.deepEqual(jacket.map(r=>r.imageIndex),[0,1,2,3]);
assert.ok(jacket.every(r=>r.sourceId==='7884462272'));
console.log(`Verified ${records.length} image records / ${index.indexedProductCount} products / ${index.shards.length} integrity-checked shards, including all four example jacket gallery images.`);
