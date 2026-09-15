"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
import { TextSizeToggle } from "./text-size-toggle";
import { ORG, LOGO } from "@/lib/content";

/**
 * Navigation follows the structure Nkrabea set out in their brief, labelled
 * by what a visitor wants to do rather than by internal department.
 */
export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/leadership", label: "Leadership" },
  { href: "/programmes", label: "Our Work" },
  { href: "/impact", label: "Impact" },
  { href: "/partner", label: "Partner" },
  { href: "/news", label: "News" },
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

  // Every page now opens on a dark hero, not just the homepage, so the
  // transparent state applies everywhere. pathname still decides which link
  // is marked current.
  const isHome = pathname === "/";
  const transparent = !scrolled;

  return (
    // Fixed rather than sticky. A sticky header occupies layout space, so the
    // hero would start below it and the transparent state would sit over the
    // cream page rather than the dark hero - rendering the light-on-dark
    // controls invisible. Both hero components carry top padding that clears
    // this bar.
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-gradient-to-b from-band/85 via-band/40 to-transparent"
          : "border-border bg-background/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${ORG.name} home`}
        >
          <BrandMark onDark={transparent} />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-base tracking-tight ${
                transparent ? "text-band-foreground" : "text-foreground"
              }`}
            >
              Nkrabea
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                transparent
                  ? "text-band-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              Culture &amp; Arts
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                  transparent
                    ? isActive
                      ? "text-band-foreground"
                      : "text-band-foreground/70 hover:text-band-foreground"
                    : isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-2.5 -bottom-px h-px origin-left transition-transform duration-300 ${
                    transparent ? "bg-band-foreground" : "bg-primary"
                  } ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <TextSizeToggle onDark={transparent} />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex"
          >
            <Link href="/get-involved">Support Our Work</Link>
          </Button>

          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={`h-9 w-9 ${
                    transparent
                      ? "text-band-foreground hover:bg-band-foreground/10"
                      : ""
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 sm:w-[340px]">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-5 py-4">
                    <span className="font-display text-lg">
                      Menu
                    </span>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Close menu"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav
                    className="flex flex-col gap-1 overflow-y-auto p-4"
                    aria-label="Mobile"
                  >
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
                        pathname.startsWith(`${link.href}/`);
                      return (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted ${
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-foreground/80"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                  <div className="mt-auto space-y-3 border-t p-4">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <Link href="/get-involved">Support Our Work</Link>
                      </Button>
                    </SheetClose>
                    <div className="flex items-center justify-center gap-1">
                      <TextSizeToggle />
                    </div>
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

/**
 * Nkrabea's badge. Decorative here, because the link around it already
 * carries the organisation's name as its label. Over the dark hero a faint
 * ring separates the black disc from the ink behind it.
 */
function BrandMark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Image
      src={LOGO.badge}
      alt=""
      width={40}
      height={40}
      priority
      className={`h-10 w-10 shrink-0 rounded-full transition-shadow duration-300 ${
        onDark ? "ring-1 ring-band-foreground/25" : ""
      }`}
    />
  );
}
