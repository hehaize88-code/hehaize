import {titleTranslations} from './titles.js';
import {PRODUCT_UI,LANG_NAMES} from './product-ui.js';
import {productGlossaries} from './product-glossaries.js';
import {translateProductTitle} from '../public/commerce/product-title.js';
import {CURRENCIES} from './experience.js';
import {EDITORIAL} from './content.js';
import {ADDITIONAL_COPY, ADDITIONAL_CATEGORIES, EXTRA, NAV_LABELS} from './translations.js';
// Public catalogue adapter. All catalogue reads come from cnbuycha.com.
export const DATA_ORIGIN = 'https://cnbuycha.com';
export const REGISTER_URL = 'https://joyagoo.com/login';
export const CATEGORIES = ['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
export const LANGS = ['en','zh','de','pl','es','it','fr','pt','ro','sv'];
export const COPY = {
 en: ['Products & QC photos','Search products or source ID','Search','Latest','Popular','Price: low to high','Search by image','Browse the full spreadsheet','Product photos / QC','Open in Joyagoo','Register on Joyagoo','Previous','Next','No products found. Try another keyword.','Product ID','Product images from the source catalogue. Check the exact item, option and photo context before buying.','Choose an image to find visually similar catalogue products. Images are compared on your device.','Related products','All products','Image search compares visual similarity; it does not confirm an identical item.','Catalogue temporarily unavailable. Please try again.'],
 de: ['Produkte & QC-Bilder','Produkte oder Artikel-ID suchen','Suchen','Neueste','Beliebt','Preis: aufsteigend','Bildersuche','Das komplette Spreadsheet ansehen','Produktbilder / QC','Bei Joyagoo öffnen','Bei Joyagoo registrieren','Zurück','Weiter','Keine Produkte gefunden. Versuche einen anderen Suchbegriff.','Artikel-ID','Bilder aus dem Quellkatalog. Prüfe den genauen Artikel, die Variante und den Bildkontext vor dem Kauf.','Wähle ein Bild für ähnliche Produkte aus dem Katalog. Der Vergleich erfolgt auf deinem Gerät.','Ähnliche Produkte','Alle Produkte','Visuelle Ähnlichkeit bestätigt nicht, dass es derselbe Artikel ist.','Katalog vorübergehend nicht verfügbar. Bitte erneut versuchen.'],
 pl: ['Produkty i zdjęcia QC','Szukaj produktu lub ID','Szukaj','Najnowsze','Popularne','Cena: rosnąco','Szukaj obrazem','Przeglądaj cały spreadsheet','Zdjęcia produktu / QC','Otwórz w Joyagoo','Zarejestruj się w Joyagoo','Wstecz','Dalej','Brak produktów. Spróbuj innego hasła.','ID produktu','Zdjęcia z katalogu źródłowego. Przed zakupem sprawdź produkt, wariant i kontekst zdjęć.','Wybierz zdjęcie, aby znaleźć podobne produkty. Porównanie odbywa się na Twoim urządzeniu.','Podobne produkty','Wszystkie produkty','Podobieństwo zdjęć nie potwierdza identyczności produktu.','Katalog jest chwilowo niedostępny. Spróbuj ponownie.'],
 pt: ['Produtos e fotos QC','Buscar produto ou ID','Buscar','Novidades','Populares','Preço: menor primeiro','Buscar por imagem','Explorar a planilha completa','Fotos do produto / QC','Abrir no Joyagoo','Cadastrar no Joyagoo','Anterior','Próxima','Nenhum produto encontrado. Tente outra palavra.','ID do produto','Imagens do catálogo de origem. Confira o item, a opção e o contexto das fotos antes de comprar.','Escolha uma imagem para encontrar produtos semelhantes. A comparação ocorre no seu dispositivo.','Produtos relacionados','Todos os produtos','Semelhança visual não confirma que seja o mesmo produto.','Catálogo temporariamente indisponível. Tente novamente.']
};
export const CATEGORY_LABELS = {
 en:['All products','Shoes','Hoodies','T-Shirts','Jackets','Pants / Shorts','Headwear','Accessories','Short Sets','Electronics','Other','Jerseys'],
 de:['Alle Produkte','Schuhe','Hoodies','T-Shirts','Jacken','Hosen / Shorts','Kopfbedeckungen','Accessoires','Sets','Elektronik','Weitere','Trikots'],
 pl:['Wszystkie','Buty','Bluzy','T-shirty','Kurtki','Spodnie / Szorty','Czapki','Akcesoria','Zestawy','Elektronika','Inne','Koszulki sportowe'],
 pt:['Todos','Calçados','Moletons','Camisetas','Jaquetas','Calças / Shorts','Bonés','Acessórios','Conjuntos','Eletrônicos','Outros','Camisas esportivas']
};
Object.assign(COPY,ADDITIONAL_COPY);
Object.assign(CATEGORY_LABELS,ADDITIONAL_CATEGORIES);
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,x)=>String.fromCodePoint(x[0].toLowerCase()==='x'?parseInt(x.slice(1),16):Number(x))).replace(/&(amp|quot|apos|lt|gt);/g,(_,x)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[x]));
const textOnly = s => decode(String(s||'').replace(/<[^>]*>/g,''));
const first = (s,re) => decode(s.match(re)?.[1]||'');
export function imageUrl(raw) {
 try { const u=new URL(decode(raw),DATA_ORIGIN); return u.protocol==='https:'?u.href:''; } catch {return '';}
}
export function parseList(html) {
 const products=[];
 for(const m of html.matchAll(/<article class="product-card[^>]*>([\s\S]*?)<\/article>/g)) {
  const b=m[1], path=first(b,/<a href="([^"]+)"/);
  if(!/^\/[a-z0-9-]+\/\d+\.html$/i.test(path))continue;
  products.push({path,title:textOnly(first(b,/<h3>([\s\S]*?)<\/h3>/)),image:imageUrl(first(b,/<img[^>]+src="([^"]+)"/)),price:first(b,/data-currency="USD"[^>]*>([\d.]+)/),views:Number(first(b,/product-views[^>]*>[\s\S]*?<span>(\d+)<\/span>/))});
 }
 const total=Number(first(html,/<div class="results-summary">([\d,]+) products/).replaceAll(',',''));
 const pages=Math.max(1,Math.ceil(total/60));
 return {products,pages,total};
}
export function parseDetail(html) {
 const section=html.split('<section class="product-detail"')[1]?.split('</section>')[0]||'';
 const id=first(section,/<div class="product-id">ID: ([^<]*)<\/div>/);
 const images=[...section.matchAll(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/g)].map(m=>imageUrl(m[1])).filter(Boolean);
 return {title:textOnly(first(section,/<h1[^>]*>([\s\S]*?)<\/h1>/)),sourceId:id,price:first(section,/<meta itemprop="price" content="([^"]+)"/),images:[...new Set(images)],sourceUrl:/^\d{5,20}$/.test(id)?`https://weidian.com/item.html?itemID=${id}`:'',related:parseList(html).products};
}
// Use the source marketplace ID, never the catalogue's internal numeric route ID.
export function buyUrl(sourceId) {
 if(!/^\d{5,20}$/.test(String(sourceId)))return null;
 return 'https://joyagoo.com/product?'+new URLSearchParams({id:String(sourceId),platform:'WEIDIAN'});
}
const prefix=lang=>lang==='en'?'':`/${lang}`;
const base=lang=>`${prefix(lang)}/catalog`;
const localPath=(path,lang)=>`${base(lang)}${path==='/AllProducts/'?'/':path}`;
const money=p=>Number.isFinite(Number(p))&&p!==''?'$'+Number(p).toFixed(2):'—';
const labels=lang=>COPY[lang]||COPY.en;
export function nav(lang,path,supportedLanguages=LANGS) {
 const t=labels(lang);
 return `<header class="catalog-header" data-site-template="joyagoo-discovery"><a class="catalog-brand" href="${prefix(lang)}/" aria-label="${EXTRA[lang].home}"><img class="catalog-wordmark" src="/joyagoo-official-logo.svg" width="170" height="42" alt="Joyagoo"><small>SPREADSHEET</small></a><nav><a href="${prefix(lang)}/">${EXTRA[lang].home}</a><a href="${base(lang)}/">${t[18]}</a><a href="${prefix(lang)}/guides/">${NAV_LABELS[lang][0]}</a><a href="${prefix(lang)}/articles/">${EXTRA[lang].articles}</a><a href="${prefix(lang)}/faq/">${NAV_LABELS[lang][1]}</a></nav><div class="catalog-actions"><details><summary>${LANG_NAMES[lang]}</summary><div class="catalog-languages">${supportedLanguages.map(l=>`<a href="${prefix(l)}${escapeHtml(path)}" hreflang="${l}">${LANG_NAMES[l]}</a>`).join('')}</div></details><select class="catalog-currency" data-currency-select aria-label="${PRODUCT_UI[lang]?.Currency||'Currency'}">${CURRENCIES.map(code=>`<option value="${code}">${code}</option>`).join('')}</select><a class="register" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer" data-track-event="register_click">${t[10]} ↗</a></div></header>`;
}
export function footer(lang) {
 return `<footer class="catalog-footer"><div><a class="footer-title" href="${prefix(lang)}/">Joyagoo Spreadsheet</a><p>${EXTRA[lang].independent}</p></div><nav><a href="${prefix(lang)}/catalog/">${COPY[lang][18]}</a><a href="${prefix(lang)}/guides/">${NAV_LABELS[lang][0]}</a><a href="${prefix(lang)}/articles/">${EXTRA[lang].articles}</a><a href="${prefix(lang)}/faq/">${NAV_LABELS[lang][1]}</a></nav></footer>`;
}
export function shell(lang,path,title,description,body,{noindex=false,status=200,query=''}={}) {
 const canonical='https://joyagoochina.org'+prefix(lang)+path;
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}${title.includes('Joyagoo Spreadsheet')?'':' | Joyagoo Spreadsheet'}</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="${noindex?'noindex,follow':'index,follow'}"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:image" content="https://joyagoochina.org/joyagoo-official-logo.svg">${LANGS.map(l=>`<link rel="alternate" hreflang="${l}" href="https://joyagoochina.org${prefix(l)}${path}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://joyagoochina.org${path}"><link rel="icon" href="/joyagoo-official-icon.png"><link rel="stylesheet" href="/catalog.css?v=20261016-seo"><link rel="stylesheet" href="/mobile-inner.css?v=20261013-inner-v2"><link rel="stylesheet" href="/commerce/product.css?v=20261112"><script type="module" src="/catalog.js?v=20261112-images-v2"></script><script type="module" src="/commerce/client.js?v=20261112"></script><script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-QY8MM7VZV2");</script><link rel="stylesheet" href="/mobile-compact.css?v=20261112-v3"><script defer src="/mobile-reading.js?v=20261112-v3"></script></head><body>${nav(lang,path+query)}<main class="catalog-main" data-locale="${lang}">${body}</main>${footer(lang)}</body></html>`;
 return new Response(html,{status,headers:{'content-type':'text/html; charset=utf-8','content-language':lang,'cache-control':status>=400?'no-store':'public, max-age=0, s-maxage=60','x-content-type-options':'nosniff','x-catalog-source':DATA_ORIGIN,'x-joyagoo-release':'2026-11-12-joyagoo-mobile-images-v2'}});
}
export function productsForCategory(products, category) {
 // Confirmed upstream taxonomy error. Keep the item discoverable in All Products;
 // preserve its existing detail URL and the upstream pagination contract.
 return category === 'shoes' ? products.filter(p => p.path !== '/shoes/3448.html' || !/^wedding flower arch$/i.test(p.title.trim())) : products;
}
export function card(p,lang) {
 p={...p,title:translateProductTitle(p.title,lang,productGlossaries,titleTranslations)};
 return `<article class="catalog-card"><a href="${localPath(p.path,lang)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" width="400" height="400" loading="lazy"><h2>${escapeHtml(p.title)}</h2><div class="card-meta"><strong data-price-amount="${escapeHtml(p.price)}" data-price-currency="USD">${money(p.price)}</strong><span><span data-currency-code>USD</span> · ${EXTRA[lang].photos} ↗</span></div></a></article>`;
}
export function buyingGuides(lang) {
 return `<aside class="catalog-reading"><h2>${NAV_LABELS[lang][0]}</h2><ul>${EDITORIAL[lang].buyingGuides.map(a=>`<li><a href="${prefix(lang)}/${escapeHtml(a.slug)}/" data-track-event="article_open">${escapeHtml(a.title)}</a></li>`).join('')}</ul></aside>`;
}
export function searchForm(lang,q='',category='AllProducts',sort='new') {
 const t=labels(lang);
 return `<form class="catalog-search" action="${localPath('/'+category+'/',lang)}" method="get" role="search"><label class="sr-only" for="catalog-query">${t[1]}</label><input id="catalog-query" name="q" value="${escapeHtml(q)}" placeholder="${t[1]}" type="search" maxlength="100"><input type="hidden" name="sort" value="${sort}"><button>${t[2]} →</button></form>`;
}
export async function upstream(path,params) {
 const u=new URL(path,DATA_ORIGIN);if(params)u.search=params.toString();
 const r=await fetch(u.href,{headers:{accept:'text/html'},redirect:'follow',signal:AbortSignal.timeout(18000)});
 if(new URL(r.url||u.href).origin!==DATA_ORIGIN)throw new Error('Unexpected catalogue destination');
 if(!r.ok){const error=new Error('Catalogue response '+r.status);error.status=r.status;throw error;}
 return r.text();
}
export async function catalogueRoute(request,env) {
 const url=new URL(request.url),match=url.pathname.match(/^\/(?:(zh|de|pl|es|it|fr|pt|ro|sv)\/)?catalog(?:\/(.*))?$/);
 if(url.pathname==='/api/catalog') {
  if(request.method!=='GET')return new Response(null,{status:405});
  try{const q=new URLSearchParams();for(const k of ['q','sort','page'])if(url.searchParams.has(k))q.set(k,url.searchParams.get(k).slice(0,100));
   const result=parseList(await upstream('/AllProducts/',q));return Response.json(result,{headers:{'cache-control':'public, max-age=60'}});
  }catch{return Response.json({error:'Catalogue unavailable'},{status:502});}
 }
 if(!match)return null;
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
 const lang=match[1]||'en',tail=match[2]||'',t=labels(lang),path='/catalog/'+tail;
 if(!url.pathname.endsWith('/')&&!tail.endsWith('.html'))return Response.redirect(url.origin+url.pathname+'/'+url.search,308);
 if(tail==='AllProducts/'||tail==='AllProducts')return Response.redirect(url.origin+base(lang)+'/'+url.search,301);
 if(tail==='search.html') {
  const destination=new URL(base(lang)+'/',url.origin);destination.search=url.search;
  destination.searchParams.set('q',destination.searchParams.get('keywords')||destination.searchParams.get('q')||'');
  destination.searchParams.delete('keywords');destination.searchParams.delete('channelid');
  return Response.redirect(destination.href,302);
 }
 if(tail==='image-search/') {
  return shell(lang,path,`Joyagoo ${t[6]}`,t[16],`<p class="catalog-eyebrow">JOYAGOO SPREADSHEET</p><h1>${t[6]}</h1><p>${t[16]}</p><section class="image-search-panel"><label for="image-file" class="image-drop">${t[6]}<input id="image-file" type="file" accept="image/jpeg,image/png,image/webp"></label><img id="image-preview" alt="" hidden><p id="image-status" role="status" aria-live="polite"></p><p class="catalog-note">${t[19]}</p></section><div class="catalog-grid" id="image-results"></div>${buyingGuides(lang)}`,{noindex:true});
 }
 try {
  if(CATEGORIES.includes(tail.split('/')[0])&&/^[a-z0-9-]+\/\d+\.html$/i.test(tail)) {
   const product=parseDetail(await upstream('/'+tail));product.title=translateProductTitle(product.title,lang,productGlossaries,titleTranslations);if(!product.title)return shell(lang,path,'Product unavailable','',`<h1>${t[13]}</h1>`,{status:404,noindex:true});
   const buy=buyUrl(product.sourceId);
   const schema=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:product.title,sku:product.sourceId,image:product.images,...(product.price?{offers:{'@type':'Offer',price:product.price,priceCurrency:'USD',url:'https://joyagoochina.org'+prefix(lang)+path}}:{})}).replace(/</g,'\\u003c');
   return shell(lang,path,product.title,`${product.title}. ${t[8]}. ${t[15]}`,`<script type="application/ld+json">${schema}</script>`+renderProductDetail(product,lang,t,buy),{query:url.search});
  }
  const cat=tail.replace(/\/$/,'')||'AllProducts';if(!CATEGORIES.includes(cat))return shell(lang,path,'Not found','',`<h1>404</h1>`,{status:404,noindex:true});
  const q=(url.searchParams.get('q')||url.searchParams.get('keywords')||'').trim().slice(0,100);
  const sort=['new','click','price'].includes(url.searchParams.get('sort'))?url.searchParams.get('sort'):'new';
  const page=Math.min(10000,Math.max(1,Number.parseInt(url.searchParams.get('page')||'1')||1));
  // Remove empty/default listing parameters without discarding campaign attribution.
  const clean=new URL(url);let normalized=false;
  for(const [key,value] of [['q',''],['sort','new'],['page','1']]) {
   if(clean.searchParams.has(key)&&clean.searchParams.getAll(key).every(v=>v===value)) {
    clean.searchParams.delete(key);normalized=true;
   }
  }
  if(normalized)return Response.redirect(clean.href,308);
  const params=new URLSearchParams({q,sort,page:String(page)}),data=parseList(await upstream('/'+cat+'/',params));
  data.products=productsForCategory(data.products,cat);
  const route=localPath('/'+cat+'/',lang),link=(s,p=1)=>{const query=new URLSearchParams();if(q)query.set('q',q);if(s!=='new')query.set('sort',s);if(p>1)query.set('page',String(p));return route+(query.size?'?'+query:'');};
  const names=CATEGORY_LABELS[lang]||CATEGORY_LABELS.en,categoryTitle=names[CATEGORIES.indexOf(cat)];
  const title=cat==='AllProducts'?t[0]:`Joyagoo ${categoryTitle} Spreadsheet`;
  return shell(lang,path,title,`${title}. ${t[15]}`,`<p class="catalog-eyebrow">JOYAGOO SPREADSHEET · USD</p><h1>${title}</h1><div class="catalog-tools">${searchForm(lang,q,cat,sort)}<a class="image-search-link" href="${base(lang)}/image-search/">▧ ${t[6]}</a></div><nav class="category-filters">${CATEGORIES.map((c,i)=>`<a href="${localPath('/'+c+'/',lang)}" ${c===cat?'aria-current="page"':''}>${names[i]}</a>`).join('')}</nav><div class="sort-row">${[['new',t[3]],['click',t[4]],['price',t[5]]].map(([s,n])=>`<a href="${link(s)}" ${sort===s?'aria-current="page"':''}>${n}</a>`).join('')}<span>${page} / ${Math.max(page,data.pages)}</span></div><div class="catalog-grid">${data.products.length?data.products.map(p=>card(p,lang)).join(''):`<p class="empty-state">${t[13]}</p>`}</div>${buyingGuides(lang)}<nav class="catalog-pagination">${page>1?`<a href="${link(sort,page-1)}">← ${t[11]}</a>`:''}${page<data.pages?`<a href="${link(sort,page+1)}">${t[12]} →</a>`:''}</nav>`,{noindex:!!q||sort!=='new'||page>1,query:url.search});
 } catch(error) { if(error.status===404)return shell(lang,path,t[13],t[13],`<h1>${t[13]}</h1>`,{status:404,noindex:true}); return shell(lang,path,t[20],t[20],`<h1>${t[20]}</h1><a href="${base(lang)}/">${t[7]}</a>`,{status:503,noindex:true}); }
}

