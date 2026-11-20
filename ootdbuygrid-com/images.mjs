import * as localization from './locale.mjs';
import { imageMeta, imageNames, imageShards } from './image-data.mjs';

const encodeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function json(data, age = 0) {
  return Response.json(data, {headers: {'Cache-Control':age ? 'public,max-age='+age : 'no-store'}});
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
function rankVisual(query,rows,filename) {
  const original=/[a-z0-9_-]{12,}\.(?:jpe?g|png|webp|avif)$/i.test(filename||'') ? filename : null;
  const pop=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4],matches=[];
  for(const [path,entries] of rows){
    let best=null;
    for(const [url,hash,color] of entries) {
      if(!hash||!color) {
        if(original && url.split('?')[0].split('/').pop()===original)best={url,score:-1,path,byName:true};
        continue;
      }
      const areaMode=hash.length===17,queryColor=areaMode?query.areaColor:query.color,queryHash=areaMode?query.areaHash:query.hash;
      let sum=0,ham=0;
      for(let i=0;i<48;i++)sum+=(queryColor[i]-color.charCodeAt(i))**2;
      const offset=areaMode?1:0;
      for(let i=0;i<16;i++)ham+=pop[queryHash[i]^parseInt(hash[i+offset],16)];
      const score=.7*Math.sqrt(sum/48)/31+.3*ham/64;
      if(!best||score<best.score)best={url,score,path};
    }
    if(best){best.fallback=entries.find(e=>e[0].startsWith('https://cnbuycha.com/')&&e[1])?.[0];matches.push(best)}
  }
  matches.sort((a,b)=>a.score-b.score||a.path.localeCompare(b.path));
  const named=matches.filter(x=>x.byName);
  const visual=matches.filter(x=>!x.byName);
  const threshold=Math.min(.24,(visual[0]?.score||0)+.075);
  return [...named,...visual.filter(x=>x.score<=threshold).slice(0,Math.max(0,24-named.length))];
}
function bindImageSearch(config,features,rank) {
  const byId=id=>document.getElementById(id),input=byId('visual-file'),result=byId('visual-results'),
    status=byId('visual-status'),preview=byId('visual-query'),zone=byId('visual-drop'),retry=byId('visual-retry');
  let loadPromise,serial=0,objectURL,lastFile;
  function loadIndex() {
    if(loadPromise)return loadPromise;
    loadPromise=(async()=>{
      const rows=[];
      let cursor=0;
      async function readLane(){
        while(cursor<config.shards) {
          const shard=cursor++;
          const response=await fetch('/api/image-index/shard/'+shard+'?v='+config.version);
          if(!response.ok)throw Error('Index unavailable');
          const data=new Uint8Array(await response.arrayBuffer());
          const body=data[0]===31&&data[1]===139?new Blob([data]).stream().pipeThrough(new DecompressionStream('gzip')):data;
          const batch=await new Response(body).json();
          for(const item of batch)for(const im of item[1])if(im[2])im[2]=atob(im[2]);
          rows.push(...batch);
        }
      }
      await Promise.all(Array.from({length:4},readLane));
      return rows;
    })().catch(e=>{loadPromise=null;throw e});
    return loadPromise;
  }
  async function run(file){
    if(!file)return;
    const generation=++serial;
    lastFile=file;retry.hidden=true;result.replaceChildren();
    if(objectURL)URL.revokeObjectURL(objectURL);
    preview.hidden=true;
    if(!file.type.startsWith('image/')||file.size>25*1024*1024){status.textContent=config.failed;return}
    try{
      status.textContent=config.searching;
      objectURL=URL.createObjectURL(file);
      const img=new Image();img.src=objectURL;
      await img.decode();if(serial!==generation)return;
      preview.src=objectURL;preview.hidden=false;
      const query=features(img),rows=await loadIndex();
      if(serial!==generation)return;
      const matches=rank(query,rows,file.name);
      const q=new URLSearchParams({lang:config.lang});
      for(const m of matches)q.append('p',m.path);
      const reply=matches.length?await fetch('/api/image-index/titles?'+q):null;
      if(reply&&!reply.ok)throw Error('Names unavailable');
      const names=reply?await reply.json():{};
      if(serial!==generation)return;
      const cards=matches.map(({path,url,byName,fallback})=>{
        const a=document.createElement('a'),im=document.createElement('img'),name=document.createElement('strong');
        a.className='card';a.href='/'+config.lang+'/p'+path+'?match='+encodeURIComponent(url);
        if(fallback&&fallback!==url)im.addEventListener('error',()=>{im.src=fallback},{once:true});
        im.src=url;im.loading='lazy';im.alt=names[path]||'';
        name.textContent=im.alt;a.append(im,name);if(byName){const note=document.createElement('small');note.textContent=config.filename+': '+file.name;a.append(note)}return a;
      });
      result.replaceChildren(...cards);
      status.textContent=matches.length?config.matches+' · '+matches.length:config.empty;
    }catch{if(serial===generation){status.textContent=config.failed;retry.hidden=false}}
  }
  input.addEventListener('change',()=>run(input.files[0]));
  zone.addEventListener('dragover',e=>{e.preventDefault()});
  zone.addEventListener('drop',e=>{e.preventDefault();run(e.dataTransfer.files[0])});
  document.addEventListener('paste',e=>{const f=[...(e.clipboardData?.items||[])].find(i=>i.type.startsWith('image/'));if(f)run(f.getAsFile())});
  retry.addEventListener('click',()=>run(lastFile));
}
export async function imageRoute(req, lang) {
  const u=new URL(req.url),pathname=u.pathname;
  if(pathname==='/api/image-index')return json(imageMeta,120);
  if(pathname==='/api/image-index/titles') {
    const requested=u.searchParams.get('lang');
    const locale=Object.hasOwn(localization.languages,requested)?requested:lang;
    const paths=u.searchParams.getAll('p').slice(0,24).filter(path=>Object.hasOwn(imageNames,path));
    const localized=await localization.translateTitles(locale,paths.map(path=>imageNames[path]));
    const names=Object.fromEntries(paths.map((path,i)=>[path,localized[i]]));
    return json(names,3600);
  }
  if(pathname.startsWith('/api/image-index/')) {
    const shard=/^\/api\/image-index\/shard\/(\d+)$/.exec(pathname);
    if(!shard||!imageShards[Number(shard[1])])return new Response('404',{status:404});
    if(u.searchParams.get('v')!==imageMeta.revision)return new Response('Index updated',{status:409});
    const data=Uint8Array.from(atob(imageShards[Number(shard[1])]),c=>c.charCodeAt(0));
    return new Response(data,{headers:{'Content-Type':'application/json','Content-Encoding':'gzip','Cache-Control':'public,max-age=31536000,immutable'},encodeBody:'manual'});
  }
  const t=localization.labels(lang);
  const pending={sl:"Nekatere slike prodajalcev še niso indeksirane",lt:"Kai kurios pardavėjų nuotraukos dar neįtrauktos",lv:"Daži pārdevēju attēli vēl nav indeksēti",et:"Mõni müüja pilt pole veel indekseeritud",ga:"Níl roinnt íomhánna díoltóirí san innéacs fós",mt:"Xi ritratti tal-bejjiegħa għadhom mhux fl-indiċi","en":"Some seller images are not yet indexed","de":"Einige Verkäuferbilder sind noch nicht indexiert","fr":"Certaines photos vendeur ne sont pas encore indexées","es":"Algunas fotos del vendedor aún no están indexadas","it":"Alcune foto del venditore non sono ancora indicizzate","pt":"Algumas fotos do vendedor ainda não estão indexadas","pl":"Niektóre zdjęcia sprzedawcy nie są jeszcze w indeksie","nl":"Sommige verkopersfoto’s zijn nog niet geïndexeerd","ro":"Unele fotografii ale vânzătorului nu sunt încă indexate","sv":"Vissa säljarbilder är ännu inte indexerade","zh":"部分卖家图片尚未纳入索引","da":"Nogle sælgerbilleder er endnu ikke indekseret","fi":"Osa myyjän kuvista ei vielä ole hakemistossa","el":"Ορισμένες εικόνες πωλητή δεν έχουν ακόμη ευρετηριαστεί","cs":"Některé fotografie prodejce ještě nejsou indexovány","hu":"Néhány eladói kép még nincs indexelve","bg":"Някои снимки на продавача още не са индексирани","sk":"Niektoré fotografie predajcu ešte nie sú indexované","hr":"Neke slike prodavatelja još nisu indeksirane","ja":"一部の販売者画像はまだ検索対象に含まれていません","ko":"일부 판매자 이미지는 아직 색인에 포함되지 않았습니다","vi":"Một số ảnh người bán chưa được lập chỉ mục","th":"รูปผู้ขายบางส่วนยังไม่ได้จัดทำดัชนี","id":"Sebagian foto penjual belum diindeks"};
  const filenameLabels={sl:'Ime datoteke',lt:'Failo vardas',lv:'Faila nosaukums',et:'Faili nimi',ga:'Ainm comhaid',mt:'Isem il-fajl',en:'Filename',de:'Dateiname',fr:'Nom du fichier',es:'Nombre del archivo',it:'Nome del file',nl:'Bestandsnaam',pt:'Nome do ficheiro',pl:'Nazwa pliku',ro:'Nume fișier',sv:'Filnamn',zh:'文件名',da:'Filnavn',fi:'Tiedostonimi',el:'Όνομα αρχείου',cs:'Název souboru',hu:'Fájlnév',bg:'Име на файла',sk:'Názov súboru',hr:'Naziv datoteke',ja:'ファイル名',ko:'파일 이름',vi:'Tên tệp',th:'ชื่อไฟล์',id:'Nama berkas'};
  const cfg={lang,filename:filenameLabels[lang]||filenameLabels.en,shards:imageMeta.shards,version:imageMeta.revision,failed:t.failed,searching:t.searching,matches:t.matches,empty:t.emptyMatches};
  const toPage=JSON.stringify(cfg).replace(/</g,'\\u003c');
  return '<section class="visual-search"><h1>'+encodeHtml(t.imageSearch)+'</h1><p>'+encodeHtml(t.uploadHelp)+'</p><div id="visual-drop" style="padding:clamp(20px,5vw,50px);border:2px dashed #bbc7bb;border-radius:12px;text-align:center"><label class="btn" for="visual-file" tabindex="0" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();this.click()}">'+encodeHtml(t.upload)+'</label><input type="file" id="visual-file" accept="image/*" style="position:absolute;width:1px;height:1px;opacity:0"><img id="visual-query" hidden alt="" style="margin:16px auto 0;max-width:180px;max-height:180px;vertical-align:middle"><small style="display:block;margin-top:10px">JPG · PNG · WEBP</small></div><p>'+encodeHtml(t.coverage)+' · '+imageMeta.total.toLocaleString(lang)+' &nbsp; '+encodeHtml(t.images)+' · '+imageMeta.images.toLocaleString(lang)+(imageMeta.unavailableImageURLs?' · '+encodeHtml(t.unavailable)+': '+imageMeta.unavailableImageURLs:'')+(imageMeta.partial?' · '+encodeHtml(pending[lang]||pending.en):'')+'</p><p role="status" aria-live="polite" id="visual-status"></p><button id="visual-retry" hidden>'+encodeHtml(t.retry)+'</button><div id="visual-results" class="grid"></div></section><script>('+bindImageSearch.toString()+')('+toPage+','+imageFeatures.toString()+','+rankVisual.toString()+')</script>';
}
