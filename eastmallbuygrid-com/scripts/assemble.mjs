import fs from 'node:fs';
const names=['main.js','upgrade.js','locales.js','names.js','search-server.js','production.js'];
const parts=names.map(n=>fs.readFileSync('worker/'+n,'utf8'));
parts.push('const CLIENT='+JSON.stringify(fs.readFileSync('worker/client.js','utf8')+'\n'+fs.readFileSync('worker/image-search.js','utf8'))+';');
const meta=JSON.parse(fs.readFileSync('image-cache/manifest.json','utf8'));
const data=Object.fromEntries(meta.shards.map(s=>[s.id,fs.readFileSync('image-cache/'+s.id+'.json.gz').toString('base64')]));
const imageNames=JSON.parse(fs.readFileSync('image-cache/names.json','utf8'));
parts.push('const IMAGE_META='+JSON.stringify(meta)+';const IMAGE_SHARDS='+JSON.stringify(data)+';const IMAGE_NAMES='+JSON.stringify(imageNames)+';');
fs.writeFileSync('worker/index.js',parts.join('\n'));
