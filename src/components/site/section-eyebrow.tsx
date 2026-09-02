/**
 * Section label. JetBrains Mono, per the KB-2026-009 type system: display is
 * Fraunces, body is Plus Jakarta Sans, and technical labels are mono.
 */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-mono inline-flex items-center gap-2.5 text-primary">
      <span className="h-px w-6 bg-primary/40" aria-hidden="true" />
      {children}
    </span>
  );
}
