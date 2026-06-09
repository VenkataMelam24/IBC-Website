"use client";

import Image from "next/image";
import type { MenuCategory, MenuItem } from "@/data/menu";

type MenuRowProps = {
  category: MenuCategory;
  onSelectItem?: (item: MenuItem) => void;
};

export function MenuRow({ category, onSelectItem }: MenuRowProps) {
  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {category.title}
        </h2>
        <div className="mt-1 h-1 w-16 bg-primary" />
      </div>

      <div className="no-scrollbar flex gap-5 overflow-x-auto pb-1">
        {category.items.map((item) => (
          <article
            key={item.name}
            role="button"
            tabIndex={0}
            onClick={() => onSelectItem?.(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectItem?.(item);
              }
            }}
            className="group/item w-[76vw] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-background text-left transition-shadow hover:shadow-md sm:w-[280px]"
          >
            <div className="relative h-52 overflow-hidden">
              {item.image ? (
                <Image
                  src={encodeURI(item.image)}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 76vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {item.name}
                </h3>
                <span className="shrink-0 font-bold text-primary">{item.price}</span>
              </div>
              {item.description ? (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
