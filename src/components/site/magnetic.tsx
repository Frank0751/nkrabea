"use client";

import * as React from "react";
import { gsap, useReducedMotion } from "@/lib/motion";

/**
 * Magnetic call-to-action.
 *
 * The wrapped element leans toward the cursor while it is nearby, then springs
 * back. A pointer-only enhancement: it is skipped on touch, skipped under
 * reduced motion, and never affects keyboard focus or activation, so the
 * button works identically without it.
 */
export function Magnetic({
  children,
  /** How far the element may travel, in pixels. */
  strength = 8,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced === null || reduced) return;

    // Fine pointer only. On touch this would fire on tap and feel broken.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    const move = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      // Normalise against the element's own size so large and small buttons
      // travel the same distance rather than in proportion to their width.
      move((dx / (rect.width / 2)) * strength);
      moveY((dy / (rect.height / 2)) * strength);
    };

    const onLeave = () => {
      move(0);
      moveY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [reduced, strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
