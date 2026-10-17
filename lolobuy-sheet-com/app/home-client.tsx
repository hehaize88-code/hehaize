"use client";

import GuideShortcuts from "./components/guide-shortcuts";

import LiveProducts from "./components/live-products";
import { commerceCopy } from "./commerce-copy";
import Image from "next/image";
import Link from "next/link";
import ArticleCard, { type ArticleSummary } from "./components/article-card";
import ProductSearch from "./components/product-search";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { homeCopy, localizedPath, type Locale } from "./i18n";

const categoryEdits = [
  {
    label: "Sneakers",
    href: "https://www.cnbuycha.com/shoes/",
    image: "/products/sneakers.webp",
  },
  {
    label: "Outerwear",
    href: "https://www.cnbuycha.com/jackets/",
    image: "/products/jacket.webp",
  },
  {
    label: "Bags & Accessories",
    href: "https://www.cnbuycha.com/accessories/",
    image: "/products/bag.webp",
  },
  {
    label: "Jersey",
    href: "https://www.cnbuycha.com/Jersey/",
    image: "/products/jersey.webp",
  },
];

export default function HomeClient({ locale, latestArticles, localizedFaqs }: { locale: Locale; latestArticles: ArticleSummary[]; localizedFaqs: { question: string; basis: string; answer: string }[] }) {
  const copy = {...homeCopy[locale],...commerceCopy[locale]};

  return (
    <main className="home-page">
      <SiteHeader locale={locale} />

      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.title}
            <span>{copy.titleAccent}</span>
          </h1>
          <p className="hero-intro">{copy.intro}</p>

          <div className="hero-actions">
            <Link
              className="button button-primary"
              href={localizedPath("/catalog/", locale)}
            >
              {copy.explore}
            </Link>
            <a
              className="button button-secondary"
              href={localizedPath("/how-it-works", locale)}
            >
              {copy.workflow}
            </a>
          </div>

          <ProductSearch locale={locale} />
          <a className="image-search-shortcut" href={localizedPath("/catalog/image-search/",locale)}>{commerceCopy[locale].imageSearch} →</a>

          <p className="independent-note">{copy.note}</p>
        </div>

        <LiveProducts locale={locale} />
      </section>

      <GuideShortcuts locale={locale} />

      <section className="browse-edit" aria-labelledby="browse-edit-title">
        <div className="section-heading-row">
          <h2 id="browse-edit-title">{copy.browseTitle}</h2>
          <span>{copy.browseNote}</span>
        </div>
        <div className="edit-grid">
          {categoryEdits.map((category, index) => (
            <a
              href={localizedPath(category.href.replace("https://www.cnbuycha.com", "/catalog").replace("/Jersey/","/jersey/"),locale)}
              className="edit-card"
              key={category.label}
            >
              <Image
                src={category.image}
                alt={`${copy.categories[index]} category`}
                width={180}
                height={180}
                sizes="110px"
                unoptimized
              />
              <span>{copy.categories[index]}</span>
              <b aria-hidden="true">→</b>
            </a>
          ))}
        </div>
      </section>

      <section className="confidence-strip" aria-label="Site principles">
        {copy.principles.map((principle, index) => (
          <p key={principle}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {principle}
          </p>
        ))}
      </section>

      <section className="home-story">
        <div className="story-heading">
          <p className="eyebrow">{copy.storyEyebrow}</p>
          <h2>{copy.storyTitle}</h2>
        </div>
        <div className="story-copy">
          <p>{copy.storyOne}</p>
          <p>{copy.storyTwo}</p>
          <Link
            className="text-link"
            href={localizedPath("/how-it-works", locale)}
          >
            {copy.storyLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{copy.processEyebrow}</p>
            <h2 id="process-title">{copy.processTitle}</h2>
          </div>
          <Link
            className="text-link"
            href={localizedPath("/guides/qc", locale)}
          >
            {copy.qcLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="process-grid">
          {copy.process.map((step, index) => (
            <article key={step[0]}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step[0]}</h3>
              <p>{step[1]}</p>
            </article>
          ))}
        </div>
        <p className="source-note">{copy.sourceNote}</p>
      </section>

      <section className="home-articles" aria-labelledby="latest-guides-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{copy.readingEyebrow}</p>
            <h2 id="latest-guides-title">{copy.readingTitle}</h2>
          </div>
          <Link
            className="text-link"
            href={localizedPath("/articles", locale)}
          >
            {copy.readingLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="article-card-grid">
          {latestArticles.map((article) => (
            <ArticleCard article={article} locale={locale} key={article.slug} compact />
          ))}
        </div>
      </section>

      <section className="home-faq" aria-labelledby="home-faq-title">
        <div className="faq-intro">
          <p className="eyebrow">{copy.faqEyebrow}</p>
          <h2 id="home-faq-title">{copy.faqTitle}</h2>
          <p>{copy.faqIntro}</p>
          <Link
            className="button button-secondary"
            href={localizedPath("/faq", locale)}
          >
            {copy.faqLink}
          </Link>
        </div>
        <div className="faq-list">
          {localizedFaqs.slice(0, 5).map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-search">
        <div>
          <p className="eyebrow">{copy.closingEyebrow}</p>
          <h2>{copy.closingTitle}</h2>
        </div>
        <ProductSearch compact locale={locale} />
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
