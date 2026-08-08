import type { Product } from "../site-data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <a className="product-image" href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-check">Route checked</span>
      </a>
      <div className="product-body">
        <div className="product-meta"><span>{product.categoryLabel}</span><span>{product.checked}</span></div>
        <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
        <div className="product-footer">
          <div className="price"><strong>≈ ${product.usd}</strong><small>Recorded ¥{product.cny}</small></div>
          <a className="product-button" href={product.storeUrl} rel="nofollow">Open product <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
