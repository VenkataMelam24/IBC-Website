import { ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const values = [
  {
    icon: UtensilsCrossed,
    title: "Dum-Cooked Precision",
    description:
      "Hand-layered saffron rice and marinated proteins are crafted for deep aroma and texture.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Ingredient Standards",
    description:
      "High-quality sourcing, spice balance, and consistency controls ensure every plate meets IBC signature quality.",
  },
  {
    icon: Sparkles,
    title: "Refined Berlin Hospitality",
    description:
      "A luxury service rhythm that feels warm, elegant, and modern without losing Indian culinary soul.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-primary/60 bg-[linear-gradient(160deg,hsl(var(--primary))_5%,hsl(352_56%_22%)_54%,hsl(8_50%_18%)_100%)] p-8 shadow-[0_30px_70px_-35px_hsl(var(--primary)/0.75)] md:p-12">
          <div className="pointer-events-none absolute -left-12 top-1/3 h-36 w-36 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.2),transparent_72%)] blur-xl" />
          <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,hsl(var(--copper)/0.25),transparent_70%)] blur-xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/85">IBC Standard</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-cream md:text-4xl">
            What Makes IBC Different
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/82">
            Every plate is crafted around depth of flavour, consistency, and the warmth
            of genuine Indian hospitality.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <article className="h-full rounded-3xl border border-cream/15 bg-[hsl(var(--primary)/0.45)] p-6 backdrop-blur">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-heading text-2xl leading-snug text-cream">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/78">{value.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
