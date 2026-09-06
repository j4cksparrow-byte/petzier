const trustItems = [
  { label: "Dispatched from Melbourne warehouse" },
  { label: "30-day risk-free returns" },
  { label: "12-month warranty on all products" },
  { label: "Vet-reviewed materials" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Trust signals"
      className="bg-[#F1ECE3] border-y border-[#E3DED3] py-4"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-[#211F1B]/40 text-xs">✦</span>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[#211F1B]/65">
                {item.label}
              </span>
              {/* Divider — hide after last */}
              {i < trustItems.length - 1 && (
                <span className="hidden sm:block w-px h-4 bg-[#E3DED3] ml-2.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
