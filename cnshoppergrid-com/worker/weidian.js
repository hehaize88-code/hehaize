// Read the public listing's real SKU attributes, never infer variants from gallery photos.
const variantCache = new Map();
function decodeListing(value) {
  return value.replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))).replace(/&quot;/g,'"').replace(/&amp;/g,'&');
}
function listingObject(text, key) {
  const marker='"'+key+'":', at=text.indexOf(marker);
  if(at<0) throw new Error('SKU data unavailable');
  let start=at+marker.length;
  while(/\s/.test(text[start]||'')) start++;
  let depth=0, quoted=false, escaped=false;
  for(let i=start;i<text.length;i++) {
    const c=text[i];
    if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}
    if(c==='"')quoted=true;
    else if(c==='{'||c==='[')depth++;
    else if(c==='}'||c===']'){depth--;if(depth===0)return JSON.parse(text.slice(start,i+1));}
  }
  throw new Error('Incomplete SKU data');
}
const safeStyleImage = value => {try{const u=new URL(value);return u.protocol==='https:'&&(/(^|\.)geilicdn\.com$/.test(u.hostname))?u.href:'';}catch{return '';}};
const parseWeidianStyles = html => {
  const data=listingObject(decodeListing(html),'sku_properties');
  const groups=Array.isArray(data.attr_list)?data.attr_list:[];
  const pictured=groups.find(g=>g.attr_values?.some(v=>safeStyleImage(v.img)));
  let styles=[];
  if(pictured) styles=pictured.attr_values.map(v=>({name:String(v.attr_value||''),image:safeStyleImage(v.img),attributeId:String(v.attr_id||'')}));
  else {
    const seen=new Set();
    for(const v of Object.values(data.sku||{})) {
      const image=safeStyleImage(v.img);if(!image||seen.has(image))continue;seen.add(image);
      styles.push({name:String(v.title||''),image,attributeId:String(v.attr_ids||'')});
    }
    if(!styles.length&&groups.length)styles=(groups[0].attr_values||[]).map(v=>({name:String(v.attr_value||''),image:'',attributeId:String(v.attr_id||'')}));
  }
  return {status:'ok',styles:styles.filter(s=>s.name),skuCount:Number(data.skuCount||0)};
};
const loadWeidianStyles = async id => {
  if(!/^\d{5,20}$/.test(String(id)))return {status:'unavailable',styles:[]};
  const hit=variantCache.get(id);if(hit&&hit.until>Date.now())return hit.value;
  try {
    const res=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(12000),cf:{cacheTtl:600,cacheEverything:true}});
    if(!res.ok)throw new Error('Listing unavailable');
    const value=parseWeidianStyles(await res.text());
    if(variantCache.size>=100)variantCache.delete(variantCache.keys().next().value);
    variantCache.set(id,{until:Date.now()+600000,value});return value;
  } catch {return {status:'unavailable',styles:[]};}
};
export {parseWeidianStyles,loadWeidianStyles};
