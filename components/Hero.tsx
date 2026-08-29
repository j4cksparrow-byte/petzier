import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src="/hero.jpg"
        alt="Golden retriever wearing a Petzier Smart GPS Collar in a sunlit garden"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — warm, not generic black */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#22211E]/70 via-[#22211E]/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-20 md:items-center md:pb-0">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            {/* Stamp label */}
            <div className="inline-flex items-center gap-2 border border-[#B5A48C]/60 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A5842]" />
              <span className="font-mono text-[0.65rem] tracking-[0.15em] text-[#EDE8DE]/90 uppercase">
                Dispatched from Melbourne
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#EDE8DE] leading-[1.08] tracking-tight mb-5">
              Know where
              <br />
              they are,
              <br />
              always.
            </h1>

            {/* Subhead */}
            <p className="text-base md:text-lg text-[#EDE8DE]/80 leading-relaxed mb-8 max-w-sm">
              Vet-reviewed pet tech built to last. Free shipping Australia-wide.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#products"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center bg-[#4A5842] text-[#EDE8DE] px-8 py-4 text-sm font-semibold hover:bg-[#22211E] transition-colors duration-300"
              >
                Shop All Products
              </Link>
              <Link
                href="/products/smart-gps-collar"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center border border-[#EDE8DE]/50 text-[#EDE8DE] px-8 py-4 text-sm font-medium hover:bg-[#EDE8DE]/10 transition-colors duration-300"
              >
                See GPS Collar →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[#EDE8DE] uppercase rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-8 bg-[#EDE8DE]/40" />
      </div>
    </section>
  );
}
