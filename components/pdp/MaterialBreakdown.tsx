import type { Material } from "@/lib/types";

export default function MaterialBreakdown({ materials }: { materials: Material[] }) {
  return (
    <section className="py-20 border-t border-[#B5A48C] bg-[#22211E]" aria-label="Materials and craftsmanship">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#B5A48C] mb-2">
            ◈ Materials & build
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#EDE8DE]">
            No shortcuts in the build.
          </h2>
        </div>

        {/* Material rows */}
        <div className="flex flex-col divide-y divide-[#EDE8DE]/10">
          {materials.map((material, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-6"
            >
              {/* Label */}
              <div className="flex items-start gap-3">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#B5A48C] mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm font-medium tracking-[0.06em] uppercase text-[#EDE8DE]">
                  {material.name}
                </span>
              </div>
              {/* Description */}
              <p className="text-sm text-[#EDE8DE]/60 leading-relaxed">
                {material.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
