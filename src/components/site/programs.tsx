"use client";

import * as React from "react";
import Image from "next/image";
import { Check, X, ArrowRight, Music, Clock, CalendarDays } from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/content";
import { SectionEyebrow } from "./about";
import { Reveal } from "./reveal";

export function Programs() {
  const [active, setActive] = React.useState<Program | null>(null);

  // Deep-link support: #program-adowa opens the Adowa modal
  React.useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#program-")) {
        const id = hash.replace("#program-", "");
        const match = PROGRAMS.find((p) => p.id === id);
        if (match) setActive(match);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const openProgram = React.useCallback((program: Program | null) => {
    setActive(program);
    if (program) {
      window.history.replaceState(null, "", `#program-${program.id}`);
    } else {
      // Clean the hash on close if it was a program deep link
      if (window.location.hash.startsWith("#program-")) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, []);

  return (
    <section
      id="programs"
      className="scroll-mt-20 border-y border-border bg-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionEyebrow>What we perform</SectionEyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Forms we carry forward
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every program is rooted in a living tradition. We perform it the
              way it was taught to us, and teach it so the next generation can
              carry it further.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROGRAMS.map((program) => (
            <article
              key={program.id}
              id={`program-${program.id}`}
              className="group scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => openProgram(program)}
                className="block w-full text-left"
                aria-label={`Read more about ${program.name}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.summary}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4 text-primary-foreground">
                    <h3 className="font-display text-2xl font-semibold">
                      {program.name}
                    </h3>
                    <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider backdrop-blur-sm">
                      {program.origin}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {program.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {program.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore the form
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <ProgramModal program={active} onClose={() => openProgram(null)} />
    </section>
  );
}

function ProgramModal({
  program,
  onClose,
}: {
  program: Program | null;
  onClose: () => void;
}) {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    if (program) {
      setRender(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [program]);

  React.useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [render, onClose]);

  if (!render || !program) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/70 backdrop-blur-sm p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl scroll-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-t-2xl">
          <Image
            src={program.image}
            alt={program.summary}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-foreground/45 to-foreground/30" />
          <div className="absolute bottom-5 left-6 right-6">
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
              {program.origin}
            </span>
            <h3
              id="program-modal-title"
              className="mt-3 font-display text-3xl font-semibold text-primary-foreground drop-shadow-sm sm:text-4xl"
            >
              {program.name}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            {program.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            {program.meaning}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ModalStat
              icon={<Music className="h-4 w-4" />}
              label="Instruments"
              value={program.instruments.join(", ")}
            />
            <ModalStat
              icon={<Clock className="h-4 w-4" />}
              label="Rhythm"
              value={program.rhythm}
            />
            <ModalStat
              icon={<CalendarDays className="h-4 w-4" />}
              label="Performed at"
              value={program.when}
            />
          </div>

          <div className="mt-7 rounded-xl border border-border bg-secondary/40 p-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              What you will see
            </h4>
            <ul className="mt-3 space-y-2.5">
              {program.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm leading-snug text-foreground/90">{value}</p>
    </div>
  );
}
