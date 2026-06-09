"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuRow } from "@/components/menu/menu-row";
import { menuCategories, type MenuItem } from "@/data/menu";

export function MenuPageContent() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-14 lg:px-10 lg:py-20">
        {menuCategories.map((category) => (
          <MenuRow key={category.id} category={category} onSelectItem={setSelectedItem} />
        ))}
      </div>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-8"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[hsl(var(--background))] text-foreground shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {selectedItem.image ? (
                <Image
                  src={encodeURI(selectedItem.image)}
                  alt={selectedItem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(ellipse_at_26%_20%,hsl(var(--accent)/0.38),transparent_45%),radial-gradient(ellipse_at_76%_72%,hsl(var(--copper)/0.34),transparent_56%),linear-gradient(150deg,hsl(var(--primary)/0.78),hsl(12_50%_20%)_82%)]" />
              )}
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-cream transition-colors hover:bg-black/70"
                aria-label="Close product details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 pb-6 pt-5 md:px-8">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-3xl leading-tight text-foreground">{selectedItem.name}</h3>
                <p className="pt-1 text-lg font-semibold text-primary">{selectedItem.price}</p>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
