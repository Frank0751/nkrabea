/**
 * Form delivery through Web3Forms, koombei-studio-skill Part 8's choice.
 *
 * Each submission becomes an email to the address the access key was created
 * with. That is the whole model: the site does not choose the recipient, the
 * key does. Reply-to is set to the sender, so whoever receives it can answer
 * straight from their inbox.
 *
 * The key is public by design. Web3Forms puts it in browser code and says a
 * free key must be used from the browser, not a server, which is why the
 * forms post here directly and there are no API routes behind them. It ships
 * in the page's JavaScript either way, so it is written here rather than
 * hidden in an environment variable that would only have to be set in Vercel
 * before the forms worked. NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY overrides it, for
 * a replacement key generated with a different recipient.
 *
 * The worst anyone can do with the key is send a message to its recipient,
 * which is what the forms are for. Web3Forms filters spam, and the honeypot
 * below catches the bots that fill every field.
 *
 * A form must never report success for a message that went nowhere. If the
 * key is ever blanked, every form says so plainly and offers the email
 * address instead.
 */

const ENDPOINT = "https://api.web3forms.com/submit";

const DEFAULT_ACCESS_KEY = "c0733aa8-0a89-4364-810f-b5c5eeb86b5c";

export const ACCESS_KEY =
  (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim() ||
  DEFAULT_ACCESS_KEY;

export const FORMS_ENABLED = ACCESS_KEY.length > 0;

/** The honeypot. A hidden checkbox people never see and bots tick. */
export const HONEYPOT_FIELD = "botcheck";

export function unavailableMessage(email: string): string {
  return `Our form is not taking messages at the moment. Please email ${email} directly and we will reply from there.`;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitToWeb3Forms(
  fields: Record<string, string>,
  contactEmail: string
): Promise<SubmitResult> {
  if (!FORMS_ENABLED) {
    return { ok: false, error: unavailableMessage(contactEmail) };
  }

  const payload: Record<string, string> = {
    access_key: ACCESS_KEY,
    from_name: "Nkrabea website",
    ...fields,
  };
  // Only a ticked honeypot is sent. An empty field is left out entirely
  // rather than trusted to be read as false.
  if (!payload[HONEYPOT_FIELD]) delete payload[HONEYPOT_FIELD];

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      error: `We could not reach the mail service. Check your connection, or email ${contactEmail} directly.`,
    };
  }

  if (response.status === 429) {
    return {
      ok: false,
      error: "Too many messages in a short time. Please wait a minute and try again.",
    };
  }

  let success = false;
  try {
    const data = (await response.json()) as { success?: boolean };
    success = data.success === true;
  } catch {
    success = false;
  }

  if (!response.ok || !success) {
    return {
      ok: false,
      error: `We could not send your message. Please email ${contactEmail} directly.`,
    };
  }
  return { ok: true };
}
