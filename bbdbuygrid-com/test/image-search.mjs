import assert from 'node:assert/strict';
import worker,{locales} from '../worker/index.js';
import {SEARCH_INDEX as index} from '../worker/search-index.js';
assert.equal(index.items.length,index.total);assert.equal(new Set(index.items.map(p=>p[0])).size,index.total);
assert.equal(index.items.reduce((n,p)=>n+p[2].length,0),index.images);
assert.equal(index.images+index.missingImages,index.sourceImages);
assert.equal(index.auditedProducts,index.total);
for(const p of index.items){assert.match(p[0],/^\/[a-z-]+\/\d+\.html$/);for(const im of p[2]){assert.equal(Buffer.from(im[2],'base64').length,192);assert.match(im[1],/^[a-f\d]{16}$/i);assert.ok(Number.isInteger(im[3]));}}
for(const l of Object.keys(locales)){const r=await worker.fetch(new Request(`https://preview.test/${l}/image-search/`));assert.equal(r.status,200);const text=await r.text();assert.ok(text.includes('id="image-file"'));assert.ok(!text.includes('>undefined<'));}
const r=await worker.fetch(new Request('https://preview.test/api/image-index?lang=fr'));const data=await r.json();assert.equal(data.images,index.images);assert.ok(data.items.every(p=>p[3].fr));
console.log(`Passed: ${index.total} products, ${index.images} fingerprints, ${Object.keys(locales).length} language routes; full source image accounting`);
