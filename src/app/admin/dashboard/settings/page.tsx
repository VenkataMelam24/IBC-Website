"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/company-settings")
      .then((r) => r.json())
      .then((d) => {
        setBankName(d.bank_name ?? "");
        setIban(d.iban ?? "");
        setBic(d.bic ?? "");
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true); setError(""); setSuccess(false);
    const res = await fetch("/api/admin/company-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank_name: bankName, iban, bic }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok || !data.success) { setError(data.error ?? "Failed to save"); return; }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputCls = "w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  const labelCls = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5";

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-primary">Settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Bank details shown on all invoices</p>
      </div>

      <div className="rounded-xl border border-border bg-background p-6">
        <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-primary">Bank Details</h3>

        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : (
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
            {success && <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">Saved successfully!</p>}

            <button
              onClick={save}
              disabled={saving}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
