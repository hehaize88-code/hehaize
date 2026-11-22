const liveHost = 'superbuysheetindex.com';
const siteRoot = 'https://' + liveHost;
const mainPages = ['', 'spreadsheet/', 'categories/', 'guide/', 'image-search/'];
let catalogRefresh;
let refreshAfter = 0;
let currentPaths = publishedProductPaths;

function updateSitemapPaths(ctx) {
  if (catalogRefresh || Date.now() < refreshAfter) return;
  catalogRefresh = (async () => {
    const response = await fetch(origin + '/sitemap.xml', {
      signal: AbortSignal.timeout(8000), cf: {cacheTtl: 3600, cacheEverything: true}
    });
    if (!response.ok) throw Error('Sitemap upstream unavailable');
    const xml = await response.text();
    if (!xml.trimEnd().endsWith('</urlset>')) throw Error('Incomplete upstream sitemap');
    const paths = Array.from(xml.matchAll(/<loc>https:\/\/cnbuycha\.com(\/[a-z-]+\/\d+\.html)<\/loc>/g), match => match[1]);
    if (!paths.length) throw Error('Empty catalog');
    currentPaths = [...new Set(paths)];
    refreshAfter = Date.now() + 3600000;
  })().catch(() => {refreshAfter = Date.now() + 60000}).finally(() => {catalogRefresh = undefined});
  ctx.waitUntil(catalogRefresh);
}

function sitemapResponse(root, entries) {
  const xml = '<?xml version="1.0" encoding="UTF-8"?><' + root + ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries.join('') + '</' + root + '>';
  return new Response(xml, {headers: {'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=600','X-Sitemap-Version':'2'}});
}

function productionRoute(u, ctx) {
  if (u.hostname === 'www.' + liveHost || u.protocol === 'http:') {
    u.protocol = 'https:';
    u.hostname = liveHost;
    return Response.redirect(u.href, 308);
  }
  if (u.pathname === '/robots.txt') return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+siteRoot+'/sitemap.xml\n', {headers:{'Content-Type':'text/plain; charset=utf-8'}});
  const langs = Object.keys(locales);
  if (u.pathname === '/sitemap.xml') return sitemapResponse('sitemapindex', langs.map(lang => '<sitemap><loc>'+siteRoot+'/sitemap-'+lang+'.xml</loc></sitemap>'));
  const lang = u.pathname.match(/^\/sitemap-([a-z]+)\.xml$/)?.[1];
  if (!lang || !Object.hasOwn(locales, lang)) return;
  updateSitemapPaths(ctx);
  const prefix = '<url><loc>' + siteRoot + '/' + lang + '/';
  return sitemapResponse('urlset', [...mainPages.map(path => prefix + path + '</loc></url>'), ...currentPaths.map(path => prefix + 'product' + path + '</loc></url>')]);
}
