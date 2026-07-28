type ProductImageProps = {
  slug: string;
  alt: string;
  sizes: string;
  view?: 1 | 2 | 3;
  className?: string;
  priority?: boolean;
};

export function productImagePath(
  slug: string,
  width: 160 | 320 | 640,
  view: 1 | 2 | 3 = 1,
) {
  return `/product-finds/${slug}-${view}-${width}.webp`;
}

export default function ProductImage({
  slug,
  alt,
  sizes,
  view = 1,
  className,
  priority = false,
}: ProductImageProps) {
  const src160 = productImagePath(slug, 160, view);
  const src320 = productImagePath(slug, 320, view);
  const src640 = productImagePath(slug, 640, view);

  return (
    <img
      src={src320}
      srcSet={`${src160} 160w, ${src320} 320w, ${src640} 640w`}
      sizes={sizes}
      alt={alt}
      width={640}
      height={640}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
