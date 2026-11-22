export function skuLink(original, id, selections) {
  const link = new URL(original);
  link.searchParams.set('skuId', id);
  const label = encodeURIComponent(selections.join(' / ')).replace(/_/g,'%5F');
  link.hash = 'sku_' + link.searchParams.get('itemID') + '_' + label + '_' + id;
  return link.href;
}

function bindDrag(panel) {
  let start, dragged = false;
  panel.addEventListener('pointerdown', event => {
    dragged = false;
    if (event.button === 0 && event.pointerType === 'mouse') start = {y:event.clientY, top:panel.scrollTop};
  });
  panel.addEventListener('pointermove', event => {
    if (!start || !event.buttons) return;
    const dy = event.clientY - start.y;
    if (Math.abs(dy)>5 && panel.scrollHeight>panel.clientHeight) {
      dragged = true;
      panel.setPointerCapture(event.pointerId);
      panel.scrollTop = start.top - dy;
      event.preventDefault();
    }
  });
  const stop = () => { start=null; };
  panel.addEventListener('pointerup', stop);
  panel.addEventListener('pointercancel', stop);
  panel.addEventListener('click', event => {
    if (dragged) { dragged=false; event.preventDefault(); event.stopPropagation(); }
  },true);
}

export function bindProduct(root) {
  const skus=JSON.parse(root.querySelector('[data-sku-model]').textContent);
  const groups=[...root.querySelectorAll('[data-sku-group]')];
  const choices=new Map();
  const copy=root.querySelector('[data-copy-source]');
  const status=root.querySelector('[role=status]');
  const price=root.querySelector('[data-list-usd]');
  const picture=root.querySelector('.pick-main');
  const primaryTitle=picture?.querySelector('img')?.alt || '';
  let copyUrl=copy?.dataset.copySource || '';

  function showImage(url,alt) {
    if (!picture || !url) return;
    picture.href=url;
    const img=picture.querySelector('img');
    img.src=url;
    img.alt=alt || primaryTitle;
  }
  function refresh() {
    const ids=[...choices.values()];
    const exact=ids.length>0 && ids.length===groups.length && skus.find(s=>s.attrs.length===ids.length && ids.every(id=>s.attrs.includes(id)));
    groups.forEach((group,i)=>{
      const earlier=groups.slice(0,i).map(g=>choices.get(g)).filter(Boolean);
      const buttons=[...group.querySelectorAll('[data-attr-id]')];
      for (const b of buttons) {
        b.disabled=!!skus.length&&!skus.some(s=>s.attrs.includes(b.dataset.attrId)&&earlier.every(id=>s.attrs.includes(id)));
        b.setAttribute('aria-pressed',String(b.dataset.attrId===choices.get(group)));
      }
      group.querySelector('output').textContent=buttons.find(b=>b.dataset.attrId===choices.get(group))?.title || '';
    });
    for (const anchor of document.querySelectorAll('.language-grid a')) {
      const link=new URL(anchor.href);
      if(ids.length)link.searchParams.set('options',ids.join(','));
      else link.searchParams.delete('options');
      anchor.href=link.href;
    }
    if(copy){
      const names = groups.map(g=>g.querySelector('[aria-pressed=true]')?.dataset.original || '');
      copyUrl=exact ? skuLink(copy.dataset.copySource,exact.id,names) : ids.length ? '' : copy.dataset.copySource;
      copy.disabled=!copyUrl;
      copy.textContent=ids.length ? copy.dataset.style : copy.dataset.item;
    }
    status.textContent=ids.length&&!exact ? root.dataset.hint : '';
    if(price){
      if(exact && Number.isFinite(exact.price)){
        delete price.dataset.usd;
        price.dataset.cny=String(exact.price);
        price.textContent=new Intl.NumberFormat(document.documentElement.lang,{style:'currency',currency:'CNY'}).format(exact.price);
      } else {
        delete price.dataset.cny;
        price.dataset.usd=price.dataset.listUsd;
        price.textContent=new Intl.NumberFormat(document.documentElement.lang,{style:'currency',currency:'USD'}).format(Number(price.dataset.listUsd));
      }
    }
    if(exact?.image)showImage(exact.image,groups.map(g=>g.querySelector('output').textContent).join(' / '));
  }
  function pick(btn) {
    const group=btn.closest('[data-sku-group]');
    choices.set(group,btn.dataset.attrId);
    for(const other of groups.slice(groups.indexOf(group)+1)){
      const needed=groups.slice(0,groups.indexOf(other)+1).map(g=>choices.get(g)).filter(Boolean);
      if(skus.length&&!skus.some(s=>needed.every(id=>s.attrs.includes(id))))choices.delete(other);
    }
    if(btn.dataset.image)showImage(btn.dataset.image,btn.title);
    refresh();
  }
  root.querySelectorAll('.pick-options').forEach(bindDrag);
  root.addEventListener('click',async event=>{
    const btn=event.target.closest('button');
    if(!btn || btn.disabled)return;
    if(btn.hasAttribute('data-attr-id'))return pick(btn);
    if(btn.dataset.galleryImage)return showImage(btn.dataset.galleryImage);
    if(btn!==copy || !copyUrl)return;
    try {await navigator.clipboard.writeText(copyUrl);status.textContent=copy.dataset.success;}
    catch {
      const input=document.createElement('input');
      input.value=copyUrl;input.readOnly=true;input.setAttribute('aria-label',copy.textContent);
      status.replaceChildren(input);input.focus();input.select();
    }
  });
  const params=new URLSearchParams(location.search);
  const incoming=new Set((params.get('options')||'').split(','));
  const photo=params.get('match');
  for(const group of groups){
    const buttons=[...group.querySelectorAll('[data-attr-id]')];
    const restored=buttons.find(b=>incoming.has(b.dataset.attrId)) || (photo && buttons.find(b=>b.dataset.image===photo));
    if(restored && !restored.disabled)pick(restored);
  }
  if(photo && [...root.querySelectorAll('img')].some(img=>img.getAttribute('src')===photo))showImage(photo);
}
