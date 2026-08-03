import type { MetadataRoute } from "next";
import { languages, routeHref, supportedRoutes } from "./site-content";

const SITE_URL = "https://kameymall-sheet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((language) =>
    supportedRoutes.map((route) => {
      const path = routeHref(language.code, route);
      return {
        url: `${SITE_URL}${path === "/" ? "" : path}`,
        lastModified: new Date("2026-08-03T00:00:00Z"),
        changeFrequency: route === "home" || route === "finds" || route === "articles" ? "weekly" as const : "monthly" as const,
        priority: route === "home" ? 1 : route === "finds" || route === "articles" ? 0.85 : 0.72,
      };
    }),
  );
}
