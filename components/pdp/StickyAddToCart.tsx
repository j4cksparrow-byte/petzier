"use client";

import { useState, useEffect } from "react";
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
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleBuyNow = () => {
    addItem({ wooId, slug, name: productName, price, image }, 1);
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-[#22211E] border-t border-[#B5A48C]/30 px-5 py-4 flex items-center justify-between gap-4">
        {/* Product + price */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[#EDE8DE] truncate">{productName}</span>
          <span className="font-mono text-base font-semibold text-[#4A5842]">${price}</span>
        </div>

        {/* CTA */}
        <button
          id={`sticky-cart-${slug}`}
          onClick={handleBuyNow}
          className="bg-[#A8503E] text-[#EDE8DE] px-6 py-3 text-sm font-semibold hover:bg-[#EDE8DE] hover:text-[#22211E] transition-colors duration-300 whitespace-nowrap flex-shrink-0"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
