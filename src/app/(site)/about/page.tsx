import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { TeamCarousel } from "@/components/ui/team-carousel";
import type { TeamMember } from "@/components/ui/team-carousel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Indian Biryani Company — our story, our passion for authentic Indian cooking, and our mission to bring the best biryani to Berlin.",
  alternates: { canonical: "https://theibc.de/about" },
};

const teamMembers: TeamMember[] = [
  {
    name: "Avinash Ronanki",
    role: "Founder & Managing Director",
    initials: "AR",
    image: "/images/team-avinash.png",
    linkedin: "https://www.linkedin.com/in/avinash-ronanki-065008128/",
  },
  {
    name: "Riaz Mohammed",
    role: "Co-Founder, Operations & Digital Marketing Manager",
    initials: "RM",
    linkedin: "https://www.linkedin.com/in/riaz-mohammed-1a4078193/",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-background">

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 1 · WHO WE ARE                    */}
      {/* ══════════════════════════════════════════ */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

            {/* Left: text */}
            <div>
              <Reveal>
                <h1 className="font-heading text-4xl font-bold uppercase leading-[0.92] tracking-tight text-primary sm:text-5xl md:text-6xl">
                  Who<br />We Are
                </h1>
                <div className="mt-6 h-0.5 w-14 bg-accent" />
              </Reveal>

              <div className="mt-8">
                <Reveal>
                  <p className="text-base leading-relaxed text-foreground/80">
                    We are a group of friends who wanted to build a tech-driven business.
                    We started with a simple question:
                  </p>
                </Reveal>

                <Reveal>
                  <blockquote className="my-6 border-l-[3px] border-accent pl-6 font-heading text-lg font-bold italic text-primary sm:text-xl">
                    &ldquo;What is something everyone loves?&rdquo;
                  </blockquote>
                </Reveal>

                <Reveal>
                  <p className="text-base leading-relaxed text-foreground/80">
                    The answer was simple{" "}
                    <span className="font-heading font-bold text-primary">FOOD.</span>{" "}
                    And among all food, one dish stood out to us:{" "}
                    <span className="font-heading font-bold text-primary">BIRYANI.</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    It is loved by every generation. It brings people together.
                  </p>
                </Reveal>

                <Reveal>
                  <div className="mt-7 pt-2">
                    <p className="font-heading text-base font-bold text-primary sm:text-lg">
                      What we love is what we are building.
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      That is how IBC was born. Fresh, real biryani in Berlin, powered by technology.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right: IBC bowl image */}
            <Reveal delay={0.08}>
              <div className="hidden overflow-hidden rounded-2xl lg:block lg:ml-8">
                <Image
                  src="/images/about-ibc-bowl-v2.png"
                  alt="IBC biryani bowl held up"
                  width={1080}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 2 · WHY WE ARE DIFFERENT          */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary py-10 md:py-14">

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">

          <Reveal>
            <h2 className="font-heading text-3xl font-bold uppercase leading-[0.92] tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Why We Are<br />Different
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
              At IBC, we are building differently.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-6">
              <p className="font-heading text-2xl font-bold uppercase tracking-wide text-accent sm:text-3xl md:text-4xl">
                ZERO CHEFS.
              </p>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Our kitchen runs on robotic ovens.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-6 max-w-xl border border-accent/20 bg-accent/[0.04] p-5">
              <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary-foreground">
                Every Recipe · Every Time — Locked.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">
                Same ingredients, same temperature, same taste. Every time.
                This helps us create food with consistency, quality, and scale.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-2xl text-base italic leading-relaxed text-primary-foreground/90 sm:text-lg md:text-xl">
              Come today, come tomorrow, come next month.{" "}
              <span className="not-italic font-heading font-bold text-accent">BIRYANI</span>
              {" "}will always taste exactly as you remember it.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-6 flex items-center gap-4 pt-2">
              <div className="h-6 w-0.5 flex-none bg-accent" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                — The IBC Promise
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 3 · OUR VISION                    */}
      {/* ══════════════════════════════════════════ */}
      <section className="relative bg-background py-12 md:py-16">

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

            {/* Left: text */}
            <div>
              <Reveal>
                <h2 className="font-heading text-4xl font-bold uppercase leading-[0.92] tracking-tight text-primary sm:text-5xl md:text-6xl">
                  Our<br />Vision
                </h2>
              </Reveal>

              <div className="mt-8">
                <Reveal>
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-primary/50">
                    Our goal is clear
                  </p>
                  <p className="mt-4 font-heading text-xl font-bold leading-[1.35] text-primary sm:text-2xl">
                    To bring the best biryani<br />to people across Europe.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="mt-8 text-base leading-relaxed text-foreground/80">
                    We started in Berlin. Now we are building to scale.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    With technology, process, and a strong foundation,<br />we want to make great biryani consistent in every city we grow into.
                  </p>
                </Reveal>

                {/* Berlin → Europe timeline */}
                <Reveal>
                  <div className="mt-8 max-w-xs border-b border-t border-primary/20 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-none text-center">
                        <div className="mx-auto mb-2 h-3 w-3 rounded-full bg-primary" />
                        <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Berlin</span>
                        <span className="text-[11px] italic text-muted-foreground">Now</span>
                      </div>
                      <div className="relative h-1 flex-1">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary/30" />
                        <div className="absolute left-1/3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-background" />
                        <div className="absolute left-[63%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-accent bg-background opacity-60" />
                      </div>
                      <div className="flex-none text-center">
                        <div className="mx-auto mb-2 h-3 w-3 rounded-full border-2 border-primary" />
                        <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Europe</span>
                        <span className="text-[11px] italic text-muted-foreground">Next</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right: Europe map image */}
            <Reveal delay={0.08}>
              <div className="hidden lg:block">
                <Image
                  src="/images/about-europe-map-v2.png"
                  alt="Europe map with IBC Berlin marked"
                  width={700}
                  height={700}
                  className="w-full object-contain"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* SECTION 4 · THE TEAM                      */}
      {/* ══════════════════════════════════════════ */}
      <section className="bg-primary py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

          <Reveal>
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.92] tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
              The Team
            </h2>
          </Reveal>

          {/* Two-column: text left, team right */}
          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

            {/* Left: text */}
            <div>
              <Reveal>
                <p className="text-base leading-relaxed text-primary-foreground/75">
                  IBC is more than a <span className="font-bold text-primary-foreground">kitchen.</span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/75">
                  We are a group of <span className="font-bold text-primary-foreground">passionate people</span>{" "}
                  who are Marketing Specialists, Data Experts, Software Developers, and Designers.
                </p>
              </Reveal>
              <Reveal>
                <h3 className="mt-8 font-heading text-base font-bold uppercase leading-snug tracking-tight text-primary-foreground sm:text-lg md:text-xl">
                  At IBC, we work together under one roof.
                </h3>
              </Reveal>
              <Reveal>
                <div className="mt-6 space-y-1">
                  <p className="text-sm leading-loose text-primary-foreground/70">We build our own tools.</p>
                  <p className="text-sm leading-loose text-primary-foreground/70">We use real data to make decisions.</p>
                  <p className="text-sm leading-loose text-primary-foreground/70">We improve every day.</p>
                  <p className="mt-3 text-sm text-primary-foreground/70">And we are still growing.</p>
                </div>
              </Reveal>
            </div>

            {/* Right: team carousel */}
            <Reveal delay={0.08}>
              <TeamCarousel members={teamMembers} />
            </Reveal>

          </div>

          {/* Investor Opportunity */}
          <Reveal>
            <div className="mt-8 pb-2">
              <div className="mb-8 h-px w-1/2 bg-accent/20" />
              <div className="mb-5 flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                  Investor Opportunity
                </span>
              </div>
              <p className="text-sm italic text-primary-foreground/55">
                If this sounds interesting to you,
              </p>
              <p className="mt-3 font-heading text-xl font-bold leading-[1.2] text-primary-foreground sm:text-2xl md:text-3xl">
                There is a place for you here.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/50">
                We are building something real and we are open to partners and investors
                who believe in what we are creating.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
