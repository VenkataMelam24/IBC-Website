"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Check, ShoppingCart, ChevronRight, X } from "lucide-react";

const cateringMenu = [
  {
    category: "Biryanis",
    servingNote: "Each full tray serves 10–12 people",
    items: [
      { name: "Chicken Biryani",     price: 119, priceLabel: "€119", image: "/images/catering-chicken-biryani.png" },
      { name: "Mutton Biryani",      price: 169, priceLabel: "€169", image: "/images/catering-mutton-biryani.png" },
      { name: "Veg Biryani",         price: 99,  priceLabel: "€99",  image: "/images/catering-veg-biryani.png" },
    ],
  },
  {
    category: "Appetizers",
    servingNote: "Each full tray serves 10–12 people",
    items: [
      { name: "Chilli Chicken", price: 99,  priceLabel: "€99",  image: "/images/catering-chili-chicken.png" },
      { name: "Chilli Paneer",  price: 99,  priceLabel: "€99",  image: "/images/catering-chilli-paneer.png" },
      { name: "Chilli Gobi",    price: 99,  priceLabel: "€99",  image: "/images/catering-chili-gobi.png" },
      { name: "Chilli Shrimp",  price: 129, priceLabel: "€129", image: "/images/catering-chilli-shrimp.png" },
    ],
  },
  {
    category: "Curries",
    items: [
      { name: "Chicken Tikka Masala",  price: 50, priceLabel: "from €50", image: "/images/catering-chicken-tikka-masala.png" },
      { name: "Chicken Butter Masala", price: 50, priceLabel: "from €50", image: "/images/catering-chicken-butter-masala.png" },
      { name: "Paneer Tikka Masala",   price: 50, priceLabel: "from €50", image: "/images/catering-paneer-tikka-masala.png" },
      { name: "Paneer Butter Masala",  price: 50, priceLabel: "from €50", image: "/images/catering-paneer-butter-masala.png" },
    ],
  },
  {
    category: "Add-ons",
    items: [
      { name: "Mango Lassi (10 Litres)", price: 70, priceLabel: "€70", image: "/images/catering-mango-lassi.png" },
      { name: "Double Ka Meetha",        price: 60, priceLabel: "€60", image: "/images/catering-double-ka-meetha.png" },
    ],
  },
];

type BookingType = "inhouse" | "venue" | null;

