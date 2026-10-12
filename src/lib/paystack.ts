/**
 * Online donations through Paystack, koombei-studio-skill Part 8's payment
 * provider for Ghanaian clients.
 *
 * The donation form opens Paystack's own checkout over the page. Card and
 * mobile money details are typed into Paystack's frame, never into this site,
 * and every completed gift lands in Nkrabea's Paystack dashboard with the
 * donor's email, what the gift is for, and a reference starting NKR-.
 *
 * Only the PUBLIC key is used. It is safe in browser code by design, which
 * is why it is written here rather than hidden in an environment variable.
 * A SECRET key can move the organisation's money and must never be in this
 * repository or in any NEXT_PUBLIC_ variable: next.config.ts refuses to
 * build if one appears in either place.
 *
 * NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY overrides the key written here, for a
 * preview deployment pointed at the test key.
 *
 * Until a valid public key is present the form does not render and the page
 * keeps its "card giving is being set up" card, so the site never offers a
 * payment it cannot take.
 *
 * There is no server, so a payment is not re-verified against Paystack's API
 * after the checkout reports success. For donations that is the right trade:
 * nothing is released on the strength of that report except a thank-you
 * message, and the Paystack dashboard is the record of what was paid.
 */

/** Nkrabea's live public key, supplied by the organisation on 12 October 2026. */
const DEFAULT_PUBLIC_KEY = "pk_live_08292aeb359c1e37af82cb83addf0727b671343d";

const PUBLIC_KEY = /^pk_(live|test)_[A-Za-z0-9]{8,}$/;

const candidate =
  (process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "").trim() ||
  DEFAULT_PUBLIC_KEY;

export const PAYSTACK_PUBLIC_KEY = PUBLIC_KEY.test(candidate) ? candidate : "";
export const DONATIONS_ENABLED = PAYSTACK_PUBLIC_KEY.length > 0;

/** A pk_test_ key: the form says plainly that no real money is taken. */
export const PAYSTACK_TEST_MODE = PAYSTACK_PUBLIC_KEY.startsWith("pk_test_");

export const DONATION_CURRENCY = "GHS";

/** Suggested gifts, in cedis. */
export const PRESET_AMOUNTS = [50, 100, 200, 500] as const;
export const DEFAULT_AMOUNT = 100;
export const MIN_AMOUNT = 1;

/**
 * Above this the form points to a bank transfer instead. It also stops a
 * mistyped extra zero turning into a very large charge.
 */
export const MAX_AMOUNT = 50_000;

/** Paystack takes amounts in the smallest unit: pesewas for cedis. */
export function toPesewas(cedis: number): number {
  return Math.round(cedis * 100);
}

/**
 * GHS 1,250 or GHS 12.50. Written out by hand rather than with
 * toLocaleString, so the server and every browser render the same string.
 */
export function formatCedis(cedis: number): string {
  const [whole, fraction] = cedis.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `GHS ${grouped}${fraction === "00" ? "" : `.${fraction}`}`;
}

/**
 * A reference Nkrabea can spot in their dashboard: NKR-, the time, and four
 * random bytes. Paystack allows letters, digits, hyphens, dots and equals
 * signs. Browser only.
 */
export function newReference(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const random = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `NKR-${Date.now().toString(36)}-${random}`.toUpperCase();
}
