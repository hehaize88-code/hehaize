import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "../../components/article-card";
import JsonLd from "../../components/json-ld";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { localizedPath, normalizeLocale } from "../../i18n";
import { getLocalizedArticles } from "../../localized-data";
import { articleUiCopy, commonPageCopy } from "../../page-copy";
import {
  absoluteLocalizedUrl,
  localizedMetadata,
} from "../../seo";
import { articles } from "../../site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const article = getLocalizedArticles(locale).find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  const searchTitle =
    article.slug === "lolobuy-spreadsheet-guide"
      ? "Lolobuy Spreadsheet Guide 2026: Find & Verify Products"
      : article.slug === "how-to-read-qc-photos"
        ? "How to Read Lolobuy QC Photos: Warehouse Checklist"
        : article.slug === "plan-china-shopping-haul"
          ? "Lolobuy Shipping Guide: Storage, Consolidation & Weight"
          : "Lolobuy Review 2026: Early User Evidence Examined";

  const metadata = localizedMetadata({
    locale,
    path: `/articles/${article.slug}`,
    title: locale === "en" ? searchTitle : article.title,
    description: article.description,
  });

  return {
    ...metadata,
    title: { absolute: locale === "en" ? searchTitle : article.title },
    openGraph: {
      ...metadata.openGraph,
      title: article.title,
      description: article.description,
      url: localizedPath(`/articles/${article.slug}`, locale),
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const localizedArticles = getLocalizedArticles(locale);
  const article = localizedArticles.find((item) => item.slug === slug);
  const common = commonPageCopy[locale];
  const ui = articleUiCopy[locale];

  if (!article) {
    notFound();
  }

  const related = localizedArticles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <main>
      <SiteHeader locale={locale} />
      <article className="longform">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span>
            <Link href={localizedPath("/", locale)}>{common.home}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>
            <Link href={localizedPath("/articles", locale)}>{common.articles}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>{article.shortTitle}</span>
        </nav>
        <header className="article-header">
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div>
            <time dateTime={article.updated}>{common.updated} {article.updated}</time>
            <span>{article.readingTime}</span>
            <span>{common.independentGuide}</span>
          </div>
          <p className="article-fact-check">{article.factCheckLine}</p>
        </header>

        <div className="article-body">
          <aside>
            <p>{ui.inGuide}</p>
            <ol>
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
            <span>
              {ui.changingTerms}
            </span>
          </aside>
          <div className="article-prose">
            <div className="article-intro">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <figure className="article-visual">
              <figcaption>
                <span>{article.visual.eyebrow}</span>
                <h2>{article.visual.title}</h2>
                <p>{article.visual.caption}</p>
              </figcaption>
              <div>
                {article.visual.items.map((item, index) => (
                  <article key={item.label}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </figure>
            {article.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="section-number">{String(index + 1).padStart(2, "0")}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <section className="article-sources" aria-labelledby="research-sources">
              <p className="section-number">{common.sourceLabel.toUpperCase()}</p>
              <h2 id="research-sources">{common.researchBasis}</h2>
              <p>{ui.sourceIntro}</p>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.label}>
                    <strong>{source.label}</strong>
                    <span>{source.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <section className="related-articles">
        <div className="section-heading-row">
          <h2>{common.continueReading}</h2>
          <Link
            className="text-link"
            href={localizedPath("/articles", locale)}
          >
            {common.allArticles} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="article-card-grid article-card-grid-two">
          {related.map((item) => (
            <ArticleCard article={item} locale={locale} key={item.slug} />
          ))}
        </div>
      </section>
      <SiteFooter locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          inLanguage: locale,
          description: article.description,
          datePublished: article.published,
          dateModified: article.updated,
          mainEntityOfPage: absoluteLocalizedUrl(
            `/articles/${article.slug}`,
            locale,
          ),
          author: { "@type": "Organization", name: "Lolobuy Sheet" },
          publisher: { "@type": "Organization", name: "Lolobuy Sheet" },
        }}
      />
    </main>
  );
}
