import Link from "next/link";
import {
  articleWordCount,
  articles,
  type ArticleRecord,
} from "./article-data";
import { catalogBase } from "./site-data";
import { SiteFooter, SiteHeader } from "./site-shell";
import { absoluteUrl, localizedPath } from "./i18n";
import { articleText, getLocalizedArticle } from "./article-locales";
import type { Locale } from "./translations";

export function ArticlePage({
  article,
  locale = "en",
}: {
  article: ArticleRecord;
  locale?: Locale;
}) {
  const copy = getLocalizedArticle(article, locale);
  const wordCount = articleWordCount(copy);
  const readMinutes = Math.max(6, Math.round(wordCount / 220));
  const canonicalPath = localizedPath(locale, `/articles/${copy.slug}`);
  const canonical = absoluteUrl(canonicalPath);
  const localPath = (path: string) => localizedPath(locale, path);
  const relatedArticles = articles.filter(
    (candidate) => candidate.slug !== copy.slug,
  ).map((candidate) => getLocalizedArticle(candidate, locale));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.title,
    description: copy.description,
    image: `https://lolobuy-sheet.net${copy.image}`,
    datePublished: copy.publishedDate,
    dateModified: copy.modifiedDate,
    inLanguage: locale,
    wordCount,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "LoloBuy Sheet Editorial",
      url: "https://lolobuy-sheet.net/about",
    },
    editor: {
      "@type": "Organization",
      name: "LoloBuy Sheet Editorial",
      url: "https://lolobuy-sheet.net/about",
    },
    publishingPrinciples:
      "https://lolobuy-sheet.net/editorial-policy",
    publisher: {
      "@type": "Organization",
      name: "LoloBuy Sheet",
      url: "https://lolobuy-sheet.net/",
      logo: {
        "@type": "ImageObject",
        url: "https://lolobuy-sheet.net/lolobuy.png",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: articleText(locale, "Home"),
        item: absoluteUrl(localPath("/")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: articleText(locale, "Guides"),
        item: absoluteUrl(localPath("/articles")),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: copy.shortTitle,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader active="articles" locale={locale} />
      <main className="article-main">
        <article lang={locale} data-article-locale={locale}>
          <header className="article-hero">
            <div className="article-hero-inner">
              <p className="subpage-breadcrumb">
                <Link href={localPath("/")}>{articleText(locale, "Home")}</Link>{" "}
                <span>/</span>
                <Link href={localPath("/articles")}>{articleText(locale, "Guides")}</Link>{" "}
                <span>/</span>
                {copy.eyebrow}
              </p>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className="article-standfirst">{copy.standfirst}</p>
              <div className="article-byline">
                <div>
                  <p>
                    {articleText(locale, "Written by")}{" "}
                    <Link href="/about">LoloBuy Sheet Editorial</Link>
                  </p>
                  <p>
                    {articleText(locale, "Fact-checked against public LoloBuy information")}
                  </p>
                  <p>{`${articleText(locale, "Last reviewed")}: ${copy.checkedDate}`}</p>
                </div>
                <nav aria-label="Article editorial information">
                  <Link href="/editorial-policy">{articleText(locale, "Editorial policy")}</Link>
                  <Link href="/research-method">
                    {articleText(locale, "Sources & research method")}
                  </Link>
                  <Link href="/contact">{articleText(locale, "Corrections")}</Link>
                </nav>
              </div>
              <dl className="article-meta">
                <div>
                  <dt>{articleText(locale, "Checked")}</dt>
                  <dd>{copy.checkedDate}</dd>
                </div>
                <div>
                  <dt>{articleText(locale, "Length")}</dt>
                  <dd>{`${wordCount.toLocaleString(locale)} ${articleText(locale, "words")}`}</dd>
                </div>
                <div>
                  <dt>{articleText(locale, "Reading time")}</dt>
                  <dd>{`${readMinutes} ${articleText(locale, "minutes")}`}</dd>
                </div>
                <div>
                  <dt>{articleText(locale, "Main query")}</dt>
                  <dd>{copy.primaryKeyword}</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="article-layout">
            <aside className="article-sidebar" aria-label="Article contents">
              <div>
                <p className="footer-label">{articleText(locale, "IN THIS GUIDE")}</p>
                <ol>
                  {copy.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a href={`#section-${index + 1}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="article-sidebar-note">
                <p className="footer-label">{articleText(locale, "SEARCH INTENT")}</p>
                <p>{copy.intent}</p>
              </div>
            </aside>

            <div className="article-content">
              <figure className="article-figure">
                <img
                  src={copy.image}
                  alt={copy.imageAlt}
                  width="1200"
                  height="630"
                />
                <figcaption>{copy.imageCaption}</figcaption>
              </figure>

              <section className="article-summary" aria-labelledby="key-points">
                <p className="eyebrow">{articleText(locale, "Reader summary")}</p>
                <h2 id="key-points">{articleText(locale, "Four points to keep")}</h2>
                <ul>
                  {copy.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </section>

              <aside className="research-note">
                <p className="footer-label">{articleText(locale, "FACT-CHECK NOTE")}</p>
                <p>{copy.sourceNote}</p>
              </aside>

              {copy.sections.map((section, index) => (
                <section
                  className="article-section"
                  id={`section-${index + 1}`}
                  key={section.heading}
                >
                  <span className="article-section-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="article-checklist">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <aside className="calculation-note">
                      <strong>{articleText(locale, "Worked example")}</strong>
                      <p>{section.note}</p>
                    </aside>
                  )}
                </section>
              ))}

              <section className="related-guides" aria-labelledby="related-guides">
                <p className="eyebrow">{articleText(locale, "Related buying guides")}</p>
                <h2 id="related-guides">{articleText(locale, "Continue with the next decision")}</h2>
                <div>
                  <Link href={localPath("/categories")}>
                    <span>{articleText(locale, "Product discovery")}</span>
                    <strong>{articleText(locale, "Browse by product category")}</strong>
                    <small>{articleText(locale, "Open categories")} →</small>
                  </Link>
                  {relatedArticles.map((related) => (
                    <Link
                      href={localPath(`/articles/${related.slug}`)}
                      key={related.slug}
                    >
                      <span>{related.eyebrow}</span>
                      <strong>{related.shortTitle}</strong>
                      <small>{articleText(locale, "Read guide")} →</small>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="article-end">
                <p className="eyebrow">{articleText(locale, "Continue your research")}</p>
                <h2>{articleText(locale, "Open a matched product, then verify the live details")}</h2>
                <p>
                  {articleText(locale, "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.")}
                </p>
                <div>
                  <a
                    className="button button-primary"
                    href={`${catalogBase}/AllProducts/`}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                  >
                    {articleText(locale, "Browse main-site products")}{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                  <Link className="button button-secondary" href={localPath("/articles")}>
                    {articleText(locale, "Read another guide")} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
