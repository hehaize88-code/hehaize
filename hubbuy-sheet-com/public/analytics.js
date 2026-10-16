/* One measurement initializer for every static and catalogue page. */
(() => {
  if (!/^(www\.)?hubbuy-sheet\.com$/i.test(location.hostname)) return;
  if (window.__hubbuyMeasurement) return;
  window.__hubbuyMeasurement = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-QY8MM7VZV2');
  const language = () => location.pathname.startsWith('/pt-br/') ? 'pt-br' : location.pathname.startsWith('/de/') ? 'de' : 'en';
  const send = (name, params = {}) => window.gtag('event', name, { page_path: location.pathname, content_language: language(), transport_type: 'beacon', ...params });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const action = new URL(form.action, location.href);
    if (action.origin !== location.origin || !/^\/(?:pt-br\/|de\/)?catalog\//.test(action.pathname)) return;
    const value = String(new FormData(form).get('q') || '').trim();
    if (!value) return;
    const method = /^https?:\/\//i.test(value) ? 'link' : /^\d{8,}$/.test(value) ? 'product_id' : 'text';
    // Do not put pasted URLs, account details or filenames into Analytics.
    send('site_search_submit', { search_method: method });
  }, true);
  document.addEventListener('click', event => {
    const a = event.target.closest && event.target.closest('a[href]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (/^(www\.)?hubbuy\.com$/i.test(url.hostname)) {
      const product = url.pathname.match(/^\/product\/2\/(\d+)/);
      if (product) send('hubbuy_product_click', { product_id: product[1], link_domain: url.hostname });
      else if (/^\/signUp\/?$/i.test(url.pathname)) send('hubbuy_signup_click', { link_domain: url.hostname });
      return;
    }
    if (url.origin !== location.origin) return;
    const product = url.pathname.match(/\/catalog\/[^/]+\/(\d+)\.html$/);
    if (product) send('catalog_product_click', { catalog_id: product[1], link_path: url.pathname });
    else if (/\/catalog\/image-search\//.test(url.pathname)) send('image_search_open');
    else if (url.pathname.includes('/articles/')) send('article_internal_click', { link_path: url.pathname });
    else if (a.closest('.sort-row') && ['new', 'click', 'price'].includes(url.searchParams.get('sort'))) send('catalog_sort', { sort_order: url.searchParams.get('sort') });
  }, true);
  document.addEventListener('hubbuy:image-search', event => {
    const detail = event.detail || {};
    if (detail.status === 'complete') send('image_search_complete', { result_count: Number(detail.count) || 0 });
    else if (detail.status === 'error') send('image_search_error', { error_type: detail.reason === 'file' ? 'file' : 'index' });
  });
})();
