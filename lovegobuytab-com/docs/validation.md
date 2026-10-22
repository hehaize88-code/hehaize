# Preview validation

Checked 2026-10-22.

## Actual CNBuyCha integration

Executed the bundled Astro Worker against the live source, without fixtures or a product database.

- Homepage: 200, 11 source categories, 10 displayed products.
- Source catalog: 3,456 items; the directory renders 20 per page.
- Pages 1, 2 and 4: 20 products each; no adjacent tested-page overlap; page 4 correctly crosses the source 60-item page boundary.
- Query `7876894732`: one result, internal catalog record 3470.
- Product `/products/shoes/3470/`: 200, four source product photos. Purchase href uses original product ID 7876894732, `shop_type=weidian`, `invite_code=161CPG`.
- Search `nike` with `sort=price`: 200 and 20 source results.
- FAQ, article directory, individual shipping article: 200 with server-rendered content.
- Unknown path: 404.

## Browser preview

Desktop homepage and FAQ layout rendered in the managed preview; official logo loaded and FAQ displayed all 36 questions. The managed development server could not fetch the external catalog, although the same bundled Worker succeeded in the normal integration environment. Browser controls then encountered a managed URL-policy restriction, so additional local interaction checks were stopped rather than worked around. Deployment checks must verify the actual public host separately.

## Final gates

Content gate passed: 24 locales, 240 complete article pages and 864 FAQ entries. Matching copy keys, paragraphs, sections, bullets, takeaways and official source references. Published-host verification follows deployment.

## Publication result

Build and publication succeeded for version 1, source commit `5591ed3f65e1f2f30d4b62334b3d3a8cdd023b5a`. Sites reports active/public at https://lovegobuytab-preview.hehaize88.chatgpt.site.

The public-browser check was blocked by the host's Cloudflare security page (Ray ID `a4e5d4291e937eb7`). It was not bypassed. Actual published-host catalog/image loading and mobile interaction therefore remain unverified. The live-source integration results above are from the bundled Worker in the execution environment, not a claim about public browser loading.

The purchased production domain is not bound. Preview remains noindex.
