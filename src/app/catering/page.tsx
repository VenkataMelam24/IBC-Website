import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export default function CateringPage() {
  return (
    <div className="bg-background">

      {/* Hero — Catering intro */}
      <section id="catering" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
                IBC Catering
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Catering for Your Celebrations.
              </h1>
              <div className="mt-3 h-1 w-20 bg-primary" />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Corporate events, birthdays, weddings, and private gatherings. Experience authentic
                Indian hospitality with IBC catering.
              </p>
              <div className="mt-8">
                <ButtonLink href="tel:+491799676142" variant="primary">
                  Catering Enquiry
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-2 h-52 overflow-hidden rounded-xl">
                  <Image
                    src="/images/catering-birthday.png"
                    alt="Birthday celebration at IBC"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src="/images/catering-family.png"
                    alt="Indian family gathering at IBC"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src="/images/catering-corporate.png"
                    alt="Corporate catering by IBC"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two catering types */}
      <section className="border-t border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Two Ways to Celebrate with IBC.
            </h2>
            <div className="mt-3 h-1 w-20 bg-primary" />
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
              Whether you come to us or we come to you, IBC delivers authentic Indian food
              and warm hospitality for every occasion.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {/* Card 1 — In-House */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/images/catering-inhouse.png"
                    alt="Celebrate at the IBC restaurant"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    In-House
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
                    Celebrate at IBC
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    Many of our guests celebrate their birthdays, anniversaries, and personal
                    milestones right here at our restaurant. Simply get in touch with our team,
                    make a booking, and we&apos;ll handle everything: the food, the service,
                    and the atmosphere, so your guests leave with smiles and full hearts.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — At Your Venue */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/images/catering-corporate.png"
                    alt="IBC catering at your venue"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                    At Your Venue
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
                    IBC Comes to You
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    Prefer to host at your own space? We bring the full IBC experience to
                    your venue for office team lunches, corporate events, family gatherings,
                    or any private celebration. Our team takes care of the catering so you
                    can focus on enjoying the moment with the people who matter.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-primary py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div>
                <h2 className="font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
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

            <Reveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;It&apos;s the perfect place for authentic dum Biryani! Great food and friendly service.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Sayantan A.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;Amazing chef, tremendous quality, highly authentic, perfect spice — will come back soon.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Christoph E.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

            <Reveal delay={0.11}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;Very authentic food and lovely service. The biryani and majestic chicken are a must try.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Sachin N.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;Really tasty biryani. Highly recommend for authentic Indian food.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Sandeep P.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;The taste is really good — one of the best biryani in Berlin.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Nikhil K.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

            <Reveal delay={0.11}>
              <div className="flex h-full flex-col rounded-2xl bg-primary-foreground/8 p-7 ring-1 ring-primary-foreground/15">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-primary-foreground/90">
                  &ldquo;Super leckeres, sehr authentisch wirkendes Essen. Kann ich nur empfehlen.&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold text-primary-foreground">Bernd R.</p>
                <p className="text-xs text-primary-foreground/55">via Quandoo</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}
