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
})();
