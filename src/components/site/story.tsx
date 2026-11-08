import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup } from "./reveal";
import { PhotoFigure } from "./photo";
import type { Story } from "@/lib/content";

/**
 * Stories from the work, in two sizes.
 *
 * <StoryFeature> is the summary used on the home and impact pages: the lead
 * photograph beside the headline, the date and place, the excerpt, and a link
 * to the full story. It sits on the band, so it reads as a distinct moment
 * between the light sections around it.
 *
 * <StoryArticle> is the whole story on the news page, anchored by the story's
 * id so the summaries can link straight to it.
 *
 * Captions inside the band are left off: the caption style is set for the
 * light page surface and would not clear contrast on ink.
 */

function DatePlace({ story, onBand }: { story: Story; onBand?: boolean }) {
  return (
    <p
      className={`label-mono mt-4 leading-relaxed ${
        onBand ? "text-band-foreground/75" : "text-muted-foreground"
      }`}
    >
      <time dateTime={story.isoDate}>{story.date}</time>
      <span aria-hidden="true"> / </span>
      {story.place}
    </p>
  );
}

export function StoryFeature({
  story,
  eyebrow = "Latest from the field",
}: {
  story: Story;
  eyebrow?: string;
}) {
  const lead = story.photos[0];
  return (
    <section
      data-rhythm-node
      className="relative isolate overflow-hidden bg-band py-20 text-band-foreground lg:py-24"
    >
      <div className="woven-edge absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        className="kente-field absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {lead && (
            <Reveal className="lg:col-span-6">
              <PhotoFigure
                photo={lead}
                fill
                position="50% 40%"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          )}

          <Reveal
            delay={100}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <p className="label-mono text-accent">{eyebrow}</p>
            <div className="section-mark mt-4" aria-hidden="true" />
            <h2 className="mt-5 font-display text-section">{story.title}</h2>
            <DatePlace story={story} onBand />
            <p className="mt-5 text-lede text-band-foreground/85">
              {story.excerpt}
            </p>

            {story.learnt && story.learnt.length > 0 && (
              <div className="mt-7">
                <p className="text-sm text-band-foreground/75">
                  What they learnt
                </p>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {story.learnt.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-band-foreground/25 bg-band-foreground/5 px-3.5 py-1.5 text-sm text-band-foreground/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href={`/news#${story.id}`}
              className="group mt-8 inline-flex items-center self-start py-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              Read the full story
              <ArrowRight
                className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>

      <div
        className="woven-edge woven-edge--flip absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </section>
  );
}

export function StoryArticle({ story }: { story: Story }) {
  const [lead, ...rest] = story.photos;
  return (
    <article id={story.id} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {lead && (
          <Reveal className="lg:col-span-7">
            <PhotoFigure
              photo={lead}
              ratio="3/2"
              sizes="(max-width: 1024px) 100vw, 58vw"
              caption={lead.caption}
            />
          </Reveal>
        )}

        <Reveal delay={100} className="lg:col-span-5">
          <span className="label-mono inline-block rounded-full bg-primary/10 px-2.5 py-1 text-primary">
            {story.category}
          </span>
          <h2 className="mt-5 font-display text-section text-foreground">
            {story.title}
          </h2>
          <DatePlace story={story} />

          <div className="mt-6 space-y-4">
            {story.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {story.learnt && story.learnt.length > 0 && (
            <div className="mt-7">
              <h3 className="font-display text-lg text-foreground">
                What they learnt
              </h3>
              <ul className="mt-3 space-y-2">
                {story.learnt.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span className="text-base text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {story.thanks && (
            <p className="mt-7 border-l-2 border-gold-edge pl-4 text-base leading-relaxed text-foreground/90">
              {story.thanks}
            </p>
          )}

          <p className="mt-6 text-xs text-muted-foreground">{story.source}</p>
        </Reveal>
      </div>

      {rest.length > 0 && (
        <RevealGroup
          as="ul"
          className="mt-10 grid gap-5 sm:grid-cols-3"
        >
          {rest.map((photo) => (
            <li key={photo.src}>
              <PhotoFigure
                photo={photo}
                ratio="4/3"
                position="50% 35%"
                sizes="(max-width: 640px) 100vw, 33vw"
                caption={photo.caption}
              />
            </li>
          ))}
        </RevealGroup>
      )}
    </article>
  );
}
