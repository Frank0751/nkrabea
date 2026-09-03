import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Programme } from "@/lib/content";

const STATUS: Record<Programme["status"], { label: string; className: string }> =
  {
    running: {
      label: "Running",
      className: "bg-primary/10 text-primary",
    },
    fundraising: {
      label: "Raising funds",
      className: "bg-accent/20 text-gold-ink",
    },
    vision: {
      label: "Long-term vision",
      className: "bg-muted text-muted-foreground",
    },
  };

export function ProgrammeCard({
  programme,
  href,
}: {
  programme: Programme;
  href?: string;
}) {
  const status = STATUS[programme.status];

  return (
    <article className="spotlight-card flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span
          className={`label-mono rounded-full px-2.5 py-1 ${status.className}`}
        >
          {status.label}
        </span>
        {programme.value && (
          <span className="text-xs text-muted-foreground">
            {programme.value}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg leading-snug text-foreground">
        {programme.name}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {programme.summary}
      </p>

      {programme.sdgs && programme.sdgs.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          Aligns with UN Sustainable Development Goals{" "}
          {programme.sdgs.join(", ")}.
        </p>
      )}

      {href && (
        <Link
          href={href}
          className="group mt-auto inline-flex items-center pt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Read more
          <ArrowRight
            className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only"> about {programme.name}</span>
        </Link>
      )}
    </article>
  );
}
