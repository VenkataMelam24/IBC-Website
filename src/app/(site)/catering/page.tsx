import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CateringMarquee } from "@/components/sections/catering-marquee";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Indian Biryani Company offers premium catering for weddings, corporate events, and private parties in Berlin. Biryani trays, appetizers, curries and more delivered to your venue.",
  alternates: { canonical: "https://theibc.de/catering" },
};
import { CalendarCheck, MapPin, PhoneCall, Utensils } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    icon: Utensils,
    text: "Biryanis, curries, and more — real Indian food for every event",
  },
  {
    icon: CalendarCheck,
    text: "Book in advance for birthdays, weddings, and corporate events",
  },
  {
    icon: MapPin,
    text: "Celebrate at our restaurant or let us come to your venue",
  },
  {
    icon: PhoneCall,
    text: "Personal service — our team is happy to help plan your event",
  },
];

export default function CateringPage() {
  return (
    <div className="bg-background">

      {/* ── Hero — full-bleed food spread ── */}
      <section className="relative isolate min-h-[55vh] overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/catering-food-spread.png"
            alt="IBC Catering — food spread"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_15%]"
          />
        </div>

        {/* Gradient overlay — full-coverage on mobile, left-side fade on desktop */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(25_60%_78%/0.78)_0%,hsl(25_60%_78%/0.92)_100%)] md:bg-[linear-gradient(90deg,hsl(25_60%_78%/0.92)_0%,hsl(25_60%_78%/0.70)_30%,hsl(25_60%_78%/0.20)_60%,transparent_80%)]" />

        {/* Content */}
        <div className="relative flex min-h-[55vh] w-full items-center px-6 py-14 lg:px-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              IBC Catering
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.3] text-foreground sm:text-5xl lg:text-[3.25rem]">
              Catering Service.
            </h1>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-foreground/70 md:text-lg">
              Corporate events, birthdays, weddings, and private gatherings.
              Real Indian food and warm hospitality, at our restaurant or at yours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature strip — same warm bg ── */}
      <section className="border-t border-primary/10 bg-[hsl(32_55%_92%)] px-8 py-14 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center">
                <Icon className="h-9 w-9 text-primary" strokeWidth={1.4} />
                <p className="mt-3 text-sm font-semibold leading-snug text-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/catering/book"
              className="inline-flex h-12 items-center rounded bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              Book Catering
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center rounded border border-primary/40 px-7 text-sm font-bold text-primary transition hover:border-primary hover:bg-primary/5"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Catering Menu Topsellers ── */}
      <section className="border-t border-border bg-background py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <h2 className="font-heading text-4xl font-bold leading-[1.35] text-foreground md:text-5xl">
                Catering Menu Topsellers.
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 bg-primary" />
              <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
                Our most loved dishes — perfect for events, birthdays, and corporate gatherings.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <CateringMarquee />
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/menu"
              className="inline-flex h-12 items-center rounded bg-primary px-8 text-sm font-bold text-primary-foreground transition hover:opacity-90"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Two catering types ── */}
      <section className="border-t border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

          <Reveal>
            <h2 className="font-heading text-4xl font-bold leading-[1.35] text-foreground md:text-5xl">
              Two Ways to Celebrate with IBC.
            </h2>
            <div className="mt-3 h-1 w-20 bg-primary" />
          </Reveal>

          {/* Row 1: text left, image right */}
          <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[2fr_3fr]">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">In-House</p>
                <h3 className="mt-3 font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-4xl">
                  Celebrate at IBC.
                </h3>
                <div className="mt-4 h-0.5 w-12 bg-primary/30" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Many of our guests celebrate their birthdays, anniversaries, and personal
                  milestones right here at our restaurant.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Simply get in touch with our team, make a booking, and we&apos;ll handle
                  everything: the food, the service, and the atmosphere.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your guests leave with smiles and full hearts.
                </p>
                <Link
                  href="/catering/book"
                  className="mt-6 inline-flex h-11 items-center rounded bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                >
                  Book Catering
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full items-center rounded-2xl bg-[hsl(32_40%_95%)] p-4">
                <Image
                  src="/images/catering-inhouse-new.png"
                  alt="Celebrate at IBC — birthdays, anniversaries, milestones"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </Reveal>
          </div>

          {/* Row 2: image left, text right */}
          <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-[3fr_2fr]">
            <Reveal delay={0.05}>
              <div className="flex h-full items-center rounded-2xl bg-[hsl(32_40%_95%)] p-4">
                <Image
                  src="/images/catering-at-your-venue.png"
                  alt="IBC catering at your venue"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">At Your Venue</p>
                <h3 className="mt-3 font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-4xl">
                  IBC Comes to You.
                </h3>
                <div className="mt-4 h-0.5 w-12 bg-primary/30" />
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Prefer to host at your own space? We bring the full IBC experience
                  to your venue: office lunches, corporate events, family gatherings,
                  or any private celebration.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Our team takes care of the catering so you can focus on enjoying
                  the moment with the people who matter.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  On request, we also offer full-service catering including staff
                  and equipment for large-scale events.
                </p>
                <Link
                  href="/catering/book"
                  className="mt-6 inline-flex h-11 items-center rounded bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                >
                  Book Catering
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="border-t border-border bg-primary py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div>
                <h2 className="font-heading text-4xl font-bold leading-[1.35] text-primary-foreground md:text-5xl">
                  What Our Guests Say.
                </h2>
                <div className="mt-3 h-1 w-20 bg-accent" />
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/75">
                  Real reviews from real guests.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-primary-foreground/10 px-5 py-4 ring-1 ring-primary-foreground/20">
                <p className="font-heading text-4xl font-bold text-primary-foreground">4.7</p>
                <div className="mt-1 flex gap-0.5 text-base text-accent">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-primary-foreground">120+ ratings</p>
                <p className="text-xs text-primary-foreground/60">on Uber Eats</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { text: "It's the perfect place for the finest dum Biryani! Great food and friendly service.", name: "Sayantan A." },
              { text: "Amazing chef, tremendous quality, outstanding quality, perfect spice — will come back soon.", name: "Christoph E." },
              { text: "Great food and lovely service. The biryani and majestic chicken are a must try.", name: "Sachin N." },
              { text: "Really tasty biryani. Highly recommend for real Indian food.", name: "Sandeep P." },
              { text: "The taste is really good — one of the best biryani in Berlin.", name: "Nikhil K." },
              { text: "Super leckeres, sehr authentisch wirkendes Essen. Kann ich nur empfehlen.", name: "Bernd R." },
            ].map((review, i) => (
              <Reveal key={review.name} delay={0.04 * (i % 3)}>
                <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-5 text-sm font-semibold text-primary-foreground">{review.name}</p>
                  <p className="text-xs text-primary-foreground/55">via Quandoo</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
