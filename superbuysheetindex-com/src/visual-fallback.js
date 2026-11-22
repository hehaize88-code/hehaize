const sbImageLabels={imageSearch:'Image search',upload:'Choose a photo',uploadHelp:'Upload a product, detail or style photo to find a match.',searching:'Searching photos',matches:'Similar products',coverage:'Products',images:'Photos',failed:'Unable to load',empty:'No close match yet'};
function visualWords(l){return EXTRA_LOCALES[l]?.labels||sbImageLabels}
function visualLabel(l){return visualWords(l).imageSearch}
async function visualRoute(u){
 const p=u.pathname, params=u.searchParams;const json=x=>Response.json(x,{headers:{'Cache-Control':'public,max-age=300'}});
 const lang=Object.hasOwn(locales,params.get('lang'))?params.get('lang'):'en';
 if(p==='/api/visual/names'){
  const paths=[...new Set(params.getAll('path'))].filter(v=>Object.hasOwn(sbIndexNames,v)).slice(0,20);
  await prepareProductNames(paths.map(v=>sbIndexNames[v]),lang);
  return json(Object.fromEntries(paths.map(v=>[v,title(sbIndexNames[v],lang,v)])));
 }
 if(p==='/api/visual/shards')return json(fallbackShards.length);
 if(/^\/api\/visual\/shards\/\d+$/.test(p)){
  const data=fallbackShards[Number(p.split('/').pop())];if(!data)return new Response('',{status:404});
  return new Response(Uint8Array.from(atob(data),c=>c.charCodeAt(0)),{headers:{'content-type':'application/gzip','Cache-Control':'public,max-age=86400'}});
 }
 if(p==='/api/visual/list'){
  const n=Math.max(1,Math.floor(Number(params.get('p'))||1));const h=await read('/AllProducts/?page='+n);
  return json({total:Number(h.match(/Browse ([\d,]+) China shopping/i)?.[1]?.replace(/,/g,'')),items:cards(h).map(v=>[v.path,title(v.name,lang,v.path),v.img])});
 }
 if(p==='/api/visual/product'){
  const path=params.get('path')||'';if(!productPath.test(path))return new Response('',{status:400});
  const h=await read(path),d=detail(h);if(!d.id)return new Response('',{status:404});const assets=pdMedia(h,d),seller=await pdSeller(d.id);
  return json([...new Set([...d.imgs,...assets.details,...assets.qc,...assets.styles.map(s=>s.image),...seller.gallery,...seller.groups.flatMap(g=>g.values.map(v=>v.image)),...seller.skus.map(s=>s.image)].filter(Boolean))]);
 }
 if(p==='/api/visual/thumb'||p==='/api/visual/signature'){
  let img;try{img=new URL(params.get('u'))}catch{return new Response('',{status:400})}
  if(img.protocol!=='https:'||img.port||img.username||img.password||!(img.hostname==='cnbuycha.com'&&/^\/(?:uploads|media)\//.test(img.pathname)||img.hostname.endsWith('.geilicdn.com')))return new Response('',{status:400});
  if(p.endsWith('/signature'))return sourceImageSignature(u,img);
  if(img.hostname.endsWith('.geilicdn.com')){img.searchParams.set('w','96');img.searchParams.set('h','96')}
  const r=await fetch(img.href,{redirect:'manual',cf:{image:{width:32,height:32,fit:'fill',format:'png'},cacheEverything:true,cacheTtl:86400},signal:AbortSignal.timeout(9000)});
  if(!r.ok||!r.headers.get('Content-Type')?.startsWith('image/'))return new Response('',{status:404});
  return new Response(r.body,{headers:{'Content-Type':r.headers.get('Content-Type'),'Cache-Control':'public,max-age=86400'}});
 }
 if(p==='/api/visual/client.js')return new Response('('+sbVisualClient.toString()+')()',{headers:{'content-type':'application/javascript'}});
 return null;
}
function visualPage(l){const t=visualWords(l);return '<section class=listing><h1>'+e(t.imageSearch)+'</h1><p>'+e(t.uploadHelp)+'</p><div class="visual-upload"><label class=btn>'+e(t.upload)+'<input type=file accept="image/*" id=vfile></label><img id=vquery hidden alt=""><button id=vstop hidden class=chip type=button>Ⅱ</button></div><p id=vstatus aria-live=polite></p><progress hidden id=vprogress></progress><div id=vmatches class=grid></div><script type=application/json id=vwords>'+JSON.stringify(t).replace(/</g,'\\u003c')+'</script><script defer src="/api/visual/client.js"></script></section>'}
function sbVisualClient(){
 const el=id=>document.getElementById(id),lang=document.documentElement.lang,words=JSON.parse(el('vwords').textContent);
 const vector=img=>{
  const c=document.createElement('canvas');c.width=8;c.height=8;const x=c.getContext('2d',{willReadFrequently:true});
  function pixels(w){c.width=w;x.fillStyle='#fff';x.fillRect(0,0,w,8);x.drawImage(img,0,0,w,8);return x.getImageData(0,0,w,8).data}
  const a=pixels(8),rgb=[];for(let y=0;y<4;y++)for(let x=0;x<4;x++)for(let k=0;k<3;k++){let sum=0;for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++)sum+=a[4*((2*y+dy)*8+2*x+dx)+k]>>3;rgb.push(Math.round(sum/4))}
  const b=pixels(9),lum=i=>.299*b[i]+.587*b[i+1]+.114*b[i+2];let nibbles=[],v=0;for(let y=0;y<8;y++)for(let x=0;x<8;x++){let i=(9*y+x)*4;v=2*v+Number(lum(i+4)>lum(i));if(x%4===3){nibbles.push(v.toString(16));v=0}}
  return [nibbles.join(''),btoa(String.fromCharCode(...rgb))];
 };
 const bits=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4],memo=new Map();
 function dist(q,h,s){let color=0,dh=0;for(let i=0;i<48;i++){const d=q[1].charCodeAt(i)-s.charCodeAt(i);color+=d*d}for(let i=0;i<16;i++)dh+=bits[parseInt(q[0][i],16)^parseInt(h[i],16)];return .7*Math.sqrt(color/48)/31+.3*dh/64}
 let pending,gen=0,paused=false;
 const loadIndex=()=>pending??=(async()=>{let resp=await fetch('/api/visual/shards'),n=await resp.json();let out=[],i=0;await Promise.all(Array.from({length:4},async()=>{while(i<n){const r=await fetch('/api/visual/shards/'+i++);if(!r.ok)throw Error();let rows=await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).json();out.push(...rows)}}));return out})().catch(err=>{pending=null;throw err});
 const measured=async url=>{if(memo.has(url))return memo.get(url);try{const r=await fetch('/api/visual/signature?u='+encodeURIComponent(url));if(r.ok){const d=await r.json();memo.set(url,d);return d}}catch{}
 const r=await fetch('/api/visual/thumb?u='+encodeURIComponent(url));if(!r.ok)throw Error();const b=await createImageBitmap(await r.blob());try{const d=vector(b);if(memo.size>80000)memo.clear();memo.set(url,d);return d}finally{b.close()}};
 const json=async url=>{const r=await fetch(url);if(!r.ok)throw Error();return r.json()};
 async function run(file){
  if(!file)return;const run=++gen;paused=false;const status=el('vstatus'),out=el('vmatches'),bar=el('vprogress'),stop=el('vstop');
  stop.hidden=false;stop.textContent='Ⅱ';stop.onclick=()=>{paused=!paused;stop.textContent=paused?'▶':'Ⅱ'};out.replaceChildren();bar.hidden=false;bar.removeAttribute('value');status.textContent=words.searching;
  const blob=URL.createObjectURL(file),img=el('vquery');img.src=blob;img.hidden=false;
  try{await img.decode();const v=vector(img),q=[v[0],atob(v[1])],seen=new Set(),hits=new Map(),names=new Map();let total=0,done=0,errors=0,images=0,last=0;
   function score(p,n,url,h,s){images++;const d=dist(q,h,atob(s));if(d<.235&&(!hits.has(p)||hits.get(p).d>d))hits.set(p,{p,n,url,d});seen.add(p+'|'+url.split('?')[0])}
   function paint(force=false){if(run!==gen||!force&&performance.now()-last<900)return;last=performance.now();status.textContent=words.images+' '+images.toLocaleString(lang)+' · '+words.coverage+' '+done.toLocaleString(lang)+' / '+(total?total.toLocaleString(lang):'…')+(errors?' · '+words.unavailable+' '+errors:'');if(total){bar.max=total;bar.value=done}out.replaceChildren();const top=[...hits.values()].sort((a,b)=>a.d-b.d).slice(0,16);
 if(lang!=='en'){
  const missing=top.filter(f=>!names.has(f.p));if(missing.length){
   const params=new URLSearchParams({lang});missing.forEach(f=>{names.set(f.p,f.n);params.append('path',f.p)});
   json('/api/visual/names?'+params).then(result=>{for(const [p,n] of Object.entries(result))names.set(p,n);paint(true)}).catch(()=>{});
  }
 }
 for(const f of top){let a=document.createElement('a'),im=new Image(),h=document.createElement('h3');a.className='tile';a.href='/'+lang+'/product'+f.p+'?match='+encodeURIComponent(f.url);im.src=f.url;im.alt='';im.loading='lazy';h.textContent=names.get(f.p)||f.n;a.append(im,h);out.append(a)}}
   try{const index=await loadIndex();for(const [p,n,imgs] of index)for(const [url,h,s] of imgs)score(p,n,url,h,s);paint(true)}catch{errors++}
   async function gate(){while(paused&&gen===run)await new Promise(r=>setTimeout(r,250));if(gen!==run)throw Error('cancel')}
   async function inspect(p,n,urls){for(const url of urls){await gate();if(!url||seen.has(p+'|'+url.split('?')[0]))continue;try{const [h,s]=await measured(url);score(p,n,url,h,s)}catch{errors++}}}
   let page=1;
   while(true){await gate();const data=await json('/api/visual/list?lang='+lang+'&p='+page);total=data.total;if(!data.items.length)break;let i=0;
    await Promise.all(Array.from({length:3},async()=>{while(i<data.items.length){await gate();const [p,n,cover]=data.items[i++];try{await inspect(p,n,[cover]);const urls=await json('/api/visual/product?path='+encodeURIComponent(p));await inspect(p,n,urls)}catch{errors++}done++;paint()}}));paint(true);
    if(page*60>=total)break;page++}
   if(run===gen){paint(true);stop.hidden=true}
  }catch{if(run===gen)status.textContent=words.failed}finally{URL.revokeObjectURL(blob)}
 }
 el('vfile').onchange=ev=>run(ev.target.files[0]);document.addEventListener('paste',ev=>{const f=[...ev.clipboardData.items].find(i=>i.type.startsWith('image/'));if(f)run(f.getAsFile())});
}
