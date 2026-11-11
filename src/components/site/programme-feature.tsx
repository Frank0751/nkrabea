import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { PhotoFigure } from "./photo";
import { FlyerCard } from "./flyer-card";
import { VideoEmbed } from "./video-embed";
import type { Programme } from "@/lib/content";

const STATUS: Record<Programme["status"], { label: string; className: string }> = {
  running: { label: "Running", className: "bg-primary/10 text-primary" },
  fundraising: { label: "Raising funds", className: "bg-accent/20 text-gold-ink" },
  vision: { label: "Long-term vision", className: "bg-muted text-muted-foreground" },
};

/**
 * One programme on the Our Work page. Every part is optional in Sanity and
 * the layout holds whatever is filled in: with photos it is a two-column
 * spread that alternates sides down the page; without, the text takes the
 * full width. Flyer, video and button appear only when given.
 */
export function ProgrammeFeature({
  programme,
  index,
}: {
  programme: Programme;
  index: number;
}) {
  const status = STATUS[programme.status];
  const [lead, ...more] = programme.photos ?? [];
  const flip = index % 2 === 1;
  const external = programme.link ? /^https?:\/\//.test(programme.link) : false;

  return (
    <article id={programme.id} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {lead && (
          <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
            <PhotoFigure
              photo={lead}
              ratio="4/3"
              sizes="(max-width: 1024px) 100vw, 50vw"
              caption={lead.caption}
            />
            {more.length > 0 && (
              <ul className="mt-4 grid grid-cols-3 gap-3">
                {more.slice(0, 3).map((photo) => (
                  <li key={photo.src}>
                    <PhotoFigure photo={photo} ratio="1/1" sizes="(max-width: 1024px) 33vw, 16vw" />
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        )}

        <Reveal delay={90} className={lead ? "lg:col-span-6" : "lg:col-span-9"}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`label-mono inline-block rounded-full px-2.5 py-1 ${status.className}`}>
              {status.label}
            </span>
          </div>
          <h2 className="mt-5 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl">
            {programme.name}
          </h2>
          {programme.value && (
            <p className="mt-3 text-sm text-muted-foreground">
              Programme value{" "}
              <span className="font-semibold text-emphasis">{programme.value}</span>
            </p>
          )}
          <p className="mt-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {programme.summary}
          </p>

          {programme.details.length > 0 && (
            <ul className="mt-7 space-y-3.5">
              {programme.details.map((detail, i) => (
                <li key={i} className="flex gap-4 border-b border-border pb-3.5 last:border-0">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {programme.sdgs && programme.sdgs.length > 0 && (
            <p className="mt-6 text-sm text-muted-foreground">
              Aligns with UN Sustainable Development Goals {programme.sdgs.join(", ")}.
            </p>
          )}

          {programme.link && programme.linkLabel && (
            <Link
              href={programme.link}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group mt-7 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {programme.linkLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </Link>
          )}
        </Reveal>
      </div>

      {(programme.videoUrl || programme.flyer) && (
        <Reveal
          delay={120}
          className={`mt-10 grid items-start gap-8 ${programme.videoUrl && programme.flyer ? "lg:grid-cols-[1fr_auto]" : ""}`}
        >
          {programme.videoUrl && (
            <VideoEmbed url={programme.videoUrl} title={`Video: ${programme.name}`} className="max-w-4xl" />
          )}
          {programme.flyer && <FlyerCard flyer={programme.flyer} />}
        </Reveal>
      )}
    </article>
  );
}
