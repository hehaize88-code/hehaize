import {build} from 'esbuild';
import fs from 'node:fs';
await build({
  entryPoints:['worker/catalog.js'],outfile:'dist/server/index.js',bundle:true,
  format:'esm',platform:'browser',target:'es2022',minify:true,
  plugins:[{name:'client-source',setup(plugin){
    plugin.onResolve({filter:/client-source\.mjs$/},()=>({path:'client',namespace:'source'}));
    plugin.onLoad({filter:/.*/,namespace:'source'},()=>({contents:'export const CLIENT='+JSON.stringify(fs.readFileSync('worker/client.js','utf8'))}));
  }}]
});
