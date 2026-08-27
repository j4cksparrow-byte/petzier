"use client";

import { useState, useEffect } from "react";

interface StickyAddToCartProps {
  productName: string;
  price: number;
  slug: string;
}

export default function StickyAddToCart({ productName, price, slug }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, quantity: 1 }),
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
          onClick={handleCheckout}
          disabled={loading}
          className="bg-[#A8503E] text-[#EDE8DE] px-6 py-3 text-sm font-semibold hover:bg-[#EDE8DE] hover:text-[#22211E] transition-colors duration-300 whitespace-nowrap flex-shrink-0 disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
