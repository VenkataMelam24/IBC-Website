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
  {
    label: "WhatsApp",
    href: "https://wa.me/491773771839",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-new.png" alt="IBC — Indian Biryani Company" className="h-14 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
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
            <span className="flex items-center gap-1.5">
              +49 177 3771839
              <a href="https://wa.me/491773771839" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex text-[#25d366] transition-opacity hover:opacity-80">
                <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </span>
            <p>030 2083 3623</p>
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
