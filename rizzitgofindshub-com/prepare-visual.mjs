import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(here,'../cssbuychina-net');
const remote='https://raw.githubusercontent.com/hehaize88-code/hehaize/main/cssbuychina-net';
const override=process.env.RIZZITGO_VISUAL_INPUT;
const output=path.join(here,'dist/visual-assets/_packed');
async function read(name) {
  if(override) return readFile(path.join(override,name==='/catalog-image-index.json'?'manifest.json':path.basename(name)));
  try { return await readFile(path.join(source,name)); }
  catch(error){ if(error.code!=='ENOENT') throw error; }
  for(let attempt=0;attempt<3;attempt++){
    try{
      const response=await fetch(remote+name,{signal:AbortSignal.timeout(30000)});
      if(!response.ok)throw Error('Image index '+response.status);
      return Buffer.from(await response.arrayBuffer());
    }catch(error){if(attempt===2)throw error;}
  }
}
async function checked(entry){
  const bytes=await read(entry.url);
  if(createHash('sha256').update(bytes).digest('hex')!==entry.sha256)throw Error('Image index checksum: '+entry.url);
  return bytes;
}
const manifest=JSON.parse(await read('/catalog-image-index.json'));
const version=/^\/assets\/visual-index\/([a-f0-9]{16})\/titles\.json$/.exec(manifest.titles.url)?.[1];
if(!version||manifest.source!=='https://cnbuycha.com'||manifest.descriptorAlgorithm!=='compact-rgb-dhash')throw Error('Unexpected visual index');
const titleBytes=await checked(manifest.titles);
const titles=JSON.parse(titleBytes);
await mkdir(path.join(output,version),{recursive:true});
await writeFile(path.join(output,'titles.json'),titleBytes);
const seen=new Set();
const groups=[];
const kinds=['source','gallery','style'];
for(let i=0;i<manifest.shards.length;i+=2){
  const shards=manifest.shards.slice(i,i+2);
  const products=(await Promise.all(shards.map(async shard=>JSON.parse(gunzipSync(await checked(shard)))))).flat();
  const count=shards.reduce((n,s)=>n+s.count,0);
  const descriptors=Buffer.alloc(count*64);
  const names=[],urls=[];
  let cursor=0,urlOffset=0;
  for(const [product,images] of products){
    if(seen.has(product)||!titles[product]||!images.length)throw Error('Invalid product '+product);
    seen.add(product);
    const id=names.push([product,titles[product]])-1;
    for(const [url,hash,color,kind] of images){
      const row=cursor++*64;
      const kindId=kinds.indexOf(kind);
      if(!/^a?[0-9a-f]{16}$/i.test(hash)||kindId<0||Buffer.from(color,'base64').length!==48)throw Error('Invalid photo');
      descriptors[row]=Number(hash.length===17);
      descriptors[row+1]=kindId;
      descriptors.writeUInt16LE(id,row+2);
      descriptors.writeUInt32LE(urlOffset,row+4);
      Buffer.from(hash.slice(-16),'hex').copy(descriptors,row+8);
      Buffer.from(color,'base64').copy(descriptors,row+16);
      const link=Buffer.from(url+'\n');
      urls.push(link);urlOffset+=link.length;
    }
  }
  if(cursor!==count)throw Error('Incomplete shard');
  const header=Buffer.alloc(16), metadata=Buffer.from(JSON.stringify(names));
  header.write('RZI2');header.writeUInt32LE(count,4);
  header.writeUInt32LE(16+descriptors.length,8);header.writeUInt32LE(16+descriptors.length+metadata.length,12);
  const id=groups.length;
  await writeFile(path.join(output,version,id+'.bin'),Buffer.concat([header,descriptors,metadata,...urls]));
  groups.push({id,images:count,products:names.length});
}
if(seen.size!==manifest.indexedProductCount||groups.reduce((n,g)=>n+g.images,0)!==manifest.indexedImageCount)throw Error('Incomplete visual catalogue');
await writeFile(path.join(output,'catalogue.json'),JSON.stringify({version,source:manifest.source,images:manifest.indexedImageCount,products:seen.size,groups}));
console.log('Visual search:',manifest.indexedImageCount,'images across',seen.size,'products');
