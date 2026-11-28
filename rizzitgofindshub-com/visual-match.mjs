const decoder=new TextDecoder();
const population=Uint8Array.from({length:256},(_,n)=>n.toString(2).replace(/0/g,'').length);
const asset=(env,url,path)=>env.VISUAL_ASSETS.fetch(new Request(new URL('/_packed/'+path,url)));
export async function visualAsset(env,url,path){
  if(!env?.VISUAL_ASSETS)return new Response('Image index unavailable',{status:503});
  return asset(env,url,path);
}
function feature(value){
  if(!/^[0-9a-f]{112}$/.test(value||''))return null;
  const bytes=Uint8Array.from(value.match(/../g),s=>parseInt(s,16));
  return bytes.subarray(8).some(n=>n>31)?null:bytes;
}
export async function matchGroup(env,url,version,group){
  const area=feature(url.searchParams.get('a')),resize=feature(url.searchParams.get('r'));
  if(!area||!resize)return new Response('',{status:400});
  const response=await visualAsset(env,url,version+'/'+group+'.bin');
  if(!response.ok)return new Response('',{status:response.status});
  const buf=await response.arrayBuffer(),v=new DataView(buf),bytes=new Uint8Array(buf);
  const count=v.getUint32(4,true),meta=v.getUint32(8,true),urls=v.getUint32(12,true);
  if(decoder.decode(bytes.subarray(0,4))!=='RZI2'||meta!==16+count*64||urls>buf.byteLength)throw Error('Invalid visual asset');
  const products=JSON.parse(decoder.decode(bytes.subarray(meta,urls)));
  const winners=products.map(()=>({score:Infinity,row:0}));
  for(let r=16;r<meta;r+=64){
    const q=bytes[r]?area:resize;
    let squared=0,hamming=0;
    for(let i=0;i<48;i++){const d=bytes[r+i+16]-q[i+8];squared+=d*d;}
    for(let i=0;i<8;i++)hamming+=population[bytes[r+8+i]^q[i]];
    const score=.7*Math.sqrt(squared/48)/31+.3*hamming/64;
    const candidate=winners[v.getUint16(r+2,true)];
    if(score<candidate.score){candidate.score=score;candidate.row=r;}
  }
  const items=winners.map((w,i)=>({...w,i})).sort((a,b)=>a.score-b.score||products[a.i][0].localeCompare(products[b.i][0])).slice(0,24).map(({score,row,i})=>{
    const start=urls+v.getUint32(row+4,true);
    const end=row+64<meta?urls+v.getUint32(row+68,true):bytes.length;
    const [path,title]=products[i];
    return {score,p:{path,title,image:decoder.decode(bytes.subarray(start,end-1)),kind:['source','gallery','style'][bytes[row+1]]}};
  });
  return Response.json({items,images:count,products:products.length},{headers:{'Cache-Control':'private,max-age=600'}});
}
