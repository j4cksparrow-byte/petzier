import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const MAX_RELATED = 4;

export default function RelatedProducts({
  products,
  currentSlug,
}: {
  products: Product[];
  currentSlug: string;
}) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, MAX_RELATED);
  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white" aria-label="You may also like">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-14 pdp-reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
            ◈ Keep exploring
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#211F1B] max-w-lg">
            You may also like.
          </h2>
        </div>

        {/* ProductCard drives its own scroll-reveal (see its IntersectionObserver
            effect) — the same pattern used on the homepage grid — so this stays
            a plain grid rather than the pdp-stagger-grid GSAP wrapper used
            elsewhere on this page, which would double-animate each card. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {related.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
