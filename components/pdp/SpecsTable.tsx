import type { Spec } from "@/lib/types";

export default function SpecsTable({ specs, productName }: { specs: Spec[]; productName: string }) {
  return (
    <section className="py-16 border-t border-[#B5A48C]" aria-label="Product specifications">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-6">
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
              ◈ Technical specifications
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#22211E]">
              Spec manifest
            </h2>
          </div>

          {/* Manifest table */}
          <div className="border border-[#B5A48C] overflow-hidden">
            {/* Table header — styled like a manifest top */}
            <div className="bg-[#22211E] px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#EDE8DE]/60">
                {productName.toUpperCase()} — FULL SPECIFICATION
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[#B5A48C]">
                REV 1.0
              </span>
            </div>

            {/* Rows */}
            {specs.map((spec, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 border-b border-[#B5A48C]/30 last:border-0 ${
                  i % 2 === 0 ? "bg-[#EDE8DE]" : "bg-[#B5A48C]/10"
                }`}
              >
                <span className="font-mono text-[0.7rem] tracking-[0.06em] uppercase text-[#22211E]/50 min-w-[140px]">
                  {spec.label}
                </span>
                <span className="font-mono text-sm text-[#22211E] font-medium text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
