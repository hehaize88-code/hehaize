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
function pdClient(){
  const root=document.querySelector('[data-product-view]'),model=JSON.parse(root.querySelector('.pd-model').textContent);
  const main=root.querySelector('.pd-main'),copy=root.querySelector('[data-copy-item]'),status=root.querySelector('.pd-status'),fields=[...root.querySelectorAll('[data-option-field]')],selected=new Map();
  let target=copy?.dataset.copyItem;
  const pickPhoto=image=>{
    if(!image||!main)return;
    main.href=image;main.querySelector('img').src=image;
    const pos=model.gallery.indexOf(image),count=main.querySelector('output');
    count.hidden=pos<0;
    if(pos>=0)count.textContent=(pos+1)+' / '+model.gallery.length;
    for(const b of root.querySelectorAll('[data-gallery-photo]'))b.setAttribute('aria-pressed',String(b.dataset.galleryPhoto===image));
  };
  function refresh(){
    const chosen=[...selected.values()];
    const matches=chosen.length===fields.length?model.skus.filter(s=>s.attrs.length===chosen.length&&chosen.every(a=>s.attrs.includes(a))):[];
    const exact=matches.length===1?matches[0]:null;
    for(const [i,field] of fields.entries()){
      const preceding=fields.slice(0,i).map(f=>selected.get(f)).filter(Boolean);
      for(const button of field.querySelectorAll('[data-option]')){
        const active=selected.get(field)===button.dataset.option;
        button.setAttribute('aria-pressed',String(active));
        button.disabled=model.skus.length>0&&!model.skus.some(s=>s.attrs.includes(button.dataset.option)&&preceding.every(v=>s.attrs.includes(v)));
        if(active)field.querySelector('.pd-selected').textContent=button.title;
      }
      if(!selected.has(field))field.querySelector('.pd-selected').textContent='';
    }
    if(copy){
      target=exact?.url||(chosen.length?'':copy.dataset.copyItem);
      copy.disabled=!target;
      copy.textContent=chosen.length?copy.dataset.styleText:copy.dataset.itemText;
    }
    status.textContent=chosen.length&&!exact?model.hint:'';
    if(exact?.image)pickPhoto(exact.image);
    const u=new URL(location.href);
    if(chosen.length)u.searchParams.set('options',chosen.join(','));else u.searchParams.delete('options');
    history.replaceState(null,'',u);
    for(const opt of document.querySelector('header select[onchange]')?.options||[]){
      if(!opt.value.startsWith('/')&&!opt.value.startsWith('https://'))continue;
      const dest=new URL(opt.value,location.origin);
      if(chosen.length)dest.searchParams.set('options',chosen.join(','));else dest.searchParams.delete('options');
      opt.value=dest.href;
    }
  }
  const saved=(new URLSearchParams(location.search).get('options')||'').split(',').filter(Boolean);
  const matchingSku=model.photo?model.skus.filter(s=>s.image===model.photo):[];
  for(const field of fields){
    const choices=[...field.querySelectorAll('[data-option]')];
    const matched=choices.filter(b=>b.dataset.picture&&b.dataset.picture===model.photo);
    const restored=choices.find(b=>saved.includes(b.dataset.option))||(matchingSku.length===1?choices.find(b=>matchingSku[0].attrs.includes(b.dataset.option)):null);
    const chosen=restored||(matched.length===1?matched[0]:null)||(choices.length===1?choices[0]:null);
    if(chosen)selected.set(field,chosen.dataset.option);
  }
  if(fields.length)refresh();
  root.addEventListener('click',async ev=>{
    const b=ev.target.closest('button');
    if(!b)return;
    if(b.dataset.galleryPhoto){pickPhoto(b.dataset.galleryPhoto);return}
    if(b.dataset.photo){
      pickPhoto(b.dataset.photo);
      for(const tile of root.querySelectorAll('[data-photo]'))tile.setAttribute('aria-pressed',String(tile===b));
      if(copy){target=b.dataset.styleUrl;copy.disabled=!target;copy.textContent=copy.dataset.styleText;status.textContent=target?'':model.hint}
    }
    if(b.dataset.option){
      const field=b.closest('[data-option-field]');selected.set(field,b.dataset.option);
      for(const later of fields.slice(fields.indexOf(field)+1)){
        const ids=fields.slice(0,fields.indexOf(later)+1).map(f=>selected.get(f)).filter(Boolean);
        if(!model.skus.some(s=>ids.every(v=>s.attrs.includes(v))))selected.delete(later);
      }
      if(b.dataset.picture)pickPhoto(b.dataset.picture);
      refresh();
    }
    if(b===copy&&target){
      try{await navigator.clipboard.writeText(target);status.textContent=copy.dataset.success}
      catch{const input=document.createElement('input');input.readOnly=true;input.value=target;status.replaceChildren(document.createTextNode(copy.dataset.manual+' '),input);input.select()}
    }
  });
  for(const panel of root.querySelectorAll('.pd-choices')){
    let drag;
    panel.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0&&panel.scrollHeight>panel.clientHeight)drag={y:e.clientY,top:panel.scrollTop,id:e.pointerId}});
    panel.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId||!(e.buttons&1)){drag=null;return}const dy=e.clientY-drag.y;if(Math.abs(dy)>5){panel.setPointerCapture(e.pointerId);panel.scrollTop=drag.top-dy;drag.moved=true;e.preventDefault()}});
    panel.addEventListener('pointerup',()=>{if(drag?.moved)panel.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()},{capture:true,once:true});drag=null});
    panel.addEventListener('pointercancel',()=>{drag=null});
  }
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
  const buy=agents.find(a=>a.domain==='cssbuy')?.url||(original?'https://www.cssbuy.com/item-micro-'+d.id+'.html':'');
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
  const otherAgents=agents.filter(a=>a.domain!=='cssbuy');
  const links=otherAgents.length?'<details class="pd-agent"><summary>'+e(t.agents)+'</summary><div class="pd-agent-list">'+otherAgents.map(a=>'<a href="'+e(a.url)+'" target="_blank" rel="nofollow noopener noreferrer">'+e(a.name)+'</a>').join('')+'</div></details>':'';
  const copy=original?'<button class="pd-copy" type="button" data-copy-item="'+e(original.href)+'" data-item-text="'+e(t.copy)+'" data-style-text="'+e(t.copyStyle)+'" data-success="'+e(t.copied)+'" data-manual="'+e(t.manual)+'">'+e(t.copy)+'</button>':'';
  const photoGrid=(caption,urls,empty)=>'<section class="pd-media"><h2>'+e(caption)+' <small>'+urls.length+'</small></h2>'+(urls.length?'<div class="pd-photos">'+urls.map((src,i)=>'<a href="'+e(src)+'" target="_blank" rel="noopener">'+image(src,caption+' '+(i+1))+'</a>').join('')+'</div>':'<p>'+e(empty)+'</p>')+'</section>';
  const model=JSON.stringify({gallery:assets.gallery,skus:assets.skus,hint:t.selectAll,photo:matched}).replace(/</g,'\\u003c');
  return '<article class="pd" data-product-view><a class="pd-back" href="'+e(backUrl)+'">‹ '+e(t.back)+'</a><div class="pd-columns"><figure><figcaption>'+e(t.photos)+' <small>'+assets.gallery.length+'</small></figcaption>'+hero+film+'</figure><section class="pd-purchase"><h1>'+e(title)+'</h1><div class="pd-id">'+e(t.id)+' <b>'+e(d.id)+'</b></div><div class="pd-price">'+priceHtml+'</div>'+(buy?'<a class="action pd-buy" href="'+e(buy)+'" target="_blank" rel="noopener nofollow">'+e(t.buy)+'</a>':'')+'<div class="pd-actions">'+links+copy+'</div><div class="pd-status" role="status"></div><section class="pd-options"><h2>'+e(t.styles)+'</h2>'+variants+'</section></section></div>'+photoGrid(t.qc,assets.qc,t.noQc)+(assets.details.length?photoGrid(t.detailPhotos,assets.details,''):'')+'<script class="pd-model" type="application/json">'+model+'</script><script>('+pdClient.toString()+')()</script></article>';
}
