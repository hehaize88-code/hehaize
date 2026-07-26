import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const exportRoot = join(projectRoot, "out");
const protectedNames = new Set([
  ".git",
  ".openai",
  "app",
  "node_modules",
  "out",
  "scripts",
  "tests",
  "package.json",
  "package-lock.json",
]);

async function copyTree(source, destination) {
  const entries = await readdir(source, { withFileTypes: true });
  await mkdir(destination, { recursive: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyTree(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, destinationPath);
    } else {
      throw new Error(`Unsupported export entry type: ${sourcePath}`);
    }
  }
}

const entries = await readdir(exportRoot, { withFileTypes: true });
for (const entry of entries) {
  if (protectedNames.has(entry.name)) {
    throw new Error(`Refusing to replace protected project entry: ${entry.name}`);
  }
  const source = join(exportRoot, entry.name);
  const destination = join(projectRoot, entry.name);
  await rm(destination, { recursive: true, force: true });
  if (entry.isDirectory()) {
    await copyTree(source, destination);
  } else if (entry.isFile()) {
    await copyFile(source, destination);
  } else {
    throw new Error(`Unsupported export entry type: ${source}`);
  }
}

console.log(`Synchronized ${entries.length} static export entries into the Cloudflare publish directory.`);
