import {slug} from './qc-guide.mjs';
import app from './app.mjs';
import {languages} from './locale.mjs';
import {imageNames} from './image-data.mjs';
const origin='https://ootdbuygrid.com';
const codes=Object.keys(languages);
const namespace='http://www.sitemaps.org/schemas/sitemap/0.9';
const xml=(kind,entries)=>new Response('<?xml version="1.0" encoding="UTF-8"?><'+kind+' xmlns="'+namespace+'">'+entries.join('')+'</'+kind+'>',{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public,max-age=3600'}});
function sitemap(path){
 if(path==='/sitemap.xml')return xml('sitemapindex',codes.map(code=>'<sitemap><loc>'+origin+'/sitemap-'+code+'.xml</loc></sitemap>'));
 const code=path.match(/^\/sitemap-([a-z]+)\.xml$/)?.[1];
 if(!codes.includes(code))return new Response('Not found',{status:404});
 return xml('urlset',['','spreadsheet/','image-search/',...(code==='en'?['faq/','articles/','articles/'+slug+'/']:[]),...Object.keys(imageNames).map(p=>'p'+p)].map(p=>'<url><loc>'+origin+'/'+code+'/'+p+'</loc></url>'));
}
export default {async fetch(req,env,ctx){
 const u=new URL(req.url);
 if(u.hostname==='www.ootdbuygrid.com'||u.protocol==='http:')return Response.redirect(origin+u.pathname+u.search,308);
 if(u.pathname==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+origin+'/sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
 if(/^\/sitemap(?:-[a-z]+)?\.xml$/.test(u.pathname))return sitemap(u.pathname);
 return app.fetch(req,env,ctx);
}};
