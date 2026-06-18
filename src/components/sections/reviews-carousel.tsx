"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { text: "It's the perfect place for the finest dum Biryani! Great food and friendly service.", name: "Sayantan A." },
  { text: "Amazing chef, tremendous quality, outstanding quality, perfect spice — will come back soon.", name: "Christoph E." },
  { text: "Great food and lovely service. The biryani and majestic chicken are a must try.", name: "Sachin N." },
  { text: "Really tasty biryani. Highly recommend for real Indian food.", name: "Sandeep P." },
  { text: "The taste is really good — one of the best biryani in Berlin.", name: "Nikhil K." },
  { text: "Super leckeres, sehr authentisch wirkendes Essen. Kann ich nur empfehlen.", name: "Bernd R." },
];

export function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  const review = reviews[current];

  return (
    <div className="mt-12">
      <div className="relative mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15"
          >
            <div className="flex gap-0.5 text-accent">
              {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
            </div>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/90">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold text-primary-foreground">{review.name}</p>
            <p className="text-xs text-primary-foreground/55">via Quandoo</p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Review ${i + 1}`}
              className="h-1.5 rounded-full bg-primary-foreground/40 transition-all duration-300"
              style={{ width: i === current ? 24 : 6, opacity: i === current ? 1 : 0.4 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
