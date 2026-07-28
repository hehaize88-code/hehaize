import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const origin = "https://lolobuy-sheet.net";
const lastModified = "2026-07-28";
const locales = ["en", "es", "de", "fr", "it"];
const corePaths = [
  "/",
  "/products",
  "/categories",
  "/qc-guide",
  "/shipping",
  "/articles",
  "/faq",
  "/how-it-works",
];
const articlePaths = [
  "/articles/how-to-use-lolobuy-spreadsheet",
  "/articles/lolobuy-qc-photos-guide",
  "/articles/lolobuy-shipping-cost-guide",
];

function localizedPath(locale, pathname) {
  if (locale === "en") return pathname;
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function absolute(pathname) {
  return new URL(pathname, origin).toString();
}

function alternateLinks(pathname) {
  return [
    ...locales.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${absolute(localizedPath(locale, pathname))}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(pathname)}" />`,
  ].join("\n");
}

const localizedEntries = corePaths.flatMap((pathname) =>
  locales.map((locale) => ({
    location: absolute(localizedPath(locale, pathname)),
    alternates: alternateLinks(pathname),
  })),
);
const articleEntries = articlePaths.map((pathname) => ({
  location: absolute(pathname),
  alternates: "",
}));
const entries = [...localizedEntries, ...articleEntries];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.location}</loc>
${entry.alternates ? `${entry.alternates}\n` : ""}    <lastmod>${lastModified}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await Promise.all([
  writeFile(path.join(projectRoot, "sitemap.xml"), xml),
  writeFile(
    path.join(projectRoot, "sitemap.txt"),
    `${entries.map((entry) => entry.location).join("\n")}\n`,
  ),
]);

console.log(
  `Generated sitemap.xml and sitemap.txt with ${entries.length} canonical URLs.`,
);
