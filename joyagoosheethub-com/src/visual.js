const visualEnglish = {
  imageSearch: 'Image search', upload: 'Choose a photo', uploadHelp: 'Choose a product, style or detail photo to find visually similar items.',
  searching: 'Searching photos', coverage: 'Products', images: 'Photos', unavailable: 'Unavailable', failed: 'Could not complete image search. Try again.', empty: 'No similar photos found.'
};
function visualWords(lang) { return EXTRA_LOCALES[lang]?.labels || visualEnglish; }
function visualLabel(lang) { return visualWords(lang).imageSearch; }

function visualPage(lang) {
  const words = visualWords(lang);
  return '<section class="listing"><h1>'+e(words.imageSearch)+'</h1><p>'+e(words.uploadHelp)+'</p><div class="visual-upload"><label class="btn">'+e(words.upload)+'<input id="visual-upload" type="file" accept="image/*"></label><img id="visual-preview" alt="" hidden><button type="button" id="visual-stop" class="chip" hidden>Ⅱ</button></div><p id="visual-status" role="status"></p><progress id="visual-progress" hidden></progress><div id="visual-results" class="grid"></div><script id="visual-words" type="application/json">'+JSON.stringify(words).replace(/</g,'\\u003c')+'</script><script defer src="/api/visual/client.js"></script></section>';
}

async function visualRoute(url,env) {
  const path = url.pathname;
  const params = url.searchParams;
  const json = (value, age=300) => Response.json(value,{headers:{'Cache-Control':'public,max-age='+age}});
  const lang = Object.hasOwn(locales,params.get('lang')) ? params.get('lang') : 'en';
  if(path==='/api/visual/client.js')return new Response('('+visualClient.toString()+')()', {headers:{'content-type':'application/javascript;charset=utf-8'}});
  if(path==='/api/visual/index')return json({...visualSnapshot,shards:shardCount});
  if(path.startsWith('/api/visual/shard/')){
    const match=path.match(/^\/api\/visual\/shard\/([a-f0-9]+)\/(\d+)$/);
    if(!match || match[1]!==visualSnapshot.version || +match[2]>=shardCount)return new Response('',{status:404});
    const asset=await env.ASSETS.fetch(new URL('/shards/'+Number(match[2])+'.bin',url));
    if (!asset.ok) return new Response('Image index unavailable',{status:503});
    const stream=asset.body.pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream,{headers:{'Content-Type':'application/json','Cache-Control':'public,max-age=31536000,immutable'}});
  }
  if(path==='/api/visual/list'){
    const page=Math.max(1,Math.floor(Number(params.get('p'))||1));
    const html=await read('/AllProducts/?page='+page);
    const total=Number(html.match(/Browse ([\d,]+) China shopping/i)?.[1]?.replaceAll(',',''));
    const items=cards(html).map(item=>[item.path,title(item.name,lang,item.path),item.img]);
    return json({items,total,next:items.length===60 && (!total || page*60<total)});
  }
  if(path==='/api/visual/product'||path==='/api/visual/name'){
    const itemPath=params.get('path')||'';
    if(!productPath.test(itemPath))return new Response('',{status:400});
    const html=await read(itemPath),item=detail(html);
    if(!item.id)return new Response('',{status:404});
    await prepareProductNames([item.name],lang);
    const name=title(item.name,lang,itemPath);
    if(path==='/api/visual/name')return json({name});
    const assets=pdMedia(html,item);
    const seller=assets.styles.length?{groups:[],skus:[]}:await pdSeller(item.id,item.original);
    const photos=[...new Set([...item.imgs,...assets.gallery,...assets.details,...assets.qc,...assets.styles.map(row=>row.image),...seller.groups.flatMap(g=>g.values.map(v=>v.image)),...seller.skus.map(v=>v.image)].filter(Boolean))];
    return json({name,photos});
  }
  if(path==='/api/visual/thumbnail'){
    let source;
    try{source=new URL(params.get('url'));}catch{return new Response('',{status:400});}
    const local=source.origin===origin && /^\/(?:uploads|media)\//.test(source.pathname);
    const seller=source.origin==='https://si.geilicdn.com' && /^\/[a-z\d_.-]+\.(?:jpe?g|png|webp)$/i.test(source.pathname);
    if(source.username||source.password||(!local&&!seller))return new Response('',{status:400});
    if(seller){ source.search=''; source.searchParams.set('w','144');source.searchParams.set('h','144'); }
    const response=await fetch(source.href,{redirect:'manual',cf:{image:{width:144,height:144,fit:'scale-down'},cacheEverything:true,cacheTtl:86400},signal:AbortSignal.timeout(10000)});
    if(!response.ok || !response.headers.get('content-type')?.startsWith('image/'))return new Response('',{status:404});
    return new Response(response.body,{headers:{'Content-Type':response.headers.get('content-type'),'Cache-Control':'public,max-age=86400'}});
  }
  return null;
}

