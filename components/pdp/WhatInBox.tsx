import { Package } from "lucide-react";
import type { BoxItem } from "@/lib/types";

export default function WhatInBox({ items }: { items: BoxItem[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#F1ECE3]" aria-label="What's in the box">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl pdp-reveal">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#211F1B] flex-shrink-0 shadow-card">
              <Package size={18} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45">
                What&rsquo;s in the box
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-[#211F1B]">
                Packing slip
              </h2>
            </div>
          </div>

          {/* List — styled like a packing slip */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-card">
            {/* Slip header */}
            <div className="flex items-center justify-between bg-[#F1ECE3]/60 px-6 py-3.5 border-b border-[#E3DED3]">
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#211F1B]/50">
                Item
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#211F1B]/50">
                Qty
              </span>
            </div>
            {/* Items */}
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 border-b border-[#E3DED3] last:border-0 hover:bg-[#F1ECE3]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.6rem] text-[#211F1B]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#211F1B]">{item.name}</span>
                </div>
                <span className="font-mono text-sm font-medium text-[#211F1B]">
                  {item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
