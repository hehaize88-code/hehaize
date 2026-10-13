(() => {
  if (!document.body.classList.contains('catalog-page')) return;
  const media = matchMedia('(max-width: 680px)');
  const copy = {en:['Show more','Show fewer'],es:['Mostrar más','Mostrar menos'],de:['Mehr anzeigen','Weniger anzeigen'],fr:['Afficher plus','Afficher moins'],it:['Mostra altro','Mostra meno']}[document.documentElement.lang] || ['Show more','Show fewer'];
  document.querySelectorAll('.catalog-main > .catalog-grid:not(#image-results)').forEach(grid => {
    const cards = [...grid.children]; if (cards.length <= 12) return;
    let shown = 12, printing = false;
    const controls = document.createElement('div'); controls.className = 'mobile-list-controls';
    const status = document.createElement('span'); status.setAttribute('role', 'status');
    const more = document.createElement('button'), less = document.createElement('button');
    more.type = less.type = 'button'; more.textContent = copy[0]; less.textContent = copy[1];
    controls.append(status, more, less); grid.after(controls);
    const render = () => {
      const limit = media.matches && !printing ? shown : cards.length;
      cards.forEach((card, index) => { card.hidden = index >= limit; });
      status.textContent = `${Math.min(limit,cards.length)} / ${cards.length}`;
      more.hidden = limit >= cards.length; less.hidden = limit <= 12;
    };
    more.addEventListener('click', () => { shown = Math.min(shown + 12, cards.length); render(); });
    less.addEventListener('click', () => { shown = 12; render(); grid.scrollIntoView({block:'start'}); });
    media.addEventListener('change', render);
    window.addEventListener('beforeprint', () => { printing = true; render(); });
    window.addEventListener('afterprint', () => { printing = false; render(); });
    render();
  });
})();
