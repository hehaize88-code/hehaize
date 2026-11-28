import {localeList,translateProductTitle,productGlossaries,parseList,parseDetail,escapeHtml as h,upstream,dictionaries} from './catalog.mjs';
import {mark} from './brand.mjs';
const cats={'AllProducts':'All products','shoes':'Shoes','hoodies-sweaters':'Hoodies','t-shirts':'T-Shirts','jackets':'Jackets','pants-shorts':'Pants / Shorts','headwear':'Headwear','accessories':'Accessories','short-sets':'Short Sets','electronics':'Electronics','other-stuff':'Other','jersey':'Jerseys'};
const register='https://www.uufinds.com/register', qc='https://www.uufinds.com/qcfinds';
const css=STYLE_CONTENT;
const money=(v,l="en")=>v!==''&&Number.isFinite(Number(v))?new Intl.NumberFormat(l,{style:'currency',currency:'USD'}).format(Number(v)):'';
function render(content,title,lang,u,t){
 const store=storefront(lang,t);
 const options=localeList.filter(x=>x[0]!=='en-gb').map(([code,name])=>{const v=new URL(u);v.pathname=v.pathname.replace(/^\/[\w-]+/,'/'+code);return '<option value="'+h(v.pathname+v.search)+'" '+(code===lang?'selected':'')+'>'+h(name)+'</option>'}).join('');
 return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="'+h(canonical(u))+'">'+alternates(u)+'<script async src="https://www.googletagmanager.com/gtag/js?id=G-NB2CDN5HXM"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-NB2CDN5HXM");</script><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/catalog.css"><link rel="stylesheet" href="/assets/catalog.css"><script type="module" src="/assets/experience.js"></script><title>'+h(title)+' | UUFinds Grid</title><style>'+css+'</style></head><body><header><div class="wrap bar"><a class="brand" href="/'+lang+'/"><img src="/uufinds-official-logo.png" alt="UUFinds"></a><nav class="top-links">'+store.nav+'</nav><select class="lang" aria-label="'+t('Language')+'" onchange="location.assign(this.value)">'+options+'</select><select class="cc" data-currency-select aria-label="'+t("Currency")+'">'+CURRENCIES.map(v=>'<option value="'+v+'">'+v+'</option>').join('')+'</select><a class="register" href="'+register+'">'+t('Register')+'</a></div><div class="category-strip"><nav>'+store.categories+'</nav></div></header><main class="wrap catalog-main">'+content+'<footer>UUFinds Grid · <a href="'+qc+'">'+t('Open in UUFinds')+'</a></footer></main></body></html>'
}
export default {async fetch(req,env){
 const u=new URL(req.url);if(u.hostname==='www.uufindsgrid.com'||u.protocol==='http:')return Response.redirect('https://uufindsgrid.com'+u.pathname+u.search,308);
 if(u.pathname==='/robots.txt')return new Response('User-agent: *\nAllow: /\nSitemap: https://uufindsgrid.com/sitemap.xml\n',{headers:{'content-type':'text/plain'}});
 if(u.pathname==='/')return Response.redirect(u.origin+'/en/',308);
 if(u.pathname==='/sitemap.xml'||u.pathname.startsWith('/sitemaps/'))return sitemap(u.pathname);
 const staticResponse=await asset(req,u.pathname,env);if(staticResponse)return staticResponse;
 if(u.pathname.startsWith('/api/'))return await experienceRoute(req)||new Response('',{status:404});
 const [,lang,...parts]=u.pathname.split('/');if(!localeList.some(x=>x[0]===lang))return new Response('Page not found',{status:404});
 const titleMap=await titles(lang); const d=dictionaries[lang]||{},t=k=>h(d[k]||k),name=raw=>h(titleMap[raw]||d[raw]||translateProductTitle(raw,lang,productGlossaries)),path=parts.join('/'),home='/'+lang+'/',url=(params)=>home+'spreadsheet/?'+h(params.toString());
 const send=(body,title,status=200)=>new Response(render(body,title,lang,u,t),{status,headers:{'content-type':'text/html;charset=utf-8','cache-control':status===200?'public, max-age=45':'no-store','x-robots-tag':status===200?(u.searchParams.has('q')&&u.searchParams.get('q')?'noindex, follow':'index, follow'):'noindex'}});
 try{
 if(path==='image-titles'&&req.method==='POST'){const names=await req.json();if(!Array.isArray(names)||names.length>24)return new Response('',{status:400});return Response.json(Object.fromEntries(names.filter(x=>typeof x==='string'&&x.length<1000).map(x=>[x,titleMap[x]||translateProductTitle(x,lang,productGlossaries)])));}
 if(path==='image-search/'){
  const cfg={lang,results:d['Similar products']||'Similar products',empty:d['No products found. Try another keyword.']||'No products found.',invalid:d['Choose a JPG, PNG, WebP or GIF up to 20 MB.']||'Choose a photo up to 20 MB.',searching:d['Searching catalogue images']||'Searching catalogue images',error:d['Catalogue temporarily unavailable. Please try again.']||'Catalogue temporarily unavailable. Please try again.'};
  return send('<a class="back" href="'+home+'">'+t('All products')+'</a><h1>'+t('Search by image')+'</h1><label class="upload">'+t('Choose a photo')+'<input id="upload" type="file" accept="image/*"></label><p id="status" role="status">'+t('Free image search. Your photo stays on your device.')+'</p><div class="grid" id="matches"></div><script id="search-ui" type="application/json">'+JSON.stringify(cfg).replaceAll('<','&lt;')+'</script><script type="module" src="/assets/visual.js"></script>',t('Search by image'));
 }
 const store=storefront(lang,t),guide=store.guide(path);
 if(guide)return send(guide.body,guide.heading);
 if(path&&path!=='spreadsheet/'){
  if(!/^[a-z-]+\/\d+\.html$/.test(path)||!Object.hasOwn(cats,parts[0]))return send('', '404',404);
  const p=parseDetail(await upstream('/'+path));if(!p.title)return send(t('Product unavailable'),'404',404);
  p.title=titleMap[p.title]||translateProductTitle(p.title,lang,productGlossaries);
  const labels=[];labels[7]='Browse the full spreadsheet';labels[9]='Open in UUFinds';labels[14]='Product ID';
  const block=renderProductDetail(p,lang,labels,buyUrl(p.sourceId));
  return send(localizeCatalogueHtml(block,d,lang),p.title);
 }
 const query=u.searchParams.get('q')?.trim().slice(0,100)||'',cat=Object.hasOwn(cats,u.searchParams.get('cat'))?u.searchParams.get('cat'):'AllProducts',sort=['new','price','click'].includes(u.searchParams.get('sort'))?u.searchParams.get('sort'):'new',page=Math.max(1,Math.min(10000,parseInt(u.searchParams.get('page'))||1));
 const batch=Math.ceil(page/5),offset=((page-1)%5)*12,params=new URLSearchParams({q:query,sort,page:String(batch)});
 if(query==='7880141682')return Response.redirect(u.origin+home+'shoes/3475.html',302);
 const data=parseList(await upstream('/'+cat+'/',params));
 if(!data.total&&!data.products.length&&!query)throw Error('Empty source');
 const link=(newValues)=>{const v=new URLSearchParams({q:query,cat,sort,page:'1',...newValues});return url(v)};
 const cards=data.products.slice(offset,offset+12).map(p=>'<a class="card" href="'+home+h(p.path.slice(1))+'"><div class="photo"><img loading="lazy" src="'+h(p.image)+'" alt="'+name(p.title)+'"></div><h3>'+name(p.title)+'</h3><span class="price" data-price-currency="USD" data-price-amount="'+h(p.price)+'">'+money(p.price,lang)+'</span></a>').join('');
 const search='<form action="'+home+'spreadsheet/" class="search store-search"><input aria-label="'+t('Search products')+'" name="q" value="'+h(query)+'" placeholder="'+t('Search products or source ID')+'"><a class="camera" aria-label="'+t('Search by image')+'" href="'+home+'image-search/">'+cameraIcon+'</a><button aria-label="'+t('Search')+'"><i class="lens"></i></button></form>';
 const front=!path&&!u.search;
 const hero=front?store.hero(search):search;
 const chips=Object.entries(cats).map(([key,label])=>'<a class="'+(cat===key?'on':'')+'" href="'+link({cat:key})+'">'+t(label)+'</a>').join('');
 const sorts=[['new','Latest'],['click','Popular'],['price','Price: low to high']].map(([v,k])=>'<option value="'+link({sort:v})+'" '+(v===sort?'selected':'')+'>'+t(k)+'</option>').join('');
 const pages=Math.max(1,Math.ceil(data.total/12));
 return send(hero+'<div class="row"><h2>'+(front?store.feed:t(cats[cat]))+' <small style="font-size:.48em;letter-spacing:0">'+data.total.toLocaleString(lang)+'</small></h2><select class="sort" aria-label="'+t('Products')+'" onchange="location.assign(this.value)">'+sorts+'</select></div><nav class="chips">'+chips+'</nav><section class="grid">'+(cards||'<p>'+t('No products found. Try another keyword.')+'</p>')+'</section><nav class="pager">'+(page>1?'<a href="'+link({page:page-1})+'">'+t('Previous')+'</a>':'')+'<span>'+page+' / '+pages+'</span><form action="'+home+'spreadsheet/"><input type="hidden" name="cat" value="'+h(cat)+'"><input type="hidden" name="q" value="'+h(query)+'"><input type="hidden" name="sort" value="'+sort+'"><input name="page" type="number" min="1" max="'+pages+'" value="'+page+'" aria-label="'+t('Search')+'"><button>'+t('Open')+'</button></form>'+(page<pages?'<a href="'+link({page:page+1})+'">'+t('Next')+'</a>':'')+'</nav>','UUFinds Spreadsheet')
 }catch(err){return send('<section class="blank"><h1>'+t('Catalogue temporarily unavailable. Please try again.')+'</h1><a class="back" href="'+h(u.pathname+u.search)+'">'+t('Retry')+'</a></section>','UUFinds Grid',err.status===404?404:503)}
}};
