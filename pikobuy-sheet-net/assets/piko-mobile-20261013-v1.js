/* Progressive mobile reading: keep all original text, links, images and IDs. */
(() => {
  if (!document.body.classList.contains('piko-compact-page')) return;
  const mobile = matchMedia('(max-width: 680px)');
  const translations = {
    en: ['Expand all sections', 'Collapse sections', 'Tap a heading to read', 'Show more', 'Show fewer'],
    de: ['Alle Abschnitte öffnen', 'Abschnitte schließen', 'Zum Lesen eine Überschrift antippen', 'Mehr anzeigen', 'Weniger anzeigen'],
    fr: ['Tout développer', 'Replier les sections', 'Touchez un titre pour lire', 'Afficher plus', 'Afficher moins'],
    es: ['Abrir todas las secciones', 'Cerrar las secciones', 'Toca un título para leer', 'Mostrar más', 'Mostrar menos'],
    it: ['Apri tutte le sezioni', 'Chiudi le sezioni', 'Tocca un titolo per leggere', 'Mostra altro', 'Mostra meno'],
    pl: ['Rozwiń wszystkie sekcje', 'Zwiń sekcje', 'Dotknij nagłówka, aby przeczytać', 'Pokaż więcej', 'Pokaż mniej'],
    pt: ['Expandir todas as secções', 'Recolher secções', 'Toque num título para ler', 'Mostrar mais', 'Mostrar menos']
  };
  const copy = translations[document.documentElement.lang] || translations.en;
  const chapters = [], lists = [];
  let initialized = false, toc, readingButton, printing = false;
  function button(text) {
    const el = document.createElement('button'); el.type = 'button'; el.textContent = text; return el;
  }
  function openHash(scroll = false) {
    if (!location.hash) return;
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id); if (!target) return;
    // A preserved section ID sits outside its disclosure; nested IDs sit inside it.
    target.querySelector(':scope > .mobile-chapter')?.setAttribute('open', '');
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.matches('details')) parent.open = true;
    }
    if (scroll) requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
  }
  function updateReadingLabel() {
    if (!readingButton) return;
    const allOpen = chapters.every(d => d.open);
    readingButton.textContent = copy[allOpen ? 1 : 0];
    readingButton.setAttribute('aria-expanded', String(allOpen));
  }
  function addList(grid, size) {
    const cards = [...grid.children].filter(el => el.matches('.article-card, .catalog-card'));
    if (cards.length <= size) return;
    const controls = document.createElement('div'); controls.className = 'mobile-list-controls';
    const status = document.createElement('span'); status.setAttribute('role', 'status');
    const more = button(copy[3]), less = button(copy[4]);
    controls.append(status, more, less); grid.after(controls);
    const item = {cards, size, shown: size, render() {
      const count = mobile.matches && !printing ? this.shown : cards.length;
      cards.forEach((card, index) => { card.hidden = index >= count; });
      status.textContent = `${Math.min(count, cards.length)} / ${cards.length}`;
      more.hidden = count >= cards.length; less.hidden = count <= size;
    }};
    more.addEventListener('click', () => { item.shown = Math.min(cards.length, item.shown + size); item.render(); });
    less.addEventListener('click', () => { item.shown = size; item.render(); grid.scrollIntoView({block: 'start'}); });
    lists.push(item); item.render();
  }
  function init() {
    if (initialized || !mobile.matches) return;
    initialized = true;
    const body = document.querySelector('.article-layout > .editorial-body, .article-layout > .article-copy');
    if (body) {
      for (const section of body.querySelectorAll(':scope > section')) {
        const heading = section.querySelector(':scope > h2'); if (!heading) continue;
        const details = document.createElement('details'); details.className = 'mobile-chapter';
        const summary = document.createElement('summary'); summary.append(heading);
        const content = document.createElement('div'); content.className = 'mobile-chapter-content';
        while (section.firstChild) content.append(section.firstChild);
        details.append(summary, content); section.append(details); chapters.push(details);
        summary.addEventListener('click', event => { if (!mobile.matches) event.preventDefault(); });
        details.addEventListener('toggle', updateReadingLabel);
      }
      if (chapters.length) {
        const controls = document.createElement('div'); controls.className = 'mobile-reading-controls';
        const hint = document.createElement('span'); hint.textContent = copy[2];
        readingButton = button(copy[0]);
        readingButton.addEventListener('click', () => {
          const expand = !chapters.every(d => d.open); chapters.forEach(d => { d.open = expand; }); updateReadingLabel();
        });
        controls.append(hint, readingButton); body.before(controls);
        const oldToc = document.querySelector('.article-toc');
        if (oldToc) {
          toc = document.createElement('details'); toc.className = 'mobile-toc';
          const summary = document.createElement('summary');
          const title = oldToc.querySelector('strong'); summary.textContent = title?.textContent || copy[2];
          oldToc.before(toc); toc.append(summary, oldToc);
        }
        updateReadingLabel();
      }
    }
    document.querySelectorAll('.inner-section > .article-grid').forEach(grid => addList(grid, 6));
    document.querySelectorAll('.catalog-main > .catalog-grid:not(#image-results)').forEach(grid => addList(grid, 12));
    openHash(true);
  }
  function sync() {
    init();
    if (!initialized) return;
    chapters.forEach(d => { d.open = !mobile.matches; });
    if (toc) toc.open = !mobile.matches;
    lists.forEach(list => list.render()); openHash(); updateReadingLabel();
  }
  mobile.addEventListener('change', sync);
  window.addEventListener('hashchange', () => openHash(true));
  document.addEventListener('click', event => {
    const a = event.target.closest?.('a[href^="#"]');
    if (a) requestAnimationFrame(() => openHash(true));
  });
  let savedPrintState;
  window.addEventListener('beforeprint', () => {
    printing = true; savedPrintState = chapters.map(d => d.open); chapters.forEach(d => { d.open = true; });
    lists.forEach(list => list.render());
  });
  window.addEventListener('afterprint', () => {
    printing = false; chapters.forEach((d, i) => { d.open = savedPrintState?.[i] ?? !mobile.matches; });
    lists.forEach(list => list.render()); updateReadingLabel();
  });
  sync();
})();
