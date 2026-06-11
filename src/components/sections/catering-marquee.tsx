"use client";

import Image from "next/image";

const items = [
  { name: "Chicken Biryani",     image: "/images/catering-chicken-biryani.png" },
  { name: "Mutton Biryani",      image: "/images/catering-mutton-biryani.png" },
  { name: "Chilli Chicken",      image: "/images/catering-chili-chicken.png" },
  { name: "Chilli Paneer",       image: "/images/catering-chilli-paneer.png" },
  { name: "Chicken Tikka Masala",image: "/images/catering-chicken-tikka-masala.png" },
  { name: "Paneer Butter Masala",image: "/images/catering-paneer-butter-masala.png" },
  { name: "Mango Lassi",         image: "/images/catering-mango-lassi.png" },
];

export function CateringMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-6"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex w-52 shrink-0 flex-col items-center">
            <div className="relative h-44 w-52 overflow-hidden rounded-2xl bg-[hsl(32_40%_95%)]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-foreground">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
