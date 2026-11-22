import {compactSearch} from './compact-search.mjs';
import manifest from './visual-manifest-20261122b.mjs';

// The release manifest travels with the page bundle, so a cached manifest from
// an older release cannot send a new client to incompatible files.
export async function compatibleSearch(query, signal, progress) {
  const get = async (url) => {
    const source = url.match(/^\/assets\/visual-index\/([a-f0-9]{16})\/(titles\.json|\d+\.bin)$/);
    if (!source) throw Error('Unknown image index');
    const path = '/api/visual-data/' + source[1] + '/' + source[2].replace(/\.bin$/,'.json');
    for (let attempt=0; attempt<2; attempt++) {
      try {
        const res = await fetch(path,{signal});
        if(res.ok || attempt===1)return res;
      } catch(error) { if(signal.aborted || attempt===1)throw error; }
    }
  };
  return compactSearch(manifest,query,get,progress,24);
}
