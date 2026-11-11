import { nav, footer, styles } from './chrome.mjs';
// Public catalogue adapter. All catalogue reads come from cnbuycha.com.
export const DATA_ORIGIN = 'https://cnbuycha.com';
export const REGISTER_URL = 'https://hubbuy.com/signUp';
export const CATEGORIES = ['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
export const LANGS = ['en','pt-br','de'];
const COPY = {
 en: ['Products & QC photos','Search products or source ID','Search','Latest','Popular','Price: low to high','Search by image','Browse the full spreadsheet','Product photos / QC','Open in Hubbuy','Register on Hubbuy','Previous','Next','No products found. Try another keyword.','Product ID','Product images from the source catalogue. Check the exact item, option and photo context before buying.','Choose an image to find visually similar catalogue products. Images are compared on your device.','Related products','All products','Image search compares visual similarity; it does not confirm an identical item.','Catalogue temporarily unavailable. Please try again.'],
 de: ['Produkte & QC-Bilder','Produkte oder Artikel-ID suchen','Suchen','Neueste','Beliebt','Preis: aufsteigend','Bildersuche','Das komplette Spreadsheet ansehen','Produktbilder / QC','Bei Hubbuy öffnen','Bei Hubbuy registrieren','Zurück','Weiter','Keine Produkte gefunden. Versuche einen anderen Suchbegriff.','Artikel-ID','Bilder aus dem Quellkatalog. Prüfe den genauen Artikel, die Variante und den Bildkontext vor dem Kauf.','Wähle ein Bild für ähnliche Produkte aus dem Katalog. Der Vergleich erfolgt auf deinem Gerät.','Ähnliche Produkte','Alle Produkte','Visuelle Ähnlichkeit bestätigt nicht, dass es derselbe Artikel ist.','Katalog vorübergehend nicht verfügbar. Bitte erneut versuchen.'],
 pl: ['Produkty i zdjęcia QC','Szukaj produktu lub ID','Szukaj','Najnowsze','Popularne','Cena: rosnąco','Szukaj obrazem','Przeglądaj cały spreadsheet','Zdjęcia produktu / QC','Otwórz w Hubbuy','Zarejestruj się w Hubbuy','Wstecz','Dalej','Brak produktów. Spróbuj innego hasła.','ID produktu','Zdjęcia z katalogu źródłowego. Przed zakupem sprawdź produkt, wariant i kontekst zdjęć.','Wybierz zdjęcie, aby znaleźć podobne produkty. Porównanie odbywa się na Twoim urządzeniu.','Podobne produkty','Wszystkie produkty','Podobieństwo zdjęć nie potwierdza identyczności produktu.','Katalog jest chwilowo niedostępny. Spróbuj ponownie.'],
 'pt-br': ['Produtos e fotos QC','Buscar produto ou ID','Buscar','Novidades','Populares','Preço: menor primeiro','Buscar por imagem','Explorar a planilha completa','Fotos do produto / QC','Abrir no Hubbuy','Cadastrar no Hubbuy','Anterior','Próxima','Nenhum produto encontrado. Tente outra palavra.','ID do produto','Imagens do catálogo de origem. Confira o item, a opção e o contexto das fotos antes de comprar.','Escolha uma imagem para encontrar produtos semelhantes. A comparação ocorre no seu dispositivo.','Produtos relacionados','Todos os produtos','Semelhança visual não confirma que seja o mesmo produto.','Catálogo temporariamente indisponível. Tente novamente.']
};
COPY.es = ["Productos y fotos QC", "Buscar productos o ID de origen", "Buscar", "Novedades", "Populares", "Precio: de menor a mayor", "Buscar por imagen", "Explorar la hoja completa", "Fotos del producto / QC", "Abrir en Hubbuy", "Registrarse en Hubbuy", "Anterior", "Siguiente", "No se encontraron productos. Prueba otra palabra.", "ID del producto", "Imágenes del catálogo de origen. Comprueba el artículo, la variante y el contexto de las fotos antes de comprar.", "Elige una imagen para buscar productos visualmente similares. La comparación se realiza en tu dispositivo.", "Productos relacionados", "Todos los productos", "La similitud visual no confirma que sea el mismo artículo.", "Catálogo no disponible temporalmente. Inténtalo de nuevo."];
COPY.fr = ["Produits et photos QC", "Rechercher un produit ou son ID", "Rechercher", "Nouveautés", "Populaires", "Prix croissant", "Recherche par image", "Voir tout le spreadsheet", "Photos du produit / QC", "Ouvrir sur Hubbuy", "S’inscrire sur Hubbuy", "Précédent", "Suivant", "Aucun produit trouvé. Essayez un autre mot.", "ID du produit", "Images du catalogue source. Vérifiez le produit, la variante et le contexte des photos avant tout achat.", "Choisissez une image pour rechercher des produits similaires. La comparaison se fait sur votre appareil.", "Produits associés", "Tous les produits", "La ressemblance visuelle ne confirme pas qu’il s’agit du même article.", "Catalogue temporairement indisponible. Réessayez."];
COPY.it = ["Prodotti e foto QC", "Cerca prodotti o ID originale", "Cerca", "Novità", "Popolari", "Prezzo crescente", "Ricerca per immagine", "Esplora tutto lo spreadsheet", "Foto del prodotto / QC", "Apri su Hubbuy", "Registrati su Hubbuy", "Precedente", "Successivo", "Nessun prodotto trovato. Prova un’altra parola.", "ID prodotto", "Immagini dal catalogo originale. Controlla articolo, variante e contesto delle foto prima dell’acquisto.", "Scegli un’immagine per trovare prodotti simili. Il confronto avviene sul tuo dispositivo.", "Prodotti correlati", "Tutti i prodotti", "La somiglianza visiva non conferma che sia lo stesso articolo.", "Catalogo temporaneamente non disponibile. Riprova."];
export const CATEGORY_LABELS = {
 fr:["Tous les produits", "Chaussures", "Sweats à capuche", "T-shirts", "Vestes", "Pantalons / Shorts", "Chapeaux", "Accessoires", "Ensembles", "Électronique", "Autres", "Maillots"],
 it:["Tutti i prodotti", "Scarpe", "Felpe", "T-shirt", "Giacche", "Pantaloni / Shorts", "Cappelli", "Accessori", "Completi", "Elettronica", "Altro", "Maglie sportive"],
 es:["Todos", "Calzado", "Sudaderas", "Camisetas", "Chaquetas", "Pantalones / Shorts", "Gorras", "Accesorios", "Conjuntos", "Electrónica", "Otros", "Camisetas deportivas"],
 en:['All products','Shoes','Hoodies','T-Shirts','Jackets','Pants / Shorts','Headwear','Accessories','Short Sets','Electronics','Other','Jerseys'],
 de:['Alle Produkte','Schuhe','Hoodies','T-Shirts','Jacken','Hosen / Shorts','Kopfbedeckungen','Accessoires','Sets','Elektronik','Weitere','Trikots'],
 pl:['Wszystkie','Buty','Bluzy','T-shirty','Kurtki','Spodnie / Szorty','Czapki','Akcesoria','Zestawy','Elektronika','Inne','Koszulki sportowe'],
 'pt-br':['Todos','Calçados','Moletons','Camisetas','Jaquetas','Calças / Shorts','Bonés','Acessórios','Conjuntos','Eletrônicos','Outros','Camisas esportivas']
};
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode = s => String(s||'').replace(/&#(x[\da-f]+|\d+);/gi,(_,x)=>String.fromCodePoint(x[0].toLowerCase()==='x'?parseInt(x.slice(1),16):Number(x))).replace(/&(amp|quot|apos|lt|gt);/g,(_,x)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[x]));
const textOnly = s => decode(String(s||'').replace(/<[^>]*>/g,''));
const first = (s,re) => decode(s.match(re)?.[1]||'');
// Verified source-gallery replacement for an upstream file that returns 404.
// The replacement is another photo of the same source product, not a placeholder.
const IMAGE_REPAIRS = {
 '/media/products/3460/8f135fa3-3ea9-458d-b81d-b9cc5e44957e.jpg': '/media/products/3460/59921312-605e-42f7-a647-f3d8a9713fb2.jpg?v=2'
};
export function imageUrl(raw) {
 try { const u=new URL(decode(raw),DATA_ORIGIN); if(['cnbuycha.com','www.cnbuycha.com'].includes(u.hostname)&&IMAGE_REPAIRS[u.pathname])return DATA_ORIGIN+IMAGE_REPAIRS[u.pathname]; return u.protocol==='https:'?u.href:''; } catch {return '';}
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
 const sourceUrl=first(section,/href="(https:\/\/weidian\.com\/[^\"]+)"/);
 const id=sourceUrl?new URL(sourceUrl).searchParams.get('itemID')||'':'';
 const images=[...section.matchAll(/<img[^>]*itemprop="image"[^>]*src="([^"]+)"/g)].map(m=>imageUrl(m[1])).filter(Boolean);
 return {title:textOnly(first(section,/<h1[^>]*>([\s\S]*?)<\/h1>/)),sourceId:id,price:first(section,/<meta itemprop="price" content="([^"]+)"/),images:[...new Set(images)],sourceUrl,related:parseList(html).products};
}
// Hubbuy accepts the original Weidian item ID, not the catalogue row ID.
export function buyUrl(sourceId) {
 if(!/^\d{5,20}$/.test(String(sourceId)))return null;
 return `https://www.hubbuy.com/product/2/${sourceId}?utm_source=website&utm_medium=share&utm_campaign=product_details&utm_content=${sourceId}`;
}
export const prefix=lang=>lang==='en'?'':`/${lang}`;
const base=lang=>`${prefix(lang)}/catalog`;
export const localPath=(path,lang)=>`${base(lang)}${path==='/AllProducts/'?'/':path}`;
const money=p=>Number.isFinite(Number(p))&&p!==''?'$'+Number(p).toFixed(2):'—';
const labels=lang=>COPY[lang]||COPY.en;
function shell(lang,path,title,description,body,{noindex=false,status=200,query=''}={}) {
 const canonical='https://hubbuy-sheet.com'+prefix(lang)+path;
 const crumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Hubbuy Spreadsheet',item:'https://hubbuy-sheet.com'+prefix(lang)+'/'},{'@type':'ListItem',position:2,name:title,item:canonical}]};
 const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Hubbuy Spreadsheet</title><meta name="description" content="${escapeHtml(description)}"><script type="application/ld+json">${JSON.stringify(crumbs).replaceAll('<','\\u003c')}</script><meta name="robots" content="${noindex?'noindex,follow':'index, follow'}"><link rel="canonical" href="${canonical}">${LANGS.map(l=>`<link rel="alternate" hreflang="${l}" href="https://hubbuy-sheet.com${prefix(l)}${path}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://hubbuy-sheet.com${path}"><link rel="icon" href="/brand/hubbuy-favicon.ico" sizes="64x64">${styles()}<link rel="stylesheet" href="/assets/catalog.css?v=20261111-visual-v2"><script src="/assets/catalog.js?v=20261111-visual-v2" defer></script></head><body class="catalog-page mobile-inner">${nav(lang,path,query)}<main id="main-content" class="catalog-main" data-locale="${lang}">${body}</main>${footer(lang)}</body></html>`;
 return new Response(html,{status,headers:{'content-type':'text/html; charset=utf-8','content-language':lang,'cache-control':status>=400?'no-store':'public, max-age=0, s-maxage=60','x-content-type-options':'nosniff','x-catalog-source':DATA_ORIGIN,'x-hubbuy-release':'20261111-hubbuy-visual-v2'}});
}
export function card(p,lang) {
 return `<article class="catalog-card"><a href="${localPath(p.path,lang)}"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" width="400" height="400" loading="lazy"><h2>${escapeHtml(p.title)}</h2><div class="card-meta"><strong>${money(p.price)}</strong><span>USD · ↗</span></div></a></article>`;
}
const cameraIcon = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5l1.5-2h5L16 5h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="4" stroke="currentColor" stroke-width="1.7"/></svg>';
const visualCopy = {
 en: {choose:'Choose a photo',drop:'Drop an image here, or paste with Ctrl / ⌘ + V',limit:'up to 20 MB',private:'Free image search. Your photo stays on your device.',preview:'Your selected photo',area:'Search area',full:'Whole photo',center:'Center crop — reduce the background',tip:'Use one clearly visible item. For a screenshot, try the center crop or crop the photo before choosing it.',again:'Search again',clear:'Clear photo',cancel:'Cancel',empty:'Choose a photo to find similar products.',searching:'Searching catalogue images',scope:'Search covers the indexed catalogue, not the whole web.',results:'Similar products',more:'Show more',javascript:'Enable JavaScript to compare images on your device.'},
 'pt-br': {choose:'Escolher uma foto',drop:'Arraste uma imagem aqui ou cole com Ctrl / ⌘ + V',limit:'até 20 MB',private:'Busca por imagem gratuita. Sua foto fica no seu dispositivo.',preview:'Sua foto selecionada',area:'Área de busca',full:'Foto inteira',center:'Recorte central — reduzir o fundo',tip:'Use uma foto com um único produto bem visível. Para capturas de tela, experimente o recorte central ou recorte a foto antes de selecioná-la.',again:'Buscar novamente',clear:'Remover foto',cancel:'Cancelar',empty:'Escolha uma foto para encontrar produtos semelhantes.',searching:'Buscando imagens do catálogo',scope:'A busca cobre o catálogo indexado, não toda a internet.',results:'Produtos semelhantes',more:'Mostrar mais',javascript:'Ative o JavaScript para comparar imagens no seu dispositivo.'},
 de: {choose:'Foto auswählen',drop:'Bild hierher ziehen oder mit Strg / ⌘ + V einfügen',limit:'bis zu 20 MB',private:'Kostenlose Bildersuche. Dein Foto bleibt auf deinem Gerät.',preview:'Dein ausgewähltes Foto',area:'Suchbereich',full:'Ganzes Foto',center:'Mittlerer Ausschnitt — weniger Hintergrund',tip:'Verwende ein Foto mit einem gut sichtbaren Artikel. Nutze bei Screenshots den mittleren Ausschnitt oder schneide das Foto vor der Auswahl zu.',again:'Erneut suchen',clear:'Foto entfernen',cancel:'Abbrechen',empty:'Wähle ein Foto, um ähnliche Produkte zu finden.',searching:'Katalogbilder durchsuchen',scope:'Die Suche umfasst den indexierten Katalog, nicht das gesamte Internet.',results:'Ähnliche Produkte',more:'Mehr anzeigen',javascript:'Aktiviere JavaScript, um Bilder auf deinem Gerät zu vergleichen.'}
};
function searchForm(lang,q='',category='AllProducts',sort='new') {
 const t=labels(lang);
 return `<form class="catalog-search" action="${localPath('/'+category+'/',lang)}" method="get" role="search"><label class="sr-only" for="catalog-query">${t[1]}</label><input id="catalog-query" name="q" value="${escapeHtml(q)}" placeholder="${t[1]}" type="search" maxlength="500"><input type="hidden" name="sort" value="${sort}"><a class="search-camera" href="${base(lang)}/image-search/" aria-label="${t[6]}" title="${t[6]}">${cameraIcon}</a><button>${t[2]} →</button></form>`;
}
export async function upstream(path,params) {
 const u=new URL(path,DATA_ORIGIN);if(params)u.search=params.toString();
 const r=await fetch(u.href,{headers:{accept:'text/html'},redirect:'follow',cf:{cacheTtl:60,cacheEverything:true},signal:AbortSignal.timeout(18000)});
 if(new URL(r.url||u.href).origin!==DATA_ORIGIN)throw new Error('Unexpected catalogue destination');
 if(!r.ok){const error=new Error('Catalogue response '+r.status);error.status=r.status;throw error;}
 return r.text();
}
export async function catalogueRoute(request,env) {
 const url=new URL(request.url),match=url.pathname.match(/^\/(?:(en|pt-br|de)\/)?catalog(?:\/(.*))?$/);
 if(url.pathname==='/api/catalog-photos') {
  if(request.method!=='GET')return new Response(null,{status:405});
  const path=url.searchParams.get('path')||'',parts=path.match(/^\/([a-z0-9-]+)\/\d+\.html$/);
  if(!parts||!CATEGORIES.includes(parts[1]))return Response.json({error:'Invalid product path'},{status:400});
  try { const product=parseDetail(await upstream(path));
   if(!product.title)return Response.json({error:'Product unavailable'},{status:404});
   return Response.json({images:product.images},{headers:{'cache-control':'public, max-age=300'}});
  } catch { return Response.json({error:'Photos unavailable'},{status:502}); }
 }
 if(url.pathname==='/api/catalog') {
  if(request.method!=='GET')return new Response(null,{status:405});
  try{const q=new URLSearchParams();for(const k of ['q','sort','page'])if(url.searchParams.has(k))q.set(k,k==='q'?normalizeQuery(url.searchParams.get(k)):url.searchParams.get(k).slice(0,100));
   const result=parseList(await upstream('/'+(CATEGORIES.includes(url.searchParams.get('category'))?url.searchParams.get('category'):'AllProducts')+'/',q));return Response.json(result,{headers:{'cache-control':'public, max-age=60'}});
  }catch{return Response.json({error:'Catalogue unavailable'},{status:502});}
 }
 if(!match)return null;
 if(match[1]==='en')return Response.redirect(url.origin+url.pathname.slice(3)+url.search,308);
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
 const lang=match[1]||'en',tail=match[2]||'',t=labels(lang),path='/catalog/'+tail;
 if(!url.pathname.endsWith('/')&&!tail.endsWith('.html'))return Response.redirect(url.origin+url.pathname+'/'+url.search,308);
 if(tail==='AllProducts/')return Response.redirect(url.origin+base(lang)+'/'+url.search,301);
 if(tail==='search.html') {
  const destination=new URL(base(lang)+'/',url.origin);destination.search=url.search;
  destination.searchParams.set('q',destination.searchParams.get('keywords')||destination.searchParams.get('q')||'');
  destination.searchParams.delete('keywords');destination.searchParams.delete('channelid');
  return Response.redirect(destination.href,302);
 }
 if(tail==='image-search/') {
  const v=visualCopy[lang]||visualCopy.en;
  return shell(lang,path,`Hubbuy ${t[6]}`,t[16],`<p class="catalog-eyebrow">HUBBUY SPREADSHEET</p><h1>${t[6]}</h1><p>${t[16]}</p>
<section class="image-search-panel" aria-label="${t[6]}">
 <label for="image-file" class="image-drop" id="image-drop">${cameraIcon}<strong>${v.choose}</strong><span>${v.drop}</span><small>JPG / PNG / WebP / GIF · ${v.limit}</small><input id="image-file" class="image-file-input" type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="${v.choose}"></label>
 <p class="image-private">${v.private}</p>
 <div id="image-controls" class="image-controls" hidden><div class="image-preview-wrap"><img id="image-preview" alt="${v.preview}"><span id="image-crop-overlay" hidden></span></div><div class="image-options"><label for="image-focus">${v.area}</label><select id="image-focus"><option value="full">${v.full}</option><option value="center">${v.center}</option></select><p>${v.tip}</p><div class="image-actions"><button id="image-retry" type="button">${v.again}</button><button id="image-reset" type="button">${v.clear}</button></div></div></div>
 <div class="image-progress-row"><p id="image-status" role="status" aria-live="polite">${v.empty}</p><button id="image-cancel" type="button" hidden>${v.cancel}</button></div><progress id="image-progress" aria-label="${v.searching}" hidden></progress>
 <p class="catalog-note">${t[19]} ${v.scope}</p>
</section><section class="image-results-section" aria-labelledby="image-results-title"><h2 id="image-results-title">${v.results}</h2><p id="image-result-note" hidden></p><div class="catalog-grid" id="image-results" aria-busy="false"></div><button class="catalog-more" id="image-more" type="button" hidden>${v.more}</button></section><noscript><p>${v.javascript}</p></noscript><script type="module" src="/assets/image-search.js?v=20261111-visual-v2"></script>`,{noindex:true});
 }

 try {
  if(/^[a-z0-9-]+\/\d+\.html$/i.test(tail)) {
   const product=parseDetail(await upstream('/'+tail));if(!product.title)return shell(lang,path,'Product unavailable','',`<h1>${t[13]}</h1>`,{status:404,noindex:true});
   const buy=buyUrl(product.sourceId);
   return shell(lang,path,product.title,`${product.title}. ${t[8]}. ${t[15]}`,`<a class="back" href="${base(lang)}/">← ${t[7]}</a><section class="catalog-detail"><div class="catalog-gallery"><div class="gallery-main"><button type="button" data-gallery-prev aria-label="${t[11]}">‹</button><img id="gallery-main" src="${escapeHtml(product.images[0]||'')}" alt="${escapeHtml(product.title)}" width="800" height="800"><button type="button" data-gallery-next aria-label="${t[12]}">›</button></div><div class="gallery-thumbs" aria-label="${t[8]}">${product.images.map((im,i)=>`<button type="button" data-gallery-index="${i}" aria-label="${t[8]} ${i+1}" aria-current="${i===0}"><img src="${escapeHtml(im)}" alt="${escapeHtml(product.title)} ${i+1}" width="120" height="120" loading="lazy"></button>`).join('')}</div></div><div class="catalog-product-info"><p class="catalog-eyebrow">HUBBUY SPREADSHEET</p><h1>${escapeHtml(product.title)}</h1><p>${t[14]}: <strong>${escapeHtml(product.sourceId)}</strong></p><p class="detail-price">${money(product.price)} <small>USD</small></p>${buy?`<a class="buy-button" href="${escapeHtml(buy)}" target="_blank" rel="noopener noreferrer" data-track-event="hubbuy_product_click">${t[9]} ↗</a>`:''}<h2>${t[8]}</h2><p>${t[15]}</p></div></section><h2>${t[17]}</h2><div class="catalog-grid">${product.related.slice(0,8).map(p=>card(p,lang)).join('')}</div>`);
  }
  const cat=tail.replace(/\/$/,'')||'AllProducts';if(!CATEGORIES.includes(cat))return shell(lang,path,'Not found','',`<h1>404</h1>`,{status:404,noindex:true});
  const q=normalizeQuery(url.searchParams.get('q')||url.searchParams.get('keywords')||'');
  const sort=['new','click','price'].includes(url.searchParams.get('sort'))?url.searchParams.get('sort'):'new';
  const page=Math.min(10000,Math.max(1,Number.parseInt(url.searchParams.get('page')||'1')||1));
  const params=new URLSearchParams({q,sort,page:String(page)}),data=parseList(await upstream('/'+cat+'/',params));
  const route=localPath('/'+cat+'/',lang),link=(s,p=1)=>`${route}?${new URLSearchParams({q,sort:s,page:String(p)})}`;
  const names=CATEGORY_LABELS[lang]||CATEGORY_LABELS.en,categoryTitle=names[CATEGORIES.indexOf(cat)];
  const title=cat==='AllProducts'?t[0]:`Hubbuy ${categoryTitle} Spreadsheet`;
  return shell(lang,path,title,`${title}. ${t[15]}`,`<p class="catalog-eyebrow">HUBBUY SPREADSHEET · USD</p><h1>${title}</h1><div class="catalog-tools">${searchForm(lang,q,cat,sort)}<a class="image-search-link" href="${base(lang)}/image-search/">${cameraIcon} ${t[6]}</a></div><nav class="category-filters" aria-label="${t[18]}">${CATEGORIES.map((c,i)=>`<a href="${localPath('/'+c+'/',lang)}" ${c===cat?'aria-current="page"':''}>${names[i]}</a>`).join('')}</nav><div class="sort-row">${[['new',t[3]],['click',t[4]],['price',t[5]]].map(([s,n])=>`<a href="${escapeHtml(link(s))}" ${sort===s?'aria-current="page"':''}>${n}</a>`).join('')}<span>${data.total.toLocaleString()} · ${page} / ${Math.max(page,data.pages)}</span></div><div class="catalog-grid">${data.products.length?data.products.map(p=>card(p,lang)).join(''):`<p class="empty-state">${t[13]}</p>`}</div><nav class="catalog-pagination" aria-label="${t[11]} / ${t[12]}">${page>1?`<a href="${escapeHtml(link(sort,page-1))}">← ${t[11]}</a>`:''}${page<data.pages?`<a href="${escapeHtml(link(sort,page+1))}">${t[12]} →</a>`:''}</nav>`,{noindex:!!q||sort!=='new'||page>1,query:url.search});
 } catch(error) { if(error.status===404)return shell(lang,path,'404','',`<h1>404</h1>`,{status:404,noindex:true}); return shell(lang,path,t[20],t[20],`<h1>${t[20]}</h1><a href="${base(lang)}/">${t[7]}</a>`,{status:503,noindex:true}); }
}

export function normalizeQuery(raw) {
 const value=String(raw||'').trim();
 try { const u=new URL(value); if(['weidian.com','www.weidian.com','hubbuy.com','www.hubbuy.com'].includes(u.hostname)) {
  const id=u.searchParams.get('itemID')||u.searchParams.get('id')||u.pathname.match(/\/product\/2\/(\d+)/)?.[1];
  if(/^\d{5,20}$/.test(id||''))return id;
 }} catch {}
 return value.slice(0,100);
}
