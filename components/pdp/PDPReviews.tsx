import type { Review } from "@/lib/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? "#4A5842" : "none"}
          stroke={i < rating ? "#4A5842" : "#B5A48C"}
          strokeWidth="1"
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
    <section className="py-16 border-t border-[#B5A48C]" aria-label={`Reviews for ${productName}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#A8503E] mb-2">
              ◈ Customer reviews
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#22211E]">
              What owners say
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-3xl font-semibold text-[#4A5842]">{avg}</span>
            <StarRating rating={Math.round(parseFloat(avg))} />
            <span className="font-mono text-[0.6rem] tracking-wide text-[#22211E]/40 mt-1">
              {reviews.length} verified reviews
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <article
              key={i}
              className="border border-[#B5A48C] p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#22211E]">{review.name}</p>
                  <p className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#22211E]/40">
                    {review.location}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <blockquote className="text-sm text-[#22211E]/70 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              {review.petName && (
                <p className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#4A5842] border-t border-[#B5A48C]/50 pt-3">
                  Pet: {review.petName} ({review.petType})
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
