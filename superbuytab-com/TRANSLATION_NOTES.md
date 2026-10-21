# Article localization — 2026-10-19

## Coverage

The ten complete English source articles now each have 23 full translations under `src/content/articles/<locale>/`. All 24 locales render independent SSR HTML, localized article metadata, headings, tables, internal links, article cards, reading information and collection pages. There is no runtime translation service and no English-body fallback. The sitemap contains 360 localized URLs.

Titles and editorial interface text were written separately for each locale. Body translations were produced with local OPUS-MT models, followed by terminology normalization, numerical and structural checks, and targeted corrections. This is machine-assisted localization, not a claim of independent native-speaker review of every sentence. Further stylistic review remains possible without replacing full articles with summaries.

## Provenance

Translation tooling ran offline during content preparation, not in the website. No model files or Python dependencies are part of deployment. Helsinki-NLP OPUS-MT model cards identify Apache-2.0 licensing. CTranslate2 and SentencePiece were used locally. Public model cards and original archives were used; no credentials or translation API were required.

- https://huggingface.co/Helsinki-NLP
- https://github.com/Helsinki-NLP/OPUS-MT-train
- https://github.com/Helsinki-NLP/Tatoeba-Challenge
- https://opennmt.net/CTranslate2/guides/opus_mt.html
- https://github.com/google/sentencepiece

Models: opus-mt-en-de, en-ROMANCE (Spanish/Portuguese), en-fr, en-it, en-zlw (Polish), en-ro, en-sv, en-nl, en-da, en-fi, en-el, en-cs, en-hu, en-bg, en-sk, en-zls (Croatian/Slovenian), en-bat (Lithuanian/Latvian), en-et, en-CELTIC (Irish), en-mt. Locale-specific language tokens were used for multilingual models.

## Verification and future editing

- Preserve every source paragraph, section, table cell and reference; localize internal paths only. Superbuy official source URLs remain unchanged.
- Keep brands, item IDs, currencies and numerical examples intact. The sample volume is 24 000 cm³, with a hypothetical divisor of 6 000; it is not a shipping quotation.
- Source policy verification date remains 2026-10-19; translating an article does not create a newer policy-check date.
- `npm run check` verifies 240 article routes, matching structural counts, language schema, canonicals, hreflang, linked articles, 624 FAQ answers and live catalogue behavior.
- Preview hosts stay noindex. The purchased production domain is still unbound until the user approves the preview.
- Product names and images continue to come directly from CnBuyCha. No product database, snapshots, generated imagery, backend or extra storage was added.

## Mobile layout

Shared small-screen styles reduce header, hero, section, card, information-page and footer spacing. The homepage retains all products. Article cards use two columns; the article contents panel starts collapsed on phones and opens on desktop. Full article paragraphs remain available. Product details, all category links, pagination, FAQ and source links are preserved.

## 2026-10-21 multilingual editorial release

Four original English articles were added (sneakers, hoodies, USA shipping, UK shipping), with complete translations for every existing locale. Shipping-calculator, packing and fees guides gained matching new sections in all 24 languages. The new category and SEO copy also has 24 independent locale files. No English article-body fallback is used.

Draft translations used the same offline OPUS-MT / CTranslate2 workflow described above. Multilingual models require their target-language token, including `>>bul<<` for en-bg, `>>hrv<<` / `>>slv<<` for en-zls, `>>pol<<` for en-zlw, `>>lit<<` / `>>lav<<` for en-bat, `>>ga<<` for en-CELTIC and the appropriate Romance token. The en-zls vocabulary contains consecutive escaped bytes; these were normalized without changing vocabulary indices before conversion. Model weights are temporary authoring dependencies and are not deployed.

Search titles were edited separately in each language. Translation review included recurring delivery/package terminology, reference labels, source-block parity, internal link localization, and all numeric facts. The UK threshold was checked against the English source in every translation. Avoid claiming native-speaker review: these are machine-assisted translations with editorial checks.
