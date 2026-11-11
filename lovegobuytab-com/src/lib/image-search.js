import {
  acceptsImage,
  fingerprint,
  rankProducts,
  validProduct,
  selectResults,
  safeImageURL,
} from "./image-search-core.mjs";
import { productTitle } from "./product-title";

const app = document.querySelector("[data-visual-app]");
if (app) initialize();
function initialize() {
  const lang = document.documentElement.lang || "en";
  const labels = JSON.parse(
    document.querySelector("[data-visual-ui]").textContent,
  );
  const byId = (id) => document.getElementById("image-" + id);
  const input = byId("file"),
    drop = byId("drop"),
    status = byId("status"),
    results = byId("results");
  const preview = byId("preview"),
    controls = byId("controls"),
    focus = byId("focus"),
    crop = byId("crop-overlay");
  const retry = byId("retry"),
    reset = byId("reset"),
    cancel = byId("cancel"),
    progress = byId("progress"),
    more = byId("more"),
    note = byId("result-note");
  let sequence = 0,
    objectUrl = null,
    currentImage = null,
    indexData = null,
    controller = null,
    ranked = [],
    visible = 20;
  function busy(value) {
    app.setAttribute("aria-busy", String(value));
    results.setAttribute("aria-busy", String(value));
    cancel.hidden = progress.hidden = !value;
    retry.disabled = value || !currentImage;
  }
  function clearResults() {
    ranked = [];
    results.replaceChildren();
    note.hidden = more.hidden = true;
  }
  function release() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
    currentImage = null;
    preview.removeAttribute("src");
  }
  function invalidate() {
    sequence++;
    controller?.abort();
    controller = null;
  }
  function stop() {
    invalidate();
    busy(false);
    status.textContent = labels.cancelled;
  }
  function renderResults() {
    const fragment = document.createDocumentFragment();
    for (const { p } of ranked.slice(0, visible)) {
      const name = productTitle(p.title, lang);
      const article = document.createElement("article");
      article.className = "product-card";
      const link = document.createElement("a");
      link.className = "visual-result-link";
      const match = p.path.match(/^\/([a-z0-9-]+)\/(\d+)\.html$/);
      link.href =
        (lang === "en" ? "" : "/" + lang) +
        `/products/${match[1]}/${match[2]}/`;
      const img = document.createElement("img");
      img.src = safeImageURL(p.image);
      img.alt = name;
      img.width = 400;
      img.height = 400;
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      const imageWrap = document.createElement("div");
      imageWrap.className = "visual-result-image";
      imageWrap.append(img);
      const heading = document.createElement("h3");
      heading.textContent = name;
      const price = document.createElement("strong");
      price.className = "visual-result-price";
      const value = Number(String(p.price).replace(/[$,\s]/g, ""));
      if (String(p.price).trim() && Number.isFinite(value) && value >= 0) {
        price.dataset.moneyUsd = String(value);
        price.textContent = new Intl.NumberFormat(lang, {
          style: "currency",
          currency: "USD",
        }).format(value);
      }
      const caption = document.createElement("div");
      caption.className = "visual-result-copy";
      caption.append(heading, price);
      link.append(imageWrap, caption);
      article.append(link);
      fragment.append(article);
    }
    results.replaceChildren(fragment);
    more.hidden = visible >= ranked.length;
    more.textContent = `${labels.more} (${Math.max(0, ranked.length - visible)} ${labels.remaining})`;
    document.dispatchEvent(new Event("lovegobuy:prices-refresh"));
  }
  async function loadIndex(signal) {
    if (indexData) return indexData;
    const response = await fetch("/assets/catalog-image-index.json", {
      signal,
    });
    if (!response.ok) throw Error("index");
    const data = await response.json();
    if (
      data?.source !== "https://cnbuycha.com" ||
      !Array.isArray(data.products) ||
      data.products.length > 50000
    )
      throw Error("index");
    const products = data.products.filter(validProduct);
    if (!products.length) throw Error("index");
    return (indexData = {
      products,
      updatedAt: /^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt)
        ? data.updatedAt
        : "",
    });
  }
  async function compare() {
    if (!currentImage) return;
    invalidate();
    const turn = sequence,
      image = currentImage;
    const abort = new AbortController();
    controller = abort;
    const timeout = setTimeout(() => abort.abort(), 20000);
    clearResults();
    busy(true);
    crop.hidden = focus.value !== "center";
    try {
      status.textContent = labels.comparing;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (turn !== sequence) return;
      const query = fingerprint(image, focus.value);
      if (query.variation < 3) {
        status.textContent = labels.blank;
        return;
      }
      status.textContent = labels.loading;
      const index = await loadIndex(abort.signal);
      if (turn !== sequence) return;
      status.textContent = labels.comparing;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (turn !== sequence) return;
      const selected = selectResults(rankProducts(query, index.products, 60));
      ranked = selected.items;
      visible = 20;
      renderResults();
      note.textContent = selected.weak ? labels.weak : labels.note;
      note.classList.toggle("visual-weak", selected.weak);
      note.hidden = false;
      status.textContent = `${ranked.length} ${labels.results} · ${index.products.length.toLocaleString(lang)} ${labels.count}${index.updatedAt ? " · " + labels.date + ": " + new Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(new Date(index.updatedAt + "T12:00:00Z")) : ""}`;
    } catch {
      if (turn === sequence) status.textContent = labels.index;
    } finally {
      clearTimeout(timeout);
      if (turn === sequence) {
        controller = null;
        busy(false);
      }
    }
  }
  async function choose(file) {
    if (!file) return;
    invalidate();
    const turn = sequence;
    clearResults();
    release();
    controls.hidden = true;
    focus.value = "full";
    crop.hidden = true;
    input.value = "";
    if (!acceptsImage(file)) {
      busy(false);
      status.textContent = labels.file;
      return;
    }
    busy(true);
    status.textContent = labels.reading;
    const url = URL.createObjectURL(file),
      img = new Image();
    objectUrl = url;
    img.src = url;
    let timer;
    try {
      await Promise.race([
        img.decode(),
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(Error("decode")), 15000);
        }),
      ]);
      if (turn !== sequence) return;
      if (img.naturalWidth * img.naturalHeight > 40000000) {
        release();
        status.textContent = labels.large;
        busy(false);
        return;
      }
      currentImage = img;
      preview.src = url;
      controls.hidden = false;
      await compare();
    } catch {
      if (turn === sequence) {
        release();
        busy(false);
        status.textContent = labels.readError;
      }
    } finally {
      clearTimeout(timer);
    }
  }
  input.addEventListener("change", () => choose(input.files[0]));
  drop.addEventListener("dragover", (e) => {
    if ([...e.dataTransfer.types].includes("Files")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      drop.classList.add("is-dragging");
    }
  });
  drop.addEventListener("dragleave", (e) => {
    if (!drop.contains(e.relatedTarget)) drop.classList.remove("is-dragging");
  });
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("is-dragging");
    choose(e.dataTransfer.files[0]);
  });
  document.addEventListener("paste", (e) => {
    if (
      e.target?.closest(
        'input:not([type="file"]),textarea,[contenteditable="true"]',
      )
    )
      return;
    const item = [...(e.clipboardData?.items || [])].find(
      (x) => x.kind === "file" && x.type.startsWith("image/"),
    );
    if (item) {
      e.preventDefault();
      choose(item.getAsFile());
    }
  });
  retry.addEventListener("click", compare);
  focus.addEventListener("change", compare);
  cancel.addEventListener("click", stop);
  reset.addEventListener("click", () => {
    invalidate();
    clearResults();
    release();
    controls.hidden = true;
    input.value = "";
    focus.value = "full";
    crop.hidden = true;
    busy(false);
    status.textContent = labels.empty;
    input.focus();
  });
  more.addEventListener("click", () => {
    visible += 20;
    renderResults();
  });
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;
    invalidate();
    release();
  });
  busy(false);
}
