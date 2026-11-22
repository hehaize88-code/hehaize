// Decode each fingerprint shard off the UI thread. Keep packed bytes across searches.
import { imageShards, imageNames, imageMeta } from './image-search-data.mjs';

import { supplement } from './image-search-supplement.mjs';
const includeSupplement = supplement.base === imageMeta.revision;
const shards = includeSupplement ? [...imageShards, supplement.shard] : imageShards;

const popcount = Uint8Array.from({ length: 256 }, (_, x) => x.toString(2).replaceAll('0', '').length);
const bytes = value => Uint8Array.from(atob(value), char => char.charCodeAt(0));
const hashBytes = hex => Uint8Array.from(hex.match(/../g), pair => parseInt(pair, 16));
let load;
function loadRows() {
  return load ||= (async () => {
    const rows = [];
    for (const encoded of shards) {
      const raw = new Blob([bytes(encoded)]).stream().pipeThrough(new DecompressionStream('gzip'));
      for (const [path, photos] of await new Response(raw).json()) {
        const candidates = photos.filter(p => p[1] && p[2]);
        if (!candidates.length) continue;
        // One tightly packed buffer per product avoids retaining two typed arrays per image.
        const vectors = new Uint8Array(56 * candidates.length);
        const images = [];
        candidates.forEach(([image, hash, cells], i) => {
          vectors.set(hashBytes(hash), 56*i);
          vectors.set(bytes(cells), 56*i+8);
          images.push(image);
        });
        rows.push({ path, vectors, images });
      }
    }
    return rows;
  })().catch(err => { load = null; throw err; });
}
function distance(needle, vectors, offset) {
  let mismatch = 0, colors = 0;
  for (let i = 0; i < 8; i++) mismatch += popcount[needle.hash[i] ^ vectors[offset+i]];
  for (let i = 0; i < 48; i++) colors += (needle.cells[i] - vectors[offset+8+i]) ** 2;
  return .7 * Math.sqrt(colors / 48) / 31 + .3 * mismatch / 64;
}
self.onmessage = async ({ data }) => {
  try {
    const rows = await loadRows(), ranked = [];
    for (const { path, vectors, images } of rows) {
      let best = Infinity, match;
      for (let i=0;i<images.length;i++) {
        const d = distance(data.query, vectors, 56*i);
        if (d < best) { best = d; match = images[i]; }
      }
      if (best <= .24) ranked.push({ path, image: match, score: best, title: imageNames[path] });
    }
    ranked.sort((a,b) => a.score-b.score || a.path.localeCompare(b.path));
    const hits = ranked.slice(0,24).filter(x => x.score <= ranked[0].score + .075);
    self.postMessage({ id: data.id, hits, total: rows.length, catalogCount: includeSupplement ? supplement.catalogCount : imageMeta.total, photos: imageMeta.images + (includeSupplement ? supplement.images : 0) });
  } catch { self.postMessage({ id: data.id, error: true }); }
};
