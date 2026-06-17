import { createServerClient } from "@/lib/supabase";
import { MenuPriceEditor } from "./menu-price-editor";

export const dynamic = "force-dynamic";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  price_label: string;
  menu_type: string;
  display_order: number;
  active: boolean;
};

export default async function MenuPricesPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("id,name,category,price,price_label,menu_type,display_order,active")
    .order("menu_type", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load menu items: {error.message}
      </div>
    );
  }

  const items = (data ?? []) as MenuItem[];
  const cateringItems = items.filter((i) => i.menu_type === "catering");
  const dineinItems = items.filter((i) => i.menu_type === "dinein");

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Menu Prices</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update prices here — changes reflect on the website menu and in the Quote Builder immediately.
        </p>
      </div>

      <MenuPriceEditor cateringItems={cateringItems} dineinItems={dineinItems} />
    </div>
  );
}
