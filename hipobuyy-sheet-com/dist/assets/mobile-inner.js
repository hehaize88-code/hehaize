/* Mobile-only progressive disclosure. All content is available without JS. */
(() => {
  const root = document.querySelector('main.mobile-inner, body.mobile-inner');
  if (!root) return;
  const media = matchMedia('(max-width: 680px)');
  const copy = {
    en: ['Show more', 'Show fewer'], de: ['Mehr anzeigen', 'Weniger anzeigen'],
    es: ['Mostrar más', 'Mostrar menos'], fr: ['Afficher plus', 'Afficher moins'],
    it: ['Mostra altro', 'Mostra meno'],
  }[document.documentElement.lang] || ['Show more', 'Show fewer'];
  const sections = [...root.querySelectorAll('.mobile-chapter, .mobile-topic')];
  const lists = [];
  let printing = false;
  let printState = [];
  function openHash(scroll = false) {
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = id && document.getElementById(id);
    if (!target || !root.contains(target)) return;
    for (let node = target; node && node !== root; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
    if (scroll) requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
  }
  function syncSections() {
    sections.forEach(section => { section.open = !media.matches; });
    openHash();
  }
  sections.forEach(section => {
    section.querySelector(':scope > summary').addEventListener('click', event => {
      if (!media.matches) event.preventDefault();
    });
  });
  root.querySelectorAll('[data-reading]').forEach(button => button.addEventListener('click', () => {
    sections.forEach(section => { section.open = button.dataset.reading === 'open'; });
  }));
  function addList(grid, step) {
    const items = [...grid.children];
    if (items.length <= step) return;
    let shown = step;
    grid.id ||= 'mobile-list-' + (lists.length + 1);
    const controls = document.createElement('div'); controls.className = 'mobile-list-controls';
    const status = document.createElement('span'); status.setAttribute('role', 'status');
    const more = document.createElement('button'), fewer = document.createElement('button');
    for (const button of [more, fewer]) { button.type = 'button'; button.setAttribute('aria-controls', grid.id); }
    more.textContent = copy[0]; fewer.textContent = copy[1];
    controls.append(status, more, fewer); grid.after(controls);
    const sync = () => {
      const limit = media.matches && !printing ? shown : items.length;
      items.forEach((item, i) => { item.hidden = i >= limit; });
      status.textContent = Math.min(limit, items.length) + ' / ' + items.length;
      more.hidden = shown >= items.length; fewer.hidden = shown <= step;
    };
    more.addEventListener('click', () => { shown = Math.min(shown + step, items.length); sync(); });
    fewer.addEventListener('click', () => { shown = step; sync(); grid.scrollIntoView({block: 'start'}); });
    lists.push(sync); sync();
  }
  root.querySelectorAll('.article-grid').forEach(grid => addList(grid, 6));
  root.querySelectorAll('.catalog-grid:not(#image-results)').forEach(grid => addList(grid, 12));
  syncSections();
  media.addEventListener('change', () => { syncSections(); lists.forEach(sync => sync()); });
  window.addEventListener('hashchange', () => openHash(true));
  root.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) openHash(true);
  });
  window.addEventListener('beforeprint', () => {
    printing = true; printState = sections.map(section => section.open);
    sections.forEach(section => { section.open = true; }); lists.forEach(sync => sync());
  });
  window.addEventListener('afterprint', () => {
    printing = false; sections.forEach((section, i) => { section.open = printState[i]; });
    lists.forEach(sync => sync());
  });
})();
