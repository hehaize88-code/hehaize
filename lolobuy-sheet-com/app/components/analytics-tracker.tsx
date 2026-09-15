"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, parameters: Record<string, string | number>) {
  window.gtag?.("event", name, parameters);
}

function cleanPath(href: string) {
  try {
    const url = new URL(href, window.location.href);
    return `${url.pathname}${url.search}`.slice(0, 180);
  } catch {
    return "unknown";
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || !form.matches("form.product-search")) {
        return;
      }

      const query = new FormData(form).get("q");
      sendEvent("search_submit", {
        query_length: typeof query === "string" ? query.trim().length : 0,
        page_path: window.location.pathname,
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const linkPath = cleanPath(link.href);
      if (link.closest(".article-card")) {
        sendEvent("article_click", {
          article_path: linkPath,
          page_path: window.location.pathname,
        });
      }

      if (link.matches(".find-link")) {
        sendEvent("product_click", {
          product_name: link.getAttribute("aria-label")?.replace(/^View | on the main site$/g, "").trim().slice(0, 100) || "unknown",
          destination_path: linkPath,
        });
      }

      if (link.matches(".edit-card")) {
        sendEvent("category_click", {
          category_name: link.textContent?.replace("→", "").trim().slice(0, 80) || "unknown",
          destination_path: linkPath,
        });
      }

      try {
        const destination = new URL(link.href);
        if (destination.hostname === "www.cnbuycha.com") {
          sendEvent("outbound_main_site", {
            destination_path: `${destination.pathname}${destination.search}`.slice(0, 180),
            source_path: window.location.pathname,
          });
        }
      } catch {}
    };

    const onChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement) || !target.closest(".language-picker")) {
        return;
      }
      sendEvent("language_change", {
        language: target.value,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("change", onChange, true);

    return () => {
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("change", onChange, true);
    };
  }, []);

  return null;
}
