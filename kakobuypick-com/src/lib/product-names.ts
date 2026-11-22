import {title as glossaryTitle} from './commerce/locale.mjs';
import {translateNewPublicLabels} from './live-product-translation';
import revision from './commerce/catalog-titles-revision.json';
type Dictionary = Record<string,string>;
type AssetBinding = {fetch(request:Request):Promise<Response>};
const dictionaries = new Map<string, Promise<Dictionary>>();
const supported = new Set('en de fr es it nl pt pl ro sv zh da fi el cs hu bg sk hr ja ko vi th id'.split(' '));
const normalize = (name:string) => String(name || '').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim();

async function publishedNames(locale: string, assets?:AssetBinding): Promise<Dictionary> {
  if (!assets || !supported.has(locale)) return {};
  const hit=dictionaries.get(locale);
  if(hit)return hit.catch(()=>({}));
  const promise=(async ()=>{
    const url = 'https://kakobuypick.com/catalog-titles/'+revision+'/'+locale+'.json.gz';
    const response=await assets.fetch(new Request(url));
    if(!response.ok || !response.body)throw Error('Title asset unavailable');
    const stream=response.body.pipeThrough(new DecompressionStream('gzip'));
    return await new Response(stream).json() as Dictionary;
  })();
  if(dictionaries.size>=4)dictionaries.delete(dictionaries.keys().next().value!);
  dictionaries.set(locale,promise);
  try{return await promise;}catch{
    if(dictionaries.get(locale)===promise)dictionaries.delete(locale);
    return {};
  }
}

export async function translateProductNames(locale:string,names:string[],assets?:AssetBinding):Promise<string[]> {
  if(!names.length)return [];
  const known=await publishedNames(locale,assets);
  const normalized=names.map(normalize);
  const missing=[...new Set(normalized.filter(name=>name && !Object.hasOwn(known,name)))];
  const fresh=missing.length && supported.has(locale) ? await translateNewPublicLabels(locale,missing) : [];
  const additions=new Map(missing.map((name,i)=>[name,fresh[i]]));
  return normalized.map(name=>Object.hasOwn(known,name)?known[name]:additions.get(name)||glossaryTitle(locale,name));
}
