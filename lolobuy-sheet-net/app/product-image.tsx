import type { ProductRecord } from "./site-data";

export function ProductImage({
  product,
  priority = false,
  sizes = "(max-width: 620px) 50vw, (max-width: 900px) 50vw, 25vw",
  className,
}: {
  product: ProductRecord;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const sourceWidth = product.id === 3366 ? 640 : 750;

  return (
    <img
      className={className}
      src={product.image}
      srcSet={`/products-320/${product.id}.webp 320w, /products-480/${product.id}.webp 480w, ${product.image} ${sourceWidth}w`}
      sizes={sizes}
      alt={product.name}
      width={sourceWidth}
      height={sourceWidth}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
    />
  );
}
