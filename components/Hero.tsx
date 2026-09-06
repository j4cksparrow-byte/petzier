import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src="/hero.jpg"
        alt="Golden retriever wearing the Petzier GPS Pet Collar"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — warm, not generic black */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#211F1B]/75 via-[#211F1B]/35 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-20 md:items-center md:pb-0">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            {/* Stamp label */}
            <div className="inline-flex items-center gap-2 border border-white/30 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-mono text-[0.65rem] tracking-[0.15em] text-white/90 uppercase">
                Dispatched from Melbourne — 1–2 days
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.08] tracking-tight mb-5">
              Know where
              <br />
              they are,
              <br />
              always.
            </h1>

            {/* Subhead */}
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-sm">
              Vet-reviewed pet tech built to last. Free shipping Australia-wide.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center bg-white text-[#211F1B] px-8 py-4 text-sm font-semibold hover:bg-white/90 transition-colors duration-300"
              >
                Shop All Products
              </Link>
              <Link
                href="/products/smart-gps-collar"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-4 text-sm font-medium hover:bg-white/10 transition-colors duration-300"
              >
                See GPS Collar →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white uppercase rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
