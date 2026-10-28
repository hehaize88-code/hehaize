// Event payloads contain site identifiers only, never search text or destination query strings.
(() => {
  const send = (name, details = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      page_type: document.body?.dataset.pageType || 'unknown',
      language: document.documentElement.lang,
      article_slug: document.body?.dataset.article || undefined,
      transport_type: 'beacon',
      ...details
    });
  };
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    const eventName = link.dataset.track;
    if (['article_guide_click', 'article_catalog_click', 'outbound_purchase_click', 'outbound_register_click'].includes(eventName)) {
      send(eventName, {destination: link.dataset.destination, product_id: link.dataset.productId || undefined});
      return;
    }
    const card = link.closest('.product-card');
    if (card) send('product_click', {product_id: card.dataset.productId, product_category: card.dataset.productCategory});
  });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const field = form.querySelector('input[name="q"]');
    const length = field?.value.trim().length || 0;
    if (length) send('catalog_search', {query_length: length < 10 ? '1-9' : length < 30 ? '10-29' : '30+'});
  });
  const ready = () => {
    if (document.body?.dataset.searchActive === 'true') {
      send('catalog_search_results', {result_count: Number(document.body.dataset.resultCount) || 0});
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once: true});
  else ready();
})();
