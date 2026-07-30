import { products, type Product } from "../data";
import { localizePath, translations, type Locale } from "../i18n";
import { collectionNames, productPageCopy } from "../productContent";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function ProductPage({
  locale,
  product,
}: {
  locale: Locale;
  product: Product;
}) {
  const copy = productPageCopy[locale];
  const common = translations[locale];
  const productPath = localizePath(locale, `/product/${product.slug}/`);
  const absoluteUrl = `https://joyagoochina.org${productPath}`;
  const related = products
    .filter(
      (candidate) =>
        candidate.collection === product.collection &&
        candidate.id !== product.id,
    )
    .slice(0, 4);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: `https://joyagoochina.org${product.image}`,
      sku: product.id,
      category: collectionNames[locale][product.collection],
      description: `${product.name}. ${copy.overviewBody}`,
      url: absoluteUrl,
      offers: {
        "@type": "Offer",
        url: product.href,
        priceCurrency: "USD",
        price: product.price.replace("$", ""),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: common.common.home,
          item: `https://joyagoochina.org${localizePath(locale, "/")}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: common.nav.spreadsheet,
          item: `https://joyagoochina.org${localizePath(locale, "/spreadsheet/")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: absoluteUrl,
        },
      ],
    },
  ];

  return (
    <main className="product-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader locale={locale} />
      <article className="product-detail">
        <nav className="breadcrumb" aria-label={copy.directory}>
          <a href={localizePath(locale, "/")}>{common.common.home}</a>
          <span>/</span>
          <a href={localizePath(locale, "/spreadsheet/")}>
            {common.nav.spreadsheet}
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-hero">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">{copy.directory}</p>
            <h1>{product.name}</h1>
            <p className="product-detail-category">
              {collectionNames[locale][product.collection]} · {product.label}
            </p>
            <dl className="product-facts">
              <div>
                <dt>{copy.referencePrice}</dt>
                <dd>{product.price}</dd>
              </div>
              <div>
                <dt>{copy.sourcePrice}</dt>
                <dd>¥{product.priceCny}</dd>
              </div>
              <div>
                <dt>{copy.productId}</dt>
                <dd>{product.id}</dd>
              </div>
              <div>
                <dt>{copy.checked}</dt>
                <dd>{product.checkedAt}</dd>
              </div>
            </dl>
            <p className="price-notice">{copy.priceNotice}</p>
            <div className="product-actions-row">
              <a
                className="button"
                href={product.href}
                target="_blank"
                rel="noopener"
              >
                {copy.openListing}
              </a>
              <a
                className="text-link"
                href={localizePath(locale, "/spreadsheet/")}
              >
                {copy.backToSpreadsheet}
              </a>
            </div>
          </div>
        </div>

        <div className="product-editorial-grid">
          <section>
            <p className="section-count">01</p>
            <h2>{copy.overviewTitle}</h2>
            <p>{copy.overviewBody}</p>
          </section>
          <section>
            <p className="section-count">02</p>
            <h2>{copy.qcTitle}</h2>
            <p>{copy.qcIntro}</p>
            <ul>
              {copy.qcItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className="section-count">03</p>
            <h2>{copy.shippingTitle}</h2>
            <p>{copy.shippingBody}</p>
          </section>
        </div>

        <section className="related-products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {collectionNames[locale][product.collection]}
              </p>
              <h2>{copy.relatedTitle}</h2>
            </div>
          </div>
          <div className="product-grid product-grid-related">
            {related.map((item) => (
              <a
                className="product-card"
                href={localizePath(locale, `/product/${item.slug}/`)}
                key={item.id}
              >
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                  <span>{common.home.viewProduct}</span>
                </div>
                <div className="product-meta">
                  <small>{collectionNames[locale][item.collection]}</small>
                  <h3>{item.name}</h3>
                  <div>
                    <strong>{item.price}</strong>
                    <span>ID {item.id}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}
