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
              ? "rounded-[2rem] bg-[linear-gradient(160deg,hsl(var(--primary))_8%,hsl(351_60%_22%)_58%,hsl(10_50%_17%)_100%)] px-4 py-6 md:px-8 md:py-10"
              : ""
          }
        >
          <div className="mb-5 md:mb-8">
            <h2
              className={
                isMaroon
                  ? "font-heading text-xl font-semibold text-cream md:text-3xl"
                  : "font-heading text-xl font-semibold text-foreground md:text-3xl"
              }
            >
              {category.title}
            </h2>
            <div className={isMaroon ? "mt-2 h-1 w-8 rounded-full bg-accent md:w-10" : "mt-2 h-1 w-8 rounded-full bg-primary md:w-10"} />
          </div>

          <div
            className={
              columns === "four"
                ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-5 xl:grid-cols-4"
                : "grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-5 xl:grid-cols-3"
            }
          >
            {category.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.05}>
                <article
                  className={
                    isMaroon
                      ? "group overflow-hidden rounded-[1.35rem] border border-cream/18 bg-[hsl(var(--primary)/0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-cream/30"
                      : "group overflow-hidden rounded-[1.35rem] border border-border bg-card shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
                  }
                >
                  <MenuImage src={item.image} alt={item.name} className="rounded-b-none" />
                  <div className="p-3 md:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={isMaroon
                        ? "font-heading text-xs font-semibold leading-snug text-cream md:text-base"
                        : "font-heading text-xs font-semibold leading-snug text-foreground md:text-base"
                      }>
                        {item.name}
                      </h3>
                      <span className={isMaroon
                        ? "shrink-0 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent md:px-2.5 md:text-xs"
                        : "shrink-0 rounded-full bg-primary/8 px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary md:px-2.5 md:text-xs"
                      }>
                        {item.price}
                      </span>
                    </div>
                    {item.description ? (
                      <p className={isMaroon
                        ? "mt-1 text-[11px] leading-relaxed text-cream/70 md:mt-2 md:text-sm"
                        : "mt-1 text-[11px] leading-relaxed text-muted-foreground md:mt-2 md:text-sm"
                      }>
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
