import { PRESS } from "@/lib/content";

export function PressMarquee() {
  const items = [...PRESS, ...PRESS];
  return (
    <section
      className="border-b border-border bg-card py-10"
      aria-label="Featured and partnered stages"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Stages, festivals and institutions we have worked with
        </p>
        <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
            {items.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex shrink-0 items-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-base font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {item.context}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
