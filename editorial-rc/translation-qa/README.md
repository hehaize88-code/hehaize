# Editorial dictionary review

The auditor reads public English strings and matching localized dictionaries. It makes no network requests, modifies no dictionaries and never publishes a site. Results are review prompts. Full text and issue context are included in the review artifact.

## Running on Linux

Use Python 3.12, ICU runtime libraries, Babel 2.17.0, lingua-language-detector 2.1.1 and pycld2 0.42. Ubuntu runners include ICU. Install the pinned Python packages in the job's environment before running. The optional /tmp/qa-language-tools path is for scratch runs.

    python -m pip install Babel==2.17.0 lingua-language-detector==2.1.1 pycld2==0.42
    python editorial-rc/translation-qa/check_auditor.py
    python editorial-rc/translation-qa/audit.py --input-packs editorial-rc/input --dictionaries verified-dictionaries --out reports/translation-qa

The installer may provide SITE/LANG.json, LANG/SITE.json or SITE.LANG.json. The audit compares every input/output key. Project coverage is 289 translated editions across 13 sites. An incremental run reports the outstanding pairs and reuses only results whose source set, dictionary and auditor hashes still match. Check summary.json for audited/awaiting; a successful partial inventory does not prove every release dictionary is present. The separate --trial option is for local model experiments and is excluded from release counts.

## Interpreting findings

Every English source passage of at least 140 characters is tested for target-language consistency when the translation has at least 36 characters. Lingua covers 28 target languages; CLD2 checks Maltese and assists with uncertain identifications in closely related languages. Wrong-language results require strong model evidence (Lingua confidence of at least 0.80 or a reliable Maltese CLD2 result of at least 80%). Inconclusive findings stay separate. Short labels and headings can legitimately contain platform names. They receive literal and numeral checks but do not undergo standalone language classification.

All source keys receive checks for empty results, raw URLs, known platform spellings, mixed alphanumeric example codes and model-control characters. Long passages receive additional checks for omitted or unusually expanded text, duplicate translations of distinct English passages, and new repeated sentences. Length ratios below 0.14 for Chinese, Japanese, Korean and Thai or below 0.42 for other languages, and above 2.35 in any language, are review prompts. Translation contraction, legitimate transliteration and differing punctuation can explain them.

The numeric comparison normalizes Unicode digits, locale decimal/group punctuation, ICU spelled-out integers and selected inflected number forms. The unit and currency check uses CLDR names, symbols and common abbreviations. It checks whether values, units and currencies appear in the target passage. A conversion, singular noun, number represented by an article or national currency convention may be valid. This check cannot prove numbers are assigned to the right products, that two amounts have not been swapped, or that an arithmetic example is correct. Inspect the full passages for unit conversions, ambiguity and contextual accuracy. Currency codes and identifiers are especially important.

Review all entries in review.jsonl. samples.jsonl contains up to two deterministic long-passage pairs per edition for reproducible spot checks. Sampling does not replace bilingual proofreading. Avoid modifying the source or suppressing a warning without inspecting the relevant pair. The historical Maltese sample illustrates a valid warning for a singular unit with no written numeral. The substantive currency issue found in the five earlier Maltese paragraphs was fixed across 24 occurrences by standardizing the currency name to yuan, following the Maltese text of EUR-Lex CELEX 02015R2197. The reviewed dictionary SHA-256 is afab224a1805060bc2306048de4ac79bd4673b708bd7775dec2890a6d1e5bc44. maltese-review.json records the disposition and source/target hashes of the one remaining advisory.
