"use client";

import { Waves, Minus } from "lucide-react";
import { useMotion } from "@/lib/motion";

/**
 * Visible animations on/off control.
 *
 * Nkrabea asked for this in the header rather than buried in a settings page:
 * for an organisation working with persons with disabilities, visible
 * accessibility is part of the brand, not a compliance checkbox.
 *
 * Pressing it records an explicit choice that overrides the operating system
 * preference in both directions, and the choice persists across visits.
 */
export function MotionToggle({ onDark = false }: { onDark?: boolean }) {
  const { reduced, setChoice, ready } = useMotion();

  // Render the control only once the real state is known, so it never shows
  // the wrong label for a frame.
  if (!ready) {
    return <span className="h-9 w-9" aria-hidden="true" />;
  }

  const label = reduced ? "Turn animations on" : "Turn animations off";

  return (
    <button
      type="button"
      onClick={() => setChoice(reduced ? "on" : "off")}
      aria-pressed={!reduced}
      // The whole label is given explicitly, and every child is hidden from
      // assistive tech, so the accessible name is one clean sentence rather
      // than the visible fragments read end to end.
      aria-label={label}
      title={label}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
        onDark
          ? "text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {reduced ? (
        <Minus className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Waves className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-hidden="true" className="hidden sm:inline">
        Animations
      </span>
      <span
        aria-hidden="true"
        className={`hidden font-mono text-[10px] uppercase tracking-wider sm:inline ${
          onDark ? "text-primary-foreground/60" : "text-muted-foreground/80"
        }`}
      >
        {reduced ? "off" : "on"}
      </span>
    </button>
  );
}
