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
    description: "Celebrate at IBC or bring IBC to your celebration. From birthdays and anniversaries to achievements, family gatherings, and office events, we serve real Indian food for every special moment at our restaurant or at yours.",
  },
];

const specialities = [
  "Premium Indian Spices",
  "Signature Dum Biryani",
  "Modern Dining Experience",
];

export function BrandStorySection() {
  return (
    <>
      <section className="border-t border-border py-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-5xl">
              How to Enjoy IBC
            </h2>
            <div className="mt-3 h-1 w-16 bg-primary md:w-20" />
          </Reveal>

          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.07}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center text-primary md:mb-5 md:h-16 md:w-16">
                      <Icon size={28} strokeWidth={1.25} className="md:hidden" />
                      <Icon size={44} strokeWidth={1.25} className="hidden md:block" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground md:text-xl">{service.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground md:mt-2 md:text-sm">{service.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-heading text-3xl font-bold leading-[1.35] text-foreground md:text-5xl">
                Rooted in Real Indian Flavour.
              </h2>
              <div className="mt-3 h-1 w-16 bg-primary md:w-20" />
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
                From aromatic biryanis to vibrant Indian favourites, IBC focuses on rich flavour,
                real spices, and premium hospitality in the heart of Berlin.
              </p>
              <ul className="mt-5 space-y-2 md:mt-7 md:space-y-3">
                {specialities.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:h-2 md:w-2" />
                    <span className="text-sm font-semibold text-foreground md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl">
                <Image
                  src="/images/spices.png"
                  alt="Indian spices — cardamom, star anise, turmeric, cumin, chillies, coriander"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
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
