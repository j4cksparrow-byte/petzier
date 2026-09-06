"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PDPGalleryProps {
  images: string[];
  name: string;
  badge?: string;
}

export default function PDPGallery({ images, name, badge }: PDPGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ["/gps-collar.jpg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = safeImages.length > 1;

  const goTo = (index: number) => {
    setActiveIndex(((index % safeImages.length) + safeImages.length) % safeImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative min-h-[55vh] lg:min-h-screen overflow-hidden bg-[#F1ECE3]">
      {/* Main image */}
      <div
        className="relative w-full h-full min-h-[55vh] lg:min-h-screen"
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
      >
        <Image
          key={safeImages[activeIndex]}
          src={safeImages[activeIndex]}
          alt={
            hasMultiple
              ? `${name} — photo ${activeIndex + 1} of ${safeImages.length}`
              : name
          }
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {badge && (
        <span className="absolute top-6 left-6 md:top-8 md:left-8 font-mono text-[0.6rem] tracking-[0.12em] uppercase bg-[#211F1B] text-white px-3 py-1.5 z-10">
          {badge}
        </span>
      )}

      {hasMultiple && (
        <>
          {/* Photo counter */}
          <span className="absolute top-6 right-6 md:top-8 md:right-8 z-10 font-mono text-[0.6rem] tracking-[0.1em] uppercase bg-[#211F1B]/70 text-white px-2.5 py-1.5 backdrop-blur-sm rounded-full">
            {activeIndex + 1} / {safeImages.length}
          </span>

          {/* Prev/next arrows */}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous photo"
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 text-[#211F1B] backdrop-blur-sm hover:bg-white transition-colors shadow-card"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next photo"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 text-[#211F1B] backdrop-blur-sm hover:bg-white transition-colors shadow-card"
          >
            <ChevronRight size={18} />
          </button>

          {/* Thumbnail rail */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10 flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {safeImages.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === activeIndex}
                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                  index === activeIndex
                    ? "border-white shadow-card"
                    : "border-white/40 hover:border-white/80"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
