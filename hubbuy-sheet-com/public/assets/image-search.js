import { acceptsImage, fingerprint, rankProducts, validProduct, selectResults } from './image-search-core.mjs?v=20261111-visual-v2';

const input = document.getElementById('image-file');
if (input) initialize();
function initialize() {
  const locale = document.querySelector('main[data-locale]')?.dataset.locale || 'en';
  const base = (locale === 'en' ? '' : '/' + locale) + '/catalog';
  const text = {
    en: {loading:'Loading catalogue images…',reading:'Reading your photo…',comparing:'Comparing images…',file:'Choose a JPG, PNG, WebP or GIF up to 20 MB.',large:'This photo is too large to process safely. Resize it to under 40 megapixels and try again.',index:'Catalogue images could not be loaded. Check your connection and select Search again.',cancel:'Search cancelled. You can search again or choose another photo.',empty:'Choose a photo to find similar products.',count:'products compared',results:'closest photos',date:'Catalogue snapshot',weak:'No close visual match was found. These are the nearest catalogue photos; try a clearer photo or the center crop.',blank:'This image has too little visible detail. Choose a clear photo of a single item.',note:'Compare the photos and original product ID. Similar appearance does not confirm an identical item.',more:'Show more',remaining:'remaining',readError:'This image could not be read. Save it as JPG, PNG or WebP and try again.'},
    'pt-br': {loading:'Carregando imagens do catálogo…',reading:'Lendo sua foto…',comparing:'Comparando imagens…',file:'Escolha JPG, PNG, WebP ou GIF de até 20 MB.',large:'Esta foto é grande demais. Reduza para menos de 40 megapixels e tente novamente.',index:'Não foi possível carregar o catálogo. Verifique sua conexão e selecione Buscar novamente.',cancel:'Busca cancelada. Busque novamente ou escolha outra foto.',empty:'Escolha uma foto para encontrar produtos semelhantes.',count:'produtos comparados',results:'fotos mais próximas',date:'Catálogo atualizado em',weak:'Nenhuma correspondência visual próxima foi encontrada. Estas são as fotos mais próximas do catálogo; tente uma foto mais nítida ou o recorte central.',blank:'Esta imagem tem poucos detalhes visíveis. Escolha uma foto nítida de um único produto.',note:'Compare as fotos e o ID original. A aparência semelhante não confirma que seja o mesmo produto.',more:'Mostrar mais',remaining:'restantes',readError:'Não foi possível ler a imagem. Salve como JPG, PNG ou WebP e tente novamente.'},
    de: {loading:'Katalogbilder werden geladen…',reading:'Foto wird gelesen…',comparing:'Bilder werden verglichen…',file:'Wähle JPG, PNG, WebP oder GIF bis zu 20 MB.',large:'Dieses Foto ist zu groß. Verkleinere es auf unter 40 Megapixel und versuche es erneut.',index:'Die Katalogbilder konnten nicht geladen werden. Prüfe deine Verbindung und wähle Erneut suchen.',cancel:'Suche abgebrochen. Suche erneut oder wähle ein anderes Foto.',empty:'Wähle ein Foto, um ähnliche Produkte zu finden.',count:'Produkte verglichen',results:'ähnlichste Fotos',date:'Katalogstand',weak:'Keine hohe visuelle Übereinstimmung gefunden. Dies sind die ähnlichsten Katalogfotos. Versuche ein deutlicheres Foto oder den mittleren Ausschnitt.',blank:'Dieses Bild enthält zu wenige sichtbare Details. Wähle ein klares Foto eines einzelnen Artikels.',note:'Vergleiche die Fotos und die Original-ID. Ähnliches Aussehen bestätigt keinen identischen Artikel.',more:'Mehr anzeigen',remaining:'übrig',readError:'Das Bild konnte nicht gelesen werden. Speichere es als JPG, PNG oder WebP und versuche es erneut.'}
  };
  const t = text[locale] || text.en;
  const byId = id => document.getElementById('image-' + id);
  const status = byId('status'), results = byId('results'), preview = byId('preview'), controls = byId('controls');
  const drop = byId('drop'), focus = byId('focus'), crop = byId('crop-overlay'), cancel = byId('cancel');
  const retry = byId('retry'), reset = byId('reset'), progress = byId('progress'), more = byId('more'), note = byId('result-note');
  let sequence = 0, objectUrl = null, currentImage = null, indexPromise = null, ranked = [], visible = 12;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const event = detail => document.dispatchEvent(new CustomEvent('hubbuy:image-search', {detail}));
  function busy(value) { results.setAttribute('aria-busy', String(value)); progress.hidden = cancel.hidden = !value; retry.disabled = value || !currentImage; }
  function clearResults() { ranked = []; results.replaceChildren(); note.hidden = more.hidden = true; }
  function release() { if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = null; currentImage = null; preview.removeAttribute('src'); }
  function stop() { sequence++; if (!currentImage) release(); busy(false); status.textContent = t.cancel; }
  function showResults() {
    results.innerHTML = ranked.slice(0, visible).map(({p}) => {
      const image = p.image.startsWith('https://') ? p.image : 'https://cnbuycha.com' + p.image;
      const price = p.price !== '' && Number.isFinite(Number(p.price)) ? '$' + Number(p.price).toFixed(2) : '—';
      return `<article class="catalog-card"><a href="${base}${esc(p.path)}"><img src="${esc(image)}" alt="${esc(p.title)}" width="400" height="400" loading="lazy"><h3>${esc(p.title)}</h3><div class="card-meta"><strong>${price}</strong><span>USD · ↗</span></div></a></article>`;
    }).join('');
    more.hidden = visible >= ranked.length;
    more.textContent = `${t.more} (${Math.max(0, ranked.length - visible)} ${t.remaining})`;
  }
  function loadIndex() {
    if (indexPromise) return indexPromise;
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 20000);
    indexPromise = fetch('/assets/catalog-image-index.json', {signal:controller.signal})
      .then(r => { if (!r.ok) throw Error('index'); return r.json(); })
      .then(index => {
        if (!index || !Array.isArray(index.products)) throw Error('index');
        const products = index.products.filter(validProduct);
        if (!products.length) throw Error('index');
        return {products, updatedAt:/^\d{4}-\d{2}-\d{2}$/.test(index.updatedAt) ? index.updatedAt : ''};
      }).catch(e => { indexPromise = null; throw e; }).finally(() => clearTimeout(timeout));
    return indexPromise;
  }
  async function compare() {
    if (!currentImage) return;
    const turn = ++sequence, image = currentImage;
    clearResults(); busy(true); crop.hidden = focus.value !== 'center';
    try {
      status.textContent = t.comparing;
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (turn !== sequence) return;
      const query = fingerprint(image, focus.value);
      if (query.variation < 3) { status.textContent = t.blank; event({status:'error',reason:'file'}); return; }
      status.textContent = t.loading;
      const index = await loadIndex();
      if (turn !== sequence) return;
      status.textContent = t.comparing;
      await new Promise(resolve => requestAnimationFrame(resolve));
      if (turn !== sequence) return;
      const selected = selectResults(rankProducts(query, index.products));
      ranked = selected.items;
      visible = 12; showResults();
      // A distance is a heuristic, never a probability or an identity claim.
      note.textContent = selected.weak ? t.weak : t.note;
      note.classList.toggle('image-low-confidence', selected.weak);
      note.hidden = false;
      status.textContent = `${t.results.charAt(0).toUpperCase() + t.results.slice(1)}: ${ranked.length} · ${index.products.length.toLocaleString(locale)} ${t.count}${index.updatedAt ? ' · ' + t.date + ': ' + index.updatedAt : ''}`;
      event({status:'complete',count:ranked.length});
    } catch { if (turn === sequence) { status.textContent = t.index; event({status:'error',reason:'index'}); } }
    finally { if (turn === sequence) busy(false); }
  }
  async function choose(file) {
    if (!file) return;
    const turn = ++sequence;
    clearResults(); release(); controls.hidden = true; focus.value = 'full'; crop.hidden = true; input.value = '';
    if (!acceptsImage(file)) { busy(false); status.textContent = t.file; event({status:'error',reason:'file'}); return; }
    busy(true); status.textContent = t.reading;
    const url = URL.createObjectURL(file), img = new Image();
    objectUrl = url; img.src = url;
    try {
      await img.decode();
      if (turn !== sequence) return;
      if (img.naturalWidth * img.naturalHeight > 40000000) { release(); status.textContent = t.large; busy(false); return; }
      currentImage = img; preview.src = url; controls.hidden = false;
      await compare();
    } catch { if (turn === sequence) { release(); busy(false); status.textContent = t.readError; event({status:'error',reason:'file'}); } }
  }
  input.addEventListener('change', () => choose(input.files[0]));
  drop.addEventListener('dragover', e => { if ([...e.dataTransfer.types].includes('Files')) { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; drop.classList.add('is-dragging'); } });
  drop.addEventListener('dragleave', e => { if (!drop.contains(e.relatedTarget)) drop.classList.remove('is-dragging'); });
  drop.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('is-dragging'); choose(e.dataTransfer.files[0]); });
  document.addEventListener('paste', e => {
    if (e.target?.closest('input:not([type="file"]),textarea,[contenteditable="true"]')) return;
    const item = [...(e.clipboardData?.items || [])].find(item => item.kind === 'file' && item.type.startsWith('image/'));
    if (item) { e.preventDefault(); choose(item.getAsFile()); }
  });
  retry.addEventListener('click', compare);
  focus.addEventListener('change', compare);
  cancel.addEventListener('click', stop);
  reset.addEventListener('click', () => { sequence++; clearResults(); release(); controls.hidden = true; input.value = ''; focus.value = 'full'; crop.hidden = true; busy(false); status.textContent = t.empty; input.focus(); });
  more.addEventListener('click', () => { visible += 12; showResults(); });
  window.addEventListener('pagehide', () => { sequence++; release(); });
  busy(false);
}
