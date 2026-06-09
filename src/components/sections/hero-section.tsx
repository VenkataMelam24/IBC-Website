import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[70%_50%]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--primary)/0.86)_8%,hsl(350_60%_24%/0.72)_36%,hsl(8_52%_18%/0.42)_66%,hsl(10_48%_14%/0.68)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(850px_520px_at_24%_42%,hsl(var(--primary)/0.33),transparent_62%),radial-gradient(640px_400px_at_78%_12%,hsl(var(--copper)/0.22),transparent_62%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[62%] bg-[linear-gradient(90deg,hsl(var(--primary)/0.52)_0%,hsl(var(--primary)/0.3)_45%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,hsl(var(--background)/0.16),transparent)]" />

      <div className="relative mx-auto flex min-h-[76vh] w-full max-w-7xl items-center px-6 pb-10 pt-12 md:pb-12 md:pt-14 lg:px-10 lg:pt-16">
        <Reveal className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/90">
            Berlin&apos;s Best Biryani
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.06] text-primary-foreground sm:text-5xl md:text-6xl">
            Authentic Indian Flavours.
          </h1>
          <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Welcome to IBC. Authentic Biryanis, Curries &amp; More. For dine-in, takeaway,
            delivery, or catering for your family, team, or event.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/#order-online" variant="secondary">
              Order Now
            </ButtonLink>
            <ButtonLink
              href="https://www.quandoo.de/en/place/ibc-indian-biryani-company-86312"
              variant="ghost"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
            >
              Book a Table
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
