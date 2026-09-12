/**
 * The layers that turn a photograph into a hero background that can carry
 * cream text anywhere on it.
 *
 * Bottom to top:
 *   the photograph (passed in, so the homepage can use the reel)
 *   .hero-wash   ink at 35% in multiply, which tints the picture towards
 *                the band without flattening it
 *   .hero-veil   a gradient that is heaviest at the foot, where the text and
 *                the scroll cue sit, and lightest at the top, where the
 *                picture is allowed to breathe
 *   .hero-well   a soft radial pool of ink behind the centred column
 *   .kente-field the loom grid at half strength, so the pattern runs through
 *                the picture and the band alike: this is what makes the
 *                photograph read as part of the design rather than placed on it
 *   grain
 *
 * Measured against a pure white photograph, the worst case, the stack leaves
 * cream text at 6.7:1 in the centre of the well and 5.2:1 at its edge, so
 * every hero clears AA whatever the picture behind it happens to be.
 *
 * The photograph's own container is not aria-hidden: its alt text is real
 * and should be read. Only the overlays are hidden.
 */
export function HeroBackdrop({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children && <div className="absolute inset-0 -z-10">{children}</div>}
      <div className="hero-wash absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-veil absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-well absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className={`kente-field absolute inset-0 -z-10 ${children ? "opacity-50" : "opacity-80"}`}
        aria-hidden="true"
      />
      <div
        className="grain-overlay absolute inset-0 -z-10 opacity-50"
        aria-hidden="true"
      />
    </>
  );
}
