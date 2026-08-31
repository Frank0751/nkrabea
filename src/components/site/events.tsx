import Link from "next/link";
import { EVENTS } from "@/lib/content";
import { SectionEyebrow } from "./about";

const STATUS_LABELS: Record<string, { text: string; className: string }> = {
  upcoming: {
    text: "Scheduled",
    className: "bg-primary/10 text-primary",
  },
  open: {
    text: "Open booking",
    className: "bg-accent/15 text-accent-foreground",
  },
  past: {
    text: "Past",
    className: "bg-muted text-muted-foreground",
  },
};

export function Events() {
  return (
    <section
      id="events"
      className="scroll-mt-20 border-y border-border bg-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Upcoming</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Where to see us next
            </h2>
          </div>
          <Link
            href="#contact"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Request the full calendar
          </Link>
        </div>

        <ul className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {EVENTS.map((event) => {
            const status = STATUS_LABELS[event.status];
            return (
              <li
                key={event.id}
                className="flex flex-col gap-4 p-5 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
              >
                <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-foreground py-3 text-primary-foreground">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-primary-foreground/60">
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

                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${status.className}`}
                  >
                    {event.type}
                  </span>
                  <span className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground sm:inline">
                    {status.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
