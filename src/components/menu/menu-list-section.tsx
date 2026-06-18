import { Reveal } from "@/components/ui/reveal";
import type { MenuCategory } from "@/data/menu";
import { MenuImage } from "@/components/menu/menu-image";

type MenuListSectionProps = {
  category: MenuCategory;
};

export function MenuListSection({ category }: MenuListSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-28">
      <Reveal>
        <div className="rounded-[1.6rem] border border-border bg-card px-4 py-5 shadow-luxury md:px-6 md:py-6">
          <div className="mb-4 flex items-center gap-4 md:mb-5">
            <h2 className="font-heading text-xl font-semibold text-foreground md:text-3xl md:text-4xl">{category.title}</h2>
            <div className="h-px flex-1 bg-border/70" />
          </div>

          <div className="space-y-3 md:space-y-4">
            {category.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.04}>
                <article className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/75 p-3 md:gap-4 md:p-3.5">
                  <MenuImage src={item.image} alt={item.name} variant="thumb" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2 md:gap-3">
                      <h3 className="font-heading text-sm text-foreground md:text-base">{item.name}</h3>
                      <p className="shrink-0 text-xs font-semibold text-primary md:text-sm">{item.price}</p>
                    </div>
                    {item.description ? (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground md:mt-1 md:text-sm">{item.description}</p>
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
