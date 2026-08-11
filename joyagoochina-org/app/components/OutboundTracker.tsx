"use client";

import { useEffect } from "react";

type OutboundEvent = {
  event: "outbound_click";
  destination: string;
  source_page: string;
  language: string;
  link_kind: string;
  product_id?: string;
  category?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const emitOutboundEvent = (
  element: HTMLElement,
  destination: string,
) => {
  const payload: OutboundEvent = {
    event: "outbound_click",
    destination,
    source_page: window.location.pathname,
    language: document.documentElement.lang || "en",
    link_kind: element.dataset.outboundKind || "link",
    ...(element.dataset.productId
      ? { product_id: element.dataset.productId }
      : {}),
    ...(element.dataset.category
      ? { category: element.dataset.category }
      : {}),
  };

  window.dataLayer ??= [];
  window.dataLayer.push(payload);
  window.dispatchEvent(
    new CustomEvent("joyagoo:outbound-click", { detail: payload }),
  );

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/outbound-click",
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );
  }
};

export default function OutboundTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>(
        "a[data-outbound-kind]",
      );
      if (!link) return;
      emitOutboundEvent(link, link.href);
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.dataset.outboundKind) return;
      emitOutboundEvent(form, form.action);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
