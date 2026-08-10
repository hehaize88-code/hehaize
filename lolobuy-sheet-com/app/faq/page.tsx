import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { faqPageCopy, localizedPath, normalizeLocale } from "../i18n";
import { getLocalizedFaqs } from "../localized-data";
import { commonPageCopy } from "../page-copy";
import { localizedMetadata } from "../seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = faqPageCopy[locale];
  return localizedMetadata({
    locale,
    path: "/faq",
    title:
      locale === "en"
        ? "LoloBuy FAQ 2026 | QC, Storage, Shipping & Fees"
        : copy.title,
    description: copy.intro,
  });
}

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = faqPageCopy[locale];
  const common = commonPageCopy[locale];
  const localizedFaqs = getLocalizedFaqs(locale);

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
      <section className="full-faq">
        {localizedFaqs.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.question}
            </summary>
            <div className="faq-answer">
              <span className="faq-basis">{item.basis}</span>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </section>
      <section className="source-note-panel">
        <p className="eyebrow">{common.researchBasis.toUpperCase()} · 2026-07-26</p>
        <h2>{copy.panelTitle}</h2>
        <p>{copy.panelText}</p>
      </section>
      <SiteFooter locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: locale,
          mainEntity: localizedFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
    </main>
  );
}
