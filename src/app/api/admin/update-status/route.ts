import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json() as { id: string; status: string };

    if (!id || !["confirmed", "rejected", "completed"].includes(status)) {
      return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("catering_bookings")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error("update-status error:", err);
    return Response.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}
