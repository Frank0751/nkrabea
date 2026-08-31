import { TESTIMONIALS } from "@/lib/content";
import { SectionEyebrow } from "./about";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionEyebrow>Word of mouth</SectionEyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              What partners and audiences tell us
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const initials = t.author
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return (
              <Reveal key={i} delay={i * 100}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg
                        key={s}
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5 fill-accent"
                      >
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {t.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
