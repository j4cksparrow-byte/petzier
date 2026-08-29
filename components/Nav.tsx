"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#EDE8DE]/95 backdrop-blur-sm border-b border-[#B5A48C]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-[0.18em] uppercase text-[#22211E] hover:text-[#4A5842] transition-colors"
          aria-label="Petzier home"
        >
          PETZIER
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link
            href="/#products"
            className="text-sm font-medium text-[#22211E]/70 hover:text-[#22211E] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/#why-different"
            className="text-sm font-medium text-[#22211E]/70 hover:text-[#22211E] transition-colors"
          >
            Why Petzier
          </Link>
          <Link
            href="/#reviews"
            className="text-sm font-medium text-[#22211E]/70 hover:text-[#22211E] transition-colors"
          >
            Reviews
          </Link>
          <button
            onClick={openCart}
            className="font-mono text-xs tracking-stamp bg-[#4A5842] text-[#EDE8DE] px-4 py-2 hover:bg-[#22211E] transition-colors"
            aria-label="Open cart"
          >
            CART ({totalItems})
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative text-[#22211E] hover:text-[#4A5842] transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#A8503E] text-[#EDE8DE] text-[10px] font-mono font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-[#22211E]"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#EDE8DE] border-t border-[#B5A48C] px-6 py-6 flex flex-col gap-5">
          {[
            ["/#products", "Products"],
            ["/#why-different", "Why Petzier"],
            ["/#reviews", "Reviews"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-[#22211E] border-b border-[#B5A48C]/40 pb-4"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              openCart();
            }}
            className="font-mono text-xs tracking-stamp bg-[#4A5842] text-[#EDE8DE] px-4 py-3 text-center hover:bg-[#22211E] transition-colors"
          >
            CART ({totalItems})
          </button>
        </div>
      )}
    </header>
  );
}
