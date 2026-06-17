"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { menuCategories } from "@/data/menu";
import { cateringMenu } from "@/data/catering-menu";

type BookingType = "dine-in" | "catering";
type Step = "type" | "details" | "menu" | "review";

type CartItem = { name: string; qty: number; price: number; image?: string; category: string };

type Details = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
};

function parsePrice(p: string): number {
  return parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
}

// ─── Step 1: Type Selection ───────────────────────────────────────────────────
function StepType({ onSelect }: { onSelect: (t: BookingType) => void }) {
  return (
    <div className="mx-auto max-w-xl">
      <h2 className="font-heading text-2xl font-bold text-foreground">What type of event is this?</h2>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">This determines which menu is shown.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelect("dine-in")}
          className="group rounded-2xl border-2 border-border bg-background p-6 text-left transition hover:border-primary hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">🍽️</div>
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary">Dine-In at IBC</h3>
          <p className="mt-1 text-sm text-muted-foreground">Event held at our restaurant. Full dine-in and delivery menu.</p>
        </button>
        <button
          onClick={() => onSelect("catering")}
          className="group rounded-2xl border-2 border-border bg-background p-6 text-left transition hover:border-primary hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">🚚</div>
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary">Catering / Delivery</h3>
          <p className="mt-1 text-sm text-muted-foreground">Event at the customer's venue. Catering-style menu.</p>
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Customer Details ─────────────────────────────────────────────────
function StepDetails({
  bookingType,
  details,
  onChange,
  onNext,
  onBack,
}: {
  bookingType: BookingType;
  details: Details;
  onChange: (d: Details) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const set = (k: keyof Details, v: string) => onChange({ ...details, [k]: v });
  const valid = details.name && details.email && details.phone && details.date && details.guests;

  return (
    <div className="mx-auto max-w-lg">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-70">
        ← Back
      </button>
      <h2 className="font-heading text-2xl font-bold text-foreground">Customer Details</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        {bookingType === "dine-in" ? "Dine-In at IBC" : "Catering / Delivery"} — enter the customer's information.
      </p>

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
            <input
              type="text" value={details.name} onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Raj Kumar"
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Email *</label>
            <input
              type="email" value={details.email} onChange={(e) => set("email", e.target.value)}
              placeholder="customer@email.com"
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone *</label>
            <input
              type="tel" value={details.phone} onChange={(e) => set("phone", e.target.value)}
              placeholder="+49 177 …"
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Date *</label>
            <input
              type="date" value={details.date} onChange={(e) => set("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Time</label>
            <input
              type="time" value={details.time} onChange={(e) => set("time", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">Number of Guests *</label>
            <input
              type="number" min={1} value={details.guests} onChange={(e) => set("guests", e.target.value)}
              placeholder="e.g. 50"
              className="mt-1.5 w-full rounded-lg border border-border bg-[hsl(38_48%_97%)] px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!valid}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-80 disabled:opacity-40"
        >
          Next: Select Menu Items →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Menu Browser ─────────────────────────────────────────────────────

type DisplayItem = { name: string; price: number; priceLabel: string; image?: string };
type DisplayCategory = { key: string; title: string; note?: string; items: DisplayItem[] };

function normaliseMenus(bookingType: BookingType): DisplayCategory[] {
  if (bookingType === "dine-in") {
    return menuCategories.map((cat) => ({
      key: cat.id,
      title: cat.title,
      items: cat.items.map((i) => ({
        name: i.name,
        price: parsePrice(i.price),
        priceLabel: i.price,
        image: i.image,
      })),
    }));
  }
  return cateringMenu.map((cat) => ({
    key: cat.category.toLowerCase().replace(/\s+/g, "-"),
    title: cat.category,
    note: cat.servingNote,
    items: cat.items.map((i) => ({
      name: i.name,
      price: i.price,
      priceLabel: i.priceLabel,
      image: i.image,
    })),
  }));
}

function StepMenu({
  bookingType,
  cart,
  setCart,
  onNext,
  onBack,
}: {
  bookingType: BookingType;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const categories = normaliseMenus(bookingType);
  const [activeCategoryKey, setActiveCategoryKey] = useState(categories[0]?.key ?? "");

  const addItem = (item: DisplayItem, categoryKey: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) return prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: item.name, qty: 1, price: item.price, image: item.image, category: categoryKey }];
    });
  };

  const removeOne = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.name !== name);
      return prev.map((i) => i.name === name ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const getQty = (name: string) => cart.find((i) => i.name === name)?.qty ?? 0;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const currentCategory = categories.find((c) => c.key === activeCategoryKey);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-70">
          ← Back
        </button>
        <div className="flex-1">
          <h2 className="font-heading text-2xl font-bold text-foreground">Select Menu Items</h2>
          <p className="text-sm text-muted-foreground">
            {bookingType === "dine-in" ? "Dine-in menu" : "Catering menu"} — click + to add items
          </p>
        </div>
        {totalItems > 0 && (
          <button
            onClick={onNext}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-80"
          >
            Review {totalItems} item{totalItems !== 1 ? "s" : ""} →
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="mb-1 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const count = cart.filter((i) => i.category === cat.key).reduce((s, i) => s + i.qty, 0);
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryKey(cat.key)}
              className={`relative flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeCategoryKey === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-[hsl(38_40%_93%)]"
              }`}
            >
              {cat.title}
              {count > 0 && (
                <span className="ml-1.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {currentCategory?.note && (
        <p className="mb-3 text-xs text-muted-foreground italic">{currentCategory.note}</p>
      )}

      {/* Items grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {currentCategory?.items.map((item) => {
          const qty = getQty(item.name);
          return (
            <div key={item.name} className="overflow-hidden rounded-xl border border-border bg-background">
              {item.image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="280px" />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight">{item.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-primary">{item.priceLabel}</p>
                  </div>
                  {qty === 0 ? (
                    <button
                      onClick={() => addItem(item, currentCategory.key)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-80"
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => removeOne(item.name)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:border-primary"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-primary">{qty}</span>
                      <button
                        onClick={() => addItem(item, currentCategory.key)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:opacity-80"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalItems > 0 && (
        <div className="sticky bottom-0 mt-6 rounded-2xl border border-border bg-background p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              {totalItems} item{totalItems !== 1 ? "s" : ""} selected
              <span className="ml-2 text-muted-foreground">
                (est. €{cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)})
              </span>
            </p>
            <button
              onClick={onNext}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-80"
            >
              Review & Send →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 4: Review & Send ────────────────────────────────────────────────────
function StepReview({
  bookingType,
  details,
  cart,
  setCart,
  onBack,
}: {
  bookingType: BookingType;
  details: Details;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onBack: () => void;
}) {
  const router = useRouter();
  const [items, setItems] = useState(() => cart.map((i) => ({ ...i })));
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const setItemField = (idx: number, field: "price" | "qty", val: number) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, [field]: val } : item));
  };
  const setItemName = (idx: number, val: string) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, name: val } : item));
  };
  const addManualItem = () => setItems((prev) => [...prev, { name: "", qty: 1, price: 0, category: "manual" }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discount / 100);
  const total = subtotal - discountAmt;

  const send = async () => {
    const validItems = items.filter((i) => i.name.trim() && i.qty > 0);
    if (!validItems.length) { setError("Add at least one item."); return; }
    setSending(true);
    setError("");

    const payload = {
      bookingType,
      name: details.name,
      email: details.email,
      phone: details.phone,
      date: details.date,
      time: details.time,
      guests: details.guests,
      items: validItems.map(({ name, qty, price }) => ({ name, qty, price })),
      discount,
      description,
    };

    const res = await fetch("/api/admin/custom-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    setSending(false);

    if (json.success) {
      setSent(true);
      setTimeout(() => router.push("/admin/dashboard/enquiries"), 2000);
    } else {
      setError(json.error ?? "Something went wrong.");
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md pt-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Quotation Sent!</h2>
        <p className="mt-2 text-sm text-muted-foreground">The quotation has been emailed to <strong>{details.email}</strong>.</p>
        <p className="mt-1 text-xs text-muted-foreground">Redirecting to Active Enquiries…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-70">
          ← Back
        </button>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Review & Send</h2>
          <p className="text-sm text-muted-foreground">Edit prices, set a discount, and send the quotation to {details.name}.</p>
        </div>
      </div>

      {/* Customer summary */}
      <div className="mb-4 rounded-xl border border-border bg-background px-5 py-4 text-sm">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span className="text-muted-foreground">Name</span><span className="font-semibold">{details.name}</span>
          <span className="text-muted-foreground">Email</span><span className="font-semibold">{details.email}</span>
          <span className="text-muted-foreground">Phone</span><span className="font-semibold">{details.phone}</span>
          <span className="text-muted-foreground">Event Date</span><span className="font-semibold">{details.date}{details.time ? ` at ${details.time}` : ""}</span>
          <span className="text-muted-foreground">Guests</span><span className="font-semibold">{details.guests}</span>
          <span className="text-muted-foreground">Type</span>
          <span className="font-semibold">{bookingType === "dine-in" ? "Dine-In at IBC" : "Catering / Delivery"}</span>
        </div>
      </div>

      {/* Items table */}
      <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden mb-4">
        <div className="border-b border-border bg-[hsl(32_40%_97%)] px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quotation Items</p>
        </div>
        <div className="px-5 py-4">
          <div className="mb-2 grid grid-cols-[1fr_72px_104px_36px] gap-2 px-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Item</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Qty</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Price (€)</p>
            <span />
          </div>
          <div className="flex flex-col gap-2">
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_72px_104px_36px] gap-2 items-center">
                <input
                  type="text" value={item.name}
                  onChange={(e) => setItemName(idx, e.target.value)}
                  placeholder="Item name"
                  className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="number" min={1} value={item.qty}
                  onChange={(e) => setItemField(idx, "qty", parseInt(e.target.value) || 1)}
                  className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-2 py-2 text-sm text-center focus:border-primary focus:outline-none"
                />
                <input
                  type="number" min={0} step={0.5} value={item.price || ""}
                  onChange={(e) => setItemField(idx, "price", parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="rounded-lg border border-border bg-[hsl(38_48%_97%)] px-3 py-2 text-sm text-right focus:border-primary focus:outline-none"
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
            onClick={addManualItem}
            className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-70"
          >
            + Add item
          </button>
        </div>

        {/* Totals */}
        <div className="border-t border-border bg-[hsl(38_48%_97%)] px-5 py-4">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-muted-foreground">Discount</span>
            <div className="flex flex-wrap gap-2">
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
                type="number" min={0} max={100} value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-xs text-center focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-red-600 mb-2">
              <span>Discount ({discount}%)</span>
              <span>- €{discountAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="font-bold text-foreground">Grand Total</span>
            <span className="font-heading text-xl font-bold text-primary">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-foreground mb-1.5">
          Message to customer <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="e.g. Thank you for choosing IBC! We've customised this quote especially for you…"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {error && <p className="mb-3 text-xs font-semibold text-red-600">{error}</p>}

      <button
        onClick={send}
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition hover:opacity-80 disabled:opacity-60"
      >
        {sending ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Sending Quotation…
          </>
        ) : (
          "Send Quotation to Customer →"
        )}
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewQuotePage() {
  const [step, setStep] = useState<Step>("type");
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [details, setDetails] = useState<Details>({ name: "", email: "", phone: "", date: "", time: "", guests: "" });
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-heading text-xl font-bold text-foreground">New Custom Quotation</span>
        <span className="ml-2 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary capitalize">
          {step === "type" ? "Step 1 of 4" : step === "details" ? "Step 2 of 4" : step === "menu" ? "Step 3 of 4" : "Step 4 of 4"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 flex gap-1.5">
        {(["type", "details", "menu", "review"] as Step[]).map((s, i) => {
          const order = ["type", "details", "menu", "review"].indexOf(step);
          const thisOrder = i;
          return (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                thisOrder <= order ? "bg-primary" : "bg-border"
              }`}
            />
          );
        })}
      </div>

      {step === "type" && (
        <StepType
          onSelect={(t) => {
            setBookingType(t);
            setStep("details");
          }}
        />
      )}

      {step === "details" && bookingType && (
        <StepDetails
          bookingType={bookingType}
          details={details}
          onChange={setDetails}
          onNext={() => setStep("menu")}
          onBack={() => setStep("type")}
        />
      )}

      {step === "menu" && bookingType && (
        <StepMenu
          bookingType={bookingType}
          cart={cart}
          setCart={setCart}
          onNext={() => setStep("review")}
          onBack={() => setStep("details")}
        />
      )}

      {step === "review" && bookingType && (
        <StepReview
          bookingType={bookingType}
          details={details}
          cart={cart}
          setCart={setCart}
          onBack={() => setStep("menu")}
        />
      )}
    </div>
  );
}
