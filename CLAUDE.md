# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Official website for Nkrabea Culture & Arts Ensemble, a Ghanaian non-profit
cultural dance and drumming ensemble. Next.js 16 App Router + TypeScript +
Tailwind CSS 4 + shadcn/ui + Prisma (SQLite).

## Essential commands

```bash
bun install          # install deps
cp .env.example .env # set up env (DATABASE_URL is relative)
bun run db:push      # create/update SQLite tables
bun run dev          # dev server on :3000
bun run lint         # eslint
bun run db:studio     # GUI to browse submitted bookings/messages
```

## Architecture conventions

- **Content lives in one file**: `src/lib/content.ts`. All org info, programs,
  events, gallery items, testimonials, FAQs, and stories are defined there.
  Edit that file to update copy site-wide. Do not hardcode copy in components.
- **Shared chrome in root layout**: `src/app/layout.tsx` renders the header,
  footer, scroll progress bar, and back-to-top button on every page.
- **Subpage hero**: use `<PageHero>` from `@/components/site/page-hero` for
  consistent hero treatment (breadcrumb, eyebrow, single H1, image background).
- **Section eyebrows**: use `<SectionEyebrow>` from
  `@/components/site/section-eyebrow`.
- **Scroll animations**: wrap section headers in `<Reveal>` from
  `@/components/site/reveal` with optional `delay` prop for staggered entrance.
- **CTA bands**: use `<CtaBand>` from `@/components/site/cta-band` at the
  bottom of pages.
- **Client vs server**: pages that need interactivity (programs modal, gallery
  lightbox, contact forms) are `"use client"`. Content pages are server
  components by default.

## Styling rules

- Color tokens are OKLCH values defined in `src/app/globals.css`:
  `bg-background`, `text-foreground`, `bg-card`, `bg-secondary`,
  `text-muted-foreground`, `text-primary`, `bg-foreground` (dark sections),
  `text-primary-foreground`, `bg-accent`, `text-accent-foreground`.
- Palette is teal-green + gold + black/cream. Do not use indigo or blue.
- Headings use `font-display` (Fraunces). Body uses the default sans (Inter).
- No em dashes in copy. Use regular hyphens or commas.
- One H1 per page (in PageHero). All other headings are H2 or H3.
- Mobile-first responsive. Test at 390px, 768px, and 1280px.
- Animations must respect prefers-reduced-motion (see globals.css guard).

## API routes

Three POST endpoints in `src/app/api/`:
- `/api/booking` - validates name/email/message, persists to BookingRequest
- `/api/contact` - validates name/email/message, persists to ContactMessage
- `/api/newsletter` - validates email, upserts NewsletterSubscriber

All return `{ ok: boolean, ... }` JSON. Use sonner toasts for feedback.

## Database

Prisma + SQLite at `db/custom.db` (relative path in .env).
Three models: ContactMessage, NewsletterSubscriber, BookingRequest.
After changing `prisma/schema.prisma`, run `bun run db:push`.

## Do not

- Do not add authentication. The API routes are intentionally open.
- Do not add new heavy dependencies without checking the existing stack.
- Do not use z-ai-web-dev-sdk in client code. It is backend-only (not used
  in the current source but available if needed).
- Do not use `bun run build` during development; use `bun run dev`.
- Do not introduce indigo or blue colors.

## Testing changes

After edits, run `bun run lint` and verify the dev server compiles without
errors. Visit each route to confirm rendering: /, /about, /programs,
/bookings, /ensemble, /events, /gallery, /contact.
