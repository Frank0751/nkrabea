"use client";

import * as React from "react";
import { gsap, EASE, useReducedMotion } from "@/lib/motion";

/**
 * Scroll reveals, GSAP ScrollTrigger.
 *
 * The hidden state is applied in a layout effect rather than in CSS, so a
 * visitor whose JavaScript fails sees the content rather than an empty page.
 * Under prefers-reduced-motion nothing is ever hidden in the first place.
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type RevealProps = {
  children: React.ReactNode;
  /** Delay in milliseconds, to stagger neighbouring reveals. */
  delay?: number;
  as?: React.ElementType;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced === null || reduced) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: delay / 1000,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Staggered entrance for a group of cards.
 *
 * Children animate in sequence as the group enters the viewport, which reads
 * as one movement rather than a dozen unrelated fades.
 */
export function RevealGroup({
  children,
  className = "",
  /** Seconds between each child. */
  stagger = 0.09,
  /** CSS selector for the children to stagger. Defaults to direct children. */
  selector,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced === null || reduced) return;
    const el = ref.current;
    if (!el) return;

    const targets = selector
      ? el.querySelectorAll(selector)
      : (Array.from(el.children) as HTMLElement[]);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, selector]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
