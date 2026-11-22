export function imageFeatures(image) {
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
