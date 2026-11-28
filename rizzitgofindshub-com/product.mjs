import pdClientSource from './pdClient.txt';
import {brand} from './settings.mjs';
import {dict} from './locales.mjs';

const pdText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pdDecode = value => value.replace(/&(amp|lt|gt|quot|apos|#x[\da-f]+|#\d+);/gi,(entity,key)=>{
  if(key[0]!=='#')return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[key.toLowerCase()];
  const n=key[1].toLowerCase()==='x'?parseInt(key.slice(2),16):Number(key.slice(1));
  return n>0&&n<=0x10ffff?String.fromCodePoint(n):entity;
});
function pdAttrs(tag){
  return Object.fromEntries(Array.from(tag.matchAll(/\s([\w:-]+)\s*=\s*["']([^"']*)["']/g),m=>[m[1].toLowerCase(),pdDecode(m[2])]));
}
function pdURL(value,base){
  try{const u=new URL(value,base);return value&&u.protocol==='https:'&&!u.password&&!u.username?u:null}catch{return null}
}
function pdOriginal(value,id){
  const u=pdURL(value);
  return u&&/^(?:www\.)?weidian\.com$/.test(u.hostname)&&u.pathname==='/item.html'&&u.searchParams.get('itemID')===String(id)?u:null;
}
function pdHostImage(value,source){
  const u=pdURL(value,source?'https://cnbuycha.com/':'https://weidian.com/');
  return u&&(source?/^(?:www\.)?cnbuycha\.com$/:/(?:^|\.)geilicdn\.com$/).test(u.hostname)?u.href:'';
}
function pdSkuURL(original,id,sku,label){
  if(!original||!/^\d+$/.test(sku))return '';
  const u=new URL(original);
  u.hash='sku_'+id+'_'+encodeURIComponent(label).replace(/_/g,'%5F')+'_'+sku;
  return u.href;
}
function pdSourceAssets(d){
  const gallery=new Set((d.images||[]).map(url=>pdHostImage(url,true)).filter(Boolean)),details=new Set(),qc=new Set(),styles=[],stack=[];
  const html=(d.html||'').split(/class=["']product-detail["']/i).pop().split(/class=["'](?:product-list|related-products)\b/i)[0].replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  for(const [tag,closing,type] of html.matchAll(/<(\/?)([a-z][\w-]*)\b[^>]*>/gi)){
    if(closing){const i=stack.findLastIndex(node=>node.type===type);if(i>=0)stack.length=i;continue}
    const a=pdAttrs(tag),p=stack.at(-1)||{},marker=[a.class,a.id,a['data-role'],a['data-image-type']].filter(Boolean).join(' ');
    let kind=p.kind;
    if(/\b(?:qc(?:[-_ ]?(?:photos?|images?|gallery))?|quality[-_ ]?control)\b|质检图/i.test(marker))kind='qc';
    else if(/\b(?:styles?|variants?|sku[-_](?:list|items?|gallery)|style[-_](?:items?|gallery))\b/i.test(marker)||a['data-sku-id']||a['data-style-url'])kind='style';
    else if(/\b(?:product-description|product-content|detail-images|product-details-content)\b/i.test(marker))kind='detail';
    else if(/\bproduct-gallery\b/i.test(marker))kind='gallery';
    const url=pdOriginal(a['data-style-url']||a['data-weidian-url']||a.href,d.id)||p.url;
    const sku=a['data-sku-id']||p.sku||'',label=a['data-style-name']||a['data-option-name']||p.label||a.alt||'';
    if(type==='img'){
      const image=pdHostImage(a['data-original']||a['data-src']||a.src,true);
      if(image&&kind==='style'){
        const link=url&&(/#sku_[^#]+_\d+$/.test(url.hash)||/^\d+$/.test(url.searchParams.get('skuId')||url.searchParams.get('sku_id')||''))?url.href:pdSkuURL(pdOriginal(d.buy,d.id),d.id,sku,label);
        if(!styles.some(v=>v.image===image&&v.link===link))styles.push({image,name:label,link});
      }else if(image&&kind)({qc,detail:details,gallery})[kind].add(image);
    }
    if(!/^(?:img|br|input|meta|link|hr|source|wbr|area|base|embed|param|track)$/i.test(type)&&!tag.endsWith('/>'))stack.push({type,kind,url,sku,label});
  }
  for(const image of qc){details.delete(image);gallery.delete(image)}
  for(const image of gallery)details.add(image);
  return {gallery:[...gallery],details:[...details],qc:[...qc],styles};
}
function pdSellerModel(model,id,original){
  if(String(model?.item_info?.item_id)!==String(id))return null;
  const source=model.sku_properties||{};
  const groups=(source.attr_list||[]).map(g=>({name:String(g.attr_title||''),values:(g.attr_values||[]).filter(v=>v.attr_id!=null).map(v=>({id:String(v.attr_id),name:String(v.attr_value??v.attr_id),image:pdHostImage(v.img?.url||v.img,false)}))})).filter(g=>g.values.length);
  const skus=Object.entries(source.sku||{}).flatMap(([key,s])=>{
    const skuId=String(s.id??key),attrs=String(s.attr_ids||'').split('-').filter(Boolean),url=pdSkuURL(original,id,skuId,String(s.title||''));
    return url&&attrs.length?[{id:skuId,attrs,image:pdHostImage(s.img?.url||s.img,false),url}]:[];
  });
  const images=new Map();
  for(const sku of skus)if(sku.image)for(const attr of sku.attrs){
    if(!images.has(attr))images.set(attr,new Set());
    images.get(attr).add(sku.image);
  }
  for(const group of groups)for(const v of group.values)if(!v.image&&images.get(v.id)?.size===1)v.image=[...images.get(v.id)][0];
  return {groups,skus};
}
async function pdFetchSeller(original,id){
  const api=new URL('https://thor.weidian.com/detail/getItemInfo/1.0');
  api.searchParams.set('param',JSON.stringify({vitemId:id,lang:'en',from:'h5'}));
  for(const route of [api.href,original.href]){
    try{
      const res=await fetch(route,{cf:{cacheEverything:true,cacheTtlByStatus:{'200-299':600,'400-599':0}},signal:AbortSignal.timeout(5000)});
      if(!res.ok)continue;
      let data;
      if(route===api.href)data=await res.json();
      else{
        const tag=(await res.text()).match(/<script\b[^>]*\bid=["']__rocker-render-inject__["'][^>]*>/i)?.[0]||'';
        const raw=tag.match(/\bdata-obj="([^"]+)"/i)?.[1];
        if(!raw)continue;
        data=JSON.parse(pdDecode(raw));
      }
      const seller=pdSellerModel(data.result?.default_model,id,original);
      if(seller)return seller;
    }catch{}
  }
  // The companion CSSBuy site relays the same public Weidian page. Accept
  // its cached response only when both source identifiers agree.
  try{
    const response=await fetch('https://cssbuychina.net/api/product-options?id='+encodeURIComponent(id),{signal:AbortSignal.timeout(3500),cf:{cacheTtlByStatus:{'200-299':300,'400-599':0},cacheEverything:true}});
    if(response.ok){
      const snapshot=await response.json();
      if(String(snapshot.sourceId)===id&&pdOriginal(snapshot.sourceUrl,id)){
        const model={item_info:{item_id:id},sku_properties:{
          attr_list:(snapshot.groups||[]).map(g=>({attr_title:g.name,attr_values:g.values.map(v=>({attr_id:v.id,attr_value:v.label,img:v.image}))})),
          sku:Object.fromEntries((snapshot.variants||[]).map(s=>[s.id,{id:s.id,attr_ids:s.attrs.join('-')}]))
        }};
        const result=pdSellerModel(model,id,original);
        if(result)return result;
      }
    }
  }catch{}
  return {groups:[],skus:[]};
}
export async function readProductAssets(d,allowSeller=false){
  const assets=pdSourceAssets(d),original=pdOriginal(d.buy,d.id);
  const seller=allowSeller&&original?await pdFetchSeller(original,String(d.id)):{groups:[],skus:[]};
  return {...assets,...seller};
}

function pdAgentLinks(d){
  const idPattern=new RegExp('(^|\\D)'+String(d.id).replace(/\D/g,'')+'(\\D|$)');
  const names={'cssbuy':'CSSBuy','superbuy':'Superbuy','allchinabuy':'AllChinaBuy','acbuy':'ACBuy','ootdbuy':'OOTDBuy','bbdbuy':'BBDBuy','hubbuycn':'HubBuyCN','cnfans':'CNFans','usfans':'USFans','kakobuy':'Kakobuy','eastmallbuy':'EastMallBuy','panglobalbuy':'PanGlobalBuy','basetao':'Basetao','hipobuy':'Hipobuy','oopbuy':'Oopbuy','hoobuy':'Hoobuy','joyagoo':'Joyagoo','mulebuy':'Mulebuy','sugargoo':'Sugargoo','lovegobuy':'Lovegobuy','orientdig':'Orientdig'};
  const choices=[];
  for(const value of Object.values(d.agents||{})){
    const u=pdURL(value);
    if(!u)continue;
    let decoded;
    try{decoded=decodeURIComponent(u.href)}catch{continue}
    if(!idPattern.test(decoded))continue;
    const domain=u.hostname.replace(/^(?:www|m)\./,'').split('.')[0];
    choices.push({name:names[domain]||domain,domain,url:u.href});
  }
  return choices;
}
export async function renderProductDetail({detail:d,lang,title,backUrl,priceHtml,allowSeller=false,translateTerms,match=''}){
  const t=dict[lang]||dict.en,e=pdText,assets=await readProductAssets(d,allowSeller),original=pdOriginal(d.buy,d.id);
  const agents=pdAgentLinks(d);
  const buy=agents.find(a=>a.domain===brand.domain)?.url||(original?'https://www.rizzitgo.com/detailPage?goodsId='+encodeURIComponent(d.id)+'&source=3':'');
  const groups=assets.groups.sort((a,b)=>Number(b.values.some(v=>v.image))-Number(a.values.some(v=>v.image)));
  const terms=[...new Set([...assets.styles.map(v=>v.name),...groups.flatMap(g=>[g.name,...g.values.map(v=>v.name)])].filter(Boolean))];
  const translated=translateTerms&&terms.length?await translateTerms(terms):terms;
  const names=new Map(terms.map((v,i)=>[v,translated?.[i]||v]));
  const label=x=>names.get(x)||x;
  const photos=[...assets.gallery,...assets.qc,...assets.details,...assets.styles.map(v=>v.image),...groups.flatMap(g=>g.values.map(v=>v.image)),...assets.skus.map(s=>s.image)];
  const matched=photos.includes(match)?match:'',first=matched||photos.find(Boolean)||'',pos=assets.gallery.indexOf(first);
  const image=(src,alt,lazy=true)=>'<img src="'+e(src)+'" alt="'+e(alt)+'" decoding="async"'+(lazy?' loading="lazy"':'')+'>';
  const hero=first?'<a class="pd-main" href="'+e(first)+'" target="_blank" rel="noopener">'+image(first,title,false)+'<output'+(pos<0?' hidden':'')+'>'+(pos+1)+' / '+assets.gallery.length+'</output></a>':'';
  const film=assets.gallery.length>1?'<div class="pd-film">'+assets.gallery.map((url,i)=>'<button class="pd-thumb" data-gallery-photo="'+e(url)+'" aria-label="'+e(t.photos)+' '+(i+1)+'" aria-pressed="'+(url===first)+'">'+image(url,'')+'</button>').join('')+'</div>':'';
  const pictureButton=(v)=>{
    const name=label(v.name)||t.option+' '+v.id;
    return '<button type="button" class="'+(v.image?'pd-style-tile':'pd-option')+'" data-option="'+e(v.id)+'" data-picture="'+e(v.image)+'" title="'+e(name)+'" aria-label="'+e(name)+'" aria-pressed="false">'+(v.image?image(v.image,name):e(name))+'</button>';
  };
  const fields=groups.map(g=>'<fieldset class="pd-field" data-option-field><legend>'+e(label(g.name)||t.option)+' <span class="pd-selected"></span></legend><div class="pd-choices" tabindex="0">'+g.values.map(pictureButton).join('')+'</div></fieldset>').join('');
  const styleGrid=assets.styles.length?'<div class="pd-choices" tabindex="0">'+assets.styles.map((v,i)=>{
    const name=label(v.name)||t.style+' '+(i+1);
    return '<button type="button" class="pd-style-tile" data-photo="'+e(v.image)+'" data-style-url="'+e(v.link)+'" title="'+e(name)+'" aria-label="'+e(name)+'" aria-pressed="'+(v.image===first)+'">'+image(v.image,name)+'</button>';
  }).join('')+'</div>':'';
  const variants=fields||styleGrid||'<p>'+e(t.noStyles)+(original?' <a href="'+e(original.href)+'" target="_blank" rel="noopener">'+e(t.open)+'</a>':'')+'</p>';
  const otherAgents=agents.filter(a=>a.domain!==brand.domain);
  const links=otherAgents.length?'<details class="pd-agent"><summary>'+e(t.agents)+'</summary><div class="pd-agent-list">'+otherAgents.map(a=>'<a href="'+e(a.url)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(a.name)+'</a>').join('')+'</div></details>':'';
  const copy=original?'<button class="pd-copy" type="button" data-copy-item="'+e(original.href)+'" data-item-text="'+e(t.copy)+'" data-style-text="'+e(t.copyStyle)+'" data-success="'+e(t.copied)+'" data-manual="'+e(t.manual)+'">'+e(t.copy)+'</button>':'';
  const photoGrid=(caption,urls,empty)=>'<section class="pd-media"><h2>'+e(caption)+' <small>'+urls.length+'</small></h2>'+(urls.length?'<div class="pd-photos">'+urls.map((src,i)=>'<a href="'+e(src)+'" target="_blank" rel="noopener">'+image(src,caption+' '+(i+1))+'</a>').join('')+'</div>':'<p>'+e(empty)+'</p>')+'</section>';
  const model=JSON.stringify({gallery:assets.gallery,skus:assets.skus,hint:t.selectAll,photo:matched}).replace(/</g,'\\u003c');
  return '<article class="pd" data-product-view><a class="pd-back" href="'+e(backUrl)+'">‹ '+e(t.back)+'</a><div class="pd-columns"><figure><figcaption>'+e(t.photos)+' <small>'+assets.gallery.length+'</small></figcaption>'+hero+film+'</figure><section class="pd-purchase"><h1>'+e(title)+'</h1><div class="pd-id">'+e(t.id)+' <b>'+e(d.id)+'</b></div><div class="pd-price">'+priceHtml+'</div>'+(buy?'<a class="action pd-buy" href="'+e(buy)+'" target="_blank" rel="noopener nofollow">'+e(brand.domain?t.buy:t.open)+'</a>':'')+'<div class="pd-actions">'+links+copy+'</div><div class="pd-status" role="status"></div><section class="pd-options"><h2>'+e(t.styles)+'</h2>'+variants+'</section></section></div>'+photoGrid(t.qc,assets.qc,t.noQc)+(assets.details.length?photoGrid(t.detailPhotos,assets.details,''):'')+'<script class="pd-model" type="application/json">'+model+'</script><script>('+pdClientSource+')()</script></article>';
}
