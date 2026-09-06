"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * Motion layer for the product page:
 *
 *  - Category: Scroll Reveal, Tier: Subtle  → every `.pdp-reveal` element
 *  - Category: Stagger List, Tier: Standard → `.pdp-stagger-grid` containers,
 *    using `grid: 'auto'` so GSAP infers rows/columns from the CSS grid.
 *
 * Everything renders fully visible with no JS at all (no CSS opacity:0
 * default anywhere in these components) — if the GSAP CDN is blocked, or
 * the visitor has JS disabled, the page is simply static, never stuck
 * invisible. gsap.matchMedia gates every tween behind
 * '(prefers-reduced-motion: no-preference)'.
 */
export default function PdpMotion() {
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    // gsap is loaded from a CDN <script> (not an npm dependency — see the
    // Script tags below), so it has no local type declarations to import.
    // This minimal structural type covers only what's used here.
    type GsapLike = {
      registerPlugin: (...args: unknown[]) => void;
      matchMedia: () => { add: (query: string, cb: () => void) => void };
      from: (target: unknown, vars: Record<string, unknown>) => unknown;
    };

    function trySetup() {
      if (cancelled) return;
      const w = window as typeof window & {
        gsap?: GsapLike;
        ScrollTrigger?: unknown;
      };
      if (!w.gsap || !w.ScrollTrigger) {
        attempts += 1;
        if (attempts < 40) setTimeout(trySetup, 100); // ~4s ceiling, then give up quietly
        return;
      }

      const gsap = w.gsap;
      gsap.registerPlugin(w.ScrollTrigger);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        document.querySelectorAll(".pdp-reveal").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: "power1.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          });
        });

        document.querySelectorAll(".pdp-stagger-grid").forEach((grid) => {
          const items = grid.querySelectorAll(".pdp-stagger-item");
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            scale: 0.92,
            y: 16,
            duration: 0.4,
            stagger: { each: 0.06, from: "start", grid: "auto" },
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: grid, start: "top 88%", toggleActions: "play none none reverse" },
          });
        });
      });
    }

    trySetup();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
