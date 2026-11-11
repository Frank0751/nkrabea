import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { FlyerCard } from "./flyer-card";
import type { EventItem } from "@/lib/content";

/**
 * One event. The date block, title and venue are always there; time,
 * description, a button and the flyer appear only when Sanity has them, and
 * the card keeps its shape either way. Past events render quieter.
 */
export function EventCard({ event, past = false }: { event: EventItem; past?: boolean }) {
  const external = event.link ? /^https?:\/\//.test(event.link) : false;
  return (
    <li
      className={`flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:gap-6 sm:p-6 ${
        past ? "opacity-80" : ""
      }`}
    >
      <div
        className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl ${
          past ? "bg-muted text-foreground" : "bg-band text-band-foreground"
        }`}
      >
        <span className={`label-mono ${past ? "text-muted-foreground" : "text-band-foreground/70"}`}>
          {event.month}
        </span>
        <span className="font-display text-3xl leading-none">{event.day}</span>
      </div>

      <div className="min-w-0 flex-1">
        {event.type && (
          <span className="label-mono inline-block rounded-full bg-primary/10 px-2.5 py-1 text-primary">
            {event.type}
          </span>
        )}
        <h3 className="mt-3 font-display text-lg leading-snug text-foreground sm:text-xl">{event.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <span>
            <time dateTime={event.isoDate}>{event.date}</time>
          </span>
          {event.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {event.time}
            </span>
          )}
          {event.venue && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {event.venue}
            </span>
          )}
        </p>
        {event.description && (
          <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-foreground/85">
            {event.description}
          </p>
        )}
        {!past && event.link && event.linkLabel && (
          <Link
            href={event.link}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group mt-5 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {event.linkLabel}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </Link>
        )}
      </div>

      {event.flyer && (
        <div className="shrink-0">
          <FlyerCard flyer={event.flyer} compact />
        </div>
      )}
    </li>
  );
}
