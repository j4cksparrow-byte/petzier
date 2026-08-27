import type { BoxItem } from "@/lib/types";

export default function WhatInBox({ items }: { items: BoxItem[] }) {
  return (
    <section className="py-16 border-t border-[#B5A48C]" aria-label="What's in the box">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          {/* Header */}
          <div className="mb-6">
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
              ◈ What's in the box
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#22211E]">
              Packing slip
            </h2>
          </div>

          {/* List — styled like a packing slip */}
          <div className="border border-[#B5A48C]">
            {/* Slip header */}
            <div className="flex items-center justify-between bg-[#B5A48C]/20 px-5 py-3 border-b border-[#B5A48C]">
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#22211E]/60">
                Item
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-[#22211E]/60">
                Qty
              </span>
            </div>
            {/* Items */}
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 border-b border-[#B5A48C]/40 last:border-0 hover:bg-[#4A5842]/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.6rem] text-[#22211E]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#22211E]">{item.name}</span>
                </div>
                <span className="font-mono text-sm font-medium text-[#4A5842]">
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
