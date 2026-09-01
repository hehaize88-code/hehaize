import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "../../components/ProductPage";
import {
  absoluteProductImageUrl,
  getProductBySlug,
  products,
} from "../../data";
import { languageAlternates } from "../../seoAlternates";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — Price & Direct Product Link`;
  const description = `${product.name}: current reference price ${product.price}, checked matching listing, direct product link and practical QC tips.`;
  const image = absoluteProductImageUrl(product.image);

  return {
    title,
    description,
    alternates: languageAlternates(`/product/${product.slug}/`),
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://joyagoochina.org/product/${product.slug}/`,
      siteName: "Joyagoo China",
      images: [
        {
          url: image,
          width: product.imageWidth,
          height: product.imageHeight,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductPage locale="en" product={product} />;
}
