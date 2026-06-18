import { createServerClient } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
  quote_sent_at: string | null;
};

const statusBadge: Record<string, string> = {
  new: "bg-green-50 text-green-700",
  quoted: "bg-amber-50 text-amber-700",
};

export default async function EnquiriesPage() {
  const supabase = createServerClient();
  const { data: bookings, error } = await supabase
    .from("catering_bookings")
    .select("id,created_at,name,email,phone,booking_type,date,guests,status,quote_sent_at")
    .in("status", ["new", "quoted"])
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">Active Enquiries</h2>
        <p className="mt-1 text-sm text-muted-foreground">New and quoted enquiries awaiting action.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load: {error.message}
        </div>
      ) : !bookings || bookings.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-10 text-center">
          <p className="font-heading text-lg font-bold text-foreground">No active enquiries</p>
          <p className="mt-2 text-sm text-muted-foreground">New catering enquiries will appear here.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">{bookings.length} enquir{bookings.length === 1 ? "y" : "ies"}</p>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {(bookings as Booking[]).map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-background p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{b.name}</p>
                    <p className="text-sm text-muted-foreground">{b.phone}</p>
                  </div>
                  <span className={`shrink-0 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[b.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {b.status === "quoted" ? "Quote Sent" : b.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Event: <span className="font-semibold text-foreground">{b.date}</span></span>
                  <span>Guests: <span className="font-semibold text-foreground">{b.guests}</span></span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 font-semibold ${b.booking_type === "inhouse" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                    {b.booking_type === "inhouse" ? "In-House" : "At Venue"}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Received {new Date(b.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </div>
                <div className="mt-3">
                  <Link
                    href={`/admin/dashboard/enquiries/${b.id}`}
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-80"
                  >
                    Open →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-background shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-[hsl(32_40%_95%)]">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Received</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Date</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Guests</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(bookings as Booking[]).map((b) => (
                    <tr key={b.id} className="hover:bg-[hsl(32_40%_97%)]">
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {new Date(b.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        <br />
                        <span className="text-xs">{new Date(b.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">{b.name}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-foreground">{b.phone}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.booking_type === "inhouse" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                          {b.booking_type === "inhouse" ? "In-House" : "At Venue"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-foreground">{b.date}</td>
                      <td className="px-5 py-4 text-foreground">{b.guests}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[b.status] ?? "bg-gray-100 text-gray-500"}`}>
                          {b.status === "quoted" ? "Quote Sent" : b.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <Link
                          href={`/admin/dashboard/enquiries/${b.id}`}
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:opacity-80"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
