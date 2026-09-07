import type { Review } from "@/lib/types";
import StarRating from "./StarRating";

export default function PDPReviews({ reviews, productName }: { reviews: Review[]; productName: string }) {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-[#F1ECE3] scroll-mt-24"
      aria-label={`Reviews for ${productName}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="pdp-reveal flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#211F1B]/45 mb-3">
              ◈ Customer reviews
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#211F1B]">
              What owners say
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-serif text-3xl text-[#211F1B]">{avg}</span>
            <StarRating rating={Math.round(parseFloat(avg))} />
            <span className="font-mono text-[0.6rem] tracking-wide text-[#211F1B]/40 mt-1">
              {reviews.length} verified reviews
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="pdp-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="pdp-stagger-item bg-white rounded-3xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#211F1B]">{review.name}</p>
                  <p className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#211F1B]/40">
                    {review.location}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <blockquote className="text-sm text-[#211F1B]/75 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              {review.petName && (
                <p className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#211F1B]/50 border-t border-[#E3DED3] pt-3">
                  Pet: {review.petName}
                  {review.petType ? ` (${review.petType})` : ""}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
