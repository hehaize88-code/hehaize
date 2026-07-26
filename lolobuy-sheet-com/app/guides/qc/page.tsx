import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/json-ld";
import PageHero from "../../components/page-hero";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { localizedPath, normalizeLocale } from "../../i18n";
import { commonPageCopy, qcPageCopy } from "../../page-copy";

export const metadata: Metadata = {
  title: "Lolobuy QC Guide: How to Check Warehouse Photos",
  description:
    "A practical Lolobuy QC guide for reviewing warehouse photos, measurements, visible damage, symmetry and category-specific details before shipping.",
  alternates: { canonical: "/guides/qc" },
};

export default async function QcGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = qcPageCopy[locale];
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
          { label: common.guides, href: localizedPath("/articles", locale) },
          { label: copy.crumb },
        ]}
      />

      <section className="guide-step-grid">
        {copy.checks.map((check, index) => (
          <article key={check[0]}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{check[0]}</h2>
            <p>{check[1]}</p>
          </article>
        ))}
      </section>

      <section className="source-note-panel">
        <p className="eyebrow">{copy.sourceEyebrow}</p>
        <h2>{copy.sourceTitle}</h2>
        <p>{copy.sourceText}</p>
        <Link
          className="text-link"
          href={localizedPath("/articles/how-to-read-qc-photos", locale)}
        >
          {copy.sourceLink}{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="guide-layout">
        <aside className="guide-aside">
          <p className="eyebrow">{copy.fastEyebrow}</p>
          <h2>{copy.fastTitle}</h2>
          <ul>
            {copy.fastItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link
            className="button button-primary"
            href={localizedPath("/articles/how-to-read-qc-photos", locale)}
          >
            {copy.fullArticle}
          </Link>
        </aside>
        <div className="guide-prose">
          {copy.prose.map((item) => (
            <article key={item[0]}>
              <p className="eyebrow">{item[0]}</p>
              <h2>{item[1]}</h2>
              {item.slice(2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="inline-cta">
        <div>
          <p className="eyebrow">{copy.nextEyebrow}</p>
          <h2>{copy.nextTitle}</h2>
        </div>
        <Link
          className="button button-secondary"
          href={localizedPath("/guides/shipping", locale)}
        >
          {copy.nextLink}
        </Link>
      </section>
      <SiteFooter locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: copy.title,
          description: copy.intro,
          step: copy.checks.map((check) => ({
            "@type": "HowToStep",
            name: check[0],
            text: check[1],
          })),
        }}
      />
    </main>
  );
}
