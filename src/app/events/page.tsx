import Link from "next/link";
import { MapPin, Mail, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { EVENTS, ORG, type EventItem } from "@/lib/content";

export const metadata = {
  title: "Events",
  description:
    "Upcoming performances, showcases and workshops by Nkrabea Culture & Arts Ensemble across Accra and Adenta, plus past highlights from Panafest, Independence Day and SID Festival stages.",
};

type StatusKey = EventItem["status"];

const STATUS_META: Record<
  StatusKey,
  { label: string; badgeClass: string; dotClass: string }
> = {
  upcoming: {
    label: "Scheduled",
    badgeClass:
      "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
    dotClass: "bg-primary",
  },
  open: {
    label: "Open booking",
    badgeClass:
      "bg-accent/25 text-accent-foreground ring-1 ring-inset ring-accent/40",
    dotClass: "bg-accent",
  },
  past: {
    label: "Past",
    badgeClass:
      "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
    dotClass: "bg-muted-foreground",
  },
};

const EVENT_BLURBS: Record<string, string> = {
  e1: "An evening programme pairing the grace of Adowa with the precision of royal Kete drumming on the main stage of the National Theatre.",
  e2: "Apprentice company and senior dancers share a public bill of works developed through the year, free for the Adenta community.",
  e3: "Three Saturdays of hands-on instruction in fontomfrom, atumpan and apentema with the master drummers of the ensemble.",
  e4: "Our street dance programme takes the Independence Day stage with a fusion set built on Adowa footwork and contemporary Accra movement.",
};

const PAST_HIGHLIGHTS: { year: string; title: string; venue: string }[] = [
  {
    year: "2023",
    title: "Panafest Cultural Showcase",
    venue: "Cape Coast Castle grounds, Cape Coast",
  },
  {
    year: "2024",
    title: "Independence Day Programme",
    venue: "Black Star Square, Accra",
  },
  {
    year: "2024",
    title: "SID Festival Featured Set",
    venue: "National Theatre, Accra",
  },
];

function actionLabel(status: StatusKey): string {
  if (status === "past") return "View archive";
  if (status === "open") return "Request info";
  return "Get tickets";
}

function buildMailto(title: string): string {
  const subject = encodeURIComponent(`Nkrabea events: ${title}`);
  return `mailto:${ORG.email}?subject=${subject}`;
}

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Upcoming"
        title="Where to see us next"
        description="Heritage nights, community showcases, masterclasses and festival stages. Catch the ensemble live across Accra and beyond, or write to us about bringing a performance to your venue."
        image="/images/social/fb-reel.jpg"
        imageAlt="Nkrabea dancers and drummers performing at a community celebration"
        crumbs={[{ label: "Events" }]}
      />

      {/* EVENTS LIST */}
      <section
        aria-labelledby="events-list-heading"
        className="bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>The calendar</SectionEyebrow>
            <h2
              id="events-list-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              Upcoming performances and workshops
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Four confirmed dates across Accra and Adenta. Each booking link opens a pre-addressed email to the ensemble producer with the event title in the subject line.
            </p>
          </Reveal>

          {/* Legend bar */}
          <Reveal delay={80}>
            <div
              role="list"
              aria-label="Event status legend"
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-border bg-card px-4 py-3 text-xs sm:px-5"
            >
              <span className="font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Legend
              </span>
              {(Object.keys(STATUS_META) as StatusKey[]).map((key) => {
                const meta = STATUS_META[key];
                return (
                  <span
                    key={key}
                    role="listitem"
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${meta.dotClass}`}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-foreground">
                      {meta.label}
                    </span>
                  </span>
                );
              })}
            </div>
          </Reveal>

          {/* Events list */}
          <ul className="mt-8 space-y-4">
            {EVENTS.map((event, idx) => {
              const status = STATUS_META[event.status];
              const blurb = EVENT_BLURBS[event.id] ?? "";
              return (
                <li key={event.id}>
                  <Reveal delay={idx * 60}>
                    <article className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-start sm:gap-7 sm:p-7 lg:p-8">
                      {/* Date block */}
                      <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-foreground py-4 text-primary-foreground">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/65">
                          {event.month}
                        </span>
                        <span className="mt-1 font-display text-3xl font-semibold leading-none">
                          {event.day}
                        </span>
                        <span
                          className="mt-2 h-px w-8 bg-primary-foreground/20"
                          aria-hidden="true"
                        />
                        <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-primary-foreground/55">
                          {event.type}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${status.badgeClass}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                              aria-hidden="true"
                            />
                            {status.label}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                          {event.title}
                        </h3>

                        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary/70"
                            aria-hidden="true"
                          />
                          <span>{event.venue}</span>
                        </p>

                        {blurb && (
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {blurb}
                          </p>
                        )}
                      </div>

                      {/* Action */}
                      <div className="flex shrink-0 items-center sm:self-center">
                        <Link
                          href={buildMailto(event.title)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/70 hover:text-primary"
                          aria-label={`${actionLabel(event.status)} for ${event.title}`}
                        >
                          {actionLabel(event.status)}
                          <ArrowRight
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Dates and venues are confirmed but may shift for reasons of
            weather or production. Write to us at{" "}
            <a
              href={`mailto:${ORG.email}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {ORG.email}
            </a>{" "}
            to confirm before travelling.
          </p>
        </div>
      </section>

      {/* PAST HIGHLIGHTS */}
      <section
        aria-labelledby="past-highlights-heading"
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Archive</SectionEyebrow>
            <h2
              id="past-highlights-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
            >
              Past highlights
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A few of the stages the ensemble has carried heritage to in recent seasons.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {PAST_HIGHLIGHTS.map((item, idx) => (
              <li key={`${item.year}-${item.title}`}>
                <Reveal delay={idx * 60}>
                  <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6">
                    <span className="inline-flex w-16 shrink-0 items-center justify-center rounded-md bg-foreground px-2 py-1.5 font-display text-lg font-semibold text-primary-foreground sm:w-20">
                      {item.year}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-semibold text-foreground sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin
                          className="h-4 w-4 text-muted-foreground/70"
                          aria-hidden="true"
                        />
                        <span>{item.venue}</span>
                      </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        aria-hidden="true"
                      />
                      Past
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER TEASER */}
      <section
        aria-labelledby="newsletter-heading"
        className="bg-background py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <SectionEyebrow>Stay in the loop</SectionEyebrow>
                </div>
                <h2
                  id="newsletter-heading"
                  className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
                >
                  Get show announcements in your inbox
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  New dates, festival line-ups and ticket releases land first in
                  our newsletter. No spam, just the rhythm.
                </p>
              </div>
              <div className="flex shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Get show announcements
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want Nkrabea at your event?"
        description="Tell us about your stage, dates and audience. We scale the company to fit and every booking funds training for the next generation of Ghanaian artists."
        primaryLabel="Start a booking"
        primaryHref="/bookings"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
