import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../components/json-ld";
import PageHero from "../components/page-hero";
import ProductSearch from "../components/product-search";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { localizedPath, normalizeLocale } from "../i18n";
import { getLocalizedCategories } from "../localized-data";
import { categoriesPageCopy, commonPageCopy } from "../page-copy";
import { localizedMetadata } from "../seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = categoriesPageCopy[locale];
  return localizedMetadata({
    locale,
    path: "/categories",
    title: copy.title,
    description: copy.intro,
  });
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = categoriesPageCopy[locale];
  const common = commonPageCopy[locale];
  const localizedCategories = getLocalizedCategories(locale);

  return (
    <main>
      <SiteHeader locale={locale} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        crumbs={[
          { label: common.home, href: localizedPath("/", locale) },
          { label: copy.crumb },
        ]}
      />

      <section className="category-page-grid">
        {localizedCategories.map((category) => (
          <article className="category-page-card" key={category.slug}>
            <a
              className="category-destination-link"
              href={category.href}
              target="_blank"
              rel="sponsored noopener"
            >
              <div className="category-image">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  width={700}
                  height={700}
                  sizes="(max-width: 680px) 46vw, (max-width: 1100px) 30vw, 22vw"
                  unoptimized
                />
              </div>
              <div>
                <p>{copy.directory} / {category.slug.replaceAll("-", " ").toUpperCase()}</p>
                <h2>{category.name}</h2>
                <span>{category.description}</span>
                <b>{copy.open} ↗</b>
              </div>
            </a>
            <Link
              className="category-guide-link"
              href={localizedPath(`/categories/${category.slug}`, locale)}
            >
              {copy.guide} →
            </Link>
          </article>
        ))}
      </section>

      <section className="search-panel">
        <div>
          <p className="eyebrow">{copy.searchEyebrow}</p>
          <h2>{copy.searchTitle}</h2>
          <p>{copy.searchText}</p>
        </div>
        <ProductSearch compact locale={locale} />
      </section>

      <section className="editorial-note-grid">
        {copy.notes.map((note, index) => (
          <article key={note[0]}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{note[0]}</h2>
            <p>{note[1]}</p>
          </article>
        ))}
      </section>

      <SiteFooter locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.title,
          inLanguage: locale,
          itemListElement: localizedCategories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: category.name,
            url: category.href,
          })),
        }}
      />
    </main>
  );
}
