import { SearchIcon, ArrowIcon } from "@/components/Icons";

export default function SearchBox({ compact = false, locale = "en" }) {
  const copy = {
    en: ["Search products, original ID or link", "Search products"],
    "pt-br": ["Pesquisar produto, ID original ou link", "Pesquisar produtos"],
    de: ["Produkt, Original-ID oder Link suchen", "Produkte suchen"],
  }[locale] || ["Search products, original ID or link", "Search products"];
  return (
    <form className={`search-box ${compact ? "search-box-compact" : ""}`} action={`${locale === "en" ? "" : "/" + locale}/catalog/`} method="get">
      <SearchIcon />
      <label className="sr-only" htmlFor={compact ? "catalog-search-small" : "catalog-search"}>{locale === "pt-br" ? "Produto, ID original ou link" : locale === "de" ? "Produkt, Original-ID oder Link" : "Product name, ID or link"}</label>
      <input id={compact ? "catalog-search-small" : "catalog-search"} name="q" type="search" placeholder={copy[0]} />
      <button type="submit"><span>{copy[1]}</span><ArrowIcon /></button>
    </form>
  );
}
