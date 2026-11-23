import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";
import { LOGO } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { SocialLinks } from "./social-links";

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

const HEADING = "text-sm font-medium text-band-foreground";
const LINK =
  "inline-block py-1 text-sm text-band-foreground/75 underline-offset-4 transition-colors hover:text-band-foreground hover:underline";

/**
 * Two balanced rows rather than one heavy column.
 *
 * Row one: who we are (logo, name, sentence, social accounts) beside the
 * newsletter. Row two: four even columns, the three groups of links and the
 * contact details, so every column carries about the same weight and nothing
 * piles up on one side.
 */
export async function Footer() {
  const { org, socials, footerText } = await getSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate bg-band text-band-foreground">
      <div className="woven-edge" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Row one: identity and newsletter */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              {/* Decorative: the name sits right beside it. */}
              <Image
                src={LOGO.badge}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full ring-1 ring-band-foreground/20"
              />
              <div>
                <p className="font-display text-2xl tracking-tight">{org.shortName}</p>
                <p className="mt-0.5 text-sm text-accent">{org.motto}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-band-foreground/75">
              {footerText}
            </p>
            {socials.length > 0 && (
              <nav aria-label="Nkrabea on social media" className="mt-6">
                <SocialLinks socials={socials} size="sm" />
              </nav>
            )}
          </div>

          <div className="rounded-2xl border border-band-foreground/10 bg-band-foreground/5 p-6 sm:p-8">
            <h2 className="font-display text-xl tracking-tight">Stay in touch</h2>
            <p className="mt-2 text-sm leading-relaxed text-band-foreground/75">
              Occasional updates when a programme opens or completes.
            </p>
            <div className="mt-5">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        {/* Row two: four even columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-band-foreground/10 pt-12 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className={HEADING}>{column.heading}</h2>
              <ul className="mt-4 space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h2 className={HEADING}>Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="leading-relaxed text-band-foreground/75">{org.headOffice}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${org.email}`} className={`${LINK} break-all`}>
                  {org.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="flex flex-col">
                  {org.phones.slice(0, 2).map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={LINK}>
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-band-foreground/10 pt-8 text-xs leading-relaxed text-band-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {org.legalName}. Registered under the {org.registration}. Incorporated{" "}
            {org.incorporated}. {org.postalAddress}
          </p>
          <p className="shrink-0">
            Website by{" "}
            <a
              href="https://koombei.com"
              target="_blank"
              rel="noopener"
              className="font-medium text-band-foreground/85 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              KoomBei
              <span className="sr-only"> (koombei.com, opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
