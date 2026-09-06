import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const HOMEPAGE_PREVIEW_COUNT = 8;

export default function ProductGrid({ products }: { products: Product[] }) {
  const preview = products.slice(0, HOMEPAGE_PREVIEW_COUNT);
  const hasMore = products.length > preview.length;

  return (
    <section id="products" className="py-20 md:py-28 bg-[#F1ECE3]" aria-label="Products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 pb-6">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
              ✦ The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#211F1B]">
              Vet-reviewed pet tech.
              <br />
              <span className="italic">Zero compromises.</span>
            </h2>
          </div>
          <p className="hidden md:block text-sm text-[#211F1B]/50 max-w-[220px] text-right leading-relaxed">
            Every product is vet-reviewed and ships from our Melbourne warehouse.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {preview.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              id="products-view-all"
              className="inline-flex items-center justify-center font-mono text-xs tracking-[0.12em] uppercase bg-[#211F1B] text-white px-8 py-4 hover:bg-black transition-colors duration-300"
            >
              Shop All {products.length} Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
