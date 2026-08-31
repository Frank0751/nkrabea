"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Music,
  X,
} from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/about";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Button } from "@/components/ui/button";

const INSTRUMENTS = Array.from(
  new Set(PROGRAMS.flatMap((p) => p.instruments))
).sort();

export default function ProgramsPage() {
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
    } else if (window.location.hash.startsWith("#program-")) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return (
    <>
      <PageHero
        eyebrow="What we perform"
        title="Forms we carry forward"
        description="Each programme is rooted in a living tradition. Adowa, Kete, court drumming and the street forms of contemporary Accra are taught the way they were taught to us, and performed so the next generation can carry them further."
        image="/images/program-kete.png"
        imageAlt="Nkrabea performers presenting a traditional Ghanaian dance form"
        crumbs={[{ label: "Programs" }]}
      />

      {/* Program feature cards */}
      <section
        aria-labelledby="programs-heading"
        className="bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>The repertoire</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="programs-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Four forms, one tradition
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From the courts of the Asantehene to the streets of Adenta,
                each form carries its own language, rhythm and meaning.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 space-y-10 lg:space-y-16">
            {PROGRAMS.map((program, index) => {
              const reverse = index % 2 === 1;
              return (
                <Reveal key={program.id}>
                  <article
                    id={`program-${program.id}`}
                    className={`scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card ${
                      reverse
                        ? "flex flex-col lg:flex-row-reverse"
                        : "flex flex-col lg:flex-row"
                    }`}
                  >
                    {/* Image side */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:w-1/2">
                      <Image
                        src={program.image}
                        alt={program.summary}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
                    </div>

                    {/* Text side */}
                    <div className="flex flex-col justify-center p-6 lg:w-1/2 lg:p-10">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
                          {program.origin}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          Form {String(index + 1).padStart(2, "0")} /{" "}
                          {String(PROGRAMS.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {program.name}
                      </h3>

                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {program.summary}
                      </p>

                      <p className="mt-4 text-base leading-relaxed text-foreground/90">
                        {program.meaning}
                      </p>

                      <div className="mt-7 flex flex-wrap items-center gap-2">
                        {program.instruments.map((instrument) => (
                          <span
                            key={instrument}
                            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                          >
                            {instrument}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => openProgram(program)}
                          aria-label={`Read the cultural context for ${program.name}`}
                          className="group"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read the cultural context
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instruments reference */}
      <section
        aria-labelledby="instruments-heading"
        className="border-y border-border bg-secondary/40 py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>Instruments reference</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="instruments-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                The drums and voices we play
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Across the repertoire, these are the instruments that speak
                before the dancer moves. Each carries its own tone, language
                and role in the ensemble.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ul
              className="mt-10 flex flex-wrap gap-2.5"
              aria-label="All instruments used across Nkrabea programs"
            >
              {INSTRUMENTS.map((instrument) => (
                <li
                  key={instrument}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border"
                >
                  {instrument}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Bring a form to your stage"
        description="Book Adowa, Kete, the drumming ensemble or the street dance programme for your festival, theatre, school or state function. Every booking funds the training of the next generation."
        primaryLabel="Start a booking"
        primaryHref="/bookings"
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />

      <ProgramModal program={active} onClose={() => openProgram(null)} />
    </>
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
      className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
      onClick={onClose}
    >
      <div
        className="scroll-elegant relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl"
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
