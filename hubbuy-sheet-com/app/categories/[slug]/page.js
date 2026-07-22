import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { categoryPages, getCategory } from "@/data/categories";
import { categoryDepth } from "@/data/category-depth";
import { products, getProductImageUrl, MAIN_SITE, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export function generateStaticParams() {
  return categoryPages.map(({ slug }) => ({ slug }));
}

export function getCategoryMetadata(category) {
  return createPageMetadata({
    title: category.seoTitle,
    description: category.description,
    path: `/categories/${category.slug}/`,
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? getCategoryMetadata(category) : {};
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const depth = categoryDepth[slug];

  const categoryProducts = products.filter((product) => product.category === category.name);
  const pagePath = `/categories/${category.slug}/`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const searchUrl = `${MAIN_SITE}/search.html?channelid=2&keywords=${encodeURIComponent(category.searchTerm)}`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: category.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: "Hubbuy Sheet", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryProducts.length,
      itemListElement: categoryProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}${product.localHref}`,
        image: getProductImageUrl(product),
      })),
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products/` },
      { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero eyebrow="Category research page" title={category.title} intro={category.description} crumbs={["Products", category.name]} />

      <section className="section category-page-section">
        <div className="wrap category-page-intro">
          <div>
            <span className="eyebrow">Browse product categories</span>
            <h2>{categoryProducts.length} product references, one focused review path.</h2>
          </div>
          <p>{category.intro}</p>
        </div>
      </section>

      <section className="section category-products-section">
        <div className="wrap">
          <div className="product-page-header">
            <div><span className="eyebrow">Current category shortlist</span><h2>{category.name}</h2><p>Every product card opens a local research page before the exact live catalog destination.</p></div>
            <a href={searchUrl} target="_blank" rel="noopener">Search this category in the live catalog ↗</a>
          </div>
          <div className="product-grid category-product-grid">
            {categoryProducts.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
          </div>
        </div>
      </section>

      <section className="section category-depth-section">
        <div className="wrap category-depth-layout">
          <div>
            <span className="eyebrow">How to review this category</span>
            <h2>{depth.heading}</h2>
            <div className="category-depth-signals">
              {depth.signals.map((signal, index) => <span key={signal}><b>0{index + 1}</b>{signal}</span>)}
            </div>
          </div>
          <div className="category-depth-copy">
            {depth.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="section category-research-section">
        <div className="wrap">
          <div className="section-heading centered-heading">
            <span className="eyebrow">Category decision checklist</span>
            <h2>Before you submit an order</h2>
          </div>
          <div className="category-check-grid">
            {category.checks.map((check, index) => <article key={check}><span>0{index + 1}</span><CheckIcon /><p>{check}</p></article>)}
          </div>
          <div className="category-notes-grid">
            <article><span>Warehouse QC focus</span><p>{category.qc}</p><Link href="/guides/qc-checks/">Open the category QC checklist <ArrowIcon /></Link></article>
            <article><span>Parcel planning note</span><p>{category.shipping}</p><Link href="/guides/shipping/">Open the parcel checklist <ArrowIcon /></Link></article>
          </div>
        </div>
      </section>

      <section className="section category-crosslinks-section">
        <div className="wrap">
          <div className="section-heading inline-heading"><div><span className="eyebrow">Browse another category</span><h2>Keep each shortlist specific.</h2></div><Link href="/products/">All product references <ArrowIcon /></Link></div>
          <div className="category-grid">
            {categoryPages.filter((item) => item.slug !== category.slug).map((item) => (
              <Link key={item.slug} className="category-card" href={`/categories/${item.slug}/`}>
                <span className="category-code">{item.code}</span>
                <span><strong>{item.name}</strong><small>{item.note}</small></span>
                <ArrowIcon size={17} />
              </Link>
            ))}
          </div>
          <div className="editorial-note"><strong>Editorial scope</strong><p>Names, images and prices are reference information recorded during review. Verify the live seller, variant, stock and total cost before ordering.</p></div>
        </div>
      </section>
    </>
  );
}
