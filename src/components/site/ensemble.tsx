import { ENSEMBLE } from "@/lib/content";
import { SectionEyebrow } from "./about";

export function Ensemble() {
  return (
    <section id="ensemble" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionEyebrow>The company</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              One ensemble, four limbs
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Nkrabea moves as a single body. The drum speaks, the dancer
              answers, the voice carries the story, and the apprentices hold
              the future. Every member trains across all four.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {ENSEMBLE.map((member) => (
                <div
                  key={member.name}
                  className="bg-card p-7 transition-colors hover:bg-secondary/40 lg:p-8"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {member.role}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
