import en from '../content/editorial/en.json';
const modules=import.meta.glob('../content/editorial/*.json',{eager:true,import:'default'});
export function contentFor(lang:string):typeof en {
 const content=modules[`../content/editorial/${lang}.json`];
 if(!content)throw new Error(`Missing content: ${lang}`);
 return content as typeof en;
}
