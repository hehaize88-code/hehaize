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
const brands=/\b(?:True Religion|Ture Religion|Chrome Hearts|Stone Island|Palm Angels|Off[- ]White|The North Face|White Fox|New Balance|Black Diamond|Golden Goose|Canada Goose|Louis Vuitton|Air Force \d+|Air Jordan \d+|Ralph Lauren|Nike|Adidas|Dior|Burberry|Balenciaga|Chanel|Gucci|Moncler|Prada|Corteiz|Amiri|Fendi|Stussy|Lacoste|Supreme|Cartier|Rolex|Saint Laurent|Hermes|YSL|Versace|Patagonia|Margiela|Carhartt|Trapstar)\b/gi;
export function localizedProduct(raw:string,lang:string,d:Record<string,string>={}){
 const normalized=raw.replace(/\s+/g,' ').trim();
 const candidate=d[raw]||d[normalized];
 if(candidate&&[...normalized.matchAll(brands)].every(match=>candidate.toLowerCase().includes(match[0].toLowerCase())))return candidate;
 return productTitle(normalized,lang);
}
export function ui(lang:string){return (productUI as any)[lang]||productUI.en;}
