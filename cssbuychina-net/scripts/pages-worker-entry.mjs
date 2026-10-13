import applicationWorker from "../dist/server/index.js";
import {catalogueRoute, upstream, CATEGORIES, LANGS, localPath} from '../commerce/catalog.js';
import {products} from '../app/site-data.ts';
const legacyProducts = new Map(products.map(p=>['/product/'+p.id,p.storeUrl]));
const catalogAssets = new Set(['/catalog.js','/catalog.css','/mobile-inner.css','/catalog-image-index.json','/editorial-sitemap.xml']);
const RELEASE = '2026-10-13-cssbuy-mobile-inner-v1';
function catalogAnalytics(response, request) {
 if(request.method==='HEAD')return new Response(null,{status:response.status,headers:response.headers});
 if(!response.headers.get('content-type')?.includes('text/html'))return response;
 return response.text().then(html=>new Response(html.replace('</head>', `<script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-QY8MM7VZV2');</script></head>`),{status:response.status,headers:response.headers}));
}
async function catalogSitemap() {
 try {
  const xml=await upstream('/sitemap.xml');
  const paths=[...new Set([...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
  if(!paths.length)throw Error('Empty catalogue sitemap');
  const entries=LANGS.flatMap(lang=>paths.map(p=>'<url><loc>https://cssbuychina.net'+localPath(p,lang)+'</loc></url>')).join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300, s-maxage=600'}});
 }catch{return new Response('Sitemap temporarily unavailable',{status:503,headers:{'retry-after':'60'}})}
}


const canonicalHostname = "cssbuychina.net";
const wwwHostname = `www.${canonicalHostname}`;
const staticFiles = new Set([
  "/cssbuy-logo.png",
  "/cssbuy-category-checks-article.webp",
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return pathname.startsWith("/assets/") || staticFiles.has(pathname) || catalogAssets.has(pathname);
}

function languageForPath(pathname) {
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) return "pt-BR";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de-DE";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "en";
}

async function localizeDocumentLanguage(response, pathname) {
  const language = languageForPath(pathname);
  const contentType = response.headers.get("content-type") ?? "";
  if (language === "en" || !contentType.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  const body = (await response.text()).replace(
    /<html lang=["']en["']/i,
    `<html lang="${language}"`,
  );
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const pagesWorker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname === wwwHostname) {
      url.protocol = "https:";
      url.hostname = canonicalHostname;
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    if(url.pathname==='/catalog-sitemap.xml')return catalogSitemap();
    const locale=url.pathname.match(/^\/(pt-br|de|es)(?=\/|$)/)?.[0]||'';
    const bare=url.pathname.slice(locale.length).replace(/\/$/,'')||'/';
    let target;
    if(['/products','/finds','/spreadsheet','/AllProducts','/search.html'].includes(bare))target=locale+'/catalog/';
    else if(legacyProducts.has(bare))target=locale+legacyProducts.get(bare);
    else if(/^\/category\//.test(bare)) {
     const category=bare.split('/')[2]==='jerseys'?'jersey':bare.split('/')[2];
     if(CATEGORIES.includes(category))target=locale+'/catalog/'+category+'/';
    }
    if(target){const to=new URL(target,url.origin);to.search=url.search;if(to.searchParams.has('keywords')){to.searchParams.set('q',to.searchParams.get('keywords'));to.searchParams.delete('keywords')}to.searchParams.delete('channelid');return Response.redirect(to.href,301)}
    const catalog=await catalogueRoute(request,env);
    if(catalog)return catalogAnalytics(catalog,request);

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    const localized=await localizeDocumentLanguage(response, url.pathname);
    const headers=new Headers(localized.headers);headers.set('x-cssbuy-release',RELEASE);
    if(headers.get('content-type')?.includes('text/html'))headers.set('cache-control','public, max-age=0, s-maxage=60');
    return new Response(localized.body,{status:localized.status,headers});
  },
};

export default pagesWorker;
