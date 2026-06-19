import { createServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: inv, error } = await supabase.from("invoices").select("*").eq("id", id).single();
  if (error || !inv) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(inv);
}
