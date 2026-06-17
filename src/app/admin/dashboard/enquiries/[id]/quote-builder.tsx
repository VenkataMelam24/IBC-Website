"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QuoteItem = { name: string; qty: number; price: number };

export function QuoteBuilder({
  bookingId,
  customerName,
  customerEmail,
  initialItems,
  existingItems,
  existingDiscount,
  existingDescription,
  isQuoted,
}: {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  initialItems: string[];
  existingItems: QuoteItem[] | null;
  existingDiscount: number;
  existingDescription: string;
  isQuoted: boolean;
}) {
  const router = useRouter();

  const seedItems: QuoteItem[] =
    existingItems && existingItems.length > 0
      ? existingItems
      : initialItems.map((name) => ({ name, qty: 1, price: 0 }));

  const [items, setItems] = useState<QuoteItem[]>(seedItems.length > 0 ? seedItems : [{ name: "", qty: 1, price: 0 }]);
  const [discount, setDiscount] = useState<number>(existingDiscount ?? 0);
  const [description, setDescription] = useState(existingDescription ?? "");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discount / 100);
  const total = subtotal - discountAmt;

  const updateItem = (idx: number, field: keyof QuoteItem, value: string | number) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const addItem = () => setItems((prev) => [...prev, { name: "", qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const sendQuote = async () => {
    const valid = items.filter((i) => i.name.trim());
    if (!valid.length) { setError("Add at least one item."); return; }
    setSending(true);
    setError("");

    const res = await fetch("/api/admin/send-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bookingId, items: valid, discount, description }),
    });

    const json = await res.json();
    setSending(false);

    if (json.success) {
      setSent(true);
      router.refresh();
    } else {
      setError(json.error ?? "Something went wrong.");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border bg-[hsl(32_40%_97%)] px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-foreground">Quote Builder</h3>
        <p className="text-sm text-muted-foreground">
          {isQuoted
            ? `Quote already sent to ${customerEmail} — edit and resend if needed.`
            : `Build and send a quotation to ${customerEmail}`}
        </p>
      </div>

      <div className="p-6">
        {/* Items table */}
        <div className="mb-1 grid grid-cols-[1fr_64px_100px_36px] gap-2 px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Item / Dish</p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Qty</p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Price (€)</p>
          <span />
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_64px_100px_36px] gap-2 items-center">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
                placeholder="e.g. Chicken Biryani"
                className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => updateItem(idx, "qty", parseInt(e.target.value) || 1)}
                className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-center text-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="number"
                min={0}
                step={0.5}
                value={item.price || ""}
                onChange={(e) => updateItem(idx, "price", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-right text-foreground focus:border-primary focus:outline-none"
              />
              <button
                onClick={() => removeItem(idx)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-70"
        >
          + Add item
        </button>

        {/* Totals */}
        <div className="mt-5 rounded-xl border border-border bg-[hsl(38_48%_97%)] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">€{subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Discount</span>
            <div className="flex gap-2">
              {[0, 5, 10, 15, 20].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                    discount === d
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground hover:bg-[hsl(38_40%_93%)]"
                  }`}
                >
                  {d === 0 ? "None" : `${d}%`}
                </button>
              ))}
              <input
                type="number"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-xs text-center focus:border-primary focus:outline-none"
                placeholder="Custom"
              />
            </div>
          </div>

          {discount > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm text-red-600">
              <span>Discount ({discount}%)</span>
              <span>- €{discountAmt.toFixed(2)}</span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="font-bold text-foreground">Grand Total</span>
            <span className="font-heading text-xl font-bold text-primary">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <label className="block text-sm font-semibold text-foreground">Message to customer <span className="font-normal text-muted-foreground">(optional)</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. We've included a 10% discount as a first-time catering special…"
            className="mt-2 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
        {sent && <p className="mt-3 text-xs font-semibold text-green-600">Quote sent successfully to {customerEmail}!</p>}

        <button
          onClick={sendQuote}
          disabled={sending}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-80 disabled:opacity-60"
        >
          {sending ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Sending…
            </>
          ) : isQuoted ? (
            "Resend Updated Quote"
          ) : (
            "Send Quotation to Customer"
          )}
        </button>
      </div>
    </div>
  );
}
