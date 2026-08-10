import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "../../product-image";
import {
  categories,
  categoryInternalPath,
  getCategory,
  getCategoryProducts,
  productInternalPath,
  productPriceUsd,
  productSnapshotDate,
} from "../../site-data";
import { absoluteUrl } from "../../i18n";
import { SiteFooter, SiteHeader } from "../../site-shell";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const canonical = categoryInternalPath(category.slug);
  const description = `Browse ${category.name.toLowerCase()} in the LoloBuy spreadsheet with internal product references, recorded CNY and USD values, QC checks and current catalog links.`;

  return {
    title: { absolute: `LoloBuy ${category.name} Spreadsheet Finds & QC Guide` },
    description,
    alternates: { canonical },
    openGraph: {
      title: `LoloBuy ${category.name} Spreadsheet Finds & QC Guide`,
      description,
      type: "website",
      url: canonical,
      images: [{ url: "/social/categories.png", width: 1200, height: 630, alt: `${category.name} product reference guide` }],
    },
  };
}

export default async function CategoryReferencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryProducts = getCategoryProducts(category.slug);
  const canonical = absoluteUrl(categoryInternalPath(category.slug));
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `LoloBuy ${category.name} Spreadsheet Finds`,
    description: category.intro,
    url: canonical,
    dateModified: productSnapshotDate,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: absoluteUrl(productInternalPath(product.id)),
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Categories", item: absoluteUrl("/categories") },
      { "@type": "ListItem", position: 3, name: category.name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader active="categories" />
      <main className="category-reference-main">
        <section className="category-reference-hero">
          <nav className="product-reference-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/categories">Categories</Link><span>/</span>
            <span aria-current="page">{category.name}</span>
          </nav>
          <p className="eyebrow">LOLOBUY CATEGORY REFERENCE</p>
          <h1>LoloBuy {category.name} Spreadsheet Finds</h1>
          <p>{category.intro}</p>
          <div>
            <span>{categoryProducts.length} internal product references</span>
            <a className="button button-secondary" href={category.href} target="_blank" rel="sponsored noopener noreferrer">
              Open current {category.name.toLowerCase()} catalog <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="category-reference-products" aria-label={`${category.name} product references`}>
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <Link className="product-image" href={productInternalPath(product.id)}>
                  <ProductImage product={product} />
                  <span>Open reference <span aria-hidden="true">→</span></span>
                </Link>
                <div className="product-copy">
                  <p>{product.category}</p>
                  <h2><Link href={productInternalPath(product.id)}>{product.name}</Link></h2>
                  <div>
                    <span>¥{product.priceCny} · ${productPriceUsd(product.priceCny)}</span>
                    <Link href={productInternalPath(product.id)}>Details →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="category-reference-note">
            Prices are a 30 July 2026 reference snapshot. Recheck the live page, selected option and final checkout before ordering.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
