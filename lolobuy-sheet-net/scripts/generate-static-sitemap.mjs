import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const origin = "https://lolobuy-sheet.net";
const locales = ["en", "es", "de", "fr", "it"];
const contentDates = JSON.parse(
  await readFile(
    path.join(projectRoot, "app", "content-dates.json"),
    "utf8",
  ),
);
const corePaths = Object.keys(contentDates.core);
const articleSlugs = Object.keys(contentDates.articles);
const trustPaths = Object.keys(contentDates.trust);
const productIds = [3359, 3369, 3371, 3357, 3367, 3366, 3368, 3372, 3356, 3355, 3353, 3351];
const categorySlugs = ["shoes", "hoodies", "jackets", "accessories"];

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
    lastModified: contentDates.core[pathname][locale],
  })),
);
const articleEntries = articleSlugs.flatMap((slug) =>
  locales.map((locale) => ({
    location: absolute(localizedPath(locale, `/articles/${slug}`)),
    alternates: alternateLinks(`/articles/${slug}`),
    lastModified: contentDates.articles[slug].modified,
  })),
);
const productEntries = productIds.map((id) => ({
  location: absolute(`/products/${id}`),
  alternates: "",
  lastModified: "2026-08-10",
}));
const categoryEntries = categorySlugs.map((slug) => ({
  location: absolute(`/categories/${slug}`),
  alternates: "",
  lastModified: "2026-08-10",
}));
const trustEntries = trustPaths.map((pathname) => ({
  location: absolute(pathname),
  alternates: "",
  lastModified: contentDates.trust[pathname],
}));
const entries = [
  ...localizedEntries,
  ...articleEntries,
  ...productEntries,
  ...categoryEntries,
  ...trustEntries,
];

for (const entry of entries) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastModified)) {
    throw new Error(`Invalid lastmod for ${entry.location}`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.location}</loc>
${entry.alternates ? `${entry.alternates}\n` : ""}    <lastmod>${entry.lastModified}</lastmod>
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
