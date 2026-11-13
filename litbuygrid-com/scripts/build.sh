#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p dist/server dist/.openai
node scripts/bundle.mjs
cp .openai/hosting.json dist/.openai/hosting.json
