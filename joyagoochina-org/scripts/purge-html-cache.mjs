const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const siteOrigin = new URL(
  process.env.JOYAGOO_SITE_ORIGIN ?? "https://joyagoochina.org",
);

if (!apiToken || !zoneId) {
  throw new Error(
    "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID before purging HTML.",
  );
}

if (siteOrigin.hostname !== "joyagoochina.org") {
  throw new Error("JOYAGOO_SITE_ORIGIN must use joyagoochina.org.");
}

const sitemapUrl = new URL("/sitemap.xml", siteOrigin);
const sitemapResponse = await fetch(sitemapUrl, {
  headers: { accept: "application/xml" },
});
if (!sitemapResponse.ok) {
  throw new Error(
    `Unable to read ${sitemapUrl} (${sitemapResponse.status}).`,
  );
}

const sitemapXml = await sitemapResponse.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1].replaceAll("&amp;", "&"),
);
const files = [
  ...new Set([
    ...sitemapUrls,
    new URL("/sitemap.xml", siteOrigin).toString(),
    new URL("/robots.txt", siteOrigin).toString(),
  ]),
];

const purgeEndpoint =
  `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`;
for (let index = 0; index < files.length; index += 30) {
  const batch = files.slice(index, index + 30);
  const response = await fetch(purgeEndpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ files: batch }),
  });
  const result = await response.json();
  if (!response.ok || !result?.success) {
    throw new Error(
      `Cloudflare purge failed (${response.status}): ${JSON.stringify(result)}`,
    );
  }
  console.log(`Purged ${Math.min(index + batch.length, files.length)}/${files.length} URLs.`);
}
