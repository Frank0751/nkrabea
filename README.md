# Nkrabea Culture and Arts Ensemble LBG

Official website for a registered Ghanaian NGO (Companies Act 2019, Act 992;
incorporated 14 May 2021) based in Adentan Municipal, Greater Accra, using
culture and the creative arts as tools for socio-economic development.

Built by [KoomBei Digital](https://koombei.com) under project KB-2026-009.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · GSAP 3 ·
Cloudinary · Web3Forms

## Running locally

```bash
npm install
cp .env.example .env
npm run dev         # http://localhost:3000
```

## Checks

```bash
npm run check           # lint, typecheck, WCAG contrast, font URLs
npm run check:contrast  # palette only, fails below WCAG 2.2 AA
npm run build           # production build
```

## Deployment

The Vercel project is connected to this repository. **Pushing to `main`
deploys to production.**

### Environment variables

All optional. The site builds and runs with none of them set.

| Variable | When | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | once the domain is live | While unset the site is `noindex`, so the vercel.app address never competes with the real one. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | to turn on analytics | Microsoft Clarity loads only when this is set. Publish a privacy notice the same day. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | to change the form recipient | Overrides the key in `src/lib/web3forms.ts`. |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | to point a preview at the test key | Overrides the public key in `src/lib/paystack.ts`. **Public keys only**: a secret key here stops the build. |

All are `NEXT_PUBLIC_`, so they are baked in at build time: after adding or
changing one in Vercel, redeploy.

### Forms

The partnership, contact and newsletter forms post to Web3Forms straight from
the browser. **Each submission is emailed to the address the Web3Forms access
key was created with**; the site cannot choose a different recipient. To send
enquiries somewhere else, generate a new key at web3forms.com with that
address and set it as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.

There is no database. The prototype's SQLite layer was removed once Web3Forms
took over delivery, because a serverless filesystem loses a SQLite file on
every deployment. The forms never report success for a message that did not
go.

### Donations

The Get involved page takes online donations by card or mobile money through
Paystack's pop-up checkout (`src/components/site/donate-form.tsx`). Card and
mobile money details are entered in Paystack's frame, never on this site, and
every gift appears in Nkrabea's Paystack dashboard with what it was for, the
donor's name and a reference starting `NKR-`.

- **Only the public key is used** (`pk_live_...`). It lives in
  `src/lib/paystack.ts`. Until it is set, the form does not render and the
  page shows card giving as being set up.
- **A secret key (`sk_...`) must never be in this repository or in a
  `NEXT_PUBLIC_` variable.** `next.config.ts` scans both on every build and
  refuses to continue if it finds one. If a secret key is ever exposed,
  regenerate it in Paystack.
- There is no server, so payments are not re-verified through Paystack's API.
  Nothing is released on the strength of the checkout's success message
  except a thank-you; the Paystack dashboard is the record of what was paid.

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
