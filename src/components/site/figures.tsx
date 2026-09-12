import { Reveal } from "./reveal";

/**
 * Data visuals for the programme figures.
 *
 * Every one of these sits on the band, and that is not a style choice. The
 * chart marks were validated with the data-viz palette checker against the
 * forest ink surface: on the sand plane, brand gold is 1.87:1 and the badge
 * green falls under the chroma floor, so both fail. On ink, all three marks
 * pass the lightness band, the chroma floor, CVD separation, the
 * normal-vision floor and 3:1 contrast. Hence <DataBand>, which carries the
 * surface the palette was proved against.
 *
 * Two honesty rules run through this file:
 *
 * 1. Nothing is drawn that Nkrabea has not published. The soap programme runs
 *    across four regions and no per-region split exists, so the regions are
 *    named, not charted. Inventing four bars of 125 would be fabrication in
 *    the most persuasive form the site has.
 * 2. Every number here is a programme target. The caption says so, every
 *    time, because a target drawn as a bar reads as an achievement.
 *
 * Each mark carries a permanent direct label, so identity and value are never
 * colour alone, and the whole thing is a definition list underneath: a screen
 * reader gets name and value in pairs without a chart library.
 */

export function DataBand({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      data-rhythm-node
      className="relative isolate overflow-hidden bg-band py-20 text-band-foreground lg:py-24"
    >
      <div className="woven-edge absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        className="kente-field absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="label-mono text-accent">{eyebrow}</p>
          <div className="section-mark mt-4" aria-hidden="true" />
          <h2 className="mt-5 font-display text-section">{title}</h2>
          {lede && (
            <p className="mt-5 text-lede text-band-foreground/80">{lede}</p>
          )}
        </Reveal>

        <div className="mt-14">{children}</div>
      </div>

      <div
        className="woven-edge woven-edge--flip absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </section>
  );
}

/**
 * Two parts of a whole, on one bar. Used for the Cape Coast intake, which
 * splits evenly between the two art forms.
 *
 * A 2px gap between the fills rather than a hairline border, so the segments
 * read as separate marks at any size, and 4px rounded outer ends only.
 */
export function SplitBar({
  total,
  totalLabel,
  parts,
  caption,
}: {
  total: number;
  totalLabel: string;
  parts: { name: string; value: number; token: string }[];
  caption: string;
}) {
  return (
    <figure className="m-0">
      <p className="font-display text-5xl leading-none text-accent">{total}</p>
      <p className="mt-2 text-sm text-band-foreground/75">{totalLabel}</p>

      <div className="mt-7 flex h-11 w-full gap-[2px]" aria-hidden="true">
        {parts.map((part, i) => (
          <div
            key={part.name}
            title={`${part.name}: ${part.value}`}
            style={{
              width: `${(part.value / total) * 100}%`,
              background: `var(${part.token})`,
            }}
            className={`h-full ${i === 0 ? "rounded-l" : ""} ${
              i === parts.length - 1 ? "rounded-r" : ""
            }`}
          />
        ))}
      </div>

      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
        {parts.map((part) => (
          <div key={part.name} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-3 w-3 shrink-0 rounded-sm"
              style={{ background: `var(${part.token})` }}
              aria-hidden="true"
            />
            <div className="flex flex-col-reverse">
              <dt className="text-sm leading-snug text-band-foreground/75">
                {part.name}
              </dt>
              <dd className="font-display text-2xl leading-none">
                {part.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <figcaption className="mt-6 text-xs leading-relaxed text-band-foreground/55">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * One measure at several stages, sharing a scale. One hue, because these are
 * stages of a single programme rather than four competing categories: colour
 * would be decoration, and length already carries the comparison.
 */
export function StageBars({
  stages,
  caption,
}: {
  stages: { name: string; value: number }[];
  caption: string;
}) {
  const max = Math.max(...stages.map((s) => s.value));

  return (
    <figure className="m-0">
      <dl className="space-y-7">
        {stages.map((stage) => (
          <div key={stage.name}>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="text-sm leading-snug text-band-foreground/80">
                {stage.name}
              </dt>
              <dd className="font-display text-2xl leading-none text-accent">
                {stage.value}
              </dd>
            </div>
            <div className="mt-3 h-2.5 w-full rounded bg-band-foreground/10">
              <div
                className="h-full rounded"
                style={{
                  width: `${(stage.value / max) * 100}%`,
                  background: "var(--chart-1)",
                }}
                title={`${stage.name}: ${stage.value}`}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </dl>
      <figcaption className="mt-7 text-xs leading-relaxed text-band-foreground/55">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Named places, not a chart. The soap programme covers four regions and
 * Nkrabea has published no per-region split, so this names them and says so.
 */
export function RegionChips({
  regions,
  note,
}: {
  regions: readonly string[];
  note: string;
}) {
  return (
    <figure className="m-0">
      <ul className="flex flex-wrap gap-2.5">
        {regions.map((region) => (
          <li
            key={region}
            className="rounded-full border border-band-foreground/25 bg-band-foreground/5 px-3.5 py-1.5 text-sm text-band-foreground/90"
          >
            {region}
          </li>
        ))}
      </ul>
      <figcaption className="mt-5 text-xs leading-relaxed text-band-foreground/55">
        {note}
      </figcaption>
    </figure>
  );
}

/** A single figure, given room. koombei-studio-skill Part 7's stat treatment. */
export function StatTile({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-band-foreground/15 bg-band-foreground/5 p-6">
      <p className="font-display text-3xl leading-none text-band-foreground">
        {value}
      </p>
      <p className="mt-3 text-sm leading-snug text-band-foreground/80">
        {label}
      </p>
      {note && (
        <p className="mt-3 text-xs leading-relaxed text-band-foreground/55">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * A sequence explained as a sequence. The connecting rule is drawn with a
 * border rather than an animation, so it is complete before any script runs.
 */
export function ProcessSteps({
  steps,
  caption,
}: {
  steps: { title: string; body: string }[];
  caption?: string;
}) {
  return (
    <figure className="m-0">
      <ol className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="flex items-center gap-3">
              <span
                className="label-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-edge text-gold-ink"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span
                className="h-px flex-1 bg-gold-edge/40"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-5 font-display text-lg leading-snug text-foreground">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
