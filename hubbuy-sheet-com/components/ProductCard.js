import { ExternalIcon } from "@/components/Icons";

export default function ProductCard({ product, priority = false }) {
  return (
    <article className="product-card">
      <a className="product-image" href={product.href} target="_blank" rel="noopener" aria-label={`Open ${product.name} product details`}>
        <img src={product.image} alt={`${product.name} product reference`} width="720" height="720" loading={priority ? "eager" : "lazy"} />
        <span className="product-category">{product.category}</span>
      </a>
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p><span>¥</span>{product.price} <small>reference</small></p>
        </div>
        <a className="product-link" href={product.href} target="_blank" rel="noopener" aria-label={`View ${product.name} details`}><ExternalIcon /></a>
      </div>
    </article>
  );
}
