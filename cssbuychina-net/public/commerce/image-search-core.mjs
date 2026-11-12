// area-v2: deterministic cell-area RGB means shared with the Python indexer.
// No uploads, remote inference, new database or paid service.
export const MAX_BYTES = 20 * 1024 * 1024;
export function acceptsImage(file) {
  if (!file || file.size <= 0 || file.size > MAX_BYTES) return false;
  if (/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return true;
  return (!file.type || file.type === 'application/octet-stream') && /\.(jpe?g|png|webp|gif)$/i.test(file.name || '');
}
export function validProduct(p) {
  return p && /^\/[a-z0-9-]+\/\d+\.html$/.test(p.path) && /^[01]{64}$/.test(p.hash) &&
    Array.isArray(p.cells) && p.cells.length === 48 && p.cells.every(n => Number.isFinite(n) && n >= 0 && n <= 255) &&
    typeof p.title === 'string' && typeof p.image === 'string' &&
    (/^\/(?:media\/products|uploads\/allimg)\//.test(p.image) || /^https:\/\/[a-z0-9.-]+\//i.test(p.image));
}
export function distance(a, b) {
  let hash = 0, color = 0;
  for (let i = 0; i < 64; i++) hash += a.hash[i] !== b.hash[i];
  for (let i = 0; i < 48; i++) color += Math.abs(a.cells[i] - b.cells[i]);
  return hash / 64 * .7 + color / (48 * 255) * .3;
}
export function cropArea(width, height, mode) {
  return mode === 'center' ? [width * .15, height * .15, width * .7, height * .7] : [0, 0, width, height];
}
export function meanRGB(pixels) {
  let r=0,g=0,b=0;for(let i=0;i<pixels.length;i+=4){r+=pixels[i];g+=pixels[i+1];b+=pixels[i+2];}
  const n=pixels.length/4;if(!n)throw Error('Empty image cell');
  return [Math.floor(r/n+.5),Math.floor(g/n+.5),Math.floor(b/n+.5)];
}
export function fingerprint(image, mode = 'full', canvas = document.createElement('canvas')) {
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)throw Error('canvas');
  const width=image.naturalWidth||image.width,height=image.naturalHeight||image.height;
  const area=cropArea(width,height,mode),left=Math.floor(area[0]),top=Math.floor(area[1]);
  const w=Math.max(1,Math.floor(area[0]+area[2])-left),h=Math.max(1,Math.floor(area[1]+area[3])-top);
  // Read each cell at native resolution, without engine-dependent downsampling.
  // This bounds canvas memory while matching the build-time area means.
  function grid(cols,rows){const result=[];
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const sx=left+Math.floor(x*w/cols),sy=top+Math.floor(y*h/rows);
      const sw=Math.max(1,Math.floor((x+1)*w/cols)-Math.floor(x*w/cols)),sh=Math.max(1,Math.floor((y+1)*h/rows)-Math.floor(y*h/rows));
      canvas.width=sw;canvas.height=sh;ctx.fillStyle='#fff';ctx.fillRect(0,0,sw,sh);
      ctx.drawImage(image,sx,sy,sw,sh,0,0,sw,sh);result.push(meanRGB(ctx.getImageData(0,0,sw,sh).data));
    }return result;
  }
  const gray=grid(9,8).map(([r,g,b])=>.299*r+.587*g+.114*b);let hash='';
  for(let y=0;y<8;y++)for(let x=0;x<8;x++)hash+=gray[y*9+x]>gray[y*9+x+1]?'1':'0';
  const cells=grid(4,4).flat(),mean=gray.reduce((sum,n)=>sum+n,0)/gray.length;
  const variation=Math.sqrt(gray.reduce((sum,n)=>sum+(n-mean)**2,0)/gray.length);
  canvas.width=canvas.height=1;return {hash,cells,variation};
}
export function rankProducts(query, products, limit = 24) {
  const unique = new Map();
  for (const p of products) {
    if (!validProduct(p)) continue;
    const score = distance(query, p), previous = unique.get(p.path);
    if (!previous || score < previous.score) unique.set(p.path, { p, score });
  }
  return [...unique.values()].sort((a, b) => a.score - b.score || a.p.path.localeCompare(b.p.path)).slice(0, limit);
}
export function selectResults(ranked) {
  if (!ranked.length) return {items:[], weak:true};
  const best = ranked[0].score;
  if (best > .27) return {items:ranked.slice(0, 6), weak:true};
  // A clear first result should not be padded with visually distant products.
  return {items:ranked.filter(item => item.score <= Math.min(.27, best + .09)), weak:false};
}
