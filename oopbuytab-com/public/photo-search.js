(() => {
  const panel = document.querySelector('[data-photo-panel]');
  if (!panel) return;
  const input = panel.querySelector('input');
  const status = panel.querySelector('[role=status]');
  const results = panel.querySelector('.photo-matches');
  const retry = panel.querySelector('[data-retry]');
  let indexPromise, lastFile, sequence = 0;
  function loadIndex() {
    if (!indexPromise) indexPromise = (async () => {
      const response = await fetch('/photo-index/catalog.bin');
      if (!response.ok) throw Error('catalog');
      const stream = response.body.pipeThrough(new DecompressionStream('gzip'));
      const rows = await new Response(stream).json();
      for (const [, , photos] of rows) {
        for (const photo of photos) photo[2] = atob(photo[2]);
      }
      return rows;
    })().catch(error => { indexPromise = null; throw error; });
    return indexPromise;
  }
  function pixels(image, width) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, 8);
    ctx.drawImage(image, 0, 0, width, 8);
    return ctx.getImageData(0, 0, width, 8).data;
  }
  function signature(image) {
    const rgb = pixels(image, 8), colors = [];
    for (let y = 0; y < 8; y += 2) {
      for (let x = 0; x < 8; x += 2) {
        for (let c = 0; c < 3; c++) {
          const at = (y * 8 + x) * 4 + c;
          colors.push(Math.round([0,4,32,36].reduce((sum, delta) => sum + (rgb[at + delta] >> 3), 0) / 4));
        }
      }
    }
    const gray = pixels(image, 9);
    const light = i => gray[i] * .299 + gray[i+1] * .587 + gray[i+2] * .114;
    const hash = [];
    for (let y = 0; y < 8; y++) {
      let byte = 0;
      for (let x = 0; x < 8; x++) {
        const i = (y * 9 + x) * 4;
        byte = byte * 2 + Number(light(i+4) > light(i));
      }
      hash.push(byte);
    }
    return {colors, hash};
  }
  const pop = Array.from({length:256}, (_, i) => i.toString(2).replace(/0/g,'').length);
  function distance(query, photo) {
    let sum = 0, bits = 0;
    for (let i = 0; i < 48; i++) sum += (query.colors[i] - photo[2].charCodeAt(i)) ** 2;
    for (let i = 0; i < 8; i++) bits += pop[query.hash[i] ^ parseInt(photo[1].slice(2*i, 2*i+2), 16)];
    return .7 * Math.sqrt(sum / 48) / 31 + .3 * bits / 64;
  }
  function card({path,title,image}) {
    const a = document.createElement('a'), img = document.createElement('img');
    a.href = panel.dataset.products + path;
    img.src = image;
    img.loading = 'lazy';
    img.alt = '';
    img.referrerPolicy = 'no-referrer';
    a.append(img, document.createTextNode(title));
    return a;
  }
  async function search(file) {
    if (!file) return;
    const run = ++sequence;
    lastFile = file;
    panel.hidden = false;
    results.replaceChildren();
    retry.hidden = true;
    panel.scrollIntoView({block:'nearest'});
    if (file.size > 20 * 1024 * 1024 || !['image/png','image/jpeg','image/webp'].includes(file.type)) {
      status.textContent = 'PNG / JPEG / WebP · ≤ 20 MB';
      return;
    }
    status.textContent = panel.dataset.search + '…';
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const query = signature(image), rows = await loadIndex();
      if (run !== sequence) return;
      const matches = [];
      for (const [path,title,photos] of rows) {
        let best = .24, matched;
        for (const photo of photos) {
          const score = distance(query, photo);
          if (score < best) { best = score; matched = photo[0]; }
        }
        if (matched) matches.push({path,title,image:matched,score:best});
      }
      matches.sort((a,b) => a.score - b.score);
      const top = matches.filter(m => m.score <= matches[0].score + .075).slice(0,24);
      results.replaceChildren(...top.map(card));
      status.textContent = top.length + ' ' + panel.dataset.results;
    } catch {
      if (run !== sequence) return;
      status.textContent = panel.dataset.failed;
      retry.hidden = false;
    } finally { URL.revokeObjectURL(url); }
  }
  document.querySelectorAll('[data-pick-photo]').forEach(button => button.onclick = () => input.click());
  input.onchange = () => { const file = input.files[0]; input.value = ''; search(file); };
  retry.onclick = () => search(lastFile);
})();
