import Link from "next/link";
import type { Metadata } from "next";
import { fetchWooProducts } from "@/lib/woocommerce";
import ProductsCatalog from "@/components/ProductsCatalog";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shop All Products — Petzier",
  description: "Vet-reviewed pet essentials, dispatched from our Melbourne warehouse.",
};

export default async function ProductsPage() {
  const products = await fetchWooProducts();

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link
              href="/"
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/40 hover:text-[#211F1B] transition-colors"
            >
              Home
            </Link>
            <span className="text-[#E3DED3] text-xs">/</span>
            <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]">
              Products
            </span>
          </nav>

          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
            ✦ Full Catalog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#211F1B] mb-4">
            All products.
          </h1>
          <p className="text-[#211F1B]/60 max-w-lg leading-relaxed">
            Every product we stock, vet-reviewed and dispatched from our Melbourne warehouse.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ProductsCatalog products={products} />
        </div>
      </section>

      <Footer />
    </>
  );
}
