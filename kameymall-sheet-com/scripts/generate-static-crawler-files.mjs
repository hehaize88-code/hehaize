import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const clientOutput = path.join(projectRoot, "dist", "client");
const workerUrl = pathToFileURL(path.join(projectRoot, "dist", "server", "index.js"));
workerUrl.searchParams.set("crawler-files", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const context = {
  waitUntil() {},
  passThroughOnException() {},
};

async function render(pathname) {
  const response = await worker.fetch(
    new Request(`https://kameymall-sheet.com${pathname}`),
    env,
    context,
  );
  if (!response.ok) {
    throw new Error(`${pathname} returned ${response.status}`);
  }
  return response.text();
}

await mkdir(clientOutput, { recursive: true });
const [sitemap, robots] = await Promise.all([
  render("/sitemap.xml"),
  render("/robots.txt"),
]);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

if (sitemapUrls.length !== 318) {
  throw new Error(`Expected 318 sitemap URLs, received ${sitemapUrls.length}`);
}
if (!robots.includes("https://kameymall-sheet.com/sitemap.xml")) {
  throw new Error("robots.txt does not reference the production sitemap");
}

await Promise.all([
  writeFile(path.join(clientOutput, "sitemap.xml"), sitemap),
  writeFile(path.join(clientOutput, "sitemap.txt"), `${sitemapUrls.join("\n")}\n`),
  writeFile(path.join(clientOutput, "robots.txt"), robots),
]);

console.log(`Generated crawler files for ${sitemapUrls.length} canonical URLs.`);
