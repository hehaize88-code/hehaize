import type {APIRoute} from 'astro';
import {imageNames} from '../../../lib/visual/manifest.mjs';
import {languages as supported} from '../../../lib/commerce/locale.mjs';
import {translateProductNames} from '../../../lib/product-names';
export const GET: APIRoute = async ({url,locals}) => {
  const locale=url.searchParams.get('lang') || 'en';
  if(!Object.hasOwn(supported,locale)) return new Response(null,{status:400});
  const paths=[...new Set(url.searchParams.getAll('p'))].slice(0,24).filter(path=>Object.hasOwn(imageNames,path));
  const names=await translateProductNames(locale,paths.map(path=>imageNames[path]),locals.assets);
  return Response.json(Object.fromEntries(paths.map((path,i)=>[path,names[i]])), {headers:{'Cache-Control':'public, max-age=300'}});
};
