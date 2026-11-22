import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const source=await readFile(new URL('../commerce/locales.mjs',import.meta.url),'utf8');
const {translateProductBatch}=await import('data:text/javascript;base64,'+
  Buffer.from(source+'\nexport {translateProductBatch};').toString('base64'));

function mockProvider(loseMarker=false){
  return async url=>{
    const text=new URL(url).searchParams.get('q')
      .replaceAll('jeans','pantalon').replaceAll('Purple','Violet')
      .replaceAll('shoes','chaussures').replaceAll('Air Force','force aérienne');
    return Response.json([[[loseMarker?text.replaceAll('⟪','('):text]]]);
  };
}
for(const loseMarker of [false,true]){
  test('designer lists and models retain identity, colors translate (marker loss '+loseMarker+')',async()=>{
    const translated=await translateProductBatch(
      ['Balmain/Purple/Amiri jeans','Purple','Nike Air Force 1 shoes'],'fr',mockProvider(loseMarker));
    assert.deepEqual(translated,['Balmain/Purple/Amiri pantalon','Violet','Nike Air Force 1 chaussures']);
  });
}
