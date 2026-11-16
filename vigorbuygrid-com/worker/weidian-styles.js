// Public listing data only. No merchant credentials, database, or fabricated styles.
export function parseWeidianStyles(html, itemId) {
 const tag=html.match(/<script\b[^>]*\bid="__rocker-render-inject__"[^>]*>/)?.[0];
 const raw=tag?.match(/\bdata-obj="([^"]*)"/)?.[1];
 if(!raw)throw Error('Listing data unavailable');
 const decoded=raw.replace(/&(?:#(\d+)|#x([0-9a-f]+)|quot|amp|lt|gt|apos);/gi,(entity,n,h)=>n?String.fromCodePoint(Number(n)):h?String.fromCodePoint(parseInt(h,16)):({'&quot;':'"','&amp;':'&','&lt;':'<','&gt;':'>','&apos;':"'"}[entity.toLowerCase()]||entity));
 const model=JSON.parse(decoded)?.result?.default_model;
 if(String(model?.item_info?.item_id)!==String(itemId))throw Error('Listing identity mismatch');
 const properties=model.sku_properties;
 if(!properties)return [];
 const styles=[];
 for(const group of properties.attr_list||[]){
  for(const value of group.attr_values||[]){
   if(!value.img)continue;
   let image;try{image=new URL(value.img.startsWith('//')?'https:'+value.img:value.img);if(image.protocol!=='https:'||!/(^|\.)geilicdn\.com$/.test(image.hostname))continue}catch{continue}
   const key=String(value.attr_id);
   if(styles.some(s=>s.id===key))continue;
   styles.push({id:key,name:String(value.attr_value||key).slice(0,180),image:image.href});
  }
 }
 // A listing can supply images on individual SKUs without an image-bearing attribute.
 if(!styles.length){const seen=new Set();for(const sku of Object.values(properties.sku||{})){
  if(!sku.img||seen.has(sku.img))continue;
  let image;try{image=new URL(sku.img);if(image.protocol!=='https:'||!/(^|\.)geilicdn\.com$/.test(image.hostname))continue}catch{continue}
  seen.add(sku.img);styles.push({id:String(sku.id),name:String(sku.title||sku.id).slice(0,180),image:image.href});
 }}
 return styles.slice(0,1000);
}
const styleCache=new Map();
export async function loadWeidianStyles(id){
 if(!/^\d{6,16}$/.test(String(id)))return {styles:[],status:'unavailable'};
 const cached=styleCache.get(id);if(cached&&cached.expires>Date.now())return cached.data;
 try{
  const response=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(20000),cf:{cacheTtl:900,cacheEverything:true}});
  if(!response.ok)throw Error('Listing request failed');
  const styles=parseWeidianStyles(await response.text(),id),data={styles,status:'ok'};
  if(styleCache.size>500)styleCache.delete(styleCache.keys().next().value);
  styleCache.set(id,{data,expires:Date.now()+900000});return data;
 }catch{return {styles:[],status:'unavailable'}}
}
