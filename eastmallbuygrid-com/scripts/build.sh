#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/assemble.mjs
node --check worker/index.js
