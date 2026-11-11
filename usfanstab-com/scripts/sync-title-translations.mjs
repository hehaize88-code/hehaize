import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {source,cards} from '../src/lib/catalog.ts';
import {translateTitles} from '../src/lib/translate.ts';
const dest='src/content/title-translations.json';
await mkdir('.translation-cache',{recursive:true});
let checkpoint={};try{checkpoint=JSON.parse(await readFile('.translation-cache/titles.json','utf8'));}catch{}
const first=await source('/AllProducts/?sort=new&page=1');
const total=Number(first.querySelector('.results-summary').textContent.replace(/\D/g,''));
const pages=Math.ceil(total/60);const records=new Map(cards(first).map(p=>[p.path,p.title]));
let next=2;
async function readPages(){while(next<=pages){const page=next++;let doc;for(let n=0;n<4;n++){try{doc=await source('/AllProducts/?sort=new&page='+page);break;}catch(e){if(n===3)throw e;}}for(const p of cards(doc))records.set(p.path,p.title);if(page%10===0)console.log('Source pages',page,'/',pages);}}
await Promise.all([readPages(),readPages(),readPages()]);
if(records.size!==total)throw Error('Catalogue coverage mismatch: '+records.size+'/'+total);
const titles=[...new Set(records.values())];console.log('Verified products',total,'unique titles',titles.length);
let saves=Promise.resolve();
const langs=['de','fr','es','it','pt','pl','zh'];let nextLang=0;
async function worker(){while(nextLang<langs.length){const lang=langs[nextLang++];checkpoint[lang]??={};const missing=titles.filter(t=>!checkpoint[lang][t]);for(let i=0;i<missing.length;i+=40){const batch=missing.slice(i,i+40);let map;for(let retry=0;retry<4;retry++){try{map=await translateTitles(batch,lang,true);break;}catch(e){if(retry===3)throw e;}}for(const t of batch)checkpoint[lang][t]=map.get(t);const snapshot=JSON.stringify(checkpoint);saves=saves.then(()=>writeFile('.translation-cache/titles.json',snapshot));await saves;if(i%200===0)console.log(lang,Math.min(i+40,missing.length),'/',missing.length);}console.log(lang,'complete');}}
await Promise.all([worker(),worker(),worker()]);
const published={};for(const lang of langs){published[lang]={};for(const t of titles){if(!checkpoint[lang][t])throw Error('Missing title');published[lang][t]=checkpoint[lang][t];}}
await writeFile(dest,JSON.stringify(published));
await writeFile('docs/title-translation-coverage.json',JSON.stringify({reviewed:new Date().toISOString(),source:'https://cnbuycha.com/AllProducts/',products:total,uniqueTitles:titles.length,languages:langs,kind:'Localization strings only; no product records, prices, images or database'},null,2));
console.log('Published complete title translations',total,titles.length);
