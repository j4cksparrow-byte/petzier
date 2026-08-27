const trustItems = [
  { icon: "◈", label: "Dispatched from Melbourne warehouse" },
  { icon: "◈", label: "30-day risk-free returns" },
  { icon: "◈", label: "12-month warranty on all products" },
  { icon: "◈", label: "Vet-reviewed materials" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Trust signals"
      className="border-y border-[#B5A48C] bg-[#EDE8DE] py-4"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 group">
              <span className="text-[#4A5842] text-xs">{item.icon}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#22211E]/80">
                {item.label}
              </span>
              {/* Divider — hide after last */}
              {i < trustItems.length - 1 && (
                <span className="hidden sm:block w-px h-4 bg-[#B5A48C] ml-2.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
