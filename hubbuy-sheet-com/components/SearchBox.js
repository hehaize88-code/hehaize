import { SearchIcon, ArrowIcon } from "@/components/Icons";

export default function SearchBox({ compact = false, locale = "en" }) {
  return (
    <form className={`search-box ${compact ? "search-box-compact" : ""}`} action={`${locale === "en" ? "" : "/" + locale}/catalog/`} method="get">
      <SearchIcon />
      <label className="sr-only" htmlFor={compact ? "catalog-search-small" : "catalog-search"}>Search live product catalog</label>
      <input id={compact ? "catalog-search-small" : "catalog-search"} name="q" type="search" placeholder="Search products, source ID or link" />
      <button type="submit"><span>Search live catalog</span><ArrowIcon /></button>
    </form>
  );
}
