import Link from "next/link";
import PageHero from "@/components/PageHero";
import ArticleCover from "@/components/ArticleCover";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { articles } from "@/data/articles";
import { SITE_URL } from "@/data/site";

export const metadata = {
  title: "China Shopping Agent Articles & Hubbuy Guides",
  description: "Read independent, long-form articles about Hubbuy spreadsheets, China shopping agents, warehouse QC, parcel planning and international shipping decisions.",
  alternates: { canonical: "/articles/" },
  openGraph: {
    title: "China Shopping Agent Articles | Hubbuy Sheet",
    description: "Independent long-form reading about product research, warehouse QC and international parcel planning.",
    url: `${SITE_URL}/articles/`,
  },
};

export default function ArticlesPage() {
  const [featuredArticle, ...moreArticles] = articles;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "China Shopping Agent Articles",
    url: `${SITE_URL}/articles/`,
    description: metadata.description,
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `${SITE_URL}/articles/${article.slug}/`,
      datePublished: article.published,
      dateModified: article.factChecked,
      author: { "@type": "Organization", name: "Hubbuy Sheet Editorial", url: `${SITE_URL}/about/` },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PageHero
        eyebrow="Independent editorial"
        title="China shopping agent articles"
        intro="Long-form, fact-checked reading about product research, warehouse QC and parcel decisions. Guides explain the interface; articles examine the complete buying workflow."
        crumbs={["Articles"]}
      />
      <section className="section articles-index">
        <div className="wrap articles-index-grid">
          <div>
            <div className="article-index-heading">
              <span className="eyebrow">Start with the complete workflow</span>
              <p>{articles.length} fact-checked English articles</p>
            </div>
            <Link className="featured-article" href={`/articles/${featuredArticle.slug}`}>
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
                <Link className="article-library-card" href={`/articles/${article.slug}`} key={article.slug}>
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
