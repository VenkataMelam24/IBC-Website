import Link from "next/link";
import { footerQuickLinks } from "@/data/navigation";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ibc_restaurant/",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={17} height={17}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/61578186328000/",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/indian-biryani-company",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const footerLinks = [
  { label: "Order Now", href: "/#order-online" },
  { label: "Catering", href: "/catering" },
  { label: "Branch", href: "/branch" },
];

export function Footer() {
  return (
    <footer className="bg-primary">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex flex-col items-start gap-0">
            <span className="font-logo text-[1.85rem] font-bold leading-none tracking-wide text-primary-foreground">IBC</span>
            <span className="text-[6.5px] font-bold uppercase tracking-[0.26em] text-primary-foreground/55">Indian Biryani Company</span>
          </div>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-primary-foreground/55">
            ⚠ Images shown on this website are for reference purposes only and may not represent
            the exact appearance of the actual dishes served.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-accent transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold uppercase tracking-widest text-accent">Quick Links</h3>
          <div className="mt-4 space-y-3">
            {/* Row 1: first 3 links */}
            <div className="flex items-center gap-2">
              {footerQuickLinks.slice(0, 3).map((item, i) => (
                <span key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-accent">|</span>}
                  <Link href={item.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>
            {/* Row 2: remaining links */}
            <div className="flex items-center gap-2">
              {footerQuickLinks.slice(3).map((item, i) => (
                <span key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-accent">|</span>}
                  <Link href={item.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold uppercase tracking-widest text-accent">Contact Berlin</h3>
          <div className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <p>Hektorstraße 11, 10711 Berlin, Germany</p>
            <p>+49 179 9676142</p>
          </div>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-6 py-5 text-center text-xs text-primary-foreground/60 lg:px-10">
        © {new Date().getFullYear()} Indian Biryani Company. Crafted in Berlin.
      </div>
    </footer>
  );
}
