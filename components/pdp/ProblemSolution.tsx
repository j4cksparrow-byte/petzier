import type { Problem } from "@/lib/types";

export default function ProblemSolution({ problems }: { problems: Problem[] }) {
  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Problems this product solves">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 md:mb-16 pdp-reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
            ◈ What it solves
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#211F1B] max-w-lg">
            Three problems.
            <br />
            <span className="italic">One product.</span>
          </h2>
        </div>

        {/* Problem blocks */}
        <div className="pdp-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <article
              key={i}
              className="pdp-stagger-item bg-[#FCFAF6] rounded-3xl p-8 shadow-card flex flex-col gap-4"
            >
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#211F1B]/40">
                0{i + 1}
              </span>
              <h3 className="font-serif text-xl text-[#211F1B] leading-snug">
                {problem.title}
              </h3>
              <p className="text-sm text-[#211F1B]/65 leading-relaxed">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
