import applicationWorker from "../dist/server/index.js";

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
    .transform(htmlResponse);
}

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;

const staticFiles = new Set([
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/lolobuy.png",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/products-320/") ||
    pathname.startsWith("/products-480/") ||
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

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    return withGoogleAnalytics(
      await versionAssetReferences(response),
      request,
    );
  },
};
