import { copyFile, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptsDirectory, "..");
const serverDirectory = path.join(projectRoot, "dist", "server");
const generatedEntry = path.join(serverDirectory, "index.js");
const applicationEntry = path.join(serverDirectory, "application.js");
const localeEntry = path.join(scriptsDirectory, "server-locale-entry.mjs");

await rename(generatedEntry, applicationEntry);
await copyFile(localeEntry, generatedEntry);

console.log("Wrapped the server entry with locale routing and HTML language signals.");
