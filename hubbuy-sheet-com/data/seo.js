import { SITE_URL } from "@/data/site";

const OG_IMAGE = "/brand/og-card.png";

export function createPageMetadata({
  title,
  description,
  path,
  openGraphTitle = `${title} | Hubbuy Sheet`,
  openGraphDescription = description,
  imageAlt = openGraphTitle,
}) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Hubbuy Sheet",
      title: openGraphTitle,
      description: openGraphDescription,
      url: `${SITE_URL}${path}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [OG_IMAGE],
    },
  };
}
