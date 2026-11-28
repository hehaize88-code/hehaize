const siteOrigin='https://joyagoosheethub.com';
function sitemap(path){
 const langs=Object.keys(locales);
 const entry=(tag,path)=>'<'+tag+'><loc>'+siteOrigin+path+'</loc></'+tag+'>';
 const root=path==='/sitemap.xml'?'sitemapindex':'urlset';
 const lang=path.match(/^\/sitemaps\/([A-Za-z-]+)\.xml$/)?.[1];
 if(root==='urlset'&&!langs.includes(lang))return new Response('404',{status:404});
 const rows=root==='sitemapindex'?langs.map(l=>entry('sitemap','/sitemaps/'+l+'.xml')):[...['','spreadsheet/','categories/','image-search/','guide/'],...productPaths.map(p=>'product'+p)].map(p=>entry('url','/'+lang+'/'+p));
 return new Response('<?xml version="1.0" encoding="UTF-8"?><'+root+' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+rows.join('')+'</'+root+'>',{headers:{'Content-Type':'application/xml;charset=utf-8','Cache-Control':'public,max-age=600'}});
}
const origin='https://cnbuycha.com';
const register='https://joyagoo.com/register';
const decode=s=>String(s??'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=s=>decode(String(s??'').replace(/<[^>]+>/g,'')).trim();
function media(s){try{if(!s)return '';const u=new URL(decode(s),origin);return u.origin===origin?u.href:''}catch{return ''}}
const productPath=/^\/[a-z-]+\/\d+\.html$/;
async function read(path){const res=await fetch(origin+path,{cf:{cacheTtl:180,cacheEverything:true},signal:AbortSignal.timeout(18000)});if(!res.ok)throw new Error(String(res.status));return res.text()}
function cards(h){return [...h.matchAll(/<article\b[^>]*class="[^"]*product-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)].map(([,s])=>({path:s.match(/href="([^"]+)"/)?.[1],name:text(s.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]),img:media(s.match(/<img[^>]*src="([^"]+)"/)?.[1]),price:s.match(/class="product-price"[^>]*>([\d.]+)/)?.[1]})).filter(p=>productPath.test(p.path)&&p.name)}
function detail(h){const g=h.match(/data-gallery-track>([\s\S]*?)<button/)?.[1]||'';return {name:text(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]),id:h.match(/class="product-id">ID:\s*(\d+)/)?.[1],price:h.match(/itemprop="price" content="([^"]+)"/)?.[1],imgs:[...new Set([...g.matchAll(/<img[^>]*src="([^"]+)"/g)].map(m=>media(m[1])).filter(Boolean))],buy:decode(h.match(/href="(https:\/\/joyagoo\.com\/product\?[^"]+)"/)?.[1]),original:decode(h.match(/href="(https:\/\/weidian\.com\/item\.html\?[^"]+)"/)?.[1])}}
function title(n,l,path){return localProductName(n,l,path)}
function money(v,l){
 if(v==null || v==='' || !Number.isFinite(Number(v))) return '';
 return '<span data-usd="'+e(v)+'">'+new Intl.NumberFormat(l,{style:'currency',currency:'USD'}).format(Number(v))+'</span>';
}
function layout(u,l,heading,body,status=200){
 const t=messages[l],base='/'+l+'/';
 const urls=[[t[0],''],[t[1],'spreadsheet/'],[t[2],'categories/'],[visualLabel(l),'image-search/']];
 const nav=urls.map(([name,path])=>'<a '+(u.pathname===base+path?'aria-current="page"':'')+' href="'+base+path+'">'+e(name)+'</a>').join('');
 const options=Object.entries(locales).map(([k,v])=>'<option '+(k===l?'selected':'')+' value="'+e(u.pathname.replace(/^\/[^/]+/,'/'+k)+u.search)+'">'+e(v)+'</option>').join('');
 return new Response(`<!doctype html><html lang="${l}"><head><meta charset="utf-8"><meta name="msvalidate.01" content="5C3F81E3632C3A1AB9E5CF1F80D171BD"><script async src="https://www.googletagmanager.com/gtag/js?id=G-KND7DEC315"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-KND7DEC315');</script><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="${status===200&&!u.search ? 'index,follow':'noindex,follow'}"><link rel="canonical" href="${e(siteOrigin+u.pathname)}"><title>${e(heading)} · JoyaGoo</title><link rel="icon" type="image/svg+xml" href="/brand/favicon.svg"><link rel="stylesheet" href="/style.css"></head><body><header><a class="wordmark" href="${base}"><img width="136" height="40" src="/brand/logo.svg" alt="JoyaGoo"></a><nav>${nav}</nav><div class="right"><select aria-label="${e(locales[l])}" onchange="location.href=this.value">${options}</select><select id="currency" aria-label="ISO 4217">${currencies.map(c=>'<option>'+c+'</option>').join('')}</select><a class="btn" href="${register}">${e(t[4])}</a></div></header><main>${body}</main><footer><a href="${base}guide/">${e(t[3])}</a> · ${e(t[32])}</footer><script type="application/json" id="rate-seed">${JSON.stringify(seed)}</script><script src="/currency.js" defer></script></body></html>`,{status,headers:{'content-type':'text/html;charset=utf-8'}});
}
function search(l,q=''){
 const t=messages[l];
 return `<form class="find" action="/${l}/spreadsheet/"><input type="search" name="q" value="${e(q)}" aria-label="${e(t[8])}" placeholder="${e(t[8])}"><a class="camera" href="/${l}/image-search/" aria-label="${e(visualLabel(l))}" title="${e(visualLabel(l))}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="3.6"/></svg></a><button class="go">${e(t[9])}</button></form>`;
}
function chipList(l,cat){const labels=messages[l][13].split('|');return '<div class=chips>'+cats.map((c,i)=>'<a class="chip '+(cat===c?'active':'')+'" href="/'+l+'/spreadsheet/?category='+c+'">'+e(labels[i])+'</a>').join('')+'</div>'}
function tile(p,l){return '<a class=tile href="/'+l+'/product'+p.path+'"><img loading=lazy src="'+e(p.img)+'" alt="'+e(title(p.name,l,p.path))+'"><h3>'+e(title(p.name,l,p.path))+'</h3><span class=price>'+money(p.price,l)+'</span></a>'}
export default {async fetch(request,env){const u=new URL(request.url),[l,route,...rest]=u.pathname.split('/').filter(Boolean);
if(u.hostname==='www.joyagoosheethub.com'||u.protocol==='http:')return Response.redirect(siteOrigin+u.pathname+u.search,308);
if(u.pathname==='/sitemap.xml'||u.pathname.startsWith('/sitemaps/'))return sitemap(u.pathname);
if(l==='api'){const result=await visualRoute(u,env);if(result)return result}
if(u.pathname==='/exchange-rates.json')return ratesResponse();
if(u.pathname==='/currency.js')return new Response('('+moneyScript.toString()+')()',{headers:{'content-type':'application/javascript;charset=utf-8'}});
if(u.pathname==='/brand/logo.svg'||u.pathname==='/brand/favicon.svg')return new Response(u.pathname.endsWith('logo.svg')?logo:icon,{headers:{'content-type':'image/svg+xml','cache-control':'public,max-age=86400'}});
if(!l)return Response.redirect(siteOrigin+'/en/',308);
if(l==='style.css')return new Response(css,{headers:{'Content-Type':'text/css'}});
if(l==='robots.txt')return new Response('User-agent: *\nDisallow: /api/\nDisallow: /shards/\nSitemap: '+siteOrigin+'/sitemap.xml',{headers:{'Content-Type':'text/plain;charset=utf-8'}});
if(!Object.hasOwn(locales,l)||!messages[l])return new Response('404',{status:404});const t=messages[l],base='/'+l+'/';try{
if(!route){
 const html=await read('/AllProducts/'), items=cards(html);
 if(!items.length)throw Error('source');
 const total=html.match(/Browse ([\d,]+) China shopping/i)?.[1]?.replace(/,/g,'');
 const latestItems=items.slice(0,3), labels=t[13].split('|');
 const shelves=cats.slice(1).map((cat,i)=>({cat,label:labels[i+1],items:items.filter(p=>p.path.startsWith('/'+cat+'/')).slice(0,4)})).filter(s=>s.items.length).slice(0,3);
 await prepareProductNames([...latestItems,...shelves.flatMap(s=>s.items)].map(p=>p.name),l);
 const latest=latestItems.map(p=>tile(p,l)).join('');
 const shelfHtml=shelves.map(s=>`<section class="shelf"><div class="shelf-title"><h2>${e(s.label)}</h2><a href="${base}spreadsheet/?category=${s.cat}">${e(t[12])}</a></div><div class="shelf-products">${s.items.map(p=>tile(p,l)).join('')}</div></section>`).join('');
 return layout(u,l,'JoyaGoo '+t[1],`<section class="home-top"><div class="home-search"><h1>JoyaGoo<br>${e(t[1])}</h1><p>${e(t[7])}</p>${search(l)}<a class="all-link" href="${base}spreadsheet/">${e(t[10])} ${total?'('+Number(total).toLocaleString(l)+')':''}</a></div><div><div class="home-caption"><h2>${e(t[11])}</h2><a href="${base}spreadsheet/">${e(t[12])}</a></div><div class="latest-grid">${latest}</div></div></section>${chipList(l,'AllProducts')}${shelfHtml}`);
}
if(route==='categories'){return layout(u,l,t[2],'<section class=listing><h1>'+e(t[2])+'</h1>'+chipList(l,'')+'</section>')}
if(route==='spreadsheet')return await catalogPage(u,l);
if(route==='image-search')return layout(u,l,visualLabel(l),visualPage(l));
if(route==='product'&&productPath.test('/'+rest.join('/'))){
 const path='/'+rest.join('/'), html=await read(path), p=detail(html);
 if(!p.id)return layout(u,l,'404','404',404);
 p.path=path;p.match=u.searchParams.get('match');
 
 await prepareProductNames([p.name],l);
 return layout(u,l,title(p.name,l,path),await upgradedProduct(html,p,l));
}
if(route==='guide'){return layout(u,l,t[3],'<section class=listing><h1>'+e(t[3])+'</h1>'+[[t[10],t[31]],[t[18],t[41]],[t[23],t[39]],[t[19],t[24]]].map(a=>'<details open><summary>'+e(a[0])+'</summary><p>'+e(a[1])+'</p></details>').join('')+'</section>')}
return layout(u,l,'404','404',404)
}catch(err){return layout(u,l,t[34],'<section class=listing><h2>'+e(t[34])+'</h2><a href="'+e(u.pathname+u.search)+'">'+e(t[35])+'</a></section>',err.message==='404'?404:503)}}}

