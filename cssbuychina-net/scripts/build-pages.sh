#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"

cd "${project_root}"

# Remove only generated deployment outputs so stale hashed files cannot be
# committed or served after a source change.
rm -rf \
  "${project_root}/dist" \
  "${project_root}/assets" \
  "${project_root}/.vite"
rm -f \
  "${project_root}/_headers" \
  "${project_root}/_routes.json" \
  "${project_root}/_worker.js" \
  "${project_root}/cssbuy-logo.png" \
  "${project_root}/favicon.svg" \
  "${project_root}/file.svg" \
  "${project_root}/globe.svg" \
  "${project_root}/robots.txt" \
  "${project_root}/sitemap.xml" \
  "${project_root}/window.svg"

npm run build

pages_output="${project_root}/dist/client"
worker_source="${project_root}/dist/server/index.js"
pages_worker_entry="${script_dir}/pages-worker-entry.mjs"
pages_headers="${script_dir}/pages-headers.txt"
esbuild="${project_root}/node_modules/.bin/esbuild"
async_hooks_polyfill="${project_root}/node_modules/unenv/dist/runtime/node/async_hooks.mjs"
empty_module="${project_root}/node_modules/unenv/dist/runtime/mock/empty.mjs"
process_shim="${script_dir}/pages-process-shim.mjs"

[[ -f "${worker_source}" ]] || {
  echo "Missing Vinext Worker entry: dist/server/index.js" >&2
  exit 66
}
[[ -x "${esbuild}" ]] || {
  echo "Missing esbuild required to bundle the Pages Worker" >&2
  exit 69
}
[[ -f "${pages_worker_entry}" && -f "${pages_headers}" && -f "${async_hooks_polyfill}" && -f "${empty_module}" && -f "${process_shim}" ]] || {
  echo "Missing Cloudflare Pages build support files" >&2
  exit 69
}

cp "${pages_headers}" "${pages_output}/_headers"

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
  --outfile="${pages_output}/_worker.js"

[[ -f "${pages_output}/_worker.js" ]] || {
  echo "Missing Cloudflare Pages Worker entry" >&2
  exit 66
}
[[ -f "${pages_output}/cssbuy-logo.png" ]] || {
  echo "Missing packaged CSSBuy logo" >&2
  exit 66
}
[[ -f "${pages_output}/robots.txt" && -f "${pages_output}/sitemap.xml" ]] || {
  echo "Missing crawler files" >&2
  exit 66
}

rsync -a "${pages_output}/" "${project_root}/"

echo "Prepared Cloudflare Pages artifact in ${project_root}."
