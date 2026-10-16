import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";
import { articles } from "./article-data";

export const metadata: Metadata = {
  title: { absolute: "CSSBuy Guides: Shipping, QC, Returns & Product Links" },
  description: "Find CSSBuy shipping guides for Brazil, the USA and Germany, plus QC return steps, original product links, restrictions and payment advice.",
  alternates: { canonical: "/articles", languages: { en: "/articles", "pt-BR": "/pt-br/articles", "de-DE": "/de/articles", es: "/es/articles", "x-default": "/articles" } },
};

export default function ArticlesPage() {
  return (
    <InnerShell>
      <section className="inner-hero articles-hero">
        <p className="eyebrow"><span /> Buyer research library</p>
        <h1>CSSBuy shipping, QC and buying guides.</h1>
        <p>Check a product link, review warehouse QC, resolve a return and plan your international parcel with practical guides and worked examples.</p>
      </section>
      <section className="guides-index articles-index">
        <div className="guides-index-intro"><span>ARTICLE DESK / UPDATED OCT 2026</span><h2>Start with the current warehouse or parcel decision.</h2><p>Start with the question you need to resolve: a missing source link, a QC mismatch, a return deadline or the cost of shipping a packed parcel.</p></div>
        <div className="editorial-grid">
          {Object.entries(articles).map(([slug, article], index) => (
            <a className={`editorial-card editorial-${["blue", "acid", "orange"][index % 3]}`} href={`/articles/${slug}`} key={slug} data-track-event="article_open" data-click-area="article-index">
              <div className="editorial-number">{String(index + 1).padStart(2, "0")}</div><span>{article.label}</span><h2>{article.title}</h2><p>{article.description}</p><b>Read full article ↗</b>
            </a>
          ))}
        </div>
      </section>
    </InnerShell>
  );
}
