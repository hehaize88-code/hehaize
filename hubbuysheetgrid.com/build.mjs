import {build} from 'esbuild';
import fs from 'node:fs';
await build({
  stdin:{contents:"export {default} from './worker/catalog.js'",resolveDir:process.cwd()},outfile:'dist/server/index.js',bundle:true,
  format:'esm',platform:'browser',target:'es2022',minify:true,
  plugins:[{name:'client-source',setup(plugin){
    plugin.onResolve({filter:/client-source\.mjs$/},()=>({path:'client',namespace:'source'}));
    plugin.onLoad({filter:/.*/,namespace:'source'},()=>({contents:'export const CLIENT='+JSON.stringify(fs.readFileSync('worker/client.js','utf8'))}));
  }}]
});


const {gunzipSync}=await import('node:zlib');
const {imageMeta}=await import('./worker/image-data.mjs');
const dir='dist/assets/index/'+imageMeta.revision;
fs.mkdirSync(dir,{recursive:true});
for(let i=0;i<imageMeta.shards;i++){
  fs.writeFileSync(dir+'/'+i+'.json',gunzipSync(fs.readFileSync('index-shards/'+imageMeta.revision+'/'+i+'.json.gz')));
}
