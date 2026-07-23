import type { ImgHTMLAttributes } from "react";

type SiteImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export function SiteImage({
  priority = false,
  loading,
  decoding = "async",
  ...props
}: SiteImageProps) {
  return (
    <img
      {...props}
      loading={priority ? "eager" : (loading ?? "lazy")}
      decoding={decoding}
      fetchPriority={priority ? "high" : props.fetchPriority}
    />
  );
}

export function ResponsiveHeroImage() {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/optimized/hero-product-collage-480.webp 480w, /optimized/hero-product-collage-768.webp 768w, /optimized/hero-product-collage-1000.webp 1000w"
        sizes="(max-width: 680px) 165px, (max-width: 1050px) 72vw, 50vw"
      />
      <SiteImage
        src="/optimized/hero-product-collage-1000.webp"
        alt="Unbranded shoe, charcoal hoodie and black cap presented as product finds"
        width={1000}
        height={747}
        priority
      />
    </picture>
  );
}
