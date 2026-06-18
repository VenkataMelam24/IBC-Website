"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const dishes = [
  {
    name: "Chicken Dum Biryani",
    note: "Fragrant basmati rice, a rich spice blend, and slow-cooked chicken pieces.",
    image: "/images/dish-chicken-biryani.jpg",
  },
  {
    name: "Mutton Dum Biryani",
    note: "Rich masala layers with tender mutton and aromatic long-grain basmati rice.",
    image: "/images/dish-mutton-biryani.jpg",
  },
  {
    name: "Chicken Majestic",
    note: "Crispy fried chicken tossed in a yoghurt and pepper sauce with garlic and onions.",
    image: "/images/dish-chicken-majestic.jpg",
  },
  {
    name: "Chilli Chicken",
    note: "Crispy fried chicken tossed in a homemade chilli sauce with garlic and bell peppers.",
    image: "/images/dish-chilli-chicken.jpg",
  },
];

const CARD_W = 280;
const CARD_H = 340;
const RADIUS = 240;
const INTERVAL = 3200;
const STAGE_H = Math.ceil(CARD_H * 1.35);

export function SignatureDishesSection() {
  const [current, setCurrent] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((r) => r - 90);
      setCurrent((c) => (c + 1) % dishes.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    const steps = ((i - current) % dishes.length + dishes.length) % dishes.length;
    setRotation((r) => r - steps * 90);
    setCurrent(i);
  };

  return (
    <section id="menu" className="bg-card py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-5xl">
            Signature Dishes
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A premium menu built on the finest Indian spices and elegant presentation.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col items-center">
          {/* 3D Turntable stage */}
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ height: `${STAGE_H}px`, width: "100%" }}
          >
            <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  position: "relative",
                }}
                animate={{ rotateY: rotation }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {dishes.map((dish, i) => (
                  <div
                    key={dish.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: `rotateY(${i * 90}deg) translateZ(${RADIUS}px)`,
                      backfaceVisibility: "hidden",
                    }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <div className="relative overflow-hidden" style={{ height: "200px" }}>
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {dish.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {dish.note}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex items-center gap-2">
            {dishes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${dishes[i].name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="mt-10">
          <ButtonLink href="/menu" variant="primary">View Full Menu</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
