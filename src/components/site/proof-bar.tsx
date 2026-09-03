import { ORG } from "@/lib/content";

/**
 * Proof bar, koombei-studio-skill Part 4 section 2: credibility immediately
 * below the hero, on the accent colour.
 *
 * Deliberately four verifiable facts rather than impact numbers. Nkrabea's
 * figures are programme targets, and a target dressed as an achievement in
 * the most prominent strip on the page is exactly the failure this rebuild
 * exists to remove. Registration, incorporation, reach and governance are
 * also what a grant funder actually checks first.
 */
const PROOF = [
  { value: "Registered", label: "Non-governmental organisation" },
  { value: "Act 992", label: "Companies Act, 2019" },
  { value: "2021", label: "Incorporated 14 May" },
  { value: "National", label: "Area of operation" },
];

export function ProofBar() {
  return (
    <section
      aria-label="Registration and governance"
      className="border-y border-accent/30 bg-accent text-accent-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-accent-foreground/15 sm:divide-x lg:grid-cols-4">
          {PROOF.map((item) => (
            <div
              key={item.label}
              className="px-2 py-6 text-center sm:px-6 lg:py-7"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block font-display text-2xl leading-none tracking-tight sm:text-3xl">
                  {item.value}
                </span>
                <span className="mt-2 block text-xs leading-snug text-accent-foreground/75 sm:text-sm">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="sr-only">
          {ORG.legalName} is a registered Ghanaian non-governmental
          organisation, incorporated on {ORG.incorporated} under the{" "}
          {ORG.registration}, operating nationally.
        </p>
      </div>
    </section>
  );
}
