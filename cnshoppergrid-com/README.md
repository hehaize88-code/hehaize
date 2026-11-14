# CNShopper Grid

Production: https://cnshoppergrid.com

Independent catalog. Products and seller photos come from cnbuycha.com. Real styles are read by product ID from the original Weidian public listing. No database or merchant credentials.

Cloudflare Worker: cnshoppergrid-com
Repository: hehaize88-code/hehaize
Root directory: cnshoppergrid-com
Branch: main
Build: npm run build
Deploy: npx wrangler deploy
Custom domains: cnshoppergrid.com and www.cnshoppergrid.com (redirect to HTTPS apex).

All product routes automatically load real variant images. Successful responses have a bounded ten-minute memory/edge cache. Source errors retain the original product link rather than fabricate variants. Search fingerprints contain public cnbuycha image URLs and visual hashes.
