import { Reveal } from "@/components/ui/reveal";

const platforms = [
  {
    name: "Uber Eats",
    href: "https://www.ubereats.com/de-en/store/indian-biryani-company/0CIQzEF8SqaYB3CJoC0c_g",
    bg: "bg-[#06C167]",
    text: "text-white",
  },
  {
    name: "Lieferando",
    href: "https://www.lieferando.de/en/menu/ibc-indian-biryani-company-berlin",
    bg: "bg-[#FF8000]",
    text: "text-white",
  },
  {
    name: "Wolt",
    href: "https://wolt.com/en/deu/berlin/restaurant/ibc-indian-biryani-company",
    bg: "bg-[#009DE0]",
    text: "text-white",
  },
];

export function OrderOnlineSection() {
  return (
    <section id="order-online" className="border-t border-border py-10 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
              Order Online
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-5xl">
              Get IBC Delivered to You.
            </h2>
            <div className="mt-3 h-1 w-20 bg-primary" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
              Craving a biryani or a curry fix? Order your favourite IBC dishes straight
              to your door through Uber Eats, Lieferando, or Wolt. Our very own IBC webshop
              is also launching soon. Stay tuned.
            </p>

            {/* Platform buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-85 ${p.bg} ${p.text}`}
                >
                  {p.name}
                </a>
              ))}
            </div>

            {/* Coming soon chip */}
            <div className="mt-4 inline-flex items-center gap-2 rounded border border-primary/30 bg-primary/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-primary">IBC Webshop — Coming Soon</span>
            </div>
          </Reveal>

          {/* Right — rider animation */}
          <Reveal delay={0.08}>
            <div className="flex items-center justify-center">
              <video
                src="/rider.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-lg object-contain"
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
