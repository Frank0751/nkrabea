"use client";

import * as React from "react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";

/**
 * A woven kente band on the right edge, drifting at 0.16x scroll speed.
 *
 * Purely decorative, so it is aria-hidden and carries no meaning a screen
 * reader would miss. Hidden under 1024px and removed under reduced motion,
 * both in globals.css.
 */

const PARALLAX = 0.16;
/** The repeating gradient's period. Translating modulo this loops seamlessly. */
const WEAVE_PERIOD = 74;

export function KenteStrip() {
  const weaveRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced === null || reduced) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const weave = weaveRef.current;
    if (!weave) return;

    const setY = gsap.quickSetter(weave, "y", "px") as (v: number) => void;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const drift = window.scrollY * PARALLAX;
        setY(-(drift % WEAVE_PERIOD));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="kente-strip" aria-hidden="true">
      <div ref={weaveRef} className="kente-strip__weave" />
    </div>
  );
}
