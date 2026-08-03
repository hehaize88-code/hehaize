import { access, mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(projectRoot, "scripts", "product-image-sources.json");
const outputDirectory = path.join(projectRoot, "public", "product-images");
const productSourcePath = path.join(projectRoot, "app", "site-products.ts");
const refresh = process.argv.includes("--refresh");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

if (manifest.length !== 30) {
  throw new Error(`Expected 30 product image sources, received ${manifest.length}`);
}
if (new Set(manifest.map((item) => item.slug)).size !== manifest.length) {
  throw new Error("Product image slugs must be unique");
}
if (new Set(manifest.map((item) => item.file)).size !== manifest.length) {
  throw new Error("Product image file names must be unique");
}

const productSource = await readFile(productSourcePath, "utf8");
const referencedFiles = [...productSource.matchAll(/image:\s*["']\/product-images\/([^"']+)["']/g)].map((match) => match[1]);
const manifestFiles = manifest.map((item) => item.file);
if (referencedFiles.length !== manifest.length) {
  throw new Error(`Expected ${manifest.length} local product image references, received ${referencedFiles.length}`);
}
for (const file of manifestFiles) {
  if (!referencedFiles.includes(file)) throw new Error(`Product catalog does not reference ${file}`);
}

await mkdir(outputDirectory, { recursive: true });

async function isUsableLocalFile(filePath) {
  try {
    await access(filePath);
    return (await stat(filePath)).size >= 1024;
  } catch {
    return false;
  }
}

async function syncImage(item) {
  const destination = path.join(outputDirectory, item.file);
  if (!refresh && await isUsableLocalFile(destination)) return "kept";

  const temporary = `${destination}.download-${process.pid}`;
  try {
    const response = await fetch(item.source, {
      headers: { "user-agent": "KameyMall-Sheet-Image-Sync/1.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) {
      throw new Error(`${item.slug}: source returned ${response.status}`);
    }
    const contentType = (response.headers.get("content-type") ?? "").split(";", 1)[0].toLowerCase();
    if (!allowedTypes.has(contentType)) {
      throw new Error(`${item.slug}: unexpected content type ${contentType || "missing"}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength < 1024) {
      throw new Error(`${item.slug}: downloaded image is unexpectedly small`);
    }
    await writeFile(temporary, bytes, { flag: "wx" });
    await rename(temporary, destination);
    return "downloaded";
  } catch (error) {
    await unlink(temporary).catch(() => {});
    throw error;
  }
}

const results = [];
for (const item of manifest) results.push(await syncImage(item));

const downloaded = results.filter((result) => result === "downloaded").length;
console.log(`Product images ready: ${manifest.length} total, ${downloaded} downloaded, ${manifest.length - downloaded} already local.`);
