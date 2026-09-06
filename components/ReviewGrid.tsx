"use client";

import { useEffect, useRef } from "react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Brisbane, QLD",
    product: "Smart GPS Collar",
    rating: 5,
    text: "Our border collie escaped twice last month. With this on, I had him back within 10 minutes both times. Worth every cent.",
    petName: "Biscuit",
    initials: "SM",
  },
  {
    name: "Dr. Rachel B.",
    location: "Melbourne, VIC",
    product: "Orthopedic Pet Bed",
    rating: 5,
    text: "As a vet, I recommend orthopedic bedding for all dogs over 5. This one has the foam density I look for. Excellent product.",
    petName: "Hazel",
    initials: "RB",
  },
  {
    name: "Cath H.",
    location: "Hobart, TAS",
    product: "Filtered Water Fountain",
    rating: 5,
    text: "My cat refused to drink from any bowl. Within an hour of setting this up she was drinking constantly. Her kidney markers improved at her next check-up.",
    petName: "Luna",
    initials: "CH",
  },
  {
    name: "Amanda L.",
    location: "Perth, WA",
    product: "Automatic Pet Feeder",
    rating: 5,
    text: "Travelled for 10 days and my cat was perfectly fed on schedule the whole time. Absolute game-changer.",
    petName: "Olive",
    initials: "AL",
  },
  {
    name: "Lena P.",
    location: "Sydney, NSW",
    product: "Interactive Laser Toy",
    rating: 5,
    text: "My two cats chase this thing for 20 minutes straight. The scratching has stopped entirely. Best $39 I've spent.",
    petName: "Fig & Pepper",
    initials: "LP",
  },
  {
    name: "Mark F.",
    location: "Gold Coast, QLD",
    product: "Orthopedic Pet Bed",
    rating: 5,
    text: "Our 12-year-old staffy has hip dysplasia. Within two weeks on this bed she stopped limping in the mornings.",
    petName: "Ruby",
    initials: "MF",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? "#211F1B" : "none"}
          stroke={i < rating ? "#211F1B" : "#E3DED3"}
          strokeWidth="1"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const elements = Array.from(node.querySelectorAll<HTMLElement>(".reveal"));
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-[#F1ECE3]"
      aria-label="Customer reviews"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
              ✦ Reviews
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#211F1B]">
              What owners are saying.
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="font-serif text-4xl text-[#211F1B]">4.9</span>
            <StarRating rating={5} />
            <span className="font-mono text-xs text-[#211F1B]/50 mt-1 tracking-wide">
              From 847 reviews
            </span>
          </div>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="reveal bg-[#FCFAF6] rounded-3xl p-6 flex flex-col gap-4 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#211F1B] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xs text-white font-semibold">
                      {review.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#211F1B]">{review.name}</p>
                    <p className="font-mono text-[0.6rem] tracking-[0.08em] text-[#211F1B]/50 uppercase">
                      {review.location}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {/* Review text */}
              <blockquote className="text-sm text-[#211F1B]/75 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Product + Pet tag */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E3DED3]/30">
                <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#211F1B]/40">
                  {review.product}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#211F1B]/55">
                  Pet: {review.petName}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
