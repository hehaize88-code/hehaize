// area-v2: deterministic cell-area RGB means shared with the Python indexer.
// No uploads, remote inference, new database or paid service.
export const MAX_BYTES = 20 * 1024 * 1024;
export function acceptsImage(file) {
  if (!file || file.size <= 0 || file.size > MAX_BYTES) return false;
  if (/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return true;
  return (!file.type || file.type === 'application/octet-stream') && /\.(jpe?g|png|webp|gif)$/i.test(file.name || '');
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

export function searchIndex(index, pixels) {
  const resize=resizeFingerprint(pixels);
  const area=fingerprint(pixels);
  const signature={areaHash:nibbles(area.hash),areaColor:area.cells.map(v=>v>>3),hash:nibbles(resize.hash),color:resize.color};
  const results=index.products.map(({slug,photos})=>{
    let score=Infinity,match;
    for(const photo of photos) {
      const distance=scorePhoto(photo[1],photo[2],signature);
      if(distance<score){score=distance;match=photo;}
    }
    return {slug,score,photo:match};
  }).sort((a,b)=>a.score-b.score);
  const weak=results.length===0 || results[0].score>.24;
  return {weak,items:weak?results.slice(0,6):results.filter(r=>r.score<=Math.min(.27,results[0].score+.09)).slice(0,16)};
}

function start() {
  const {labels,destinations}=JSON.parse(document.querySelector('#search-settings').textContent);
  const status=document.querySelector('#status'), matches=document.querySelector('#matches'), preview=document.querySelector('#preview');
  const input=document.querySelector('#photo'), panel=input.parentElement;
  let active=0, cached, previewUrl;
  function getIndex() {
    if(!cached) cached=fetch('/kamey-search/index.json').then(async r=>{
      if(!r.ok)throw Error('Index unavailable');return r.json();
    }).catch(e=>{cached=undefined;throw e});
    return cached;
  }
  async function search(file) {
    const serial=++active;
    matches.replaceChildren();preview.hidden=true;
    if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}
    if(!file)return;
    if(!acceptsImage(file)){status.textContent=labels.invalid;return}
    status.textContent=labels.progress;
    const tempUrl=URL.createObjectURL(file);
    try{
      const image=new Image();image.src=tempUrl;
      const [index]=await Promise.all([getIndex(),image.decode()]);
      if(serial!==active)return;
      preview.src=tempUrl;preview.hidden=false;previewUrl=tempUrl;
      await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done)));
      if(serial!==active)return;
      let pixels=image;
      // Keep memory and CPU bounded on phone-camera originals.
      const max=Math.max(image.naturalWidth,image.naturalHeight);
      if(max>1100){
        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*1100/max));canvas.height=Math.max(1,Math.round(image.naturalHeight*1100/max));
        const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,canvas.width,canvas.height);pixels=canvas;
      }
      const result=searchIndex(index,pixels);
      for(const {slug,photo} of result.items) {
        const [name,href]=destinations[slug], link=document.createElement('a'),img=document.createElement('img');
        const url=new URL(href,location.origin);
        if(photo[4])url.searchParams.set('style',photo[4]);else url.searchParams.set('photo',photo[0]);
        link.href=url;img.src=photo[0];img.alt='';img.loading='lazy';
        const title=document.createElement('strong');title.textContent=name;
        const kind=document.createElement('small');kind.textContent=labels[photo[3]];
        link.append(img,title,kind);matches.append(link);
      }
      status.textContent=result.weak?labels.weak:labels.results;
    }catch{if(serial===active)status.textContent=labels.failed}
    finally{if(previewUrl!==tempUrl)URL.revokeObjectURL(tempUrl)}
  }
  input.addEventListener('change',()=>{const file=input.files?.[0];input.value='';if(file)search(file)});
  panel.addEventListener('dragover',e=>{e.preventDefault();panel.classList.add('drag')});
  panel.addEventListener('dragleave',()=>panel.classList.remove('drag'));
  panel.addEventListener('drop',e=>{e.preventDefault();panel.classList.remove('drag');if(e.dataTransfer.files.length)search(e.dataTransfer.files[0])});
}
if(typeof document!=='undefined' && document.querySelector('#search-settings')) start();
