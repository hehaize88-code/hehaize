import { productTitle } from './product-title';
import productUI from '../content/product-ui.json';
const cache=new Map<string,Record<string,string>>();
export async function dictionary(lang:string,assets?:any){
 if(cache.has(lang))return cache.get(lang)!;
 if(!assets)return {};
 const response=await assets.fetch(new Request(`https://sugargootab.com/assets/locales/${lang}.json`));
 if(!response.ok)throw new Error('Locale unavailable');
 const data=await response.json();
 if(cache.size>=3)cache.delete(cache.keys().next().value!);
 cache.set(lang,data);return data as Record<string,string>;
}
// Use reviewed clothing/product terms, never the legacy sentence translations
// which confused products (for example German Hoodie -> Kopf).
export function localizedProduct(raw:string,lang:string,_dictionary:Record<string,string>={}){
 return productTitle(raw,lang);
}
export function ui(lang:string){return (productUI as any)[lang]||productUI.en;}
