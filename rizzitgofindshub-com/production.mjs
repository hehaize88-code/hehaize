import {editorialPaths} from './editorial.mjs';
import { langs } from './locales.mjs';
export const origin = 'https://rizzitgofindshub.com';
const languages=Object.keys(langs);
const xml=body=>new Response('<?xml version="1.0" encoding="UTF-8"?>'+body,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=900'}});
const ns=' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
const tag=(name,loc)=>'<'+name+'><loc>'+origin+loc+'</loc></'+name+'>';
export async function machineRoute(path){
 if(path==='/googledec2538cb510c9a8.html')return new Response('google-site-verification: googledec2538cb510c9a8.html',{headers:{'Content-Type':'text/html'}});
 if(path==='/robots.txt')return new Response('User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
 if(path==='/sitemap.xml')return xml('<sitemapindex'+ns+'>'+languages.map(l=>tag('sitemap','/sitemap-'+l+'.xml')).join('')+'</sitemapindex>');
 const m=path.match(/^\/sitemap-([a-z]{2})\.xml$/);
 if(!m||!languages.includes(m[1]))return null;
 try{
  const r=await fetch('https://cnbuycha.com/sitemap.xml',{cf:{cacheEverything:true,cacheTtl:900}});
  if(!r.ok)throw Error();
  const src=await r.text(),root='/'+m[1]+'/',paths=new Set(Array.from(src.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com(\/[a-z0-9-]+\/\d+\.html)<\/loc>/gi),x=>x[1]));
  if(!paths.size)throw Error();
  return xml('<urlset'+ns+'>'+['','spreadsheet/','image-search/',...(['en','zh'].includes(m[1])?editorialPaths:[]),...Array.from(paths,p=>'item'+p)].map(p=>tag('url',root+p)).join('')+'</urlset>');
 }catch{return new Response('Source sitemap temporarily unavailable',{status:503,headers:{'Retry-After':'60'}})}
}
export function seo(lang,path){
 const suffix=path.slice(('/'+lang+'/').length),url=code=>origin+'/'+code+'/'+suffix;
 return '<meta name="msvalidate.01" content="5C3F81E3632C3A1AB9E5CF1F80D171BD"><link rel="canonical" href="'+url(lang)+'">'+[...(/\/(?:articles|faq)\//.test(path)?['en','zh']:languages),'x-default'].map(code=>'<link rel="alternate" hreflang="'+code+'" href="'+url(code==='x-default'?'en':code)+'">').join('')+'<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y3NFPKGQRY"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-Y3NFPKGQRY");</script>';
}
