/* Progressive mobile layout: all original content stays in the document. */
(() => {
const copy={en:['Expand all','Collapse sections','Previous','Next','Categories','Page'],zh:['展开全部','收起章节','上一页','下一页','商品分类','页'],de:['Alle öffnen','Abschnitte schließen','Zurück','Weiter','Kategorien','Seite'],pl:['Rozwiń wszystko','Zwiń sekcje','Poprzednia','Następna','Kategorie','Strona'],es:['Expandir todo','Contraer secciones','Anterior','Siguiente','Categorías','Página'],it:['Espandi tutto','Comprimi sezioni','Precedente','Successiva','Categorie','Pagina'],fr:['Tout ouvrir','Replier les sections','Précédente','Suivante','Catégories','Page'],pt:['Expandir tudo','Recolher seções','Anterior','Próxima','Categorias','Página'],ro:['Extinde tot','Restrânge secțiunile','Înapoi','Înainte','Categorii','Pagina'],sv:['Öppna alla','Fäll ihop avsnitt','Föregående','Nästa','Kategorier','Sida']};
function init(){
 const main=document.querySelector('main');if(!main||main.dataset.mobileReading==='v3')return;main.dataset.mobileReading='v3';
 const t=copy[main.dataset.locale||document.documentElement.lang.split('-')[0]]||copy.en,media=matchMedia('(max-width:680px)'),panels=[];let serial=0,printing=false;
 const button=(text,cls='')=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.className=cls;return b;};
 function panel(host,heading,initial=false){
  if(!host||!heading||host.dataset.mobilePanel)return;host.dataset.mobilePanel='true';host.id||=`mobile-section-${++serial}`;
  const content=document.createElement('div');content.className='mobile-section-content';content.id=host.id+'-content';while(heading.nextSibling)content.append(heading.nextSibling);
  const toggle=button('','mobile-section-toggle');toggle.setAttribute('aria-controls',content.id);while(heading.firstChild)toggle.append(heading.firstChild);heading.append(toggle);host.append(content);let open=initial;
  const render=()=>{const shown=printing||!media.matches||open;content.hidden=!shown;toggle.disabled=!media.matches;toggle.setAttribute('aria-expanded',String(shown));host.classList.toggle('mobile-section-collapsed',!shown);};
  const setOpen=value=>{open=value;render();};toggle.onclick=()=>setOpen(!open);media.addEventListener('change',render);const item={host,content,render,setOpen};panels.push(item);render();return item;
 }
 main.querySelectorAll('.article-body > section,.policy-copy > section').forEach((section,i)=>panel(section,section.querySelector(':scope > h2'),i===0&&section.textContent.length<1100));
 const body=main.querySelector('.article-body');if(body&&panels.length){const controls=document.createElement('div');controls.className='mobile-reading-controls';const expand=button(t[0]),collapse=button(t[1]);expand.onclick=()=>panels.forEach(p=>p.setOpen(true));collapse.onclick=()=>panels.forEach(p=>p.setOpen(false));controls.append(expand,collapse);body.prepend(controls);}
 const index=main.querySelector('.article-index'),title=index?.querySelector(':scope > strong');if(title){const h=document.createElement('h2');h.textContent=title.textContent;title.replaceWith(h);panel(index,h);}
 main.querySelectorAll('.home-steps,.home-context > div,.catalog-reading,.shipping-worksheet').forEach(el=>panel(el,el.querySelector(':scope > h2')));
 const filters=main.querySelector('.category-filters');if(filters){const wrap=document.createElement('section');wrap.className='mobile-filter-panel';const h=document.createElement('h2');h.textContent=t[4];filters.before(wrap);wrap.append(h,filters);panel(wrap,h);}
 function paging(grid,size){
  if(!grid||grid.dataset.mobilePaged)return;const cards=[...grid.children];if(cards.length<=size)return;grid.dataset.mobilePaged='true';grid.id||=`mobile-list-${++serial}`;let page=0;
  const pages=Math.ceil(cards.length/size),nav=document.createElement('nav');nav.className='mobile-list-pages';nav.setAttribute('aria-label',t[5]);const prev=button('← '+t[2]),next=button(t[3]+' →'),status=document.createElement('span');status.setAttribute('role','status');prev.setAttribute('aria-controls',grid.id);next.setAttribute('aria-controls',grid.id);nav.append(prev,status,next);grid.after(nav);
  function render(){cards.forEach((card,i)=>card.classList.toggle('mobile-reading-hidden',!printing&&media.matches&&Math.floor(i/size)!==page));nav.hidden=printing||!media.matches;prev.disabled=page===0;next.disabled=page===pages-1;status.textContent=`${page+1} / ${pages}`;}
  function move(delta){page=Math.max(0,Math.min(pages-1,page+delta));render();grid.scrollIntoView({block:'start'});cards[page*size]?.querySelector('a,summary,button')?.focus({preventScroll:true});}
  prev.onclick=()=>move(-1);next.onclick=()=>move(1);media.addEventListener('change',render);panels.push({host:grid,render,setOpen:()=>{}});render();
 }
 paging(main.querySelector('.seo-index-grid'),6);paging(main.querySelector('.guide-index-grid'),6);paging(main.querySelector('.faq-list'),10);main.querySelectorAll('.catalog-grid').forEach(grid=>paging(grid,12));
 const results=main.querySelector('#image-results');if(results)new MutationObserver(()=>{delete results.dataset.mobilePaged;if(results.nextElementSibling?.classList.contains('mobile-list-pages'))results.nextElementSibling.remove();paging(results,12);}).observe(results,{childList:true});
 function revealHash(hash){let id;try{id=decodeURIComponent(hash.replace(/^#/,''));}catch{return;}if(!id)return;const target=document.getElementById(id);if(!target)return;panels.forEach(p=>{if(p.host===target||p.content?.contains(target))p.setOpen(true);});}
 main.addEventListener('click',e=>{const a=e.target.closest('a[href*="#"]');if(a){try{const u=new URL(a.href);if(u.pathname===location.pathname)revealHash(u.hash);}catch{}}});window.addEventListener('hashchange',()=>revealHash(location.hash));revealHash(location.hash);
 window.addEventListener('beforeprint',()=>{printing=true;panels.forEach(p=>p.render());});window.addEventListener('afterprint',()=>{printing=false;panels.forEach(p=>p.render());});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