function visualClient(){
  const el=id=>document.getElementById(id);
  const picker=el('visual-upload'), preview=el('visual-preview'), status=el('visual-status'), bar=el('visual-progress'), results=el('visual-results'), stop=el('visual-stop');
  const lang=document.documentElement.lang,words=JSON.parse(el('visual-words').textContent);
  const pop=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];
  async function json(path,signal){
    const r=await fetch(path,{signal});if(!r.ok)throw Error('Fetch failed');return r.json();
  }
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
  function distance(query,hash,encodedColor){
    const area=hash.length===17, offset=area?1:0, sample=area?query.areaColor:query.color, queryHash=area?query.areaHash:query.hash;
    const colors=atob(encodedColor);
    let hamming=0,color=0;
    for(let i=0;i<16;i++)hamming+=pop[queryHash[i]^parseInt(hash[offset+i],16)];
    for(let i=0;i<48;i++)color+=(sample[i]-colors.charCodeAt(i))**2;
    return .7*Math.sqrt(color/48)/31+.3*hamming/64;
  }
  let active;
  async function search(file){
    if(!file)return;
    active?.abort();
    active=new AbortController();
    const {signal}=active,objectUrl=URL.createObjectURL(file);
    const hits=new Map(),seen=new Set(),names=new Map(),cards=new Map();
    let imageCount=0,checked=0,total=0,errors=0,lastPaint=0,paused=false,refreshing=false;
    stop.hidden=false;stop.textContent='Ⅱ';
    stop.onclick=()=>{paused=!paused;stop.textContent=paused?'▶':'Ⅱ';};
    status.textContent=words.searching;bar.hidden=false;bar.removeAttribute('value');
    results.replaceChildren();preview.src=objectUrl;preview.hidden=false;
    async function gate(){
      while(paused&&!signal.aborted)await new Promise(resolve=>setTimeout(resolve,200));
      signal.throwIfAborted();
    }
    const api=(path)=>json('/api/visual/'+path,signal);
    async function labelFor(path,heading){
      if(!names.has(path))names.set(path,api('name?lang='+lang+'&path='+encodeURIComponent(path)).then(x=>x.name));
      try{heading.textContent=await names.get(path);}catch{names.delete(path);}
    }
    function paint(force=false){
      if(signal.aborted || !force && performance.now()-lastPaint<700)return;
      lastPaint=performance.now();
      status.textContent=(refreshing?'↻ ':'')+words.images+' '+imageCount.toLocaleString(lang)+' · '+words.coverage+' '+checked.toLocaleString(lang)+(total?' / '+total.toLocaleString(lang):'')+(errors?' · '+words.unavailable+' '+errors.toLocaleString(lang):'');
      if(total){bar.max=total;bar.value=checked;}
      const top=[...hits.values()].sort((a,b)=>a.distance-b.distance).slice(0,16);
      const fragment=document.createDocumentFragment();
      for(const hit of top){
        let card=cards.get(hit.path);
        if(!card){
          card=document.createElement('a');card.className='tile';
          const img=new Image(),h=document.createElement('h3');img.loading='lazy';img.alt='';
          card.append(img,h);cards.set(hit.path,card);
          h.textContent=hit.name||('#'+hit.path.split('/').pop().split('.')[0]); if(!hit.name)labelFor(hit.path,h);
        }
        if(card.dataset.match!==hit.url){
          card.dataset.match=hit.url;card.firstChild.src=hit.url;
          card.href='/'+lang+'/product'+hit.path+'?match='+encodeURIComponent(hit.url);
        }
        fragment.append(card);
      }
      results.replaceChildren(fragment);
    }
    function record(query,path,name,url,hash,color){
      const key=path+'|'+url;
      if(seen.has(key))return;
      seen.add(key);imageCount++;
      const d=distance(query,hash,color);
      if(d<.235 && (!hits.has(path)||hits.get(path).distance>d))hits.set(path,{path,name,url,distance:d});
    }
    async function measure(query,path,name,url){
      if(!url || seen.has(path+'|'+url))return;
      const image=new Image();
      const response=await fetch('/api/visual/thumbnail?url='+encodeURIComponent(url),{signal});
      if(!response.ok)throw Error();
      const blob=URL.createObjectURL(await response.blob());
      try{
        image.src=blob;await image.decode();
        const f=imageFeatures(image);
        record(query,path,name,url,f.hash.map(n=>n.toString(16)).join(''),btoa(String.fromCharCode(...f.color)));
      }finally{URL.revokeObjectURL(blob);}
    }
    try{
      await preview.decode();signal.throwIfAborted();
      const query=imageFeatures(preview);
      const manifest=await api('index');total=manifest.products;
      let shard=0;
      const scanned=new Set();
      await Promise.all(Array.from({length:4},async()=>{
        while(shard<manifest.shards){
          await gate();const current=shard++;if(current>=manifest.shards)break;
          const path='shard/'+manifest.version+'/'+current;
          let rows;
          try{rows=await api(path);}catch{await gate();rows=await api(path);}
          for(const [p,photos] of rows){
            for(const [url,hash,color] of photos)record(query,p,'',url,hash,color);
            scanned.add(p);
          }
          checked=scanned.size;paint();
        }
      }));
      paint(true);
      checked=0; refreshing=true;scanned.clear();
      let page=1;
      while(true){
        await gate();
        const list=await api('list?lang='+lang+'&p='+page);
        if(list.total)total=list.total;
        let i=0;
        await Promise.all(Array.from({length:3},async()=>{
          while(i<list.items.length){
            await gate();const row=list.items[i++];if(!row)break;
            const [path,name,cover]=row;
            try{
              const latest=await api('product?lang='+lang+'&path='+encodeURIComponent(path));
              for(const url of new Set([cover,...latest.photos])){
                try{await gate();await measure(query,path,name,url);}catch{if(signal.aborted)throw Error();errors++;}
              }
              scanned.add(path);checked=scanned.size;
            }catch{if(signal.aborted)throw Error();errors++;}
            paint();
          }
        }));
        if(!list.next)break;
        page++;
      }
      paint(true);if(!hits.size)status.textContent+=' · '+words.empty;
    }catch{if(!signal.aborted){paint(true);status.textContent+=' · '+words.failed;}}
    finally{URL.revokeObjectURL(objectUrl);if(!signal.aborted){stop.hidden=true;bar.hidden=true;}}
  }
  picker.onchange=()=>search(picker.files[0]);
  document.addEventListener('paste',ev=>{const item=[...ev.clipboardData.items].find(i=>i.type.startsWith('image/'));if(item)search(item.getAsFile());});
}
