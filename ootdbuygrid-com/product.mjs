import {recentlyMissingPhoto} from './missing-photos.mjs';
import { labels, category, translateTitles } from './locale.mjs';

const productEscape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const productDecode = value => String(value ?? '').replace(/&(?:#(\d+)|#x([a-f\d]+)|(amp|lt|gt|quot|apos));/gi, (_,n,h,k) => {
  if (n || h) {
    const code = n ? Number(n) : parseInt(h,16);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '';
  }
  return ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"})[k.toLowerCase()];
});
const productAttrs = tag => Object.fromEntries([...tag.matchAll(/\s([\w:-]+)=["']([^"']*)["']/g)].map(m => [m[1], productDecode(m[2])]));
function sellerPhoto(value) {
  if (!value) return '';
  try {
    const raw=typeof value==='string'?value:value.url || value.img || value.src || value.image || value.img_url;
    const u=new URL(raw,'https://weidian.com');
    return u.protocol==='https:' && !recentlyMissingPhoto(u.href) && /(^|\.)geilicdn\.com$/.test(u.hostname) ? u.href : '';
  } catch {return ''}
}
export function sellerModel(html,id) {
  const tag=html.match(/<script\b[^>]*id="__rocker-render-inject__"[^>]*>/)?.[0] || '';
  return verifiedSeller(JSON.parse(productDecode(tag.match(/data-obj="([^"]*)"/)?.[1] || '{}')).result?.default_model,id);
}
function verifiedSeller(model,id) {
  if (String(model?.item_info?.item_id)!==String(id)) throw Error('Listing identity mismatch');
  const props=model.sku_properties || {};
  const skus=Object.values(props.sku || {}).map(s=>({id:String(s.id),attrs:String(s.attr_ids || '').split('-').filter(Boolean),price:Number(s.price)})).filter(s=>/^\d+$/.test(s.id) && s.attrs.length);
  const groups=(props.attr_list || []).map(g=>({name:String(g.attr_title || ''),values:(g.attr_values || []).map(v=>({id:String(v.attr_id),name:String(v.attr_value ?? v.attr_id),image:sellerPhoto(v.img)}))})).filter(g=>g.values.length);
  const supplied=model.item_info.imgs || [];
  const list=typeof supplied==='string'||sellerPhoto(supplied)?[supplied]:Object.values(supplied);
  const images=[...new Set(list.map(sellerPhoto).filter(Boolean))];
  return {skus,groups,images};
}
async function sourceSeller(id) {
  if (!/^\d{6,16}$/.test(id)) return null;
  const endpoint=new URL('https://thor.weidian.com/detail/getItemInfo/1.0');
  endpoint.searchParams.set('param',JSON.stringify({vitemId:String(id),from:'h5'}));
  try {
    const response=await fetch(endpoint.href,{signal:AbortSignal.timeout(7000),cf:{cacheEverything:true,cacheTtl:1800}});
    if(response.ok){
      const body=await response.json();
      if(body.status?.code===0)return verifiedSeller(body.result?.default_model,id);
    }
  }catch{}
  try {
    const response=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(6500),cf:{cacheEverything:true,cacheTtl:1800}});
    return response.ok?sellerModel(await response.text(),id):null;
  }catch{return null}
}
export function productAgents(html,id) {
  const agents=[];
  for (const m of html.matchAll(/<a\b([^>]*\bclass="platform-option"[^>]*)>([\s\S]*?)<\/a>/g)) {
    const name=productDecode(m[2].match(/<span>([^<]+)<\/span>/)?.[1]);
    try {
      const url=new URL(productAttrs(' '+m[1]).href);
      let decoded=url.href;
      for(let i=0;i<2;i++) decoded=decodeURIComponent(decoded);
      if (name && url.protocol==='https:' && decoded.match(new RegExp('(?:^|[^0-9])'+id+'(?:$|[^0-9])')) && !agents.some(a=>a.name===name)) agents.push({name,url:url.href});
    } catch {}
  }
  return agents;
}
function extraProductImages(html,source) {
  const area=html.split(/<section\b[^>]*class="product-list"/)[0];
  const results={qc:[],details:[]}, stack=[];
  for (const m of area.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*>/g)) {
    const [tag,closing,kind]=m;
    if (closing) {
      const last=stack.map(entry=>entry.kind).lastIndexOf(kind);
      if(last!==-1)stack.length=last;
      continue;
    }
    const attr=productAttrs(tag),marker=[attr.class,attr.id,attr['data-role']].join(' ');
    let group=stack.at(-1)?.group;
    if(/\b(?:qc[-_ ]?(?:photo|image|gallery)|quality[-_ ]control)/i.test(marker))group='qc';
    else if(/\b(?:product-description|detail-images|product-content)\b/i.test(marker))group='details';
    if(kind==='img'&&group) {
      try{
        const u=new URL(attr['data-src']||attr.src,'https://cnbuycha.com');
        if(u.origin==='https://cnbuycha.com'&&(u.pathname.startsWith('/media/') || u.pathname.startsWith('/uploads/'))&&!results[group].includes(u.href))results[group].push(u.href);
      }catch{}
    }
    if(!/^(?:img|br|input|meta|link|hr|source|wbr|area|base|embed|param|track)$/.test(kind)&&!tag.endsWith('/>'))stack.push({kind,group});
  }
  results.details=[...new Set([...source,...results.details])].filter(s=>!results.qc.includes(s));
  return results;
}
function productInteractions() {
  const box=document.querySelector('[data-pd]'), main=box.querySelector('.pd-primary'), photo=main.querySelector('img');
  const copy=box.querySelector('[data-copy]'),price=box.querySelector('[data-original-usd]'),message=box.querySelector('[data-status]');
  const groups=[...box.querySelectorAll('[data-group]')], skus=JSON.parse(box.querySelector('[data-skus]').textContent);
  const choices=new Map();
  function changePhoto(src,alt) {main.href=src;photo.src=src;photo.alt=alt;}
  for(const group of groups){
    group.addEventListener('click',e=>{
      const b=e.target.closest('[data-option]');if(!b)return;
      choices.set(group,b.dataset.option);
      for(const button of group.querySelectorAll('[data-option]'))button.setAttribute('aria-pressed',String(button===b));
      group.querySelector('output').textContent=b.getAttribute('aria-label');
      if(b.dataset.image)changePhoto(b.dataset.image,b.getAttribute('aria-label'));
      const exact=choices.size===groups.length && skus.find(s=>s.attrs.length===choices.size&&[...choices.values()].every(v=>s.attrs.includes(v)));
      const u=new URL(copy.dataset.original);
      if(exact)u.searchParams.set('skuId',exact.id);
      copy.dataset.url=exact?u.href:'';
      copy.disabled=!exact;
      copy.textContent=copy.dataset.style;
      message.textContent=exact?'':box.dataset.select;
      if(price){
        if(exact&&Number.isFinite(exact.price)&&exact.price>0){
          delete price.dataset.usd;price.dataset.cny=exact.price;price.textContent='CNY '+exact.price.toFixed(2);
        }else{delete price.dataset.cny;price.dataset.usd=price.dataset.originalUsd;price.textContent='US$ '+price.dataset.originalUsd;}
      }
    });
  }
  for(const b of box.querySelectorAll('[data-photo]'))b.addEventListener('click',()=>changePhoto(b.dataset.photo,b.querySelector('img').alt));
  const requested=new URL(location.href).searchParams.get('match');
  if(requested){
    function key(src) {
      try {
        const u=new URL(src,'https://cnbuycha.com');
        if(u.origin==='https://cnbuycha.com'&&(u.pathname.startsWith('/media/') || u.pathname.startsWith('/uploads/')))u.searchParams.delete('v');
        return u.href;
      } catch {return ''}
    }
    const match=key(requested);
    const same=src=>src && key(src)===match;
    const styleButtons=[...box.querySelectorAll('[data-kind="style"] [data-image]')].filter(b=>same(b.dataset.image));
    if(styleButtons.length===1){
      const b=styleButtons[0];b.click();
      const panel=b.closest('.pd-options');
      const delta=b.getBoundingClientRect().top-panel.getBoundingClientRect().top;
      panel.scrollTop+=delta-Math.max(0,(panel.clientHeight-b.offsetHeight)/2);
    }else{
      const found=[...box.querySelectorAll('img')].find(image=>same(image.getAttribute('src')));
      if(found)changePhoto(found.src,found.alt);
    }
  }
  copy?.addEventListener('click',async()=>{
    const value=copy.dataset.url;if(!value)return;
    try{await navigator.clipboard.writeText(value);message.textContent=copy.dataset.copied;}
    catch {
      const input=document.createElement('input');input.readOnly=true;input.value=value;message.replaceChildren(input);input.select();
      if(document.execCommand('copy'))message.textContent=copy.dataset.copied;
    }
  });
}
const pdCss=`.pd-wrap{max-width:1120px;margin:auto}.pd-crumb{display:block;padding:20px 0;font-size:.9rem}.pd-grid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(20px,4vw,56px)}.pd-info h1{font-size:clamp(1.65rem,3.4vw,2.7rem);line-height:1.08;margin:0}.pd-original{font-size:.9rem;color:#50604d;margin:5px 0}.pd-original p{margin:4px 0}.pd-info .price{font-size:1.8rem;font-weight:bold;margin:14px 0}.pd-primary{display:block;border-radius:8px;overflow:hidden;background:#f1f3ef}.pd-primary img{width:100%;aspect-ratio:1;object-fit:contain;display:block}.pd-gallery{margin:0}.pd-gallery figcaption,.pd-row h2{display:flex;justify-content:space-between;align-items:center;margin:0 0 9px}.pd-gallery figcaption span,.pd-row h2 span{font-size:.85rem;color:#627063}.pd-buy{display:block;text-align:center;width:100%;margin-bottom:8px}.pd-actions{display:flex;gap:8px;align-items:flex-start}.pd-actions>*{flex:1;min-width:0}.pd-actions details{margin:0}.pd-actions summary,.pd-actions button{background:#fff;color:#19241b;border:1px solid #b7c2b9;text-align:center;border-radius:5px;padding:10px;min-height:45px}.pd-actions button:disabled{opacity:.55}.pd-links{display:grid;grid-template-columns:1fr 1fr;gap:.4rem;padding:8px;max-height:220px;overflow:auto}.pd-group{border:0;padding:0;margin:13px 0}.pd-group legend{font-weight:650;margin-bottom:6px}.pd-group output{font-weight:400;color:#586454}.pd-options,.pd-thumbs{display:flex;flex-wrap:wrap;gap:6px;max-height:210px;overflow:auto;scrollbar-gutter:stable}.pd-thumbs{margin-top:8px;max-height:66px}.pd-group button,.pd-thumbs button{background:white;color:#142416;border:1px solid #d0d8ce;padding:4px 8px}.pd-group button[aria-pressed=true]{outline:2px solid #415e41;outline-offset:-2px}.pd-group .pd-tile,.pd-thumbs button{padding:0;width:62px;height:62px;overflow:hidden}.pd-tile img,.pd-thumbs img{width:100%;height:100%;object-fit:cover}.pd-row{border-top:1px solid #cbd2ca;margin:24px 0 0;padding:18px 0}.pd-row h2{font-size:1.4rem}.pd-photos{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:8px}.pd-photos img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:7px}.pd-message{font-size:.9rem;margin:5px 0;min-height:1em}.pd-message input{width:100%}@media(max-width:700px){.pd-grid{grid-template-columns:1fr;gap:14px}.pd-primary img{max-height:39vh}.pd-group .pd-tile,.pd-thumbs button{width:49px;height:49px}.pd-options{max-height:145px}.pd-thumbs{max-height:52px}.pd-photos{grid-template-columns:repeat(3,minmax(0,1fr))}.pd-crumb{padding:10px 0}}`;
export async function productBody(lang,item,html,path) {
  const t=labels(lang),e=productEscape,id=String(item.id||'');
  const seller=await sourceSeller(id),groups=seller?.groups||[],skus=seller?.skus||[];
  const values=groups.flatMap(g=>g.values);
  const genderLabels={en:['Women','Men'],de:['Damen','Herren'],fr:['Femme','Homme'],es:['Mujer','Hombre'],it:['Donna','Uomo'],nl:['Dames','Heren'],pt:['Feminino','Masculino'],pl:['Damskie','Męskie'],ro:['Femei','Bărbați'],sv:['Dam','Herr'],zh:['女款','男款'],da:['Dame','Herre'],fi:['Naiset','Miehet'],el:['Γυναικεία','Ανδρικά'],cs:['Dámské','Pánské'],hu:['Női','Férfi'],bg:['Дамски','Мъжки'],sk:['Dámske','Pánske'],hr:['Žensko','Muško'],ja:['女性用','男性用'],ko:['여성용','남성용'],vi:['Nữ','Nam'],th:['ผู้หญิง','ผู้ชาย'],id:['Wanita','Pria'],sl:['Ženske','Moški'],lt:['Moterims','Vyrams'],lv:['Sievietēm','Vīriešiem'],et:['Naiste','Meeste'],ga:['Mná','Fir'],mt:['Nisa','Irġiel']};
  const gender=genderLabels[lang]||genderLabels.en;
  const cleanSize=s=>s.replace(/Women(?:'s)? style|女款/gi,gender[0]).replace(/Men(?:'s)? style|男款/gi,gender[1]).replace(/）/g,')');
  const translations=await translateTitles(lang,values.map(v=>v.name));
  const name=e(item.localizedName || item.name);
  const nameDisclosure=item.localizedName && item.localizedName!==item.name?'<details class="pd-original"><summary>'+e(t.original)+'</summary><p>'+e(item.name)+'</p></details>':'';
  values.forEach((v,i)=>v.label=/(?:women|men)(?:'s)? style|女款|男款/i.test(v.name)&&/^(?:EU|US|UK|CN)?\s*\d/i.test(v.name)?cleanSize(v.name):cleanSize(translations[i]||v.name));
  const source=item.images||[], mainImages=seller?.images.length?seller.images:source;
  const separate=extraProductImages(html,seller?.images.length?source:source.slice(1));
  const actions=productAgents(html,id);
  const original='https://weidian.com/item.html?itemID='+id;
  const buy=actions.find(a=>a.name.toLowerCase()==='ootdbuy')?.url || 'https://www.ootdbuy.com/goods/details?id='+id+'&channel=weidian';
  const alternatives=actions.filter(a=>a.name.toLowerCase()!=='ootdbuy');
  const section=(heading,arr)=>arr.length?'<section class="pd-row"><h2>'+e(heading)+'<span>'+arr.length+'</span></h2><div class="pd-photos">'+arr.map((src,i)=>'<a target="_blank" rel="noopener" href="'+e(src)+'"><img loading="lazy" src="'+e(src)+'" alt="'+e(heading)+' '+(i+1)+'"></a>').join('')+'</div></section>':'';
  const variantHTML=groups.map((g,i)=>{
    const kind=/size|尺码|尺寸/i.test(g.name)?t.size:g.values.some(v=>v.image)||/style|colou?r|款式|颜色/i.test(g.name)?t.styles:t.selectOption;
    return '<fieldset data-kind="'+(kind===t.styles?'style':'option')+'" data-group="'+i+'" class="pd-group"><legend>'+e(kind)+' <output></output></legend><div class="pd-options" tabindex="0">'+g.values.map(v=>'<button type="button" aria-label="'+e(v.label)+'" title="'+e(v.label)+'" aria-pressed="false" data-option="'+e(v.id)+'" '+(v.image?'class="pd-tile" data-image="'+e(v.image)+'"><img loading="lazy" alt="'+e(v.label)+'" src="'+e(v.image)+'">':'>'+e(v.label))+'</button>').join('')+'</div></fieldset>'
  }).join('');
  return '<style>'+pdCss+'</style><article data-pd class="pd-wrap" data-select="'+e(t.selectOption)+'"><a class="pd-crumb" href="/'+lang+'/#catalog">'+e(t.catalog)+' / '+e(category(lang,path.split('/')[1]))+'</a><div class="pd-grid"><figure class="pd-gallery"><figcaption>'+e(t.photos)+'<span>'+mainImages.length+'</span></figcaption><a class="pd-primary" target="_blank" rel="noopener" href="'+e(mainImages[0])+'"><img src="'+e(mainImages[0])+'" alt="'+name+'"></a>'+(mainImages.length>1?'<div class="pd-thumbs">'+mainImages.map((s,i)=>'<button data-photo="'+e(s)+'"><img src="'+e(s)+'" alt="'+e(t.photos)+' '+(i+1)+'" loading="lazy"></button>').join('')+'</div>':'')+'</figure><section class="pd-info"><h1 data-source-title="'+e(item.name)+'">'+name+'</h1>'+nameDisclosure+'<p>ID '+e(id)+'</p>'+(item.price?'<div class="price" data-original-usd="'+e(item.price)+'" data-usd="'+e(item.price)+'">US$ '+e(item.price)+'</div>':'')+(id?'<a class="btn pd-buy" href="'+e(buy)+'" target="_blank" rel="noopener nofollow">'+e(t.buy)+'</a><div class="pd-actions">'+(alternatives.length?'<details><summary>'+e(t.agents)+'</summary><div class="pd-links">'+alternatives.map(a=>'<a href="'+e(a.url)+'" rel="noopener nofollow" target="_blank">'+e(a.name)+'</a>').join('')+'</div></details>':'')+'<button type="button" data-copy data-original="'+e(original)+'" data-url="'+e(original)+'" data-style="'+e(t.copyStyle)+'" data-copied="'+e(t.copied)+'">'+e(t.copyItem)+'</button></div>':'')+'<div data-status class="pd-message" aria-live="polite"></div>'+(variantHTML||'<p>'+e(t.unavailableStyles)+'</p>')+'</section></div>'+section(t.qc,separate.qc)+section(t.detailsPhotos,separate.details)+'<script type="application/json" data-skus>'+JSON.stringify(skus).replace(/</g,'\\u003c')+'</script><script>('+productInteractions.toString()+')()</script></article>';
}
