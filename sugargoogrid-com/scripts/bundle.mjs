import fs from 'node:fs';
const localization=fs.readFileSync('worker/locales.js','utf8').replace('export const ','const ');
const source=fs.readFileSync('worker/index.js','utf8').replace(/^import .*?;$/gm,'');
const assets=fs.readFileSync('worker/assets.js','utf8').replace(/export const /g,'const ');
const index='const SEARCH_INDEX='+fs.readFileSync('worker/source-index.js','utf8').split('export const SEARCH_INDEX=')[1];
fs.writeFileSync('dist/server/index.js',localization+'\n'+assets+'\n'+index+'\n'+source);
