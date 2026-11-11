import { articleIndexCopy } from "@/data/november-ui";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ArticleCover from "@/components/ArticleCover";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { articles, getArticle } from "@/data/articles";
import { SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";
import { getLocalizedPath } from "@/data/i18n";

export const metadata = createPageMetadata({
  title: articleIndexCopy.en.title,
  description: articleIndexCopy.en.intro,
  path: "/articles/",
  imageAlt: "China shopping agent articles from Hubbuy Sheet",
});

export default function ArticlesPage({ locale = "en" }) {
  const copy = articleIndexCopy[locale];
  const visibleArticles = articles.map(article => getArticle(article.slug, locale));
  const [featuredArticle, ...moreArticles] = visibleArticles;
  const localPath = (path) => getLocalizedPath(path, locale);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.title,
    url: `${SITE_URL}${localPath("/articles/")}`,
    description: copy.intro,
    hasPart: visibleArticles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `${SITE_URL}${localPath(`/articles/${article.slug}/`)}`,
      datePublished: article.published,
      dateModified: article.updated || article.factChecked,
      author: { "@type": "Organization", name: "Hubbuy Sheet Editorial", url: `${SITE_URL}/about/` },
      image: `${SITE_URL}${article.socialImage}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PageHero
        eyebrow="Independent editorial"
        title={copy.title}
        intro={copy.intro}
        crumbs={["Articles"]}
      />
      <section className="section articles-index">
        <div className="wrap articles-index-grid">
          <div>
            <nav className="article-topic-links" aria-label={copy.title}>{copy.topics.map(([label, href]) => <Link key={href} href={localPath(href)}>{label}</Link>)}</nav>
            <div className="article-index-heading">
              <span className="eyebrow">Start with the complete workflow</span>
              <p><strong>{visibleArticles.length}</strong> <span>articles</span></p>
            </div>
            <Link className="featured-article" href={localPath(`/articles/${featuredArticle.slug}/`)}>
              <ArticleCover compact cover={featuredArticle.cover} />
              <div className="featured-article-copy">
                <div className="article-card-meta"><span>{featuredArticle.category}</span><span>{featuredArticle.readTime}</span></div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <b>Read full article <ArrowIcon /></b>
              </div>
            </Link>

            <div className="article-library-heading">
              <span className="eyebrow">More Hubbuy research</span>
              <p>QC photos · Shipping cost · Warehouse planning</p>
            </div>
            <div className="article-library-grid">
              {moreArticles.map((article) => (
                <Link className="article-library-card" href={localPath(`/articles/${article.slug}/`)} key={article.slug}>
                  <ArticleCover compact cover={article.cover} />
                  <div>
                    <div className="article-card-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                    <b>Read article <ArrowIcon /></b>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <aside className="editorial-standard">
            <span className="eyebrow eyebrow-light">Editorial standard</span>
            <h2>Evidence before promotion.</h2>
            <p>Every article separates verifiable platform information from general shopping advice. Fees, routes and delivery estimates are not presented as permanent facts.</p>
            <ul>
              <li><CheckIcon /> Clear source references</li>
              <li><CheckIcon /> No invented service promises</li>
              <li><CheckIcon /> Independent status disclosed</li>
              <li><CheckIcon /> Updated dates shown</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
