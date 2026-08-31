import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
} from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionEyebrow } from "@/components/site/about";
import { FAQ } from "@/components/site/faq";
import { ContactForms } from "@/components/site/contact-forms";
import { ORG, SOCIAL_LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & Bookings",
  description:
    "Book a performance, send a message, or join the newsletter. Nkrabea Culture & Arts Ensemble is based in Adenta, Accra, and replies within two working days.",
};

const OFFICE_HOURS = [
  { day: "Monday to Friday", hours: "9:00 to 17:00 GMT" },
  { day: "Saturday", hours: "By appointment" },
  { day: "Sunday", hours: "Closed" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="h-4 w-4" />,
  Facebook: <Facebook className="h-4 w-4" />,
  TikTok: <Music2 className="h-4 w-4" />,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Book a performance or start a conversation"
        description="Tell us about your stage, your students or your idea. Our producer reads every message and replies within two working days."
        image="/images/social/fb-reel.jpg"
        imageAlt="Nkrabea dancer performing with drummers at a community celebration"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* LEFT COLUMN: contact details, socials, office hours, map */}
            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Contact details
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Reach the ensemble office in Adenta, Accra.
                  </p>

                  <dl className="mt-6 space-y-5">
                    <ContactRow
                      icon={<MapPin className="h-4 w-4" />}
                      label="Studio &amp; office"
                      value={ORG.location}
                    />
                    <ContactRow
                      icon={<Phone className="h-4 w-4" />}
                      label="Phone"
                      value={ORG.phones.join("  /  ")}
                    />
                    <ContactRow
                      icon={<Mail className="h-4 w-4" />}
                      label="Email"
                      value={
                        <a
                          href={`mailto:${ORG.email}`}
                          className="text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {ORG.email}
                        </a>
                      }
                    />
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Follow the ensemble
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Performances, rehearsals and behind the scenes.
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-1">
                    {SOCIAL_LINKS.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${s.label} ${s.handle} (opens in new tab)`}
                          className="flex items-center gap-4 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-primary hover:bg-secondary"
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
                            aria-hidden="true"
                          >
                            {SOCIAL_ICONS[s.label] ?? <Music2 className="h-4 w-4" />}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {s.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {s.handle}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                    Office hours
                  </h2>
                  <dl className="mt-4 divide-y divide-border">
                    {OFFICE_HOURS.map((row) => (
                      <div
                        key={row.day}
                        className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <dt className="text-sm font-medium text-foreground">
                          {row.day}
                        </dt>
                        <dd className="text-sm text-muted-foreground">
                          {row.hours}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
                  <div className="relative aspect-[4/3] w-full bg-secondary">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                      <MapPin
                        className="h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                      <p className="font-display text-base font-semibold text-foreground">
                        Adenta Village, Accra
                      </p>
                      <p className="max-w-xs text-xs text-muted-foreground">
                        Map placeholder. We will share exact directions when
                        you confirm a visit or rehearsal.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: tabbed forms */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="space-y-4">
                  <div>
                    <SectionEyebrow>Send us a message</SectionEyebrow>
                    <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                      Three ways to reach the ensemble
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Book a performance, ask a question, or join the newsletter
                      for show announcements and workshop dates.
                    </p>
                  </div>
                  <ContactForms />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Response time band */}
      <section className="border-t border-border bg-foreground py-12 text-primary-foreground lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                Our producer reads every message and replies within two working
                days.
              </h2>
              <p className="mt-2 text-sm text-primary-foreground/70">
                For urgent booking enquiries on a near date, call the office
                directly during office hours.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${ORG.email}`}
                className="inline-flex items-center gap-2 text-primary-foreground underline-offset-4 hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {ORG.email}
              </a>
              <a
                href={`tel:${ORG.phones[0].replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-primary-foreground/85 underline-offset-4 hover:text-primary-foreground hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {ORG.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-foreground break-words">
          {value}
        </dd>
      </div>
    </div>
  );
}
