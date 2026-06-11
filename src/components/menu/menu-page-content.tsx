"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuRow } from "@/components/menu/menu-row";
import { menuCategories, type MenuItem } from "@/data/menu";

function CateringCard({ name, nameSuffix, price, description, image, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" }: {
  name: string; nameSuffix?: string; price: string; description: string; image: string; sizes?: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] bg-background shadow-luxury">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={name} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href="/catering/book"
            target="_blank"
            className="inline-flex h-11 items-center rounded bg-accent px-6 text-sm font-bold text-accent-foreground transition hover:opacity-90"
          >
            Book Catering
          </a>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
            {name}{nameSuffix && <span className="ml-1 text-sm font-normal text-muted-foreground">{nameSuffix}</span>}
          </h3>
          {price && <span className="shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-bold tracking-wide text-primary">{price}</span>}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}

export function MenuPageContent() {
  const [activeTab, setActiveTab] = useState<"dine-in" | "catering">("dine-in");
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
      {/* ── Tab switcher ── */}
      <div className="border-b border-border bg-background px-6 py-10 text-center lg:px-10">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">Discover our menu.</h1>
        <div className="mt-8 inline-flex rounded-full bg-muted p-1">
          <button
            type="button"
            onClick={() => setActiveTab("dine-in")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              activeTab === "dine-in"
                ? "bg-primary text-primary-foreground shadow"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Dine-in &amp; Delivery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("catering")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              activeTab === "catering"
                ? "bg-primary text-primary-foreground shadow"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Catering
          </button>
        </div>
      </div>

      {activeTab === "dine-in" ? (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-14 lg:px-10 lg:py-20">
          {menuCategories.map((category) => (
            <MenuRow key={category.id} category={category} onSelectItem={setSelectedItem} />
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          {/* Biryanis */}
          <div>
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">Biryanis</h2>
            <div className="mt-2.5 h-1 w-10 rounded-full bg-primary" />
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              Each full tray serves 10–12 people
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Chicken Biryani", price: "€119", description: "Aromatic basmati rice prepared with tender chicken, fragrant spices, and fresh herbs. Served in a catering tray.", image: "/images/catering-chicken-biryani.png" },
                { name: "Mutton Biryani",  price: "€169", description: "Slow-cooked mutton with aromatic basmati rice, whole spices, and caramelised onions. Ideal for large gatherings.", image: "/images/catering-mutton-biryani.png" },
                { name: "Veg Biryani",     price: "€99",  description: "Fragrant basmati rice cooked with seasonal vegetables, herbs, and Indian spices. A wholesome vegetarian option.", image: "/images/catering-veg-biryani.png" },
              ].map((item) => (
                <CateringCard key={item.name} {...item} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              ))}
            </div>
          </div>

          {/* Appetizers */}
          <div className="mt-16">
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">Appetizers</h2>
            <div className="mt-2.5 h-1 w-10 rounded-full bg-primary" />
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
              Each full tray serves 10–12 people
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Chilli Chicken", price: "€99",  description: "Crispy chicken tossed in a bold, spicy Indo-Chinese sauce with peppers and onions.", image: "/images/catering-chili-chicken.png" },
                { name: "Chilli Paneer",  price: "€99",  description: "Golden paneer cubes stir-fried with capsicum and onions in a tangy chilli sauce.", image: "/images/catering-chilli-paneer.png" },
                { name: "Chilli Gobi",    price: "€99",  description: "Crispy cauliflower florets tossed in a fiery Indo-Chinese sauce with fresh vegetables.", image: "/images/catering-chili-gobi.png" },
                { name: "Chilli Shrimp",  price: "€129", description: "Juicy shrimp sautéed in a spicy, tangy chilli sauce with peppers and spring onions.", image: "/images/catering-chilli-shrimp.png" },
              ].map((item) => (
                <CateringCard key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Curries */}
          <div className="mt-16">
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">Curries</h2>
            <div className="mt-2.5 h-1 w-10 rounded-full bg-primary" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Chicken Tikka Masala",  price: "from €50", description: "Tender chicken tikka simmered in a rich, smoky tomato and spice gravy.", image: "/images/catering-chicken-tikka-masala.png" },
                { name: "Chicken Butter Masala", price: "from €50", description: "Succulent chicken in a velvety, mildly spiced butter tomato sauce.", image: "/images/catering-chicken-butter-masala.png" },
                { name: "Paneer Tikka Masala",   price: "from €50", description: "Grilled paneer cubes in a bold, smoky tomato masala gravy.", image: "/images/catering-paneer-tikka-masala.png" },
                { name: "Paneer Butter Masala",  price: "from €50", description: "Soft paneer in a rich, creamy butter tomato sauce with aromatic spices.", image: "/images/catering-paneer-butter-masala.png" },
              ].map((item) => (
                <CateringCard key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-16">
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">Add-ons</h2>
            <div className="mt-2.5 h-1 w-10 rounded-full bg-primary" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Mango Lassi", nameSuffix: "(10 Litres)", price: "€70", description: "Creamy, refreshing mango lassi made with ripe mangoes and yoghurt. Perfect for large gatherings.", image: "/images/catering-mango-lassi.png" },
                { name: "Double Ka Meetha", price: "€60", description: "A classic Hyderabadi bread dessert soaked in saffron-infused milk with nuts and cardamom.", image: "/images/catering-double-ka-meetha.png" },
              ].map((item) => (
                <CateringCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        </div>
      )}

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
