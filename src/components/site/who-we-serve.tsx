import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Reveal, RevealGroup } from "./reveal";
import { PhotoFigure } from "./photo";
import { getSiteContent } from "@/lib/site-content";

/**
 * Who we serve, koombei-studio-skill Part 4 section 6: image cards, real
 * people.
 *
 * Nkrabea's brief names four audiences and asks that the site visibly serve
 * each rather than reading as one generic NGO homepage. Each card opens on
 * the photograph that audience would recognise itself in and ends in the
 * single most useful next step for that group.
 *
 * Editable on the Home page in Sanity, under Who we serve. The same list
 * appears on the Partner page.
 */
export async function WhoWeServe() {
  const { text } = await getSiteContent();
  const t = text.homePage;
  const groups = t.cards("audiences");
  if (groups.length === 0) return null;

  return (
    <section data-rhythm-node className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{t.s("audiencesEyebrow")}</SectionEyebrow>
          <h2 className="mt-5 font-display text-section text-foreground">
            {t.s("audiencesTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t.s("audiencesIntro")}
          </p>
        </Reveal>

        <RevealGroup
          className={`mt-12 grid gap-6 sm:grid-cols-2 ${groups.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
        >
          {groups.map((group, i) => (
            <article
              key={`${group.title}-${i}`}
              className="spotlight-card card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              {group.photo && (
                <PhotoFigure
                  photo={group.photo}
                  ratio="4/3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  bare
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg leading-snug text-foreground">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {group.body}
                </p>
                {group.link && group.linkLabel && (
                  <Link
                    href={group.link}
                    className="group mt-auto inline-flex items-center pb-1 pt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {group.linkLabel}
                    <ArrowRight
                      className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
