// Only strings explicitly returned by the site's translation renderer are submitted.
// Never send DOM text, query strings, image data, form values, or product links.
const memo = new Map();
async function translateRows(rows, lang) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.search = new URLSearchParams({client:'gtx',sl:'auto',tl:lang,dt:'t',q:rows.join('\n')});
  const response = await fetch(url,{credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(9000)});
  if(!response.ok)throw Error('Translation unavailable');
  const data = await response.json();
  const translated = data[0].map(row=>row[0]||'').join('').trim().split(/\r?\n/);
  if(translated.length!==rows.length || translated.some(s=>!s.trim())){
    if(rows.length===1 && translated.some(s=>s.trim()))return [translated.join(' ')];
    if(rows.length===1)throw Error('Empty translation');
    const half=Math.ceil(rows.length/2);
    return [...await translateRows(rows.slice(0,half),lang),...await translateRows(rows.slice(half),lang)];
  }
  return translated;
}
async function restoreNameTokens(providerValue,{input,parts},lang) {
  if(parts.every(([token])=>providerValue.includes(token))){
    for(const [token,name] of parts)providerValue=providerValue.replaceAll(token,name);
    return providerValue;
  }
  const names=new Map(parts),chunks=input.split(/(⟪\d+⟫)/);
  const words=[...new Set(chunks.filter(s=>!names.has(s)&&/\p{L}/u.test(s)).map(s=>s.trim()))];
  const values=words.length?await translateRows(words,lang):[];
  const translated=new Map(words.map((s,i)=>[s,values[i]]));
  return chunks.map(s=>names.get(s)??(translated.has(s.trim())?s.replace(s.trim(),()=>translated.get(s.trim())):s)).join('');
}
export async function resolveLocalePending(pending,lang){
  const result=new Map(), groups=[];
  let group=[],size=0;
  for(const [source,entry] of pending||[]){
    const cacheKey=lang+'\n'+source;
    if(memo.has(cacheKey)){result.set(source,memo.get(cacheKey));continue}
    const bytes=encodeURIComponent(entry.input).length;
    if(group.length&&(group.length>=30||size+bytes>4500)){groups.push(group);group=[];size=0}
    group.push([source,entry]);size+=bytes+3;
  }
  if(group.length)groups.push(group);
  let next=0;
  await Promise.all(Array.from({length:Math.min(3,groups.length)},async()=>{
    while(next<groups.length){
      const rows=groups[next++];
      try{
        const translated=await translateRows(rows.map(([,entry])=>entry.input),lang);
        for(let i=0;i<rows.length;i++){
          const [source,entry]=rows[i],value=await restoreNameTokens(translated[i],entry,lang);
          result.set(source,value);
          if(memo.size>1000)memo.delete(memo.keys().next().value);
          memo.set(lang+'\n'+source,value);
        }
      }catch{}
    }
  }));
  return result;
}
async function finishPage(payload){
  const {lang,pending,fragments}=payload,values=await resolveLocalePending(pending,lang);
  const map=new Map();
  for(const [raw,replacements] of fragments){
    if(!values.has(raw))continue;
    let key=raw,value=values.get(raw);
    for(const [marker,term] of replacements){key=key.replaceAll(marker,term);value=value.replaceAll(marker,term)}
    map.set(key,value);
  }
  if(!map.size)return;
  const rewrite=s=>{
    const value=map.get(s.trim().replace(/\s+/g,' '));return value?s.replace(/\S[\s\S]*\S|\S/,()=>value):s;
  };
  const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
    const node=walker.currentNode;
    if(!node.parentElement?.closest('style,script,textarea,select.langs,[data-currency-select],[contenteditable]'))node.nodeValue=rewrite(node.nodeValue);
  }
  for(const el of document.querySelectorAll('*')){
    for(const attr of Array.from(el.attributes)){
      if(/^(?:alt|title|aria-label|placeholder|content|data-i18n-.+|data-error|data-(?:actual|volume|billed|cost)-label|data-norate)$/.test(attr.name)){
        const value=rewrite(attr.value);if(value!==attr.value)el.setAttribute(attr.name,value);
      }
    }
    if(el.tagName==='TEMPLATE')for(const option of el.content.querySelectorAll('option'))option.textContent=rewrite(option.textContent);
  }
  for(const script of document.querySelectorAll('script[type="application/ld+json"]')){
    try{script.textContent=JSON.stringify(JSON.parse(script.textContent,(_,value)=>typeof value==='string'?rewrite(value):value))}catch{}
  }
}
const seed=typeof document==='object'&&document.getElementById('hipo-locale-pending');
if(seed)finishPage(JSON.parse(seed.textContent)).catch(()=>{});
