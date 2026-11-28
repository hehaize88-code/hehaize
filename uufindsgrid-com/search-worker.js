const root='/photo-match/INDEX_VERSION/';
const bitCount=Uint8Array.from({length:256},(_,n)=>n.toString(2).replace(/0/g,'').length);
async function unpack(file,json=false){
 const response=await fetch(root+file);
 if(!response.ok)throw Error('Image index unavailable');
 const bytes=new Uint8Array(await response.arrayBuffer());
 const decoded=bytes[0]===31&&bytes[1]===139?new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')):bytes;
 const body=new Response(decoded);
 return json?body.json():new Uint8Array(await body.arrayBuffer());
}
let index;
function load(){
 if(!index)index=Promise.all([unpack('features.bin'),unpack('products.bin',true)]).catch(e=>{index=null;throw e;});
 return index;
}
function rank(features,products,query){
 const candidates=[];
 let pos=0;
 for(const [path,title,shard,row,count,cover] of products){
  let score=Infinity,picture=0;
  for(let i=0;i<count;i++,pos+=57){
   const sample=features[pos]===1?query.area:query.canvas;
   let hamming=0,sum=0;
   for(let j=0;j<8;j++)hamming+=bitCount[features[pos+1+j]^sample.hash[j]];
   for(let j=0;j<48;j++){const delta=features[pos+9+j]-sample.color[j];sum+=delta*delta;}
   const d=.7*Math.sqrt(sum/48)/31+.3*hamming/64;
   if(d<score){score=d;picture=i;}
  }
  if(Number.isFinite(score))candidates.push({path,title,shard,row,picture,score,url:cover});
 }
 if(pos!==features.length)throw Error('Incomplete features');
 return candidates.sort((a,b)=>a.score-b.score||a.path.localeCompare(b.path));
}
let latest=0;
self.onmessage=async({data:{id,query}})=>{
 latest=id;
 try{
  const [features,products]=await load();
  if(id!==latest)return;
  const ranked=rank(features,products,query),near=ranked.filter(r=>r.score<=Math.min(.24,ranked[0].score+.075));
  const matches=(near.length?near:ranked).slice(0,12);
  self.postMessage({id,matches,weak:!near.length,total:products.length,photos:features.length/57});
  await Promise.all([...new Set(matches.map(m=>m.shard))].map(async shard=>{
   try{
    const lists=await unpack('images-'+shard+'.bin',true);
    if(id===latest)self.postMessage({id,images:matches.filter(m=>m.shard===shard).map(m=>[m.path,lists[m.row][m.picture]])});
   }catch{} // Product-cover results stay usable if a matched thumbnail is unavailable.
  }));
 }catch{if(id===latest)self.postMessage({id,error:true});}
};
