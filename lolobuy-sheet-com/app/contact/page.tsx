import type { Metadata } from "next";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { localizedPath, normalizeLocale } from "../i18n";
import { commonPageCopy, contactPageCopy } from "../page-copy";
import { localizedMetadata } from "../seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = contactPageCopy[locale];
  return localizedMetadata({
    locale,
    path: "/contact",
    title: copy.title,
    description: copy.intro,
  });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = contactPageCopy[locale];
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
      <section className="contact-grid">
        <article>
          <p className="eyebrow">{copy.cards[0][0]}</p>
          <h2>{copy.cards[0][1]}</h2>
          <p>{copy.cards[0][2]}</p>
          <p className="contact-status">
            {copy.pendingContact}{" "}
            <a
              className="text-link"
              href="mailto:lianglook520@gmail.com?subject=Lolobuy%20Sheet%20correction"
            >
              lianglook520@gmail.com
            </a>
          </p>
        </article>
        <article>
          <p className="eyebrow">{copy.cards[1][0]}</p>
          <h2>{copy.cards[1][1]}</h2>
          <p>{copy.cards[1][2]}</p>
          <a
            className="text-link"
            href="https://www.cnbuycha.com/"
            target="_blank"
            rel="sponsored noopener"
          >
            {copy.openDirectory}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
        <article>
          <p className="eyebrow">{copy.cards[2][0]}</p>
          <h2>{copy.cards[2][1]}</h2>
          <p>{copy.cards[2][2]}</p>
        </article>
        <article>
          <p className="eyebrow">{copy.cards[3][0]}</p>
          <h2>{copy.cards[3][1]}</h2>
          <p>{copy.cards[3][2]}</p>
        </article>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
