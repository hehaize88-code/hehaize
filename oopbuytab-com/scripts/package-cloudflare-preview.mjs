import { build } from 'esbuild';
import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

// Package the existing SSR build for a standalone temporary Worker.
// Only official brand assets are embedded; products remain live CNBuyCha requests.
const project = process.cwd();
const output = path.join(project, 'dist/cloudflare-preview');
await mkdir(output, { recursive: true });
const assets = {};
const types = { '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
for (const file of await readdir(path.join(project, 'dist/client'))) {
  const type = types[path.extname(file)];
  if (!type) continue;
  const bytes = await readFile(path.join(project, 'dist/client', file));
  assets['/' + file] = { type, data: bytes.toString('base64') };
}
const entry = path.join(output, 'entry.mjs');
await writeFile(entry, `import application from '../server/index.js';
const assets = ${JSON.stringify(assets)};
export default { async fetch(request, env, ctx) {
  const asset = assets[new URL(request.url).pathname];
  if (asset && ['GET','HEAD'].includes(request.method)) {
    const bytes = Uint8Array.from(atob(asset.data), c => c.charCodeAt(0));
    return new Response(request.method === 'HEAD' ? null : bytes, {
      headers: { 'Content-Type':asset.type, 'Cache-Control':'public, max-age=3600', 'X-Robots-Tag':'noindex, nofollow' }
    });
  }
  return application.fetch(request, env, ctx);
}};
`);
await build({ entryPoints:[entry], outfile:path.join(output,'worker.js'), bundle:true, format:'esm', platform:'neutral', target:'es2022', minify:true });
await rm(entry);
console.log('Prepared dist/cloudflare-preview/worker.js');
