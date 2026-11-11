// Preview the same catalogue/API modules used in the Pages Worker.
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {catalogueRoute} from '../commerce/catalog.js';
import {experienceRoute} from '../commerce/experience.mjs';
const portArg=process.argv.indexOf('--port');
const port=Number(process.env.PORT||(portArg>=0?process.argv[portArg+1]:4173));
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.json':'application/json','.xml':'application/xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.svg':'image/svg+xml'};
const assets=async request=>{try{const u=new URL(request.url);let p=path.resolve('out','.'+decodeURIComponent(u.pathname));if(!p.startsWith(path.resolve('out')+'/'))p=path.resolve('out/index.html');if((await stat(p)).isDirectory())p=path.join(p,'index.html');return new Response(await readFile(p),{headers:{'content-type':mime[path.extname(p)]||'application/octet-stream'}});}catch{return new Response('Not found',{status:404});}};
http.createServer(async(req,res)=>{try{const request=new Request('http://localhost:'+port+req.url);let response=await experienceRoute(request)||await catalogueRoute(request,{ASSETS:{fetch:assets}})||await assets(request);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(e){console.error(e);res.writeHead(500);res.end('Preview error');}}).listen(port,'0.0.0.0',()=>console.log('UUFinds preview http://0.0.0.0:'+port));
