import { LANGUAGES, localePath, splitLocale } from '../kamey-language/index.mjs';
export function expandSitemap(source) {
 const origin='https://kameymall-sheet.com';
 const entries=new Map();
 for(const [entry,loc] of Array.from(source.matchAll(/<url>([\s\S]*?)<\/url>/g),m=>[m[0],m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]])){
   if(!loc) continue;
   const path = new URL(loc).pathname;
   if(splitLocale(path)[0]==='en') entries.set(path,entry);
 }
 entries.set('/image-search','<url><loc>'+origin+'/image-search</loc></url>');
 const urls=[], blocks=[];
 for(const [code] of LANGUAGES) for(const [path,entry] of entries) {
   const url=origin+localePath(path,code);
   urls.push(url);blocks.push(entry.replace(/<loc>[^<]+<\/loc>/,'<loc>'+url+'</loc>'));
 }
 return {xml:'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+blocks.join('\n')+'\n</urlset>\n',text:urls.join('\n')+'\n'};
}
