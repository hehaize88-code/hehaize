import { ArrowIcon } from "@/components/Icons";
import { usdReference } from "@/data/site";

export default function ProductCard({ product, priority = false }) {
  return (
    <article className="product-card">
      <a className="product-image" href={product.catalogHref} aria-label={`Open ${product.name} product photos`}>
        <img
          src={product.image}
          alt={`${product.name} product reference`}
          width="720"
          height="720"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
        />
        <span className="product-category">{product.category}</span>
      </a>
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p className="live-product-price"><strong data-price-amount={product.price} data-price-currency="CNY">${usdReference(product.price)}</strong> <small data-currency-code>USD</small> <small>approx.</small></p>
          <small className="cny-reference">CNY: ¥{product.price}</small>
        </div>
        <a className="product-link" href={product.catalogHref} aria-label={`View ${product.name} product photos`}><ArrowIcon /></a>
      </div>
    </article>
  );
}
