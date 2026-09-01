import type { MetadataRoute } from "next";
import { languages, routeHref, supportedRoutes } from "./site-content";

const SITE_URL = "https://kameymall-sheet.com";
const SITE_LAST_MODIFIED = new Date("2026-09-01T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((language) =>
    supportedRoutes.map((route) => {
      const path = routeHref(language.code, route);
      return {
        url: `${SITE_URL}${path === "/" ? "" : path}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: route === "home" || route === "finds" || route === "articles" ? "weekly" as const : "monthly" as const,
        priority: route === "home" ? 1 : route === "finds" || route === "articles" ? 0.85 : 0.72,
      };
    }),
  );
}
