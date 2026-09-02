"use client";

import * as React from "react";
import { gsap, useReducedMotion } from "@/lib/motion";

/**
 * Count-up on the impact statistics, driven by GSAP ScrollTrigger.
 *
 * Renders the final value in the server HTML, so the real number is what
 * search engines and screen readers get, and what anyone with reduced motion
 * or failed JavaScript sees. The animation only ever counts up to a number
 * that is already on the page.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.7,
  className,
}: {
  value: number;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced === null || reduced) return;
    const el = ref.current;
    if (!el) return;

    const counter = { n: 0 };
    const format = (n: number) => `${Math.round(n).toLocaleString()}${suffix}`;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          // Start from zero only once we know it will actually animate,
          // so the real value is never blanked out for a visitor who
          // never scrolls this far.
          onEnter: () => {
            el.textContent = format(0);
          },
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
