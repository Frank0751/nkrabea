import { Info } from "lucide-react";
import {
  FORMS_ENABLED,
  HONEYPOT_FIELD,
  unavailableMessage,
} from "@/lib/web3forms";
import { ORG } from "@/lib/content";

/**
 * Shown above a form only when the site has no Web3Forms key, so nobody types
 * a message into a form that cannot send it.
 */
export function FormUnavailable() {
  if (FORMS_ENABLED) return null;
  return (
    <p
      role="status"
      className="mb-5 flex items-start gap-3 rounded-xl border border-border bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{unavailableMessage(ORG.email)}</span>
    </p>
  );
}

/**
 * The honeypot. Hidden from people and from assistive technology, present for
 * bots that fill every field. Web3Forms discards a submission that carries it.
 */
export function Honeypot() {
  return (
    <div className="hidden" aria-hidden="true">
      <input
        type="checkbox"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        defaultChecked={false}
      />
    </div>
  );
}
