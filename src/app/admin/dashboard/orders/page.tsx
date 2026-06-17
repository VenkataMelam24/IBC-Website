import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import { CompleteOrderButton } from "./complete-order-button";

type Booking = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  booking_type: string;
  date: string;
  guests: string;
  status: string;
  quote_items: { name: string; qty: number; price: number }[] | null;
  quote_discount: number | null;
  quote_description: string | null;
};

export default async function OrdersPage() {
  const supabase = createServerClient();
  const { data: orders, error } = await supabase
    .from("catering_bookings")
    .select("id,created_at,name,email,phone,booking_type,date,guests,status,quote_items,quote_discount,quote_description")
    .eq("status", "confirmed")
    .order("date", { ascending: true });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Active Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">Confirmed deals — upcoming events.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load: {error.message}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-12 text-center">
          <p className="font-heading text-xl font-bold text-foreground">No active orders</p>
          <p className="mt-2 text-sm text-muted-foreground">Confirmed deals will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {(orders as Booking[]).map((o) => {
            const subtotal = o.quote_items?.reduce((s, i) => s + i.price * i.qty, 0) ?? 0;
            const discount = o.quote_discount ?? 0;
            const total = subtotal * (1 - discount / 100);
            return (
              <div key={o.id} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-border bg-[hsl(32_40%_97%)] px-6 py-4">
                  <div>
                    <p className="font-heading text-lg font-bold text-foreground">{o.name}</p>
                    <p className="text-sm text-muted-foreground">{o.phone} · {o.email}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-foreground">Event: {o.date}</p>
                    <p className="text-muted-foreground">{o.guests} guests · {o.booking_type === "inhouse" ? "In-House" : "At Venue"}</p>
                  </div>
                </div>

                <div className="px-6 py-4">
                  {o.quote_items && o.quote_items.length > 0 && (
                    <table className="mb-4 w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-xs text-muted-foreground">
                          <th className="pb-2 text-left font-semibold">Item</th>
                          <th className="pb-2 text-right font-semibold">Qty</th>
                          <th className="pb-2 text-right font-semibold">Price</th>
                          <th className="pb-2 text-right font-semibold">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {o.quote_items.map((item, i) => (
                          <tr key={i}>
                            <td className="py-2 text-foreground">{item.name}</td>
                            <td className="py-2 text-right text-muted-foreground">{item.qty}</td>
                            <td className="py-2 text-right text-muted-foreground">€{item.price.toFixed(2)}</td>
                            <td className="py-2 text-right font-semibold text-foreground">€{(item.price * item.qty).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {discount > 0 && (
                    <p className="text-sm text-muted-foreground">Discount: {discount}% → <span className="font-bold text-primary">€{total.toFixed(2)}</span></p>
                  )}
                  {o.quote_description && (
                    <p className="mt-2 rounded-lg bg-[hsl(38_48%_95%)] px-4 py-3 text-sm text-foreground">{o.quote_description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-border px-6 py-4">
                  <Link href={`/admin/dashboard/enquiries/${o.id}`} className="text-sm font-semibold text-primary underline-offset-2 hover:underline">
                    View details
                  </Link>
                  <CompleteOrderButton id={o.id} name={o.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
