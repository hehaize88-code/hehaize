import {cp,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
const source=resolve('dist/static-pages');
await stat(source+'/_worker.js');
for(const item of await readdir(source))await cp(source+'/'+item,resolve(item),{recursive:true,force:true});
console.log('Synced verified static export to the existing GitHub publishing directory.');
