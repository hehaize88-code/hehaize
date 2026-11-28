const picker=document.querySelector('#upload');
const filename=document.querySelector('#filename');
const statusText=document.querySelector('#status');
const results=document.querySelector('#matches');
const cfg=JSON.parse(document.querySelector('#search-ui').textContent);
const retry=document.querySelector('#image-retry');
let worker=null,active=0,lastFile=null;
const cards=new Map();
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
function packedHash(values){
 return Array.from({length:8},(_,i)=>(values[i*2]<<4)|values[i*2+1]);
}
async function search(file){
 const id=++active;lastFile=file;retry.hidden=true;
 filename.textContent=file.name;results.replaceChildren();cards.clear();statusText.textContent=cfg.searching;
 let bitmap;
 try{
  if(file.size>20*1024*1024)throw Error();
  if(typeof createImageBitmap==='function'){
   try{bitmap=await createImageBitmap(file);}catch{}
  }
  if(!bitmap){
   const objectUrl=URL.createObjectURL(file);
   try{bitmap=new Image();bitmap.src=objectUrl;await bitmap.decode();}finally{URL.revokeObjectURL(objectUrl);}
  }
  if((bitmap.naturalWidth||bitmap.width)*(bitmap.naturalHeight||bitmap.height)>40000000)throw Error();
  const f=imageFeatures(bitmap);
  if(id!==active)return;
  if(!worker){
   worker=new Worker('/photo-match/search-worker.js?v=2');
   worker.onmessage=show;worker.onerror=()=>{worker?.terminate();worker=null;statusText.textContent=cfg.error;retry.hidden=false;};
  }
  worker.postMessage({id,query:{canvas:{color:f.color,hash:packedHash(f.hash)},area:{color:f.areaColor,hash:packedHash(f.areaHash)}}});
 }catch{if(id===active)statusText.textContent=cfg.invalid;}
 finally{bitmap?.close?.();}
}
async function show({data}){
 if(data.id!==active)return;
 if(data.error){statusText.textContent=cfg.error;retry.hidden=false;return;}
 if(data.images){
  for(const [path,url] of data.images){const img=cards.get(path)?.img;if(img&&url&&img.src!==url)img.src=url;}
  return;
 }
 statusText.textContent=data.weak?cfg.nearest:cfg.results+' · '+data.matches.length.toLocaleString(cfg.lang);
 for(const item of data.matches){
  const a=document.createElement('a'),img=new Image(),heading=document.createElement('h3');
  a.className='card';a.href='/'+cfg.lang+item.path;img.src=item.url;img.loading='lazy';img.alt='';img.referrerPolicy='no-referrer';img.style='width:100%;aspect-ratio:1;object-fit:contain';
  img.onerror=()=>{if(img.src!==item.url){img.onerror=null;img.src=item.url;}};
  heading.textContent=item.title;a.append(img,heading);cards.set(item.path,{img,heading});results.append(a);
 }
 try{
  const r=await fetch('/'+cfg.lang+'/image-titles',{method:'POST',body:JSON.stringify(data.matches.map(x=>x.title))});
  if(!r.ok||data.id!==active)return;
  const labels=await r.json();if(data.id!==active)return;
  for(const item of data.matches){if(labels[item.title])cards.get(item.path).heading.textContent=labels[item.title];}
 }catch{}
}
picker.addEventListener('change',()=>{const file=picker.files[0];if(file)search(file);picker.value='';});
retry.addEventListener('click',()=>{if(lastFile)search(lastFile);});
