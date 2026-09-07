"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import PDPGallery from "./PDPGallery";
import StarRating from "./StarRating";

const TRUST_SIGNALS = [
  { icon: Truck, label: "Free shipping Australia-wide" },
  { icon: RotateCcw, label: "30-day risk-free returns" },
  { icon: ShieldCheck, label: "12-month warranty" },
];

export default function PDPHero({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const reviewCount = product.reviews.length;
  const avgRating = reviewCount
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;

  const cartItem = {
    wooId: product.wooId,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  const handleAddToCart = () => {
    addItem(cartItem, qty);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(cartItem, qty);
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
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#211F1B] leading-[1.08] mb-4 max-w-lg">
          {product.name}
        </h1>

        {/* Social proof — pulled up next to the name so trust signal is
            visible before scrolling, instead of only appearing in the
            reviews section at the bottom of the page. */}
        {reviewCount > 0 && (
          <a
            href="#reviews"
            className="flex items-center gap-2.5 w-fit mb-6 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#211F1B] rounded-sm"
          >
            <StarRating rating={Math.round(avgRating)} size={14} />
            <span className="text-sm text-[#211F1B]/70 group-hover:text-[#211F1B] transition-colors underline underline-offset-4 decoration-[#E3DED3]">
              {avgRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </a>
        )}

        {/* Tagline */}
        <p className="text-lg text-[#211F1B]/60 leading-relaxed mb-10 max-w-md">
          {product.description}
        </p>

        {/* Price block */}
        <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-[#E3DED3]">
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

        {/* Quantity + CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div
            className="flex items-center justify-between sm:justify-center gap-1 border border-[#E3DED3] rounded-full px-2 py-2 sm:w-auto"
            role="group"
            aria-label="Quantity"
          >
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#211F1B] hover:bg-[#F1ECE3] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Minus size={15} strokeWidth={2} />
            </button>
            <span
              className="font-mono text-sm font-medium text-[#211F1B] w-6 text-center tabular-nums"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              disabled={qty >= 10}
              aria-label="Increase quantity"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#211F1B] hover:bg-[#F1ECE3] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Plus size={15} strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 gap-3">
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
        </div>

        {/* Trust micro-signals */}
        <div className="flex flex-col gap-3">
          {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={15} strokeWidth={1.75} className="text-[#211F1B]/50 shrink-0" aria-hidden="true" />
              <span className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-[#211F1B]/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
