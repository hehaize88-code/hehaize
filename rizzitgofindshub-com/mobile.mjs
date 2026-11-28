// Keep the server's catalogue page numbers and render every product once.
// Native radio controls work with scripts off and support arrow-key navigation.
const batchSize = 20;
const escapeText = value => String(value).replace(/[&<>"']/g, ch => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[ch]);

export function mobileGrid(cards, label, offset = 0) {
  if (cards.length <= batchSize) return '<div class="grid">' + cards.join('') + '</div>';
  const slices = [];
  for (let start = 0; start < cards.length; start += batchSize) {
    const end = Math.min(start + batchSize, cards.length);
    const id = 'mobile-batch-' + (offset + start + 1);
    slices.push({ id, range: (offset + start + 1) + '–' + (offset + end), html: cards.slice(start, end).join('') });
  }
  const controls = slices.map(({id,range}, i) =>
    '<input class="batch-radio batch-radio-' + i + '" type="radio" id="' + id +
    '" name="catalog-batch" aria-label="' + escapeText(label + ' ' + range) +
    '" aria-controls="' + id + '-items"' + (i === 0 ? ' checked' : '') +
    '><label class="batch-label" for="' + id + '">' + range + '</label>').join('');
  const batches = slices.map(({id,html}, i) =>
    '<div id="' + id + '-items" class="batch-pane batch-pane-' + i + '">' + html + '</div>').join('');
  return '<fieldset class="mobile-batches"><legend class="sr">' + escapeText(label) +
    '</legend>' + controls + '<div class="batch-cards">' + batches + '</div></fieldset>';
}

