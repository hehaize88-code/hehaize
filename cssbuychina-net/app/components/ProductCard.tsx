import type { Product } from "../site-data";
import { localizedCategories, localeCopy, SiteLocale } from "../i18n";

export function ProductCard({ product, locale = "en" }: { product: Product; locale?: SiteLocale }) {
  const copy = localeCopy[locale];
  const category = localizedCategories[locale][product.category];
  return (
    <article className="product-card">
      <a className="product-image" href={product.storeUrl} rel="nofollow">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-check">{copy.finds.checked}</span>
      </a>
      <div className="product-body">
        <div className="product-meta"><span>{category.name}</span><span>{product.checked}</span></div>
        <h3><a href={product.storeUrl} rel="nofollow">{product.name}</a></h3>
        <div className="product-footer">
          <div className="price"><strong>≈ ${product.usd}</strong><small>{copy.finds.source} ¥{product.cny}</small></div>
          <a className="product-button" href={product.storeUrl} rel="nofollow">{copy.finds.open} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
