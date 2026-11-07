/* Progressive enhancement: all article text and links remain in the HTML. */
(() => {
  const copy = {
    en: ['Expand full article', 'Collapse sections', 'Show more articles'],
    zh: ['展开全文', '收起章节', '显示更多文章'],
    de: ['Ganzen Artikel öffnen', 'Abschnitte einklappen', 'Weitere Artikel anzeigen'],
    pl: ['Rozwiń cały artykuł', 'Zwiń sekcje', 'Pokaż więcej artykułów'],
    es: ['Expandir artículo completo', 'Contraer secciones', 'Mostrar más artículos'],
    it: ['Espandi tutto l’articolo', 'Comprimi le sezioni', 'Mostra altri articoli'],
    fr: ['Afficher tout l’article', 'Replier les sections', 'Afficher plus d’articles'],
    pt: ['Expandir artigo completo', 'Recolher seções', 'Mostrar mais artigos'],
    ro: ['Extinde întregul articol', 'Restrânge secțiunile', 'Arată mai multe articole'],
    sv: ['Visa hela artikeln', 'Fäll ihop avsnitten', 'Visa fler artiklar'],
  };

  function init() {
    const main = document.querySelector('main.seo-article-page, main.seo-index-page');
    if (!main || main.dataset.mobileReading) return;
    main.dataset.mobileReading = 'ready';
    const labels = copy[document.documentElement.lang.split('-')[0]] || copy.en;
    const media = window.matchMedia('(max-width: 680px)');

    if (main.classList.contains('seo-index-page')) {
      const grid = main.querySelector('.seo-index-grid');
      if (!grid) return;
      const cards = [...grid.querySelectorAll('.seo-index-card')];
      if (cards.length <= 8) return;
      let visible = 8;
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'mobile-reading-more';
      grid.id ||= 'article-list';
      more.setAttribute('aria-controls', grid.id);
      grid.after(more);
      function showCards() {
        cards.forEach((card, i) => card.classList.toggle('mobile-reading-hidden', media.matches && i >= visible));
        more.hidden = !media.matches || visible >= cards.length;
        more.textContent = `${labels[2]} (${Math.max(0, cards.length - visible)})`;
      }
      more.addEventListener('click', () => {
        const next = cards[visible];
        visible += 8;
        showCards();
        next?.focus();
      });
      media.addEventListener('change', showCards);
      window.addEventListener('beforeprint', () => cards.forEach(card => card.classList.remove('mobile-reading-hidden')));
      window.addEventListener('afterprint', showCards);
      showCards();
      return;
    }

    const body = main.querySelector('.article-body');
    if (!body) return;
    const sections = [...body.querySelectorAll(':scope > section[id^="article-section-"]')];
    if (!sections.length) return;
    const controls = document.createElement('div');
    controls.className = 'mobile-reading-controls';
    const expand = document.createElement('button');
    const collapse = document.createElement('button');
    expand.type = collapse.type = 'button';
    expand.textContent = labels[0];
    collapse.textContent = labels[1];
    controls.append(expand, collapse);
    body.prepend(controls);

    const items = sections.map((section) => {
      const heading = section.querySelector('h2');
      if (!heading) return null;
      const content = document.createElement('div');
      content.className = 'mobile-section-content';
      content.id = `${section.id}-content`;
      while (heading.nextSibling) content.append(heading.nextSibling);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'mobile-section-toggle';
      button.setAttribute('aria-controls', content.id);
      while (heading.firstChild) button.append(heading.firstChild);
      heading.append(button);
      section.append(content);
      function setOpen(open) {
        content.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
        section.classList.toggle('mobile-section-collapsed', !open);
      }
      button.addEventListener('click', () => {
        if (media.matches) setOpen(content.hidden);
      });
      return { section, button, content, setOpen };
    }).filter(Boolean);
    const controlledIds = items.map(item => item.content.id).join(' ');
    expand.setAttribute('aria-controls', controlledIds);
    collapse.setAttribute('aria-controls', controlledIds);

    const index = main.querySelector('.article-index');
    const indexTitle = index?.querySelector(':scope > strong');
    let contents;
    if (indexTitle) {
      contents = document.createElement('details');
      contents.className = 'mobile-reading-contents';
      const summary = document.createElement('summary');
      summary.textContent = indexTitle.textContent;
      contents.append(summary);
      indexTitle.remove();
      while (index.firstChild) contents.append(index.firstChild);
      index.append(contents);
    }
    function openHash() {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const item = items.find(item => item.section.id === id);
      if (item) item.setOpen(true);
    }
    function resize() {
      controls.hidden = !media.matches;
      items.forEach((item, i) => {
        item.button.disabled = !media.matches;
        item.setOpen(!media.matches || i === 0);
      });
      if (contents) contents.open = !media.matches;
      openHash();
    }
    expand.addEventListener('click', () => items.forEach(item => item.setOpen(true)));
    collapse.addEventListener('click', () => items.forEach((item, i) => item.setOpen(i === 0)));
    index?.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      items.find(item => `#${item.section.id}` === link.getAttribute('href'))?.setOpen(true);
    });
    window.addEventListener('hashchange', openHash);
    let printState;
    window.addEventListener('beforeprint', () => {
      printState = { open: items.map(item => !item.content.hidden), toc: contents?.open };
      items.forEach(item => item.setOpen(true));
      if (contents) contents.open = true;
    });
    window.addEventListener('afterprint', () => {
      if (!printState) return;
      items.forEach((item, i) => item.setOpen(printState.open[i]));
      if (contents) contents.open = printState.toc;
    });
    media.addEventListener('change', resize);
    resize();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
