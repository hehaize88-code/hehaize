import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const exportRoot = join(projectRoot, "out");

async function filesUnder(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesUnder(path));
    else if (entry.isFile()) result.push(path);
  }
  return result;
}

const digest = async (path) =>
  createHash("sha256").update(await readFile(path)).digest("hex");

const exportedFiles = await filesUnder(exportRoot);
for (const exportedFile of exportedFiles) {
  const path = relative(exportRoot, exportedFile);
  const publishedFile = join(projectRoot, path);
  assert.equal(
    await digest(publishedFile),
    await digest(exportedFile),
    `published file differs from the verified export: ${path}`,
  );
}

console.log(`Validated ${exportedFiles.length} published files against the verified static export.`);
