const picker=document.querySelector('#upload'), status=document.querySelector('#status'),results=document.querySelector('#matches'),cfg=JSON.parse(document.querySelector('#search-ui').textContent);
const worker=new Worker('/visual-index/search-worker.js');let active=0;
function signature(bitmap){
 const sample=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.imageSmoothingQuality='high';x.drawImage(bitmap,0,0,w,h);return x.getImageData(0,0,w,h).data;};
 const small=sample(8,8),gray=sample(9,8),color=[],hash=[];let bits='';
 for(let y=0;y<4;y++)for(let x=0;x<4;x++)for(let k=0;k<3;k++){let sum=0;for(let j=0;j<2;j++)for(let i=0;i<2;i++)sum+=small[((2*y+j)*8+2*x+i)*4+k]>>3;color.push(Math.round(sum/4));}
 function luma(i){return Math.round(.299*gray[i]+.587*gray[i+1]+.114*gray[i+2]);}
 for(let y=0;y<8;y++)for(let x=0;x<8;x++){const i=(y*9+x)*4;bits+=luma(i+4)>luma(i)?'1':'0';}
 for(let i=0;i<64;i+=4)hash.push(parseInt(bits.slice(i,i+4),2));
 return {color,areaColor:color,hash,areaHash:hash};
}
picker.onchange=async()=>{const file=picker.files[0],id=++active;results.replaceChildren();if(!file)return;status.textContent=cfg.searching;
 try{if(file.size>20*1024*1024)throw Error();const bitmap=await createImageBitmap(file);const query=signature(bitmap);bitmap.close();if(id===active)worker.postMessage({id,query});}catch{status.textContent=cfg.invalid;}};
worker.onerror=()=>{status.textContent=cfg.error;};
worker.onmessage=async({data})=>{if(data.id!==active)return;if(data.error){status.textContent=cfg.error;return;}
 status.textContent=data.matches.length?cfg.results+' · '+data.total.toLocaleString()+' / '+data.photos.toLocaleString():cfg.empty;
 let labels={};try{const r=await fetch('/'+cfg.lang+'/image-titles',{method:'POST',body:JSON.stringify(data.matches.map(x=>x.title))});if(r.ok)labels=await r.json()}catch{}
 if(data.id!==active)return;
 for(const item of data.matches){if(!/^\/?[a-z0-9-]+\/\d+\.html$/.test(item.path))continue;
 const a=document.createElement('a'),img=new Image(),h=document.createElement('h3');a.className='card';a.href='/'+cfg.lang+'/'+item.path.replace(/^\//,'');img.src=item.url;img.referrerPolicy='no-referrer';img.loading='lazy';img.style='width:100%;aspect-ratio:1;object-fit:contain';img.onerror=()=>{img.onerror=null;if(item.fallback)img.src=item.fallback};h.textContent=labels[item.title]||item.title;a.append(img,h);results.append(a);}
};
