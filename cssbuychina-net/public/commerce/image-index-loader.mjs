export function matchingPhotoPath(product){
 const params=new URLSearchParams();
 if(product.kind==='style'&&/^\d+$/.test(product.styleId||''))params.set('style',product.styleId);
 else if(Number.isSafeInteger(product.imageIndex)&&product.imageIndex>=0){
  params.set('photo',String(product.imageIndex+1));
  params.set('photoSource',product.kind==='seller'?'seller':'catalogue');
 }
 return product.path+(params.size?'?'+params:'');
}
