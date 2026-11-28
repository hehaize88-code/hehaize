import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';

// Convert the catalogue's two feature formats to one fixed-width search table.
// Keep URLs separate so scanning never requires decoding every image URL.
const input='public/visual-index/';
const manifest=JSON.parse(fs.readFileSync(input+'manifest.json'));
const version=createHash('sha256').update(JSON.stringify(manifest.shards)).digest('hex').slice(0,16);
const directory='public/photo-match/'+version;
fs.mkdirSync(directory,{recursive:true});
const rows=[],features=[];
function pack(path,data){fs.writeFileSync(directory+'/'+path,gzipSync(data,{level:6}));}
for(const [index,file] of manifest.shards.entries()){
 const batch=JSON.parse(gunzipSync(fs.readFileSync(input+file)));
 const imageLists=[];
 for(const [path,title,entries] of batch){
  const urls=[];
  for(const [url,hash,color] of entries){
   if(!hash||!color)continue;
   const rgb=Buffer.from(color,'base64'),bits=Buffer.from(hash.slice(-16),'hex');
   if(rgb.length!==48||bits.length!==8)throw Error('Invalid search features in '+file);
   features.push(Buffer.concat([Buffer.from([Number(hash.length===17)]),bits,rgb]));
   urls.push(url);
  }
  const cover=urls.find(url=>url.startsWith('https://cnbuycha.com/'))||urls[0];
  rows.push([path,title,index,imageLists.length,urls.length,cover]);
  imageLists.push(urls);
 }
 pack('images-'+index+'.bin',JSON.stringify(imageLists));
}
if(rows.length!==manifest.total||features.length!==manifest.images)throw Error('Incomplete image search index');
pack('features.bin',Buffer.concat(features));pack('products.bin',JSON.stringify(rows));
fs.writeFileSync('public/photo-match/search-worker.js',fs.readFileSync('search-worker.js','utf8').replace('INDEX_VERSION',version));
fs.copyFileSync('search-client.js','public/photo-match/search-client.js');
