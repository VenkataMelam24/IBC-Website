"use client";

import { useState, useEffect } from "react";

type Section = "contact" | "bank" | null;

export default function SettingsPage() {
  const [open, setOpen] = useState<Section>(null);

  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<Section>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/company-settings")
      .then((r) => r.json())
      .then((d) => {
        setBankName(d.bank_name ?? "");
        setIban(d.iban ?? "");
        setBic(d.bic ?? "");
        setWhatsappPhone(d.whatsapp_phone ?? "");
        setPhone(d.phone ?? "");
        setContactEmail(d.contact_email ?? "");
        setLoading(false);
      });
  }, []);

  const save = async (section: Section) => {
    setSaving(true); setError(""); setSuccess(null);
    const res = await fetch("/api/admin/company-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank_name: bankName, iban, bic, whatsapp_phone: whatsappPhone, phone, contact_email: contactEmail }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok || !data.success) { setError(data.error ?? "Failed to save"); return; }
    setSuccess(section);
    setTimeout(() => { setSuccess(null); setOpen(null); }, 1800);
  };

  const inputCls = "w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const labelCls = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5";

  const toggle = (s: Section) => setOpen((prev) => (prev === s ? null : s));

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-primary">Settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Manage details shown on all invoices</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="space-y-3">

          {/* Contact Details */}
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <button
              onClick={() => toggle("contact")}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[hsl(38_40%_97%)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Contact Details</p>
                  <p className="text-xs text-muted-foreground">{contactEmail || "Phone & email on invoices"}</p>
                </div>
              </div>
              <ChevronIcon isOpen={open === "contact"} />
            </button>

            {open === "contact" && (
              <div className="border-t border-border px-5 pb-5 pt-4">
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>WhatsApp Number</label>
                    <input className={inputCls} value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} placeholder="+49 177 3771839" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number</label>
                    <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="030 20833623" />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input className={inputCls} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="info@theibc.de" />
                  </div>
                  {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">{error}</p>}
                  {success === "contact" && <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">Saved!</p>}
                  <button onClick={() => save("contact")} disabled={saving} className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
                    {saving ? "Saving…" : "Save Contact Details"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bank Details */}
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <button
              onClick={() => toggle("bank")}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[hsl(38_40%_97%)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Bank Details</p>
                  <p className="text-xs text-muted-foreground">{iban || "IBAN, BIC & bank name"}</p>
                </div>
              </div>
              <ChevronIcon isOpen={open === "bank"} />
            </button>

            {open === "bank" && (
              <div className="border-t border-border px-5 pb-5 pt-4">
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Bank Name</label>
                    <input className={inputCls} value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. berliner-volksbank" />
                  </div>
                  <div>
                    <label className={labelCls}>IBAN</label>
                    <input className={inputCls} value={iban} onChange={(e) => setIban(e.target.value)} placeholder="DE00 0000 0000 0000 0000 00" />
                  </div>
                  <div>
                    <label className={labelCls}>BIC / SWIFT</label>
                    <input className={inputCls} value={bic} onChange={(e) => setBic(e.target.value)} placeholder="BEVODEBB" />
                  </div>
                  {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">{error}</p>}
                  {success === "bank" && <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">Saved!</p>}
                  <button onClick={() => save("bank")} disabled={saving} className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
                    {saving ? "Saving…" : "Save Bank Details"}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
