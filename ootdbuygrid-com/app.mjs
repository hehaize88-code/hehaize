import {articleLabel, editions, editorialPage, hasEdition} from './editorial-pages.mjs';
import {brandImage, faviconTag, currencyControl, currencyScript, fxRoute} from './brandfx.mjs';
import {productBody} from './product.mjs';
import {imageRoute} from './images.mjs';
import {languages, labels, category, translateTitles, titleTranslationClient} from './locale.mjs';
const origin='https://cnbuycha.com';
const sections=['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const capture=(html,re)=>decode(html.match(re)?.[1]||'');
function photo(path){
 if(!path)return '';
 try {
  const url=new URL(path,origin);
  return url.protocol==='https:'?url.href:'';
 } catch {return ''}
}
export function cards(html){
 return [...html.matchAll(/<article\b[^>]*class="product-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)].map(([,block])=>({
 path:capture(block,/<a href="([^"]+)" class="product-image"/),img:photo(capture(block,/<img[^>]+src="([^"]+)"/)),name:capture(block,/<h3>([^<]+)<\/h3>/),price:capture(block,/class="product-price"[^>]*>([\d.]+)/)
 })).filter(x=>x.name&&/^\/[\w-]+\/\d+\.html$/.test(x.path))
}
export function detail(html){
 const gallery=html.split('data-gallery-track>')[1]?.split('</div>\n')[0]||'';
 return {name:capture(html,/<h1[^>]*>([^<]+)<\/h1>/),price:capture(html,/itemprop="price" content="([\d.]+)"/),id:capture(html,/weidian\.com\/item\.html\?itemID=(\d+)/),images:[...new Set([...gallery.matchAll(/<img\b[^>]+src="([^"]+)"/g)].map(m=>photo(decode(m[1]))).filter(Boolean))]}
}
const css=`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f8f8f5;color:#161816;font:16px/1.5 Arial,Helvetica,sans-serif}a{color:inherit;text-decoration:none}a:hover{text-decoration:underline}button,select,input{font:inherit}header{background:white;border-bottom:1px solid #ccc}.wrap{max-width:1280px;margin:auto;padding:0 clamp(16px,4vw,64px)}header .wrap,.nav,.tools,.paging,.fields{display:flex;align-items:center;gap:18px}header .wrap{justify-content:space-between;min-height:72px}.word{font-weight:950;font-style:italic;font-size:1.9rem;letter-spacing:-2px}.word i{color:#527314}.nav a{font-weight:650}.tools select,select{max-width:13em;padding:8px;border:1px solid #bcbfba;background:#fff;border-radius:4px}.btn,button{display:inline-block;border:0;background:#1b201c;color:white;padding:10px 17px;border-radius:4px;cursor:pointer;font-weight:650}.hero{display:grid;grid-template-columns:1.08fr 1fr;background:#21352a;color:white;margin:28px 0;border-radius:10px;overflow:hidden;min-height:295px}.copy{padding:clamp(24px,4vw,62px);align-self:center}.copy h1{font-size:clamp(2.2rem,4.6vw,4.5rem);letter-spacing:-.06em;line-height:1;margin:0 0 16px}.copy p{margin:0 0 20px;color:#e0e9da;max-width:37em}.copy .btn{color:#192318;background:#d6ee94}.mosaic{display:grid;grid-template-columns:1.3fr 1fr;grid-template-rows:1fr 1fr;gap:5px;min-height:0;height:320px}.mosaic img{width:100%;height:100%;object-fit:cover}.mosaic img:first-child{grid-row:span 2}.chips{display:flex;overflow:auto;gap:8px;padding:6px 0 16px}.chip{border:1px solid #c5c9c1;white-space:nowrap;padding:7px 13px;border-radius:30px;background:white}.chip.on{background:#21352a;color:white}.fields{margin:12px 0;gap:8px;flex-wrap:wrap}.fields input{flex:1;min-width:8em;padding:10px 14px;border:1px solid #b9bcb6;border-radius:4px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:25px 16px}.card img,.gallery img{width:100%;object-fit:cover;aspect-ratio:1;background:#eaeae6;border-radius:5px}.card small{display:block;color:#58664d}.card strong,.card b{display:block;line-height:1.3;margin-top:4px}.card b{font-size:.94rem}.card:hover img{filter:brightness(.96)}h2{font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.055em;margin:18px 0 10px}.paging{justify-content:center;margin:24px}.product{display:grid;grid-template-columns:1.2fr 1fr;gap:3vw;margin:25px 0}.gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.product h1{line-height:1.1;letter-spacing:-.04em}.price{font-size:1.5rem}.foot{border-top:1px solid #ccd1c8;margin:32px 0;padding:18px 0}.back{display:inline-block;margin-top:20px}summary{cursor:pointer}details{margin:12px 0}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #65893d}@media(max-width:760px){header .wrap{min-height:60px}.nav{display:none}.tools{gap:8px}.tools a{font-size:.875rem;padding:8px}.word{font-size:1.45rem}.hero{grid-template-columns:1.25fr 1fr;min-height:0;margin:16px 0}.copy{padding:18px}.copy h1{font-size:2rem}.copy p{font-size:.9rem}.mosaic{height:100%;min-height:190px;grid-template-columns:1fr}.mosaic img:not(:first-child){display:none}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 10px}.product{display:flex;flex-direction:column-reverse}.fields select{max-width:8rem}.fields button{padding:10px}.chips{padding-bottom:6px}.gallery{margin-top:12px}}`;
const cameraIcon='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 6l1.5-2h5L16 6h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/><circle cx="12" cy="12.5" r="3.7"/></svg>';
function cameraLink(lang){
 const label=escape(labels(lang).imageSearch);
 return '<a class="camera" href="/'+lang+'/image-search/" aria-label="'+label+'" title="'+label+'">'+cameraIcon+'</a>';
}
function page(lang,heading,body,url,description){
 const analytics = url.origin === 'https://ootdbuygrid.com'
   ? `<script async src="https://www.googletagmanager.com/gtag/js?id=G-FQ40MHDX1T"></script><script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FQ40MHDX1T');
</script>` : '';
 const t=labels(lang);
 const home='/'+lang+'/';
 const editorial = Boolean(description);
 const pageLanguages = editorial ? editions : Object.keys(languages);
 const localizedPath = code => '/' + code + url.pathname.slice(lang.length+1);
 const alternates = editorial ? [...pageLanguages, 'x-default'].map(code =>
   '<link rel="alternate" hreflang="'+code+'" href="https://ootdbuygrid.com'+escape(localizedPath(code==='x-default'?'en':code))+'">'
 ).join('') : '';
 const meta = editorial ? '<meta name="description" content="'+escape(description)+'">'+alternates : '';
 const langs=pageLanguages.map(code=>{
   const name=languages[code];
   const next=new URL(url);
   next.pathname=localizedPath(code);
   return '<option value="'+escape(next.pathname+next.search)+'" '+(code===lang?'selected':'')+'>'+escape(name)+'</option>';
 }).join('');
 const nav=[[home+'spreadsheet/',t.catalog],[home+'#categories',t.categories],[home+'image-search/',t.imageSearch],[hasEdition(lang)?home+'faq/':home+'#faq',t.faq],...(hasEdition(lang)?[[home+'articles/',articleLabel(lang)]]:[])]
   .map(([link,label])=>'<a href="'+link+'">'+escape(label)+'</a>').join('');
 return '<!doctype html><html lang="'+lang+'"><head>'+analytics+'<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="'+escape(new URL(url.pathname+(editorial?'':url.search),'https://ootdbuygrid.com').href)+'">'+meta+faviconTag()+'<title>'+escape(heading)+' · OOTDBuy</title><style>'+css+theme+'</style></head><body><header><div class="wrap"><a class="word" href="'+home+'" aria-label="OOTDBuy">'+brandImage()+'</a><nav class="nav">'+nav+'</nav><div class="tools"><select aria-label="'+escape(t.language)+'" onchange="location.href=this.value+location.hash">'+langs+'</select>'+currencyControl(lang)+'<a class="btn signup" href="https://ootdbuy.com/register">'+escape(t.register)+'</a></div></div></header><main class="wrap">'+body+'<footer class="foot"><a href="'+home+'">OOTDBuy</a> · '+escape(t.catalog)+'</footer></main>'+currencyScript(lang)+'<script>'+titleTranslationClient()+'</script></body></html>';
}
const theme=`
.editorial,.guide{max-width:74ch;margin:2rem auto 4rem}.editorial p{line-height:1.7}.editorial h2{line-height:1.28;margin-top:1.7em}.editorial a,.guide a{text-decoration:underline}.guide summary{cursor:pointer}.guide details{padding:1rem 0;border-bottom:1px solid var(--line)}
:root{--ink:#171b23;--accent:#a64208;--line:#e2e5e5}body{background:#fff;color:var(--ink);font-family:Inter,"Helvetica Neue",Arial,sans-serif}header{position:sticky;top:0;z-index:10;border-color:var(--line)}[id]{scroll-margin-top:90px}@media(max-width:940px){[id]{scroll-margin-top:120px}}.hero-search{display:flex;gap:4px;align-items:center;max-width:38em;background:white;border:1px solid var(--line);border-radius:10px;padding:5px}.hero-search input{min-width:0;width:100%;border:0;padding:8px;font:inherit}.hero-search .camera{border:none;flex:none}.hero-search button{color:white}.copy{padding:clamp(18px,3vw,46px)}.word img{display:block;width:118px;max-height:44px;object-fit:contain}header .wrap{gap:18px}.nav{gap:22px}.tools{gap:8px}.tools select{max-width:9em;font-size:.925rem;border-color:var(--line)}.btn,button,.chip.on{background:var(--accent)}.hero{background:#fff5e9;color:var(--ink);border-radius:16px;grid-template-columns:1fr 1fr}.copy p{color:#49534e}.copy .btn{background:var(--accent);color:white}.mosaic{height:310px;grid-template-columns:1.4fr 1fr;gap:4px}.mosaic a{height:100%;min-height:0}.mosaic a:first-child{grid-row:span 2}.mosaic img:first-child{grid-row:auto}.camera{width:44px;height:44px;display:inline-grid;place-items:center;border:1px solid #cbd3d0;border-radius:6px;background:white;color:#873604}.fields{flex-wrap:nowrap}.fields .camera{flex:none}.fields input{min-width:0}.card img{border-radius:9px}.nav a{font-size:.94rem}.nav,.chips{scrollbar-width:thin}header .wrap{max-width:1420px}.tools select{background:white}.catalog-count{margin:0 0 14px;color:#4a504e}.paging{flex-wrap:wrap}.foot{font-size:.9rem;color:#4a504e}
@media(max-width:940px){header .wrap{display:grid;grid-template-columns:auto 1fr;gap:0;padding-top:9px}.tools{justify-content:flex-end;min-width:0}.nav{display:flex;grid-column:1/-1;order:3;overflow:auto;white-space:nowrap;padding:8px 0;gap:18px}.word img{width:92px}.tools select{padding:6px 1px;max-width:8em}.tools .signup{padding:6px 10px}}
@media(max-width:760px){.hero{display:flex;flex-direction:column-reverse}.hero .mosaic{display:grid;min-height:0;height:105px;grid-template-columns:repeat(3,1fr);grid-template-rows:105px}.hero .mosaic a,.hero .mosaic a:not(:first-child){display:block;grid-row:auto}.hero .copy{width:100%}.hero{grid-template-columns:1.3fr .75fr;border-radius:9px}.mosaic{height:100%;grid-template-columns:1fr;grid-template-rows:1fr}.mosaic a:not(:first-child){display:none}.copy{padding:18px}.fields{display:grid;grid-template-columns:minmax(0,1fr) auto auto}.fields select{grid-row:2;grid-column:1/-1;max-width:none;justify-self:start}.fields .camera,.fields button,.fields input[type=search]{grid-row:1}.fields button{grid-column:3}.fields .camera{grid-column:2}.tools select{max-width:6em}.tools{gap:4px}.word img{max-width:20vw}.card strong{overflow-wrap:anywhere}}
`;
async function upstream(path){const r=await fetch(origin+path,{cf:{cacheEverything:true,cacheTtl:180},signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error('catalog '+r.status);return r.text()}
function response(html,status=200){return new Response(html,{status,headers:{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':status===200?'index, follow':'noindex'}})}
export default {async fetch(req,env,ctx){
 const u=new URL(req.url),parts=u.pathname.split('/'),lang=parts[1];if(u.pathname==='/')return Response.redirect(u.origin+'/en/',302);
 if(u.pathname==='/robots.txt')return new Response('User-agent: *\nDisallow: /');
 if(['/api/rates','/favicon.ico','/assets/ootdbuy-logo.png','/assets/ootdbuy-currency.js'].includes(u.pathname))return fxRoute(req);
 if(u.pathname==='/api/image-index'||u.pathname.startsWith('/api/image-index/'))return imageRoute(req,'en',ctx);
 if(!Object.hasOwn(languages,lang))return response('404',404);
 const t=labels(lang),home='/'+lang+'/',params=u.searchParams,sec=sections.includes(params.get('cat'))?params.get('cat'):'AllProducts';
 const sheet=home+'spreadsheet/';

 if(parts[2]==='articles'||parts[2]==='faq'){
   const result=editorialPage(lang,u.pathname.slice(home.length),'https://ootdbuygrid.com');
   return result ? response(page(lang,result.title,result.body,u,result.description)) : response('404',404);
 }

 const link=(changes,hash='catalog')=>{const v=new URLSearchParams(params);for(const [k,value] of Object.entries(changes))value?v.set(k,value):v.delete(k);return sheet+'?'+escape(v.toString())+'#'+hash};
 try{
 if(parts[2]==='p'&&sections.includes(parts[3])&&/^\d+\.html$/.test(parts[4])){
 const path='/'+parts[3]+'/'+parts[4];
 const html=await upstream(path),item=detail(html);
 if(!item.name||!item.images.length)throw Error('detail');
 const [name]=await translateTitles(lang,[item.name]);
 item.localizedName=name;
 return response(page(lang,name,await productBody(lang,item,html,path),u));
 }
 if(parts[2]==='image-search'){
   const result=await imageRoute(req,lang,ctx);
   return typeof result==='string'?response(page(lang,t.imageSearch,result,u)):result;
 }
 if(u.pathname!==home && u.pathname!==sheet)return response('404',404);
 const num=Math.max(1,Math.min(10000,Number.parseInt(params.get('page'),10)||1)),keyword=(params.get('q')||'').slice(0,120),sort=['click','price'].includes(params.get('sort'))?params.get('sort'):'';
 const source=new URLSearchParams();if(keyword)source.set('q',keyword);if(sort)source.set('sort',sort);const sourcePage=Math.ceil(num/3);if(sourcePage>1)source.set('page',sourcePage);
 const html=await upstream('/'+sec+'/?'+source),items=cards(html),offset=((num-1)%3)*20,part=items.slice(offset,offset+20);
 const visible=[...new Set([...part,...(num===1?[items[1],items[0],items[7]]:[])].filter(Boolean))];
 const names=await translateTitles(lang,visible.map(x=>x.name));
 visible.forEach((x,i)=>{x.localizedName=names[i]});
 const isHome=u.pathname===home&&!keyword&&num===1&&sec==='AllProducts'&&!sort;
 let body=isHome&&items.length?'<section class="hero"><div class="copy"><h1>'+escape(t.headline)+'</h1><p>'+escape(t.intro)+'</p><form class="hero-search" action="'+sheet+'#catalog"><input type="search" name="q" aria-label="'+escape(t.search)+'" placeholder="'+escape(t.placeholder)+'">'+cameraLink(lang)+'<button>'+escape(t.search)+'</button></form></div><div class="mosaic">'+[items[1],items[0],items[7]].filter(Boolean).map(x=>'<a href="'+home+'p'+x.path+'"><img src="'+escape(x.img)+'" alt="'+escape(x.localizedName)+'"></a>').join('')+'</div></section>':'';
 body+='<h2 id="catalog">'+escape(sec==='AllProducts'?t.catalog:category(lang,sec))+'</h2><form class="fields" action="'+sheet+'#catalog"><input type="hidden" name="cat" value="'+sec+'"><input type="search" name="q" aria-label="'+escape(t.search)+'" placeholder="'+escape(t.placeholder)+'" value="'+escape(keyword)+'">'+cameraLink(lang)+'<select name="sort" aria-label="'+escape(t.catalog)+'">'+[['',t.latest],['click',t.popular],['price',t.price]].map(([v,l])=>'<option value="'+v+'" '+(sort===v?'selected':'')+'>'+escape(l)+'</option>').join('')+'</select><button>'+escape(t.search)+'</button></form><div class="chips" id="categories">'+sections.map(s=>'<a class="chip '+(s===sec?'on':'')+'" href="'+link({cat:s,page:null})+'">'+escape(category(lang,s))+'</a>').join('')+'</div><div class="grid">'+part.map(x=>'<a class="card" href="'+home+'p'+x.path+'"><img loading="lazy" src="'+escape(x.img)+'" alt="'+escape(x.localizedName)+'"><small>'+escape(category(lang,x.path.split('/')[1]))+'</small><strong data-source-title="'+escape(x.name)+'">'+escape(x.localizedName)+'</strong><b data-usd="'+escape(x.price)+'">US$ '+escape(x.price)+'</b></a>').join('')+'</div>';
 const countText=capture(html,/<div class="results-summary">([\d,]+) products?/);
 const total=countText?Number(countText.replaceAll(',','')):null;
 const pageCount=total===null?null:Math.max(1,Math.ceil(total/20));
 const hasNext=pageCount===null?(offset+20<items.length||html.includes('›</a>')):num<pageCount;
 const number=new Intl.NumberFormat(lang);
 const pagination=pageCount>1?'<select aria-label="'+escape(t.catalog)+'" onchange="location.href=this.value">'+Array.from({length:pageCount},(_,i)=>'<option value="'+link({page:i+1})+'" '+(i+1===num?'selected':'')+'>'+number.format(i+1)+' / '+number.format(pageCount)+'</option>').join('')+'</select>':'';
 const summary=total===null?'':'<div class="catalog-count"><b>'+escape(sec==='AllProducts'&&!keyword?t.all:t.catalog)+'</b> · '+number.format(total)+(part.length?' &nbsp; | &nbsp; '+number.format((num-1)*20+1)+'–'+number.format((num-1)*20+part.length):'')+'</div>';
 body=body.replace('<div class="grid">',summary+'<div class="grid">');
 const next=num+1;
 body+=(part.length?'':'<p>'+escape(t.empty)+'</p>')+'<nav class="paging">'+(num>1?'<a class="chip" href="'+link({page:num-1})+'">'+escape(t.previous)+'</a>':'') +pagination+(hasNext?'<a class="btn" href="'+link({page:next})+'">'+escape(t.next)+'</a>':'')+'</nav><details id="faq"><summary>'+escape(t.faq)+'</summary><strong>'+escape(t.how)+'</strong><p>'+escape(t.answer)+'</p></details>';
 return response(page(lang,t.catalog,body,u))
 }catch{return response(page(lang,t.error,'<h2>'+escape(t.error)+'</h2><a class="btn" href="'+escape(u.pathname+u.search)+'">'+escape(t.retry)+'</a>',u),503)}
}}