export default function CateringBookPage() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<BookingType>(null);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [postcode, setPostcode] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allItems = cateringMenu.flatMap((c) => c.items);
  const cartEntries = allItems.filter((i) => (cart[i.name] ?? 0) > 0);
  const cartTotal = cartEntries.reduce((s, i) => s + i.price * cart[i.name], 0);
  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);

  const updateCart = (name: string, delta: number) =>
    setCart((prev) => {
      const next = Math.max(0, (prev[name] ?? 0) + delta);
      if (next === 0) { const { [name]: _, ...rest } = prev; return rest; }
      return { ...prev, [name]: next };
    });

  const step1Valid = bookingType !== null && date !== "" && guests !== "" &&
    (bookingType === "inhouse" || postcode !== "");
  const step2Valid = cartCount > 0;

  const handleSubmit = () => {
    const lines = [
      `Booking Type: ${bookingType === "inhouse" ? "In-House (at IBC Restaurant)" : "At Your Venue"}`,
      bookingType === "venue" ? `Postcode: ${postcode}` : "",
      `Date: ${date}`,
      `Approx. Guests: ${guests}`,
      "",
      "--- Selected Menu Items ---",
      ...cartEntries.map((i) => `${i.name} x${cart[i.name]}  (${i.priceLabel} each)`),
      "",
      `Estimated Total: €${cartTotal}`,
      "",
      "--- Contact Details ---",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean).join("\n");

    const subject = encodeURIComponent("Catering Enquiry");
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:theindianbiryanicompany@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">Booking Request Sent!</h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          Thank you! Your catering request has been sent. Our team will call you shortly to confirm all the details.
        </p>
        <Link href="/catering" className="mt-8 inline-flex h-11 items-center rounded bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90">
          Back to Catering
        </Link>
      </div>
    );
  }

  const steps = ["Details", "Select Menu", "Review & Confirm"];

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex flex-col items-center gap-0">
            <span className="font-logo text-[1.6rem] font-bold leading-none tracking-wide text-primary">IBC</span>
            <span className="text-[6px] font-bold uppercase tracking-[0.26em] text-primary/60">Indian Biryani Company</span>
          </Link>
          <p className="text-sm font-semibold text-muted-foreground">Catering Booking</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="border-b border-border bg-background px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center gap-0">
          {steps.map((label, i) => {
            const idx = i + 1;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <Check className="h-4 w-4" /> : idx}
                  </div>
                  <span className={`hidden text-sm font-semibold sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                </div>
                {i < steps.length - 1 && <div className="mx-3 h-px flex-1 bg-border" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">

        {/* ── STEP 1: Details ── */}
        {step === 1 && (
          <div className="mx-auto max-w-2xl">
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">How would you like to celebrate?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Choose how you'd like to enjoy IBC catering.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { type: "inhouse" as const, label: "Celebrate at IBC", sub: "Book our restaurant for your event", emoji: "🏠" },
                { type: "venue" as const,   label: "IBC at Your Venue", sub: "We bring the food to you",          emoji: "📍" },
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setBookingType(opt.type)}
                  className={`flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all ${
                    bookingType === opt.type ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="mt-3 font-heading text-lg font-bold text-foreground">{opt.label}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{opt.sub}</span>
                  {bookingType === opt.type && (
                    <span className="mt-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {bookingType && (
              <div className="mt-8 space-y-5">
                {bookingType === "venue" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground">Your Postcode</label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="e.g. 10711"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-foreground">Event Date</label>
                  <input
                    type="date"
                    value={date}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground">Approximate Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select guest count</option>
                    <option>10 – 20 guests</option>
                    <option>20 – 30 guests</option>
                    <option>30 – 50 guests</option>
                    <option>50 – 75 guests</option>
                    <option>75 – 100 guests</option>
                    <option>100 – 150 guests</option>
                    <option>150+ guests</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded bg-primary px-8 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to Menu <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── STEP 2: Menu Selection ── */}
        {step === 2 && (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Build Your Menu</h1>
              <p className="mt-2 text-sm text-muted-foreground">Add the items you'd like for your event.</p>

              {cateringMenu.map((section) => (
                <div key={section.category} className="mt-10">
                  <h2 className="font-heading text-2xl font-bold text-foreground">{section.category}</h2>
                  <div className="mt-1 h-0.5 w-8 rounded-full bg-primary" />
                  {section.servingNote && (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                      {section.servingNote}
                    </p>
                  )}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {section.items.map((item) => {
                      const qty = cart[item.name] ?? 0;
                      return (
                        <div key={item.name} className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${qty > 0 ? "border-primary/30 bg-primary/4" : "border-border bg-background"}`}>
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-snug text-foreground">{item.name}</p>
                            <p className="text-xs font-bold text-primary">{item.priceLabel}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button type="button" onClick={() => updateCart(item.name, -1)} disabled={qty === 0}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary disabled:opacity-30">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold text-foreground">{qty}</span>
                            <button type="button" onClick={() => updateCart(item.name, 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-10 flex items-center justify-between">
                <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!step2Valid}
                  className="inline-flex h-12 items-center gap-2 rounded bg-primary px-8 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review Order <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sticky cart */}
            <div className="hidden lg:block">
              <div className="sticky top-6 rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <h3 className="font-heading text-base font-bold text-foreground">Your Order</h3>
                  {cartCount > 0 && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{cartCount}</span>
                  )}
                </div>
                {cartCount === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">No items added yet.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {cartEntries.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-2">
                        <span className="text-sm text-foreground">{item.name} <span className="text-muted-foreground">×{cart[item.name]}</span></span>
                        <span className="shrink-0 text-sm font-semibold text-primary">€{item.price * cart[item.name]}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold text-foreground">Estimated Total</span>
                        <span className="text-sm font-bold text-primary">€{cartTotal}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">Final price confirmed on call.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review & Confirm ── */}
        {step === 3 && (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Your Details</h1>
              <p className="mt-2 text-sm text-muted-foreground">We'll call you to confirm your booking.</p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 ..."
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground">Special Requirements <span className="font-normal text-muted-foreground">(optional)</span></label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Allergies, dietary requirements, special requests..."
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button type="button" onClick={() => setStep(2)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name || !phone || !email}
                  className="inline-flex h-12 items-center gap-2 rounded bg-primary px-8 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send Booking Request <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="rounded-2xl border border-border bg-background p-5">
              <h3 className="font-heading text-base font-bold text-foreground">Booking Summary</h3>
              <div className="mt-4 space-y-2 border-b border-border pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-semibold text-foreground">{bookingType === "inhouse" ? "In-House" : "At Your Venue"}</span>
                </div>
                {bookingType === "venue" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Postcode</span>
                    <span className="font-semibold text-foreground">{postcode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">{new Date(date).toLocaleDateString("en-DE", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests</span>
                  <span className="font-semibold text-foreground">{guests}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {cartEntries.map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-2 text-sm">
                    <span className="text-foreground">{item.name} <span className="text-muted-foreground">×{cart[item.name]}</span></span>
                    <span className="shrink-0 font-semibold text-primary">€{item.price * cart[item.name]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-foreground">Estimated Total</span>
                  <span className="text-sm font-bold text-primary">€{cartTotal}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Final price confirmed on call.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
