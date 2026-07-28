const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

const securityHeaders = {
  "Content-Security-Policy": contentSecurityPolicy,
  "Permissions-Policy":
    "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

export function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const notFoundDescription =
  "This Lolobuy Sheet page could not be found. Browse the current product directory, category research, and practical QC guides.";

function replaceMetaTag(
  html: string,
  attribute: "name" | "property",
  value: string,
  replacement: string,
) {
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${value}["'][^>]*>`,
    "gi",
  );
  return html.replace(pattern, replacement);
}

export async function withSearchSafeNotFound(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (response.status !== 404 || !contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();
  html = html
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta[^>]+name=["']robots["'][^>]*>/gi, "")
    .replace(/<meta[^>]+property=["']og:url["'][^>]*>/gi, "")
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      "<title>Page Not Found | Lolobuy Sheet</title>",
    );

  html = replaceMetaTag(
    html,
    "name",
    "description",
    `<meta name="description" content="${notFoundDescription}"/>`,
  );
  html = replaceMetaTag(
    html,
    "property",
    "og:title",
    '<meta property="og:title" content="Page Not Found | Lolobuy Sheet"/>',
  );
  html = replaceMetaTag(
    html,
    "property",
    "og:description",
    `<meta property="og:description" content="${notFoundDescription}"/>`,
  );
  html = replaceMetaTag(
    html,
    "name",
    "twitter:title",
    '<meta name="twitter:title" content="Page Not Found | Lolobuy Sheet"/>',
  );
  html = replaceMetaTag(
    html,
    "name",
    "twitter:description",
    `<meta name="twitter:description" content="${notFoundDescription}"/>`,
  );

  const title = "<title>Page Not Found | Lolobuy Sheet</title>";
  html = html.replace(
    title,
    `<meta name="robots" content="noindex, follow"/>${title}`,
  );

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
