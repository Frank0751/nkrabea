# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Official website for **Nkrabea Culture and Arts Ensemble LBG**, a registered
Ghanaian NGO (Companies Act 2019, Act 992; incorporated 14 May 2021) based in
Adentan Municipal, Greater Accra. The organisation uses culture and the
creative arts as tools for socio-economic development, with a particular
commitment to Ghana's most marginalised communities.

It is **not** a performance-booking company. An earlier prototype framed it as
a dance and drumming ensemble selling performances, founded 1995. Nkrabea's own
organisational profile does not support that framing. See "Content rules" below.

Next.js 16 App Router + TypeScript + Tailwind CSS 4 + shadcn/ui + GSAP 3.

## Essential commands

```bash
npm install           # install deps (bun is not used; there is no bun.lock)
cp .env.example .env  # DATABASE_URL is relative; NEXT_PUBLIC_SITE_URL optional
npm run db:push       # create/update SQLite tables (dev only, see Database)
npm run dev           # dev server on :3000
npm run check         # lint + typecheck + WCAG contrast, all three
npm run check:contrast # palette contrast only
npm run db:studio     # browse submitted enquiries and messages
```

## Content rules

**`src/lib/content.ts` is the single source of truth**, and it is organised
around a hard rule: nothing reaches the site that Nkrabea cannot evidence.

- The `CONFIRMED` section comes verbatim from Nkrabea's own organisational
  profile. Edit it only against that document.
- `FIGURES` entries each carry a `kind` of `target`, `achieved` or `fact`, and
  a `source`. A programme target must never be rendered as an accomplishment.
- `NEEDS_EVIDENCE` holds claims that are **not rendered anywhere**: the 1995
  founding date, "40+ dance and drum forms", "12 countries", the GES
  partnership, the PWD unemployment statistic, the press strip, and the
  Adowa/Kete programme detail. Moving an item out of this array requires
  written evidence from Nkrabea, not a judgement call.
- `EVENTS`, `TESTIMONIALS`, `PRESS` and `STORIES` are intentionally empty.
  Components render honest empty states. Do not populate them with placeholders.

## Architecture conventions

- **Nine routes**, matching the structure Nkrabea asked for: `/`, `/about`,
  `/leadership`, `/programmes`, `/impact`, `/partner`, `/get-involved`,
  `/news`, `/contact`.
- **Shared chrome in the root layout**: header, footer, rhythm line, kente
  strip, back-to-top, skip link and the motion provider.
- **Subpage hero**: `<PageHero>`. Its `image` is optional; pages without a
  confirmed photograph render a composed black band rather than a stand-in.
- **Section labels**: `<SectionEyebrow>`, which uses the mono typeface.
- **Scroll animation**: `<Reveal>` and `<RevealGroup>`.
- **CTA bands**: `<CtaBand>` at the bottom of a page.
- **Rhythm line nodes**: put `data-rhythm-node` on each top-level `<section>`
  inside `<main>`. The rhythm line measures those and strikes a node as the
  scroll fill reaches each one.

## Motion

- All motion goes through `src/lib/motion.ts` and `<MotionProvider>`.
- Two inputs decide whether motion runs: the OS `prefers-reduced-motion`
  setting, and an explicit visitor choice made with the header toggle. **The
  explicit choice wins in both directions.** The result is mirrored onto
  `<html data-motion="on|off">` so CSS can follow.
- Never gate an animation on the media query alone. Use `useReducedMotion()`
  or `useMotion()`, and mirror any new CSS animation in both guard blocks in
  `globals.css`.
- **Never set `scroll-behavior: smooth` on `html`.** GSAP ScrollTrigger cannot
  track a natively smooth-scrolling root; triggers evaluate once and freeze,
  leaving reveals stuck invisible.
- Hidden-before-reveal states are set in JS, never in CSS, so that content is
  visible rather than invisible if JavaScript fails.

## Styling rules

- Tokens are OKLCH in `src/app/globals.css`, derived from `public/logo.svg`:
  badge black `#14181a`, warm cream `#f4f1ea`, Akan gold `#c9a227`, badge green
  `#1f6f5c`, clay red `#b4402f`.
- Gold carries a three-step ramp because brand gold on cream is only 2.20:1:
  `--accent` (fills, and text on black), `--gold-edge` (non-text UI on light),
  `--gold-ink` (gold as text on light). Never use `--accent` as text on a light
  background.
- Red is the emphasis slot (`--emphasis`), used sparingly. The dark theme
  lightens it, because brand red is 4.11:1 on the dark card.
- **`--band` / `--band-foreground` do not invert between themes.** The hero,
  CTA bands and footer are badge black in both light and dark. Do not use
  `bg-foreground` for a dark band; it flips to cream in dark mode.
- After changing any colour token, run `npm run check:contrast`. It fails the
  build on any pairing below WCAG 2.2 AA.
- Display type is Fraunces, body is Plus Jakarta Sans, labels are JetBrains
  Mono (`.label-mono`). Inter is not used.
- No em dashes in copy. Mobile-first: test at 390px, 768px and 1280px.
- One H1 per page, in the hero.

## API routes

Three POST endpoints under `src/app/api/`:

- `/api/partnership` - funder and sponsor enquiries, persists to
  `PartnershipEnquiry`
- `/api/contact` - persists to `ContactMessage`
- `/api/newsletter` - upserts `NewsletterSubscriber`

All return `{ ok: boolean, ... }`. Use sonner toasts for feedback.

## Database

Prisma with SQLite at `db/custom.db`. **SQLite is a development placeholder
only.** A serverless filesystem is wiped on every deployment, so a submission
written there would not survive. Phase 3 replaces it with hosted Postgres.
Do not deploy this datasource.

## Do not

- Do not add authentication. The API routes are intentionally open.
- Do not render anything from `NEEDS_EVIDENCE`.
- Do not present a programme target as an achieved result.
- Do not put KoomBei's bank or mobile money details on the site. The invoice
  details belong to the developer; Nkrabea's donation line is `ORG.momo`.
- Do not reintroduce `scroll-behavior: smooth` on `html`.
- Do not introduce indigo or blue.

## Testing changes

Run `npm run check`, then confirm each of the nine routes renders and that no
unverified claim appears in the output. Scroll-driven motion cannot be verified
in a headless browser that does not dispatch scroll events; check the rhythm
line, reveals and count-ups in a real browser.
