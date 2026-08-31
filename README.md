# Nkrabea Culture & Arts Ensemble

Official website for Nkrabea Culture & Arts Ensemble, a Ghanaian non-profit cultural dance and drumming ensemble founded in 1995 in Adenta, Accra.

> Translating Ghanaian culture into something the world can feel and understand.

## Tech stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style) + Lucide icons
- **Database**: Prisma ORM with SQLite
- **Fonts**: Inter (body) + Fraunces (display) via next/font
- **Theme**: next-themes (light default, dark mode toggle)
- **Toasts**: sonner
- **Runtime**: Bun (recommended) or npm/pnpm

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Copy environment file
cp .env.example .env

# 3. Create the SQLite database and tables
bun run db:push

# 4. Start the dev server
bun run dev
```

The site runs at http://localhost:3000

If you use npm instead of bun, replace `bun` with `npm` and `bun run` with `npm run`.

## Project structure

```
src/
  app/
    about/         page.tsx        # About: story, stats, values, timeline, mission
    bookings/      page.tsx        # Bookings: services, process, pricing, booking form
    contact/       page.tsx        # Contact: info, socials, tabbed forms, FAQ
    ensemble/      page.tsx        # Ensemble: four limbs, training, gallery, testimonials
    events/        page.tsx        # Events: calendar, past highlights, newsletter
    gallery/       page.tsx        # Gallery: masonry + lightbox with keyboard nav
    programs/      page.tsx        # Programs: feature cards + cultural context modal
    layout.tsx     # Root layout: shared header, footer, scroll progress, back-to-top
    page.tsx       # Homepage: hero, previews, mission, reel, testimonials, CTA
    globals.css    # Theme tokens, fonts, animations
  components/
    site/          # Page-specific and shared site components
    ui/            # shadcn/ui primitives (46 components)
  lib/
    content.ts     # All site content (org info, programs, events, gallery, FAQs)
    db.ts          # Prisma client singleton
    utils.ts       # cn() class merge helper
  hooks/
    use-mobile.ts  # Mobile viewport hook
    use-toast.ts   # Toast hook (legacy)
public/
  images/
    social/        # 8 real photos from the org's Facebook page
    *.png          # AI-generated cultural imagery (hero, programs, gallery)
  logo.svg         # Custom Nkrabea star mark
prisma/
  schema.prisma    # ContactMessage, NewsletterSubscriber, BookingRequest models
```

## Pages and routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, section previews, mission, featured reel, testimonials |
| `/about` | Story, animated stats, values, dark timeline, mission quote |
| `/programs` | Adowa, Kete, Drumming, Street Dance with detail modals |
| `/bookings` | Services, 4-step process, pricing tiers, booking form |
| `/ensemble` | Company structure, training philosophy, behind-the-scenes gallery |
| `/events` | Upcoming events with status legend, past highlights |
| `/gallery` | Masonry of 8 real images with full lightbox (keyboard nav) |
| `/contact` | Contact info, social links, tabbed forms, FAQ accordion |

## Backend API

All three endpoints validate input and persist to SQLite via Prisma.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/booking` | POST | Booking request (name, email, phone, date, eventType, message) |
| `/api/contact` | POST | General message (name, email, subject, message) |
| `/api/newsletter` | POST | Newsletter subscription (email, name?) |

To inspect submitted data:
```bash
bun run db:studio
```

## Content

All copy lives in `src/lib/content.ts`. Edit that single file to update org info,
programs, events, gallery, testimonials, FAQs, and stories across every page.

Key data:
- Organization: Nkrabea Culture & Arts Ensemble, founded 1995, Adenta Accra
- Contact: nkrabea.cna@gmail.com, +233 20 852 2120, +233 55 612 2230
- Social: Instagram @nkra.bea, Facebook, TikTok @hayeoye_

## Images

- `public/images/social/` contains 8 real photographs extracted from the
  organization's Facebook page (dancers, performances, art exhibitions,
  and the mission cover photo). These are used in the hero, gallery,
  page heroes, and mission sections.
- `public/images/*.png` contains AI-generated cultural imagery (Adowa,
  Kete, drumming, street dance, kente cloth) used in program cards and
  preview sections.

## Design system

- **Palette**: warm cream background, deep teal-green primary, gold accent,
  near-black charcoal for dark sections. No indigo or blue.
- **Fonts**: Inter for body text, Fraunces for display headings.
- **Animations**: scroll-reveal, count-up stats, marquee, scroll progress bar.
  All respect prefers-reduced-motion.
- **Responsive**: mobile-first, tested at 390px, 768px, and desktop widths.
- **Accessibility**: semantic HTML, ARIA roles, keyboard navigation, alt text,
  focus-visible rings.

## Database schema

```prisma
model ContactMessage { id, name, email, subject, message, intent, createdAt }
model NewsletterSubscriber { id, email, name?, createdAt }
model BookingRequest { id, name, email, phone?, eventType, date?, message, createdAt }
```

## Scripts

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push schema to SQLite (creates/updates tables) |
| `bun run db:generate` | Regenerate Prisma client |
| `bun run db:migrate` | Create and apply a migration |
| `bun run db:reset` | Reset database (destructive) |
| `bun run db:studio` | Open Prisma Studio GUI to browse data |

## Notes for Claude Code

- The worklog at `worklog.md` documents the full build history across
  multiple review rounds, including QA results and recommendations.
- `src/lib/content.ts` is the single source of truth for all copy.
- The theme is defined with OKLCH color tokens in `src/app/globals.css`.
- Program modals support deep links (`/programs#program-kete` opens Kete).
- The gallery lightbox supports arrow-key navigation and Escape to close.
- `next.config.ts` has `ignoreBuildErrors: false` so type errors will surface.
- No authentication is implemented. The API routes are open but validate input.
- The TikTok embed in the featured reel uses the official iframe and may be
  geo-restricted in some regions.

## License

This project is proprietary to Nkrabea Culture & Arts Ensemble.
