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
    const elements = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>(".reveal") ?? []
    );
    if (elements.length === 0) return;

    // Safety net: never let a failed/throttled IntersectionObserver leave
    // real content permanently invisible.
    const fallback = setTimeout(() => {
      elements.forEach((el) => el.classList.add("visible"));
    }, 1000);

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("visible"));
      clearTimeout(fallback);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="why-different"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F1ECE3]"
      aria-label="Why Petzier is different"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
            ✦ Why it&rsquo;s different
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#211F1B] max-w-lg">
            Built on three principles.
            <br />
            <span className="italic">Not three buzzwords.</span>
          </h2>
        </div>

        {/* Split blocks */}
        <div className="flex flex-col gap-6 md:gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`reveal flex flex-col ${
                benefit.imageLeft ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 md:gap-14 items-center bg-[#FCFAF6] rounded-3xl p-6 md:p-10 shadow-card`}
            >
              {/* Text side */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-5 block">
                  {benefit.tag}
                </span>
                {/* Problem */}
                <p className="font-serif text-2xl md:text-3xl italic text-[#211F1B]/50 leading-snug mb-5">
                  &ldquo;{benefit.problem}&rdquo;
                </p>
                {/* Solution */}
                <p className="text-base text-[#211F1B]/75 leading-relaxed max-w-md">
                  {benefit.solution}
                </p>
              </div>

              {/* Image side */}
              <div className="flex-1 w-full relative min-h-[260px] md:min-h-[380px] overflow-hidden rounded-2xl">
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
