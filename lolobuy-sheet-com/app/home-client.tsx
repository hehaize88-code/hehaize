"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "./components/article-card";
import ProductImage from "./components/product-image";
import ProductSearch from "./components/product-search";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { homeCopy, localizedPath, type Locale } from "./i18n";
import {
  getLocalizedArticles,
  getLocalizedFaqs,
  getLocalizedProducts,
} from "./localized-data";

type Filter = "all" | "new" | "trending" | "essential";

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
    label: "Bags",
    href: "https://www.cnbuycha.com/accessories/",
    image: "/products/bag.webp",
  },
  {
    label: "Accessories",
    href: "https://www.cnbuycha.com/headwear/",
    image: "/products/cap.webp",
  },
];

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6.75 4.75a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v16l-5.25-3-5.25 3v-16Z" />
    </svg>
  );
}

export default function HomeClient({ locale }: { locale: Locale }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const copy = homeCopy[locale];
  const localizedProducts = getLocalizedProducts(locale);
  const localizedArticles = getLocalizedArticles(locale);
  const localizedFaqs = getLocalizedFaqs(locale);
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: copy.filters.all },
    { id: "new", label: copy.filters.new },
    { id: "trending", label: copy.filters.trending },
    { id: "essential", label: copy.filters.essential },
  ];

  const visibleFinds = useMemo(
    () =>
      activeFilter === "all"
        ? localizedProducts
        : localizedProducts.filter((item) => item.tags.includes(activeFilter)),
    [activeFilter, localizedProducts],
  );

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
              href={localizedPath("/finds", locale)}
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

          <p className="independent-note">{copy.note}</p>
        </div>

        <div className="curated-card" id="curated">
          <div className="curated-toolbar">
            <div>
              <p className="card-overline">{copy.curatedOverline}</p>
              <h2>{copy.curatedTitle}</h2>
            </div>
            <div className="filter-tabs" role="tablist" aria-label="Find filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={activeFilter === filter.id ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="find-grid" aria-live="polite">
            {visibleFinds.map((item, index) => (
              <article className="find-card" key={item.name}>
                <Link
                  className="find-link"
                  href={localizedPath(`/products/${item.slug}`, locale)}
                  aria-label={`View details for ${item.name}`}
                >
                  <ProductImage
                    slug={item.slug}
                    alt={item.name}
                    sizes="(max-width: 620px) 22vw, (max-width: 930px) 23vw, 11vw"
                    priority={index < 4}
                  />
                </Link>
                <button
                  className={saved[item.name] ? "save-button is-saved" : "save-button"}
                  type="button"
                  aria-label={
                    saved[item.name]
                      ? `Remove ${item.name} from saved finds`
                      : `Save ${item.name}`
                  }
                  aria-pressed={Boolean(saved[item.name])}
                  onClick={() =>
                    setSaved((current) => ({
                      ...current,
                      [item.name]: !current[item.name],
                    }))
                  }
                >
                  <BookmarkIcon filled={Boolean(saved[item.name])} />
                </button>
                <span className="find-name">{item.name}</span>
              </article>
            ))}
          </div>

          <Link
            className="card-footer-link"
            href={localizedPath("/finds", locale)}
          >
            {copy.viewDirectory} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="browse-edit" aria-labelledby="browse-edit-title">
        <div className="section-heading-row">
          <h2 id="browse-edit-title">{copy.browseTitle}</h2>
          <span>{copy.browseNote}</span>
        </div>
        <div className="edit-grid">
          {categoryEdits.map((category, index) => (
            <a
              href={category.href}
              target="_blank"
              rel="noopener"
              className="edit-card"
              key={category.label}
            >
              <Image
                src={category.image}
                alt=""
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
          {localizedArticles.map((article) => (
            <ArticleCard article={article} locale={locale} key={article.slug} />
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
