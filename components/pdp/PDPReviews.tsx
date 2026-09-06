import type { Review } from "@/lib/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? "#211F1B" : "none"}
          stroke={i < rating ? "#211F1B" : "#E3DED3"}
          strokeWidth="1"
          aria-hidden="true"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

export default function PDPReviews({ reviews, productName }: { reviews: Review[]; productName: string }) {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-20 md:py-28 bg-[#F1ECE3]" aria-label={`Reviews for ${productName}`}>
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
