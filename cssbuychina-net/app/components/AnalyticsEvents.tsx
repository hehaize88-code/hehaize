"use client";

import { useEffect } from "react";

type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(eventName: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    ...parameters,
    page_path: window.location.pathname,
    transport_type: "beacon",
  });
}

export function AnalyticsEvents() {
  useEffect(() => {
    function trackLinkClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-track-event]");
      if (!link?.dataset.trackEvent) return;

      let linkDomain = "";
      try {
        linkDomain = new URL(link.href, window.location.href).hostname;
      } catch {
        linkDomain = "";
      }

      const parameters: Record<string, AnalyticsValue> = {
        link_url: link.href,
        link_domain: linkDomain,
        click_area: link.dataset.clickArea ?? "link",
      };

      if (link.dataset.itemId) parameters.item_id = link.dataset.itemId;
      if (link.dataset.itemName) parameters.item_name = link.dataset.itemName;
      if (link.dataset.itemCategory) parameters.item_category = link.dataset.itemCategory;
      if (link.dataset.searchLocation) parameters.search_location = link.dataset.searchLocation;

      trackAnalyticsEvent(link.dataset.trackEvent, parameters);
    }

    document.addEventListener("click", trackLinkClick, { capture: true });
    return () => document.removeEventListener("click", trackLinkClick, { capture: true });
  }, []);

  return null;
}
