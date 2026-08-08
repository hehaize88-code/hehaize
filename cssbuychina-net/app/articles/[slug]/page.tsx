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
  return { title: article.title, description: article.description, alternates: { canonical: `/articles/${slug}` } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description,
    datePublished: "2026-08-08", dateModified: "2026-08-08", author: { "@type": "Organization", name: "CSSBuy China Editorial" },
    mainEntityOfPage: `https://cssbuychina.net/articles/${slug}`,
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article-page">
        <header className="article-header"><div className="article-kicker"><span>UPDATED AUGUST 8, 2026</span><span>{article.label}</span></div><h1>{article.title}</h1><p>{article.description}</p></header>
        <div className="article-layout">
          <aside><span>ON THIS PAGE</span>{article.sections.map(([heading], index) => <a href={`#section-${index + 1}`} key={heading}>{heading}</a>)}</aside>
          <div className="article-body">
            <div className="article-note"><b>Research basis · checked August 8, 2026</b><p>This independent article was reviewed against CSSBuy's public homepage, item-page workflow, warehouse information, shipping estimator, and FAQ. Published service details can change, so the current order page, account deadline, and selected route remain controlling.</p></div>
            {article.sections.map(([heading, paragraphs], index) => <section id={`section-${index + 1}`} key={heading}><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <div className="article-end"><span>END / ARTICLE</span><h2>Continue with the live product index.</h2><a href="/products">Browse product finds ↗</a></div>
          </div>
        </div>
      </article>
    </InnerShell>
  );
}
