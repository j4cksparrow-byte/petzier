"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

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
      {/* Image */}
      <div className="relative min-h-[50vh] lg:min-h-screen overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {product.badge && (
          <span className="absolute top-6 left-6 font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-[#4A5842] text-[#EDE8DE] px-2.5 py-1.5 z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#22211E]/40 hover:text-[#22211E] transition-colors">
            Home
          </Link>
          <span className="text-[#B5A48C] text-xs">/</span>
          <Link href="/#products" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#22211E]/40 hover:text-[#22211E] transition-colors">
            Products
          </Link>
          <span className="text-[#B5A48C] text-xs">/</span>
          <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#22211E]">
            {product.name}
          </span>
        </nav>

        {/* Dispatch stamp */}
        <div className="flex items-center gap-2 border border-[#B5A48C] w-fit px-3 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A5842]" />
          <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#22211E]/60">
            {product.dispatchNote}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#22211E] leading-[1.05] mb-3">
          {product.name}
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#22211E]/60 leading-relaxed mb-8 max-w-md">
          {product.description}
        </p>

        {/* Price block */}
        <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-[#B5A48C]">
          <span className="font-mono text-4xl font-semibold text-[#22211E]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="font-mono text-lg text-[#22211E]/40 line-through">
                ${product.originalPrice}
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#A8503E] border border-[#A8503E] px-2 py-0.5">
                Save ${product.originalPrice - product.price}
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            id={`pdp-add-to-cart-${product.slug}`}
            onClick={handleAddToCart}
            className="flex-1 bg-[#4A5842] text-[#EDE8DE] py-4 px-8 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300"
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          <button
            id={`pdp-buy-now-${product.slug}`}
            onClick={handleBuyNow}
            className="flex-1 bg-[#A8503E] text-[#EDE8DE] py-4 px-8 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>

        {/* Trust micro-signals */}
        <div className="flex flex-col gap-2">
          {["Free shipping Australia-wide", "30-day risk-free returns", "12-month warranty"].map(
            (signal) => (
              <div key={signal} className="flex items-center gap-2">
                <span className="text-[#4A5842] text-xs">◈</span>
                <span className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-[#22211E]/50">
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
