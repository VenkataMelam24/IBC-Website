"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, UtensilsCrossed, ChefHat, MapPin, Info } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

const drawerLinks = [
  { label: "Home",     href: "/",        icon: Home },
  { label: "Menu",     href: "/menu",     icon: UtensilsCrossed },
  { label: "Catering", href: "/catering", icon: ChefHat },
  { label: "Branch",   href: "/branch",   icon: MapPin },
  { label: "About Us", href: "/about",    icon: Info },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        {/* ── Mobile top bar ── */}
        <div className="flex h-14 items-center justify-between px-4 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded text-foreground"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/" aria-label="Indian Biryani Company">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-new.png"
              alt="IBC"
              className="h-9 w-auto"
              style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(95%) saturate(1200%) hue-rotate(310deg)" }}
            />
          </Link>

          {(() => {
            const btnClass = "rounded bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary-foreground whitespace-nowrap";
            if (pathname === "/menu")
              return <Link href="/#order-online" className={btnClass}>Order Now</Link>;
            if (pathname === "/catering" || pathname.startsWith("/catering/"))
              return <Link href="/catering/book" className={btnClass}>Book Catering</Link>;
            return (
              <a href="https://www.quandoo.de/en/place/ibc-indian-biryani-company-86312" target="_blank" rel="noopener noreferrer" className={btnClass}>
                Book a Table
              </a>
            );
          })()}
        </div>

        {/* ── Desktop top bar ── */}
        <div className="mx-auto hidden h-20 w-full max-w-7xl items-center justify-between px-6 md:flex lg:px-10">
          <Link href="/" aria-label="Indian Biryani Company">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-new.png" alt="IBC — Indian Biryani Company" className="h-16 w-auto" />
          </Link>

          <nav className="flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative pb-0.5 text-sm font-semibold tracking-wide transition-colors",
                  isActive(item.href)
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.quandoo.de/en/place/ibc-indian-biryani-company-86312"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded border-2 border-primary px-5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Book a Table
            </a>
            <Link
              href="/#order-online"
              className="inline-flex h-10 items-center rounded bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

        {/* Panel */}
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-72 flex-col bg-background shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Indian Biryani Company">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-new.png"
                alt="IBC — Indian Biryani Company"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(95%) saturate(1200%) hue-rotate(310deg)" }}
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded text-foreground/60 hover:text-foreground"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {drawerLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors",
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-foreground",
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
