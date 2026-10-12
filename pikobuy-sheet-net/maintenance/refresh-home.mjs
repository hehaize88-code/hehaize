import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {nav,footer} from '../commerce/chrome.mjs';
import {parseList,card,upstream} from '../commerce/catalog.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const {routes}=JSON.parse(fs.readFileSync(root+'/commerce/routes.json'));
const list=parseList(await upstream('/AllProducts/'));
if(!list.products.length)throw Error('Source catalogue empty; existing pages were not changed');
const output={};
for(const route of routes){const lang=route.match(/^\/(de|fr|es|it|pl|pt)(?=\/|$)/)?.[1]||'en';const bare=lang==='en'?route:route.slice(lang.length+1);output[route]={nav:nav(lang,bare,'',new Set(routes)),footer:footer(lang),cards:list.products.slice(0,4).map(p=>card(p,lang)).join(''),lang}}
fs.mkdirSync(root+'/.cache',{recursive:true});
const file=root+'/.cache/chrome.json';fs.writeFileSync(file,JSON.stringify(output));
execFileSync('python',[root+'/maintenance/refresh-commerce.py',file],{stdio:'inherit'});
execFileSync(process.execPath,[root+'/maintenance/build-worker.mjs'],{stdio:'inherit'});
