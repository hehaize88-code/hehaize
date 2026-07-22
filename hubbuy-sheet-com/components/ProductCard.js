import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export default function ProductCard({ product, priority = false }) {
  return (
    <article className="product-card">
      <Link className="product-image" href={product.localHref} aria-label={`Open ${product.name} research page`}>
        <img src={product.image} alt={`${product.name} product reference`} width="720" height="720" loading={priority ? "eager" : "lazy"} />
        <span className="product-category">{product.category}</span>
      </Link>
      <div className="product-content">
        <div>
          <h3>{product.name}</h3>
          <p><span>¥</span>{product.price} <small>reference</small></p>
        </div>
        <Link className="product-link" href={product.localHref} aria-label={`View ${product.name} research page`}><ArrowIcon /></Link>
      </div>
    </article>
  );
}
