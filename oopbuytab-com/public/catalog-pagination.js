/* Shared CNBuyCha HTML pages; no client catalogue database or invented products. */
(() => {
  const root = document.querySelector('.catalog-results[data-catalog-base]');
  if (!root) return;
  const grid = root.querySelector('.product-grid');
  const nav = root.querySelector('.pagination');
  if (!grid || !nav) return;
  const labels = JSON.parse(root.dataset.paginationLabels);
  const names = JSON.parse(root.dataset.categories);
  const base = root.dataset.catalogBase;
  const language = root.dataset.lang;
  const category = root.dataset.category;
  const defaultSort = root.dataset.sort;
  let currentPage = Number(root.dataset.page);
  let currentSort = defaultSort;
  let pageCount = Number(root.dataset.pages);
  let pending;
  let generation = 0;
  const status = document.createElement('p');
  status.className = 'catalog-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  nav.after(status);

  function state() {
    const params = new URLSearchParams(location.search);
    return {
      page: Math.max(1, Math.min(pageCount, Number.parseInt(params.get('page'), 10) || 1)),
      sort: ['new', 'click', 'price'].includes(params.get('sort')) ? params.get('sort') : defaultSort
    };
  }
  function href(page, sort = currentSort, pathname = location.pathname) {
    const params = new URLSearchParams({ sort, page: String(page) });
    return pathname + '?' + params;
  }
  function pageLink(page, text, className, accessibleLabel) {
    const element = document.createElement('a');
    element.href = href(page);
    element.dataset.page = String(page);
    if (className) element.className = className;
    if (accessibleLabel) element.setAttribute('aria-label', accessibleLabel);
    element.textContent = text;
    return element;
  }
  function direction(backward) {
    const label = backward ? labels.previous : labels.next;
    const disabled = backward ? currentPage === 1 : currentPage === pageCount;
    const el = disabled ? document.createElement('span') : pageLink(currentPage + (backward ? -1 : 1), '', '', label);
    el.className = (disabled ? 'page-disabled ' : '') + (backward ? 'page-prev' : 'page-next');
    el.setAttribute('aria-label', label);
    if (disabled) el.setAttribute('aria-disabled', 'true');
    const caption = document.createElement('span');
    caption.className = 'page-direction-label';
    caption.textContent = label;
    if (backward) el.append('←', caption); else el.append(caption, '→');
    return el;
  }
  function renderNavigation() {
    const group = nav.querySelector('.pagination-main');
    const numbers = document.createElement('div');
    numbers.className = 'page-numbers';
    const values = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pageCount])].filter(n => n > 0 && n <= pageCount).sort((a,b) => a-b);
    values.forEach((value, index) => {
      if (index && value > values[index-1] + 1) {
        const gap = document.createElement('span'); gap.className = 'ellipsis'; gap.textContent = '…'; numbers.append(gap);
      }
      const link = pageLink(value, String(value), value === currentPage ? 'current' : '', labels.page + ' ' + value);
      if (value === currentPage) link.setAttribute('aria-current', 'page');
      numbers.append(link);
    });
    group.replaceChildren(direction(true), numbers, direction(false));
    const input = nav.querySelector('[name="page"]');
    input.value = String(currentPage); input.max = String(pageCount);
    nav.querySelector('[name="sort"]').value = currentSort;
    nav.querySelector('.page-total').textContent = '/ ' + pageCount;
    root.querySelector('.catalog-sort select').value = currentSort;
    document.querySelectorAll('.language-grid a').forEach(link => {
      link.href = href(currentPage, currentSort, new URL(link.href).pathname);
    });
    document.querySelectorAll('.category-menu nav a').forEach(link => {
      link.href = href(1, currentSort, new URL(link.href).pathname);
    });
  }
  function localize(fragment) {
    fragment.querySelectorAll('.product-card').forEach(card => {
      card.querySelector('.card-category').textContent = names[card.dataset.category] || card.dataset.category;
      card.querySelector('[data-photo-missing]').textContent = labels.photoMissing;
      const title = card.querySelector('h3').textContent;
      card.querySelectorAll('[aria-label]').forEach(link => link.setAttribute('aria-label', labels.view + ': ' + title));
      if (card.dataset.productPath === '/shoes/3470.html') {
        card.querySelectorAll('a').forEach(link => link.href = base + (language === 'en' ? '' : '/' + language) + '/products/shoes/3470.html');
      }
    });
  }
  async function load(page, sort, historyMode, scroll) {
    pending?.abort();
    const token = ++generation;
    pending = new AbortController();
    status.textContent = labels.loading;
    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(`${base}/catalog/${category}/${sort}/${page}.html`, {signal: pending.signal});
      if (!response.ok) throw new Error('Catalogue page unavailable');
      const documentFragment = new DOMParser().parseFromString(await response.text(), 'text/html');
      const fragment = documentFragment.querySelector('.catalog-fragment');
      if (!fragment || Number(fragment.dataset.page) !== page || fragment.dataset.sort !== sort || !fragment.querySelector('.product-card')) throw new Error('Invalid catalogue page');
      if (token !== generation) return;
      localize(fragment);
      grid.replaceChildren(...fragment.children);
      currentPage = page; currentSort = sort; pageCount = Number(fragment.dataset.pages);
      root.dataset.page = String(page); root.dataset.pages = String(pageCount); root.dataset.sort = sort;
      root.dataset.total = fragment.dataset.total;
      root.querySelector('.catalog-toolbar b').textContent = Number(fragment.dataset.total).toLocaleString(language);
      if (historyMode === 'push') history.pushState(null, '', href(page, sort));
      else if (historyMode === 'replace') history.replaceState(null, '', href(page, sort));
      renderNavigation();
      status.textContent = labels.page + ' ' + page + ' / ' + pageCount;
      if (scroll) root.scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (error) {
      if (error.name === 'AbortError' || token !== generation) return;
      console.warn('OOPBuy Tab catalogue pagination:', error.stack || error.message);
      status.textContent = labels.error;
      const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'catalog-retry'; retry.textContent = labels.retry;
      retry.addEventListener('click', () => load(page, sort, historyMode, scroll)); status.append(retry);
      root.querySelector('.catalog-sort select').value = currentSort;
    } finally {
      if (token === generation) root.removeAttribute('aria-busy');
    }
  }
  nav.addEventListener('click', event => {
    const link = event.target.closest('a[data-page]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    load(Number(link.dataset.page), currentSort, 'push', true);
  });
  nav.querySelector('.pagination-jump').addEventListener('submit', event => {
    event.preventDefault();
    const page = Math.max(1, Math.min(pageCount, Number(nav.querySelector('[name="page"]').value)));
    load(page, currentSort, 'push', true);
  });
  root.querySelector('.catalog-sort').addEventListener('submit', event => {
    event.preventDefault(); load(1, root.querySelector('.catalog-sort select').value, 'push', false);
  });
  window.addEventListener('popstate', () => { const next = state(); load(next.page, next.sort, null, false); });
  renderNavigation();
  const initial = state();
  if (initial.page !== currentPage || initial.sort !== currentSort) load(initial.page, initial.sort, 'replace', false);
})();
