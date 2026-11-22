(()=>{
 const locale=document.querySelector('[data-locale]')?.dataset.locale||'en';
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const main=document.getElementById('gallery-main');
 if(main){let current=0,start=null;const thumbs=[...document.querySelectorAll('[data-gallery-index]')];const go=i=>{current=Math.max(0,Math.min(thumbs.length-1,i));main.src=thumbs[current].querySelector('img').src;thumbs.forEach((t,n)=>t.setAttribute('aria-current',String(n===current)));document.querySelector('[data-gallery-prev]').disabled=current===0;document.querySelector('[data-gallery-next]').disabled=current===thumbs.length-1;};thumbs.forEach((t,i)=>t.addEventListener('click',()=>go(i)));document.querySelector('[data-gallery-prev]').onclick=()=>go(current-1);document.querySelector('[data-gallery-next]').onclick=()=>go(current+1);main.addEventListener('touchstart',e=>start=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>40)go(current+(e.changedTouches[0].clientX<start?1:-1));start=null;},{passive:true});go(0);}
 const home=document.getElementById('lolo-live-products');if(home)fetch('/api/catalog').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(data.products?.length)home.innerHTML=data.products.slice(0,4).map(p=>`<article class="catalog-card"><a href="${base}${esc(p.path)}"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="400" height="400" loading="lazy"><h2>${esc(p.title)}</h2><div class="card-meta"><strong>$${Number(p.price).toFixed(2)}</strong><span>USD · QC ↗</span></div></a></article>`).join('')}).catch(()=>{});
function imageFeatures(image) {
  function pixels(width) {
    const canvas=document.createElement('canvas');
    canvas.width=width; canvas.height=8;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,width,8);
    ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';
    ctx.drawImage(image,0,0,width,8);
    return ctx.getImageData(0,0,width,8).data;
  }
  const tile=pixels(8), color=[];
  for(let y=0;y<4;y++) for(let x=0;x<4;x++) for(let c=0;c<3;c++) {
    let total=0;
    for(let dy=0;dy<2;dy++) for(let dx=0;dx<2;dx++) total+=tile[((y*2+dy)*8+x*2+dx)*4+c]>>3;
    color.push(Math.round(total/4));
  }
  const gray=pixels(9),lum=i=>.299*gray[i]+.587*gray[i+1]+.114*gray[i+2];
  let bits='';
  for(let y=0;y<8;y++) for(let x=0;x<8;x++) {
    const pos=(y*9+x)*4;
    bits+=lum(pos+4)>lum(pos)?'1':'0';
  }
  const width=image.naturalWidth||image.width,height=image.naturalHeight||image.height;
  const c=document.createElement('canvas'),ctx=c.getContext('2d',{willReadFrequently:true});
  function area(cols,rows) {
    const cells=[];
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const sx=Math.floor(x*width/cols),sy=Math.floor(y*height/rows);
      const sw=Math.max(1,Math.floor((x+1)*width/cols)-sx),sh=Math.max(1,Math.floor((y+1)*height/rows)-sy);
      // Bound memory for very large camera originals; ordinary catalog photos use native cell means.
      const scale=Math.min(1,384/Math.max(sw,sh));c.width=Math.max(1,Math.round(sw*scale));c.height=Math.max(1,Math.round(sh*scale));
      ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);
      ctx.drawImage(image,sx,sy,sw,sh,0,0,c.width,c.height);
      const a=ctx.getImageData(0,0,c.width,c.height).data,rgb=[0,0,0];
      for(let i=0;i<a.length;i+=4){rgb[0]+=a[i];rgb[1]+=a[i+1];rgb[2]+=a[i+2]}
      cells.push(rgb.map(v=>Math.round(v/(a.length/4))));
    }
    return cells;
  }
  const grayArea=area(9,8).map(rgb=>.299*rgb[0]+.587*rgb[1]+.114*rgb[2]);
  let areaBits='';
  for(let y=0;y<8;y++)for(let x=0;x<8;x++)areaBits+=grayArea[y*9+x]>grayArea[y*9+x+1]?'1':'0';
  const areaHash=Array.from({length:16},(_,i)=>parseInt(areaBits.slice(i*4,i*4+4),2));
  return {areaHash,areaColor:area(4,4).flat().map(v=>v>>3),color,hash:Array.from({length:16},(_,i)=>parseInt(bits.slice(i*4,i*4+4),2))};
}

const input=document.getElementById('image-file');
if(!input)return;
const region=input.closest('section'),preview=document.getElementById('image-preview'),results=document.getElementById('image-results'),status=document.getElementById('image-status');
region.querySelector('.catalog-note')?.remove();
const imageLocale=document.documentElement.lang||'en';
const imageBase=location.pathname.split('/catalog')[0]+'/catalog';
let runId=0,blobURL,worker;
function showError(){status.textContent='Image search is unavailable. Please select the image to retry.';}
function startWorker(){
  const w=new Worker('/visual-index/search-worker.js');
  w.onerror=()=>{if(w===worker){worker.terminate();worker=null;showError()}};
  w.onmessage=({data})=>{
    if(data.id!==runId)return;
    if(data.error){showError();return}
    const list=document.createDocumentFragment();
    for(const {path,url,title,fallback} of data.matches){
      if(!/^\/[a-z0-9-]+\/\d+\.html$/.test(path))continue;
      const card=document.createElement('article'),link=document.createElement('a'),picture=document.createElement('img'),name=document.createElement('h2');
      card.className='catalog-card';link.href=imageBase+path+'?match='+encodeURIComponent(url);
      picture.src=url;picture.alt=title;picture.loading='lazy';picture.width=400;picture.height=400;
      if(fallback&&fallback!==url)picture.addEventListener('error',()=>{picture.src=fallback},{once:true});
      name.textContent=title;link.append(picture,name);card.append(link);list.append(card);
    }
    results.replaceChildren(list);
    status.textContent=data.matches.length?'Similar products: '+data.matches.length:'No similar products found.';
    let coverage=document.getElementById('visual-coverage');
    if(!coverage){coverage=document.createElement('p');coverage.id='visual-coverage';region.append(coverage)}
    const format=new Intl.NumberFormat(imageLocale);
    coverage.textContent='Indexed images: '+format.format(data.photos)+' · '+'Products: '+format.format(data.total)+' / '+format.format(data.catalog);
  };
  return w;
}
async function search(file){
  if(!file)return;
  const id=++runId;
  results.replaceChildren();preview.hidden=true;
  if(blobURL){URL.revokeObjectURL(blobURL);blobURL=null}
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024*1024){status.textContent='JPEG · PNG · WebP · ≤ 20 MB';return}
  status.textContent='Searching images…';
  blobURL=URL.createObjectURL(file);
  const img=new Image();img.src=blobURL;
  try{
    await img.decode();if(id!==runId)return;
    preview.src=blobURL;preview.hidden=false;
    worker||=startWorker();worker.postMessage({id,query:imageFeatures(img)});
  }catch{if(id===runId)showError()}
}
input.addEventListener('change',()=>{const f=input.files[0];input.value='';search(f)});
region.addEventListener('dragover',e=>e.preventDefault());
region.addEventListener('drop',e=>{e.preventDefault();search(e.dataTransfer.files[0])});
document.addEventListener('paste',e=>{const item=Array.from(e.clipboardData?.items||[]).find(it=>it.type.startsWith('image/'));if(item)search(item.getAsFile())});
})();
