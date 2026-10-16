/* Progressive mobile reading: original text, headings and links stay in the DOM. */
(() => {
  if (window.__hubbuyCompactReading) return;
  window.__hubbuyCompactReading = true;
  const mobile = window.matchMedia('(max-width: 680px)');
  let serial = 0;
  let scheduled = false;
  const copy = () => {
    const lang = location.pathname.split('/')[1];
    if (lang === 'pt-br') return { hint: 'Leia por seção', expand: 'Expandir tudo', collapse: 'Recolher tudo', more: 'Mostrar mais', less: 'Mostrar menos' };
    if (lang === 'de') return { hint: 'Abschnitt auswählen', expand: 'Alles öffnen', collapse: 'Alles schließen', more: 'Mehr anzeigen', less: 'Weniger anzeigen' };
    return { hint: 'Read by section', expand: 'Expand all', collapse: 'Collapse all', more: 'Show more', less: 'Show less' };
  };
  function setOpen(section, open) {
    section.dataset.compactOpen = String(open);
    section.querySelector('.compact-section-toggle')?.setAttribute('aria-expanded', String(open));
  }
  function updateTools(article) {
    const button = article.querySelector(':scope > .compact-reading-tools button');
    if (!button) return;
    const allOpen = [...article.querySelectorAll('.compact-readable-section')].every(s => s.dataset.compactOpen === 'true');
    button.textContent = allOpen ? copy().collapse : copy().expand;
  }
  function revealHash() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const section = target?.closest('.compact-readable-section');
    if (section) {
      setOpen(section, true);
      updateTools(section.closest('article'));
    }
  }
  function enhance() {
    const main = document.getElementById('main-content');
    if (!main) return;
    for (const article of main.querySelectorAll('.seo-article-body, .guide-article')) {
      const sections = [...article.children].filter(el => el.tagName === 'SECTION' && el.querySelector(':scope > h2'));
      if (sections.length < 2) continue;
      for (const section of sections) {
        if (section.classList.contains('compact-readable-section')) continue;
        const heading = section.querySelector(':scope > h2');
        section.classList.add('compact-readable-section');
        if (!section.id) section.id = `reading-section-${++serial}`;
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'compact-section-toggle';
        toggle.setAttribute('aria-label', heading.textContent.trim());
        toggle.setAttribute('aria-controls', section.id);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('data-no-translate', '');
        toggle.addEventListener('click', () => {
          setOpen(section, section.dataset.compactOpen !== 'true');
          updateTools(article);
        });
        heading.append(toggle);
        setOpen(section, false);
      }
      if (!article.querySelector(':scope > .compact-reading-tools')) {
        const tools = document.createElement('div');
        tools.className = 'compact-reading-tools';
        tools.setAttribute('data-no-translate', '');
        const hint = document.createElement('span');
        hint.textContent = copy().hint;
        const button = document.createElement('button');
        button.type = 'button';
        button.addEventListener('click', () => {
          const allOpen = sections.every(s => s.dataset.compactOpen === 'true');
          sections.forEach(s => setOpen(s, !allOpen));
          updateTools(article);
        });
        tools.append(hint, button);
        article.insertBefore(tools, sections[0]);
        updateTools(article);
      }
    }
    if (main.querySelector('.page-hero, .seo-article-hero')) {
      for (const grid of main.querySelectorAll('.product-grid, .article-library-grid')) {
        if (grid.classList.contains('compact-limited-list')) continue;
        const cards = [...grid.children];
        const limit = grid.classList.contains('product-grid') ? 12 : 6;
        if (cards.length <= limit) continue;
        grid.classList.add('compact-limited-list');
        if (!grid.id) grid.id = `compact-list-${++serial}`;
        cards.slice(limit).forEach(card => card.setAttribute('data-compact-extra', ''));
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'compact-list-more';
        button.setAttribute('data-no-translate', '');
        button.setAttribute('aria-controls', grid.id);
        button.setAttribute('aria-expanded', 'false');
        button.textContent = `${copy().more} (${cards.length - limit})`;
        button.addEventListener('click', () => {
          const expanded = grid.dataset.compactExpanded !== 'true';
          grid.dataset.compactExpanded = String(expanded);
          button.setAttribute('aria-expanded', String(expanded));
          button.textContent = expanded ? copy().less : `${copy().more} (${cards.length - limit})`;
          if (!expanded && mobile.matches) grid.scrollIntoView({ block: 'start' });
        });
        grid.after(button);
      }
    }
    revealHash();
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhance(); });
  }
  function start() {
    // Wait until the existing app has hydrated before adding optional controls.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      enhance();
      new MutationObserver(mutations => {
        if (mutations.some(m => [...m.addedNodes].some(n => n.nodeType === 1 &&
          (n.matches('main, article, section, .product-grid, .article-library-grid') ||
           n.querySelector('article, section, .product-grid, .article-library-grid'))))) schedule();
      }).observe(document.body, { childList: true, subtree: true });
    }));
  }
  document.addEventListener('click', event => {
    const anchor = event.target.closest?.('a[href*="#"]');
    if (!anchor) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    const section = target?.closest('.compact-readable-section');
    if (section) { setOpen(section, true); updateTools(section.closest('article')); }
  });
  window.addEventListener('hashchange', revealHash);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
