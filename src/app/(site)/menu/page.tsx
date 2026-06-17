import type { Metadata } from "next";
import Image from "next/image";
import { MenuPageContent } from "@/components/menu/menu-page-content";
import { createServerClient } from "@/lib/supabase";
import type { CateringMenuCategory } from "@/data/catering-menu";
import { cateringMenu as staticCateringMenu } from "@/data/catering-menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the full Indian Biryani Company menu — dum biryani, grills, curries, starters, breads, and desserts. Authentic Indian flavours in Berlin Charlottenburg.",
  alternates: { canonical: "https://theibc.de/menu" },
};

export default async function MenuPage() {
  // Fetch catering prices from Supabase; fall back to static data on error
  let cateringCategories: CateringMenuCategory[] = staticCateringMenu;
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("menu_items")
      .select("name,category,price,price_label,image,serving_note,display_order")
      .eq("menu_type", "catering")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (data && data.length > 0) {
      // Group into categories preserving order
      const catMap = new Map<string, CateringMenuCategory>();
      for (const row of data) {
        if (!catMap.has(row.category)) {
          catMap.set(row.category, {
            category: row.category,
            servingNote: row.serving_note ?? undefined,
            items: [],
          });
        }
        catMap.get(row.category)!.items.push({
          name: row.name,
          price: row.price,
          priceLabel: row.price_label,
          image: row.image,
        });
      }
      cateringCategories = Array.from(catMap.values());
    }
  } catch {
    // use static fallback
  }
  return (
    <div className="bg-background">

      {/* ── Hero ── */}
      <section className="relative isolate min-h-[55vh] overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/menu-hero.png"
            alt="IBC Menu — fresh Indian food"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Left-side gradient so text stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(25_60%_78%/0.95)_0%,hsl(25_60%_78%/0.80)_30%,hsl(25_60%_78%/0.30)_58%,transparent_78%)]" />

        {/* Content */}
        <div className="relative flex min-h-[55vh] w-full items-center px-6 py-14 lg:px-10">
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              IBC Berlin
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.3] text-foreground sm:text-5xl lg:text-[3.25rem]">
              Our Menu.
            </h1>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-foreground/70 md:text-lg">
              From fragrant biryanis to rich curries. Explore everything we cook fresh every day, available for dine-in, delivery, and catering.
            </p>
          </div>
        </div>
      </section>

      <MenuPageContent cateringCategories={cateringCategories} />
    </div>
  );
}
