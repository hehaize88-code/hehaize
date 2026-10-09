// Public catalogue adapter. All catalogue reads come from cnbuycha.com.
const DATA_ORIGIN = 'https://cnbuycha.com';
const REGISTER_URL = 'https://www.uufinds.com/register';
const CATEGORIES = ['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const LANGS = ['en','en-gb','de','pl','pt-br'];
const COPY = {
 en: ['Products & QC photos','Search products or source ID','Search','Latest','Popular','Price: low to high','Search by image','Browse the full spreadsheet','Product photos / QC','Open in UUFinds','Register on UUFinds','Previous','Next','No products found. Try another keyword.','Product ID','Product images from the source catalogue. Check the exact item, option and photo context before buying.','Choose an image to find visually similar catalogue products. Images are compared on your device.','Related products','All products','Image search compares visual similarity; it does not confirm an identical item.','Catalogue temporarily unavailable. Please try again.'],
 de: ['Produkte & QC-Bilder','Produkte oder Artikel-ID suchen','Suchen','Neueste','Beliebt','Preis: aufsteigend','Bildersuche','Das komplette Spreadsheet ansehen','Produktbilder / QC','Bei UUFinds öffnen','Bei UUFinds registrieren','Zurück','Weiter','Keine Produkte gefunden. Versuche einen anderen Suchbegriff.','Artikel-ID','Bilder aus dem Quellkatalog. Prüfe den genauen Artikel, die Variante und den Bildkontext vor dem Kauf.','Wähle ein Bild für ähnliche Produkte aus dem Katalog. Der Vergleich erfolgt auf deinem Gerät.','Ähnliche Produkte','Alle Produkte','Visuelle Ähnlichkeit bestätigt nicht, dass es derselbe Artikel ist.','Katalog vorübergehend nicht verfügbar. Bitte erneut versuchen.'],
 pl: ['Produkty i zdjęcia QC','Szukaj produktu lub ID','Szukaj','Najnowsze','Popularne','Cena: rosnąco','Szukaj obrazem','Przeglądaj cały spreadsheet','Zdjęcia produktu / QC','Otwórz w UUFinds','Zarejestruj się w UUFinds','Wstecz','Dalej','Brak produktów. Spróbuj innego hasła.','ID produktu','Zdjęcia z katalogu źródłowego. Przed zakupem sprawdź produkt, wariant i kontekst zdjęć.','Wybierz zdjęcie, aby znaleźć podobne produkty. Porównanie odbywa się na Twoim urządzeniu.','Podobne produkty','Wszystkie produkty','Podobieństwo zdjęć nie potwierdza identyczności produktu.','Katalog jest chwilowo niedostępny. Spróbuj ponownie.'],
 'pt-br': ['Produtos e fotos QC','Buscar produto ou ID','Buscar','Novidades','Populares','Preço: menor primeiro','Buscar por imagem','Explorar a planilha completa','Fotos do produto / QC','Abrir no UUFinds','Cadastrar no UUFinds','Anterior','Próxima','Nenhum produto encontrado. Tente outra palavra.','ID do produto','Imagens do catálogo de origem. Confira o item, a opção e o contexto das fotos antes de comprar.','Escolha uma imagem para encontrar produtos semelhantes. A comparação ocorre no seu dispositivo.','Produtos relacionados','Todos os produtos','Semelhança visual não confirma que seja o mesmo produto.','Catálogo temporariamente indisponível. Tente novamente.']
};
const CATEGORY_LABELS = {
 en:['All products','Shoes','Hoodies','T-Shirts','Jackets','Pants / Shorts','Headwear','Accessories','Short Sets','Electronics','Other','Jerseys'],
 de:['Alle Produkte','Schuhe','Hoodies','T-Shirts','Jacken','Hosen / Shorts','Kopfbedeckungen','Accessoires','Sets','Elektronik','Weitere','Trikots'],
 pl:['Wszystkie','Buty','Bluzy','T-shirty','Kurtki','Spodnie / Szorty','Czapki','Akcesoria','Zestawy','Elektronika','Inne','Koszulki sportowe'],
 'pt-br':['Todos','Calçados','Moletons','Camisetas','Jaquetas','Calças / Shorts','Bonés','Acessórios','Conjuntos','Eletrônicos','Outros','Camisas esportivas']
};
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,x)=>String.fromCodePoint(x[0].toLowerCase()==='x'?parseInt(x.slice(1),16):Number(x))).replace(/&(amp|quot|apos|lt|gt);/g,(_,x)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[x]));
const textOnly = s => decode(String(s||'').replace(/<[^>]*>/g,''));
const first = (s,re) => decode(s.match(re)?.[1]||'');
function imageUrl(raw) {
 try { const u=new URL(decode(raw),DATA_ORIGIN); return u.protocol==='https:'?u.href:''; } catch {return '';}
}
function parseList(html) {
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
function parseDetail(html) {
 const section=html.split('<section class="product-detail"')[1]?.split('</section>')[0]||'';
 const id=first(section,/<meta itemprop="sku" content="([^"]+)"/);
 const images=[...section.matchAll(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/g)].map(m=>imageUrl(m[1])).filter(Boolean);
 return {title:textOnly(first(section,/<h1[^>]*>([\s\S]*?)<\/h1>/)),sourceId:id,price:first(section,/<meta itemprop="price" content="([^"]+)"/),images:[...new Set(images)],sourceUrl:first(section,/href="(https:\/\/weidian\.com\/[^\"]+)"/),related:parseList(html).products};
}
// UUFinds' public detail/v2 resolver accepts the source ID with spuNo + channel.
// Verified 2026-10-09: 7861175344 resolves to d2d97149c6d54550803b9d49f95cee7d.
// Never reuse another item's QC UUID or seller_id when generating a link.
function buyUrl(sourceId) {
 if(!/^\d{5,20}$/.test(String(sourceId)))return null;
 const u=new URL('https://www.uufinds.com/goodItemDetail/qc/'+sourceId);
 u.searchParams.set('spuNo',sourceId);u.searchParams.set('channel','weidian');return u.href;
}
const prefix=lang=>lang==='en'?'':`/${lang}`;
const base=lang=>`${prefix(lang)}/catalog`;
const localPath=(path,lang)=>`${base(lang)}${path==='/AllProducts/'?'/':path}`;
const money=p=>Number.isFinite(Number(p))&&p!==''?'$'+Number(p).toFixed(2):'—';
const labels=lang=>COPY[lang]||COPY.en;
function nav(lang,path) {
 const t=labels(lang);
 return `<header class="catalog-header"><a class="catalog-brand" href="${prefix(lang)}/"><img class="catalog-wordmark" src="/uufinds-official-logo.png" width="170" height="42" alt="UUFinds"><small>SPREADSHEET</small></a><nav><a href="${base(lang)}/">${t[18]}</a><a href="${prefix(lang)}/articles/">${({de:'Artikel',pl:'Artykuły','pt-br':'Artigos'})[lang]||'Guides'}</a></nav><div class="catalog-actions"><details><summary>${lang.toUpperCase()}</summary><div class="catalog-languages">${LANGS.map(l=>`<a href="${prefix(l)}${path}" hreflang="${l}">${l.toUpperCase()}</a>`).join('')}</div></details><a class="register" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer" data-track-event="register_click">${t[10]} ↗</a></div></header>`;
}
function shell(lang,path,title,description,body,{noindex=false,status=200}={}) {
 const canonical='https://uufindssheet.com'+prefix(lang)+path;
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | UUFinds Spreadsheet</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="${noindex?'noindex,follow':'index,follow'}"><link rel="canonical" href="${canonical}">${LANGS.map(l=>`<link rel="alternate" hreflang="${l}" href="https://uufindssheet.com${prefix(l)}${path}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://uufindssheet.com${path}"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/catalog.css?v=1"><script src="/catalog.js?v=1" defer></script></head><body>${nav(lang,path)}<main class="catalog-main" data-locale="${lang}">${body}</main><footer class="catalog-footer">${({de:'Unabhängiges Spreadsheet. Nicht von UUFinds betrieben.',pl:'Niezależny spreadsheet. Serwis nie jest prowadzony przez UUFinds.','pt-br':'Planilha independente. Não operada pelo UUFinds.'})[lang]||'Independent spreadsheet. Not operated by UUFinds.'}<a href="${prefix(lang)}/">UUFinds Spreadsheet</a></footer></body></html>`;
 return new Response(html,{status,headers:{'content-type':'text/html; charset=utf-8','content-language':lang,'cache-control':'public, max-age=0, s-maxage=60','x-content-type-options':'nosniff','x-catalog-source':DATA_ORIGIN,'x-uufinds-release':'2026-10-09-catalog-v2'}});
}
function card(p,lang) {
 return `<article class="catalog-card"><a href="${localPath(p.path,lang)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" width="400" height="400" loading="lazy"><h2>${escapeHtml(p.title)}</h2><div class="card-meta"><strong>${money(p.price)}</strong><span>USD · QC ↗</span></div></a></article>`;
}
function searchForm(lang,q='',category='AllProducts',sort='new') {
 const t=labels(lang);
 return `<form class="catalog-search" action="${localPath('/'+category+'/',lang)}" method="get" role="search"><label class="sr-only" for="catalog-query">${t[1]}</label><input id="catalog-query" name="q" value="${escapeHtml(q)}" placeholder="${t[1]}" type="search" maxlength="100"><input type="hidden" name="sort" value="${sort}"><button>${t[2]} →</button></form>`;
}
async function upstream(path,params) {
 const u=new URL(path,DATA_ORIGIN);if(params)u.search=params.toString();
 const r=await fetch(u.href,{headers:{accept:'text/html'},redirect:'follow',signal:AbortSignal.timeout(18000)});
 if(new URL(r.url||u.href).origin!==DATA_ORIGIN)throw new Error('Unexpected catalogue destination');
 if(!r.ok)throw new Error('Catalogue response '+r.status);
 return r.text();
}
async function catalogueRoute(request,env) {
 const url=new URL(request.url),match=url.pathname.match(/^\/(?:(en-gb|de|pl|pt-br)\/)?catalog(?:\/(.*))?$/);
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
 if(tail==='search.html') {
  const destination=new URL(base(lang)+'/',url.origin);destination.search=url.search;
  destination.searchParams.set('q',destination.searchParams.get('keywords')||destination.searchParams.get('q')||'');
  destination.searchParams.delete('keywords');destination.searchParams.delete('channelid');
  return Response.redirect(destination.href,302);
 }
 if(tail==='image-search/') {
  return shell(lang,path,`UUFinds ${t[6]}`,t[16],`<p class="catalog-eyebrow">UUFINDS SPREADSHEET</p><h1>${t[6]}</h1><p>${t[16]}</p><section class="image-search-panel"><label for="image-file" class="image-drop">${t[6]}<input id="image-file" type="file" accept="image/jpeg,image/png,image/webp"></label><img id="image-preview" alt="" hidden><p id="image-status" role="status" aria-live="polite"></p><p class="catalog-note">${t[19]}</p></section><div class="catalog-grid" id="image-results"></div>`,{noindex:true});
 }
 try {
  if(/^[a-z0-9-]+\/\d+\.html$/i.test(tail)) {
   const product=parseDetail(await upstream('/'+tail));if(!product.title)return shell(lang,path,'Product unavailable','',`<h1>${t[13]}</h1>`,{status:404,noindex:true});
   const buy=buyUrl(product.sourceId);
   return shell(lang,path,product.title,`${product.title}. ${t[8]}. ${t[15]}`,`<a class="back" href="${base(lang)}/">← ${t[7]}</a><section class="catalog-detail"><div class="catalog-gallery"><div class="gallery-main"><button type="button" data-gallery-prev aria-label="${t[11]}">‹</button><img id="gallery-main" src="${escapeHtml(product.images[0]||'')}" alt="${escapeHtml(product.title)}" width="800" height="800"><button type="button" data-gallery-next aria-label="${t[12]}">›</button></div><div class="gallery-thumbs">${product.images.map((im,i)=>`<button type="button" data-gallery-index="${i}" aria-label="${t[8]} ${i+1}" aria-current="${i===0}"><img src="${escapeHtml(im)}" alt="${escapeHtml(product.title)} ${i+1}" width="120" height="120" loading="lazy"></button>`).join('')}</div></div><div class="catalog-product-info"><p class="catalog-eyebrow">UUFINDS SPREADSHEET</p><h1>${escapeHtml(product.title)}</h1><p>${t[14]}: <strong>${escapeHtml(product.sourceId)}</strong></p><p class="detail-price">${money(product.price)} <small>USD</small></p>${buy?`<a class="buy-button" href="${escapeHtml(buy)}" target="_blank" rel="noopener noreferrer" data-track-event="uufinds_product_click">${t[9]} ↗</a>`:''}<h2>${t[8]}</h2><p>${t[15]}</p></div></section><h2>${t[17]}</h2><div class="catalog-grid">${product.related.slice(0,8).map(p=>card(p,lang)).join('')}</div>`);
  }
  const cat=tail.replace(/\/$/,'')||'AllProducts';if(!CATEGORIES.includes(cat))return shell(lang,path,'Not found','',`<h1>404</h1>`,{status:404,noindex:true});
  const q=(url.searchParams.get('q')||url.searchParams.get('keywords')||'').trim().slice(0,100);
  const sort=['new','click','price'].includes(url.searchParams.get('sort'))?url.searchParams.get('sort'):'new';
  const page=Math.min(10000,Math.max(1,Number.parseInt(url.searchParams.get('page')||'1')||1));
  const params=new URLSearchParams({q,sort,page:String(page)}),data=parseList(await upstream('/'+cat+'/',params));
  const route=localPath('/'+cat+'/',lang),link=(s,p=1)=>`${route}?${new URLSearchParams({q,sort:s,page:String(p)})}`;
  const names=CATEGORY_LABELS[lang]||CATEGORY_LABELS.en,categoryTitle=names[CATEGORIES.indexOf(cat)];
  const title=cat==='AllProducts'?t[0]:`UUFinds ${categoryTitle} Spreadsheet`;
  return shell(lang,path,title,`${title}. ${t[15]}`,`<p class="catalog-eyebrow">UUFINDS SPREADSHEET · USD</p><h1>${title}</h1><div class="catalog-tools">${searchForm(lang,q,cat,sort)}<a class="image-search-link" href="${base(lang)}/image-search/">▧ ${t[6]}</a></div><nav class="category-filters">${CATEGORIES.map((c,i)=>`<a href="${localPath('/'+c+'/',lang)}" ${c===cat?'aria-current="page"':''}>${names[i]}</a>`).join('')}</nav><div class="sort-row">${[['new',t[3]],['click',t[4]],['price',t[5]]].map(([s,n])=>`<a href="${link(s)}" ${sort===s?'aria-current="page"':''}>${n}</a>`).join('')}<span>${page} / ${Math.max(page,data.pages)}</span></div><div class="catalog-grid">${data.products.length?data.products.map(p=>card(p,lang)).join(''):`<p class="empty-state">${t[13]}</p>`}</div><nav class="catalog-pagination">${page>1?`<a href="${link(sort,page-1)}">← ${t[11]}</a>`:''}${page<data.pages?`<a href="${link(sort,page+1)}">${t[12]} →</a>`:''}</nav>`,{noindex:!!q||sort!=='new'||page>1});
 } catch { return shell(lang,path,t[20],t[20],`<h1>${t[20]}</h1><a href="${base(lang)}/">${t[7]}</a>`,{status:503,noindex:true}); }
}

const GA4_SNIPPET = "<script async src=\"/ga4-tag.js\"></script><script src=\"/ga4-init.js\"></script>";
async function googleAnalyticsAsset(request) {
  const url = new URL(request.url);
  if (url.pathname === "/ga4-init.js") return new Response("window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-QY8MM7VZV2');", { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "public, max-age=3600" } });
  if (url.pathname === "/ga4-tag.js") {
    const upstream = await fetch("https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2");
    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "public, max-age=3600");
    headers.delete("set-cookie");
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers });
  }
  return null;
}
function withGoogleAnalytics(response, request) {
  const contentType = response.headers.get("content-type") || "";
  if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length"); headers.delete("content-encoding"); headers.delete("etag");
  if (response.status === 200 && !headers.has("x-catalog-source")) headers.set("cache-control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
  const csp = headers.get("content-security-policy");
  if (csp) headers.set("content-security-policy", csp.replace("connect-src 'self'", "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com"));
  const htmlResponse = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return new HTMLRewriter().on("head", { element(element) { element.append(GA4_SNIPPET, { html: true }); } }).transform(htmlResponse);
}

const CANONICAL_HOST = "uufindssheet.com";
const REDIRECT_HOSTS = new Set([
  "www.uufindssheet.com",
  "uufindssheet-com.pages.dev",
]);
const ROUTE_LANGUAGES = new Map([
  ["en-gb", "en-GB"],
  ["de", "de"],
  ["pl", "pl"],
  ["pt-br", "pt-BR"],
]);
const TRACK_PATH = "/__track";
const HTML_CACHE_VERSION = "2026-10-09-catalog-v2";

function htmlCacheKey(request) {
  const url = new URL(request.url);
  url.searchParams.set("__site_cache_version", HTML_CACHE_VERSION);
  return new Request(url.toString(), { method: "GET", headers: request.headers });
}

function languageForPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return ROUTE_LANGUAGES.get(firstSegment) || "en";
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === TRACK_PATH) {
      if (request.method !== "POST") {
        return new Response(null, {
          status: 405,
          headers: { allow: "POST", "x-robots-tag": "noindex, nofollow" },
        });
      }

      const origin = request.headers.get("origin");
      if (origin && new URL(origin).hostname !== CANONICAL_HOST) {
        return new Response(null, { status: 403 });
      }

      const declaredLength = Number(request.headers.get("content-length") || 0);
      if (declaredLength > 2048) {
        return new Response(null, { status: 413 });
      }

      try {
        const payload = await request.json();
        const clean = (value, limit) =>
          typeof value === "string"
            ? value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, limit)
            : "";
        const trackedEvent = {
          type: "uufindssheet_event",
          event: clean(payload.event, 40),
          page: clean(payload.page, 180),
          destination: clean(payload.destination, 180),
          label: clean(payload.label, 100),
          itemId: clean(payload.itemId, 40),
          category: clean(payload.category, 60),
          ctaPosition: clean(payload.ctaPosition, 60),
          language: clean(payload.language, 16),
          recordedAt: new Date().toISOString(),
        };
        console.log(JSON.stringify(trackedEvent));
      } catch {
        return new Response(null, { status: 400 });
      }

      return new Response(null, {
        status: 204,
        headers: {
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) {
      return response;
    }

    const language = languageForPath(url.pathname);
    const rawHtml = await response.text();
    const isNotFoundDocument = response.status === 200
      && rawHtml.includes("<title>404: This page could not be found.</title>")
      && rawHtml.includes('name="robots" content="noindex"');
    const html = rawHtml.replace(
      /<html\s+lang=(["'])[^"']*\1/i,
      `<html lang="${language}"`,
    );
    const headers = new Headers(response.headers);
    headers.set("content-language", language);
    headers.delete("content-length");
    headers.delete("etag");

    return new Response(html, {
      status: isNotFoundDocument ? 404 : response.status,
      statusText: isNotFoundDocument ? "Not Found" : response.statusText,
      headers,
    });
  },
};

const googleAnalyticsWorker = {
  async fetch(request, env, ctx) {
    const analyticsAsset = await googleAnalyticsAsset(request);
    if (analyticsAsset) return analyticsAsset;

    const url = new URL(request.url);
    if (url.pathname === "/sitemap.xml") return new Response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://uufindssheet.com/editorial-sitemap.xml</loc></sitemap><sitemap><loc>https://uufindssheet.com/catalog-sitemap.xml</loc></sitemap></sitemapindex>', {headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=300"}});
    if (url.pathname === "/editorial-sitemap.xml") return env.ASSETS.fetch(new Request(new URL('/sitemap.xml',url.origin),request));
    if (url.pathname === "/catalog-sitemap.xml") {
      try {
        const xml=await upstream('/sitemap.xml');
        const paths=[...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p) || CATEGORIES.some(c=>p==='/'+c+'/'));
        const entries=LANGS.flatMap(l=>paths.map(p=>'<url><loc>https://uufindssheet.com'+localPath(p,l)+'</loc></url>')).join('');
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=600"}});
      } catch {return new Response('Sitemap temporarily unavailable',{status:503});}
    }
    const legacyLocale = url.pathname.match(/^\/(en-gb|de|pl|pt-br)(?=\/)/)?.[0] || "";
    const barePath = url.pathname.slice(legacyLocale.length);
    const legacyProducts = {"/products/skyline-floatx-running-hiking-shoes/": "/shoes/3328.html", "/products/loose-printed-hooded-sweater/": "/hoodies-sweaters/3373.html", "/products/printed-short-sleeve-collection-2/": "/t-shirts/3332.html", "/products/autumn-winter-loose-fitting-coat/": "/jackets/3402.html", "/products/hello-kitty-plush-lounge-pants/": "/pants-shorts/3337.html", "/products/mlb-world-series-baseball-cap-collection/": "/headwear/3315.html", "/products/xjxpcs-fashion-backpack/": "/accessories/3295.html", "/products/galaxy-watch-ultra-8-smartwatch/": "/electronics/3286.html"};
    if (barePath === "/products/" || barePath === "/finds/" || barePath === "/search.html") {
      const destination = new URL(legacyLocale + "/catalog/", url.origin);
      destination.search = url.search;
      if (destination.searchParams.has("keywords")) { destination.searchParams.set("q", destination.searchParams.get("keywords")); destination.searchParams.delete("keywords"); }
      destination.searchParams.delete("channelid");
      return Response.redirect(destination.href, 302);
    }
    const legacyProduct = legacyProducts[barePath];
    if (legacyProduct) return Response.redirect(url.origin + legacyLocale + "/catalog" + legacyProduct, 302);
    const catalogue = await catalogueRoute(request, env);
    if (catalogue) return withGoogleAnalytics(catalogue, request);
    const cacheKey = request.method === "GET" ? htmlCacheKey(request) : null;
    if (request.method === "GET") {
      const cached = await caches.default.match(cacheKey);
      if (cached) return cached;
    }

    const response = withGoogleAnalytics(await worker.fetch(request, env, ctx), request);
    const contentType = response.headers.get("content-type") || "";
    if (request.method === "GET" && response.status === 200 && contentType.toLowerCase().includes("text/html")) {
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    }
    return response;
  },
};

export default googleAnalyticsWorker;
