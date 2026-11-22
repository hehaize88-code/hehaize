// Each shard stays in the browser cache between searches. The original photo stays on the device.
let indexPromise;
const pop = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];

async function loadShards(config) {
  let cursor = 0;
  const rows = [];
  async function lane() {
    while (cursor < config.shards) {
      const shard = cursor++;
      const response = await fetch('/image-index/' + config.revision + '/' + shard + '.json.gz');
      if (!response.ok) throw Error('Image index unavailable');
      const bytes = new Uint8Array(await response.arrayBuffer());
      const data = bytes[0] === 31 && bytes[1] === 139
        ? new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')) : bytes;
      for (const [path, photos] of await new Response(data).json()) {
        const valid = photos.filter(photo => photo[1] && photo[2]);
        // Pack all signatures together to keep mobile memory usage bounded.
        const values = new Uint8Array(valid.length * 65);
        const urls = [];
        for (let i = 0; i < valid.length; i++) {
          const [url, hash, color] = valid[i];
          const pos = i * 65;
          urls.push(url);
          const offset = hash.length === 17 ? 1 : 0;
          values[pos] = offset;
          for (let j=0; j<16; j++) values[pos + 1 + j] = parseInt(hash[j + offset],16);
          const rgb = atob(color);
          for (let j=0; j<48; j++) values[pos + 17 + j] = rgb.charCodeAt(j);
        }
        rows.push({path, values, urls});
      }
    }
  }
  await Promise.all(Array.from({length:4},lane));
  return rows;
}

function compare(rows, query) {
  const bestPerProduct = [];
  for (const {path,values,urls} of rows) {
    let bestScore = Infinity, bestIndex = -1;
    for (let i=0; i<urls.length; i++) {
      const pos = i*65;
      const hash = values[pos] ? query.areaHash : query.hash;
      const rgb = values[pos] ? query.areaColor : query.color;
      let sum = 0, bits = 0;
      for (let j=0; j<48; j++) sum += (rgb[j]-values[pos+17+j])**2;
      const colorDistance = .7*Math.sqrt(sum/48)/31;
      if (colorDistance >= bestScore) continue;
      for (let j=0; j<16; j++) bits += pop[hash[j]^values[pos+1+j]];
      const score = colorDistance+.3*bits/64;
      if (score<bestScore) {bestScore=score; bestIndex=i;}
    }
    if (bestIndex>=0 && bestScore<=.24)
      bestPerProduct.push({path,url:urls[bestIndex],score:bestScore});
  }
  bestPerProduct.sort((a,b)=>a.score-b.score || a.path.localeCompare(b.path));
  const threshold=(bestPerProduct[0]?.score??0)+.075;
  return bestPerProduct.filter(match=>match.score<=threshold).slice(0,24);
}

function prepare(config) {
  if(!indexPromise){
    indexPromise=loadShards(config).catch(async error=>{
      // The open page can span a deployment. A failed immutable shard gets
      // one retry against the current manifest without requiring a page reload.
      const manifest=await fetch('/api/image-index',{cache:'reload'});
      if(!manifest.ok)throw error;
      const current=await manifest.json();
      if(!current.revision || current.revision===config.revision)throw error;
      return loadShards(current);
    }).catch(error=>{indexPromise=null;throw error;});
  }
  return indexPromise;
}

self.onmessage = async ({data:{generation,query,config}}) => {
  try {
    const rows=await prepare(config);
    if(query)self.postMessage({generation,matches:compare(rows,query)});
  } catch {
    if(query)self.postMessage({generation,error:true});
  }
};
