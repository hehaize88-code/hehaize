import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {source,cards,detail} from '../src/lib/catalog.ts';
import {styles} from '../src/lib/styles.ts';
await mkdir('.image-cache',{recursive:true});
const first=await source('/AllProducts/?sort=new&page=1');
const total=Number(first.querySelector('.results-summary').textContent.replace(/\D/g,''));
const products=new Map(cards(first).map(p=>[p.path,p]));let page=2;
async function list(){while(page<=Math.ceil(total/60)){const n=page++;const d=await source('/AllProducts/?sort=new&page='+n);for(const p of cards(d))products.set(p.path,p);}}
await Promise.all([list(),list(),list()]);
if(products.size!==total)throw Error('Incomplete catalogue '+products.size+'/'+total);
let saved={};if(process.argv.includes('--resume')){try{saved=JSON.parse(await readFile('.image-cache/manifest.json','utf8'));}catch{}}
const paths=[...products.keys()];let cursor=0,completed=0;const errors=[];let writes=Promise.resolve();
async function save(){const body=JSON.stringify(saved);writes=writes.then(()=>writeFile('.image-cache/manifest.json',body));await writes;}
async function collect(){while(cursor<paths.length){const path=paths[cursor++];if(!saved[path]){try{const d=await detail(path);saved[path]={path,sourceId:d.sourceId,images:d.images};}catch(e){errors.push({path,error:String(e)});}}completed++;if(completed%100===0){await save();console.log('Gallery products',completed,'/',total);}}}
await Promise.all(Array.from({length:6},collect));await save();
await writeFile('.image-cache/coverage.json',JSON.stringify({total,paths,errors,at:new Date().toISOString()}));
console.log('Gallery complete',Object.keys(saved).length,'images',Object.values(saved).reduce((n,p)=>n+p.images.length,0),'errors',errors.length);
// Optional style refresh uses only the public item referenced by the main catalogue.
if(process.argv.includes('--styles')){cursor=0;completed=0;let failures=0,halt=false;
async function collectStyles(){while(cursor<paths.length&&!halt){const path=paths[cursor++],p=saved[path];if(p&&!p.styles){try{p.styles=await styles(p.sourceId);delete p.styleError;failures=0;}catch(e){p.styleError=String(e);if(++failures>=3)halt=true;}}completed++;if(completed%100===0){await save();console.log('Style products',completed,'/',total);}}}
await Promise.all(Array.from({length:3},collectStyles));await save();console.log(halt?'Style collection paused after repeated source failures; resume after source recovery':'Styles complete');}
