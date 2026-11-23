import {loadEditorial} from './editorial/build.mjs';
import fs from 'node:fs';
const read = name => fs.readFileSync('src/' + name, 'utf8');
const define = (name, value) => 'const ' + name + ' = ' + JSON.stringify(value) + ';';
const modules = ['data.js', 'currency.js', 'localization.js', 'detail-upgrade.js', 'vendor/jpeg-decoder.js', 'image-signature.js', 'visual-names.js', 'visual-shards.js', 'visual-fallback.js', 'production.js', 'worker.js'];
const styles = ['style.css', 'detail-upgrade.css'];
const worker = [
  define('siteEditorial', loadEditorial('editorial')),
  fs.readFileSync('editorial/render.js','utf8'),
  define('publishedProductPaths', JSON.parse(read('sitemap-paths.json'))),
  define('css', styles.map(read).join('\n')),
  define('seed', JSON.parse(read('rates.json'))),
  define('logo', read('brand/logo.svg')),
  define('icon', read('brand/favicon.svg')),
  ...modules.map(file=>file==='vendor/jpeg-decoder.js' ? 'const JpegImage=(()=>{'+read(file)+';return JpegImage;})();' : read(file))
];
fs.mkdirSync('dist/server', {recursive:true});
fs.writeFileSync('dist/server/index.js', worker.join('\n'));
