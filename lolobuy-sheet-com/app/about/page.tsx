import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { localizedPath, normalizeLocale } from "../i18n";
import { aboutPageCopy, commonPageCopy } from "../page-copy";

export const metadata: Metadata = {
  title: "About This Independent Lolobuy Spreadsheet",
  description:
    "Learn what Lolobuy Sheet does, how its editorial product directory works, what sources control current facts and where its responsibilities end.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = aboutPageCopy[locale];
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
      <section className="about-grid">
        {copy.cards.map((card, index) => (
          <article key={card[0]}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{card[0]}</h2>
            <p>{card[1]}</p>
          </article>
        ))}
      </section>
      <section className="editorial-principles">
        <div>
          <p className="eyebrow">{copy.principlesEyebrow}</p>
          <h2>{copy.principlesTitle}</h2>
        </div>
        <ul>
          {copy.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>
      <section className="inline-cta">
        <div>
          <p className="eyebrow">{copy.ctaEyebrow}</p>
          <h2>{copy.ctaTitle}</h2>
        </div>
        <Link
          className="button button-primary"
          href={localizedPath("/how-it-works", locale)}
        >
          {copy.cta}
        </Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
