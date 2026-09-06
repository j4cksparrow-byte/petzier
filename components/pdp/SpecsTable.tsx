import type { Spec } from "@/lib/types";

export default function SpecsTable({ specs, productName }: { specs: Spec[]; productName: string }) {
  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Product specifications">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl pdp-reveal">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
              ◈ Technical specifications
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#211F1B]">
              Full spec sheet
            </h2>
          </div>

          {/* Real <table> markup — a spec list is tabular data; screen
              readers benefit from genuine table semantics over styled divs. */}
          <div className="rounded-3xl overflow-hidden shadow-card">
            <table className="w-full border-collapse">
              <caption className="sr-only">{productName} full technical specifications</caption>
              <thead>
                <tr className="bg-[#F1ECE3]/60 border-b border-[#E3DED3]">
                  <th
                    scope="col"
                    className="font-mono text-left text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-[#211F1B]/50 px-6 py-3.5"
                  >
                    {productName} — specification
                  </th>
                  <th
                    scope="col"
                    className="font-mono text-right text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-[#211F1B]/50 px-6 py-3.5"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FCFAF6]"}>
                    <th
                      scope="row"
                      className="text-left font-normal text-[0.78rem] tracking-[0.02em] uppercase text-[#211F1B]/55 px-6 py-4 border-t border-[#E3DED3]"
                    >
                      {spec.label}
                    </th>
                    <td className="font-mono text-sm text-[#211F1B] font-medium text-right px-6 py-4 border-t border-[#E3DED3]">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
