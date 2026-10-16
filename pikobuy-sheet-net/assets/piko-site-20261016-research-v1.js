(() => {
  if (window.__pikoSiteReady) return;
  window.__pikoSiteReady = true;
  const measurementId = 'G-QY8MM7VZV2';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
  const locale = () => location.pathname.match(/^\/(de|fr|es|it|pl|pt)(?:\/|$)/)?.[1] || 'en';
  const send = (name, data) => window.gtag('event', name, {
    source_page: location.pathname, locale: locale(), transport_type: 'beacon', ...data
  });
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const target = new URL(link.href, location.href);
    if (link.dataset.trackEvent) { let itemId='';try {const item=target.searchParams.get('productUrl');if(item)itemId=new URL(item).searchParams.get('itemID')||'';} catch {} send(link.dataset.trackEvent,{item_id:itemId}); }
    const details = {link_url: target.href, link_text: (link.textContent || '').trim().slice(0, 120)};
    if (target.hostname.replace(/^www\./, '') === 'cnbuycha.com') {
      const product = target.pathname.match(/\/(\d+)\.html$/);
      send(product ? 'outbound_product_click' : 'outbound_catalogue_click', {
        ...details, ...(product ? {product_id:product[1]} : {}),
        from_article:location.pathname.includes('/articles/')
      });
    } else if (target.hostname === location.hostname && target.pathname.includes('/articles/')) {
      send('article_internal_click', details);
    } else if (target.hostname === location.hostname && (/^\/(?:de\/|fr\/|es\/|it\/|pl\/|pt\/)?catalog\/[^/]+\/$/.test(target.pathname) && !target.pathname.includes('/image-search/'))) {
      send('category_click', {...details, category_path:target.pathname, from_article:location.pathname.includes('/articles/')});
    } else if (target.hostname === location.hostname && /\/catalog\/.+\/\d+\.html$/.test(target.pathname)) {
      send('catalog_product_click', {...details, product_id:target.pathname.match(/(\d+)\.html$/)[1]});
    } else if (target.hostname === location.hostname && target.pathname.includes('/catalog/')) {
      send('catalog_entry_click', {...details, from_article:location.pathname.includes('/articles/')});
    }
  }, true);
  document.addEventListener('submit', event => {
    const form = event.target;
    const input = form.querySelector?.('input[name="keywords"],input[name="q"]');
    if (input) send('search_submit', {search_term:input.value.trim().slice(0,100)});
  }, true);
  document.addEventListener('click', event => {
    for (const menu of document.querySelectorAll('details.language[open],details.mobile-nav[open],details.piko-language[open]')) {
      if (!menu.contains(event.target)) menu.removeAttribute('open');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('details[open]').forEach(menu => menu.removeAttribute('open'));
  });
})();
