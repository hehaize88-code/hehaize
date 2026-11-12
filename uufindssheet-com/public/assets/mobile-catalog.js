// Presentation-only paging; preserve every source item and every server page link.
import { loadDictionary } from './locale-core.mjs';
const grid = document.querySelector('main.catalog-main > .catalog-grid');
if (grid && grid.children.length > 12) {
  const locale = document.querySelector('main[data-locale]')?.dataset.locale || 'en';
  const dictionary = await loadDictionary(locale);
  const t = label => dictionary[label] || label;
  const cards = [...grid.children];
  const pageCount = Math.ceil(cards.length / 12);
  const nav = document.createElement('nav');
  nav.className = 'mobile-catalog-pagination';
  nav.setAttribute('aria-label', t('Products'));
  const previous = document.createElement('button'), next = document.createElement('button'), status = document.createElement('span');
  previous.type = next.type = 'button';
  previous.textContent = '← ' + t('Previous'); next.textContent = t('Next') + ' →';
  status.setAttribute('role', 'status');
  nav.append(previous, status, next); grid.after(nav);
  grid.dataset.mobilePaged = 'true';
  const url = new URL(location.href);
  let page = Math.max(0, Math.min(pageCount - 1, (Number(url.searchParams.get('view')) || 1) - 1));
  const render = () => {
    cards.forEach((card, i) => { card.dataset.mobileVisible = String(Math.floor(i / 12) === page); });
    previous.disabled = page === 0; next.disabled = page === pageCount - 1;
    status.textContent = `${page * 12 + 1}–${Math.min(cards.length, (page + 1) * 12)} / ${cards.length}`;
  };
  const move = delta => {
    page += delta; render();
    const current = new URL(location.href);
    current.searchParams.set('view', String(page + 1)); history.replaceState(history.state, '', current);
    grid.scrollIntoView({ block: 'start' });
    const link = cards[page * 12]?.querySelector('a'); link?.focus({ preventScroll: true });
  };
  previous.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
  render();
}
