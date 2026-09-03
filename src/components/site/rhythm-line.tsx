"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, useReducedMotion } from "@/lib/motion";
import { useMediaQuery, DESKTOP_QUERY } from "@/lib/use-media-query";

/**
 * The rhythm line.
 *
 * A thin gold line down the left edge of every page. It fills as the visitor
 * scrolls, and at each section boundary a node strikes: a short pulse outward,
 * the way a drum head moves.
 *
 * The line is a miniature of the whole document. Both the fill and the node
 * positions are expressed on one scale - normalised scroll progress, 0 to 1 -
 * so a node strikes at the exact moment the fill reaches it.
 *
 * A section is "reached" when its top crosses a reading line 45% down the
 * viewport, which is where a section header actually feels current rather
 * than when its first pixel appears.
 *
 * Hidden under 1024px and removed entirely under prefers-reduced-motion.
 * The breakpoint is read reactively rather than sampled once, so widening a
 * window past 1024px activates the line instead of leaving it dead for the
 * rest of the session.
 */

const READING_LINE = 0.45;

export function RhythmLine() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  const [nodes, setNodes] = React.useState<number[]>([]);
  const nodesRef = React.useRef<number[]>([]);
  const nodeElsRef = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    if (reduced === null || reduced) return;
    // Below the breakpoint the line is not rendered, so skip the work.
    if (!isDesktop) return;

    const root = rootRef.current;
    if (!root) return;

    // Set the custom property directly rather than through GSAP. The fill is
    // pure CSS off this one variable, so there is nothing for GSAP to tween.
    const setProgress = (value: number) =>
      root.style.setProperty("--rhythm-progress", String(value));

    /** Measure where each section sits on the 0-1 scroll scale. */
    const measure = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main [data-rhythm-node]")
      );

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      // A page shorter than the viewport has no scroll scale to map onto.
      if (scrollable <= 0) {
        nodesRef.current = [];
        setNodes([]);
        return;
      }

      const fractions = sections.map((section) => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const reachedAt = top - window.innerHeight * READING_LINE;
        return Math.min(1, Math.max(0, reachedAt / scrollable));
      });

      nodesRef.current = fractions;
      // Drop refs from a previous page or width, so paint() cannot address a
      // node element that no longer belongs to this measurement.
      nodeElsRef.current.length = fractions.length;
      setNodes(fractions);
    };

    const paint = (progress: number) => {
      setProgress(progress);

      nodesRef.current.forEach((fraction, i) => {
        const el = nodeElsRef.current[i];
        if (!el) return;
        const struck = progress >= fraction;
        // Only touch the DOM when the state actually flips, so the CSS
        // strike animation restarts once per crossing rather than per frame.
        if (el.dataset.struck !== String(struck)) {
          el.dataset.struck = String(struck);
        }
      });
    };

    measure();

    const trigger = ScrollTrigger.create({
      // Anchored to the document itself, so progress runs 0 to 1 across the
      // whole page rather than relative to any one section.
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => paint(self.progress),
      // `self` rather than the outer `trigger`, which is still in its temporal
      // dead zone the first time ScrollTrigger fires this during creation.
      onRefresh: (self) => {
        measure();
        paint(self.progress);
      },
    });

    // Paint once on mount for a visitor who lands mid-page on a restored scroll.
    paint(trigger.progress);

    // Late-loading images change the document height, which moves every node.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      trigger.kill();
    };
  }, [reduced, pathname, isDesktop]);

  // Nothing to render for a visitor who has asked for reduced motion, or on a
  // viewport too narrow to carry the line. Returning null unmounts the nodes,
  // and widening the window re-runs the effect above, which measures afresh.
  if (reduced || !isDesktop) return null;

  return (
    <div
      ref={rootRef}
      className="rhythm-line"
      aria-hidden="true"
      style={{ ["--rhythm-progress" as string]: 0 }}
    >
      <span className="rhythm-line__track" />
      <span className="rhythm-line__fill" />
      {nodes.map((fraction, i) => (
        <span
          key={i}
          ref={(el) => {
            nodeElsRef.current[i] = el;
          }}
          className="rhythm-node"
          data-struck="false"
          style={{ top: `${fraction * 100}%` }}
        />
      ))}
    </div>
  );
}
