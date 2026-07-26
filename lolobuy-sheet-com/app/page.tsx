import HomeClient from "./home-client";
import JsonLd from "./components/json-ld";
import { normalizeLocale } from "./i18n";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);

  return (
    <>
      <HomeClient locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Lolobuy Sheet",
          url: "https://lolobuy-sheet.com/",
          description:
            "Independent product discovery, Lolobuy spreadsheet guides and practical warehouse QC education.",
          publisher: {
            "@type": "Organization",
            name: "Lolobuy Sheet",
            url: "https://lolobuy-sheet.com/",
            logo: "https://lolobuy-sheet.com/lolobuy-logo.png",
          },
        }}
      />
    </>
  );
}
