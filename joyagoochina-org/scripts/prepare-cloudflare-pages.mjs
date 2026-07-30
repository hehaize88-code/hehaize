import { cp, mkdir, rename, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const clientDir = resolve(projectRoot, "dist/client");
const serverDir = resolve(projectRoot, "dist/server");
const pagesDir = resolve(projectRoot, "dist/pages");
const serverEntry = resolve(serverDir, "index.js");

await stat(clientDir);
await stat(serverEntry);

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });

// Cloudflare Pages advanced mode expects static assets and the Worker bundle
// in the same output directory. Keep the Vinext server-side chunks alongside
// the entry because the Worker imports them lazily at runtime.
await cp(clientDir, pagesDir, { recursive: true });
await cp(serverDir, pagesDir, { recursive: true, force: true });
await rename(resolve(pagesDir, "index.js"), resolve(pagesDir, "_worker.js"));

await stat(resolve(pagesDir, "_worker.js"));
await stat(resolve(pagesDir, "ssr/index.js"));
await stat(resolve(pagesDir, "__vite_rsc_assets_manifest.js"));

console.log(`Prepared Cloudflare Pages output: ${pagesDir}`);
