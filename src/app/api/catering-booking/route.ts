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
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      bookingType,
      date,
      startTime,
      endTime,
      guests,
      postcode,
      menuItems,
      selectedDishes,
      estimatedTotal,
      name,
      phone,
      email,
      notes,
    } = data;

    if (!name || !email || !phone || !bookingType || !date || !guests) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const isInhouse = bookingType === "inhouse";

    const detailsHtml = isInhouse ? `
      <tr><td style="color:#888;padding:6px 0">Booking Type</td><td style="font-weight:600;padding:6px 0">In-House (at IBC Restaurant)</td></tr>
      <tr><td style="color:#888;padding:6px 0">Date</td><td style="font-weight:600;padding:6px 0">${esc(date)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Time</td><td style="font-weight:600;padding:6px 0">${esc(startTime)} – ${esc(endTime)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Number of Guests</td><td style="font-weight:600;padding:6px 0">${esc(guests)}</td></tr>
      ${selectedDishes ? `<tr><td style="color:#888;padding:6px 0">Dishes of Interest</td><td style="font-weight:600;padding:6px 0">${esc(selectedDishes)}</td></tr>` : ""}
      ${notes ? `<tr><td style="color:#888;padding:6px 0">Special Requirements</td><td style="font-weight:600;padding:6px 0">${esc(notes)}</td></tr>` : ""}
    ` : `
      <tr><td style="color:#888;padding:6px 0">Booking Type</td><td style="font-weight:600;padding:6px 0">At Your Venue</td></tr>
      <tr><td style="color:#888;padding:6px 0">Postcode</td><td style="font-weight:600;padding:6px 0">${esc(postcode)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Date</td><td style="font-weight:600;padding:6px 0">${esc(date)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Approx. Guests</td><td style="font-weight:600;padding:6px 0">${esc(guests)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Menu Items</td><td style="font-weight:600;padding:6px 0">${esc(menuItems)}</td></tr>
      <tr><td style="color:#888;padding:6px 0">Estimated Total</td><td style="font-weight:600;padding:6px 0">${esc(estimatedTotal)} (excl. VAT)</td></tr>
      ${notes ? `<tr><td style="color:#888;padding:6px 0">Special Requirements</td><td style="font-weight:600;padding:6px 0">${esc(notes)}</td></tr>` : ""}
    `;

    const emailBase = (title: string, intro: string, body: string) => `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fdf8f3;border-radius:12px;overflow:hidden;border:1px solid #e8ddd3">
        <div style="background:#6b1e2e;padding:32px 36px">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.3em;color:rgba(255,255,255,0.6);text-transform:uppercase">Indian Biryani Company</p>
          <h1 style="margin:8px 0 0;font-size:26px;color:#fff;font-weight:700">${title}</h1>
        </div>
        <div style="padding:32px 36px">
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#444">${intro}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;border-top:1px solid #e8ddd3">
            ${body}
          </table>
          <div style="margin-top:32px;padding:20px;background:#fff;border-radius:8px;border:1px solid #e8ddd3;font-size:13px;color:#888;line-height:1.6">
            <strong style="color:#6b1e2e">Indian Biryani Company</strong><br>
            Berlin, Germany<br>
            📞 +49 177 3771839 (WhatsApp) · 030 2083 3623<br>
            📧 theindianbiryanicompany@gmail.com
          </div>
        </div>
      </div>
    `;

    // ── Email 1: Acknowledgement to customer ──
    const customerHtml = emailBase(
      "We've Received Your Enquiry!",
      `Dear ${esc(name)}, thank you for your catering enquiry with Indian Biryani Company. We have received your request and our team will call you shortly to confirm all the details.`,
      detailsHtml
    );

    await transporter.sendMail({
      from: `"Indian Biryani Company" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Catering Enquiry – Indian Biryani Company",
      html: customerHtml,
    });

    // ── Email 2: Notification to IBC ──
    const ibcHtml = emailBase(
      "New Catering Enquiry",
      `A new catering enquiry has been submitted. Contact details below — please call the customer to confirm.`,
      `
        <tr><td style="color:#888;padding:6px 0">Customer Name</td><td style="font-weight:600;padding:6px 0">${esc(name)}</td></tr>
        <tr><td style="color:#888;padding:6px 0">Phone</td><td style="font-weight:600;padding:6px 0">${esc(phone)}</td></tr>
        <tr><td style="color:#888;padding:6px 0">Email</td><td style="font-weight:600;padding:6px 0">${esc(email)}</td></tr>
        ${detailsHtml}
      `
    );

    await transporter.sendMail({
      from: `"IBC Website" <${process.env.SMTP_USER}>`,
      to: process.env.IBC_EMAIL,
      subject: `New Catering Enquiry – ${name} (${isInhouse ? "In-House" : "At Your Venue"})`,
      html: ibcHtml,
    });

    // ── Save to Supabase ──
    const supabase = createServerClient();
    await supabase.from("catering_bookings").insert({
      name,
      email,
      phone,
      booking_type: bookingType,
      date,
      guests: String(guests),
      status: "new",
      message: notes ?? null,
      details: isInhouse
        ? { startTime, endTime, selectedDishes }
        : { postcode, menuItems, estimatedTotal },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Catering booking email error:", error);
    return Response.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}
