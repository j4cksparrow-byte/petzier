"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const benefits = [
  {
    tag: "01 / Quality",
    problem: "Most pet products are designed for the shelf, not the pet.",
    solution:
      "Every Petzier product starts with a vet brief. Materials, dimensions, and mechanics are reviewed before we commit to a single unit. If it doesn't pass, it doesn't ship.",
    image: "/hero.jpg",
    imageAlt: "Dog wearing Petzier GPS collar in a garden",
    imageLeft: false,
  },
  {
    tag: "02 / Transparency",
    problem: "\"Premium\" usually just means expensive packaging.",
    solution:
      "We show you the specs, the materials, the factory cert, and the real price. No inflated RRP, no fake savings. The price is the price.",
    image: "/ortho-bed.jpg",
    imageAlt: "Dog resting on Petzier orthopedic bed",
    imageLeft: true,
  },
  {
    tag: "03 / Service",
    problem: "Online pet stores disappear when something goes wrong.",
    solution:
      "Dispatched from our Melbourne warehouse. Real humans answer our support email within 4 hours on business days. 30-day returns, no questions asked.",
    image: "/water-fountain.jpg",
    imageAlt: "Cat drinking from Petzier filtered water fountain",
    imageLeft: false,
  },
];

export default function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-different"
      ref={sectionRef}
      className="py-20 md:py-28 border-t border-[#B5A48C]"
      aria-label="Why Petzier is different"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
            ◈ Why it's different
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#22211E] max-w-lg">
            Built on three principles. Not three buzzwords.
          </h2>
        </div>

        {/* Split blocks */}
        <div className="flex flex-col gap-0">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`reveal flex flex-col ${
                benefit.imageLeft ? "md:flex-row-reverse" : "md:flex-row"
              } border-t border-[#B5A48C] py-0`}
            >
              {/* Text side */}
              <div className="flex-1 py-12 md:py-16 md:pr-16 flex flex-col justify-center">
                <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-5 block">
                  {benefit.tag}
                </span>
                {/* Problem */}
                <p className="text-xl md:text-2xl font-bold text-[#22211E]/40 italic leading-snug mb-5">
                  &ldquo;{benefit.problem}&rdquo;
                </p>
                {/* Solution */}
                <p className="text-base text-[#22211E]/75 leading-relaxed max-w-md">
                  {benefit.solution}
                </p>
              </div>

              {/* Image side */}
              <div className="flex-1 relative min-h-[280px] md:min-h-[400px] overflow-hidden">
                <Image
                  src={benefit.image}
                  alt={benefit.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
