# Nkrabea Culture and Arts Ensemble LBG

Official website for a registered Ghanaian NGO (Companies Act 2019, Act 992;
incorporated 14 May 2021) based in Adentan Municipal, Greater Accra, using
culture and the creative arts as tools for socio-economic development.

Built by [KoomBei Digital](https://koombei.com) under project KB-2026-009.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · GSAP 3 ·
Prisma

## Running locally

```bash
npm install
cp .env.example .env
npm run db:push     # create the local SQLite tables
npm run dev         # http://localhost:3000
```

## Checks

```bash
npm run check           # lint + typecheck + WCAG contrast
npm run check:contrast  # palette only, fails below WCAG 2.2 AA
npm run build           # production build
npm run db:studio       # browse submitted enquiries
```

## Deployment

The Vercel project is connected to this repository. **Pushing to `main`
deploys to production.**

### Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | optional for now | See the warning below. Left unset, the forms refuse politely, which is the same behaviour they have with SQLite on a serverless host. Required once Postgres is provisioned. |
| `NEXT_PUBLIC_SITE_URL` | **leave unset until the real domain is live** | Setting this declares "this is the organisation's public site", which switches search-engine indexing **on**. Left unset, the origin is derived from `VERCEL_URL` automatically and the deployment serves `noindex`, so a staging copy can never compete with the real domain later. |

### The database is not yet deployable

`prisma/schema.prisma` still uses SQLite. **A serverless filesystem is wiped on
every deployment**, so a submission written there would not survive, and the
sender would see a success message either way. This is the defect KB-2026-009
Section 03 leads with, and Phase 3 replaces SQLite with hosted Postgres.

Until then the three API routes refuse to accept submissions on a serverless
host. `src/lib/persistence.ts` detects a file-backed database on a serverless
platform and returns HTTP 503 with a message telling the sender their enquiry
was **not** sent and to email `nkrabea.cna@gmail.com` instead.

This means a deployment made today is safe to show people, but its forms do not
work, by design. That is the honest failure, and it is deliberately preferred
to a silent one. Local development is unaffected: SQLite on a real disk is
treated as durable and every form works normally.

To make the forms live:

1. Provision hosted Postgres and set `DATABASE_URL` to its connection string.
2. Change the `datasource` provider in `prisma/schema.prisma` to `postgresql`.
3. Run `prisma migrate deploy` against it.

The guard then passes automatically. No application code needs changing.

## Content

`src/lib/content.ts` is the single source of truth, taken from Nkrabea's own
organisational profile. It carries a hard rule: nothing reaches the site that
the organisation cannot evidence.

- Every figure declares a `kind` of `target`, `achieved` or `fact` with a
  `source`, so a programme target is never rendered as an accomplishment.
- `NEEDS_EVIDENCE` holds claims that are **not rendered anywhere**, including
  the 1995 founding date carried by the earlier prototype. Nkrabea's profile
  documents only the 2021 incorporation. Moving an item out of that array
  requires written evidence from Nkrabea.
- `EVENTS`, `TESTIMONIALS`, `PRESS` and `STORIES` are intentionally empty and
  render honest empty states.

See [CLAUDE.md](CLAUDE.md) for the full architecture, motion and styling
conventions.

## Accessibility

Nkrabea work with persons with disabilities and asked for the site to model
good practice visibly, not just implement it.

- An **animations on/off toggle** sits in the header. An explicit choice
  overrides the operating system's reduced-motion setting in both directions
  and persists across visits.
- Contrast is enforced by `scripts/contrast.mjs`, which checks all 32 text
  pairings in both themes and fails below WCAG 2.2 AA.
- Skip link, visible focus states, one `<h1>` per page, labelled form fields
  and descriptive alt text on every image.

## Licence and ownership

The repository, its content and the organisation's brand belong to Nkrabea
Culture and Arts Ensemble LBG.
