import { createServerClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("company_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    return Response.json(
      { bank_name: "berliner-volksbank", iban: "DE23 1009 0000 2648 2910 03", bic: "BEVODEBB" }
    );
  }
  return Response.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json() as { bank_name: string; iban: string; bic: string };
  const supabase = createServerClient();

  const { error } = await supabase
    .from("company_settings")
    .upsert({ id: 1, ...body, updated_at: new Date().toISOString() });

  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  return Response.json({ success: true });
}
