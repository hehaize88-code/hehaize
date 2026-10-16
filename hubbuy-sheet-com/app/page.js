import SearchBox from "@/components/SearchBox";
import LiveProducts from "@/components/LiveProducts";
import { ArrowIcon } from "@/components/Icons";
import { REGISTER_URL, SITE_URL } from "@/data/site";
import { articles, getArticle } from "@/data/articles";
import { getLocalizedPath } from "@/data/i18n";
import { homeCopy } from "@/commerce/home-copy.mjs";
import snapshot from "@/commerce/home-products.json";

export const metadata = {
  alternates: { canonical: "/", languages: { en: "/", "pt-BR": "/pt-br/", de: "/de/", "x-default": "/" } },
};

export default function HomePage({ locale = "en" } = {}) {
  const t = homeCopy[locale] || homeCopy.en;
  const path = value => getLocalizedPath(value, locale);
  const homeArticles = articles.filter(article => !article.locales || article.locales.includes(locale)).slice(0, 4).map(article => getArticle(article.slug, locale));
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: t.title, url: SITE_URL + path('/'), description: t.intro, inLanguage: locale === 'pt-br' ? 'pt-BR' : locale };
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return <div className="commerce-home" data-locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replaceAll('<', '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replaceAll('<', '\\u003c') }} />
    <section className="commerce-hero">
      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="commerce-subtitle">{t.subtitle}</p>
        <p className="commerce-intro">{t.intro}</p>
        <div className="commerce-search"><SearchBox locale={locale} /><a className="image-search-link" href={path('/catalog/image-search/')}>{t.image} <ArrowIcon size={16} /></a></div>
        <nav className="commerce-categories" aria-label={t.browse}>{t.categories.map(([label, category]) => <a key={category} href={path(`/catalog/${category}/`)}>{label} <span>↗</span></a>)}</nav>
        <div className="commerce-hero-links"><a href={path('/catalog/')}>{t.browse} <ArrowIcon size={16} /></a><a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">{t.register} ↗</a></div>
      </div>
    </section>
    <section className="section commerce-finds"><div className="wrap">
      <div className="section-heading inline-heading"><div><h2>{t.finds}</h2><p>{t.source}</p></div><a href={path('/catalog/')}>{t.browse} <ArrowIcon size={16} /></a></div>
      <LiveProducts initialProducts={snapshot.products} locale={locale} />
    </div></section>
    <section className="section commerce-how"><div className="wrap">
      <div className="section-heading"><h2>{t.howTitle}</h2><p>{t.howIntro}</p></div>
      <div className="commerce-guide-grid">{t.guides.map(([title, text, href], i) => <a className="commerce-guide" key={href} href={path(href)}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{text}</p><strong>{t.read} <ArrowIcon size={16} /></strong></a>)}</div>
    </div></section>
    <section className="section home-articles-section"><div className="wrap">
      <div className="section-heading inline-heading"><h2>{t.articles}</h2><a href={path('/articles/')}>{t.allArticles} <ArrowIcon size={16} /></a></div>
      <div className="home-article-cards">{homeArticles.map(article => <a key={article.slug} href={path(`/articles/${article.slug}/`)} className={`home-article-card home-article-${article.cover.tone}`}><div className="home-article-meta"><span>{article.category}</span><b>{article.readTime}</b></div><h3>{article.title}</h3><p>{article.excerpt}</p><strong>{t.read} <ArrowIcon size={16} /></strong></a>)}</div>
    </div></section>
    <section className="section commerce-faq"><div className="wrap"><h2>{t.faq}</h2><div className="faq-list">{t.faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
  </div>;
}
