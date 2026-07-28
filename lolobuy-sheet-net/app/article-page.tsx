import Link from "next/link";
import { articleWordCount, type ArticleRecord } from "./article-data";
import { catalogBase } from "./site-data";
import { SiteFooter, SiteHeader } from "./site-shell";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[“”"':?,.()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticlePage({ article }: { article: ArticleRecord }) {
  const wordCount = articleWordCount(article);
  const readMinutes = Math.max(6, Math.round(wordCount / 220));
  const canonical = `https://lolobuy-sheet.net/articles/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://lolobuy-sheet.net${article.image}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    inLanguage: "en",
    wordCount,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "LoloBuy Sheet Editorial",
      url: "https://lolobuy-sheet.net/",
    },
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
        name: "Home",
        item: "https://lolobuy-sheet.net/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://lolobuy-sheet.net/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.shortTitle,
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
      <SiteHeader active="articles" />
      <main className="article-main">
        <article data-i18n-ignore>
          <header className="article-hero">
            <div className="article-hero-inner">
              <p className="subpage-breadcrumb">
                <Link href="/">Home</Link> <span>/</span>
                <Link href="/articles">Guides</Link> <span>/</span>
                {article.eyebrow}
              </p>
              <p className="eyebrow">{article.eyebrow}</p>
              <h1>{article.title}</h1>
              <p className="article-standfirst">{article.standfirst}</p>
              <dl className="article-meta">
                <div>
                  <dt>Checked</dt>
                  <dd>{article.checkedDate}</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>{wordCount.toLocaleString("en-US")} words</dd>
                </div>
                <div>
                  <dt>Reading time</dt>
                  <dd>{readMinutes} minutes</dd>
                </div>
                <div>
                  <dt>Main query</dt>
                  <dd>{article.primaryKeyword}</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="article-layout">
            <aside className="article-sidebar" aria-label="Article contents">
              <div>
                <p className="footer-label">IN THIS GUIDE</p>
                <ol>
                  {article.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a href={`#${slugify(section.heading)}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="article-sidebar-note">
                <p className="footer-label">SEARCH INTENT</p>
                <p>{article.intent}</p>
              </div>
            </aside>

            <div className="article-content">
              <figure className="article-figure">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  width="1100"
                  height="760"
                />
                <figcaption>{article.imageCaption}</figcaption>
              </figure>

              <section className="article-summary" aria-labelledby="key-points">
                <p className="eyebrow">Reader summary</p>
                <h2 id="key-points">Four points to keep</h2>
                <ul>
                  {article.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </section>

              <aside className="research-note">
                <p className="footer-label">FACT-CHECK NOTE</p>
                <p>{article.sourceNote}</p>
              </aside>

              {article.sections.map((section, index) => (
                <section
                  className="article-section"
                  id={slugify(section.heading)}
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
                      <strong>Worked example</strong>
                      <p>{section.note}</p>
                    </aside>
                  )}
                </section>
              ))}

              <section className="article-end">
                <p className="eyebrow">Continue your research</p>
                <h2>Open a matched product, then verify the live details</h2>
                <p>
                  Product availability, options, prices and seller notes can
                  change. Use the catalog to find an item, then make the
                  purchase decision from the current page and your saved order
                  record.
                </p>
                <div>
                  <a
                    className="button button-primary"
                    href={`${catalogBase}/AllProducts/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse main-site products{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                  <Link className="button button-secondary" href="/articles">
                    Read another guide <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
