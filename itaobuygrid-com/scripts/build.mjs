import {readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync} from 'node:fs';
const load = name => readFileSync(new URL('../worker/'+name+'.js',import.meta.url),'utf8');
const client = load('client')+'\n'+load('visual-search');
const index = name => readFileSync(new URL('../search-index/'+name,import.meta.url));
const meta = JSON.parse(index('manifest.json'));
const shards = Object.fromEntries(meta.shards.map(({id})=>[id,index(id+'.json.gz').toString('base64')]));
const data='const IMAGE_META='+JSON.stringify(meta)+';const IMAGE_NAMES='+index('names.json')+';const IMAGE_SHARDS='+JSON.stringify(shards)+';\n';
const content=JSON.parse(readFileSync(new URL('../worker/editorial-content.json',import.meta.url),'utf8'));
const localeDir=new URL('../worker/editorial-locales/',import.meta.url);
if(existsSync(localeDir)){
  for(const file of readdirSync(localeDir).filter(name=>name.endsWith('.json'))){
    content[file.slice(0,-5)]=JSON.parse(readFileSync(new URL(file,localeDir),'utf8'));
  }
}
const editorial='const editorialContent='+JSON.stringify(content)+';\n';
const output = ['catalog','detail','languages','titles','search-text','theme','editorial','entry'].map(load).join('\n');
mkdirSync('dist/server',{recursive:true});
writeFileSync('dist/server/index.js','const CLIENT='+JSON.stringify(client)+';\n'+editorial+data+output);
