import editorial from '../content/editorial.json';
import products from '../content/product-paths.json';
import {slugs} from './catalog';
export const locales=['en','de','fr','es','it','pt','pl','zh'];
export const origin='https://usfanstab.com';
export const xml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export function paths(){return ['/',...['spreadsheet','categories','image-search','guides','faq','shipping','qc','articles'].map(s=>'/'+s+'/'),...editorial.en.articles.map(a=>'/articles/'+a.slug+'/'),...slugs.map(s=>'/spreadsheet/?category='+s),...products.map(p=>'/product'+p)];}
export const response=s=>new Response(s,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public,max-age=3600'}});
