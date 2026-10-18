# SugargooTab production project

Updated: 2026-10-18 (Asia/Shanghai)
Status: V2 preview live. Production source is prepared and validated for GitHub. Cloudflare deployment awaits restored authorization.
Runtime checks: home/listing/guide/visual routes return 200; real product /products/shoes/3470.html returns 200, four source images, correct encoded purchase URL and memberId. Unknown routes return 404.
Visual QA: desktop and 390px mobile inspected with transient HTML rendered by the same Worker from live CNBUYCHA data; QA files removed before packaging. Managed dev fetch failed while Node built Worker fetched successfully; verify deployed runtime.
Astro 7 catch-all params strip .html: route using Astro.url.pathname to preserve source product paths.
Preview source is saved to the Sites Git repo. Formal GitHub target is hehaize88-code/hehaize/sugargootab-com; production DNS and runtime binding remain pending.
Site ID: appgprj_6ad471356180819186ecfb7a32434231
Expected preview origin: https://sugargoo-spreadsheet-preview.hehaize88.chatgpt.site
Framework: Astro 7.4.0 (registry latest checked today), SSR fetch Worker.
User requested a publicly accessible temporary preview; formal domain and GitHub deployment follow review.
Future production source: hehaize88-code/hehaize, one domain per top-level folder.
Registration: https://www.sugargoo.com/register?redirect=/order/manual
Purchase: https://www.sugargoo.com/products?productLink={encodedSourceUrl}&memberId=1771881989097259278
Source product ID is distinct from internal catalogue ID. Member ID is a string.
Only source: https://cnbuycha.com public catalogue. No new database, product JSON snapshot, photo store, image index or admin.
24 locales retained. Product titles remain source originals when translations are unavailable.
Image search endpoint and QC provenance remain unverified; no fake search or QC images.
Noindex preview. Production domain purchased by user: sugargootab.com, Cloudflare registration screenshot shows Active. Target GitHub directory: sugargootab-com. DNS/runtime binding has not yet been performed in this turn.
Domain RDAP 2026-10-18: sugargoopick/sugargoosheet/sugargoolist/sugargootable/sugargoopicks.com registered (200); sugargootab/sugargoogrid/sugargoodeck.com no record (404). Registrar pricing and purchase availability not verified.


## FAQ and editorial expansion — 2026-10-18
- User requested top FAQ and SEO article entry points,20+ official-source FAQs and10 substantial articles; all24 languages retained.
- Official source ledger and qualitative keyword briefs are in research/. Official blog indexed content was available; several direct opens returned403. Policies are conditional, no universal storage/refund/insurance guarantees.
-30FAQ in6 groups;10English original articles (~950–1100words each) with7 sections, checklists, sources and related links. All 24 complete translations pass scripts/check-editorial.mjs; every locale has 30 FAQ and 10 full articles. No untranslated English body fallback.
- Added /faq/,/articles/,/articles/{slug}/; header/footer entry links and4home article cards. FAQ has local search and accordions. Articles have mobile-collapsed TOC.
- Domain target stored in site-targets.mjs; preview remains noindex. Do not treat buying the domain as proof DNS/production binding is complete.

## Expansion validation and remaining production work
- Astro build succeeds; scripts/check-editorial-routes.mjs verifies all 288 editorial routes, matching language/canonical/hreflang, 30 FAQ or 10 index cards, full article paragraphs/checklists, schema and same-article language links. Unknown article returns404.
- Browser QA: desktop FAQ filtering/expansion, desktop articles, 390px mobile English article and French FAQ, French-to-English switch retaining article. TOC removes redundant numbering and collapses on mobile. Temporary QA files removed.
- Product data adapter unchanged; only cnbuycha public reads. Image search remains unconnected; reference photos are not personal warehouse QC.
- Cloudflare connector read attempt on 2026-10-18 returned UNAUTHORIZED: reauthentication required. No Cloudflare DNS changes were made. Restore connection before production domain setup.
- Research documents describe qualitative search intent and official-source limits; no invented volume/rankings, purchases or performance results.

## Production migration — 2026-10-18
- User authorized deployment to GitHub, then Cloudflare and domain binding.
- Repository: hehaize88-code/hehaize, branch main, folder sugargootab-com. Scope only this folder; preserve all other domain projects.
- Source copied from validated preview commit a91c7d3e06feff2700570f976754b72869899916, excluding Site identity and Git metadata. Preview remains separate and unchanged.
- Runtime: Cloudflare Worker sugargootab-com, dist/server/index.js, static ASSETS dist/client. Wrangler 4.151.1, Node 22.22.0+, Astro 7.4.0. No database binding or product storage.
- Canonical origin https://sugargootab.com; www permanently redirects to apex, retaining path/query. Both domains declared in wrangler.jsonc.
- Production 200 content is indexable; failed responses, search/sort/pagination, visual-search unavailable page and non-production hosts remain noindex. Sitemap includes 672 localized content/category URLs; product URLs are discovered through live catalogue navigation.
- Cloudflare Git integration settings are documented in README.md. GitHub source publication does not itself create the Worker or connect builds.
- Cloudflare connector again returned UNAUTHORIZED / reauthentication required. No production Worker, Git integration, DNS or certificate binding has been changed or verified yet.
- Image search remains unconnected pending the source endpoint. Product photos are source reference images, not personal warehouse QC.
- Production validation: 24 locales retain 30 FAQ and 10 articles; all 288 editorial routes pass. Canonical, index/noindex, 308 www redirect preserving query, 404 and static binding checks pass. Sitemap has 672 unique URLs.
- Cloudflare Wrangler dry-run succeeds: Worker upload 4152.42 KiB, gzip 1029.52 KiB, only ASSETS binding. A dry-run is not a live deployment.
- Built production SSR verified against live CNBUYCHA: home 200 with six product cards; keyword+price search 200 with 60 real cards and noindex; product /products/shoes/3470.html 200 with four source photos and the verified Sugargoo affiliate link.
- Local Wrangler emulator could not start in this container: uv_interface_addresses system error. Built Worker route tests and Wrangler deployment dry-run passed; this is an environment verification limitation, not proof of a deployed Cloudflare runtime.
- No Cloudflare changes have been made: connector authorization must be restored, or explicit browser-fallback consent obtained, before connecting GitHub builds and binding domains.
