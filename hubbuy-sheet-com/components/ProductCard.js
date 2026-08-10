import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { usdReference } from "@/data/site";

export default function ProductCard({ product, priority = false }) {
  return (
    <article className="product-card">
      <Link className="product-image" href={product.localHref} aria-label={`Open ${product.name} research page`}>
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
      </Link>
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p><span>$</span>{usdReference(product.price)} <small>approx.</small></p>
          <small className="cny-reference">Reference ¥{product.price}</small>
        </div>
        <Link className="product-link" href={product.localHref} aria-label={`View ${product.name} research page`}><ArrowIcon /></Link>
      </div>
    </article>
  );
}
