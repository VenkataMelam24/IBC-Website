import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const dishes = [
  {
    name: "Chicken Dum Biryani",
    note: "Fragrant basmati rice, authentic spice blend, and slow-cooked chicken pieces.",
    image: encodeURI("/images/13001357_ibc  indian biryani company_Food_chicken_biryani.jpg"),
  },
  {
    name: "Mutton Dum Biryani",
    note: "Rich masala layers with tender mutton and aromatic long-grain basmati rice.",
    image: encodeURI("/images/13001357_ibc  indian biryani company_Food_mutton_biryani.jpg"),
  },
  {
    name: "Chicken Majestic",
    note: "Crispy fried chicken tossed in a yoghurt and pepper sauce with garlic and onions.",
    image: encodeURI("/images/13001357_ibc  indian biryani company_Food_chicken_majestic.jpg"),
  },
  {
    name: "Chilli Chicken",
    note: "Crispy fried chicken tossed in a homemade chilli sauce with garlic and bell peppers.",
    image: encodeURI("/images/13001357_ibc  indian biryani company_Food_chilli_chicken.jpg"),
  },
];

export function SignatureDishesSection() {
  return (
    <section id="menu" className="bg-card py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Signature Dishes
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A premium menu built on authentic Indian spices and elegant presentation.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish, index) => (
            <Reveal key={dish.name} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-xl border border-border bg-background">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-bold text-foreground">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dish.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <ButtonLink href="/menu" variant="primary">View Full Menu</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
