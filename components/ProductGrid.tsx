"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(
      {
        wooId: product.wooId,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group reveal flex flex-col bg-[#FAF7F1] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 ease-out">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative overflow-hidden block aspect-[4/3] m-2 rounded-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.12em] uppercase rounded-full bg-[#22211E]/85 backdrop-blur-sm text-[#FAF7F1] px-3 py-1.5">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="px-5 pt-4 pb-6 flex flex-col flex-1">
        {/* Dispatch stamp */}
        <div className="flex items-center gap-1.5 w-fit mb-3">
          <span className="w-1 h-1 rounded-full bg-[#B8863E]" />
          <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-[#22211E]/50">
            {product.dispatchNote}
          </span>
        </div>

        {/* Name + tagline */}
        <h3 className="font-serif text-xl text-[#22211E] leading-snug mb-1.5">
          <Link href={`/products/${product.slug}`} className="hover:text-[#4A5842] transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-[#22211E]/60 leading-relaxed mb-5 flex-1">
          {product.tagline}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="font-mono text-xl font-semibold text-[#22211E]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-[#22211E]/40 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            id={`product-card-cta-${product.slug}`}
            className="font-mono text-[0.7rem] tracking-[0.1em] uppercase rounded-full bg-[#22211E] text-[#FAF7F1] px-5 py-3 hover:bg-[#4A5842] transition-colors duration-300 font-semibold min-w-[7.5rem] text-center"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const elements = Array.from(node.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    // Safety net: some mobile browsers (backgrounded tabs, in-app
    // webviews, older Safari) can fail to fire IntersectionObserver
    // callbacks reliably. Product cards must never stay permanently
    // invisible because of a scroll animation — force them visible after
    // a short delay no matter what.
    const fallback = setTimeout(() => {
      elements.forEach((el) => el.classList.add("visible"));
    }, 1000);

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("visible"));
      clearTimeout(fallback);
      return;
    }

    // Observe each card individually (not the whole grid) — with dozens
    // of products the grid can be many screens tall, and a single
    // "10% of the grid is visible" threshold on the container could take
    // several screens of scrolling to satisfy, making cards appear to
    // never load on mobile.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [products]);

  return (
    <section id="products" className="py-20 md:py-28 bg-[#EDE8DE]" aria-label="Products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 pb-6">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#B8863E] mb-3">
              ✦ The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#22211E]">
              Five products.
              <br />
              <span className="italic">Zero compromises.</span>
            </h2>
          </div>
          <p className="hidden md:block text-sm text-[#22211E]/50 max-w-[220px] text-right leading-relaxed">
            Every product is vet-reviewed and ships from our Melbourne warehouse.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
