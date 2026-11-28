import fs from 'node:fs';
import './build-image-search.mjs';
import {createHash} from 'node:crypto';
const read=name=>fs.readFileSync(name,'utf8');
const packedTitles=Object.fromEntries(fs.readdirSync('titles').filter(n=>n.endsWith('.b64')).map(n=>[n.split('.')[0],read('titles/'+n).trim()]));
const revision=createHash('sha256').update(read('editorial-data/en.json')).digest('hex').slice(0,16);
const output='const editorialRevision='+JSON.stringify(revision)+';\nconst packedTitles='+JSON.stringify(packedTitles)+';\n'+read('catalog.mjs').replace(/export \{[^}]+\};/,'')+read('brand.mjs').replace('export const','const')+'\nconst h=escapeHtml;\n'+read('ui-assets.mjs')+'\nuiAssets["/assets/visual.js"]='+JSON.stringify(read('search-client.js'))+';\n'+read('commerce.mjs')+'\n'+read('services.mjs')+'\n'+'const productPaths='+read('product-paths.json')+';\n'+'const editions='+JSON.stringify(Object.fromEntries(['en','zh'].map(l=>[l,JSON.parse(read('editorial-data/'+l+'.json'))])))+';\n'+read('editorial.mjs')+'\n'+read('storefront.mjs')+'\n'+read('seo.mjs')+'\n'+read('main.mjs').replace(/^import [^\n]+\n/gm,'').replace('STYLE_CONTENT',()=>JSON.stringify(read('style.css')));
fs.mkdirSync('dist/server',{recursive:true});fs.writeFileSync('dist/server/index.js',output);
