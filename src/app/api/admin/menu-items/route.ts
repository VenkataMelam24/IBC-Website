import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("ibc_admin_session")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id, price, price_label } = await request.json();
  if (!id || price === undefined || !price_label) {
    return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from("menu_items")
    .update({ price, price_label, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
