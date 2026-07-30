import type { MetadataRoute } from "next";
import { languages } from "./i18n";
import { seoArticleSlugs } from "./seoArticleLibrary";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/spreadsheet/",
    "/categories/",
    "/faq/",
    "/guides/",
    "/how-to-buy/",
    "/qc-guide/",
    "/shipping-guide/",
    "/returns/",
    "/about/",
    "/editorial-policy/",
    "/privacy/",
    "/terms/",
    "/articles/",
    ...seoArticleSlugs.map((slug) => `/${slug}/`),
  ];

  return languages.flatMap((language) =>
    pages.map((path, index) => {
      const localizedPath =
        language.code === "en"
          ? path
          : path
            ? `/${language.code}${path}`
            : `/${language.code}/`;
      return {
        url: `https://joyagoochina.org${localizedPath}`,
        lastModified: new Date("2026-07-30"),
        changeFrequency:
          index === 0 || path === "/articles/" ? ("weekly" as const) : ("monthly" as const),
        priority:
          index === 0
            ? 1
            : path === "/articles/" ||
                seoArticleSlugs.some((slug) => path === `/${slug}/`)
              ? 0.9
              : path === "/guides/"
                ? 0.85
                : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map((alternateLanguage) => [
              alternateLanguage.code,
              `https://joyagoochina.org${
                alternateLanguage.code === "en"
                  ? path
                  : path
                    ? `/${alternateLanguage.code}${path}`
                    : `/${alternateLanguage.code}/`
              }`,
            ]),
          ),
        },
      };
    }),
  );
}
