import {origin,machineRoute,seo} from './production.mjs';
import {catalog,detail} from './catalog.mjs';
import {dict,langs} from './locales.mjs';
import {translateNames,sourceCatalogQuery} from './translation.mjs';
import {brandLogo,brandIcon,currencyPicker,fxPrice,fxRoute,fxScripts,fxCredit} from './brandfx.mjs';
import {renderProductDetail} from './product.mjs';
import {imageSearchPage,imageSearchLabel,visualResponse} from './visual.mjs';
import {brand,allowSeller,remoteTranslation} from './settings.mjs';

import mobileCss from './mobile.css';
import baseCss from './style.css';
import productCss from './product.css';

const displayCategories=['shoes','sweatshirts','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const camera='<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="3.3"/></svg>';
function pageLink(path,params,changes={}) {
 const p=new URLSearchParams(params);
 for(const [key,value] of Object.entries(changes)){if(value)p.set(key,value);else p.delete(key)}
 return path+(p.size?'?'+p:'');
}
async function renderSite(url,request) {
 const parts=url.pathname.split('/').filter(Boolean);
 const lang=Object.hasOwn(langs,parts[0])?parts[0]:'en',t=dict[lang],params=url.searchParams;
 const root='/'+lang+'/',sheet=root+'spreadsheet/',visual=root+'image-search/';
 const item=parts[1]==='item'?'/'+parts.slice(2).join('/'):params.get('item'),q=(params.get('q')||'').slice(0,160);
 const cat=displayCategories.includes(params.get('cat'))?params.get('cat'):'';
 const sort=['popular','price'].includes(params.get('sort'))?params.get('sort'):'latest';
 const page=Math.max(1,Math.min(99999,Math.trunc(Number(params.get('page')))||1));
 const isVisual=parts[1]==='image-search',isHome=!parts[1]&&!item&&!q&&!cat&&page===1&&sort==='latest';
 const isSheet=!isHome&&!isVisual&&!item&&!['faq','articles'].includes(parts[1]);
 const explicitSize=params.get('size');
 const phoneRequest=/Mobile|Android|iPhone|iPod/i.test(request.headers.get('user-agent')||'');
 const pageSize=(explicitSize==='20'||(explicitSize!=='60'&&phoneRequest))?20:60;
 const sizeField=isSheet?'<input type="hidden" name="size" value="'+pageSize+'">':'';
 const displayParams=new URLSearchParams(params);
 if(isSheet)displayParams.set('size',pageSize);
 const detectViewport=isSheet&&!['20','60'].includes(explicitSize)?'<script>if(matchMedia("(max-width:740px)").matches && '+pageSize+'!==20){const u=new URL(location.href);u.searchParams.set("size","20");location.replace(u.href)}</script>':'';
 const words=names=>translateNames(names,lang,{remote:remoteTranslation});
 const imageLabel=imageSearchLabel(lang);
 const routeForLang=code=>url.pathname.replace(/^\/[a-z]{2}(?=\/|$)/,'/'+code)+(url.pathname==='/'?code+'/':'')+url.search;
 const languages=Object.entries(langs).map(([code,label])=>'<option value="'+escape(routeForLang(code))+'" '+(code===lang?'selected':'')+'>'+escape(label)+'</option>').join('');
 
 const head='<header>'+brandLogo(lang)+'<nav class="mainnav"><a href="'+sheet+'">'+escape(t.browse)+'</a><a href="'+visual+'">'+escape(imageLabel)+'</a></nav><div class="controls"><select aria-label="'+escape(t.language)+'" onchange="location.href=this.value">'+languages+'</select>'+currencyPicker(lang)+'</div></header>';
 const form=(hero=false)=>'<form class="querybox" action="'+sheet+'">'+sizeField+(cat?'<input type="hidden" name="cat" value="'+cat+'">':'')+'<input type="search" name="q" aria-label="'+escape(t.search)+'" placeholder="'+escape(t.search)+'" value="'+escape(q)+'"><a class="camera" href="'+visual+'" aria-label="'+escape(imageLabel)+'" title="'+escape(imageLabel)+'">'+camera+'</a>'+(hero?'':'<select name="sort" aria-label="'+escape(t.sort)+'" onchange="this.form.submit()">'+['latest','popular','price'].map(v=>'<option value="'+v+'" '+(v===sort?'selected':'')+'>'+escape(t[v==='price'?'low':v])+'</option>').join('')+'</select>')+'<button>'+escape(t.search)+'</button></form>';
 const browseTo=(changes={})=>escape(pageLink(sheet,displayParams,{item:'',match:'',...changes}));
 const chips='<nav class="chips" aria-label="'+escape(t.category)+'">'+['',...displayCategories].map(c=>'<a class="'+(c===cat?'on':'')+'" href="'+browseTo({cat:c,page:''})+'">'+escape(c?t[c]:t.all)+'</a>').join('')+'</nav>';
 let title=t.headline,body='',status=200;
 try {
  if(isVisual){title=imageLabel;body=await imageSearchPage(lang)}
  else if(item) {
   const d=await detail(item);[title]=await words([d.title]);
   body=await renderProductDetail({detail:d,title,lang,backUrl:pageLink(sheet,params,{item:'',match:''}),priceHtml:fxPrice(d.price,lang),allowSeller,translateTerms:words,match:params.get('match')||''});
  }else{
   const size=isHome?60:pageSize;
   const offset=(page-1)*size;
   const upstreamPage=Math.floor(offset/60)+1;
   const data=await catalog({category:cat==='sweatshirts'?'hoodies-sweaters':cat,page:upstreamPage,q:sourceCatalogQuery(q,lang),sort});
   const pages=Math.max(1,Math.ceil(data.total/size));
   if(isSheet&&page>pages)return Response.redirect(new URL(pageLink(sheet,displayParams,{page:pages}),url),302);
   const items=isHome?data.items.slice(0,11):data.items.slice(offset%60,offset%60+size);
   const names=await words(items.map(p=>p.title));
   const cards=items.map((p,i)=>'<a class="card" href="'+root+'item'+escape(p.path)+'"><div class="frame"><img src="'+escape(p.image)+'" alt="'+escape(names[i])+'" '+(i<4?'':'loading="lazy"')+'></div><div class="name">'+escape(names[i])+'</div><div class="price">'+fxPrice(p.price,lang)+'</div></a>');
   const total=data.total.toLocaleString(lang),range=items.length?(offset+1).toLocaleString(lang)+'–'+(offset+items.length).toLocaleString(lang):'0';
   const rangeText=range+' / '+total;
   const hidden=[['cat',cat],['q',q],['sort',sort]].filter(([,v])=>v).map(([k,v])=>'<input type="hidden" name="'+k+'" value="'+escape(v)+'">').join('');
   const paging='<form class="paging" action="'+sheet+'">'+sizeField+hidden+(page>1?'<a href="'+browseTo({page:page-1})+'">'+t.prev+'</a>':'')+'<label>'+t.page+' <input type="number" name="page" min="1" max="'+pages+'" value="'+page+'"> / '+pages+'</label> <button>'+t.go+'</button>'+(page<pages?'<a href="'+browseTo({page:page+1})+'">'+t.next+'</a>':'')+'</form>';
   if(isHome){
    body='<section class="landing"><div><h1>'+escape(t.headline)+'</h1><p>'+escape(t.intro)+'</p>'+form(true)+'<a href="'+sheet+'">'+escape(t.browse)+' · '+total+'</a></div><div class="featured"><h2>'+escape(t.latest)+'</h2><div class="leadcards">'+cards.slice(0,3).join('')+'</div></div></section>'+chips+'<div class="grid">'+cards.slice(3).join('')+'</div>';
   }
   else body='<section class="sheet"><div class="bar"><h1>'+escape(t.headline)+'</h1><strong>'+escape(t.items)+' · '+rangeText+'</strong></div>'+form()+chips+paging+(cards.length?'<div class="grid">'+cards.join('')+'</div>':'<p>'+escape(t.empty)+'</p>')+paging+'</section>';
  }
 }catch(error){status=error.status===404?404:503;title=status===404?t.empty:t.unavailable;body='<section class="notice"><h1>'+escape(title)+'</h1><a href="'+escape(url.pathname+url.search)+'">'+t.retry+'</a> · <a href="'+sheet+'">'+t.back+'</a></section>'}
 const html='<!doctype html><html lang="'+lang+'"><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">'+seo(lang,url.pathname)+'<title>'+escape(title)+'</title>'+brandIcon+detectViewport+'<style>'+baseCss+'\n'+productCss+mobileCss+'</style><body >'+head+'<main>'+body+'</main><footer>'+escape(t.headline)+' · '+fxCredit+'</footer>'+fxScripts()+'</body></html>';
 return new Response(html,{status,headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':status===200?'public,max-age=30':'no-store','Vary':'User-Agent'}});
}
export default {async fetch(request){const url=new URL(request.url);if(url.origin!==origin)return Response.redirect(origin+url.pathname+url.search,308);
 if(url.pathname==='/')return Response.redirect(origin+'/en/'+url.search,308);
 const machine=await machineRoute(url.pathname);if(machine)return machine;
 const legacy=url.searchParams.get('item');if(legacy&&/^\/[a-z0-9-]+\/\d+\.html$/.test(legacy)){const lang=url.pathname.split('/')[1];if(Object.hasOwn(langs,lang)){url.pathname='/'+lang+'/item'+legacy;url.searchParams.delete('item');return Response.redirect(url.href,308)}}
 if(!/^\/(?:_visual\/|currency\.js$|exchange-rates\.json$|favicon\.ico$)/.test(url.pathname)){const path=url.pathname.split('/');if(!Object.hasOwn(langs,path[1])||!/^\/[a-z]{2}\/(?:spreadsheet\/|image-search\/|item\/[a-z0-9-]+\/\d+\.html)?$/.test(url.pathname))return new Response('Page not found',{status:404})}
 if(url.pathname.startsWith('/_visual/'))return visualResponse(request);const fx=await fxRoute(url.pathname);if(fx)return fx;if(url.pathname==='/robots.txt')return new Response('User-agent: *\nDisallow: /');if(url.pathname==='/favicon.ico')return brand.icon?Response.redirect(brand.icon):new Response(null,{status:204});return renderSite(url,request)}};
