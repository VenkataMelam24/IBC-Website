import nodemailer from "nodemailer";
import { createServerClient } from "@/lib/supabase";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

export async function POST(request: Request) {
  try {
    const { id, items, discount, description } = await request.json() as {
      id: string;
      items: { name: string; qty: number; price: number }[];
      discount: number;
      description: string;
    };

    if (!id || !items?.length) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data: booking, error: fetchErr } = await supabase
      .from("catering_bookings")
      .select("name,email,date,guests,booking_type")
      .eq("id", id)
      .single();

    if (fetchErr || !booking) {
      return Response.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discountAmt = subtotal * (discount / 100);
    const total = subtotal - discountAmt;

    const itemRows = items.map((item) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ddd3;color:#333">${esc(item.name)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ddd3;color:#666;text-align:center">${item.qty}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ddd3;color:#666;text-align:right">€${item.price.toFixed(2)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ddd3;font-weight:600;text-align:right">€${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `).join("");

    const discountRow = discount > 0 ? `
      <tr>
        <td colspan="3" style="padding:10px 16px;color:#666;text-align:right;font-style:italic">Discount (${discount}%)</td>
        <td style="padding:10px 16px;color:#c0392b;font-weight:600;text-align:right">- €${discountAmt.toFixed(2)}</td>
      </tr>
    ` : "";

    const html = `
      <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;background:#fdf8f3;border-radius:12px;overflow:hidden;border:1px solid #e8ddd3">
        <div style="background:#6b1e2e;padding:36px 40px">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.3em;color:rgba(255,255,255,0.6);text-transform:uppercase">Indian Biryani Company</p>
          <h1 style="margin:8px 0 4px;font-size:28px;color:#fff;font-weight:700">Your Catering Quotation</h1>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75)">Prepared especially for you</p>
        </div>

        <div style="padding:36px 40px">
          <p style="margin:0 0 6px;font-size:15px;color:#333">Dear <strong>${esc(booking.name)}</strong>,</p>
          <p style="margin:0 0 28px;font-size:14px;line-height:1.7;color:#555">
            Thank you for your interest in catering with Indian Biryani Company. Please find your personalised quotation below.
            We look forward to making your event a delicious success!
          </p>

          <div style="background:#fff;border-radius:8px;border:1px solid #e8ddd3;margin-bottom:24px;overflow:hidden">
            <div style="background:#f9f1e7;padding:14px 16px;border-bottom:1px solid #e8ddd3">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b1e2e">Event Details</p>
            </div>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <tr>
                <td style="padding:10px 16px;color:#888;width:40%">Event Date</td>
                <td style="padding:10px 16px;font-weight:600;color:#333">${esc(booking.date)}</td>
              </tr>
              <tr style="background:#fdf8f3">
                <td style="padding:10px 16px;color:#888">Guests</td>
                <td style="padding:10px 16px;font-weight:600;color:#333">${esc(booking.guests)}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#888">Type</td>
                <td style="padding:10px 16px;font-weight:600;color:#333">${booking.booking_type === "inhouse" ? "In-House (at IBC Restaurant)" : "At Your Venue"}</td>
              </tr>
            </table>
          </div>

          <div style="background:#fff;border-radius:8px;border:1px solid #e8ddd3;margin-bottom:24px;overflow:hidden">
            <div style="background:#f9f1e7;padding:14px 16px;border-bottom:1px solid #e8ddd3">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b1e2e">Quotation Breakdown</p>
            </div>
            <table style="width:100%;font-size:13px;border-collapse:collapse">
              <thead>
                <tr style="background:#fdf8f3">
                  <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#888">Item</th>
                  <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#888">Qty</th>
                  <th style="padding:10px 16px;text-align:right;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#888">Unit Price</th>
                  <th style="padding:10px 16px;text-align:right;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#888">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows}
                ${discountRow}
                <tr style="background:#6b1e2e">
                  <td colspan="3" style="padding:14px 16px;font-weight:700;color:#fff;font-size:14px">Grand Total</td>
                  <td style="padding:14px 16px;font-weight:700;color:#fff;font-size:18px;text-align:right">€${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          ${description ? `
          <div style="background:#fff;border-radius:8px;border:1px solid #e8ddd3;margin-bottom:24px;padding:18px 20px">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b1e2e">Note from our team</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#444">${esc(description)}</p>
          </div>
          ` : ""}

          <p style="font-size:13px;color:#555;line-height:1.7;margin:0 0 24px">
            This quotation is valid for 7 days. To confirm your booking or if you have any questions, please reply to this email or contact us directly.
          </p>

          <div style="padding:20px;background:#fff;border-radius:8px;border:1px solid #e8ddd3;font-size:13px;color:#888;line-height:1.8">
            <strong style="color:#6b1e2e;font-size:14px">Indian Biryani Company</strong><br>
            Berlin, Germany<br>
            📞 +49 177 3771839 (WhatsApp) · 030 2083 3623<br>
            📧 theindianbiryanicompany@gmail.com
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Indian Biryani Company" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject: `Your Catering Quotation – Indian Biryani Company`,
      html,
    });

    await supabase
      .from("catering_bookings")
      .update({
        quote_items: items,
        quote_discount: discount,
        quote_description: description || null,
        quote_sent_at: new Date().toISOString(),
        status: "quoted",
      })
      .eq("id", id);

    return Response.json({ success: true });
  } catch (err) {
    console.error("send-quote error:", err);
    return Response.json({ success: false, error: "Failed to send quote" }, { status: 500 });
  }
}
