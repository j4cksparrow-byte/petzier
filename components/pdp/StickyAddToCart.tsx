"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

interface StickyAddToCartProps {
  productName: string;
  price: number;
  slug: string;
  image: string;
  wooId?: number;
}

export default function StickyAddToCart({ productName, price, slug, image, wooId }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleBuyNow = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      addItem({ wooId, slug, name: productName, price, image }, 1);
      if (liveRef.current) liveRef.current.textContent = `Proceeding to checkout with ${productName}.`;
      router.push("/checkout");
    }, 250);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" ref={liveRef} />
      <div className="bg-white/95 backdrop-blur-sm border-t border-[#E3DED3] rounded-t-3xl shadow-[0_-8px_24px_rgba(33,31,27,0.10)] px-5 py-4 flex items-center justify-between gap-4">
        {/* Product + price */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[#211F1B] truncate">
            {productName}
          </span>
          <span className="font-mono text-lg font-semibold text-[#211F1B]">
            ${price}
          </span>
        </div>

        {/* CTA — 44px+ target, loading feedback */}
        <button
          id={`sticky-cart-${slug}`}
          onClick={handleBuyNow}
          disabled={loading}
          aria-busy={loading}
          tabIndex={visible ? 0 : -1}
          className="min-h-[44px] rounded-full bg-[#211F1B] text-white px-6 py-3 text-sm font-semibold hover:bg-black transition-colors duration-200 whitespace-nowrap flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#211F1B] disabled:opacity-70"
        >
          {loading ? "Redirecting…" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
