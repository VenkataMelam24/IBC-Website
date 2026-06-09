import { MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function BranchesSection() {
  return (
    <section id="branches" className="border-t border-border bg-card py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Find Us in Berlin
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="grid items-start gap-8 rounded-2xl border border-border bg-background p-8 md:grid-cols-2 md:p-10">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Indian Biryani Company
              </h3>
              <div className="mt-4 space-y-3">
                <p className="flex items-start gap-2 text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  Hektorstraße 11, 10711 Berlin, Germany
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} className="shrink-0 text-primary" />
                  +49 179 9676142
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="tel:+491799676142" variant="primary">
                Call Now
              </ButtonLink>
              <ButtonLink
                href="https://maps.google.com/?q=Hektorstraße+11,+10711+Berlin,+Germany"
                variant="ghost"
              >
                Open in Maps
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
