import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-volumetric-weight-shipping-cost";
const entry = getSeoArticleEntry("en", slug)!;
const title = "Joyagoo Volumetric Weight Guide 2026: Parcel Cost";
const description =
  "Estimate Joyagoo shipping cost from actual and volumetric weight, compare live route divisors, and see when rehearsal packing can reduce quote uncertainty.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooVolumetricWeightPage() {
  return (
    <LocalizedPage
      locale="en"
      slug={slug}
    />
  );
}
