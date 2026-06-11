import { Reveal } from "@/components/ui/reveal";
import type { MenuCategory } from "@/data/menu";
import { MenuImage } from "@/components/menu/menu-image";

type MenuCardGridSectionProps = {
  category: MenuCategory;
  columns?: "three" | "four";
  tone?: "maroon" | "cream";
};

export function MenuCardGridSection({
  category,
  columns = "three",
  tone = "cream",
}: MenuCardGridSectionProps) {
  const isMaroon = tone === "maroon";

  return (
    <section id={category.id} className="scroll-mt-28">
      <Reveal>
        <div
          className={
            isMaroon
              ? "rounded-[2rem] bg-[linear-gradient(160deg,hsl(var(--primary))_8%,hsl(351_60%_22%)_58%,hsl(10_50%_17%)_100%)] px-6 py-8 md:px-8 md:py-10"
              : ""
          }
        >
          <div className="mb-8">
            <h2
              className={
                isMaroon
                  ? "font-heading text-4xl font-semibold text-cream"
                  : "font-heading text-4xl font-semibold text-foreground"
              }
            >
              {category.title}
            </h2>
            <div className={isMaroon ? "mt-2.5 h-1 w-10 rounded-full bg-accent" : "mt-2.5 h-1 w-10 rounded-full bg-primary"} />
          </div>

          <div
            className={
              columns === "four" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4" : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            }
          >
            {category.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.05}>
                <article
                  className={
                    isMaroon
                      ? "group overflow-hidden rounded-[1.35rem] border border-cream/18 bg-[hsl(var(--primary)/0.32)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cream/30 hover:shadow-[0_20px_50px_-16px_hsl(var(--primary)/0.5)]"
                      : "group overflow-hidden rounded-[1.35rem] border border-border bg-card shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_50px_-16px_hsl(var(--primary)/0.28)]"
                  }
                >
                  <MenuImage src={item.image} alt={item.name} className="rounded-b-none" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={isMaroon ? "font-heading text-xl font-semibold leading-snug text-cream" : "font-heading text-xl font-semibold leading-snug text-foreground"}>
                        {item.name}
                      </h3>
                      <span className={isMaroon
                        ? "shrink-0 rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold tracking-wide text-accent"
                        : "shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-bold tracking-wide text-primary"
                      }>
                        {item.price}
                      </span>
                    </div>
                    {item.description ? (
                      <p className={isMaroon ? "mt-2 text-sm leading-relaxed text-cream/70" : "mt-2 text-sm leading-relaxed text-muted-foreground"}>
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
