import {detail} from '../../lib/catalog';
import {translateTitles,translationPending} from '../../lib/translate';
export async function POST({request}){
  if(Number(request.headers.get('content-length'))>5000)return new Response(null,{status:413});
  let body;try{const raw=await request.text();if(raw.length>5000)return new Response(null,{status:413});body=JSON.parse(raw);}catch{return new Response(null,{status:400});}
  if(!Array.isArray(body.paths)||body.paths.length>20||body.paths.some(p=>typeof p!=='string'||!/^\/[a-z-]+\/\d+\.html$/.test(p)))return new Response(null,{status:400});
  const lang=body.lang||'en',products=[],paths=[...new Set(body.paths)];let cursor=0;
  async function worker(){while(cursor<paths.length){const path=paths[cursor++];try{const p=await detail(path);products.push({path,title:p.title,price:p.price,image:p.images[0],category:p.category});}catch{/* Removed/unavailable source products are never synthesized. */}}}
  await Promise.all([worker(),worker(),worker(),worker()]);
  const titles=await translateTitles(products.map(p=>p.title),lang);
  return Response.json({products:products.map(p=>({...p,originalTitle:p.title,title:titles.get(p.title)||p.title,needsTranslation:translationPending(p.title,lang,titles.get(p.title)||p.title)})),unavailable:paths.length-products.length});
}
