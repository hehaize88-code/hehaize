/* First-party interaction names supplement GA4's automatic page_view/click events.
   Do not send search text, account details or full query strings. */
(() => {
  if (location.hostname !== "lovegobuytab.com") return;
  const lang = document.documentElement.lang || "en";
  const path =
    location.pathname.replace(new RegExp("^/" + lang + "(?=/|$)"), "") || "/";
  const pageType = path.startsWith("/products/")
    ? "product"
    : path === "/articles/"
      ? "article_index"
      : path.startsWith("/articles/")
        ? "article"
        : path.startsWith("/spreadsheet/")
          ? "catalog"
          : path === "/faq/"
            ? "faq"
            : path === "/"
              ? "home"
              : "other";
  const send = (name, fields = {}) => {
    if (typeof window.gtag === "function")
      window.gtag("event", name, {
        page_language: lang,
        page_type: pageType,
        transport_type: "beacon",
        ...fields,
      });
  };
  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(".search-form"))
      return;
    const query = String(new FormData(form).get("q") || "").trim();
    if (query)
      send("catalog_search", { query_length: Math.min(query.length, 120) });
  });
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link) return;
    let target;
    try {
      target = new URL(link.href, location.href);
    } catch {
      return;
    }
    if (target.origin === location.origin) {
      if (link.hasAttribute("data-language")) {
        send("language_change", {
          target_language: link.getAttribute("hreflang") || "",
        });
      } else {
        const product = target.pathname.match(/\/products\/([^/]+)\/(\d+)\/?$/);
        const article = target.pathname.match(/\/articles\/([^/]+)\/?$/);
        if (product)
          send("product_open", {
            item_category: product[1],
            item_catalog_id: product[2],
          });
        else if (article) send("article_open", { article_slug: article[1] });
      }
    } else if (
      target.hostname === "www.lovegobuy.com" ||
      target.hostname === "lovegobuy.com"
    ) {
      if (target.pathname === "/product")
        send("purchase_link_click", {
          source_platform: target.searchParams.get("shop_type") || "unknown",
        });
      else if (target.pathname === "/login/signup") send("signup_click");
    }
  });
})();
