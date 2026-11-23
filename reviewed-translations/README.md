# Editorial translation corrections and coverage

Each JSON file under editions/SITE/LOCALE records a reviewed language edition. It identifies the exact English source set, raw dictionary, individual English keys and previous translations using SHA-256. The correction contains the replacement text and never changes its English key. A digest of the effective dictionary identifies the result after all changes. The coverage records distinguish automated examination, reviewed findings, and sampled passages. They do not claim line-by-line bilingual proofreading.

Run apply.py in the candidate build after verifying the raw translation results and before installing the dictionaries. Supply a non-production working copy; raw collected results remain the record of what the translation engine produced. The command validates all input data before writing any changes and can safely be retried on already corrected data.

    python reviewed-translations/apply.py --input-packs editorial-rc/input --dictionaries verified-dictionaries --summary reports/review-overlay.json --require-complete

The final release requires a matching reviewed record for each of the 289 expected editions and no unresolved material findings. For progress reviews on incomplete copies, omit --require-complete. A coverage entry is specific to a source set and a dictionary; changed input, changed output or a stale correction requires a new comparison. In a release request pin the exact commit of this review branch.

Localized numerals, grammatical inflections, spelling conventions, and legitimate unit conversions can be correct. Record the source-specific disposition after reading the English and localized texts in context. A future retranslation cannot reuse a disposition unless its dictionary hash is identical. Numeral omissions or inventions that change an example and platform substitutions that misidentify a product require correction before release.

The raw audit and the reviewed hash overlay can be checked independently. Run the dictionary auditor on the original translation results, then match its findings to the review records. The command also checks editions with an empty queue. If a separate run audited Maltese, pass the two nonoverlapping raw audit directories together.

    python reviewed-translations/validate_raw_audit.py --raw-audit raw-translation-qa

The portfolio ledger in coverage/ledger.json is generated from exactly the same snapshot as the edition records in each commit. It lists required and pending locales, checked English key counts, replacements, raw finding counts and effective dictionary hashes.
