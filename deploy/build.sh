#!/usr/bin/env sh
# Build the deck and add the Cloudflare Pages SPA redirect so /s/<slide> routes work.
set -e
cd "$(dirname "$0")/.."
npm run build
cp deploy/_redirects dist/_redirects
