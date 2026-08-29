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
    <article className="group reveal flex flex-col bg-[#EDE8DE]">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative overflow-hidden block aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-[#4A5842] text-[#EDE8DE] px-2.5 py-1.5">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Card body */}
      <div className="pt-5 pb-6 flex flex-col flex-1">
        {/* Dispatch stamp */}
        <div className="flex items-center gap-1.5 border border-[#B5A48C] inline-flex w-fit px-2 py-1 mb-4">
          <span className="w-1 h-1 rounded-full bg-[#4A5842]" />
          <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-[#22211E]/60">
            {product.dispatchNote}
          </span>
        </div>

        {/* Name + tagline */}
        <h3 className="text-lg font-bold tracking-tight text-[#22211E] leading-snug mb-1">
          <Link href={`/products/${product.slug}`} className="hover:text-[#4A5842] transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-[#22211E]/60 leading-relaxed mb-5 flex-1">
          {product.tagline}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between">
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
            className="font-mono text-[0.7rem] tracking-[0.1em] uppercase bg-[#A8503E] text-[#EDE8DE] px-4 py-2.5 hover:bg-[#22211E] transition-colors duration-300 font-semibold min-w-[7.5rem] text-center"
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".reveal");
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("visible");
              }, i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="py-20 md:py-28" aria-label="Products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 border-b border-[#B5A48C] pb-6">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
              ◈ The Collection
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#22211E]">
              Five products.
              <br />
              Zero compromises.
            </h2>
          </div>
          <p className="hidden md:block text-sm text-[#22211E]/50 max-w-[220px] text-right leading-relaxed">
            Every product is vet-reviewed and ships from our Melbourne warehouse.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
