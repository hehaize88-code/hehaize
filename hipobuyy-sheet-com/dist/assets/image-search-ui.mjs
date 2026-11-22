const input = document.getElementById('image-file');
const status = document.getElementById('image-status');
const preview = document.getElementById('image-preview');
const results = document.getElementById('image-results');
const locale = (document.documentElement.lang || 'en').toLowerCase();
let worker, active = 0, objectUrl;

function fingerprint(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  function pixels(width) {
    canvas.width = width; canvas.height = 8;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, 8);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, 8);
    return ctx.getImageData(0, 0, width, 8).data;
  }
  const rgb = pixels(8), gray = pixels(9);
  const cells = [], hash = new Uint8Array(8);
  for (let y=0;y<4;y++) for(let x=0;x<4;x++) for(let c=0;c<3;c++) {
    let sum = 0;
    for(let dy=0;dy<2;dy++) for(let dx=0;dx<2;dx++) sum += rgb[4*((2*y+dy)*8+2*x+dx)+c] >> 3;
    cells.push(Math.round(sum / 4));
  }
  const lum = i => .299*gray[i]+.587*gray[i+1]+.114*gray[i+2];
  for(let y=0;y<8;y++) for(let x=0;x<8;x++){
    const i=4*(y*9+x); hash[y] = (hash[y]<<1) | Number(lum(i+4)>lum(i));
  }
  return { cells, hash };
}

function createCard(hit, title) {
  const card = document.createElement('article'), link = document.createElement('a');
  const img = document.createElement('img'), heading = document.createElement('h2');
  card.className = 'catalog-card'; link.href = '/' + locale + '/catalog' + hit.path;
  img.src = hit.image; img.alt = title; img.loading = 'lazy'; img.width = 400; img.height = 400;
  heading.textContent = title; link.append(img, heading); card.append(link);
  return card;
}
async function display({data}) {
  if(data.id !== active) return;
  if(data.error) { status.textContent = input.dataset.i18nFailure; return; }
  try {
    let titles = data.hits.map(hit => hit.title);
    if(data.hits.length) {
      const url = new URL('/api/image-search/results', location.href);
      url.searchParams.set('lang',locale);
      data.hits.forEach(hit => url.searchParams.append('p', hit.path));
      const response = await fetch(url);
      if(!response.ok) throw Error();
      const translated = (await response.json()).titles;
      if(!Array.isArray(translated)||translated.length !== titles.length) throw Error();
      titles = translated;
    }
    if(data.id !== active) return;
    results.replaceChildren(...data.hits.map((hit,i) => createCard(hit,titles[i])));
    const number = new Intl.NumberFormat(locale);
    const summary = data.hits.length ? input.dataset.i18nMatches + ' · ' + number.format(data.hits.length) : input.dataset.i18nEmpty;
    status.textContent = summary + ' · ' + input.dataset.i18nIndexed + ' ' + number.format(data.total) + ' / ' + number.format(data.catalogCount)
      + ' · ' + input.dataset.i18nImages + ' ' + number.format(data.photos);
  } catch { if(data.id === active) status.textContent = input.dataset.i18nFailure; }
}
async function search(file) {
  const id = ++active;
  results.replaceChildren(); preview.hidden = true;
  if(!file) return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024) {
    status.textContent = input.dataset.i18nFormat; return;
  }
  try {
    if(objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file); preview.src = objectUrl;
    await preview.decode();
    if(id!==active) return;
    preview.hidden = false; status.textContent = input.dataset.i18nSearching;
    if(!worker) {
      worker = new Worker(new URL('./image-search-worker.mjs',import.meta.url),{type:'module'});
      worker.onmessage = display;
      worker.onerror = () => { worker?.terminate(); worker=null; status.textContent=input.dataset.i18nFailure; };
    }
    worker.postMessage({id,query:fingerprint(preview)});
  } catch { if(id===active) status.textContent = input.dataset.i18nFailure; }
}
input.addEventListener('change',() => search(input.files[0]));
const panel = input.closest('section');
panel.addEventListener('dragover',e => e.preventDefault());
panel.addEventListener('drop',e => { e.preventDefault(); search(e.dataTransfer.files[0]); });
document.addEventListener('paste',e => { const image = [...e.clipboardData.items].find(i => i.type.startsWith('image/')); if(image) search(image.getAsFile()); });
