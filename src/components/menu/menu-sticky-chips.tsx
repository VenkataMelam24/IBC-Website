"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type CategoryChip = {
  id: string;
  title: string;
};

type MenuStickyChipsProps = {
  categories: CategoryChip[];
};

export function MenuStickyChips({ categories }: MenuStickyChipsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");

  const ids = useMemo(() => categories.map((category) => category.id), [categories]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveCategory(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);

  return (
    <section className="sticky top-20 z-40 border-b border-cream/10 bg-[hsl(var(--primary)/0.86)]/90 px-6 py-4 backdrop-blur lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl gap-3 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className={cn(
              "inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === category.id
                ? "border border-accent/65 bg-accent/18 text-accent"
                : "border border-cream/20 bg-[hsl(var(--primary)/0.58)] text-cream/80 hover:border-accent/40 hover:text-accent",
            )}
          >
            {category.title}
          </a>
        ))}
      </div>
    </section>
  );
}
