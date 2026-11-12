import {searchAllImages} from './image-search-stream.mjs?v=20261112-v4';
let active;
self.onmessage=async({data})=>{
 active?.abort();const controller=new AbortController();active=controller;
 try{const result=await searchAllImages(data.query,{signal:controller.signal,onProgress:(loaded,total)=>self.postMessage({id:data.id,type:'progress',loaded,total})});if(!controller.signal.aborted)self.postMessage({id:data.id,type:'result',result});}
 catch(error){if(!controller.signal.aborted)self.postMessage({id:data.id,type:'error',message:'Image index unavailable'});}
};
