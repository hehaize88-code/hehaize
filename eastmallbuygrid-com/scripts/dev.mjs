import http from 'node:http';
import worker from '../worker/index.js';
const args=process.argv.slice(2); const port=Number(args[args.indexOf('--port')+1]||process.env.PORT||3000);
http.createServer(async(req,res)=>{try{let r=await worker.fetch(new Request('http://localhost:'+port+req.url));res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()))}catch(e){res.writeHead(500);res.end(String(e))}}).listen(port,'0.0.0.0');
