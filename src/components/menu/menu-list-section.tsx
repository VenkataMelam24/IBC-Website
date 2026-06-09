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
        <div className="rounded-[1.6rem] border border-border bg-card px-5 py-6 shadow-luxury md:px-6">
          <div className="mb-5 flex items-center gap-4">
            <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">{category.title}</h2>
            <div className="h-px flex-1 bg-border/70" />
          </div>

          <div className="space-y-4">
            {category.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.04}>
                <article className="flex items-center gap-4 rounded-2xl border border-border/80 bg-background/75 p-3.5">
                  <MenuImage src={item.image} alt={item.name} variant="thumb" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading text-xl text-foreground">{item.name}</h3>
                      <p className="shrink-0 text-sm font-semibold text-primary">{item.price}</p>
                    </div>
                    {item.description ? (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
