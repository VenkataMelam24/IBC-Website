import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const cateringImages = [
  {
    src: "/images/catering-birthday.png",
    alt: "Birthday celebration at IBC",
  },
  {
    src: "/images/catering-family.png",
    alt: "Indian family gathering at IBC",
  },
  {
    src: "/images/catering-corporate.png",
    alt: "Corporate catering by IBC",
  },
];

export function CateringCtaSection() {
  return (
    <section id="catering" className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
              IBC Catering
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Catering for Your Celebrations.
            </h2>
            <div className="mt-3 h-1 w-20 bg-primary" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Corporate events, birthdays, weddings, and private gatherings. Experience real
              Indian hospitality with IBC catering.
            </p>
            <div className="mt-8">
              <ButtonLink href="/catering" variant="primary">Catering Enquiry</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 h-52 overflow-hidden rounded-xl">
                <Image
                  src={cateringImages[0].src}
                  alt={cateringImages[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {cateringImages.slice(1).map((img) => (
                <div key={img.alt} className="relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
