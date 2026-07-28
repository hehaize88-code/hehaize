import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/json-ld";
import PageHero from "../../components/page-hero";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { localizedPath, normalizeLocale } from "../../i18n";
import { commonPageCopy, shippingPageCopy } from "../../page-copy";
import { localizedMetadata } from "../../seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = shippingPageCopy[locale];
  return localizedMetadata({
    locale,
    path: "/guides/shipping",
    title: copy.title,
    description: copy.intro,
  });
}

export default async function ShippingGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = shippingPageCopy[locale];
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

      <section className="shipping-fact">
        <div>
          <span>90</span>
          <b>{copy.days}</b>
        </div>
        <p>{copy.storage}</p>
      </section>

      <section className="shipping-grid">
        {copy.stages.map((stage) => (
          <article key={stage[0]}>
            <p className="eyebrow">{stage[0]}</p>
            <h2>{stage[1]}</h2>
            <p>{stage[2]}</p>
          </article>
        ))}
      </section>

      <section className="weight-explainer">
        <div>
          <p className="eyebrow">{copy.weightEyebrow}</p>
          <h2>{copy.weightTitle}</h2>
          <p>{copy.weightOne}</p>
          <p>{copy.weightTwo}</p>
        </div>
        <div className="route-checklist">
          <p>{copy.questionsTitle}</p>
          <ol>
            {copy.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="source-note-panel">
        <p className="eyebrow">{copy.sourceEyebrow}</p>
        <h2>{copy.sourceTitle}</h2>
        <p>{copy.sourceText}</p>
        <Link
          className="text-link"
          href={localizedPath("/articles/plan-china-shopping-haul", locale)}
        >
          {copy.sourceLink}{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <SiteFooter locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          inLanguage: locale,
          headline: copy.title,
          description: copy.intro,
          datePublished: "2026-07-26",
          dateModified: "2026-07-26",
          author: { "@type": "Organization", name: "Lolobuy Sheet" },
        }}
      />
    </main>
  );
}
