import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "../../page";
import { GuidePage } from "../../guide-page";
import {
  corePathFromSegments,
  isLocalizedLocale,
  type CorePath,
} from "../../i18n";
import { coreMetadata } from "../../seo";
import { faqItems } from "../../site-data";
import { translate, absoluteUrl, localizedPath } from "../../i18n";

type LocalizedParams = {
  locale: string;
  slug?: string[];
};

function resolve(params: LocalizedParams) {
  if (!isLocalizedLocale(params.locale)) notFound();
  const path = corePathFromSegments(params.slug);
  if (!path) notFound();
  return { locale: params.locale, path };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalizedParams>;
}): Promise<Metadata> {
  const resolved = resolve(await params);
  return coreMetadata(resolved.locale, resolved.path);
}

function LocalizedFaqData({
  locale,
}: {
  locale: "es" | "de" | "fr" | "it";
}) {
  const canonical = absoluteUrl(localizedPath(locale, "/faq"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    url: canonical,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: translate(locale, item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: translate(locale, item.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function kindFromPath(path: Exclude<CorePath, "/">) {
  return path.slice(1) as
    | "products"
    | "categories"
    | "qc-guide"
    | "shipping"
    | "articles"
    | "faq"
    | "how-it-works";
}

export default async function LocalizedRoute({
  params,
}: {
  params: Promise<LocalizedParams>;
}) {
  const { locale, path } = resolve(await params);

  if (path === "/") {
    return <HomePage locale={locale} />;
  }

  return (
    <>
      {path === "/faq" && <LocalizedFaqData locale={locale} />}
      <GuidePage kind={kindFromPath(path)} locale={locale} />
    </>
  );
}
