import {readFile,writeFile} from 'node:fs/promises';
import {translateTitles} from '../src/lib/translate.ts';
const file='src/content/title-translations.json';const data=JSON.parse(await readFile(file,'utf8'));
let repaired=0;
for(const [lang,items] of Object.entries(data)){
  const flagged=Object.entries(items).filter(([raw,t])=>/ZXQ|§|[\r\n]/i.test(t)||(raw===t&&raw.split(/\s+/).length>6));
  for(const [raw] of flagged){const result=await translateTitles([raw],lang,true,true);const t=result.get(raw);if(!t||/ZXQ|§/i.test(t))throw Error('Unresolved title token');items[raw]=t.replace(/\s+/g,' ').trim();repaired++;}
  console.log(lang,'reviewed',flagged.length,'flagged titles');
}
await writeFile(file,JSON.stringify(data));await writeFile('.translation-cache/titles.json',JSON.stringify(data));console.log('Repaired title formatting',repaired);
