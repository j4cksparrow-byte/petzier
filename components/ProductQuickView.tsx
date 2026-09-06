"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function ProductQuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const isOpen = product !== null;

  // Reset the "Added" state whenever a different product is shown
  useEffect(() => {
    setAdded(false);
  }, [product?.slug]);

  // Close on Escape, and lock page scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const cartItem = {
    wooId: product.wooId,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  const handleAddToCart = () => {
    addItem(cartItem, 1);
    setAdded(true);
    openCart();
    onClose();
  };

  const handleBuyNow = () => {
    addItem(cartItem, 1);
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211F1B]/40 backdrop-blur-[2px] z-[80] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quick view`}
      >
        <div className="relative pointer-events-auto w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_30px_70px_-20px_rgba(33,31,27,0.35)] grid grid-cols-1 md:grid-cols-2">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#211F1B] shadow-[0_4px_12px_rgba(33,31,27,0.15)] hover:bg-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[420px] bg-[#F1ECE3] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.12em] uppercase rounded-full bg-[#211F1B]/85 backdrop-blur-sm text-white px-3 py-1.5">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10">
            {/* Dispatch stamp */}
            <div className="flex items-center gap-2 rounded-full border border-[#E3DED3] w-fit px-3 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#211F1B]" />
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#211F1B]/60">
                {product.dispatchNote}
              </span>
            </div>

            {/* Name */}
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211F1B] leading-[1.05] mb-3">
              {product.name}
            </h2>

            {/* Tagline */}
            <p className="text-base text-[#211F1B]/60 leading-relaxed mb-6">
              {product.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7 pb-7 border-b border-[#E3DED3]">
              <span className="font-serif text-3xl text-[#211F1B]">${product.price}</span>
              {product.originalPrice && (
                <span className="font-mono text-base text-[#211F1B]/40 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                id={`quickview-add-to-cart-${product.slug}`}
                className="flex-1 rounded-full border border-[#211F1B]/20 text-[#211F1B] py-3.5 px-6 text-sm font-semibold hover:border-[#211F1B]/50 transition-colors duration-300"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                id={`quickview-buy-now-${product.slug}`}
                className="flex-1 rounded-full bg-[#211F1B] text-white py-3.5 px-6 text-sm font-semibold hover:bg-[#211F1B]/85 transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Full details link */}
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-sm text-[#211F1B]/60 hover:text-[#211F1B] underline underline-offset-4 decoration-[#E3DED3] transition-colors w-fit"
            >
              View full details, specs & reviews →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
