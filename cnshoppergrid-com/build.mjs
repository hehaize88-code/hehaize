import {loadEditorial} from './editorial/build.mjs';
import fs from 'node:fs';
fs.mkdirSync('dist/server',{recursive:true});
let files=['locales.js','assets.js','styles.js','weidian.js','source-index.js','order-faq.js','index.js'];
let code=files.map(f=>fs.readFileSync('worker/'+f,'utf8').replace(/^import .*?;\n/gm,'').replace(/export const /g,'const ').replace(/export \{[^}]+\};/g,'')).join('\n');
const content='const siteEditorial='+JSON.stringify(loadEditorial('editorial'))+';\n'+fs.readFileSync('editorial/render.js','utf8')+'\n';
fs.writeFileSync('dist/server/index.js',content+code);
