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
npm run check         # lint, typecheck, WCAG contrast and font URLs
npm run check:contrast # palette contrast only
npm run check:fonts   # the Fontshare URLs still resolve
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

## Photography

Photographs come from Nkrabea's own Cloudinary library: cloud `dmyrmlj5z`,
folder `Nkrabea`. `src/lib/cloudinary.ts` builds a delivery URL from the path
that follows `/upload/`, version included, and `next.config.ts` allows that
one cloud and no other host.

- Delivery is public, so **no Cloudinary key or secret belongs in the repo, in
  Vercel or in the build**. The API key used to list the library lives only in
  the developer's `.env`, which git ignores.
- `HERO_PHOTOS` in `content.ts` holds one photograph per page with its alt
  text attached, so a hero cannot end up carrying someone else's description.
  `<PageHero>` takes a single `photo` prop. Contact has no photograph and
  renders the composed band.
- **Never write alt text for a photograph you have not opened.** The first
  version of this file described drummers who were not in the picture.
- No caption carries an event name, place or date, and no person is named,
  until Nkrabea supplies them. Sarah Serwaa Asamoah's portrait on the
  leadership page is the one photograph identified so far.
- Around seventeen of the photographs show identifiable children, published on
  the client's instruction. If Nkrabea withdraws consent for any of them,
  delete the entry rather than reword the caption.

## Architecture conventions

- **Nine routes**, matching the structure Nkrabea asked for: `/`, `/about`,
  `/leadership`, `/programmes`, `/impact`, `/partner`, `/get-involved`,
  `/news`, `/contact`.
- **Shared chrome in the root layout**: header, footer, rhythm line, kente
  strip, back-to-top, skip link and the motion provider.
- **Heroes are splits, not overlays**: the photograph runs at full strength
  in its own panel and the words sit on the band, where they have 12.6:1.
  `<PageHero>` takes an optional `photo` and a `flip` that puts the picture on
  the other side, so consecutive pages do not repeat one composition. A page
  with no photograph renders the band alone.
- **`<PhotoReel>`** is the homepage's movement: a crossfade through three
  stills with a slow push. It never advances to a frame whose image has not
  loaded, and it stops dead under reduced motion.
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

## Typography

- Display is **Bespoke Serif** (400, 500, 700), body and interface are
  **Satoshi** (400, 500, 700, 900), labels are **JetBrains Mono**
  (`.label-mono`). DM Serif Display, Manrope, Fraunces, Plus Jakarta Sans and
  Inter are all gone.
- The two Fontshare faces are declared as `@font-face` rules at the top of
  `globals.css` against `cdn.fontshare.com`. **Never commit the font binaries.**
  Their licence permits web use but not redistribution, and this repository is
  public. That is also why they are not loaded with `next/font/local`.
  `npm run check:fonts` fails the build if a URL stops resolving, so the site
  cannot silently fall back to system faces. JetBrains Mono is openly
  licensed, so it stays on `next/font/google`.
- Fontshare's CSS API returns the wrong family when two are requested in one
  call. One request per family, or write the rules out as we have.
- `.font-display` sets weight 700 in `@layer base`, so a `font-medium` or
  `font-normal` utility still overrides it. Synthesis stays off.
- Use the scale, do not invent sizes: `text-hero`, `text-section`, `text-sub`,
  `text-lede`. Line height and tracking travel with each one.

## Styling rules

- Tokens are OKLCH in `src/app/globals.css`. Brand constants come from
  `public/logo.svg`: badge black `#14181a`, warm cream `#f4f1ea`, Akan gold
  `#c9a227`, badge green `#1f6f5c`, clay `#b4402f`.
- The five slots: `--band` is forest ink `#103028` (hero, CTA bands, footer,
  every data band), `--background` is warm cream for long reading, `--sand` is
  the second light plane so a section is built from a surface rather than a
  1px border, `--sand-deep` is for pattern bands and frames, and `--accent` is
  gold.
- **`--sand-deep` is not a text surface.** Gold text on it is 4.06:1.
- Gold carries a three-step ramp because brand gold on cream is 2.20:1:
  `--accent` (fills, and text on the band), `--gold-edge` (non-text UI on
  light), `--gold-ink` (gold as text on light). Never use `--accent` as text on
  a light surface.
- **`--band` / `--band-foreground` do not invert between themes**, and the dark
  theme is the band's own family rather than a neutral black, so switching
  themes does not switch identity. Do not use `bg-foreground` for a dark band.
- `--chart-1/2/3` are **not** the brand tokens. They were validated with the
  data-viz palette checker against the forest ink band and are only legal
  there: on sand, brand gold measures 1.87:1 and badge green falls under the
  chroma floor. Every chart therefore lives inside `<DataBand>`.
- The focus ring is `currentColor`, so it inherits a colour that already
  clears 4.5:1 against whatever the element sits on and cannot fail contrast.
- After changing any colour token, run `npm run check:contrast`. It fails the
  build on any pairing below WCAG 2.2 AA.
- No em dashes in copy. Mobile-first: test at 390px, 768px and 1280px.
- One H1 per page, in the hero.

## Pattern language

Two motifs, both taken from cloth in Nkrabea's own photographs rather than
invented, and all four are decorative so they carry `aria-hidden`:

- `.kente-field` a loom grid at low contrast, behind every ink band.
- `.woven-edge` the triangle weave from the cloth on the high table, used
  where a band meets a light surface instead of a hairline. `--flip` inverts it.
- `.weave-band` a thicker colour-block rule for major transitions.
- `.section-mark` the short gold rule under a section label.

If Nkrabea ask for specific Adinkra symbols, get the names from them and draw
those. Do not approximate a symbol and label it.

## Figures and data visuals

`src/components/site/figures.tsx`, consuming `PROGRAMME_FIGURES`.

- `<DataBand>` carries the ink surface the chart palette was validated
  against. Charts go inside it, nowhere else.
- Every mark has a permanent direct label, so identity is never colour alone,
  and each visual is a definition list underneath: a screen reader gets name
  and value pairs without a chart library.
- Every caption states that the number is a target. A target drawn as a bar
  reads as an achievement.
- **Draw nothing Nkrabea has not published.** The soap programme covers four
  regions with no published per-region split, so `<RegionChips>` names them
  and says why there is no chart. Four invented bars of 125 would be
  fabrication in the most persuasive form this site has.

## API routes

Three POST endpoints under `src/app/api/`:

- `/api/partnership` - funder and sponsor enquiries, persists to
  `PartnershipEnquiry`
- `/api/contact` - persists to `ContactMessage`
- `/api/newsletter` - upserts `NewsletterSubscriber`

All return `{ ok: boolean, ... }`. Use sonner toasts for feedback.

## Database

Prisma with SQLite at `prisma/db/custom.db`. Prisma resolves a relative
`file:` URL against `prisma/schema.prisma`, not the project root, which is why
the file lands there and why `.gitignore` matches `*.db` in any location.

**SQLite is a development placeholder only.** A serverless filesystem is wiped
on every deployment, so a submission written there would not survive. Phase 3
replaces it with hosted Postgres.

`src/lib/persistence.ts` guards this: a file-backed database on a serverless
host makes all three API routes return 503 with a message telling the sender
their enquiry was **not** sent. Never weaken that guard to make a deployment
look like it works. `src/lib/db.ts` constructs the Prisma client lazily, so an
unset `DATABASE_URL` returns that honest error rather than crashing on import.

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
