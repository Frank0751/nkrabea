"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { ORG } from "@/lib/content";

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/bookings", label: "Bookings" },
  { href: "/ensemble", label: "Ensemble" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-transparent"
          : "bg-background/85 backdrop-blur-md border-border"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${ORG.name} home`}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-base font-semibold tracking-tight ${
                transparent ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              Nkrabea
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.18em] ${
                transparent ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              Culture &amp; Arts
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  transparent
                    ? isActive
                      ? "text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-px h-px origin-left transition-transform duration-300 ${
                    transparent ? "bg-primary-foreground" : "bg-primary"
                  } ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className={`hidden sm:inline-flex ${transparent ? "bg-primary-foreground text-foreground hover:bg-primary-foreground/90" : ""}`}
          >
            <Link href="/bookings">Book the Ensemble</Link>
          </Button>

          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={`h-9 w-9 ${transparent ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-5 py-4">
                    <span className="font-display text-lg font-semibold">Menu</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close menu">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className={`rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted ${
                          isHome ? "bg-muted text-foreground" : "text-foreground/80"
                        }`}
                      >
                        Home
                      </Link>
                    </SheetClose>
                    {NAV_LINKS.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));
                      return (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted ${
                              isActive ? "bg-muted text-foreground" : "text-foreground/80"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                  <div className="mt-auto border-t p-4">
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/bookings">Book the Ensemble</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <span
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-foreground"
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7">
        <path
          d="M16 3 L19.6 12.4 L29 12.4 L21.4 17.8 L24.2 27 L16 21.4 L7.8 27 L10.6 17.8 L3 12.4 L12.4 12.4 Z"
          fill="oklch(0.82 0.13 84)"
        />
        <circle cx="16" cy="16" r="2.4" fill="oklch(0.55 0.16 30)" />
      </svg>
    </span>
  );
}
