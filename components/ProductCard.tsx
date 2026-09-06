"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Fade-in-on-scroll: each card observes itself, so this works no matter
  // which grid/list it's rendered inside (homepage teaser, full catalog, …).
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    // Safety net: some mobile browsers (backgrounded tabs, in-app webviews,
    // older Safari) can fail to fire IntersectionObserver callbacks reliably.
    // A card must never stay permanently invisible because of this animation.
    const fallback = setTimeout(() => node.classList.add("visible"), 1000);

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("visible");
      clearTimeout(fallback);
      return;
    }

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
    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

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
    <article
      ref={cardRef}
      className="group reveal flex flex-col bg-[#FCFAF6] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 ease-out"
    >
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
          <span className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.12em] uppercase rounded-full bg-[#211F1B]/85 backdrop-blur-sm text-white px-3 py-1.5">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="px-5 pt-4 pb-6 flex flex-col flex-1 min-w-0">
        {/* Dispatch stamp */}
        <div className="flex items-center gap-1.5 w-fit mb-3">
          <span className="w-1 h-1 rounded-full bg-[#211F1B]/40" />
          <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-[#211F1B]/50">
            {product.dispatchNote}
          </span>
        </div>

        {/* Name + tagline — clamped so long raw supplier titles can't blow out card height */}
        <h3 className="font-serif text-xl text-[#211F1B] leading-snug mb-1.5 line-clamp-2 min-h-[2.6em]">
          <Link href={`/products/${product.slug}`} className="hover:text-[#211F1B]/70 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-[#211F1B]/60 leading-relaxed mb-5 flex-1 line-clamp-2">
          {product.tagline}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="font-mono text-xl font-semibold text-[#211F1B] whitespace-nowrap">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-[#211F1B]/40 line-through ml-2 whitespace-nowrap">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            id={`product-card-cta-${product.slug}`}
            className="shrink-0 font-mono text-[0.7rem] tracking-[0.1em] uppercase rounded-full bg-[#211F1B] text-white px-5 py-3 hover:bg-black transition-colors duration-300 font-semibold min-w-[7.5rem] text-center"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
