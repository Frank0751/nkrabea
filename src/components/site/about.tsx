import Image from "next/image";
import { ORG, ABOUT, STATS } from "@/lib/content";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionEyebrow>Who we are</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {ABOUT.lead}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {ABOUT.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Founded
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {ORG.foundedYear}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Structure
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {ORG.type}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="/images/about-drummers.png"
                  alt="Ghanaian drummers playing traditional drums in a circle"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:gap-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/program-kete.png"
                    alt="Kete royal court dancers and drummers in regalia"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/images/gallery-drums.png"
                    alt="Drummer hands on a fontomfrom drum head at sunset"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {STATS.map((s) => {
            const match = s.value.match(/^(\d+)(.*)$/);
            const numeric = match ? parseInt(match[1], 10) : null;
            const suffix = match ? match[2] : "";
            return (
              <div
                key={s.label}
                className="bg-card p-6 text-center transition-colors hover:bg-secondary/40"
              >
                <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  {numeric !== null ? (
                    <CountUp value={numeric} suffix={suffix} />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      <span className="h-px w-6 bg-primary/40" />
      {children}
    </span>
  );
}
