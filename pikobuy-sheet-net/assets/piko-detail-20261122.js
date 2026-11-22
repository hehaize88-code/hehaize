(() => {
  const product = document.querySelector('.piko-product');
  if (!product) return;
  const groups = [...product.querySelectorAll('[data-group]')];
  const variants = JSON.parse(product.dataset.skus);
  const source = product.dataset.source;
  const price = product.querySelector('[data-usd]');
  const preview = product.querySelector('[data-product-photo]');
  const selected = new Map();
  const note = product.querySelector('[data-sku-note]');
  const output = product.querySelector('[data-copy-result]');
  let selectedVariant;
  function refresh() {
    const ids = [...selected.values()].map(button => button.dataset.option);
    const matches = variants.filter(([, attrs]) => ids.every(id => attrs.includes(id)));
    selectedVariant = ids.length && matches.length === 1 ? matches[0] : null;
    if (variants.length) {
      for (const group of groups) {
        const other = ids.filter(id => selected.get(group)?.dataset.option !== id);
        for (const button of group.querySelectorAll('[data-option]')) {
          button.disabled = !variants.some(([, attrs]) => attrs.includes(button.dataset.option) && other.every(id => attrs.includes(id)));
        }
      }
    }
    const prices = new Set(matches.map(v => v[2]).filter(p => Number.isFinite(p) && p >= 0));
    if (ids.length && prices.size === 1) {
      const value = [...prices][0];
      price.dataset.cny = String(value);
      price.textContent = new Intl.NumberFormat(document.documentElement.lang, {style:'currency',currency:'CNY'}).format(value);
    } else {
      delete price.dataset.cny;
      price.textContent = new Intl.NumberFormat(document.documentElement.lang, {style:'currency',currency:'USD'}).format(Number(price.dataset.usd));
    }
    document.dispatchEvent(new Event('piko:price'));
    if (note) note.hidden = !ids.length;
    output.replaceChildren();
  }
  product.addEventListener('click', event => {
    const button = event.target.closest('[data-option]');
    if (!button) return;
    const group = button.closest('[data-group]');
    const previous = selected.get(group);
    previous?.setAttribute('aria-pressed','false');
    if (previous === button) {
      selected.delete(group);
    } else {
      selected.set(group,button);
      button.setAttribute('aria-pressed','true');
    }
    if (preview) {
      const image = [...selected.values()].map(option => option.querySelector('img')).find(Boolean);
      preview.dataset.original ||= preview.href;
      preview.dataset.originalAlt ??= preview.firstElementChild.alt;
      preview.href = image?.src || preview.dataset.original;
      preview.firstElementChild.src = preview.href;
      preview.firstElementChild.alt = image?.alt || preview.dataset.originalAlt;
    }
    refresh();
  });
  const match=new URLSearchParams(location.search).get('match');
  if(match) {
    const option=[...product.querySelectorAll('[data-option]')].find(button=>button.querySelector('img')?.src===match);
    if(option) option.click();
    else {
      const thumb=[...document.querySelectorAll('.piko-lower-photos a')].find(link=>link.href===match);
      if(thumb && preview){preview.dataset.original=preview.href;preview.dataset.originalAlt=preview.firstElementChild.alt;preview.href=thumb.href;preview.firstElementChild.src=thumb.href;}
    }
  }
  product.querySelector('[data-copy-source]')?.addEventListener('click', async () => {
    output.replaceChildren();
    const missing = groups.find(group => !selected.has(group));
    if (missing && !selectedVariant) {
      output.textContent = product.querySelector('[data-copy-select]').textContent + ' · ' + missing.querySelector('legend').textContent;
      missing.querySelector('button:not(:disabled)')?.focus();
      return;
    }
    if (groups.length && !selectedVariant) {
      output.textContent = product.querySelector('[data-copy-unavailable]').textContent;
      return;
    }
    const address = new URL(source);
    if (selectedVariant) address.searchParams.set('sku_id', selectedVariant[0]);
    const value = address.href;
    try {
      await navigator.clipboard.writeText(value);
      output.textContent = product.querySelector('[data-copy-ok]').textContent;
    } catch {
      const field = document.createElement('textarea');
      field.value = value;
      field.readOnly = true;
      field.setAttribute('aria-label',product.querySelector('[data-copy-failed]').textContent);
      output.append(product.querySelector('[data-copy-failed]').textContent,field);
      field.select();
    }
  });
})();
