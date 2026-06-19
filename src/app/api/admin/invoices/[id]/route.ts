import { renderToBuffer } from "@react-pdf/renderer";
import { createServerClient } from "@/lib/supabase";
import { InvoiceDocument, type InvoiceData } from "@/lib/invoice-pdf";
import React from "react";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: inv, error } = await supabase.from("invoices").select("*").eq("id", id).single();
  if (error || !inv) return Response.json({ error: "Not found" }, { status: 404 });

  const { data: settings } = await supabase.from("company_settings").select("*").eq("id", 1).single();

  const invoiceData: InvoiceData = {
    invoiceNumber: inv.invoice_number,
    invoiceDate: inv.invoice_date,
    dueDate: inv.due_date,
    deliveryDate: inv.delivery_date,
    client: {
      company: inv.client_company,
      name: inv.client_name,
      street: inv.client_street,
      city: inv.client_city,
      country: inv.client_country,
      email: inv.client_email,
    },
    lineItems: inv.line_items,
    totalNet: Number(inv.total_net),
    totalVat: Number(inv.total_vat),
    totalGross: Number(inv.total_gross),
    bankName: settings?.bank_name ?? "berliner-volksbank",
    iban: settings?.iban ?? "DE23 1009 0000 2648 2910 03",
    bic: settings?.bic ?? "BEVODEBB",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = await renderToBuffer(React.createElement(InvoiceDocument, { data: invoiceData }) as any);

  return new Response(pdfBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${inv.invoice_number}.pdf"`,
    },
  });
}