export function purchasingPlatforms(sourceId) {
 if (!/^\d{5,20}$/.test(String(sourceId))) return [];
 const id = String(sourceId), source = encodeURIComponent(`https://weidian.com/item.html?itemID=${id}`);
 return [
  ['Superbuy', `https://www.superbuy.com/en/page/buy/?url=${source}`],
  ['CSSBuy', `https://www.cssbuy.com/shop/goodsDetail?type=micro&id=${id}`],
  ['Kakobuy', `https://kakobuy.com/item/details?url=${source}`],
  ['USFans', `https://www.usfans.com/product/3/${id}`],
  ['Sugargoo', `https://www.sugargoo.com/products?productLink=${source}`],
  ['Oopbuy', `https://oopbuy.com/goods/details?id=${id}&channel=weidian`],
  ['Hipobuy', `https://hipobuy.com/product/weidian/${id}`],
  ['Litbuy', `https://litbuy.com/product/weidian/${id}`],
  ['Lovegobuy', `https://www.lovegobuy.com/product?id=${id}&shop_type=weidian`],
  ['OrientDig', `https://orientdig.com/product/?shop_type=weidian&id=${id}`],
  
 ];
}
function renderProductDetail(product,lang,t,buy) {
 const im=(url,i,kind='catalogue')=>`<button class="photo-tile" type="button" data-photo-src="${escapeHtml(url)}" data-photo-kind="${kind}" aria-label="Enlarge photo ${i+1}"><img src="${escapeHtml(url)}" alt="${escapeHtml(product.title)} ${i+1}" width="160" height="160" loading="lazy"><span>${i+1}</span></button>`;
 const markup = `<a class="back" href="${base(lang)}/">← ${t[7]}</a>
<section class="catalog-detail" data-product-detail data-source-id="${escapeHtml(product.sourceId)}" data-source-url="${escapeHtml(product.sourceUrl)}">
 <div class="catalog-gallery"><div class="section-caption"><h2>Product photos</h2><span>${product.images.length}</span></div>
  <div class="gallery-main" tabindex="0" role="region" aria-label="Product photos"><button type="button" data-gallery-prev aria-label="Previous photo">‹</button><img id="gallery-main" src="${escapeHtml(product.images[0]||'')}" alt="${escapeHtml(product.title)}" width="800" height="800"><button type="button" data-gallery-next aria-label="Next photo">›</button><button class="gallery-zoom" type="button" data-enlarge aria-label="Enlarge photo">⤢</button><span class="gallery-counter" aria-live="polite">1 / ${product.images.length}</span></div>
  <div class="gallery-thumbs" aria-label="Product photos">${product.images.map((url,i)=>`<button type="button" data-gallery-index="${i}" aria-label="Image ${i+1}" aria-current="${i===0}"><img src="${escapeHtml(url)}" alt="" width="120" height="120" loading="lazy"></button>`).join('')}</div>
 </div>
 <div class="catalog-product-info"><p class="catalog-eyebrow">JOYAGOO SPREADSHEET</p><h1>${escapeHtml(product.title)}</h1><p class="product-source-id">${t[14]}: <strong>${escapeHtml(product.sourceId)}</strong></p>
  <p class="detail-price"><span data-detail-price data-price-amount="${escapeHtml(product.price)}" data-price-currency="USD">${money(product.price)}</span> <small data-currency-code>USD</small></p><p class="detail-price-note" data-source-price></p><p class="detail-price-note">Estimated conversion. Shipping, taxes and platform fees are not included.</p><p class="rate-status" data-rate-status role="status"></p>
  ${buy?`<a class="buy-button" href="${escapeHtml(buy)}" target="_blank" rel="noopener noreferrer" data-track-event="joyagoo_product_click">${t[9]} ↗</a>`:''}
  <div class="product-action-row"><details class="agent-picker"><summary>Other buying agents <span aria-hidden="true">⌄</span></summary><div class="agent-options"><p>Open this product with another buying agent. Confirm its price and available options there.</p><label class="sr-only" for="agent-query">Search buying agents</label><input id="agent-query" type="search" placeholder="Search buying agents"><div class="agent-list">${purchasingPlatforms(product.sourceId).map(([name,href])=>`<a href="${escapeHtml(href)}" data-agent="${name.toLowerCase()}" target="_blank" rel="noopener noreferrer">${name} <span aria-hidden="true">↗</span></a>`).join('')}</div><p data-no-agents hidden>No buying agents found.</p></div></details><button type="button" class="copy-source" data-copy-source>Copy Weidian link</button></div>
  <p class="copy-status" data-copy-status role="status"></p><textarea data-copy-fallback hidden readonly aria-label="Original Weidian listing"></textarea>
  <section class="product-styles" aria-labelledby="styles-title"><div class="section-caption"><h2 id="styles-title">Styles</h2><span data-style-count></span></div><p data-options-status role="status">Loading styles…</p><button data-options-retry type="button" hidden>Retry</button><div class="style-grid" tabindex="0" role="group" aria-label="Styles" data-style-grid></div><div data-option-groups></div><p class="selected-option" data-selected-option role="status"></p><p class="style-note">Style photos are a reference. Confirm the selected style and size on the buying platform.</p><a class="original-link" href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open on Weidian ↗</a></section>
 </div>
</section>
<section class="source-photos" aria-labelledby="source-photos-title"><div class="section-caption"><h2 id="source-photos-title">QC / catalogue photos</h2><span>${product.images.length}</span></div><p>These are catalogue reference photos; they are not identified as warehouse QC.</p><div class="source-photo-grid">${product.images.map((url,i)=>im(url,i)).join('')}</div></section>
<section class="related-products"><h2>${t[17]}</h2><div class="catalog-grid">${product.related.slice(0,8).map(p=>card(p,lang)).join('')}</div></section>
<dialog class="photo-viewer" aria-label="Product photos"><button type="button" data-close-viewer aria-label="Close">×</button><img alt="${escapeHtml(product.title)}"><button type="button" data-viewer-prev aria-label="Previous photo">‹</button><button type="button" data-viewer-next aria-label="Next photo">›</button><p data-viewer-counter></p></dialog>`;
 const dictionary=PRODUCT_UI[lang]||{};
 return markup.replace(/>([^<>]+)</g,(all,text)=>{const raw=text.trim(), translated=dictionary[raw]||dictionary[raw.replace(/ ↗$/,'')];return translated?'>'+escapeHtml(translated)+(raw.endsWith(' ↗')?' ↗':'')+'<':all;}).replace(/(aria-label|placeholder)="([^"]+)"/g,(all,key,text)=>{const match=text.match(/^(Image|Enlarge photo) (\d+)$/);const value=dictionary[text]||(match&&dictionary[match[1]]?dictionary[match[1]]+' '+match[2]:null);return value?key+'="'+escapeHtml(value)+'"':all;});
}
