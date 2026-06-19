import { renderToBuffer } from "@react-pdf/renderer";
import { createServerClient } from "@/lib/supabase";
import { InvoiceDocument, type InvoiceData, type InvoiceLineItem } from "@/lib/invoice-pdf";
import React from "react";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

function getLogoBase64(): string {
  const logoPath = path.join(process.cwd(), "public", "images", "logo-new.png");
  const buffer = fs.readFileSync(logoPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

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
    whatsappPhone: settings?.whatsapp_phone ?? "+49 177 3771839",
    phone: settings?.phone ?? "030 20833623",
    contactEmail: settings?.contact_email ?? "info@theibc.de",
    logoBase64: getLogoBase64(),
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      client: { company?: string; name?: string; street: string; city: string; country: string; email: string };
      invoiceDate: string; dueDate: string; deliveryDate: string;
      lineItems: InvoiceLineItem[];
      sendEmail: boolean;
    };

    const supabase = createServerClient();
    const { data: existing } = await supabase.from("invoices").select("invoice_number").eq("id", id).single();
    if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

    const totalNet = body.lineItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const totalVat = body.lineItems.reduce((s, i) => s + (i.quantity * i.unitPrice * i.vatRate) / 100, 0);
    const totalGross = totalNet + totalVat;

    const { data: settings } = await supabase.from("company_settings").select("*").eq("id", 1).single();

    const { data: updated, error: dbErr } = await supabase.from("invoices").update({
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
      status: body.sendEmail ? "sent" : "draft",
    }).eq("id", id).select().single();

    if (dbErr) return Response.json({ error: dbErr.message }, { status: 500 });

    if (!body.sendEmail) return Response.json({ success: true, invoice: updated });

    const invoiceData: InvoiceData = {
      invoiceNumber: existing.invoice_number,
      invoiceDate: body.invoiceDate, dueDate: body.dueDate, deliveryDate: body.deliveryDate,
      client: body.client, lineItems: body.lineItems,
      totalNet, totalVat, totalGross,
      bankName: settings?.bank_name ?? "berliner-volksbank",
      iban: settings?.iban ?? "DE23 1009 0000 2648 2910 03",
      bic: settings?.bic ?? "BEVODEBB",
      whatsappPhone: settings?.whatsapp_phone ?? "+49 177 3771839",
      phone: settings?.phone ?? "030 20833623",
      contactEmail: settings?.contact_email ?? "info@theibc.de",
      logoBase64: getLogoBase64(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(React.createElement(InvoiceDocument, { data: invoiceData }) as any);

    await transporter.sendMail({
      from: `"Indian Biryani Company" <${process.env.SMTP_USER}>`,
      to: body.client.email,
      subject: `Invoice ${existing.invoice_number} – Indian Biryani Company`,
      html: `<p>Dear ${body.client.company ?? body.client.name ?? "Customer"},</p><p>Please find your invoice <strong>${existing.invoice_number}</strong> attached.</p><p>Total: <strong>€${totalGross.toFixed(2)}</strong></p>`,
      attachments: [{ filename: `${existing.invoice_number}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
    });

    return Response.json({ success: true, invoice: updated });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
