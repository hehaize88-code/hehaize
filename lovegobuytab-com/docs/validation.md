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

## Replacement preview verified (2026-10-22)

https://lovegobuytab-preview.hehaize88.workers.dev was deployed successfully by Cloudflare Workers Builds at 14:29 Asia/Shanghai. Build `afc17753-f5d1-4055-960c-905646821461`, commit `fa55b89d0876e2d9dcaad7d3cd20ab034d9fbcff`, Worker version `0ef30292-e643-412d-8d60-363e41032d55`.

Actual Chrome checks: homepage rendered with all 15 image elements loaded and no horizontal overflow at 1920px; search 7876894732 returned one expected product; detail loaded its four original source photos and correct purchase URL with invite code 161CPG; FAQ displayed 36 questions; article index displayed 10 cards; shipping article displayed its full 7,494-character main content and its language menu preserved the article route. Preview robots/canonical checks passed in the bundled Worker and the public homepage contained noindex.

The execution environment's direct HTTP check returned 403, so it was stopped. Browser checks above used the user's actual Chrome session, where the replacement preview loaded successfully. No custom domain, DNS, product database or source data was changed. The GitHub preview branch remains isolated from main.


## Production deployment — 2026-10-22

- User authorized GitHub and Cloudflare deployment; PR #25 squash merged to main at 1feb51fb68757d0e456e31b1b4f54fed1f74557c.
- New production Worker `lovegobuytab-com` build fb3c6b32-e8e9-4d27-a472-22bcb148a7e4 completed. Root `lovegobuytab-com`; main branch; watch only `lovegobuytab-com/**`; existing build token reused.
- Dashboard confirms production custom domains `lovegobuytab.com` and `www.lovegobuytab.com`.
- Live Chrome: HTTPS homepage loads with production canonical and no noindex; source-backed search for 7876894732 returns the correct listing; product detail images load and purchase ID / invite code match the supplied template. FAQ has 36 entries; article index has 10 entries.
- Live robots allows indexing and references https://lovegobuytab.com/sitemap.xml. Live sitemap index lists 58 product shards plus editorial and category sitemaps.
- Bundled Worker checks passed: www redirect preserving path/query; request-host preview noindex; search noindex; unknown route/invalid sitemap 404; editorial XML 336 locale URLs. Real source-backed first and last product shards produced 1,440 and 864 locale URLs; category XML produced 264. XML structure and unique URL checks passed.
- Executor DNS resolution for the new custom domain was unavailable at verification time; live-domain verification used the user's connected Chrome, not an assumed executor HTTP result.

- Live first product sitemap contains 1,440 URLs. Live www → apex redirect preserves /de/faq/?q=test; German FAQ renders 36 entries.

- End-to-end GitHub auto-deploy verified: commit b3205df890851a34485f8d619faba487202955c9 triggered build 21047122-962a-4808-99c3-fd49cbdbfa38; Ready in 43 seconds, Worker version 41c2a22b. Homepage reload retains production canonical and indexability.


## SEO publication — 2026-10-23

Production source commit: `6d8511c2848b21f8e4858581667c5fae3fb614e1`, following the complete content commit `a11b0bf5cc051d42e1e1bdd9e1bb922598457646`.

Cloudflare build `7fb7b60d-3bf2-4752-ab89-41d6d107a0ae` succeeded. Active Worker version: `b6ada243-c760-42d4-a1cf-1bb5ddc88ab0`. Existing GitHub main/root/watch configuration retained.

The first build passed content and Astro compilation but failed uploading the new interaction-events static asset with 401. The final implementation embeds the same small, tested script in production HTML. It requires no new static upload or credentials and introduces no extra page_view event. Original favicon and logo assets are unchanged.

Validation completed:

- Production build and content gate: 24 locales, 312 complete article pages, 864 FAQ entries, preserved original paragraphs and matching full translation structures.
- Bundled Worker: all 312 article routes return 200; all expected localized paragraphs, 216 tables, metadata, publication/modification dates and contextual links are present. All 24 indexes have 13 articles, prioritizing the three new guides.
- Editorial sitemap: 408 unique URLs, including every new locale route; correct stable lastmod dates and hreflang. Preview analytics/noindex boundaries, 404 and www redirects pass.
- Six interaction events tested; search events carry length only, preview emits none, no duplicate page views. Production event collection volume has not yet been independently confirmed in GA4 reports.
- Live Chrome: index shows 13 articles and the three new titles; full English tracking article and same-route switch to German work; German has its own canonical and 25 alternates; Maltese image-search page and table render fully.
- Live mobile check at requested 390 × 844 viewport: Maltese article body is 15px, clientWidth and scrollWidth both 375px, table right edge is 357px, TOC defaults closed after reload and expands on click. Temporary viewport override reset after testing.
- Live `pages.xml`: 408 URLs and 24 tracking-guide language URLs. Desktop index has no horizontal overflow.

Screenshot: [Published article index](screenshots/seo-release-2026-10-23.png).

These checks establish deployment and rendering, not ranking gains or completed purchases. GSC performance remained in processing at audit time, and Bing query data was unavailable behind sign-in. Keyword priority is qualitative; new-page indexing and click changes require subsequent real search/analytics data.
