/**
 * Scroll indicator for the bottom of a full-height hero.
 *
 * With every hero now filling the viewport, nothing below it is visible on
 * load. This is the affordance that says the page continues, which matters
 * most on a phone where the hero is the entire first screen.
 *
 * Decorative, so it is hidden from assistive technology: a screen reader
 * already knows the document continues. The wheel animation is CSS only and
 * is switched off by the reduced-motion guards in globals.css, leaving the
 * shape in place.
 */
export function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
    >
      <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-band-foreground/35 pt-2">
        <span className="animate-scroll-cue h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
    </div>
  );
}
