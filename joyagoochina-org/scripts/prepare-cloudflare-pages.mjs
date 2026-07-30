import {
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const clientDir = resolve(projectRoot, "dist/client");
const serverDir = resolve(projectRoot, "dist/server");
const pagesDir = resolve(projectRoot, "dist/pages");
const staticPagesDir = resolve(projectRoot, "dist/static-pages");
const serverEntry = resolve(serverDir, "index.js");
const localeCodes = new Set([
  "zh",
  "de",
  "pl",
  "es",
  "it",
  "fr",
  "pt",
  "ro",
  "sv",
]);

await stat(clientDir);
await stat(serverEntry);

await rm(pagesDir, { recursive: true, force: true });
await rm(staticPagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });
await mkdir(staticPagesDir, { recursive: true });

// Cloudflare Pages advanced mode expects static assets and the Worker bundle
// in the same output directory. Keep the Vinext server-side chunks alongside
// the entry because the Worker imports them lazily at runtime.
await cp(clientDir, pagesDir, { recursive: true });
await cp(serverDir, pagesDir, { recursive: true, force: true });
await rename(resolve(pagesDir, "index.js"), resolve(pagesDir, "_worker.js"));

// The existing Cloudflare project can also publish a pre-rendered directory
// without a framework build. Keep this second output self-contained so a
// missing source-build setting can never expose React source as the website.
await cp(clientDir, staticPagesDir, { recursive: true });
await cp(
  resolve(projectRoot, "cloudflare/static-worker.js"),
  resolve(staticPagesDir, "_worker.js"),
);
await cp(
  resolve(projectRoot, "cloudflare/_redirects"),
  resolve(staticPagesDir, "_redirects"),
);
await cp(
  resolve(projectRoot, "cloudflare/404.html"),
  resolve(staticPagesDir, "404.html"),
);

const workerModuleUrl = pathToFileURL(serverEntry);
workerModuleUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: renderWorker } = await import(workerModuleUrl.href);
const renderEnv = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const renderContext = {
  waitUntil() {},
  passThroughOnException() {},
};
const render = (url, accept) =>
  renderWorker.fetch(
    new Request(url, { headers: { accept } }),
    renderEnv,
    renderContext,
  );
const renderFollowingRedirects = async (url, accept) => {
  let currentUrl = url;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await render(currentUrl, accept);
    if (response.status < 300 || response.status >= 400) return response;
    const location = response.headers.get("location");
    if (!location) return response;
    currentUrl = new URL(location, currentUrl).toString();
  }
  throw new Error(`Too many redirects while rendering ${url}`);
};

const sitemapResponse = await renderFollowingRedirects(
  "https://joyagoochina.org/sitemap.xml",
  "application/xml",
);
if (sitemapResponse.status !== 200) {
  throw new Error(`Unable to render sitemap.xml (${sitemapResponse.status})`);
}
const sitemapXml = await sitemapResponse.text();
await writeFile(resolve(staticPagesDir, "sitemap.xml"), sitemapXml);

const routeUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1].replaceAll("&amp;", "&"),
);
if (routeUrls.length < 180) {
  throw new Error(
    `Sitemap export is incomplete: expected at least 180 URLs, got ${routeUrls.length}`,
  );
}

const renderRoute = async (routeUrl) => {
  const url = new URL(routeUrl);
  const response = await renderFollowingRedirects(url.toString(), "text/html");
  if (response.status !== 200) {
    throw new Error(`Unable to render ${url.pathname} (${response.status})`);
  }
  const routeDirectory =
    url.pathname === "/"
      ? staticPagesDir
      : resolve(staticPagesDir, url.pathname.replace(/^\/|\/$/g, ""));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, "index.html"), await response.text());
};

for (let index = 0; index < routeUrls.length; index += 12) {
  await Promise.all(routeUrls.slice(index, index + 12).map(renderRoute));
}

const robotsResponse = await renderFollowingRedirects(
  "https://joyagoochina.org/robots.txt",
  "text/plain",
);
if (robotsResponse.status !== 200) {
  throw new Error(`Unable to render robots.txt (${robotsResponse.status})`);
}
await writeFile(
  resolve(staticPagesDir, "robots.txt"),
  await robotsResponse.text(),
);

const htmlFiles = [];
const collectHtml = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectHtml(path);
    } else if (extname(entry.name) === ".html") {
      htmlFiles.push(path);
    }
  }
};

await collectHtml(staticPagesDir);
for (const htmlPath of htmlFiles) {
  const routeSegments = relative(staticPagesDir, htmlPath).split("/");
  const language = localeCodes.has(routeSegments[0]) ? routeSegments[0] : "en";
  const html = await readFile(htmlPath, "utf8");
  const localizedHtml = html
    .replace(
      /<html\b([^>]*?)\blang=(["'])[^"']*\2([^>]*)>/i,
      `<html$1lang="${language}"$3>`,
    )
    .replace(
      /\/workspace\/sites\/[^/]+\/\.vinext\/fonts\//g,
      "/assets/_vinext_fonts/",
    );
  await writeFile(htmlPath, localizedHtml);
}

await stat(resolve(pagesDir, "_worker.js"));
await stat(resolve(pagesDir, "ssr/index.js"));
await stat(resolve(pagesDir, "__vite_rsc_assets_manifest.js"));
await stat(resolve(staticPagesDir, "_worker.js"));
await stat(resolve(staticPagesDir, "404.html"));
await stat(resolve(staticPagesDir, "index.html"));
await stat(resolve(staticPagesDir, "sitemap.xml"));

console.log(`Prepared Cloudflare Pages output: ${pagesDir}`);
console.log(
  `Prepared static fallback output: ${staticPagesDir} (${routeUrls.length} routes)`,
);
