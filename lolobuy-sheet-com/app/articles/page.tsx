import type { Metadata } from "next";
import ArticleCard from "../components/article-card";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { localizedPath, normalizeLocale } from "../i18n";
import { getLocalizedArticles } from "../localized-data";
import { articlesIndexCopy, commonPageCopy } from "../page-copy";
import { localizedMetadata } from "../seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = articlesIndexCopy[locale];
  return localizedMetadata({
    locale,
    path: "/articles",
    title: copy.title,
    description: copy.intro,
  });
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = articlesIndexCopy[locale];
  const common = commonPageCopy[locale];
  const localizedArticles = getLocalizedArticles(locale);

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
      <section className="article-index-grid">
        {localizedArticles.map((article) => (
          <ArticleCard article={article} locale={locale} key={article.slug} />
        ))}
      </section>
      <section className="editorial-policy">
        <p className="eyebrow">{copy.policyEyebrow}</p>
        <h2>{copy.policyTitle}</h2>
        <p>{copy.policyText}</p>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
