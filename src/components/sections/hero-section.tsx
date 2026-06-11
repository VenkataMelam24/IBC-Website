"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "biryani",
    eyebrow: "Berlin's Best Biryani",
    headline: "Fresh Indian\nFlavours.",
    body: "Welcome to IBC. Biryanis, Curries & More. For dine-in, takeaway, delivery, or catering for your family, team, or event.",
    cta1: { label: "Order Now",    href: "/#order-online" },
    cta2: { label: "Book a Table", href: "https://www.quandoo.de/en/place/ibc-indian-biryani-company-86312", external: true },
    bg: "video" as const,
  },
  {
    id: "catering",
    eyebrow: "IBC Catering",
    headline: "Catering for\nEvery Celebration.",
    body: "Birthdays, corporate events, weddings, and family gatherings. We bring the full IBC experience to you.",
    cta1: { label: "Catering Enquiry", href: "/catering" },
    cta2: { label: "Learn More",       href: "/catering" },
    bg: "image" as const,
    image: "/images/catering-birthday.png",
  },
  {
    id: "order",
    eyebrow: "Order Online",
    headline: "Order Your\nBiryani Now.",
    body: "Get your favourite IBC biryanis and curries delivered straight to your door. Available on Wolt, Uber Eats, and Lieferando.",
    cta1: { label: "Order Now",  href: "/#order-online" },
    cta2: { label: "View Menu",  href: "/menu" },
    bg: "video" as const,
    video: "/rider.mp4",
  },
];

const INTERVAL = 6000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[current];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background layer (crossfade) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slide.bg === "video" ? (
            <video
              key={slide.id}
              src={"video" in slide && slide.video ? slide.video : "/hero.mp4"}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <Image
              src={slide.image!}
              alt={slide.eyebrow}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--primary)/0.86)_8%,hsl(350_60%_24%/0.72)_36%,hsl(8_52%_18%/0.42)_66%,hsl(10_48%_14%/0.68)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(850px_520px_at_24%_42%,hsl(var(--primary)/0.33),transparent_62%),radial-gradient(640px_400px_at_78%_12%,hsl(var(--copper)/0.22),transparent_62%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[62%] bg-[linear-gradient(90deg,hsl(var(--primary)/0.52)_0%,hsl(var(--primary)/0.3)_45%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,hsl(var(--background)/0.16),transparent)]" />

      {/* ── Content ── */}
      <div className="relative mx-auto flex min-h-[76vh] w-full max-w-7xl items-center px-6 pb-16 pt-12 md:pb-18 md:pt-14 lg:px-10 lg:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-text"}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/90">
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 whitespace-pre-line font-heading text-4xl font-bold leading-[1.06] text-primary-foreground sm:text-5xl md:text-6xl">
              {slide.headline}
            </h1>
            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              {slide.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={slide.cta1.href}
                className="inline-flex h-12 items-center rounded bg-accent px-6 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {slide.cta1.label}
              </Link>
              <Link
                href={slide.cta2.href}
                {...(slide.cta2.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-12 items-center rounded border border-primary-foreground/40 bg-transparent px-6 text-sm font-bold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
              >
                {slide.cta2.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => { setCurrent(i); setPaused(true); }}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 rounded-full bg-primary-foreground/40 transition-all duration-300"
            style={{ width: i === current ? 28 : 8, opacity: i === current ? 1 : 0.5 }}
          />
        ))}
      </div>
    </section>
  );
}
