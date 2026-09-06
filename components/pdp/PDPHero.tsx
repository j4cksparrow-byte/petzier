"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import PDPGallery from "./PDPGallery";

export default function PDPHero({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const cartItem = {
    wooId: product.wooId,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  const handleAddToCart = () => {
    addItem(cartItem, 1);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(cartItem, 1);
    router.push("/checkout");
  };

  return (
    <section className="pt-16 min-h-screen grid grid-cols-1 lg:grid-cols-2" aria-label={`${product.name} hero`}>
      {/* Image gallery */}
      <PDPGallery
        images={product.images?.length ? product.images : [product.heroImage]}
        name={product.name}
        badge={product.badge}
      />

      {/* Info */}
      <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/40 hover:text-[#211F1B] transition-colors">
            Home
          </Link>
          <span className="text-[#E3DED3] text-xs">/</span>
          <Link href="/products" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/40 hover:text-[#211F1B] transition-colors">
            Products
          </Link>
          <span className="text-[#E3DED3] text-xs">/</span>
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]">
            {product.name}
          </span>
        </nav>

        {/* Dispatch stamp */}
        <div className="flex items-center gap-2 border border-[#E3DED3] w-fit px-3 py-1.5 mb-7 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#211F1B]" />
          <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#211F1B]/60">
            {product.dispatchNote}
          </span>
        </div>

        {/* Name */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#211F1B] leading-[1.08] mb-5 max-w-lg">
          {product.name}
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#211F1B]/60 leading-relaxed mb-10 max-w-md">
          {product.description}
        </p>

        {/* Price block */}
        <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-[#E3DED3]">
          <span className="font-mono text-4xl font-semibold text-[#211F1B]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="font-mono text-lg text-[#211F1B]/40 line-through">
                ${product.originalPrice}
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B] border border-[#211F1B]/30 rounded-full px-2.5 py-1">
                Save ${product.originalPrice - product.price}
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            id={`pdp-add-to-cart-${product.slug}`}
            onClick={handleAddToCart}
            className="flex-1 bg-[#211F1B] text-white py-4 px-8 text-sm font-semibold rounded-full hover:bg-black transition-colors duration-300"
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          <button
            id={`pdp-buy-now-${product.slug}`}
            onClick={handleBuyNow}
            className="flex-1 border border-[#211F1B] text-[#211F1B] py-4 px-8 text-sm font-semibold rounded-full hover:bg-[#211F1B] hover:text-white transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>

        {/* Trust micro-signals */}
        <div className="flex flex-col gap-2.5">
          {["Free shipping Australia-wide", "30-day risk-free returns", "12-month warranty"].map(
            (signal) => (
              <div key={signal} className="flex items-center gap-2">
                <span className="text-[#211F1B]/40 text-xs">◈</span>
                <span className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-[#211F1B]/50">
                  {signal}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
