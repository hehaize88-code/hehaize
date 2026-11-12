// Keep catalogue and seller photo numbering distinct when options arrive later.
export function initialGallery(params,catalogue,seller=[]){
 const requested=Number(params.get('photo'));
 const explicit=Number.isSafeInteger(requested)&&requested>0;
 const photos=explicit&&params.get('photoSource')!=='seller'?catalogue:seller.length?seller:catalogue;
 return {photos,index:explicit?Math.min(requested-1,Math.max(0,photos.length-1)):0};
}
