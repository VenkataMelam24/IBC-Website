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
          <div className="mb-6 flex items-center gap-4">
            <h2
              className={
                isMaroon
                  ? "font-heading text-4xl font-semibold text-cream"
                  : "font-heading text-4xl font-semibold text-foreground"
              }
            >
              {category.title}
            </h2>
            <div className={isMaroon ? "h-px flex-1 bg-cream/20" : "h-px flex-1 bg-border/70"} />
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
                      ? "group overflow-hidden rounded-[1.35rem] border border-cream/18 bg-[hsl(var(--primary)/0.32)]"
                      : "group overflow-hidden rounded-[1.35rem] border border-border bg-card shadow-luxury"
                  }
                >
                  <MenuImage src={item.image} alt={item.name} className="rounded-b-none" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={isMaroon ? "font-heading text-2xl text-cream" : "font-heading text-2xl text-foreground"}>
                        {item.name}
                      </h3>
                      <p className={isMaroon ? "text-sm font-semibold text-accent" : "text-sm font-semibold text-primary"}>
                        {item.price}
                      </p>
                    </div>
                    {item.description ? (
                      <p className={isMaroon ? "mt-2 text-sm leading-relaxed text-cream/78" : "mt-2 text-sm leading-relaxed text-muted-foreground"}>
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
