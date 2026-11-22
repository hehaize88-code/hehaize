// Each image has a 64-bit horizontal difference hash and a 4×4 RGB signature.
// Earlier signatures use native cell means, newer ones use resize filtering.
const population = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];

export function resizeFingerprint(image) {
  function pixels(width) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 8;
    const context = canvas.getContext('2d', {willReadFrequently: true});
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, 8);
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, 8);
    return context.getImageData(0, 0, width, 8).data;
  }
  const samples = pixels(8);
  const color = [];
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    for (let c = 0; c < 3; c++) {
      const i = ((y * 2) * 8 + x * 2) * 4 + c;
      const sum = [0, 4, 32, 36].reduce((n, offset) => n + (samples[i+offset] >> 3), 0);
      color.push(Math.round(sum / 4));
    }
  }
  const gray = pixels(9);
  const lum = i => .299*gray[i] + .587*gray[i+1] + .114*gray[i+2];
  let hash = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const i = (y*9+x)*4;
    hash += lum(i+4) > lum(i) ? '1' : '0';
  }
  return {hash,color};
}

function nibbles(bits) {
  return bits.match(/.{4}/g).map(n => parseInt(n, 2));
}

function scorePhoto(signature, colors, query) {
  const area = signature.length === 17;
  const hash = area ? query.areaHash : query.hash;
  const cell = area ? query.areaColor : query.color;
  const rgb = atob(colors);
  let squared = 0, hamming = 0;
  for (let i = 0; i < 48; i++) squared += (rgb.charCodeAt(i) - cell[i]) ** 2;
  for (let i = 0; i < 16; i++) hamming += population[parseInt(signature[i + Number(area)], 16) ^ hash[i]];
  return .7 * Math.sqrt(squared / 48) / 31 + .3 * hamming / 64;
}

async function verifiedJSON(file,get) {
  const r = await get(file.url);
  if (!r.ok) throw Error('Index '+r.status+' · '+file.url.split('/').pop());
  const bytes = new Uint8Array(await r.arrayBuffer());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = Array.from(new Uint8Array(digest), n => n.toString(16).padStart(2,'0')).join('');
  const zipped = bytes[0] === 31 && bytes[1] === 139;
  if (hash !== (file.jsonSha256 && !zipped ? file.jsonSha256 : file.sha256)) throw Error('Index integrity · '+file.url.split('/').pop());
  const body = zipped ? new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')) : bytes;
  return new Response(body).json();
}

export async function compactSearch(manifest, query, get, onProgress, limit) {
  const features = {
    areaHash: nibbles(query.hash), areaColor: query.cells.map(v => v >> 3),
    hash: nibbles(query.resize.hash), color: query.resize.color,
  };
  const titles = await verifiedJSON(manifest.titles, get);
  const paths = new Set(), matches = [];
  let cursor = 0, loaded = 0;
  async function lane() {
    while (cursor < manifest.shards.length) {
      const shard = manifest.shards[cursor++];
      const rows = await verifiedJSON(shard, get);
      let count = 0;
      for (const [path, images] of rows) {
        if (paths.has(path) || !titles[path] || !images.length) throw Error('Invalid image index product');
        paths.add(path);
        let best = null;
        for (const [image,hash,color,kind] of images) {
          const score = scorePhoto(hash, color, features);
          if (!best || score < best.score) {
            best = {score, p: {path,title:titles[path],price:'',image,kind,matchedImage:image}};
          }
        }
        matches.push(best);
        count += images.length;
      }
      if (count !== shard.count) throw Error('Incomplete image shard');
      loaded += count;
      onProgress(loaded, manifest.indexedImageCount);
    }
  }
  await Promise.all(Array.from({length:4},lane));
  if (loaded !== manifest.indexedImageCount || paths.size !== manifest.indexedProductCount) throw Error('Incomplete image catalogue');
  matches.sort((a,b) => a.score-b.score || a.p.path.localeCompare(b.p.path));
  const weak = !matches.length || matches[0].score > .24;
  const items = matches;
  return {items,weak,imageCount:loaded,productCount:paths.size,updatedAt:manifest.updatedAt,failedImageCount:manifest.failedImageCount||0,failedStylePageCount:manifest.failedStylePageCount||0,failedDetailCount:manifest.failedDetailCount||0,pendingImageCount:manifest.pendingImageCount||0};
}
