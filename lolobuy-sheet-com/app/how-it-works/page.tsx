import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import ProductSearch from "../components/product-search";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import {
  localizedPath,
  normalizeLocale,
  workflowPageCopy,
} from "../i18n";
import { commonPageCopy } from "../page-copy";

export const metadata: Metadata = {
  title: "How the Lolobuy Spreadsheet Workflow Works",
  description:
    "See how to move from a Lolobuy spreadsheet find to a live listing, warehouse QC review, consolidation and an informed shipping decision.",
  alternates: { canonical: "/how-it-works" },
};

const stageLinks = [
  "/categories",
  "/articles/lolobuy-spreadsheet-guide",
  "/guides/qc",
  "/guides/shipping",
];

export default async function HowItWorksPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = workflowPageCopy[locale];
  const common = commonPageCopy[locale];

  return (
    <main>
      <SiteHeader locale={locale} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        crumbs={[
          { label: common.home, href: localizedPath("/", locale) },
          { label: copy.crumb },
        ]}
      />

      <section className="workflow-list">
        {copy.stages.map((stage, index) => (
          <article key={stage[0]}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{stage[0]}</h2>
              <p>{stage[1]}</p>
            </div>
            <Link
              className="text-link"
              href={localizedPath(stageLinks[index], locale)}
            >
              {stage[2]} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>

      <section className="workflow-evidence">
        <div className="workflow-evidence-heading">
          <p className="eyebrow">{copy.evidenceEyebrow}</p>
          <h2>{copy.evidenceTitle}</h2>
          <p>{copy.evidenceIntro}</p>
          <Link
            className="text-link"
            href={localizedPath("/articles/lolobuy-spreadsheet-guide", locale)}
          >
            {copy.evidenceLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="editorial-note-grid">
          {copy.evidenceFacts.map((fact, index) => (
            <article key={fact[0]}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{fact[0]}</h2>
              <p>{fact[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="boundary-table" aria-labelledby="boundary-title">
        <div>
          <p className="eyebrow">{copy.boundaryEyebrow}</p>
          <h2 id="boundary-title">{copy.boundaryTitle}</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{copy.question}</th>
                <th>{copy.source}</th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="closing-search">
        <div>
          <p className="eyebrow">{copy.closingEyebrow}</p>
          <h2>{copy.closingTitle}</h2>
        </div>
        <ProductSearch compact locale={locale} />
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
