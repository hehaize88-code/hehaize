import fs from 'node:fs';
const names=['main.js','upgrade.js','locales.js','names.js','search-server.js','editorial.js','production.js'];
const parts=names.map(n=>fs.readFileSync('worker/'+n,'utf8'));
parts.push('const CLIENT='+JSON.stringify(fs.readFileSync('worker/client.js','utf8')+'\n'+fs.readFileSync('worker/image-search.js','utf8'))+';');
const editorial = JSON.parse(fs.readFileSync('worker/editorial-content.json','utf8'));
if(fs.existsSync('worker/editorial-locales')) {
  for(const file of fs.readdirSync('worker/editorial-locales').filter(name=>name.endsWith('.json'))) {
    editorial[file.slice(0,-5)]=JSON.parse(fs.readFileSync('worker/editorial-locales/'+file,'utf8'));
  }
}
parts.push('const editorialContent='+JSON.stringify(editorial)+';');
const meta=JSON.parse(fs.readFileSync('image-cache/manifest.json','utf8'));
const data=Object.fromEntries(meta.shards.map(s=>[s.id,fs.readFileSync('image-cache/'+s.id+'.json.gz').toString('base64')]));
const imageNames=JSON.parse(fs.readFileSync('image-cache/names.json','utf8'));
parts.push('const IMAGE_META='+JSON.stringify(meta)+';const IMAGE_SHARDS='+JSON.stringify(data)+';const IMAGE_NAMES='+JSON.stringify(imageNames)+';');
fs.writeFileSync('worker/index.js',parts.join('\n'));
