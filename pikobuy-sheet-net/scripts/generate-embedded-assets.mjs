import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [clientRoot, assetVersion, outputFile] = process.argv.slice(2);
if (!clientRoot || !assetVersion || !outputFile) {
  throw new Error(
    "Usage: generate-embedded-assets.mjs <client-root> <asset-version> <output-file>",
  );
}

const fontRoot = path.join(clientRoot, "assets", "_vinext_fonts");
const entries = {};

async function visit(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) {
      await visit(absolute);
      continue;
    }
    if (!item.name.endsWith(".woff2")) {
      continue;
    }

    const relative = path.relative(fontRoot, absolute).split(path.sep).join("/");
    const pathname = `/assets/${assetVersion}/_vinext_fonts/${relative}`;
    entries[pathname] = {
      contentType: "font/woff2",
      base64: (await readFile(absolute)).toString("base64"),
    };
  }
}

await visit(fontRoot);

const logoBase64 = (
  await readFile(
    path.join(clientRoot, "..", "..", "public", "pikobuy-logo.base64"),
    "utf8",
  )
).trim();
entries["/pikobuy-logo.png"] = {
  contentType: "image/png",
  base64: logoBase64,
};

await writeFile(
  outputFile,
  `export const embeddedBinaryAssets = ${JSON.stringify(entries)};\n`,
);
console.log(
  `Embedded ${Object.keys(entries).length} binary assets for Pages.`,
);
