import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, Phone, Search } from "lucide-react";
import { OpeningTimesButton } from "@/components/ui/opening-times-button";
import { Reveal } from "@/components/ui/reveal";
import { branches } from "@/data/branches";

const fallbackBranch = {
  name: "Indian Biryani Company",
  displayTitle: "IBC Charlottenburg",
  city: "Berlin",
  address: "Hektorstraße 11, 10711 Berlin, Germany",
  phone: "+49 177 3771839",
  openingHours: "Mon - Sun: 16:00 - 23:00",
  imageUrl: "/images/hero-biryani.png",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Hektorstra%C3%9Fe%2011%2C%2010711%20Berlin%2C%20Germany",
  mapLabel: "City West District",
};

export default function BranchPage() {
  const branch = branches[0] ?? fallbackBranch;

  return (
    <div className="bg-[#f4ece4]">
      <section className="relative isolate overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0">
          <Image
            src="/images/destinations.png"
            alt="IBC branch hospitality lounge"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(140deg,hsl(var(--primary)/0.7),hsl(10_52%_20%/0.58)_58%,hsl(var(--primary)/0.72)_100%)]" />

        <div className="relative mx-auto flex min-h-[42vh] w-full max-w-7xl items-center justify-center px-6 py-16 text-center lg:px-10">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="font-heading text-5xl font-semibold tracking-tight text-cream md:text-6xl">
                Our Destinations
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
                Discover IBC hospitality in Berlin with refined ambience and signature Indian flavours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/55 bg-[#f1e7de]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_390px] lg:items-center lg:px-10">
          <Reveal>
            <div>
              <h2 className="font-heading text-5xl font-semibold text-foreground">Find a Branch</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Locate your nearest taste of IBC hospitality.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <label
              htmlFor="branch-search"
              className="flex h-14 items-center gap-3 rounded-full border border-primary/20 bg-background px-5 text-muted-foreground shadow-[0_25px_60px_-45px_hsl(var(--primary)/0.42)]"
            >
              <Search className="h-5 w-5" />
              <input
                id="branch-search"
                type="text"
                placeholder="Search by city or zip code..."
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80"
              />
            </label>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:py-12 lg:px-10 lg:py-14">
        <Reveal>
          <div className="grid gap-5 rounded-[2rem] bg-[#f8f1ea] p-4 shadow-luxury md:p-5 xl:grid-cols-[1.1fr_1fr_0.86fr]">
            <article className="relative overflow-hidden rounded-[1.45rem]">
              <Image
                src="/images/branch-interior.png"
                alt="IBC Charlottenburg restaurant interior"
                width={900}
                height={900}
                className="h-full min-h-[330px] w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
                Flagship
              </span>
            </article>

            <article className="rounded-[1.45rem] border border-primary/12 bg-background p-6 md:p-7">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/82">
                <MapPin className="h-4 w-4" />
                {branch.city}
              </p>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-[1.3] text-foreground md:text-2xl">
                {branch.displayTitle}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{branch.address}</p>

              <div className="mt-6 space-y-3.5">
                <p className="inline-flex items-center gap-3 text-lg text-foreground/88">
                  <Phone className="h-5 w-5 text-primary/74" />
                  <a href="tel:+491773771839" className="transition-colors hover:text-primary">
                    {branch.phone}
                  </a>
                  <a href="https://wa.me/491773771839" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex text-[#25d366] transition-opacity hover:opacity-70">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </p>
                <p className="inline-flex items-center gap-3 text-lg text-foreground/88">
                  <Phone className="h-5 w-5 text-primary/74" />
                  030 2083 3623
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <OpeningTimesButton />
                <a
                  href="tel:+491773771839"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-primary/35 px-6 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary/8"
                >
                  Call Now
                </a>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-[1.45rem] border border-primary/12 bg-background">
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-14">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/8">
                  <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12 text-primary" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div className="text-center px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Location</p>
                  <p className="mt-1 font-heading text-2xl font-semibold text-foreground">
                    {branch.mapLabel || "City West District"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{branch.address}</p>
                </div>
              </div>
              <div className="border-t border-border px-5 py-4">
                <Link
                  href={branch.mapUrl || fallbackBranch.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-primary/90"
                >
                  <Compass className="h-4 w-4" />
                  Open in Maps
                </Link>
              </div>
            </article>
          </div>
        </Reveal>
      </section>

      {/* Coming soon — future Berlin locations */}
      <section className="border-t border-border bg-primary py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Coming Soon
              </span>
              <div className="mt-4 h-1 w-20 bg-accent" />
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-primary-foreground/75">
                More IBC locations across Berlin are in the works. Watch this space.
                Real biryani is coming to a neighbourhood near you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

