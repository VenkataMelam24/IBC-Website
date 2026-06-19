import { renderToBuffer } from "@react-pdf/renderer";
import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";
import { InvoiceDocument, type InvoiceData, type InvoiceLineItem } from "@/lib/invoice-pdf";
import React from "react";
import fs from "fs";
import path from "path";

function getLogoBase64(): string {
  const logoPath = path.join(process.cwd(), "public", "images", "logo-new.png");
  const buffer = fs.readFileSync(logoPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export const runtime = "nodejs";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

async function generateInvoiceNumber(supabase: ReturnType<typeof createServerClient>): Promise<string> {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = `IBC-${year}-`;
  const { data } = await supabase
    .from("invoices")
    .select("invoice_number")
    .ilike("invoice_number", `${prefix}%`)
    .order("invoice_number", { ascending: false })
    .limit(1);

  if (!data?.length) return `${prefix}001`;
  const last = parseInt(data[0].invoice_number.replace(prefix, ""), 10);
  return `${prefix}${String(last + 1).padStart(3, "0")}`;
}

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      client: { company?: string; name?: string; street: string; city: string; country: string; email: string };
      invoiceDate: string;
      dueDate: string;
      deliveryDate: string;
      lineItems: InvoiceLineItem[];
    };

    const supabase = createServerClient();

    // Get bank details
    const { data: settings } = await supabase.from("company_settings").select("*").eq("id", 1).single();
    const bankName = settings?.bank_name ?? "berliner-volksbank";
    const iban = settings?.iban ?? "DE23 1009 0000 2648 2910 03";
    const bic = settings?.bic ?? "BEVODEBB";

    // Calculate totals
    const totalNet = body.lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const totalVat = body.lineItems.reduce((s, i) => s + (i.quantity * i.unitPrice * i.vatRate) / 100, 0);
    const totalGross = totalNet + totalVat;

    const invoiceNumber = await generateInvoiceNumber(supabase);

    const invoiceData: InvoiceData = {
      invoiceNumber,
      invoiceDate: body.invoiceDate,
      dueDate: body.dueDate,
      deliveryDate: body.deliveryDate,
      client: body.client,
      lineItems: body.lineItems,
      totalNet,
      totalVat,
      totalGross,
      bankName,
      iban,
      bic,
      logoBase64: getLogoBase64(),
    };

    // Generate PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(React.createElement(InvoiceDocument, { data: invoiceData }) as any);

    // Save to DB
    const { data: saved, error: dbErr } = await supabase.from("invoices").insert({
      invoice_number: invoiceNumber,
      client_company: body.client.company ?? null,
      client_name: body.client.name ?? null,
      client_street: body.client.street,
      client_city: body.client.city,
      client_country: body.client.country,
      client_email: body.client.email,
      invoice_date: body.invoiceDate,
      due_date: body.dueDate,
      delivery_date: body.deliveryDate,
      line_items: body.lineItems,
      total_net: totalNet,
      total_vat: totalVat,
      total_gross: totalGross,
      status: "sent",
    }).select().single();

    if (dbErr) return Response.json({ error: dbErr.message }, { status: 500 });

    // Send email
    await transporter.sendMail({
      from: `"Indian Biryani Company" <${process.env.SMTP_USER}>`,
      to: body.client.email,
      subject: `Invoice ${invoiceNumber} – Indian Biryani Company`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fdf8f3;border-radius:12px;overflow:hidden;border:1px solid #e8ddd3">
          <div style="background:#6b1e2e;padding:32px 36px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.3em;color:rgba(255,255,255,0.6);text-transform:uppercase">Indian Biryani Company</p>
            <h1 style="margin:8px 0 4px;font-size:24px;color:#fff;font-weight:700">Invoice ${invoiceNumber}</h1>
          </div>
          <div style="padding:32px 36px">
            <p style="margin:0 0 16px;font-size:14px;color:#555">Dear ${body.client.company ?? body.client.name ?? "Customer"},</p>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#555">
              Please find your invoice attached as a PDF. The invoice is provided in both German and English.
            </p>
            <table style="width:100%;font-size:13px;border-collapse:collapse;background:#fff;border-radius:8px;border:1px solid #e8ddd3">
              <tr><td style="padding:10px 16px;color:#888;border-bottom:1px solid #e8ddd3">Invoice No.</td><td style="padding:10px 16px;font-weight:600;border-bottom:1px solid #e8ddd3">${invoiceNumber}</td></tr>
              <tr><td style="padding:10px 16px;color:#888;border-bottom:1px solid #e8ddd3">Invoice Date</td><td style="padding:10px 16px;font-weight:600;border-bottom:1px solid #e8ddd3">${body.invoiceDate}</td></tr>
              <tr><td style="padding:10px 16px;color:#888;border-bottom:1px solid #e8ddd3">Due Date</td><td style="padding:10px 16px;font-weight:600;border-bottom:1px solid #e8ddd3">${body.dueDate}</td></tr>
              <tr style="background:#6b1e2e"><td style="padding:12px 16px;color:#fff;font-weight:700">Total</td><td style="padding:12px 16px;color:#fff;font-weight:700">€${totalGross.toFixed(2)}</td></tr>
            </table>
            <p style="margin:24px 0 0;font-size:13px;color:#888">
              Payment reference: <strong>${invoiceNumber}</strong><br>
              IBAN: <strong>${iban}</strong> – ${bankName}
            </p>
          </div>
        </div>
      `,
      attachments: [{ filename: `${invoiceNumber}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
    });

    return Response.json({ success: true, invoice: saved });
  } catch (err) {
    console.error("invoice error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
