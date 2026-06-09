import Image from "next/image";
import { CalendarCheck, ShoppingBag, Utensils } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    icon: Utensils,
    title: "Dine In",
    description: "Order and dine at our Berlin restaurant. Experience warm Indian hospitality in person.",
  },
  {
    icon: ShoppingBag,
    title: "Order Online",
    description: "Order your favourite biryanis, curries, and Indian classics online through Wolt, Uber Eats, and Lieferando. The IBC webshop is coming soon.",
  },
  {
    icon: CalendarCheck,
    title: "Catering",
    description: "Celebrate at IBC or bring IBC to your celebration. From birthdays and anniversaries to achievements, family gatherings, and office events, we serve authentic Indian food for every special moment at our restaurant or at yours.",
  },
];

const specialities = [
  "Authentic Indian Spices",
  "Signature Dum Biryani",
  "Modern Dining Experience",
];

export function BrandStorySection() {
  return (
    <>
      <section className="border-t border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              How to Enjoy IBC
            </h2>
            <div className="mt-3 h-1 w-20 bg-primary" />
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.07}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center text-primary">
                      <Icon size={44} strokeWidth={1.25} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Rooted in Authentic Indian Flavor.
              </h2>
              <div className="mt-3 h-1 w-20 bg-primary" />
              <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                From aromatic biryanis to vibrant Indian favourites, IBC focuses on rich flavour,
                authentic spices, and premium hospitality in the heart of Berlin.
              </p>
              <ul className="mt-7 space-y-3">
                {specialities.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="font-semibold text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/spices.png"
                  alt="Authentic Indian spices — cardamom, star anise, turmeric, cumin, chillies, coriander"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
