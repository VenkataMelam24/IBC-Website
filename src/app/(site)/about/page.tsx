import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Indian Biryani Company — our story, our passion for authentic Indian cooking, and our mission to bring the best biryani to Berlin.",
  alternates: { canonical: "https://theibc.de/about" },
};

const pillars = [
  {
    tag: "Our Roots",
    title: "Real Biryani, Always",
    text: "Every biryani we serve is built on time-tested recipes, quality ingredients, and time-honoured cooking techniques. Layered spices, fragrant basmati rice, and a process that never cuts corners.",
  },
  {
    tag: "Our Edge",
    title: "Tech-Driven Consistency",
    text: "Our automated cooking system controls every temperature, every timing, every layer. No guesswork, no variation. You get the same perfect biryani whether it is your first visit or your fiftieth.",
  },
  {
    tag: "Our Dream",
    title: "Biryani Across Europe",
    text: "We started in Berlin, but our ambition goes much further. The plan is to grow across Germany and all of Europe. Our goal is to make IBC the name people think of when they think biryani.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">About IBC</p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.3] text-foreground sm:text-5xl md:text-6xl">
            Born in Berlin.<br />Built on Biryani.
          </h1>
          <div className="mt-4 h-1 w-20 bg-primary" />
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            IBC is a team of Indian friends brought together by a shared love for great food,
            technology, and big dreams. We launched in Berlin in July 2025 with one goal in mind:
            to bring the real taste of real biryani to Europe. And we are just getting started.
          </p>
          <div className="mt-8">
            <ButtonLink href="/menu" variant="primary">Explore Our Menu</ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/berlin-biryani.png"
              alt="IBC biryani served at our Berlin restaurant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>


      {/* The Technology */}
      <section className="border-t border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">What Makes Us Different</p>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.35] text-foreground sm:text-4xl md:text-5xl">
                Precision Cooking.<br />Perfect Every Time.
              </h2>
              <div className="mt-4 h-1 w-20 bg-primary" />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                At IBC, our biryanis are not cooked on a stove. We use an automated robotic
                system that controls the oven temperature with precision at every single step.
                Every batch comes out identical, with the same spice layers, the same moisture,
                and the same depth of flavour.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                This is not just about efficiency. It is about a promise we make to every
                customer. Come today, come next month, or bring a friend for the very first time.
                The biryani will always taste exactly as you remember it. That consistency
                is what we are proud of.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { stat: "July 2025", label: "Launched in Berlin" },
                  { stat: "100%", label: "Consistent taste" },
                  { stat: "1 → ∞", label: "Branches planned" },
                ].map(({ stat, label }) => (
                  <div key={label} className="rounded-xl border border-border bg-card p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-primary">{stat}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/biryani-tray.png"
                  alt="IBC biryani served in a traditional tray"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-t border-border bg-primary py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent/80">Our Vision</p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
              Biryani for All of Europe.
            </h2>
            <div className="mt-4 h-1 w-20 bg-accent" />
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-primary-foreground/75">
              Berlin is just chapter one. Our roadmap takes us across Germany and all the
              way through Europe. We want every city to have its own IBC.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.07}>
                <article className="flex h-full flex-col rounded-2xl border border-primary-foreground/12 bg-primary-foreground/8 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">{pillar.tag}</p>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-primary-foreground">{pillar.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-primary-foreground/72">{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
