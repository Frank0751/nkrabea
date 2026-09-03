"use client";

import * as React from "react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";
import { useMediaQuery, DESKTOP_QUERY } from "@/lib/use-media-query";

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
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  React.useEffect(() => {
    if (reduced === null || reduced) return;
    if (!isDesktop) return;

    const weave = weaveRef.current;
    if (!weave) return;

    const setY = gsap.quickSetter(weave, "y", "px") as (v: number) => void;

    const trigger = ScrollTrigger.create({
      // Anchored to the document, matching the rhythm line. A trigger-less
      // ScrollTrigger does not reliably report progress across the page.
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => {
        const drift = window.scrollY * PARALLAX;
        setY(-(drift % WEAVE_PERIOD));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reduced, isDesktop]);

  if (reduced || !isDesktop) return null;

  return (
    <div className="kente-strip" aria-hidden="true">
      <div ref={weaveRef} className="kente-strip__weave" />
    </div>
  );
}
