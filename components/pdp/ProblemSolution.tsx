import type { Problem } from "@/lib/types";

export default function ProblemSolution({ problems }: { problems: Problem[] }) {
  return (
    <section className="py-20 border-t border-[#B5A48C]" aria-label="Problems this product solves">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
            ◈ What it solves
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#22211E]">
            Three problems.
            <br />
            One product.
          </h2>
        </div>

        {/* Problem blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <article
              key={i}
              className="border-t-2 border-[#4A5842] pt-6 flex flex-col gap-3"
            >
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[#A8503E]">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold text-[#22211E] leading-snug">
                {problem.title}
              </h3>
              <p className="text-sm text-[#22211E]/65 leading-relaxed">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
