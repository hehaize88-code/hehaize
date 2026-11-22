function rankVisual(query,rows) {
  const pop=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4],matches=[];
  for(const [path,title,entries] of rows){
    let best=null;
    for(const [url,hash,color,kind] of entries) {
      if(!hash||!color)continue;
      const areaMode=hash.length===17,queryColor=areaMode?query.areaColor:query.color,queryHash=areaMode?query.areaHash:query.hash;
      let sum=0,ham=0;
      for(let i=0;i<48;i++)sum+=(queryColor[i]-color.charCodeAt(i))**2;
      const offset=areaMode?1:0;
      for(let i=0;i<16;i++)ham+=pop[queryHash[i]^parseInt(hash[i+offset],16)];
      const score=.7*Math.sqrt(sum/48)/31+.3*ham/64;
      if(!best||score<best.score)best={url,score,path,title,kind};
    }
    if(best){best.fallback=entries.find(e=>e[0].startsWith('https://cnbuycha.com/')&&e[1])?.[0];matches.push(best)}
  }
  matches.sort((a,b)=>a.score-b.score||a.path.localeCompare(b.path));
  const visual=matches;
  const threshold=Math.min(.24,(visual[0]?.score||0)+.075);
  return visual.filter(x=>x.score<=threshold).slice(0,24);
}

let index;
async function load() {
  if(index)return index;
  index=(async()=>{
    const response=await fetch('/visual-index/manifest.json',{cache:'no-cache'});
    if(!response.ok)throw Error('manifest');
    const meta=await response.json(),rows=[];
    if(meta.bootstrap){
      const module=await import('/visual-index/snapshot.mjs');
      for(const encoded of module.imageShards){
        const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
        const data=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
        for(const [path,entries] of data){
          for(const e of entries)if(e[2])e[2]=atob(e[2]);
          rows.push([path,module.imageNames[path],entries]);
        }
      }
    }
    let next=0;
    async function lane(){
      while(next<meta.shards.length){
        const file=meta.shards[next++];
        if(!/^[a-f0-9]{16}\.gz$/.test(file))throw Error('invalid shard');
        const r=await fetch('/visual-index/'+file);
        if(!r.ok)throw Error('shard');
        const data=new Uint8Array(await r.arrayBuffer());
        const stream=data[0]===31&&data[1]===139?new Blob([data]).stream().pipeThrough(new DecompressionStream('gzip')):data;
        const batch=await new Response(stream).json();
        for(const [path,title,entries] of batch){
          for(const e of entries)if(e[2])e[2]=atob(e[2]);
          rows.push([path,title,entries]);
        }
      }
    }
    await Promise.all(Array.from({length:4},lane));
    // An incremental shard may supersede a row from the original snapshot.
    const records=new Map(rows.map(row=>[row[0],row]));
    for(const path of meta.removed||[])records.delete(path);
    return {meta,rows:[...records.values()]};
  })().catch(e=>{index=null;throw e});
  return index;
}
self.onmessage=async({data:{query,id}})=>{
  try {
    const {meta,rows}=await load();
    const matches=rankVisual(query,rows);
    self.postMessage({id,matches,total:meta.total,photos:meta.images,catalog:meta.liveCatalogCount||meta.total});
  }catch{self.postMessage({id,error:true})}
}
