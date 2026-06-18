"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  { name: "Raju SVP", text: "Best biryani I've had in Berlin so far. As someone from Hyderabad, I'm usually very critical when it comes to biryani. The rice was perfectly cooked, the spices were well balanced, and the aroma reminded me of proper Hyderabadi dum biryani." },
  { name: "Praveen Makireddy", text: "The food was absolutely outstanding — every dish was fresh, beautifully presented, and full of flavor. I especially loved the Mutton Biryani. Definitely a place I'll be returning to again." },
  { name: "Rajat Shinde", text: "Absolute gem place for eating delicious authentic flavour Indian food. The Chicken Biryani did not disappoint at all — actual biryani, not just rice with spices. Definitely worth multiple visits." },
  { name: "Subhalaxmi Mahanta", text: "We were a group of 4 and tried mutton and chicken biriyani. Both the biriyani taste so good and authentic. Give it a try!" },
  { name: "Sobhana Penneru", text: "The crispy prawn made me feel like 'why haven't I visited before?' The biryani was perfect, filled with flavour and meat was falling off the bone." },
  { name: "Srinivas Jayarama", text: "Best biryani day for me. Being a vegetarian, I asked for a special veg biryani and boy was it good. There's a version for people who want to remember home. Loved it, will visit again for sure." },
  { name: "Manmohan Regunta", text: "If you're hunting for authentic Indian flavour in the Hyderabadi Dum Biryani, this is the place. The chefs did not compromise to deliver the original taste of dum biryani right on your table." },
  { name: "Marta Font Garcia", text: "My Indian boyfriend wanted to try the Biryani and we loved it! Super tasty and aromatic. We also tried the Chicken Curry and Paratha. They were really attentive and fast. I recommend it 100%." },
  { name: "Aleks Aleks", text: "Top location, top biryani, and definitely one of the kindest owners that this planet has ever seen! Hosted a whole event there — went great, and we will for sure be back!" },
  { name: "Pavneet Soni", text: "Very happy with our decision to come to Berlin only to try their food. Rarely do we get typical Indian spice level and flavours at Indian restaurants in Germany. Chai was delicious." },
  { name: "Claire Gilmore", text: "Best chicken biryani! We enjoyed a delicious dinner here. The butter chicken and butter naan were also amazing! Highly recommend this neighbourhood restaurant." },
  { name: "Vaishnavi Bandike", text: "I loved chilli chicken — it's 10/10. And we also ordered mutton biryani, it's delicious. I felt the pure Indian fresh grind spice taste here. Even the complimentary malai chicken tikka was fantastic." },
  { name: "Carol Pereira", text: "Excellent place for authentic biriyani and a satisfying lunch. The biriyani is flavorful, aromatic, and prepared with genuine traditional taste. Great portions, good service. Highly recommended." },
  { name: "Rajita Maitra", text: "I recently visited this place. I had chicken biryani and mango lassi and the taste was too good. I really liked the cleanliness and the staff behaviour. They were really good." },
];

const PAIRS = Math.ceil(reviews.length / 2);

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex flex-col rounded-2xl bg-primary-foreground/8 p-6 ring-1 ring-primary-foreground/15 h-full">
      <div className="flex gap-0.5 text-accent">
        {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-primary-foreground/90">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-5 border-t border-primary-foreground/15 pt-4">
        <p className="text-sm font-semibold text-primary-foreground">{name}</p>
        <p className="text-xs text-primary-foreground/50">via Google</p>
      </div>
    </div>
  );
}

export function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % PAIRS);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const pair = [reviews[current * 2], reviews[current * 2 + 1]].filter(Boolean);

  return (
    <div className="mt-12">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {pair.map((review) => (
              <ReviewCard key={review.name} name={review.name} text={review.text} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: PAIRS }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Reviews ${i * 2 + 1}–${i * 2 + 2}`}
            className="h-1.5 rounded-full bg-primary-foreground/40 transition-all duration-300"
            style={{ width: i === current ? 24 : 6, opacity: i === current ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
