import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";
import { ORG } from "@/lib/content";

const COLUMNS = [
  {
    heading: "Organisation",
    links: [
      { href: "/about", label: "About us" },
      { href: "/leadership", label: "Leadership & governance" },
      { href: "/impact", label: "Our impact" },
    ],
  },
  {
    heading: "Our work",
    links: [
      { href: "/programmes", label: "Programmes" },
      { href: "/news", label: "News & events" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/partner", label: "Partner with us" },
      { href: "/get-involved", label: "Get involved" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-band text-band-foreground">
      <div className="kente-divider" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <p className="font-display text-xl tracking-tight">
              {ORG.shortName}
            </p>
            <p className="label-mono mt-2 text-accent">{ORG.motto}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-band-foreground/70">
              A registered Ghanaian NGO using culture and the creative arts as
              tools for socio-economic development.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <dd className="leading-relaxed text-band-foreground/70">
                  {ORG.headOffice}
                </dd>
              </div>
              <div className="flex gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <dd>
                  <a
                    href={`mailto:${ORG.email}`}
                    className="text-band-foreground/70 underline-offset-4 hover:text-band-foreground hover:underline"
                  >
                    {ORG.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <dd className="space-y-1">
                  {ORG.phones.slice(0, 2).map((phone) => (
                    <div key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="text-band-foreground/70 underline-offset-4 hover:text-band-foreground hover:underline"
                      >
                        {phone}
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Navigation */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            {COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="label-mono text-band-foreground/50">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-band-foreground/75 underline-offset-4 transition-colors hover:text-band-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h2 className="label-mono text-band-foreground/50">
              Stay in touch
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-band-foreground/70">
              Occasional updates when a programme opens or completes.
            </p>
            <div className="mt-5">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-band-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-band-foreground/50">
            &copy; {year} {ORG.legalName}. Registered under the{" "}
            {ORG.registration}. Incorporated {ORG.incorporated}.
          </p>
          <p className="text-xs text-band-foreground/50">
            {ORG.postalAddress}
          </p>
        </div>
      </div>
    </footer>
  );
}
