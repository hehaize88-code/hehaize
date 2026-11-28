const catalogPageSize = 12;
const sourcePageSize = 60;

function catalogHref(lang, category, query, page = 1) {
  const params = new URLSearchParams();
  if (category !== 'AllProducts') params.set('category', category);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  const search = params.toString();
  return '/' + lang + '/spreadsheet/' + (search ? '?' + search : '');
}

function catalogPagination(lang, category, query, page, last) {
  if (last <= 1) return '';
  const t = messages[lang];
  const href = n => e(catalogHref(lang, category, query, n));
  const link = (n, label) => '<a class="chip" href="' + href(n) + '">' + e(label) + '</a>';
  const fields = [
    ['category', category === 'AllProducts' ? '' : category],
    ['q', query]
  ].filter(([, value]) => value).map(([key, value]) =>
    '<input type="hidden" name="' + key + '" value="' + e(value) + '">'
  ).join('');
  return '<nav class="pages" aria-label="' + e(t[1]) + '">' +
    (page > 2 ? link(1, (1).toLocaleString(lang)) : '') +
    (page > 1 ? link(page - 1, t[25]) : '') +
    '<form action="/' + lang + '/spreadsheet/" method="get">' + fields +
    '<input required type="number" inputmode="numeric" min="1" max="' + last +
    '" name="page" aria-label="' + e(t[1]) + '" value="' + page + '"> / ' +
    last.toLocaleString(lang) + ' <button>' + e(t[37]) + '</button></form>' +
    (page < last ? link(page + 1, t[26]) : '') +
    (page < last - 1 ? link(last, last.toLocaleString(lang)) : '') + '</nav>';
}

async function catalogPage(u, lang) {
  const t = messages[lang];
  const category = cats.includes(u.searchParams.get('category'))
    ? u.searchParams.get('category') : 'AllProducts';
  const query = (u.searchParams.get('q') || '').trim().slice(0, 180);
  const requested = Number(u.searchParams.get('page'));
  const page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;
  const offset = (page - 1) * catalogPageSize;
  const sourceParams = new URLSearchParams();
  if (query) sourceParams.set('q', localSourceQuery(query, lang));
  const sourcePage = Math.floor(offset / sourcePageSize) + 1;
  if (sourcePage > 1) sourceParams.set('page', String(sourcePage));
  const params = sourceParams.toString();
  const html = await read('/' + category + '/' + (params ? '?' + params : ''));
  const count = html.match(/Browse\s+([\d,]+)\s+China shopping spreadsheet finds/i);
  if (!count) throw Error('Upstream catalog count unavailable');
  const total = Number(count[1].replaceAll(',', ''));
  const last = Math.max(1, Math.ceil(total / catalogPageSize));
  if (page > last) {
    return Response.redirect(new URL(catalogHref(lang, category, query, last), u.origin), 302);
  }
  const sourceOffset = offset % sourcePageSize;
  const products = cards(html).slice(sourceOffset, sourceOffset + catalogPageSize);
  if (total > 0 && !products.length) throw Error('Upstream catalog page unavailable');
  await prepareProductNames(products.map(p => p.name), lang);
  const labels = t[13].split('|');
  const categories = '<div class="chips">' + cats.map((c, index) =>
    '<a class="chip' + (c === category ? ' active' : '') +
    '" href="' + e(catalogHref(lang, c, query)) + '">' + e(labels[index]) + '</a>'
  ).join('') + '</div>';
  const searchBox = category === 'AllProducts' ? search(lang, query) :
    search(lang, query).replace('</form>', '<input type="hidden" name="category" value="' + e(category) + '"></form>');
  const pager = catalogPagination(lang, category, query, page, last);
  const range = total ? (offset + 1).toLocaleString(lang) + '–' + (offset + products.length).toLocaleString(lang) + ' / ' : '';
  return layout(u, lang, t[1], '<section class="listing"><h1>' + e(t[1]) +
    '</h1>' + searchBox + categories + '<div class="sect"><h2>' +
    e(labels[cats.indexOf(category)]) + '</h2><span class="meta">' + range +
    total.toLocaleString(lang) + '</span></div>' + pager +
    '<div class="grid">' + products.map(p => tile(p, lang)).join('') + '</div>' +
    (products.length ? '' : '<p>' + e(t[27]) + '</p>') + pager + '</section>');
}
