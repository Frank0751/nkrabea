import { MILESTONES } from "@/lib/content";
import { SectionEyebrow } from "./about";

export function Timeline() {
  return (
    <section className="bg-foreground py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent/40" />
            Three decades
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            From an Accra rehearsal room to international stages
          </h2>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <li
              key={m.year}
              className="group relative flex flex-col bg-foreground p-7"
            >
              <span className="font-display text-4xl font-semibold text-accent">
                {m.year}
              </span>
              <span className="mt-4 text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                Chapter {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                {m.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
