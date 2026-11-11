import {loadImageIndex,matchingPhotoPath} from './image-index-loader.mjs?v=20261111-all-photos';
import {loadDictionary} from './locale-core.mjs';
import { acceptsImage, fingerprint, rankProducts, selectResults } from './image-search-core.mjs?v=20261111-area-v2';

const input = document.getElementById('image-file');
if (input) initialize();
async function initialize() {
  const locale = document.querySelector('main[data-locale]')?.dataset.locale || 'en';
  const base = (locale === 'en' ? '' : '/' + locale) + '/catalog';
  const text = {
    en: {partial:"Some product images could not be indexed. If a photo has no match, try the product name or ID.",loading:'Loading catalogue images…',reading:'Reading your photo…',comparing:'Comparing images…',file:'Choose a JPG, PNG, WebP or GIF up to 20 MB.',large:'This photo is too large to process safely. Resize it to under 40 megapixels and try again.',index:'Catalogue images could not be loaded. Check your connection and select Search again.',cancel:'Search cancelled. You can search again or choose another photo.',empty:'Choose a photo to find similar products.',count:'products compared',results:'closest photos',date:'Catalogue snapshot',weak:'No close visual match was found. These are the nearest catalogue photos; try a clearer photo or the center crop.',blank:'This image has too little visible detail. Choose a clear photo of a single item.',note:'Compare the photos and original product ID. Similar appearance does not confirm an identical item.',more:'Show more',remaining:'remaining',readError:'This image could not be read. Save it as JPG, PNG or WebP and try again.'},
    'pt-br': {loading:'Carregando imagens do catálogo…',reading:'Lendo sua foto…',comparing:'Comparando imagens…',file:'Escolha JPG, PNG, WebP ou GIF de até 20 MB.',large:'Esta foto é grande demais. Reduza para menos de 40 megapixels e tente novamente.',index:'Não foi possível carregar o catálogo. Verifique sua conexão e selecione Buscar novamente.',cancel:'Busca cancelada. Busque novamente ou escolha outra foto.',empty:'Escolha uma foto para encontrar produtos semelhantes.',count:'produtos comparados',results:'fotos mais próximas',date:'Catálogo atualizado em',weak:'Nenhuma correspondência visual próxima foi encontrada. Estas são as fotos mais próximas do catálogo; tente uma foto mais nítida ou o recorte central.',blank:'Esta imagem tem poucos detalhes visíveis. Escolha uma foto nítida de um único produto.',note:'Compare as fotos e o ID original. A aparência semelhante não confirma que seja o mesmo produto.',more:'Mostrar mais',remaining:'restantes',readError:'Não foi possível ler a imagem. Salve como JPG, PNG ou WebP e tente novamente.'},
    de: {loading:'Katalogbilder werden geladen…',reading:'Foto wird gelesen…',comparing:'Bilder werden verglichen…',file:'Wähle JPG, PNG, WebP oder GIF bis zu 20 MB.',large:'Dieses Foto ist zu groß. Verkleinere es auf unter 40 Megapixel und versuche es erneut.',index:'Die Katalogbilder konnten nicht geladen werden. Prüfe deine Verbindung und wähle Erneut suchen.',cancel:'Suche abgebrochen. Suche erneut oder wähle ein anderes Foto.',empty:'Wähle ein Foto, um ähnliche Produkte zu finden.',count:'Produkte verglichen',results:'ähnlichste Fotos',date:'Katalogstand',weak:'Keine hohe visuelle Übereinstimmung gefunden. Dies sind die ähnlichsten Katalogfotos. Versuche ein deutlicheres Foto oder den mittleren Ausschnitt.',blank:'Dieses Bild enthält zu wenige sichtbare Details. Wähle ein klares Foto eines einzelnen Artikels.',note:'Vergleiche die Fotos und die Original-ID. Ähnliches Aussehen bestätigt keinen identischen Artikel.',more:'Mehr anzeigen',remaining:'übrig',readError:'Das Bild konnte nicht gelesen werden. Speichere es als JPG, PNG oder WebP und versuche es erneut.'}
  };
  const dictionary=await loadDictionary(locale);
  const {translateProductTitle}=await import('./product-title.mjs');const glossaries=await fetch('/assets/product-glossaries.json').then(r=>r.json());
  const tr=value=>dictionary[value]||value;const productTitle=v=>translateProductTitle(v,locale,glossaries);
  const t = Object.fromEntries(Object.entries(text.en).map(([key,value])=>[key,dictionary[value]||(text[locale]||text.en)[key]]));
  const byId = id => document.getElementById('image-' + id);
  const status = byId('status'), results = byId('results'), preview = byId('preview'), controls = byId('controls');
  const drop = byId('drop'), focus = byId('focus'), crop = byId('crop-overlay'), cancel = byId('cancel');
  const retry = byId('retry'), reset = byId('reset'), progress = byId('progress'), more = byId('more'), note = byId('result-note');
  let indexController=null;
  let sequence = 0, objectUrl = null, currentImage = null, indexPromise = null, ranked = [], visible = 12;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const event = detail => document.dispatchEvent(new CustomEvent('uufinds:image-search', {detail}));
  function busy(value) { results.setAttribute('aria-busy', String(value)); progress.hidden = cancel.hidden = !value; retry.disabled = value || !currentImage; }
  function clearResults() { ranked = []; results.replaceChildren(); note.hidden = more.hidden = true; }
  function release() { if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = null; currentImage = null; preview.removeAttribute('src'); }
  function stop() { sequence++;indexController?.abort(); if (!currentImage) release(); busy(false); status.textContent = t.cancel; }
  function showResults() {
    results.innerHTML = ranked.slice(0, visible).map(({p}) => {
      const imageUrl = new URL(p.image.startsWith('https://') ? p.image : 'https://cnbuycha.com' + p.image);
      if(/(^|\.)geilicdn\.com$/.test(imageUrl.hostname)&&/\.(?:jpe?g|png)$/i.test(imageUrl.pathname)){imageUrl.pathname+='.webp';imageUrl.search='?w=1200&h=1200';}
      const image=imageUrl.href;
      const price = p.price !== '' && Number.isFinite(Number(p.price)) ? '$' + Number(p.price).toFixed(2) : '—';
      return `<article class="catalog-card"><a href="${base}${esc(matchingPhotoPath(p))}"><img src="${esc(image)}" alt="${esc(productTitle(p.title))}" width="400" height="400" loading="lazy" referrerpolicy="no-referrer"><h3>${esc(productTitle(p.title))}</h3><div class="card-meta"><strong data-price-amount="${esc(p.price)}" data-price-currency="USD">${price}</strong><span><span data-currency-code>USD</span> · ↗</span></div></a></article>`;
    }).join('');
    more.hidden = visible >= ranked.length;
    more.textContent = `${t.more} (${Math.max(0, ranked.length - visible)} ${t.remaining})`;
  }
  function loadIndex() {
    if(indexPromise)return indexPromise;
    const controller=new AbortController();indexController=controller;
    const timeout=setTimeout(()=>controller.abort(),120000);
    const pending=loadImageIndex({signal:controller.signal,onProgress:(loaded,total)=>{
      if(results.getAttribute('aria-busy')==='true')status.textContent=`${t.loading} ${loaded.toLocaleString(locale)} / ${total.toLocaleString(locale)}`;
    }}).catch(error=>{if(indexPromise===pending)indexPromise=null;throw error;}).finally(()=>{clearTimeout(timeout);if(indexController===controller)indexController=null;});
    indexPromise=pending;return pending;
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
      note.textContent = (selected.weak ? t.weak : t.note) + (index.failedImageCount || index.failedDetailCount || index.failedStylePageCount || index.unattemptedStylePageCount ? ' ' + t.partial : '');
      note.classList.toggle('image-low-confidence', selected.weak);
      note.hidden = false;
      status.textContent = `${t.results.charAt(0).toUpperCase() + t.results.slice(1)}: ${ranked.length} · ${index.productCount.toLocaleString(locale)} ${t.count} · ${tr('Product photos')}: ${index.imageCount.toLocaleString(locale)} / ${index.discoveredImageCount.toLocaleString(locale)}${index.updatedAt ? ' · ' + t.date + ': ' + index.updatedAt : ''}`;
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
  window.addEventListener('pagehide', () => { sequence++;indexController?.abort(); release(); });
  busy(false);
}
