import fs from 'node:fs';
fs.mkdirSync('dist/server',{recursive:true});
let files=['locales.js','assets.js','styles.js','weidian.js','source-index.js','index.js'];
let code=files.map(f=>fs.readFileSync('worker/'+f,'utf8').replace(/^import .*?;\n/gm,'').replace(/export const /g,'const ').replace(/export \{[^}]+\};/g,'')).join('\n');
fs.writeFileSync('dist/server/index.js',code);
