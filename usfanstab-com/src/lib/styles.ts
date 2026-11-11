import {parseHTML} from 'linkedom/worker';
export type StylePhoto={id:string;name:string;image:string};
export function parseStyles(html:string,id:string):StylePhoto[]{
  const {document}=parseHTML(html);
  const raw=document.querySelector('#__rocker-render-inject__')?.getAttribute('data-obj');
  if(!raw)throw Error('Style source unavailable');
  const data=JSON.parse(raw),model=data.result?.default_model;
  if(data.status?.code!==0||String(model?.item_info?.item_id)!==id)throw Error('Style product mismatch');
  const photos:StylePhoto[]=[];
  for(const group of model.sku_properties?.attr_list||[])for(const attr of group.attr_values||[]){
    if(!attr.img)continue;
    const u=new URL(attr.img);
    if(u.protocol!=='https:'||u.hostname!=='si.geilicdn.com'||u.username||u.password||u.port)continue;
    photos.push({id:String(attr.attr_id),name:String(attr.attr_value).slice(0,160),image:u.href});
  }
  return photos;
}
const cache=new Map<string,{at:number;photos:StylePhoto[]}>();
let retryAfter=0;
export async function styles(id:string):Promise<StylePhoto[]>{
  if(!/^\d{6,20}$/.test(id))return [];
  const hit=cache.get(id);if(hit&&Date.now()-hit.at<300000)return hit.photos;
  if(Date.now()<retryAfter)throw Error('Style source temporarily unavailable');
  let r;try{r=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(8000),headers:{Accept:'text/html'}});}catch(e){retryAfter=Date.now()+60000;throw e;}
  if(!r.ok){if(r.status===429||r.status>=500)retryAfter=Date.now()+Math.max(60,Number(r.headers.get('retry-after'))||60)*1000;throw Error('Style source HTTP '+r.status);}
  const html=await r.text();if(html.length>4000000)throw Error('Style source too large');
  const photos=parseStyles(html,id);
  if(cache.size>=100)cache.delete(cache.keys().next().value!);
  cache.set(id,{at:Date.now(),photos});return photos;
}
