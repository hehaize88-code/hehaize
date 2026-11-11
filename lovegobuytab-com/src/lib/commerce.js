(() => {
  const root = document.documentElement;
  const lang = root.lang || "en";
  const settings = document.querySelector("[data-commerce]");
  if (!settings) return;
  const labels = JSON.parse(settings.textContent);
  const selectors = [...document.querySelectorAll("[data-currency-select]")];
  const allowed = new Set(
    selectors[0] ? [...selectors[0].options].map((o) => o.value) : ["USD"],
  );
  const key = "lovegobuy:currency:v1",
    rateKey = "lovegobuy:rates:v1";
  const get = (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  };
  const set = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  };
  let currency = get(key) || "USD";
  if (!allowed.has(currency)) currency = "USD";
  let rates = null,
    failed = false;
  function valid(data) {
    return (
      data?.result === "success" &&
      data.base_code === "USD" &&
      data.rates?.USD === 1 &&
      Number.isFinite(data.time_last_update_unix) &&
      data.time_last_update_unix * 1000 <= Date.now() + 3600000 &&
      Date.now() - data.time_last_update_unix * 1000 < 72 * 3600000
    );
  }
  try {
    const stored = JSON.parse(get(rateKey));
    if (valid(stored)) rates = stored;
  } catch {}
  function render() {
    const available =
      currency === "USD" ||
      (rates &&
        Number.isFinite(rates.rates[currency]) &&
        rates.rates[currency] > 0);
    const displayed = available ? currency : "USD";
    const rate = displayed === "USD" ? 1 : rates.rates[displayed];
    for (const element of document.querySelectorAll("[data-money-usd]")) {
      const cny = element.dataset.moneyCny;
      const canConvertCny =
        rates && Number.isFinite(rates.rates.CNY) && rates.rates.CNY > 0;
      const value =
        cny != null
          ? Number(cny) / (canConvertCny ? rates.rates.CNY : 1)
          : Number(element.dataset.moneyUsd);
      const unit = cny != null && !canConvertCny ? "CNY" : displayed;
      const formatter = new Intl.NumberFormat(lang, {
        style: "currency",
        currency: unit,
      });
      const multiplier = unit === "CNY" && !canConvertCny ? 1 : rate;
      if (Number.isFinite(value))
        element.textContent = formatter.format(value * multiplier);
      const max = Number(element.dataset.moneyCnyMax);
      if (cny != null && max > Number(cny))
        element.textContent +=
          " – " +
          formatter.format(
            (max / (canConvertCny ? rates.rates.CNY : 1)) * multiplier,
          );
      if (element.closest("[data-detail-money]"))
        for (const code of document.querySelectorAll("[data-currency-code]"))
          code.textContent = unit;
    }
    for (const selector of selectors) selector.value = displayed;
    for (const notice of document.querySelectorAll("[data-rate-status]")) {
      notice.textContent =
        failed || !available
          ? labels.rateUnavailable
          : rates
            ? `${labels.rateDate}: ${new Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(rates.time_last_update_unix * 1000)}`
            : "";
    }
  }
  for (const selector of selectors)
    selector.addEventListener("change", () => {
      currency = selector.value;
      set(key, currency);
      render();
    });
  render();
  // The provider updates daily. Cache one response per visitor for 24 hours.
  if (!rates || Date.now() - Number(get(rateKey + ":at")) > 24 * 3600000) {
    fetch("https://open.er-api.com/v6/latest/USD", {
      signal: AbortSignal.timeout(8000),
    })
      .then((r) => {
        if (!r.ok) throw Error("rates");
        return r.json();
      })
      .then((data) => {
        if (!valid(data)) throw Error("rates");
        rates = data;
        set(rateKey, JSON.stringify(data));
        set(rateKey + ":at", String(Date.now()));
        render();
      })
      .catch(() => {
        failed = !rates;
        render();
      });
  }
  for (const button of document.querySelectorAll("[data-copy-weidian]"))
    button.addEventListener("click", async () => {
      const status = document.querySelector("[data-copy-status]");
      const field = document.querySelector("[data-original-link]");
      try {
        if (navigator.clipboard?.writeText)
          await navigator.clipboard.writeText(button.dataset.copyWeidian);
        else {
          field.hidden = false;
          field.select();
          if (!document.execCommand("copy")) throw Error("clipboard");
          field.hidden = true;
        }
        status.textContent = labels.copied;
      } catch {
        status.textContent = labels.copyFailed;
        field.hidden = false;
        field.focus();
        field.select();
      }
    });
  const dialog = document.querySelector("[data-photo-dialog]");
  const main = document.querySelector("#product-main-image");
  const counter = document.querySelector("[data-photo-index]");
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-photo-src]");
    if (!button) return;
    if (!main) return;
    main.src = button.dataset.photoSrc;
    main.alt = button.querySelector("img")?.alt || main.alt;
    document
      .querySelectorAll("[data-photo-src]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    if (counter) counter.textContent = button.dataset.photoIndex || "";
    const total = document.querySelector("[data-photo-total]");
    if (total) total.hidden = !button.hasAttribute("data-catalog-photo");
    const selected = document.querySelector("[data-selected-style]");
    const money = document.querySelector(
      "[data-detail-money] [data-money-usd]",
    );
    if (button.hasAttribute("data-catalog-photo")) {
      if (selected) selected.textContent = "";
      if (money) {
        delete money.dataset.moneyCny;
        delete money.dataset.moneyCnyMax;
      }
    } else {
      if (selected)
        selected.textContent = `${labels.styles}: ${button.dataset.styleName || ""}`;
      if (money && Number(button.dataset.styleCny) > 0) {
        money.dataset.moneyCny = button.dataset.styleCny;
        money.dataset.moneyCnyMax = button.dataset.styleCnyMax;
      } else if (money) {
        delete money.dataset.moneyCny;
        delete money.dataset.moneyCnyMax;
      }
    }
    render();
  });
  const styleSection = document.querySelector("[data-style-product]");
  if (styleSection) {
    const grid = styleSection.querySelector("[data-style-grid]");
    const empty = styleSection.querySelector("[data-styles-empty]");
    const loading = styleSection.querySelector("[data-style-loading]");
    const id = styleSection.dataset.styleProduct;
    const load = /^\d{5,20}$/.test(id)
      ? fetch(`/api/styles/${id}.json`, {
          signal: AbortSignal.timeout(16000),
        }).then((r) => {
          if (!r.ok) throw Error("styles");
          return r.json();
        })
      : Promise.resolve({ styles: [] });
    load
      .then((data) => {
        const styles = Array.isArray(data.styles) ? data.styles : [];
        styles.slice(0, 240).forEach((style, i) => {
          const url = new URL(style.image);
          if (url.protocol !== "https:" || url.hostname !== "si.geilicdn.com")
            return;
          const button = document.createElement("button");
          button.type = "button";
          button.dataset.photoSrc = url.href;
          button.dataset.styleName = String(style.name || i + 1);
          button.dataset.styleCny = style.priceCny ?? "";
          button.dataset.styleCnyMax = style.priceCnyMax ?? "";
          button.setAttribute(
            "aria-label",
            `${labels.styles}: ${style.name || i + 1}`,
          );
          button.setAttribute("aria-pressed", "false");
          const image = document.createElement("img");
          image.src = url.href;
          image.alt = `${labels.styles} ${style.name || i + 1}`;
          image.width = 80;
          image.height = 80;
          image.loading = "lazy";
          image.referrerPolicy = "no-referrer";
          image.draggable = false;
          button.append(image);
          grid.append(button);
        });
        grid.hidden = !grid.children.length;
        empty.hidden = !!grid.children.length;
        styleSection.querySelector("[data-style-count]").textContent = String(
          grid.children.length,
        );
      })
      .catch(() => {
        empty.hidden = false;
      })
      .finally(() => {
        loading.hidden = true;
      });
  }
  document
    .querySelector("[data-enlarge-main]")
    ?.addEventListener("click", () => {
      if (!dialog || !main) return;
      dialog.querySelector("img").src = main.src;
      dialog.querySelector("img").alt = main.alt;
      dialog.showModal();
    });
  document
    .querySelector("[data-photo-close]")
    ?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Wheel, touch and mouse drag all work in the bounded thumbnail pane.
  for (const pane of document.querySelectorAll("[data-drag-scroll]")) {
    let drag = null,
      moved = false;
    pane.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { y: e.clientY, top: pane.scrollTop, id: e.pointerId };
      moved = false;
    });
    pane.addEventListener("pointermove", (e) => {
      if (!drag) return;
      if (Math.abs(e.clientY - drag.y) > 5) {
        moved = true;
        pane.setPointerCapture(drag.id);
        pane.scrollTop = drag.top - (e.clientY - drag.y);
      }
    });
    pane.addEventListener("pointerup", () => {
      drag = null;
    });
    pane.addEventListener("pointercancel", () => {
      drag = null;
      moved = false;
    });
    pane.addEventListener("pointerleave", () => {
      if (!moved) drag = null;
    });
    pane.addEventListener(
      "click",
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      true,
    );
    pane.addEventListener("dragstart", (e) => e.preventDefault());
  }
})();
