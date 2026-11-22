// Keep catalogue and seller photo numbering distinct when options arrive later.
export function initialGallery(params,catalogue,seller=[]){
 const matched=params.get('matchedImage');
 if(matched){
  for(const photos of [catalogue,seller]){
   const index=photos.findIndex(url=>url===matched);
   if(index>=0)return {photos,index};
  }
 }
 const requested=Number(params.get('photo'));
 const explicit=Number.isSafeInteger(requested)&&requested>0;
 const photos=explicit&&params.get('photoSource')!=='seller'?catalogue:seller.length?seller:catalogue;
 return {photos,index:explicit?Math.min(requested-1,Math.max(0,photos.length-1)):0};
}

