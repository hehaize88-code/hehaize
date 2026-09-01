import applicationWorker from "../dist/server/index.js";
import {
  withSearchSafeNotFound,
  withSecurityHeaders,
} from "../worker/security-headers.ts";

const productDestinations = Object.freeze({
  "snow-ski-goggles": "3359",
  "gucci-hat": "3353",
  "off-white-hoodies": "3413",
  "numeris-high-top-shoes": "3355",
  "hoka-speedgoat-5": "3328",
  "nike-elite-backpack": "3295",
  "balenciaga-puffer": "3312",
  "winter-hooded-jacket": "3374",
});

function productDestination(pathname) {
  const match = pathname.match(
    /^\/(?:(?:es|de|fr|it)\/)?products\/([^/]+)\/?$/,
  );
  const id = match && productDestinations[match[1]];
  return id ? `https://www.cnbuycha.com/AllProducts/${id}.html` : null;
}

const productLinkRewriter = {
  element(element) {
    const href = element.getAttribute("href");
    if (!href) return;

    try {
      const resolved = new URL(href, "https://lolobuy-sheet.com");
      if (
        resolved.hostname !== "lolobuy-sheet.com" &&
        resolved.hostname !== "www.lolobuy-sheet.com"
      ) {
        return;
      }

      const destination = productDestination(resolved.pathname);
      if (destination) element.setAttribute("href", destination);
    } catch {}
  },
};

const GA4_SNIPPET =
  '<script async src="/ga4-tag.js"></script><script src="/ga4-init.js"></script>';

async function googleAnalyticsAsset(request) {
  const url = new URL(request.url);
  if (url.pathname === "/ga4-init.js") {
    return new Response(
      "window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-QY8MM7VZV2');",
      {
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      },
    );
  }
  if (url.pathname === "/ga4-tag.js") {
    const upstream = await fetch(
      "https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2",
    );
    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "public, max-age=3600");
    headers.delete("set-cookie");
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  }
  return null;
}

function withGoogleAnalytics(response, request) {
  const contentType = response.headers.get("content-type") || "";
  if (
    request.method !== "GET" ||
    !contentType.toLowerCase().includes("text/html") ||
    typeof HTMLRewriter === "undefined"
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  const csp = headers.get("content-security-policy");
  if (csp) {
    headers.set(
      "content-security-policy",
      csp.replace(
        "connect-src 'self'",
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      ),
    );
  }

  const htmlResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(GA4_SNIPPET, { html: true });
      },
    })
    .on("a[href]", productLinkRewriter)
    .transform(htmlResponse);
}

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;

const staticFiles = new Set([
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/lolobuy-logo.png",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/articles/") ||
    pathname.startsWith("/product-finds/") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/social/") ||
    staticFiles.has(pathname)
  );
}

function shouldVersionAssetReferences(response) {
  const contentType = response.headers.get("content-type") || "";
  return (
    contentType.includes("text/html") ||
    contentType.includes("text/x-component") ||
    contentType.includes("application/json")
  );
}

async function versionAssetReferences(response) {
  if (!shouldVersionAssetReferences(response)) {
    return response;
  }

  const body = await response.text();
  if (!body.includes("/assets/")) {
    return new Response(body, response);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(body.replaceAll("/assets/", versionedAssetsPrefix), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const analyticsAsset = await googleAnalyticsAsset(request);
    if (analyticsAsset) {
      return analyticsAsset;
    }

    if (url.hostname === "www.lolobuy-sheet.com") {
      const destination = new URL(url);
      destination.protocol = "https:";
      destination.hostname = "lolobuy-sheet.com";
      return withSecurityHeaders(Response.redirect(destination, 301));
    }

    const destination = productDestination(url.pathname);
    if (
      destination &&
      (request.method === "GET" || request.method === "HEAD")
    ) {
      return withSecurityHeaders(Response.redirect(destination, 302));
    }

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withSecurityHeaders(assetResponse);
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    const versionedResponse = await versionAssetReferences(response);
    return withGoogleAnalytics(
      withSecurityHeaders(await withSearchSafeNotFound(versionedResponse)),
      request,
    );
  },
};
