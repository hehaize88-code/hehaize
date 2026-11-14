import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
let code=fs.readFileSync(path.join(root,'worker/index.js'),'utf8').replace("import { SEARCH_INDEX } from './search-index.js';",'');
code=code.replace("import { loadWeidianStyles } from './weidian-styles.js';",'');
code=fs.readFileSync(path.join(root,'worker/weidian-styles.js'),'utf8').replaceAll('export function','function').replaceAll('export async function','async function')+'\n'+code;
const index=fs.readFileSync(path.join(root,'worker/search-index.js'),'utf8').replace('export const SEARCH_INDEX','const SEARCH_INDEX');
fs.writeFileSync(path.join(root,'dist/server/index.js'),index+'\n'+code);
