#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"

cd "${project_root}"
npm run build
node scripts/generate-static-crawler-files.mjs

pages_output="${project_root}/dist/client"
worker_source="${project_root}/dist/server"
pages_worker_entry="${script_dir}/pages-worker-entry.mjs"
pages_headers="${script_dir}/pages-headers.txt"
asset_version="v20260803-3"
versioned_assets="${pages_output}/assets/${asset_version}"
esbuild="${project_root}/node_modules/.bin/esbuild"
async_hooks_polyfill="${project_root}/node_modules/unenv/dist/runtime/node/async_hooks.mjs"
empty_module="${project_root}/node_modules/unenv/dist/runtime/mock/empty.mjs"
process_shim="${script_dir}/pages-process-shim.mjs"

[[ -f "${worker_source}/index.js" ]] || {
  echo "Missing Vinext Worker entry: dist/server/index.js" >&2
  exit 66
}
[[ -x "${esbuild}" ]] || {
  echo "Missing esbuild required to bundle the Pages Worker" >&2
  exit 69
}
[[ -f "${pages_worker_entry}" && -f "${pages_headers}" && -f "${async_hooks_polyfill}" && -f "${empty_module}" && -f "${process_shim}" ]] || {
  echo "Missing Worker-compatible Node.js polyfills" >&2
  exit 69
}

cp "${pages_headers}" "${pages_output}/_headers"
mkdir -p "${versioned_assets}"
find "${pages_output}/assets" -maxdepth 1 -type f -exec cp {} "${versioned_assets}/" \;

"${esbuild}" \
  "${pages_worker_entry}" \
  --bundle \
  --format=esm \
  --platform=neutral \
  --minify \
  "--alias:node:async_hooks=${async_hooks_polyfill}" \
  "--alias:node:fs=${empty_module}" \
  "--alias:node:path=${empty_module}" \
  "--inject:${process_shim}" \
  "--define:PAGES_ASSET_VERSION=\"${asset_version}\"" \
  --outfile="${pages_output}/_worker.js"

[[ -f "${pages_output}/_worker.js" ]] || {
  echo "Missing Cloudflare Pages Worker entry: dist/client/_worker.js" >&2
  exit 66
}
[[ -f "${pages_output}/kameymall-logo.png" ]] || {
  echo "Missing packaged KameyMall logo in dist/client" >&2
  exit 66
}
compgen -G "${versioned_assets}/*.css" >/dev/null || {
  echo "Missing cache-busted stylesheet in ${versioned_assets}" >&2
  exit 66
}

node --input-type=module - "${pages_output}/_worker.js" "${asset_version}" <<'NODE'
import { pathToFileURL } from "node:url";

const workerUrl = pathToFileURL(process.argv[2]);
const assetVersion = process.argv[3];
workerUrl.searchParams.set("pages-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);
if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error("dist/client/_worker.js must export a callable default.fetch");
}

const assetMarker = "pages-static-asset";
const assetResponse = await worker.default.fetch(
  new Request(`https://example.com/assets/${assetVersion}/test.css`),
  {
    ASSETS: {
      fetch() {
        return new Response(assetMarker, {
          headers: { "content-type": "text/css" },
        });
      },
    },
  },
  {},
);
if (
  assetResponse.status !== 200 ||
  (await assetResponse.text()) !== assetMarker
) {
  throw new Error("Cloudflare Pages static assets must be forwarded through env.ASSETS");
}

const wwwAssetResponse = await worker.default.fetch(
  new Request(`https://www.kameymall-sheet.com/assets/${assetVersion}/test.css?source=www-check`),
  {
    ASSETS: {
      fetch() {
        return new Response(assetMarker, {
          headers: { "content-type": "text/css" },
        });
      },
    },
  },
  {},
);
if (
  wwwAssetResponse.status !== 301 ||
  wwwAssetResponse.headers.get("location") !==
    `https://kameymall-sheet.com/assets/${assetVersion}/test.css?source=www-check`
) {
  throw new Error("Every www request, including static assets, must redirect to the canonical hostname");
}

const homeResponse = await worker.default.fetch(
  new Request("https://example.com/es"),
  {
    ASSETS: {
      fetch() {
        return new Response("not found", { status: 404 });
      },
    },
  },
  {},
);
const homeBody = await homeResponse.text();
if (
  homeResponse.status !== 200 ||
  !homeBody.includes(`/assets/${assetVersion}/`) ||
  /(?:src|href)="\/assets\/(?!v)/.test(homeBody) ||
  !homeBody.includes('<html lang="es">') ||
  !homeBody.includes('<main lang="es"') ||
  !/hreflang/i.test(homeBody)
) {
  throw new Error("Localized application responses must retain versioned assets and SEO language signals");
}
NODE

rsync -a "${pages_output}/" "${project_root}/"

echo "Prepared Cloudflare Pages artifact in the project root."
