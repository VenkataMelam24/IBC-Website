import Image from "next/image";
import { MenuPageContent } from "@/components/menu/menu-page-content";

export default function MenuPage() {
  return (
    <div className="bg-background">

      {/* ── Hero ── */}
      <section className="relative isolate min-h-[55vh] overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/menu-hero.png"
            alt="IBC Menu — fresh Indian food"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Left-side gradient so text stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(25_60%_78%/0.95)_0%,hsl(25_60%_78%/0.80)_30%,hsl(25_60%_78%/0.30)_58%,transparent_78%)]" />

        {/* Content */}
        <div className="relative flex min-h-[55vh] w-full items-center px-6 py-14 lg:px-10">
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              IBC Berlin
            </p>
            <h1 className="mt-4 font-body text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.25rem]">
              Our Menu.
            </h1>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-foreground/70 md:text-lg">
              From fragrant biryanis to rich curries. Explore everything we cook fresh every day, available for dine-in, delivery, and catering.
            </p>
          </div>
        </div>
      </section>

      <MenuPageContent />
    </div>
  );
}
