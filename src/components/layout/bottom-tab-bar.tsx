"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, ChefHat, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home",     href: "/",             icon: Home },
  { label: "Menu",     href: "/menu",          icon: UtensilsCrossed },
  { label: "Order",    href: "/#order-online", icon: ShoppingBag },
  { label: "Catering", href: "/catering",      icon: ChefHat },
  { label: "Branches", href: "/branch",        icon: MapPin },
];

export function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 transition-colors",
                active ? "text-primary" : "text-foreground/45 hover:text-foreground/70",
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className={cn("text-[10px] font-semibold tracking-wide", active && "font-bold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
