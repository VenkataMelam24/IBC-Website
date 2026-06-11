"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/data/menu";

const tagStyles: Record<string, string> = {
  Vegetarian: "bg-green-50 text-green-700 border border-green-200",
  "Non-Veg":  "bg-rose-50 text-rose-600 border border-rose-200",
  Spicy:      "bg-red-50 text-red-600 border border-red-200",
  Bestseller: "bg-amber-50 text-amber-700 border border-amber-200",
  Sweet:      "bg-purple-50 text-purple-600 border border-purple-200",
};

type MenuRowProps = {
  category: MenuCategory;
  onSelectItem?: (item: MenuItem) => void;
};

export function MenuRow({ category, onSelectItem }: MenuRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="mb-8">
        <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {category.title}
        </h2>
        <div className="mt-2.5 h-1 w-10 rounded-full bg-primary" />
      </div>

      <div className="group/row relative">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-md text-primary transition-all hover:bg-primary hover:text-white hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-md text-primary transition-all hover:bg-primary hover:text-white hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div ref={scrollRef} className="no-scrollbar flex gap-5 overflow-x-auto pb-1">
          {category.items.map((item) => (
            <article
              key={item.name}
              role="button"
              tabIndex={0}
              onClick={() => onSelectItem?.(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectItem?.(item);
                }
              }}
              className="group/item w-[76vw] shrink-0 cursor-pointer overflow-hidden rounded-[1.35rem] border border-border bg-background text-left shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_50px_-16px_hsl(var(--primary)/0.28)] sm:w-[290px]"
            >
              <div className="relative h-52 overflow-hidden">
                {item.image ? (
                  <Image
                    src={encodeURI(item.image)}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 76vw, 290px"
                    className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
                    {item.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-bold tracking-wide text-primary">
                    {item.price}
                  </span>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagStyles[tag] ?? "bg-muted text-muted-foreground border border-border"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
