import type { Metadata } from "next";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { localizedPath, normalizeLocale } from "../i18n";
import { commonPageCopy, termsPageCopy } from "../page-copy";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description:
    "Terms for using Lolobuy Sheet, including independent-site status, changing destination listings, no product guarantee and responsible use.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = termsPageCopy[locale];
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
      <section className="policy-content">
        {copy.sections.map((section) => (
          <div key={section[0]}>
            <h2>{section[0]}</h2>
            <p>{section[1]}</p>
          </div>
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
