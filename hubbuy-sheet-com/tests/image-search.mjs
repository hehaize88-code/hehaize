import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import sharp from 'sharp';
import { acceptsImage, MAX_BYTES, fingerprint, rankProducts, validProduct, selectResults, cropArea } from '../public/assets/image-search-core.mjs';

const index = JSON.parse(fs.readFileSync('out/assets/catalog-image-index.json'));
assert.equal(index.products.filter(validProduct).length, 3446, 'Keep every existing source image host and legacy upload path');
for (const [type,name] of [['image/jpeg','a.jpg'],['image/png','a.png'],['image/gif','a.gif'],['image/webp','a.webp'],['','a.jpeg']]) assert.ok(acceptsImage({type,name,size:MAX_BYTES}));
for(const file of [{type:'image/svg+xml',name:'a.svg',size:20},{type:'text/html',name:'a.png',size:20},{type:'image/png',size:0},{type:'image/png',size:MAX_BYTES+1}]) assert.equal(acceptsImage(file),false);
const original=index.products.find(p=>p.path==='/other-stuff/3459.html');
assert.equal(validProduct({...original,path:'//evil.example/a'}),false);
assert.equal(validProduct({...original,image:'javascript:alert(1)'}),false);
assert.equal(validProduct({...original,cells:[NaN]}),false);
assert.equal(rankProducts(original,[original,{...original},null]).length,1);
assert.deepEqual(cropArea(1000,800,'center'),[150,120,700,560]);
assert.deepEqual(selectResults([{p:original,score:.05},{p:{},score:.24}]).items.map(x=>x.p.path),[original.path]);
assert.equal(selectResults([{p:original,score:.4}]).weak,true);

// Real indexed product photo, tested after resize/recompression as well as original.
const photo=fs.readFileSync('tests/fixtures/visual-lego.jpg');
for(const [name,bytes] of [['original',photo],['small JPEG',await sharp(photo).resize(320).jpeg({quality:65}).toBuffer()]]) {
 const meta=await sharp(bytes).metadata(),data={};
 for(const [w,h] of [[9,8],[4,4]]) data[w]=new Uint8ClampedArray(await sharp(bytes).resize(w,h,{fit:'fill'}).ensureAlpha().raw().toBuffer());
 const canvas={getContext:()=>ctx},ctx={fillRect(){},drawImage(){},getImageData(){return {data:data[canvas.width]}}};
 const query=fingerprint({width:meta.width,height:meta.height},'full',canvas);
 const result=rankProducts(query,index.products);
 assert.equal(result[0].p.path,original.path,name+' retrieves correct original product');
 assert.equal(selectResults(result).items.length,1,name+' does not pad a clear match with unrelated products');
}

// UI state tests exercise retries, malformed data and async cancellation with no browser/network dependency.
const source=fs.readFileSync('public/assets/image-search.js','utf8').replace(/^import[^\n]+\n/gm,'');
const flush=async()=>{for(let i=0;i<12;i++)await new Promise(r=>setImmediate(r));};
async function setup(){
 const nodes=new Map(),handlers={},events=[];let fetches=0,reply=()=>Promise.resolve({ok:true,json:async()=>({products:[original],updatedAt:'2026-10-16'})});
 function node(id){if(!nodes.has(id))nodes.set(id,{id,hidden:false,value:'full',files:[],disabled:false,innerHTML:'',textContent:'',dataset:{locale:'en'},classList:{add(){},remove(){},toggle(){}},addEventListener(n,f){this[n]=f;},setAttribute(n,v){this[n]=v;},removeAttribute(n){delete this[n];},replaceChildren(){this.innerHTML='';},focus(){},contains(){return false;}});return nodes.get(id);}
 const document={getElementById:node,querySelector:()=>node('main'),addEventListener:(n,f)=>handlers[n]=f,dispatchEvent:e=>events.push(e.detail)};
 const context={loadDictionary:async()=>({}),document,window:{addEventListener(){}},Image:class {naturalWidth=100;naturalHeight=100;decode(){return Promise.resolve()}},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},AbortController,CustomEvent:class{constructor(n,options){this.detail=options.detail}},setTimeout,clearTimeout,requestAnimationFrame:f=>setImmediate(f),fetch:()=>{fetches++;return reply();},acceptsImage,rankProducts,selectResults,validProduct,fingerprint:()=>({...original,variation:30})};
 vm.runInNewContext(source,context);await flush();
 const file={type:'image/jpeg',name:'photo.jpg',size:100};
 async function choose(value=file){node('image-file').files=[value];node('image-file').change();await flush();}
 return {node,handlers,events,choose,reply:fn=>reply=fn,fetches:()=>fetches};
}
{
 const u=await setup();await u.choose();assert.ok(u.node('image-results').innerHTML.includes('/catalog/other-stuff/3459.html'));assert.equal(u.fetches(),1);
 u.node('image-retry').click();await flush();assert.equal(u.fetches(),1,'Reuse loaded index');
 await u.choose({type:'text/html',name:'bad.html',size:50});assert.equal(u.node('image-results').innerHTML,'');assert.equal(u.node('image-controls').hidden,true);assert.ok(u.node('image-status').textContent.includes('20 MB'));
}
{
 const u=await setup();u.reply(()=>Promise.resolve({ok:false}));await u.choose();assert.ok(u.node('image-status').textContent.includes('could not be loaded'));assert.equal(u.node('image-retry').disabled,false);
 u.reply(()=>Promise.resolve({ok:true,json:async()=>({products:[original]})}));u.node('image-retry').click();await flush();assert.equal(u.fetches(),2);assert.ok(u.node('image-results').innerHTML.includes('Lego'));
}
{
 const u=await setup();let finish;u.reply(()=>new Promise(r=>finish=r));await u.choose();u.node('image-cancel').click();finish({ok:true,json:async()=>({products:[original]})});await flush();assert.equal(u.node('image-results').innerHTML,'');assert.ok(u.node('image-status').textContent.includes('cancelled'));
 u.node('image-retry').click();await flush();assert.ok(u.node('image-results').innerHTML.includes('Lego'));
 u.node('image-reset').click();assert.equal(u.node('image-results').innerHTML,'');assert.equal(u.node('image-controls').hidden,true);
}
{
 const u=await setup();let prevented=false;
 u.handlers.paste({target:{closest:()=>null},clipboardData:{items:[{kind:'file',type:'image/jpeg',getAsFile:()=>({type:'image/jpeg',name:'paste.jpg',size:100})}]},preventDefault(){prevented=true}});await flush();assert.equal(prevented,true);assert.ok(u.node('image-results').innerHTML.includes('Lego'));
 u.node('image-drop').drop({dataTransfer:{files:[{type:'image/png',name:'drop.png',size:100}]},preventDefault(){}});await flush();assert.equal(u.fetches(),1);assert.ok(u.node('image-results').innerHTML.includes('Lego'));
}
console.log('PASS visual search: all 3,446 index records, real-photo/recompressed retrieval, conservative result selection, format/size validation, retry/cache, cancel/stale-result protection, clear, paste and drop.');
