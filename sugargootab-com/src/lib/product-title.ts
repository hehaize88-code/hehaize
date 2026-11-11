import glossaries from '../content/product-glossary.json';
import { translateProductTitle } from '../../public/assets/product-title.mjs';
export const productTitle=(raw:string,lang:string)=>translateProductTitle(raw,lang,glossaries);
