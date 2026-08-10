import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryGuideSlugs,
  getCategoryGuide,
} from "../../category-guide-data";
import JsonLd from "../../components/json-ld";
import PageHero from "../../components/page-hero";
import ProductImage from "../../components/product-image";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { localizedPath, normalizeLocale } from "../../i18n";
import { getLocalizedProducts } from "../../localized-data";
import { commonPageCopy } from "../../page-copy";
import {
  absoluteLocalizedUrl,
  localizedMetadata,
} from "../../seo";

export function generateStaticParams() {
  return categoryGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const guide = getCategoryGuide(slug, locale);

  if (!guide) return {};

  return localizedMetadata({
    locale,
    path: `/categories/${guide.slug}`,
    title: guide.metaTitle,
    description: guide.description,
  });
}

export default async function CategoryGuidePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const guide = getCategoryGuide(slug, locale);

  if (!guide) notFound();

  const common = commonPageCopy[locale];
  const products = getLocalizedProducts(locale).filter((product) =>
    guide.productKinds.includes(product.kind),
  );
  const pagePath = `/categories/${guide.slug}`;

  return (
    <main>
      <SiteHeader locale={locale} />
      <PageHero
        eyebrow={guide.eyebrow}
        title={guide.title}
        intro={guide.description}
        crumbs={[
          { label: common.home, href: localizedPath("/", locale) },
          {
            label: common.categories,
            href: localizedPath("/categories", locale),
          },
          { label: guide.name },
        ]}
      />

      <article className="category-guide">
        <section className="category-guide-intro">
          <div className="category-guide-image">
            <Image
              src={guide.image}
              alt={guide.name}
              width={900}
              height={900}
              sizes="(max-width: 780px) 100vw, 44vw"
              priority
              unoptimized
            />
          </div>
          <div>
            {guide.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a
              className="button button-primary"
              href={guide.directoryHref}
              target="_blank"
              rel="sponsored noopener"
            >
              {guide.openDirectory} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="category-guide-section">
          <header>
            <p className="eyebrow">01 / {common.independentGuide}</p>
            <h2>{guide.orderTitle}</h2>
            <p>{guide.orderIntro}</p>
          </header>
          <div className="category-check-grid">
            {guide.orderChecks.map((check, index) => (
              <article key={check.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{check.title}</h3>
                <p>{check.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="category-guide-section category-guide-section-dark">
          <header>
            <p className="eyebrow">02 / QC</p>
            <h2>{guide.qcTitle}</h2>
            <p>{guide.qcIntro}</p>
          </header>
          <div className="category-check-grid">
            {guide.qcChecks.map((check, index) => (
              <article key={check.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{check.title}</h3>
                <p>{check.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="category-cost-panel">
          <p className="eyebrow">03 / SHIPPING DECISION</p>
          <h2>{guide.costTitle}</h2>
          <div>
            {guide.costParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="related-products category-guide-products">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">04 / CURATED FINDS</p>
              <h2>{guide.productsTitle}</h2>
              <p>{guide.productsIntro}</p>
            </div>
          </div>
          {products.length > 0 ? (
            <div className="related-product-grid">
              {products.map((product) => (
                <Link
                  className="related-product-card"
                  href={localizedPath(`/products/${product.slug}`, locale)}
                  key={product.slug}
                >
                  <ProductImage
                    slug={product.slug}
                    alt={product.name}
                    sizes="(max-width: 620px) 30vw, 28vw"
                  />
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <b>{guide.viewProduct} <span aria-hidden="true">→</span></b>
                </Link>
              ))}
            </div>
          ) : (
            <a className="button button-secondary" href={guide.directoryHref} target="_blank" rel="sponsored noopener">
              {guide.openDirectory} <span aria-hidden="true">↗</span>
            </a>
          )}
        </section>

        <section className="category-guide-faq">
          <header>
            <p className="eyebrow">05 / FAQ</p>
            <h2>{guide.faqTitle}</h2>
          </header>
          <div className="full-faq">
            {guide.faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter locale={locale} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: guide.metaTitle,
            description: guide.description,
            inLanguage: locale,
            url: absoluteLocalizedUrl(pagePath, locale),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: products.length,
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: product.name,
                url: absoluteLocalizedUrl(
                  `/products/${product.slug}`,
                  locale,
                ),
              })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: common.home,
                item: absoluteLocalizedUrl("/", locale),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: common.categories,
                item: absoluteLocalizedUrl("/categories", locale),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: guide.name,
                item: absoluteLocalizedUrl(pagePath, locale),
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: guide.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />
    </main>
  );
}
