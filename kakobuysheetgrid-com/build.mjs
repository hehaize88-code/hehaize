import {build} from 'esbuild';
import fs from 'node:fs';
await build({
  entryPoints:['worker/catalog.js'],outfile:'dist/server/index.js',bundle:true,
  format:'esm',platform:'browser',target:'es2022',minify:true,
  plugins:[{name:'client-source',setup(plugin){
    plugin.onResolve({filter:/client-source\.mjs$/},()=>({path:'client',namespace:'source'}));
    plugin.onLoad({filter:/.*/,namespace:'source'},()=>({contents:'export const CLIENT='+JSON.stringify(fs.readFileSync('worker/client.js','utf8'))}));
  }}]
});

const {default: site, locales} = await import('./dist/server/index.js');
const origin = 'https://kakobuysheetgrid.com';
const directory = 'dist/public';
const namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const languages = Object.keys(locales);
const corePaths = ['', 'spreadsheet/', 'categories/', 'image-search/', 'guide/'];
const xml = (root, body) => '<?xml version="1.0" encoding="UTF-8"?>\n<' + root + ' xmlns="' + namespace + '">\n' + body.join('\n') + '\n</' + root + '>\n';
const entry = (tag, url) => '<'+tag+'><loc>'+url+'</loc></'+tag+'>';
fs.mkdirSync(directory+'/sitemaps', {recursive:true});
const core = languages.flatMap(lang => corePaths.map(path => entry('url',origin+'/'+lang+'/'+path)));
fs.writeFileSync(directory+'/sitemaps/pages.xml',xml('urlset',core));
const children = ['/sitemaps/pages.xml'];
for (const lang of languages) {
  const legacy = '/sitemap-'+lang+'.xml';
  const response = await site.fetch(new Request(origin+legacy));
  if (!response.ok) throw Error('Could not build '+legacy);
  const source = await response.text();
  const products = [...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(url=>url.includes('/product/'));
  if (!products.length) throw Error('No products for '+lang);
  const child = '/sitemaps/products-'+lang+'.xml';
  fs.writeFileSync(directory+child,xml('urlset',products.map(url=>entry('url',url))));
  fs.writeFileSync(directory+legacy,source);
  children.push(child);
}
fs.writeFileSync(directory+'/sitemap.xml',xml('sitemapindex',children.map(path=>entry('sitemap',origin+path))));
fs.writeFileSync(directory+'/_headers','/sitemaps/*\n  Content-Type: application/xml; charset=utf-8\n  Cache-Control: public, max-age=300\n/sitemap*.xml\n  Content-Type: application/xml; charset=utf-8\n');
fs.writeFileSync(directory+'/_redirects','https://www.kakobuysheetgrid.com/* https://kakobuysheetgrid.com/:splat 301\n');
