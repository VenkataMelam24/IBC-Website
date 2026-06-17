import { createServerClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { QuoteBuilder } from "./quote-builder";
import { CompleteOrderButton } from "../../orders/complete-order-button";

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
  message: string | null;
  details: Record<string, string> | null;
  quote_items: { name: string; qty: number; price: number }[] | null;
  quote_discount: number | null;
  quote_description: string | null;
  quote_sent_at: string | null;
};

const statusBadge: Record<string, string> = {
  new: "bg-green-50 text-green-700",
  quoted: "bg-amber-50 text-amber-700",
  confirmed: "bg-primary/10 text-primary",
  rejected: "bg-red-50 text-red-700",
};

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data: booking, error } = await supabase
    .from("catering_bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !booking) notFound();

  const b = booking as Booking;

  // Extract initial item names from the booking details for pre-populating the quote builder
  let initialItemNames: string[] = [];
  if (b.details) {
    if (b.booking_type === "inhouse" && b.details.selectedDishes) {
      initialItemNames = b.details.selectedDishes.split(",").map((s: string) => s.trim()).filter(Boolean);
    } else if (b.booking_type !== "inhouse" && b.details.menuItems) {
      initialItemNames = b.details.menuItems.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
  }

  const isActive = b.status === "new" || b.status === "quoted";

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/dashboard/enquiries" className="text-sm font-semibold text-primary hover:opacity-70">
          ← Back
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm text-muted-foreground">{b.name}</span>
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[b.status] ?? "bg-gray-100 text-gray-500"}`}>
          {b.status === "quoted" ? "Quote Sent" : b.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_440px]">
        {/* Left: enquiry details */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="border-b border-border bg-[hsl(32_40%_97%)] px-6 py-4">
              <h3 className="font-heading text-lg font-bold text-foreground">Enquiry Details</h3>
              <p className="text-xs text-muted-foreground">
                Received {new Date(b.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} at{" "}
                {new Date(b.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {[
                  ["Name", b.name],
                  ["Email", b.email],
                  ["Phone", b.phone],
                  ["Event Date", b.date],
                  ["Guests", b.guests],
                  ["Booking Type", b.booking_type === "inhouse" ? "In-House (at IBC Restaurant)" : "At Your Venue"],
                  ...(b.booking_type === "inhouse" && b.details
                    ? [
                        ["Start Time", b.details.startTime ?? "—"],
                        ["End Time", b.details.endTime ?? "—"],
                        ["Dishes of Interest", b.details.selectedDishes ?? "—"],
                      ]
                    : b.details
                    ? [
                        ["Postcode", b.details.postcode ?? "—"],
                        ["Menu Items", b.details.menuItems ?? "—"],
                        ["Estimated Total", b.details.estimatedTotal ? `€${b.details.estimatedTotal}` : "—"],
                      ]
                    : []),
                  ...(b.message ? [["Special Requirements", b.message]] : []),
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-[hsl(32_40%_98%)]">
                    <td className="w-[180px] px-6 py-3 text-muted-foreground">{label}</td>
                    <td className="px-6 py-3 font-semibold text-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {b.quote_sent_at && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-800">
              <p className="font-bold">Quote sent {new Date(b.quote_sent_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} at {new Date(b.quote_sent_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="mt-0.5 text-amber-700">The customer received a quotation email. Use the quote builder to send an updated quote if needed.</p>
            </div>
          )}

          {isActive && (
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-foreground">Once you and the customer have agreed:</p>
              <div className="flex gap-3">
                <CompleteOrderButton id={b.id} name={b.name} />
              </div>
            </div>
          )}
        </div>

        {/* Right: quote builder */}
        {isActive && (
          <QuoteBuilder
            bookingId={b.id}
            customerName={b.name}
            customerEmail={b.email}
            initialItems={initialItemNames}
            existingItems={b.quote_items}
            existingDiscount={b.quote_discount ?? 0}
            existingDescription={b.quote_description ?? ""}
            isQuoted={b.status === "quoted"}
          />
        )}
      </div>
    </div>
  );
}
