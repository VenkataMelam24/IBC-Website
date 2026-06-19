"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type LineItem = { description: string; quantity: string; unitPrice: string; vatRate: string };

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`;
};
const toIso = (dmy: string) => {
  const [d, m, y] = dmy.split("/"); return `${y}-${m}-${d}`;
};

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [client, setClient] = useState({ company: "", name: "", street: "", city: "", country: "Deutschland", email: "" });
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: "1", unitPrice: "", vatRate: "7" }]);

  useEffect(() => {
    fetch(`/api/admin/invoices/${id}/data`)
      .then((r) => r.json())
      .then((inv) => {
        setInvoiceNumber(inv.invoice_number);
        setClient({
          company: inv.client_company ?? "",
          name: inv.client_name ?? "",
          street: inv.client_street,
          city: inv.client_city,
          country: inv.client_country,
          email: inv.client_email,
        });
        setInvoiceDate(toIso(inv.invoice_date));
        setDueDate(toIso(inv.due_date));
        setDeliveryDate(toIso(inv.delivery_date));
        setItems(inv.line_items.map((i: { description: string; quantity: number; unitPrice: number; vatRate: number }) => ({
          description: i.description,
          quantity: String(i.quantity),
          unitPrice: String(i.unitPrice),
          vatRate: String(i.vatRate),
        })));
        setLoading(false);
      });
  }, [id]);

  const setItem = (i: number, field: keyof LineItem, val: string) =>
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, [field]: val } : it));

  const addItem = () => setItems((p) => [...p, { description: "", quantity: "1", unitPrice: "", vatRate: "7" }]);
  const removeItem = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i));

  const totalNet = items.reduce((s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0), 0);
  const totalVat = items.reduce((s, i) => s + ((parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0) * (parseFloat(i.vatRate) || 0)) / 100, 0);
  const totalGross = totalNet + totalVat;

  const handleSubmit = async (action: "send" | "download") => {
    setSaving(true); setError(""); setSuccess("");
    try {
      const payload = {
        client: { company: client.company || undefined, name: client.name || undefined, street: client.street, city: client.city, country: client.country, email: client.email },
        invoiceDate: fmtDate(invoiceDate),
        dueDate: fmtDate(dueDate),
        deliveryDate: fmtDate(deliveryDate),
        lineItems: items.map((i) => ({ description: i.description, quantity: parseFloat(i.quantity), unitPrice: parseFloat(i.unitPrice), vatRate: parseFloat(i.vatRate) })),
        sendEmail: action === "send",
      };

      const res = await fetch(`/api/admin/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok || data.error) { setError(data.error ?? "Failed to update invoice"); setSaving(false); return; }

      if (action === "download") window.open(`/api/admin/invoices/${id}`, "_blank");

      setSuccess(`Invoice ${invoiceNumber} ${action === "send" ? "sent to " + client.email : "downloaded"}!`);
      setTimeout(() => router.push("/admin/dashboard/invoices"), 1500);
    } catch (e) {
      setError(String(e));
      setSaving(false);
    }
  };

  const inputCls = "w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const labelCls = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1";

  if (loading) return <div className="py-16 text-center text-sm text-muted-foreground">Loading invoice…</div>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="font-heading text-xl font-bold text-primary">Edit Invoice</h2>
          <p className="text-xs text-muted-foreground">{invoiceNumber}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Client */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Client Details</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className={labelCls}>Company Name</label><input className={inputCls} value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} /></div>
            <div><label className={labelCls}>Contact Name</label><input className={inputCls} value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} /></div>
            <div><label className={labelCls}>Street Address *</label><input className={inputCls} value={client.street} onChange={(e) => setClient({ ...client, street: e.target.value })} /></div>
            <div><label className={labelCls}>City & Postal Code *</label><input className={inputCls} value={client.city} onChange={(e) => setClient({ ...client, city: e.target.value })} /></div>
            <div><label className={labelCls}>Country</label><input className={inputCls} value={client.country} onChange={(e) => setClient({ ...client, country: e.target.value })} /></div>
            <div><label className={labelCls}>Email Address *</label><input className={inputCls} type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} /></div>
          </div>
        </div>

        {/* Dates */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Dates</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div><label className={labelCls}>Invoice Date</label><input className={inputCls} type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></div>
            <div><label className={labelCls}>Due Date</label><input className={inputCls} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
            <div><label className={labelCls}>Delivery Date</label><input className={inputCls} type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} /></div>
          </div>
        </div>

        {/* Line items */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Line Items</h3>
          <div className="space-y-2">
            <div className="hidden grid-cols-[2fr_80px_110px_90px_32px] gap-2 sm:grid">
              {["Description", "Qty", "Unit Price (€)", "VAT %", ""].map((h) => (
                <p key={h} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{h}</p>
              ))}
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_110px_90px_32px] items-center gap-2">
                <input className={inputCls} value={item.description} onChange={(e) => setItem(i, "description", e.target.value)} />
                <input className={inputCls} type="number" min="0" step="0.01" value={item.quantity} onChange={(e) => setItem(i, "quantity", e.target.value)} />
                <input className={inputCls} type="number" min="0" step="0.01" value={item.unitPrice} onChange={(e) => setItem(i, "unitPrice", e.target.value)} />
                <input className={inputCls} type="number" min="0" max="100" value={item.vatRate} onChange={(e) => setItem(i, "vatRate", e.target.value)} />
                {items.length > 1 ? (
                  <button onClick={() => removeItem(i)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ) : <div />}
              </div>
            ))}
          </div>
          <button onClick={addItem} className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add line item
          </button>
          <div className="mt-5 flex justify-end">
            <div className="w-56 space-y-1 rounded-lg border border-border bg-[hsl(38_48%_97%)] p-3 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Net</span><span>€{totalNet.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>VAT</span><span>€{totalVat.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-1 font-bold text-foreground"><span>Total</span><span>€{totalGross.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
        {success && <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</p>}

        <div className="flex gap-3">
          <button onClick={() => handleSubmit("send")} disabled={saving}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {saving ? "Saving…" : "Send Invoice via Email"}
          </button>
          <button onClick={() => handleSubmit("download")} disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:bg-[hsl(38_40%_93%)] disabled:opacity-60">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
