import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const source = fs.readFileSync("public/interaction-events.js", "utf8");
function environment(hostname = "lovegobuytab.com") {
  const events = [],
    listeners = {};
  class Element {
    constructor(href, attrs = {}) {
      this.href = href;
      this.attrs = attrs;
    }
    closest() {
      return this;
    }
    hasAttribute(k) {
      return k in this.attrs;
    }
    getAttribute(k) {
      return this.attrs[k];
    }
  }
  class HTMLFormElement extends Element {
    matches(selector) {
      return selector === ".search-form";
    }
  }
  const context = {
    URL,
    Element,
    HTMLFormElement,
    FormData: class {
      constructor(form) {
        this.form = form;
      }
      get(k) {
        return this.form.attrs[k];
      }
    },
    location: {
      hostname,
      pathname: "/de/articles/lovegobuy-tracking-guide/",
      origin: "https://" + hostname,
      href: "https://" + hostname + "/de/articles/lovegobuy-tracking-guide/",
    },
    document: {
      documentElement: { lang: "de" },
      addEventListener(name, fn) {
        listeners[name] = fn;
      },
    },
    window: {
      gtag(...args) {
        events.push(args);
      },
    },
  };
  vm.runInNewContext(source, context);
  return { events, listeners, Element, HTMLFormElement };
}
const env = environment();
for (const [href, attrs] of [
  ["https://lovegobuytab.com/de/articles/lovegobuy-shipping-time/", {}],
  ["https://lovegobuytab.com/de/products/shoes/3470/", {}],
  [
    "https://lovegobuytab.com/fr/articles/lovegobuy-tracking-guide/",
    { "data-language": "Français fr", hreflang: "fr" },
  ],
  [
    "https://www.lovegobuy.com/product?id=7876894732&shop_type=weidian&invite_code=161CPG",
    {},
  ],
  ["https://www.lovegobuy.com/login/signup", {}],
])
  env.listeners.click({ target: new env.Element(href, attrs) });
env.listeners.submit({
  target: new env.HTMLFormElement("", { q: "private search example" }),
});
assert.deepEqual(
  env.events.map((e) => e[1]),
  [
    "article_open",
    "product_open",
    "language_change",
    "purchase_link_click",
    "signup_click",
    "catalog_search",
  ],
);
for (const [, , fields] of env.events) {
  assert.equal(fields.page_language, "de");
  assert.equal(fields.page_type, "article");
}
assert.equal(env.events[2][2].target_language, "fr");
assert.equal(env.events[3][2].source_platform, "weidian");
assert.equal(env.events[5][2].query_length, 22);
assert.ok(!JSON.stringify(env.events).includes("private search"));
assert.ok(!JSON.stringify(env.events).includes("7876894732"));
assert.ok(!env.events.some((e) => e[1] === "page_view"));
assert.equal(
  Object.keys(
    environment("lovegobuytab-preview.hehaize88.workers.dev").listeners,
  ).length,
  0,
);
console.log(
  "Passed six interaction events, language context, search privacy, no duplicate page views and preview isolation.",
);
