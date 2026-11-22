(() => {
  'use strict';
  const names={en:'English',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano',nl:'Nederlands',pt:'Português',pl:'Polski',ro:'Română',sv:'Svenska','zh-cn':'简体中文',da:'Dansk',fi:'Suomi',el:'Ελληνικά',cs:'Čeština',hu:'Magyar',bg:'Български',sk:'Slovenčina',hr:'Hrvatski',ja:'日本語',ko:'한국어',vi:'Tiếng Việt',th:'ไทย',id:'Bahasa Indonesia'};
  const codes=new Set(Object.keys(names));
  const first=location.pathname.split('/')[1]?.toLowerCase();
  const locale=codes.has(first)?first:'en';
  const activeTag=locale==='zh-cn'?'zh-CN':locale;
  function restoreMenu(){
    if(document.documentElement.lang!==activeTag)document.documentElement.lang=activeTag;
    const menu=document.querySelector('.lolo-language');if(!menu)return;
    const path=codes.has(first)?location.pathname.replace(/^\/[^/]+/,'')||'/':location.pathname;
    const summary=menu.querySelector('summary'),div=menu.querySelector('div');
    if(!summary||!div)return;
    const value=names[locale]+' ⌄';
    if(summary.textContent!==value)summary.textContent=value;
    if(summary.getAttribute('aria-label')!==names[locale])summary.setAttribute('aria-label',names[locale]);
    if(!summary.hasAttribute('translate'))summary.setAttribute('translate','no');
    const existing=div.querySelectorAll('a');
    if(existing.length!==codes.size){
      div.replaceChildren(...Object.entries(names).map(([id,name])=>{
        const a=document.createElement('a');a.dataset.localeTarget=id;
        a.hreflang=a.lang=id==='zh-cn'?'zh-CN':id;a.textContent=name;
        a.translate=false;if(id===locale)a.setAttribute('aria-current','true');
        return a;
      }));
    }
    for(const a of div.querySelectorAll('a[data-locale-target]')){
      const id=a.dataset.localeTarget;
      const href=(id==='en'?'':'/'+id)+path+location.search+location.hash;
      if(a.getAttribute('href')!==href)a.setAttribute('href',href);
    }
  }
  restoreMenu();
  const exclude='script,style,code,pre,textarea,noscript,template,input[type=password],[contenteditable],.lolo-language,[translate=no]';
  const attrs=['alt','title','aria-label','placeholder'];
  const productSelector='h1,h2,h3,.catalog-card,[data-style-name]';
  const known=new Map(), targets=new Map();
  let scheduled=false, running=false, retry=0;
  function route(el) {
    const attr=el.matches('a[href]')?'href':el.matches('form[action]')?'action':null;
    if(!attr||el.closest('.lolo-language')||locale==='en')return;
    const value=el.getAttribute(attr);
    if(!value||/^[?#]/.test(value))return;
    const url=new URL(value,location.href);
    if(url.origin!==location.origin||/^\/(api|assets|social|worker-chunks|\.well-known|products-320|products-480)(\/|$)/.test(url.pathname)||/\.(?!html?$)[a-z0-9]{1,8}$/i.test(url.pathname))return;
    const first=url.pathname.split('/')[1].toLowerCase();
    if(first===locale)return;
    const path=codes.has(first)?url.pathname.replace(/^\/[^/]+/,'')||'/':url.pathname;
    el.setAttribute(attr,'/'+locale+path+url.search+url.hash);
  }
  function enqueue(node,attr) {
    const el=attr?node:node.parentElement;
    if(!el||el.closest(exclude))return;
    const raw=attr?node.getAttribute(attr):node.data;
    const s=raw?.trim();
    if(!s||s.length>5000||!/[\p{L}]/u.test(s)||/^(?:https?:\/\/|[\w.-]+\.(?:net|com)$|(?:USD|EUR|CNY|JPY|GBP|CAD|AUD|CHF|HKD|KRW)$)/.test(s))return;
    if(locale==='en'&&!/[\u3000-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(s)&&!el.closest(productSelector)&&attr!=='alt')return;
    const apply=value=>{
      if(!node.isConnected||value===s)return;
      if(attr){if(node.getAttribute(attr)===raw)node.setAttribute(attr,raw.replace(s,()=>value));}
      else if(node.data===raw)node.data=raw.replace(s,()=>value);
    };
    if(known.has(s)){apply(known.get(s));return;}
    if(!targets.has(s))targets.set(s,[]);
    targets.get(s).push(apply);
    schedule();
  }
  function inspect(node) {
    if(node.nodeType===Node.TEXT_NODE){enqueue(node);return;}
    if(node.nodeType!==Node.ELEMENT_NODE||node.closest(exclude))return;
    const walk=document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{
      acceptNode(n){return n.nodeType===1&&n.matches(exclude)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}
    });
    let current=node;
    do {
      if(current.nodeType===Node.TEXT_NODE)enqueue(current);
      else {route(current);for(const a of attrs)if(current.hasAttribute(a))enqueue(current,a);}
    } while((current=walk.nextNode()));
  }
  function schedule(){
    if(scheduled||running)return;
    scheduled=true;
    setTimeout(()=>{scheduled=false;flush();},retry?Math.min(30000,1000*2**retry):80);
  }
  async function browserTranslations(strings) {
    const query=new URLSearchParams();
    for(const text of strings)query.append('q',text);
    const result=await fetch('https://translate.googleapis.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl='+encodeURIComponent(activeTag),{
      method:'POST',credentials:'omit',referrerPolicy:'no-referrer',body:query,
      signal:AbortSignal.timeout(18000)
    });
    if(!result.ok)throw Error('Translations temporarily unavailable');
    const rows=await result.json();
    if(!Array.isArray(rows)||rows.length!==strings.length)throw Error('Incomplete translations');
    return rows.map(row=>Array.isArray(row)?row[0]:row);
  }
  async function flush(){
    if(running||!targets.size)return;
    running=true;
    const strings=[];let size=0;
    for(const s of targets.keys()){
      if(strings.length>=45||size&&size+s.length>17000)break;
      strings.push(s);size+=s.length;
    }
    try {
      let values=[];
      try{
        const response=await fetch('/_locale/strings',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({locale,strings}),signal:AbortSignal.timeout(4500)});
        if(response.ok)values=await response.json();
      }catch{}
      if(!Array.isArray(values))values=[];
      const missing=strings.map((s,i)=>values[i]?null:i).filter(i=>i!==null);
      if(missing.length){
        const translated=await browserTranslations(missing.map(i=>strings[i]));
        missing.forEach((index,i)=>{values[index]=translated[i];});
      }
      if(values.some(v=>typeof v!=='string'||!v))throw Error('Incomplete translations');
      strings.forEach((s,i)=>{
        const value=values[i];
        known.set(s,value);known.set(value,value);
        for(const apply of targets.get(s)||[])apply(value);
        targets.delete(s);
      });
      retry=0;
    }catch{retry=Math.min(5,retry+1);}
    finally{running=false;if(targets.size)schedule();}
  }
  const observer=new MutationObserver(records=>{
    restoreMenu();
    for(const r of records) {
      if(r.type==='childList'){for(const n of r.addedNodes)inspect(n);}
      else if(r.type==='characterData')enqueue(r.target);
      else if(r.attributeName==='href'||r.attributeName==='action')route(r.target);
      else enqueue(r.target,r.attributeName);
    }
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:[...attrs,'href','action']});
  if(document.documentElement.hasAttribute('data-locale-retry'))inspect(document.body);
  // Some storefront modules run before defer scripts and insert English-only data.
  for(const el of document.querySelectorAll('[data-live-localize],#lolo-live-products,#image-results'))inspect(el);
  if(locale!=='en'){
    // Use a full localized document on editorial links, including client-router links.
    document.addEventListener('click',evt=>{
      const a=evt.target.closest?.('a[href]');
      if(!a||evt.defaultPrevented||evt.button!==0||evt.metaKey||evt.ctrlKey||evt.shiftKey||evt.altKey||a.target&&a.target!=='_self'||a.hasAttribute('download'))return;
      const u=new URL(a.href);
      if(u.origin!==location.origin||u.pathname===location.pathname&&u.search===location.search&&u.hash)return;
      evt.preventDefault();location.assign(u.href);
    },true);
  }
})();
