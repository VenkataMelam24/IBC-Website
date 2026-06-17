import { createServerClient } from "@/lib/supabase";

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
  quote_items: { name: string; qty: number; price: number }[] | null;
  quote_discount: number | null;
};

export default async function HistoryPage() {
  const supabase = createServerClient();
  const { data: records, error } = await supabase
    .from("catering_bookings")
    .select("id,created_at,name,email,phone,booking_type,date,guests,status,quote_items,quote_discount")
    .in("status", ["rejected", "completed"])
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">History</h2>
        <p className="mt-1 text-sm text-muted-foreground">Closed deals — confirmed completions and rejected enquiries.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load: {error.message}
        </div>
      ) : !records || records.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-12 text-center">
          <p className="font-heading text-xl font-bold text-foreground">No history yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Closed deals will appear here.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">{records.length} record{records.length === 1 ? "" : "s"}</p>
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-[hsl(32_40%_95%)]">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Date Received</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Date</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Guests</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(records as Booking[]).map((r) => (
                    <tr key={r.id} className="hover:bg-[hsl(32_40%_97%)]">
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">{r.name}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-foreground">{r.phone}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.booking_type === "inhouse" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                          {r.booking_type === "inhouse" ? "In-House" : "At Venue"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-foreground">{r.date}</td>
                      <td className="px-5 py-4 text-foreground">{r.guests}</td>
                      <td className="px-5 py-4">
                        {r.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            Deal not closed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Completed
                          </span>
                        )}
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
