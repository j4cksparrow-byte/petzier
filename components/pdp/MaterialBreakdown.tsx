import type { Material } from "@/lib/types";

export default function MaterialBreakdown({ materials }: { materials: Material[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#211F1B]" aria-label="Materials and craftsmanship">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 md:mb-16 pdp-reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-white/45 mb-3">
            ◈ Materials & build
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white max-w-lg">
            No shortcuts in the build.
          </h2>
        </div>

        {/* Material rows */}
        <div className="pdp-reveal flex flex-col divide-y divide-white/10">
          {materials.map((material, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-7"
            >
              {/* Label */}
              <div className="flex items-start gap-3">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/45 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm font-medium tracking-[0.06em] uppercase text-white">
                  {material.name}
                </span>
              </div>
              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed">
                {material.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
