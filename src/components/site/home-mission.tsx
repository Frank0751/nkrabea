import Image from "next/image";
import { ORG, STATS } from "@/lib/content";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

export function HomeMission() {
  return (
    <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/social/fb-cover.jpg"
                  alt="Nkrabea mission: impacting lives through culture and the arts"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-6 bg-primary/40" />
                Our mission
              </span>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {ORG.tagline}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {ORG.mission} Based in Adenta, Accra, our work spans
                performance, education and community development. Every
                booking, workshop and partnership funds the training of young
                artists.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
              {STATS.map((s) => {
                const match = s.value.match(/^(\d+)(.*)$/);
                const numeric = match ? parseInt(match[1], 10) : null;
                const suffix = match ? match[2] : "";
                return (
                  <div
                    key={s.label}
                    className="bg-card p-5 text-center transition-colors hover:bg-secondary/40"
                  >
                    <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                      {numeric !== null ? (
                        <CountUp value={numeric} suffix={suffix} />
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
