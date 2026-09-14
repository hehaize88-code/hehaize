import type { Product } from "../site-data";
import { localizedCategories, localeCopy, SiteLocale } from "../i18n";

export function ProductCard({ product, locale = "en" }: { product: Product; locale?: SiteLocale }) {
  const copy = localeCopy[locale];
  const category = localizedCategories[locale][product.category];
  return (
    <article className="product-card">
      <a className="product-image" href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-check">{copy.finds.checked}</span>
      </a>
      <div className="product-body">
        <div className="product-meta"><span>{category.name}</span><span>{product.checked}</span></div>
        <h3><a href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="product-card-title">{product.name}</a></h3>
        <div className="product-footer">
          <div className="price"><strong>≈ ${product.usd}</strong><small>{copy.finds.source} ¥{product.cny}</small></div>
          <a className="product-button" href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="product-card-button">{copy.finds.open} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
