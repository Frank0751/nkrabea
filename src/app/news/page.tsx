import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PhotoStrip } from "@/components/site/photo";
import { StoryArticle } from "@/components/site/story";
import { EventCard } from "@/components/site/event-card";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/news" },
  title: "News & Events",
  description:
    "Updates, upcoming showcases and press mentions from Nkrabea Culture and Arts Ensemble.",
};

/**
 * The News page has a fixed order of sections: stories, upcoming events,
 * past events, a photo strip and press. Editors change what goes in each
 * (in Sanity: News stories, Events, Press, and the News page for headings),
 * never the order or layout, so an edit cannot rearrange the page.
 */
export default async function NewsPage() {
  const c = await getSiteContent();
  const t = c.text.newsPage;

  // Ghana keeps GMT all year, so the date in UTC is the date in Accra. The
  // page refreshes every minute, so an event moves to Past the day after.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = c.events.filter((e) => !e.isoDate || e.isoDate >= today);
  const past = c.events
    .filter((e) => e.isoDate && e.isoDate < today)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate))
    .slice(0, 6);
  const stripPhotos = t.photos("stripPhotos");

  return (
    <>
      <PageHero {...c.heroes.news} crumbs={[{ label: "News" }]} />

      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stories */}
          {c.stories.length > 0 && (
            <div className="mb-24 space-y-24">
              <Reveal className="max-w-2xl">
                <SectionEyebrow>{t.s("storiesEyebrow")}</SectionEyebrow>
              </Reveal>
              {c.stories.map((story) => (
                <StoryArticle
                  key={story.id}
                  story={story}
                  learntLabel={t.s("learntLabel")}
                  pressLabel={t.s("pressPanelLabel")}
                />
              ))}
            </div>
          )}

          {/* Upcoming events */}
          <div id="events" className="scroll-mt-24">
            {upcoming.length > 0 ? (
              <>
                <Reveal className="max-w-2xl">
                  <SectionEyebrow>{t.s("eventsEyebrow")}</SectionEyebrow>
                  <h2 className="mt-5 font-display text-section text-foreground">{t.s("eventsTitle")}</h2>
                </Reveal>
                <ul className="mt-12 space-y-5">
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </ul>
              </>
            ) : (
              <Reveal>
                <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                  <CalendarDays className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  <h2 className="mt-6 font-display text-2xl leading-tight tracking-tight text-foreground">
                    {t.s("noEventsTitle")}
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t.s("noEventsBody")}
                  </p>
                  <div className="mx-auto mt-8 max-w-md text-left">
                    <NewsletterForm compact />
                  </div>
                  <p className="mt-8 text-sm text-muted-foreground">
                    {t.s("noEventsLinkIntro")}{" "}
                    <Link href="/partner" className="font-semibold text-primary underline-offset-4 hover:underline">
                      {t.s("noEventsLinkLabel")}
                    </Link>
                  </p>
                </div>
              </Reveal>
            )}

            {past.length > 0 && (
              <Reveal className="mt-16">
                <h2 className="font-display text-sub text-foreground">{t.s("pastEventsTitle")}</h2>
                <ul className="mt-8 space-y-4">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} past />
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* Photo strip */}
          {t.on("showStrip") && stripPhotos.length > 0 && (
            <Reveal delay={100} className="mt-20">
              <PhotoStrip label={t.s("stripLabel")} photos={stripPhotos} note={t.s("stripNote")} />
            </Reveal>
          )}

          {/* Press */}
          {c.press.length > 0 ? (
            <Reveal delay={140} className="mt-20">
              <SectionEyebrow>{t.s("pressEyebrow")}</SectionEyebrow>
              <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {c.press.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-6 sm:p-6"
                  >
                    <span className="font-display text-lg text-foreground sm:w-40 sm:shrink-0">{item.name}</span>
                    <span className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.context}
                      {item.date ? `, ${item.date}` : ""}.
                    </span>
                    {item.href && (
                      <Link
                        href={item.href}
                        {...(/^https?:\/\//.test(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        {t.s("pressLinkLabel")}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal delay={140}>
              <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
                {t.s("noPressNote")}
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
