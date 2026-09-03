/**
 * Is the configured database durable in this environment?
 *
 * The prototype's most serious defect, and the one KB-2026-009 leads with, is
 * that a serverless filesystem is wiped on every deployment. A SQLite file
 * there accepts a write, returns success, and loses the record. The sender is
 * told their enquiry arrived when it did not.
 *
 * This is the guard against that. It is deliberately conservative: anything
 * file-backed on a serverless platform is treated as not durable, and the API
 * routes refuse the submission rather than accepting one they cannot keep.
 *
 * Local development with SQLite stays fully working, because there the file
 * is on a real disk that survives.
 */

const url = process.env.DATABASE_URL ?? "";

/** SQLite and any other file-backed datasource. */
const isFileBacked = url.startsWith("file:");

/**
 * Vercel sets VERCEL=1 in every build and runtime environment. Other
 * serverless hosts can be added here as they are used.
 */
const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

export const PERSISTENCE_IS_DURABLE =
  url.length > 0 && !(isFileBacked && isServerless);

/**
 * Why persistence is unavailable, for server logs. Never sent to the browser,
 * since it names infrastructure.
 */
export const PERSISTENCE_DIAGNOSIS = !url
  ? "DATABASE_URL is not set."
  : isFileBacked && isServerless
    ? "DATABASE_URL is file-backed (SQLite) on a serverless host, where the filesystem is wiped on every deployment. Configure hosted Postgres."
    : "Persistence is available.";

/**
 * What the sender is told. It does not blame them, does not pretend the
 * message was received, and gives them a route that actually works.
 */
export function unavailableResponse(email: string) {
  return {
    ok: false as const,
    error:
      `We cannot record your message right now, so it has not been sent. ` +
      `Please email ${email} directly and we will reply from there.`,
  };
}
