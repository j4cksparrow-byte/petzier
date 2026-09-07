"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const cartItem = { wooId, slug, name: productName, price, image };

  const handleAddToCart = () => {
    addItem(cartItem, 1);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      addItem(cartItem, 1);
      if (liveRef.current) liveRef.current.textContent = `Proceeding to checkout with ${productName}.`;
      router.push("/checkout");
    }, 250);
  };

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" ref={liveRef} />

      {/* Mobile — fixed bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <div className="bg-white/95 backdrop-blur-sm border-t border-[#E3DED3] rounded-t-3xl shadow-[0_-8px_24px_rgba(33,31,27,0.10)] px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[#211F1B] truncate">
              {productName}
            </span>
            <span className="font-mono text-lg font-semibold text-[#211F1B]">
              ${price}
            </span>
          </div>

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

      {/* Desktop — persistent buy bar under the nav, so the purchase
          decision is never more than one click away, even deep in the
          specs/reviews sections. */}
      <div
        className={`hidden md:block fixed top-16 left-0 right-0 z-40 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <div className="bg-white/95 backdrop-blur-sm border-b border-[#E3DED3] shadow-[0_8px_24px_rgba(33,31,27,0.08)]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#F1ECE3]">
                <Image src={image} alt="" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#211F1B] truncate max-w-xs">
                  {productName}
                </span>
                <span className="font-mono text-base font-semibold text-[#211F1B]">
                  ${price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                id={`sticky-desktop-add-to-cart-${slug}`}
                onClick={handleAddToCart}
                tabIndex={visible ? 0 : -1}
                className="min-h-[44px] rounded-full border border-[#211F1B] text-[#211F1B] px-6 py-2.5 text-sm font-semibold hover:bg-[#211F1B] hover:text-white transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#211F1B]"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <button
                id={`sticky-desktop-buy-now-${slug}`}
                onClick={handleBuyNow}
                disabled={loading}
                aria-busy={loading}
                tabIndex={visible ? 0 : -1}
                className="min-h-[44px] rounded-full bg-[#211F1B] text-white px-6 py-2.5 text-sm font-semibold hover:bg-black transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#211F1B] disabled:opacity-70"
              >
                {loading ? "Redirecting…" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
