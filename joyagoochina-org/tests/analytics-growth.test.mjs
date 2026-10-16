import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
test('article navigation is measured separately from actual outbound purchase links',async()=>{
 const events=[],beacons=[],listeners=new Map();
 class Element {constructor(href,dataset){this.href=href;this.dataset=dataset;}closest(selector){return selector.includes('data-track-event') ? (this.dataset.trackEvent?this:null) : (this.dataset.outboundKind?this:null);}}
 globalThis.Element=Element;
 globalThis.window={location:{origin:'https://joyagoochina.org',pathname:'/de/joyagoo-shoe-qc-checklist/'},gtag:(...args)=>events.push(args),dispatchEvent(){}};
 globalThis.document={documentElement:{lang:'de'},addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener(){}};
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:{sendBeacon:(...args)=>beacons.push(args)}});
 globalThis.runEffect=fn=>fn();
 const result=await build({entryPoints:['app/components/OutboundTracker.tsx'],bundle:true,write:false,platform:'node',format:'esm',plugins:[{name:'effect-harness',setup(b){b.onResolve({filter:/^react$/},()=>({path:'react',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export const useEffect=globalThis.runEffect;'}));}}]});
 const {default: Tracker}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));Tracker();
 const click=link=>listeners.get('click')({target:link});
 click(new Element('https://joyagoochina.org/de/catalog/',{trackEvent:'article_catalog_click'}));
 click(new Element('https://joyagoochina.org/de/joyagoo-size-guide-clothing-shoes/',{trackEvent:'article_related_click'}));
 click(new Element('https://joyagoochina.org/de/catalog/',{outboundKind:'all-products'}));
 assert.deepEqual(events.map(e=>e[1]),['article_catalog_click','article_related_click']);assert.equal(beacons.length,0);
 assert.deepEqual(events[0][2],{source_page:'/de/joyagoo-shoe-qc-checklist/',language:'de',destination_path:'/de/catalog/'});
 click(new Element('https://joyagoo.com/product?id=7874413518&platform=WEIDIAN',{outboundKind:'product',productId:'7874413518'}));
 assert.equal(events[2][1],'outbound_click');assert.equal(beacons.length,1);assert.equal(events[2][2].product_id,'7874413518');
});
