"use client";

import * as React from "react";

const neverChanges = () => () => {};

/**
 * False during server rendering and the first client render, true afterwards.
 *
 * Uses useSyncExternalStore rather than setState in an effect, so it does not
 * trigger a cascading render and the server and client snapshots are explicit.
 * Use it to hold off on anything that depends on browser-only state until
 * hydration has settled.
 */
export function useHydrated(): boolean {
  return React.useSyncExternalStore(
    neverChanges,
    () => true,
    () => false
  );
}
