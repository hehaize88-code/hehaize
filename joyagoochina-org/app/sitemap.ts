import type { MetadataRoute } from "next";
import { products } from "./data";
import { languages } from "./i18n";
import {
  seoArticleDates,
  seoArticleSlugs,
} from "./seoArticleLibrary";
import { localizedRoutePath } from "./seoAlternates";

const site = "https://joyagoochina.org";
const siteTemplateModifiedAt = "2026-08-11";

type SitemapPage = {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: SitemapPage[] = [
    {
      path: "/",
      lastModified: "2026-08-27",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: "/spreadsheet/",
      lastModified: "2026-07-30",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/categories/",
      lastModified: "2026-07-30",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/faq/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/guides/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/how-to-buy/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/qc-guide/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/shipping-guide/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/returns/",
      lastModified: "2026-07-29",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/about/",
      lastModified: "2026-07-27",
      changeFrequency: "yearly",
      priority: 0.55,
    },
    {
      path: "/editorial-policy/",
      lastModified: "2026-07-27",
      changeFrequency: "yearly",
      priority: 0.55,
    },
    {
      path: "/privacy/",
      lastModified: "2026-07-27",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      path: "/terms/",
      lastModified: "2026-07-27",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      path: "/articles/",
      lastModified: "2026-08-27",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...seoArticleSlugs.map((slug) => ({
      path: `/${slug}/`,
      lastModified: seoArticleDates[slug].modifiedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...products.map((item) => ({
      path: `/product/${item.slug}/`,
      lastModified: item.checkedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return languages.flatMap((language) =>
    pages.map((page) => {
      const localizedPath = localizedRoutePath(language.code, page.path);
      return {
        url: `${site}${localizedPath}`,
        lastModified: new Date(
          page.lastModified > siteTemplateModifiedAt
            ? page.lastModified
            : siteTemplateModifiedAt,
        ),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            [
              ...languages.map(
                (alternateLanguage) =>
                  [
                    alternateLanguage.code,
                    `${site}${localizedRoutePath(
                      alternateLanguage.code,
                      page.path,
                    )}`,
                  ] as const,
              ),
              ["x-default", `${site}${localizedRoutePath("en", page.path)}`],
            ],
          ),
        },
      };
    }),
  );
}
