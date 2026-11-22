import {compactSearch} from './compact-search.mjs';
import {compatibleSearch} from './compatible-search.mjs';
import manifest from './visual-manifest-20261122b.mjs';
let active;
self.onmessage=async ({data})=>{
  active?.abort();
  const control=new AbortController();
  active=control;
  const {id,query}=data;
  const progress=(loaded,total)=>self.postMessage({id,type:'progress',loaded,total});
  try {
    if(!query.resize)query.resize={hash:query.hash.replace(/[01]/g,b=>b==='1'?'0':'1'),color:query.cells.map(n=>n>>3)};
    let result;
    try{result=await compactSearch(manifest,query,url=>fetch(url,{signal:AbortSignal.any([control.signal,AbortSignal.timeout(12000)])}),progress,24);}
    catch(error){if(control.signal.aborted)throw error;result=await compatibleSearch(query,control.signal,progress);}
    if(!control.signal.aborted)self.postMessage({id,type:'result',result});
  } catch(error){if(!control.signal.aborted)self.postMessage({id,type:'error',message:String(error.message).slice(0,120)});}
};
