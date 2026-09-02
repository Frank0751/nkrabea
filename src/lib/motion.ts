"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";

/**
 * Motion control for the whole site.
 *
 * Nkrabea's brief asks for two things, and this module provides both:
 *
 *   1. Respect for the browser's prefers-reduced-motion setting.
 *   2. A visible on/off toggle in the header, because the organisation works
 *      with persons with disabilities and wants its accessibility to be seen
 *      rather than merely implemented.
 *
 * Resolution order: an explicit choice by the visitor always wins. With no
 * explicit choice, the operating system preference decides. The result is
 * mirrored onto <html data-motion="off"> so CSS can switch off animations
 * that GSAP never touches.
 *
 * The provider itself lives in components/site/motion-provider.tsx, since
 * this file holds no JSX.
 */

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** The studio easing curve, used for every entrance in the system. */
export const EASE = "power3.out";

export const MOTION_STORAGE_KEY = "nkrabea:motion";

export type MotionChoice = "on" | "off" | null;

export type MotionState = {
  /** True when animation should not run, for any reason. */
  reduced: boolean;
  /** The operating system preference, independent of any explicit choice. */
  systemReduced: boolean;
  /** The visitor's explicit choice, or null if they have not made one. */
  choice: MotionChoice;
  /** Set or clear the explicit choice. */
  setChoice: (choice: MotionChoice) => void;
  /** True once mounted, so components can avoid animating during hydration. */
  ready: boolean;
};

export const MotionContext = React.createContext<MotionState | null>(null);

export function useMotion(): MotionState {
  const ctx = React.useContext(MotionContext);
  if (ctx) return ctx;
  // A sensible default if a component renders outside the provider: assume
  // motion is off, so nothing is ever left mid-animation or invisible.
  return {
    reduced: true,
    systemReduced: true,
    choice: null,
    setChoice: () => {},
    ready: false,
  };
}

/**
 * True when animation should be suppressed. Returns `null` until mounted, so
 * callers can hold off rather than committing to the wrong branch on the
 * server or during hydration.
 */
export function useReducedMotion(): boolean | null {
  const { reduced, ready } = useMotion();
  return ready ? reduced : null;
}
