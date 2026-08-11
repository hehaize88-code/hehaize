import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "../../components/ProductPage";
import { getProductBySlug, products } from "../../data";
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

  const title = `${product.name} — Price, ID & QC Checks`;
  const description = `${product.name}: checked product ID ${product.id}, USD reference price ${product.price}, local image, QC checklist and direct matching listing.`;

  return {
    title,
    description,
    alternates: languageAlternates(`/product/${product.slug}/`),
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://joyagoochina.org/product/${product.slug}/`,
      images: [`https://joyagoochina.org${product.image}`],
    },
    twitter: { card: "summary_large_image", images: [`https://joyagoochina.org${product.image}`] },
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
