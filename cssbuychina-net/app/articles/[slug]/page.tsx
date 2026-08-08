import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerShell } from "../../components/InnerShell";
import { ArticleSlug, articles } from "../article-data";

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];
  if (!article) return { title: "CSSBuy Article" };
  const metadata: Metadata = { title: article.title, description: article.description, alternates: { canonical: `/articles/${slug}` } };
  if ("published" in article) {
    metadata.openGraph = { type: "article", url: `/articles/${slug}`, title: article.title, description: article.description, publishedTime: article.published };
    metadata.twitter = { card: "summary", title: article.title, description: article.description };
  }
  return metadata;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];
  if (!article) notFound();
  const published = "published" in article ? article.published : "2026-08-08";
  const checked = "checked" in article ? article.checked : "August 8, 2026";
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description,
    datePublished: published, dateModified: published, author: { "@type": "Organization", name: "CSSBuy China Editorial" },
    mainEntityOfPage: `https://cssbuychina.net/articles/${slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cssbuychina.net/" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://cssbuychina.net/articles" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://cssbuychina.net/articles/${slug}` },
    ],
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify("published" in article ? [jsonLd, breadcrumbJsonLd] : jsonLd) }} />
      <article className="article-page">
        <header className="article-header"><div className="article-kicker"><span>UPDATED {checked.toUpperCase()}</span><span>{article.label}</span></div><h1>{article.title}</h1><p>{article.description}</p></header>
        <div className="article-layout">
          <aside><span>ON THIS PAGE</span>{article.sections.map(([heading], index) => <a href={`#section-${index + 1}`} key={heading}>{heading}</a>)}</aside>
          <div className="article-body">
            <div className="article-note"><b>Research basis · checked {checked}</b><p>{"published" in article ? "This independent article was reviewed against CSSBuy's public homepage, Buy For Me workflow, item-page process, warehouse information, shipping estimator, and FAQ. Published service details can change, so the current order page, account deadline, and selected route remain controlling." : "This independent article was reviewed against CSSBuy's public homepage, item-page workflow, warehouse information, shipping estimator, and FAQ. Published service details can change, so the current order page, account deadline, and selected route remain controlling."}</p></div>
            {article.sections.map(([heading, paragraphs], index) => <section id={`section-${index + 1}`} key={heading}><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            {"related" in article && <div className="article-end"><span>RELATED READING</span><h2>Continue the same decision.</h2>{article.related.map(([label, href]) => <a href={href} key={href}>{label} ↗</a>)}</div>}
            <div className="article-end"><span>END / ARTICLE</span><h2>Continue with the live product index.</h2><a href="/products">Browse product finds ↗</a></div>
          </div>
        </div>
      </article>
    </InnerShell>
  );
}
