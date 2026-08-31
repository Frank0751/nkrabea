import Link from "next/link";
import { ORG, SOCIAL_LINKS } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-foreground text-primary-foreground">
      <div className="kente-divider" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground">
                <svg viewBox="0 0 32 32" className="h-7 w-7">
                  <path
                    d="M16 3 L19.6 12.4 L29 12.4 L21.4 17.8 L24.2 27 L16 21.4 L7.8 27 L10.6 17.8 L3 12.4 L12.4 12.4 Z"
                    fill="oklch(0.82 0.13 84)"
                  />
                  <circle cx="16" cy="16" r="2.4" fill="oklch(0.55 0.16 30)" />
                </svg>
              </span>
              <div className="leading-none">
                <div className="font-display text-base font-semibold">
                  Nkrabea
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/55">
                  Culture &amp; Arts Ensemble
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/65">
              {ORG.mission}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-primary-foreground/15 px-3.5 py-1.5 text-xs font-medium text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <FooterCol
              title="Explore"
              links={[
                { label: "About", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "Bookings", href: "/bookings" },
                { label: "Gallery", href: "/gallery" },
              ]}
            />
            <FooterCol
              title="Engage"
              links={[
                { label: "Events", href: "/events" },
                { label: "Ensemble", href: "/ensemble" },
                { label: "Contact", href: "/contact" },
                { label: "Home", href: "/" },
              ]}
            />
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={`mailto:${ORG.email}`}
                    className="text-primary-foreground/75 transition-colors hover:text-accent"
                  >
                    {ORG.email}
                  </a>
                </li>
                {ORG.phones.map((p) => (
                  <li
                    key={p}
                    className="text-primary-foreground/75"
                  >
                    {p}
                  </li>
                ))}
                <li className="pt-1 text-xs leading-relaxed text-primary-foreground/55">
                  {ORG.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {ORG.name}. {ORG.type}.
          </p>
          <p>
            Built in Accra. Carrying heritage forward, one stage at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
