"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/images/charlottenburg-1.png",
  "/images/charlottenburg-2.png",
  "/images/charlottenburg-3.png",
  "/images/charlottenburg-4.png",
  "/images/charlottenburg-5.png",
  "/images/charlottenburg-6.png",
];

export function BranchSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="relative overflow-hidden rounded-[1.45rem]">
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`IBC Charlottenburg — photo ${i + 1}`}
          width={900}
          height={900}
          priority={i === 0}
          className={`h-full min-h-[330px] w-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "absolute inset-0 opacity-0"
          }`}
        />
      ))}

      <span className="absolute left-4 top-4 rounded-full bg-primary/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
        Flagship
      </span>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </article>
  );
}
