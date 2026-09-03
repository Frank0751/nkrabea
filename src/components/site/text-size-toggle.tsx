"use client";

import * as React from "react";
import { Type } from "lucide-react";
import { useTextScale, TEXT_SCALES } from "@/lib/text-scale";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Text size control, cycling Standard, Large, Larger.
 *
 * The applied size lives on the root element rather than in React state, so
 * it survives navigation without re-rendering the tree.
 */
export function TextSizeToggle({ onDark = false }: { onDark?: boolean }) {
  const { scale, cycle, label } = useTextScale();
  const hydrated = useHydrated();

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${16 * scale}px`;
  }, [scale]);

  if (!hydrated) return <span className="h-9 w-9" aria-hidden="true" />;

  const index = TEXT_SCALES.indexOf(scale);
  const next = TEXT_SCALES[(index + 1) % TEXT_SCALES.length];
  const nextLabel =
    next === 1 ? "standard" : next === 1.125 ? "large" : "larger";

  return (
    <button
      type="button"
      onClick={cycle}
      // States the current size and what pressing it does, so the control is
      // usable without seeing the size change.
      aria-label={`Text size: ${label}. Change to ${nextLabel}.`}
      title={`Text size: ${label}`}
      className={`inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-xs font-medium transition-colors ${
        onDark
          ? "text-band-foreground/75 hover:bg-band-foreground/10 hover:text-band-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Type className="h-4 w-4" aria-hidden="true" />
      <span
        aria-hidden="true"
        className={`font-mono text-[10px] uppercase tracking-wider ${
          onDark ? "text-band-foreground/60" : "text-muted-foreground/80"
        }`}
      >
        {index === 0 ? "A" : index === 1 ? "A+" : "A++"}
      </span>
    </button>
  );
}
