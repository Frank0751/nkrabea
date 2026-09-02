import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { EVENTS, STORIES, PRESS } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Updates, upcoming showcases and press mentions from Nkrabea Culture and Arts Ensemble.",
};

export default function NewsPage() {
  const hasContent =
    EVENTS.length > 0 || STORIES.length > 0 || PRESS.length > 0;

  return (
    <>
      <PageHero
        eyebrow="News and events"
        title="What is coming up"
        description="Showcases, programme milestones and press."
        crumbs={[{ label: "News" }]}
      />

      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {EVENTS.length > 0 ? (
            <>
              <Reveal className="max-w-2xl">
                <SectionEyebrow>Upcoming</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Where to see us next
                </h2>
              </Reveal>
              <ul className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {EVENTS.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                  >
                    <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-band py-3 text-band-foreground">
                      <span className="label-mono text-band-foreground/60">
                        {event.month}
                      </span>
                      <span className="font-display text-2xl font-semibold leading-none">
                        {event.day}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.venue}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /* Honest empty state. Better than a calendar of events that have
               already happened, which is what the prototype was showing. */
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <CalendarDays
                  className="mx-auto h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  No dates announced yet
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We publish showcases and programme events here once venues and
                  dates are confirmed. Sign up and we will tell you first.
                </p>
                <div className="mx-auto mt-8 max-w-md text-left">
                  <NewsletterForm compact />
                </div>
                <p className="mt-8 text-sm text-muted-foreground">
                  Planning something with us?{" "}
                  <Link
                    href="/partner"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Get in touch
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          )}

          {!hasContent && (
            <Reveal delay={140}>
              <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
                Press mentions and partner logos will appear here once each
                relationship is evidenced.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
