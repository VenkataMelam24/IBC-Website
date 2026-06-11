"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:h-20 lg:px-10">
        <Link href="/" aria-label="Indian Biryani Company">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="IBC — Indian Biryani Company" className="h-9 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-5 md:flex">
          {/* Action buttons */}
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

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-border text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "grid border-t border-border bg-background px-6 transition-[grid-template-rows] duration-300 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded px-3 py-2 text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "bg-primary/8 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pb-2">
              <a
                href="https://www.quandoo.de/en/place/ibc-indian-biryani-company-86312"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded border-2 border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Book a Table
              </a>
              <Link
                href="/#order-online"
                className="inline-flex h-11 items-center justify-center rounded bg-primary px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Order Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
