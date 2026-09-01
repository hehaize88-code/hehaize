import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { SiteImage } from "../../components/site-image";
import { socialImage } from "../../seo-image";
import { categoryLandings, getCategoryLanding } from "../category-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryLandings.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryLanding(slug);
  if (!category) return {};
  const canonical = `/categories/${category.slug}/`;
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: category.title,
      description: category.description,
      url: canonical,
      siteName: "UUFinds Sheet",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.description,
      images: [socialImage.url],
    },
  };
}

export default async function CategoryLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryLanding(slug);
  if (!category) notFound();

  return (
    <main className="hub-page category-landing-page">
      <SiteHeader routePath={`/categories/${category.slug}/`} englishOnly />
      <section className="hub-hero category-landing-hero">
        <p className="eyebrow">Spreadsheet category / {category.listings.length.toString().padStart(2, "0")} checked listings</p>
        <h1>{category.h1}</h1>
        <p>{category.intro}</p>
      </section>

      <section className="hub-content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Distinct product finds / Checked September 1, 2026</p>
            <h2>Compare before opening a listing.</h2>
          </div>
          <p>Displayed prices are in USD and may change. Each card opens the exact matching product detail page.</p>
        </div>

        <div className="product-showcase-grid category-listing-grid">
          {category.listings.map((listing, index) => (
            <a className="product-card" href={listing.detailUrl} target="_blank" rel="noreferrer" key={listing.listingId}>
              <div className="product-card-image">
                <SiteImage src={listing.image} alt={listing.name} width={750} height={750} />
                <span>{String(index + 1).padStart(2, "0")} / {String(category.listings.length).padStart(2, "0")}</span>
              </div>
              <div className="product-card-copy">
                <p>{category.name} · ID {listing.listingId}</p>
                <h2>{listing.name}</h2>
                <p className="category-listing-note">{listing.filterNote}</p>
                <div><span>${listing.price}</span><b>Open exact detail ↗</b></div>
              </div>
            </a>
          ))}
        </div>

        <section className="evidence-matrix" aria-labelledby="filter-heading">
          <div className="section-heading">
            <div><p className="eyebrow">Short filtering guide</p><h2 id="filter-heading">Narrow the category without guessing.</h2></div>
            <p>Use product data to shortlist first, then use matched QC photos to inspect the exact listing rather than a look-alike.</p>
          </div>
          <div className="evidence-grid">
            {category.filterTips.map((tip, index) => (
              <article key={tip.title}>
                <p className="step-label">FILTER {String(index + 1).padStart(2, "0")}</p>
                <h3>{tip.title}</h3>
                <p>{tip.text}</p>
                <strong>Keep the listing ID with your notes.</strong>
              </article>
            ))}
          </div>
        </section>

        <div className="source-method-note">
          <p className="eyebrow">Listing check / September 1, 2026</p>
          <p>Product names, displayed prices, listing IDs, images and detail-page destinations were checked against the current main-site category and product pages. A listing image is not a UUFinds QC photo. Confirm live price, available variants and matching QC evidence before making a decision. <a href={category.categoryUrl} target="_blank" rel="noreferrer">Open the complete {category.name.toLowerCase()} category ↗</a></p>
        </div>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            name: category.h1,
            description: category.description,
            url: `https://uufindssheet.com/categories/${category.slug}/`,
            inLanguage: "en",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: category.listings.length,
              itemListElement: category.listings.map((listing, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: listing.name,
                url: listing.detailUrl,
              })),
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://uufindssheet.com/" },
              { "@type": "ListItem", position: 2, name: category.name, item: `https://uufindssheet.com/categories/${category.slug}/` },
            ],
          },
        ],
      }) }} />
    </main>
  );
}
