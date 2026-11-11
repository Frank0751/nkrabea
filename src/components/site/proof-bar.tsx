import { getSiteContent } from "@/lib/site-content";

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
export async function ProofBar() {
  const { org, text } = await getSiteContent();
  // Editable on the Home page in Sanity, under Credibility strip.
  const items = text.homePage.stats("proofItems");
  if (items.length === 0) return null;
  return (
    <section
      aria-label="Registration and governance"
      className="border-y border-accent/30 bg-accent text-accent-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl
          className={`grid grid-cols-2 divide-accent-foreground/15 sm:divide-x ${
            items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((item) => (
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
          {org.legalName} is a registered Ghanaian non-governmental
          organisation, incorporated on {org.incorporated} under the{" "}
          {org.registration}, operating nationally.
        </p>
      </div>
    </section>
  );
}
