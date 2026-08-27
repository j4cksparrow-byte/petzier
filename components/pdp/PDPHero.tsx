"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export default function PDPHero({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, quantity: 1 }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert(data.error || "Failed to initiate checkout");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to checkout server.");
      setLoading(false);
    }
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
            onClick={handleCheckout}
            disabled={loading}
            className="flex-1 bg-[#4A5842] text-[#EDE8DE] py-4 px-8 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Connecting to Checkout..." : "Add to Cart"}
          </button>
          <button
            id={`pdp-buy-now-${product.slug}`}
            onClick={handleCheckout}
            disabled={loading}
            className="flex-1 bg-[#A8503E] text-[#EDE8DE] py-4 px-8 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Buy Now"}
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
