(()=>{
 if(window.__hubbuyCatalogBound)return;window.__hubbuyCatalogBound=true;
 const locale=document.querySelector('[data-locale]')?.dataset.locale||document.documentElement.lang.toLowerCase()||'en';
 const base=(locale==='en'?'':'/'+locale)+'/catalog';
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const unavailable=locale==='pt-br'?'Foto indisponível':locale==='de'?'Foto nicht verfügbar':'Photo unavailable';
 function photoNotice(img){
  if(img.nextElementSibling?.classList.contains('catalog-image-unavailable'))return;
  img.hidden=true;const note=document.createElement('span');note.className='catalog-image-unavailable';note.setAttribute('role','img');note.setAttribute('aria-label',unavailable);note.textContent=unavailable;img.after(note);
 }
 const photoRequests=new Map();
 function recoveryCandidates(path){
  if(!photoRequests.has(path))photoRequests.set(path,fetch('/api/catalog-photos?'+new URLSearchParams({path})).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>data.images||[]));
  return photoRequests.get(path);
 }
 async function recoverCardImage(img){
  if(!(img instanceof HTMLImageElement)||img.dataset.imageRecovery)return;
  const card=img.closest('.catalog-card,.product-card');if(!card)return;
  const anchor=card.querySelector('a[href]'),path=anchor&&new URL(anchor.href).pathname.match(/\/catalog(\/[a-z0-9-]+\/\d+\.html)$/)?.[1];if(!path)return;
  img.dataset.imageRecovery='attempted';const failed=img.currentSrc||img.src;
  try { const candidates=await recoveryCandidates(path);
   for(const candidate of candidates){if(candidate===failed)continue;
    const valid=await new Promise(resolve=>{const probe=new Image(),timer=setTimeout(()=>resolve(false),10000);probe.onload=()=>{clearTimeout(timer);resolve(true)};probe.onerror=()=>{clearTimeout(timer);resolve(false)};probe.src=candidate;});
    if(valid){img.src=candidate;img.hidden=false;return;}
   }
  } catch {}
  photoNotice(img);
 }
 document.addEventListener('error',event=>recoverCardImage(event.target),true);
 document.querySelectorAll('.catalog-card img,.product-card img').forEach(img=>{if(img.complete&&!img.naturalWidth)recoverCardImage(img);});
 const main=document.getElementById('gallery-main');
 if(main&&document.querySelector('[data-gallery-index]')){
  let current=0,start=null;const thumbs=[...document.querySelectorAll('[data-gallery-index]')],failed=new Set(),prev=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]');
  const available=()=>thumbs.map((_,i)=>i).filter(i=>!failed.has(i));
  const go=i=>{const valid=available();if(!valid.length){prev.disabled=next.disabled=true;photoNotice(main);return;}current=valid.includes(i)?i:valid[0];main.src=thumbs[current].querySelector('img').src;main.hidden=false;thumbs.forEach((t,n)=>t.setAttribute('aria-current',String(n===current)));prev.disabled=current===valid[0];next.disabled=current===valid.at(-1);};
  const move=direction=>{const valid=available(),position=valid.indexOf(current);go(valid[Math.max(0,Math.min(valid.length-1,position+direction))]);};
  const reject=src=>{thumbs.forEach((t,i)=>{if(t.querySelector('img').src===src){failed.add(i);t.hidden=true;}});go(current);};
  thumbs.forEach((t,i)=>{t.addEventListener('click',()=>go(i));t.querySelector('img').addEventListener('error',()=>reject(t.querySelector('img').src));});
  main.addEventListener('error',()=>reject(main.currentSrc||main.src));prev.onclick=()=>move(-1);next.onclick=()=>move(1);
  main.addEventListener('touchstart',e=>start=e.touches[0].clientX,{passive:true});main.addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>40)move(e.changedTouches[0].clientX<start?1:-1);start=null;},{passive:true});
  go(0);thumbs.forEach(t=>{const img=t.querySelector('img');if(img.complete&&!img.naturalWidth)reject(img.src);});
 }
 const home=document.getElementById('hubbuy-live-products');if(home&&locale!=='en')fetch('/api/catalog').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(data.products?.length)home.innerHTML=data.products.slice(0,4).map(p=>`<article class="catalog-card"><a href="${base}${esc(p.path)}"><img src="${esc(p.image)}" alt="${esc(p.title)}" width="400" height="400" loading="lazy"><h3>${esc(p.title)}</h3><div class="card-meta"><strong>$${Number(p.price).toFixed(2)}</strong><span>USD · ↗</span></div></a></article>`).join('')}).catch(()=>{});
 function compactGrid(grid){
 if(!matchMedia('(max-width:680px)').matches||grid.children.length<=12)return;
 grid.nextElementSibling?.classList.contains('catalog-more')&&grid.nextElementSibling.remove();
 let visible=12;const children=[...grid.children];
 const button=document.createElement('button');button.type='button';button.className='catalog-more';
 const label=locale==='pt-br'?'Mostrar mais produtos':locale==='de'?'Mehr Produkte anzeigen':'Show more products';
 const update=()=>{children.forEach((card,i)=>card.hidden=i>=visible);button.textContent=label+' ('+Math.max(0,children.length-visible)+')';if(visible>=children.length)button.remove();};
 button.addEventListener('click',()=>{visible+=12;update();});grid.after(button);update();
 }
 document.querySelectorAll('.catalog-main>.catalog-grid').forEach(compactGrid);
 const input=document.getElementById('image-file');if(!input)return;
 const status=document.getElementById('image-status'),results=document.getElementById('image-results'),preview=document.getElementById('image-preview');
 const messages={en:['Loading image index…','Comparing catalogue images…','similar products','Could not read this image. Choose a JPEG, PNG or WebP under 10 MB.','Image index unavailable. Please try again.','products indexed','Index updated'],de:['Bildindex wird geladen…','Katalogbilder werden verglichen…','ähnliche Produkte','Bitte JPEG, PNG oder WebP unter 10 MB wählen.','Bildindex nicht verfügbar. Bitte erneut versuchen.','Produkte indexiert','Index aktualisiert'],pl:['Ładowanie indeksu zdjęć…','Porównywanie zdjęć…','podobnych produktów','Wybierz JPEG, PNG lub WebP poniżej 10 MB.','Indeks niedostępny. Spróbuj ponownie.','produktów w indeksie','Aktualizacja indeksu'],'pt-br':['Carregando índice de imagens…','Comparando imagens…','produtos semelhantes','Escolha JPEG, PNG ou WebP com menos de 10 MB.','Índice indisponível. Tente novamente.','produtos indexados','Índice atualizado']};messages.es=['Cargando índice de imágenes…','Comparando imágenes…','productos similares','Elige JPEG, PNG o WebP de menos de 10 MB.','Índice no disponible. Inténtalo de nuevo.','productos indexados','Índice actualizado'];messages.fr=['Chargement des images…','Comparaison des images…','produits similaires','Choisissez un JPEG, PNG ou WebP de moins de 10 Mo.','Index indisponible. Réessayez.','produits indexés','Index mis à jour'];messages.it=['Caricamento delle immagini…','Confronto delle immagini…','prodotti simili','Scegli JPEG, PNG o WebP sotto 10 MB.','Indice non disponibile. Riprova.','prodotti indicizzati','Indice aggiornato'];const m=messages[locale]||messages.en;
 let indexPromise,objectUrl,sequence=0;
 function fingerprint(img){const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});function data(w,h){canvas.width=w;canvas.height=h;ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);return ctx.getImageData(0,0,w,h).data;}const p=data(9,8),gray=[];for(let i=0;i<p.length;i+=4)gray.push(.299*p[i]+.587*p[i+1]+.114*p[i+2]);let hash='';for(let y=0;y<8;y++)for(let x=0;x<8;x++)hash+=gray[y*9+x]>gray[y*9+x+1]?'1':'0';const c=data(4,4),cells=[];for(let i=0;i<c.length;i+=4)cells.push(c[i],c[i+1],c[i+2]);return{hash,cells};}
 function distance(a,b){let h=0,color=0;for(let i=0;i<64;i++)h+=a.hash[i]!==b.hash[i];for(let i=0;i<48;i++)color+=Math.abs(a.cells[i]-b.cells[i]);return h/64*.7+color/(48*255)*.3;}
 input.addEventListener('change',async()=>{const turn=++sequence,file=input.files[0];results.innerHTML='';if(!file)return;if((file.type&&file.type!=='application/octet-stream'&&!['image/jpeg','image/png','image/webp'].includes(file.type))||file.size>10*1024*1024){status.textContent=m[3];return;}try{if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(file);preview.src=objectUrl;preview.hidden=false;await preview.decode();status.textContent=m[0];if(!indexPromise)indexPromise=fetch('/assets/catalog-image-index.json').then(r=>{if(!r.ok)throw Error();return r.json();}).catch(e=>{indexPromise=null;throw e;});const index=await indexPromise;if(turn!==sequence)return;status.textContent=m[1];await new Promise(r=>requestAnimationFrame(r));const fp=fingerprint(preview),ranked=index.products.map(p=>({p,score:distance(fp,p)})).sort((a,b)=>a.score-b.score).slice(0,24);if(turn!==sequence)return;results.innerHTML=ranked.map(({p})=>`<article class="catalog-card"><a href="${base}${esc(p.path)}"><img src="${esc(p.image.startsWith('https://')?p.image:'https://cnbuycha.com'+p.image)}" alt="${esc(p.title)}" width="400" height="400" loading="lazy"><h2>${esc(p.title)}</h2><div class="card-meta"><strong>$${Number(p.price).toFixed(2)}</strong><span>USD · ↗</span></div></a></article>`).join('');compactGrid(results);status.textContent=`${ranked.length} ${m[2]} · ${index.indexedCount}/${index.catalogCount} ${m[5]} · ${m[6]} ${index.updatedAt}`;}catch(e){if(turn===sequence)status.textContent=preview.complete&&preview.naturalWidth?m[4]:m[3];}});
})();
