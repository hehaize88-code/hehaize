import sharp from 'sharp';
import {readFile,writeFile,appendFile,mkdir} from 'node:fs/promises';
import {imageURL} from '../src/lib/catalog.ts';
await mkdir('.image-cache',{recursive:true});
const manifest=JSON.parse(await readFile('.image-cache/manifest.json','utf8'));
const warm=process.argv.includes('--warm');
const coverage=warm?{paths:Object.keys(manifest)}:JSON.parse(await readFile('.image-cache/coverage.json','utf8'));
const features=new Map();
try{for(const line of (await readFile('.image-cache/features.jsonl','utf8')).split('\n').filter(Boolean)){try{const [url,f]=JSON.parse(line);features.set(url,f);}catch{}}}catch{}
const urls=new Set();for(const path of coverage.paths){const p=manifest[path];if(!p)continue;for(const u of [...p.images,...(p.styles||[]).map(s=>s.image)])if(imageURL(u))urls.add(u);}
const missing=[...urls].filter(u=>!features.has(u));let cursor=0,done=0,writes=Promise.resolve();const errors=[];
async function worker(){while(cursor<missing.length){const url=missing[cursor++];try{let result;for(let n=0;n<3;n++){try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('HTTP '+r.status);const bytes=Buffer.from(await r.arrayBuffer());if(bytes.length>10000000)throw Error('Image too large');result=await sharp(bytes).rotate().flatten({background:'#ffffff'}).resize(8,8,{fit:'fill',kernel:'linear'}).removeAlpha().toColourspace('srgb').raw().toBuffer();if(result.length!==192)throw Error('Unexpected descriptor');break;}catch(e){if(n===2)throw e;}}const f=result.toString('base64');features.set(url,f);writes=writes.then(()=>appendFile('.image-cache/features.jsonl',JSON.stringify([url,f])+'\n'));await writes;}catch(e){errors.push({url,error:String(e)});}done++;if(done%200===0)console.log('Image descriptors',done,'/',missing.length,'cached',features.size,'failed',errors.length);}}
await Promise.all(Array.from({length:10},worker));await writes;
if(warm){console.log('Descriptor warmup complete',features.size);process.exit(0);}
const rows=[],seen=new Set();let galleryImages=0,styleImages=0;
function compact(f){const rgb=Buffer.from(f,'base64'),packed=Buffer.alloc(96);for(let i=0;i<96;i++)packed[i]=(Math.round(rgb[i*2]/17)<<4)|Math.round(rgb[i*2+1]/17);return packed.toString('base64');}
for(const path of coverage.paths){const p=manifest[path];if(!p)continue;for(const image of p.images){const key=path+'|'+image;if(seen.has(key)||!features.has(image))continue;seen.add(key);rows.push([path,image,compact(features.get(image)),'gallery','']);galleryImages++;}for(const s of p.styles||[]){const key=path+'|'+s.image;if(seen.has(key)||!features.has(s.image))continue;seen.add(key);rows.push([path,s.image,compact(features.get(s.image)),'style',s.id]);styleImages++;}}
const meta={generatedAt:new Date().toISOString(),catalogProducts:coverage.total,coveredProducts:new Set(rows.map(r=>r[0])).size,galleryProducts:coverage.paths.filter(p=>manifest[p]).length,galleryImages,styleImages,images:rows.length,uniqueImages:urls.size,failedImages:errors.length,failedProducts:coverage.errors.length,styleProducts:coverage.paths.filter(p=>manifest[p]?.styles).length,styleUnavailable:coverage.paths.filter(p=>manifest[p]?.styleError&&!manifest[p]?.styles).length,source:'https://cnbuycha.com',algorithm:'8x8 RGB visual fingerprint',complete:coverage.paths.every(p=>manifest[p])&&errors.length===0};
meta.galleryComplete=meta.galleryProducts===meta.catalogProducts&&meta.failedProducts===0&&meta.failedImages===0;
meta.styleUnchecked=meta.catalogProducts-meta.styleProducts;
meta.complete=meta.galleryComplete&&meta.styleUnchecked===0;
const styleOptions={};for(const path of coverage.paths){const p=manifest[path];if(p?.styles)styleOptions[path]={sourceId:p.sourceId,photos:p.styles};}
await writeFile('src/content/image-index.json',JSON.stringify({meta,rows}));
await writeFile('src/content/style-options.json',JSON.stringify({checkedAt:meta.generatedAt,items:styleOptions}));
await writeFile('docs/image-index-coverage.json',JSON.stringify({...meta,errors},null,2));console.log(JSON.stringify(meta));
