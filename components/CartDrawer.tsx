"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3DED3]">
          <h2 className="font-mono text-sm tracking-[0.1em] uppercase text-[#211F1B] font-semibold">
            Your Cart ({items.reduce((n, i) => n + i.quantity, 0)})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-[#211F1B]/60 hover:text-[#211F1B] transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <p className="text-[#211F1B]/60 text-sm">Your cart is empty.</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="font-mono text-xs tracking-[0.1em] uppercase bg-[#211F1B] text-white px-4 py-2.5 hover:bg-black transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-[#F1ECE3] overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-semibold text-[#211F1B] leading-snug hover:text-[#211F1B]/70 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#211F1B]/40 hover:text-[#211F1B] transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#E3DED3]">
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-[#211F1B] hover:bg-[#F1ECE3] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs px-3 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-[#211F1B] hover:bg-[#F1ECE3] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-[#211F1B]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E3DED3] px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#211F1B]/60">
                Subtotal
              </span>
              <span className="font-mono text-lg font-semibold text-[#211F1B]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full text-center bg-[#211F1B] text-white py-3.5 text-sm font-semibold hover:bg-black transition-colors duration-300"
            >
              Checkout
            </Link>
            <p className="text-center text-[10px] text-[#211F1B]/40">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
