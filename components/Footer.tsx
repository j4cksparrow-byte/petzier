"use client";

export default function Footer() {
  return (
    <footer className="border-t border-[#B5A48C] bg-[#22211E] text-[#EDE8DE]">
      {/* Newsletter */}
      <div className="border-b border-[#EDE8DE]/10 py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[#B5A48C] mb-2">
              ◈ Stay informed
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-[#EDE8DE]">
              New arrivals, honest reviews.
              <br />
              No spam.
            </h3>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              id="newsletter-email"
              placeholder="your@email.com"
              className="bg-[#EDE8DE]/10 border border-[#EDE8DE]/20 text-[#EDE8DE] placeholder:text-[#EDE8DE]/40 px-4 py-3 text-sm w-full sm:w-64 focus:outline-none focus:border-[#4A5842] transition-colors"
              aria-label="Email address"
            />
            <button
              type="submit"
              id="newsletter-submit"
              className="font-mono text-xs tracking-[0.1em] uppercase bg-[#4A5842] text-[#EDE8DE] px-6 py-3 hover:bg-[#EDE8DE] hover:text-[#22211E] transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links + info */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-mono text-base font-semibold tracking-[0.18em] uppercase text-[#EDE8DE] mb-3">
              PETZIER
            </p>
            <p className="text-sm text-[#EDE8DE]/50 leading-relaxed">
              Premium pet essentials, dispatched from Melbourne. Built for the pet that deserves better.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#B5A48C] mb-4">
              Products
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                ["Smart GPS Collar", "/products/smart-gps-collar"],
                ["Automatic Feeder", "/products/automatic-feeder"],
                ["Laser Toy", "/products/interactive-laser-toy"],
                ["Orthopedic Bed", "/products/orthopedic-pet-bed"],
                ["Water Fountain", "/products/filtered-water-fountain"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[#EDE8DE]/60 hover:text-[#EDE8DE] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#B5A48C] mb-4">
              Support
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                ["FAQ", "#"],
                ["Shipping & Returns", "#"],
                ["Warranty", "#"],
                ["Contact Us", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-[#EDE8DE]/60 hover:text-[#EDE8DE] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#B5A48C] mb-4">
              Guaranteed
            </p>
            <div className="flex flex-col gap-2">
              {[
                "30-Day Returns",
                "12-Month Warranty",
                "Vet-Reviewed",
                "AU Stock",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-[#4A5842] text-xs">◈</span>
                  <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#EDE8DE]/50">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#EDE8DE]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#EDE8DE]/30">
              ABN 12 345 678 901
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#EDE8DE]/20" />
            <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#EDE8DE]/30">
              support@petzier.com.au
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#EDE8DE]/20" />
            <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-[#EDE8DE]/30">
              © 2025 Petzier Pty Ltd
            </span>
          </div>

          {/* Payment badges (monochrome text) */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {["Visa", "Mastercard", "Apple Pay", "Google Pay", "Afterpay"].map((method) => (
              <span
                key={method}
                className="font-mono text-[0.55rem] tracking-[0.08em] uppercase border border-[#EDE8DE]/20 text-[#EDE8DE]/40 px-2 py-1"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
