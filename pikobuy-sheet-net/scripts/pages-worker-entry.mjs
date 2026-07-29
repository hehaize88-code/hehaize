import applicationWorker from "../dist/server/index.js";
import { embeddedBinaryAssets } from "./embedded-binary-assets.mjs";

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;

const staticFiles = new Set([
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/pikobuy-logo.png",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return pathname.startsWith("/assets/") || staticFiles.has(pathname);
}

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
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
    const embedded = embeddedBinaryAssets[url.pathname];

    if (embedded) {
      return new Response(decodeBase64(embedded.base64), {
        headers: {
          "content-type": embedded.contentType,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    return versionAssetReferences(response);
  },
};
