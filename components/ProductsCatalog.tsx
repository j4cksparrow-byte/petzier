"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

const PAGE_SIZE = 12;

export default function ProductsCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? products.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q))
      : products;

    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    // "featured" keeps the incoming order as-is

    return sorted;
  }, [products, query, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-10">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#211F1B]/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full bg-[#FCFAF6] border border-[#E3DED3] pl-10 pr-4 py-3 text-sm text-[#211F1B] placeholder:text-[#211F1B]/40 focus:outline-none focus:border-[#211F1B]/40 transition-colors"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#211F1B]/70">
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/50 whitespace-nowrap">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOption);
              setVisibleCount(PAGE_SIZE);
            }}
            aria-label="Sort products"
            className="bg-[#FCFAF6] border border-[#E3DED3] px-3 py-2.5 text-sm text-[#211F1B] focus:outline-none focus:border-[#211F1B]/40 transition-colors"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Result count */}
      <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/40 mb-6">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
        {query && <> matching &ldquo;{query}&rdquo;</>}
      </p>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[#211F1B]/60">No products match &ldquo;{query}&rdquo;.</p>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            id="products-load-more"
            className="font-mono text-xs tracking-[0.12em] uppercase bg-[#211F1B] text-white px-8 py-4 hover:bg-black transition-colors duration-300"
          >
            Load More ({filtered.length - visible.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
