import handler from "vinext/server/fetch-handler";

const portugueseOnlyArticles = new Set([
  "como-pesquisar-no-hubbuy-produtos-lojas-links",
  "planilha-hubbuy-tenis-nike-golden-goose-qc",
  "hubbuy-preco-em-real-cambio-taxas",
  "numero-da-porta-hubbuy-endereco-brasil",
  "rastreamento-hubbuy-pedido-sem-atualizacao",
]);

const legacyRedirects = new Map([
  ["/guides/uufinds-product-price-total-parcel-cost/", "/pt-br/articles/hubbuy-preco-em-real-cambio-taxas/"],
  ["/articles/kameymall-tracking-no-update-guide/", "/pt-br/articles/rastreamento-hubbuy-pedido-sem-atualizacao/"],
]);

const analyticsScript = `<script>(()=>{const send=(name,params={})=>{if(typeof gtag==='function')gtag('event',name,params)};document.addEventListener('submit',e=>{const f=e.target;if(f instanceof HTMLFormElement&&/cnbuycha\\.com$/i.test(new URL(f.action,location.href).hostname)){const data=new FormData(f);send('site_search_submit',{search_term:data.get('keywords')||data.get('q')||'',link_url:f.action,page_path:location.pathname})}},true);document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;const u=new URL(a.href,location.href);if(/(^|\\.)cnbuycha\\.com$/i.test(u.hostname))send('main_site_click',{link_url:u.href,link_text:(a.textContent||'').trim().slice(0,100),page_path:location.pathname});else if(u.origin===location.origin&&u.pathname.includes('/articles/'))send('article_internal_click',{link_url:u.pathname,page_path:location.pathname})},true)})();</script>`;

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const normalizedPath = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    const legacyTarget = legacyRedirects.get(normalizedPath);
    if (legacyTarget) return Response.redirect(new URL(legacyTarget, url), 301);

    const match = normalizedPath.match(/^\/(?:de\/)?articles\/([^/]+)\/$/);
    if (match && portugueseOnlyArticles.has(match[1])) {
      return Response.redirect(new URL(`/pt-br/articles/${match[1]}/`, url), 301);
    }

    const response = await handler.fetch(request, env, context);
    if (!response.headers.get("content-type")?.includes("text/html") || typeof HTMLRewriter === "undefined") return response;
    return new HTMLRewriter().on("body", {
      element(element) { element.append(analyticsScript, { html: true }); },
    }).transform(response);
  },
};
