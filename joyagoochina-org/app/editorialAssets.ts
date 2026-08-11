import type { Metadata } from "next";

const siteOrigin = "https://joyagoochina.org";

export type EditorialImage = {
  src: string;
  width: number;
  height: number;
};

export const siteLogo: EditorialImage = {
  src: "/joyagoo-logo.png",
  width: 768,
  height: 235,
};

export const defaultEditorialImage: EditorialImage = {
  src: "/products/3378.webp",
  width: 750,
  height: 750,
};

const editorialImages: Record<string, EditorialImage> = {
  "how-to-buy": defaultEditorialImage,
  "qc-guide": {
    src: "/products/3367.webp",
    width: 750,
    height: 750,
  },
  "shipping-guide": {
    src: "/products/3376.webp",
    width: 750,
    height: 750,
  },
  returns: {
    src: "/products/3380.webp",
    width: 750,
    height: 750,
  },
  "how-to-buy-from-taobao-with-joyagoo": defaultEditorialImage,
  "joyagoo-fees-explained": {
    src: "/products/3377.webp",
    width: 750,
    height: 750,
  },
  "joyagoo-parcel-consolidation-packaging-guide": {
    src: "/products/3376.webp",
    width: 750,
    height: 750,
  },
  "joyagoo-qc-photo-checklist": {
    src: "/products/3367.webp",
    width: 750,
    height: 750,
  },
  "joyagoo-return-window-warehouse-storage": {
    src: "/products/3380.webp",
    width: 750,
    height: 750,
  },
  "joyagoo-volumetric-weight-shipping-cost": {
    src: "/products/3376.webp",
    width: 750,
    height: 750,
  },
};

export const getEditorialImage = (slug?: string): EditorialImage =>
  (slug && editorialImages[slug]) || defaultEditorialImage;

export const absoluteImageUrl = (image: EditorialImage): string =>
  `${siteOrigin}${image.src}`;

export const socialImage = (slug: string | undefined, alt: string) => {
  const image = getEditorialImage(slug);
  return {
    url: absoluteImageUrl(image),
    width: image.width,
    height: image.height,
    alt,
  };
};

export const articleImageSchema = (slug: string, caption: string) => {
  const image = getEditorialImage(slug);
  return {
    "@type": "ImageObject",
    url: absoluteImageUrl(image),
    width: image.width,
    height: image.height,
    caption,
  };
};

export const organizationLogoSchema = {
  "@type": "ImageObject",
  url: absoluteImageUrl(siteLogo),
  width: siteLogo.width,
  height: siteLogo.height,
};

export const editorialSocialMetadata = ({
  slug,
  title,
  description,
  url,
  type = "article",
}: {
  slug?: string;
  title: string;
  description: string;
  url: string;
  type?: "article" | "website";
}): Pick<Metadata, "openGraph" | "twitter"> => {
  const image = socialImage(slug, title);
  return {
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: "Joyagoo China",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
};
