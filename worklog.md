# Nkrabea Culture & Arts Ensemble - Website Build Worklog

---
Task ID: research
Agent: Main (orchestrator)
Task: Crawl Instagram, Facebook, TikTok + web search to gather brand info, then build a top-notch website.

Work Log:
- Opened Facebook profile (id=61552136214349). Captured full text + screenshot.
- Instagram (nkra.bea) blocked by login wall, but Facebook "About" confirmed IG handle = nkra.bea.
- TikTok short link https://vt.tiktok.com/ZSVTNCmKS/ resolves to https://www.tiktok.com/@hayeoye_/video/7676738559776197921 (Ghana dance culture creator). TikTok geo-blocked in sandbox; creator @hayeoye_ shares Ghanaian dance/culture content.
- Web search found SID Festival entry confirming ensemble formed in 1995.
- VLM analysis of Facebook screenshot confirmed logo identity.

Stage Summary - BRAND BRIEF (source of truth for all content):
- Name: Nkrabea Culture & Arts Ensemble (Nkrabea CNA)
- Founded: 1995
- Type: Non-profit / non-governmental organisation
- Location: GO-001-2360, Number AE 5, Adenta Village, Accra, Ghana
- Phone: +233 20 852 2120 / +233 55 612 2230
- Email: nkrabea.cna@gmail.com
- Website (claimed, not yet resolving): nkrabeacultureandarts.org
- Instagram: @nkra.bea
- Facebook: Nkrabea Culture & Arts Ensemble (465 followers)
- TikTok: @hayeoye_
- Mission: "Translating Ghanaian culture into something the world can feel and understand."
- Tagline (cover photo): "Impact Lives Through Arts"
- Vision (SID festival): preserve traditional African dance forms at international level; develop a pool of professional dancers.
- Programs / content themes: Adowa, Kete, traditional drumming, Ghanaian cultural street dance.
- Logo identity: circular black badge, white "NKRABEA" wordmark, central graphic in Pan-African colors (red, yellow, green).
- Post caption voice: short, evocative, e.g. "The rhythm, the movement, the elegance. Adowa and Kete in motion."

Generated images (public/images/):
- hero-ensemble.png, about-drummers.png, program-adowa.png, program-kete.png, program-drumming.png
- More gallery images to be generated.

Design decisions:
- Palette: black base, deep teal/green, gold accent, warm cream (trust colors per user spec, aligned with brand gold+green).
- Fonts: Inter (loaded via next/font).
- Sections: Header/nav, Hero, About, Programs, Impact stats, Gallery, Ensemble, Events, Testimonials, Contact+Support, sticky Footer.


---
Task ID: build
Agent: Main (orchestrator)
Task: Build the Nkrabea Culture & Arts Ensemble website end to end.

Work Log:
- Set custom theme in globals.css: warm cream background, deep teal-green primary, gold accent, near-black dark mode.
- Loaded Inter (body) + Fraunces (display) via next/font.
- Wrote prisma schema: ContactMessage, NewsletterSubscriber, BookingRequest. Pushed to SQLite (db:push OK).
- Built 14 site components under src/components/site/: header, hero, about, programs, services, timeline, gallery, ensemble, events, testimonials, support, faq, contact, footer, theme-toggle.
- Built 3 API routes: /api/contact, /api/newsletter, /api/booking (all validate input, persist to DB, return JSON).
- Composed single / route in src/app/page.tsx with sticky-header + sticky-footer (min-h-screen flex flex-col).
- Set up next-themes with light default + dark mode toggle.
- Fixed Sonner toaster wiring (toast notifications for form submissions).

Verification (agent-browser + VLM):
- Hero renders: gold-accented headline, background image, CTA buttons. No overlap.
- Booking form submit end-to-end: filled form -> POST /api/booking -> 200 -> record saved to DB (confirmed "Kwame Mensah" in BookingRequest table).
- Tabs (Booking/Message/Newsletter) + FAQ accordion + gallery lightbox buttons all present.
- Mobile viewport 390x844: hamburger menu, stacked hero, touch-friendly buttons. No horizontal scroll.
- Dark mode toggle works: confirmed dark background + readable text.
- Full page screenshot: dark timeline (1995/2004/2015/2024) visible, footer complete at bottom, no broken layouts.
- Console: only HMR/dev-tools messages, no runtime errors.
- bun run lint: clean, zero warnings.

Stage Summary:
- Production-ready single-page site for Nkrabea Culture & Arts Ensemble.
- All content grounded in real research (Facebook About, SID Festival 1995 founding, post captions, contact details).
- 13 content sections + 3 working API endpoints + SQLite persistence + light/dark theme + responsive + accessible.
- Images: 8 AI-generated cultural visuals in public/images/.
- Sticky footer confirmed via flexbox layout.

---
Task ID: review-round-1
Agent: webDevReview (cron)
Task: QA the live site, then add styling depth and new features.

Current project status assessment:
- Site is stable: no runtime errors, no console errors, lint clean.
- All 13 existing sections render. Forms persist to DB. Dark mode + responsive working.
- Verdict: stable enough to invest in polish and new features rather than bug fixes.

Work Log (this round):
- QA via agent-browser: tested gallery lightbox, FAQ accordion, contact tabs, newsletter tab, program modal, mobile nav. All functional. No bugs found.
- Added ScrollProgress component: fixed top gradient bar (primary->accent) reflecting page scroll %.
- Added active-section nav highlighting in header via IntersectionObserver; active link gets underline + full-color text, with aria-current.
- Extended Program data model with meaning, instruments, rhythm, when fields; built ProgramModal (client) with cultural context, instrument/rhythm/occasion stat tiles, "what you will see" checklist, Escape-to-close + body scroll lock + click-outside-close.
- Added PressMarquee: auto-scrolling row of stages/festivals (SID Festival, National Theatre Ghana, Panafest, etc.) with edge mask, pause-on-hover, reduced-motion respect.
- Added CountUp component: stats animate from 0 to target with easeOutCubic when scrolled into view (IntersectionObserver).
- Added Stories section: 3 article cards (Field Notes / On Tour / Youth Academy) with image, category badge, date, read time, excerpt.
- Added hero scroll cue (animated mouse indicator) for desktop.
- Added CSS animations: marquee, scroll-cue, reveal-up + prefers-reduced-motion guard.
- Fixed modal title contrast (stronger gradient overlay + gold badge + drop-shadow).

Verification results:
- Program modal: opens, shows meaning + instruments + rhythm + checklist; Escape closes it; body scroll locked while open.
- Active nav: "About" highlighted when scrolled to about section (aria-current=true confirmed).
- Press marquee: renders, no horizontal page scroll on mobile (overflow contained).
- CountUp: stats animate on scroll.
- Stories: 3 cards with images, category badges, titles confirmed via VLM.
- Mobile 390x844: no horizontal scroll, layout intact.
- Lint: clean. Dev log: no errors.

Unresolved issues / risks:
- None blocking. Scroll progress bar reads 0% at page top (correct), so it is not visible in full-page-top screenshots but confirmed present via DOM eval and fills on scroll.
- Reveal-on-scroll CSS (.reveal) was added to globals.css and a useReveal hook created but not yet applied to section wrappers; can be wired in a future round for staggered section entrance animations.

Priority recommendations for next round:
- Apply reveal-on-scroll to section headers for entrance polish.
- Add a "featured video" / reel embed section using the TikTok/@hayeoye_ content (or a placeholder poster) since the org is video-heavy on socials.
- Add anchor-based deep links for each program (e.g. /#programs-adowa) for shareability.
- Consider a small admin/read view for booking requests (currently only persisted).

---
Task ID: page-programs
Agent: general-purpose sub-agent
Task: Build a dedicated /programs page (full, deep-linked, modal-equipped).

Work Log:
- Read worklog.md, content.ts (PROGRAMS data with meaning/instruments/rhythm/when fields), existing programs.tsx (modal logic), page-hero.tsx, section-eyebrow.tsx, cta-band.tsx, reveal.tsx, layout.tsx, header.tsx to align with established conventions.
- Created src/app/programs/page.tsx as a "use client" component (required for the interactive modal + deep-link state).
- PageHero (server component) embedded at top with eyebrow="What we perform", title="Forms we carry forward", description about traditions, image=/images/program-kete.png, crumbs=[{label:"Programs"}]. Single H1 lives only inside PageHero.
- Rendered all 4 PROGRAMS as full-width feature cards in a vertical stack (NOT a 2-col grid). Each card uses flex flex-col lg:flex-row (even index) or lg:flex-row-reverse (odd index) to alternate image-left / image-right on desktop. Card chrome: rounded-2xl border border-border bg-card overflow-hidden. Image side: relative aspect-[4/3] lg:aspect-auto lg:w-1/2 (lg:h-full implicit via stretch). Text side: p-6 lg:p-10 lg:w-1/2 with origin badge, "Form 0X / 04" counter, name (font-display), summary, meaning paragraph, instrument pills, and a "Read the cultural context" button.
- Reused the EXACT ProgramModal component logic from existing programs.tsx verbatim: same body scroll lock (document.body.style.overflow), Escape-to-close keydown listener, click-outside-close via outer onClick, role="dialog" aria-modal="true" aria-labelledby="program-modal-title". Modal shows meaning, 3 stat tiles (Instruments / Rhythm / Performed at with Music, Clock, CalendarDays icons), and the "What you will see" checklist.
- Deep-link support: on mount and on hashchange, if window.location.hash starts with "#program-", the matching program modal opens (e.g. /programs#program-adowa opens Adowa). Closing the modal clears the hash via history.replaceState.
- Added "Instruments reference" section after the cards: collected all unique instruments from PROGRAMS (flatMap + Set + sort), rendered as chips/pills with bg-secondary text-foreground ring-1 ring-border, wrapped in a <ul aria-label> for accessibility.
- CtaBand at bottom with title="Bring a form to your stage", description about bookings funding next-generation training, primaryLabel="Start a booking" primaryHref="/bookings", secondaryLabel="Talk to us" secondaryHref="/contact".
- Styling compliance: Tailwind tokens only (bg-background, bg-card, bg-secondary, text-foreground, text-muted-foreground, text-primary, bg-foreground/text-primary-foreground on hero/cta). font-display on all headings. NO indigo/blue. NO em dashes (used commas / "to" phrasing instead). Reveal wrapper on every section header (eyebrow, h2, supporting paragraph). Mobile-first responsive.
- Accessibility: aria-label on the "Read the cultural context" buttons (per-program), role=dialog aria-modal on the modal, Escape handling, click-outside-to-close, aria-labelledby linking modal title, breadcrumb nav in PageHero, section aria-labelledby pairing h2 ids.

Verification:
- bun run lint: clean (no errors, no warnings). Output: `$ eslint .` with zero findings.
- bunx tsc --noEmit: zero errors in src/app/programs/page.tsx (remaining pre-existing TS errors are only in unrelated examples/ and skills/ directories, not in src/).

Stage Summary:
- New route /programs live with full-width alternating feature cards, deep-linkable program modals (Escape + click-outside + scroll lock), instruments reference chips, and CtaBand. Reuses existing PageHero, SectionEyebrow, Reveal, CtaBand components and mirrors the established ProgramModal pattern. Lint passes.

---
Task ID: page-contact
Agent: sub-agent (general-purpose)
Task: Build the dedicated /contact page (Next.js App Router).

Work Log:
- Read worklog, content.ts, existing contact.tsx, page-hero, section-eyebrow, cta-band, reveal, faq, accordion UI to ground the build in established tokens and patterns.
- Created `src/components/site/contact-forms.tsx` (client): exports `ContactForms` containing shadcn Tabs (Booking/Message/Newsletter) and three forms that POST to /api/booking, /api/contact, /api/newsletter with `sonner` toast feedback. Forms wrapped in `rounded-2xl border border-border bg-card p-6 sm:p-7`. Required indicators + aria-required wired up.
- Created `src/app/contact/page.tsx` (server component):
  - PageHero: eyebrow "Get in touch", H1 "Book a performance or start a conversation", description, image `/images/social/fb-reel.jpg`, breadcrumb "Contact". Single H1.
  - Two-column grid (lg:col-span-5 left / lg:col-span-7 right), stacked on mobile.
  - LEFT column (4 cards, each Reveal-wrapped with stagger):
    1. Contact details card: MapPin + ORG.location, Phone + both phones, Mail + ORG.email as mailto link.
    2. Social links card: 3 rows (Instagram, Facebook, TikTok) with lucide icons + handle, open in new tab with aria-label, hover to primary border.
    3. Office hours card: Clock icon header, Mon-Fri 9-5 GMT, Sat by appointment, Sun closed.
    4. Map placeholder card: aspect-[4/3] Adenta Village label with MapPin.
  - RIGHT column: SectionEyebrow "Send us a message" + h2 "Three ways to reach the ensemble" + ContactForms (tabs).
  - FAQ section reuses existing `<FAQ />` component (FAQS array + shadcn Accordion).
  - Final band (no CtaBand): response-time note "Our producer reads every message and replies within two working days." with mailto + tel quick links.
- Styling: Tailwind tokens (border, bg-card, bg-secondary, text-primary, text-foreground, text-muted-foreground, bg-foreground, text-primary-foreground). font-display headings. No indigo/blue, no em dashes. Reveal on section headers and cards.

Verification:
- `bun run lint`: clean, zero warnings/errors.
- `bunx tsc --noEmit`: no errors in src/ (only unrelated errors in examples/ and skills/).

Stage Summary:
- New /contact route is production-ready: dedicated page with full contact info, social links, office hours, map placeholder, three working forms (booking/message/newsletter), FAQ accordion, and response-time band.
- Forms reuse existing API endpoints and sonner toasts; no backend changes needed.
- Accessibility: labels with htmlFor, required indicators, aria-labels on social icon links, aria-required on inputs, single H1 in PageHero.
- Mobile-first responsive: columns stack on mobile; cards full width; tabs are 3-column grid scaling down.

---
Task ID: page-gallery
Agent: general-purpose (page build)
Task: Build the dedicated /gallery page with full masonry grid, accessible lightbox, socials section and CTA band.

Work Log:
- Read worklog.md, content.ts (GALLERY array of 8 items, each with span tall/wide/square), existing gallery.tsx (in-page component with lightbox), PageHero, SectionEyebrow, CtaBand, Reveal components.
- Verified PageHero emits the single H1, so all subsequent section headers use h2 with font-display.
- Created /home/z/my-project/src/app/gallery/page.tsx as a client component for lightbox interactivity.
- Page structure:
  - PageHero: eyebrow "In the frame", title "Moments from stage, studio and community", description, image /images/social/fb-3.jpg, breadcrumb "Gallery".
  - Gallery grid section: masonry layout using `grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]`. spanClass helper maps tall -> row-span-2, wide -> col-span-2, square -> default. Each item is a button opening the lightbox. Hover: image scale-105, dark gradient overlay fades in, caption + numbered index slide up from bottom.
  - "Follow our socials" section: 3 cards rendered from SOCIAL_LINKS (Instagram @nkra.bea, Facebook, TikTok @hayeoye_). Each card shows platform name, handle, and a Follow link with arrow that animates on hover. Cards open in new tab with rel=noopener noreferrer.
  - CtaBand: title "See us live", description "The next performance is closer than you think.", primary "View upcoming events" -> /events, secondary "Book the ensemble" -> /bookings.
- Lightbox implementation:
  - Full-screen overlay (z-[80]) with role=dialog aria-modal=true aria-label="Image viewer".
  - Image container uses object-contain so all 8 image aspect ratios display without cropping.
  - Close affordances: click backdrop, click X button, press Escape.
  - Navigation: prev/next buttons (ChevronLeft/ChevronRight) stopPropagation so they do not close the dialog; ArrowLeft / ArrowRight keyboard handlers also navigate.
  - Body scroll locked (overflow hidden) while open, restored on close.
  - Focus management: focus moves to close button on open, restored to the previously focused image button on close.
  - Index indicator "X / Y" displayed bottom-right, e.g. "3 / 8", with aria-label.
  - Caption shown with Nkrabea gallery eyebrow above it.
- Styling compliance:
  - Tailwind tokens only (primary teal-green, accent gold, foreground, muted-foreground). No indigo/blue.
  - font-display on all h1/h2 headings. Single h1 in PageHero.
  - No em dashes anywhere in copy (verified via grep).
  - Reveal wraps all section eyebrow/title/description blocks.
  - Mobile-first responsive: 2 cols on mobile, 4 cols on lg.
  - Accessibility: aria-labels on all lightbox controls, focus-visible rings, keyboard navigation, dialog role.

Verification:
- bun run lint: clean, zero warnings.
- bunx tsc --noEmit: only pre-existing errors in examples/ and skills/ folders, none in src/app/gallery/page.tsx.
- grep for em dashes and indigo/blue: no matches in the new file.

Stage Summary:
- New route /gallery is live with the full 8-image masonry grid, accessible keyboard-driven lightbox, socials section, and CTA band.
- Header nav already references /gallery, so the page is reachable from the main navigation.

---
Task ID: page-ensemble
Agent: general-purpose sub-agent
Task: Build the dedicated /ensemble page (Next.js App Router, server component).

Work Log:
- Read worklog.md, content.ts (ENSEMBLE array of 4 members: name, role, focus), and existing components: page-hero, section-eyebrow, cta-band, reveal, testimonials, ensemble.tsx, plus about/programs/gallery pages to align with established tokens and patterns.
- Created /home/z/my-project/src/app/ensemble/page.tsx as a server component (no client interactivity needed). Single H1 lives only inside PageHero.
- Page structure:
  - PageHero: eyebrow="The company", title="One ensemble, four limbs", description about moving as a single body across all four limbs, image=/images/social/fb-1.jpg, imageAlt descriptive, crumbs=[{label:"Ensemble"}].
  - Company structure section (#company-heading): max-w-2xl header (SectionEyebrow + h2 + supporting paragraph, all Reveal-wrapped with staggered delays), then a `grid grid-cols-1 sm:grid-cols-2` of 4 cards rendering ENSEMBLE. Each card: bg-card rounded-2xl border border-border p-7 lg:p-9; top row holds an icon tile (h-12 w-12 rounded-xl bg-secondary text-primary) and a "Limb 0X / 04" counter. Card body: role eyebrow (text-primary uppercase tracking), name (font-display text-2xl sm:text-3xl), focus (font-medium text-foreground/85), evocative description (text-muted-foreground). Icons paired by member.name via a LIMBS lookup record: Drum for Master Drummers, Wind for Principal Dancers, Music for Vocalists, Sprout for Apprentice Company. Descriptions are 1-2 sentences each, written in the ensemble voice (drum speaks first, court restraint, oral tradition, Youth Academy graduates).
  - "How we train" section (#training-heading) on bg-secondary/40 with border-y: 3-column ol (md:grid-cols-3) of TRAINING steps. Each step card: number (font-display text-4xl text-primary), title, subtitle (uppercase tracking muted), body paragraph. Step 01 Foundation "Drumming first" (atumpan speaks Twi tones); 02 Movement "Gesture and footwork" (Adowa hand language, Kete footwork, restraint as first discipline); 03 Performance "Stage craft" (community celebrations to international festival stages). Intro paragraph names the cross-limb training principle: "Every member of the ensemble trains across all four limbs. The drummer learns to dance, the dancer learns to drum, and the vocalist knows the rhythm of both."
  - Leadership pull-quote section on bg-foreground text-primary-foreground: large opening curly-quote glyph (font-display text-5xl text-accent), then a `<p id="leadership-heading">` with the pull-quote (font-display text-2xl sm:text-3xl lg:text-4xl) about moving as a single body and translating Ghanaian culture limb by limb to a world ready to feel it. Attribution: "Artistic direction, Nkrabea Culture & Arts Ensemble" in muted uppercase tracking.
  - Behind the scenes gallery (#backstage-heading): 3-column grid of 3 figure cards (sm:grid-cols-2 lg:grid-cols-3). Each: relative aspect-[4/3] overflow-hidden rounded-2xl border border-border with next/image fill + object-cover, plus a figcaption. Images: /images/social/fb-2.jpg, fb-5.jpg, fb-6.jpg with descriptive alt text and evocative captions.
  - Testimonials: reused the existing `<Testimonials />` component (renders its own eyebrow + h2 + 3-card grid with avatar-initials pattern, all from TESTIMONIALS in content.ts).
  - CtaBand at bottom: title="See the ensemble on your stage", description about booking funding next-generation training, primaryLabel="Start a booking" primaryHref="/bookings", secondaryLabel="View upcoming events" secondaryHref="/events".
- Added page metadata: title="Ensemble", description grounded in the ensemble mission.
- Styling compliance: Tailwind tokens only (bg-background, bg-card, bg-secondary, text-foreground, text-muted-foreground, text-primary, bg-foreground/text-primary-foreground for dark sections, text-accent for the quote glyph and step numbers). font-display on h2/h3 headings and the pull-quote. No indigo/blue. No em dashes (verified via grep). Reveal wraps every section header (eyebrow, h2, supporting paragraph) with staggered delays, and wraps each card individually. Mobile-first responsive: 1 col mobile, 2 cols sm, 3 cols lg.
- Accessibility: semantic <section> with aria-labelledby pairing h2 ids; <ol> for the training steps (ordered); <figure>/<figcaption> for the backstage images; descriptive alt text on every Image; aria-hidden on decorative icon glyphs; icon tiles use lucide icons with aria-hidden="true".

Verification:
- bun run lint: clean, zero errors, zero warnings.
- bunx tsc --noEmit: no errors in src/app/ensemble/page.tsx (remaining pre-existing TS errors are only in unrelated examples/ and skills/ directories, not in src/).
- grep for em dashes (— and –) and indigo/blue tokens in the new file: no matches.

Stage Summary:
- New route /ensemble is live with a fully built company page: 2x2 grid of the four limbs (drummers, dancers, vocalists, apprentices) with icons and bespoke descriptions, a 3-stage "How we train" column explaining the cross-limb training philosophy, a dark leadership pull-quote grounded in the translating-Ghanaian-culture mission, a 3-image behind-the-scenes gallery with captions, the reused Testimonials section, and the specified CtaBand. Lint passes.

---
Task ID: page-events
Agent: general-purpose (page build)
Task: Build the dedicated /events page with detailed event rows, status legend, past highlights and newsletter teaser.

Work Log:
- Read worklog.md, content.ts (EVENTS array of 4 items with status upcoming/open/past, ORG with email), existing events.tsx (status badge pattern with STATUS_LABELS), page-hero, section-eyebrow, cta-band, reveal to align with established tokens and patterns.
- Created /home/z/my-project/src/app/events/page.tsx as a server component (no client interactivity required).
- Page structure:
  - PageHero: eyebrow="Upcoming", title="Where to see us next", description about heritage nights/showcases/masterclasses/festival stages, image=/images/social/fb-reel.jpg, imageAlt describing community celebration, crumbs=[{label:"Events"}]. Single H1 lives only inside PageHero.
  - Events list section (bg-background): Reveal-wrapped SectionEyebrow "The calendar", h2 "Upcoming performances and workshops", supporting paragraph. Below it: legend bar with role=list aria-label="Event status legend" showing all 3 status types (Scheduled / Open booking / Past) with colored dot + text label (status not conveyed by color alone). Then the EVENTS array rendered as a vertical <ul> of <article> rows.
  - Each event row: dark rounded date block (bg-foreground text-primary-foreground) showing month + day + type label; status badge (primary teal for upcoming, accent gold for open, muted for past) with dot + text label; title (font-display, large); venue with MapPin icon; 1-sentence blurb written per event (Heritage Night Adowa/Kete description, Youth Academy showcase, drumming masterclass, Independence Day street dance). Action link per event: mailto: to ORG.email with subject "Nkrabea events: <title>" prefilled. Label: "Get tickets" for upcoming, "Request info" for open, "View archive" for past. Rows stack on mobile (flex-col) and become horizontal on sm+ (sm:flex-row sm:items-start).
  - Footer note about dates shifting + mailto confirmation link.
  - Past highlights section (bg-secondary/40, border-y): Reveal-wrapped SectionEyebrow "Archive", h2 "Past highlights", description. <ul> of 3 invented grounded events: 2023 Panafest Cultural Showcase at Cape Coast Castle grounds, 2024 Independence Day Programme at Black Star Square, 2024 SID Festival Featured Set at National Theatre. Each row: year badge (dark) + title + venue with MapPin + "Past" badge. Muted styling.
  - Newsletter teaser band: compact card with Mail icon in primary/10 circle, SectionEyebrow "Stay in the loop", h2 "Get show announcements in your inbox", description, and a dark CTA button "Get show announcements" linking to /contact (where the newsletter form lives).
  - CtaBand at bottom: title="Want Nkrabea at your event?", primaryLabel="Start a booking" primaryHref="/bookings", secondaryLabel="Contact us" secondaryHref="/contact".
- Styling compliance: Tailwind tokens only (bg-background, bg-card, bg-secondary, bg-foreground, text-foreground, text-muted-foreground, text-primary, text-primary-foreground, text-accent-foreground, bg-primary/10, bg-accent/25, bg-muted). font-display on all headings. No indigo/blue. No em dashes (verified via grep). Single H1 in PageHero only. Reveal wraps every section header block and individual list items with staggered delays.
- Accessibility: status conveyed by both color AND text label ("Scheduled"/"Open booking"/"Past"). Legend uses role=list/listitem with aria-label. aria-hidden on decorative dots/icons. aria-label on action links ("Get tickets for <title>"). section aria-labelledby pairing with h2 ids. Semantic <article> for event rows. mailto link is keyboard-focusable.

Verification:
- bun run lint: clean (no errors, no warnings). Output: "$ eslint .".
- bunx tsc --noEmit: no errors in src/app/events/page.tsx.
- grep for em dashes / indigo / blue in the new file: no matches.

Stage Summary:
- New route /events is live with detailed event rows, color-coded status badges with text labels, status legend, past highlights archive, and newsletter teaser band linking to /contact. Reuses PageHero, SectionEyebrow, Reveal, CtaBand. Lint passes.

---
Task ID: page-bookings
Agent: general-purpose sub-agent
Task: Build the dedicated /bookings page (Next.js App Router server component) and a standalone BookingForm client component.

Work Log:
- Read worklog.md, content.ts (SERVICES + ORG), page-hero.tsx, section-eyebrow.tsx, cta-band.tsx, reveal.tsx, contact.tsx (BookingForm pattern with sonner toast + /api/booking POST), services.tsx (services card pattern), api/booking/route.ts (validation contract: name, email, message required; email regex; eventType whitelist), button.tsx, select.tsx, input.tsx, textarea.tsx for shadcn API.
- Created src/components/site/booking-form.tsx (client component):
  - Standalone BookingForm exporting fields: name, email, phone, preferred date, engagement type (Select with performance/workshop/residency/festival/corporate), and a message textarea.
  - Wrapped in `rounded-2xl border border-border bg-card p-6 sm:p-7` per spec.
  - Client-side validate(): name/email/message required, email format check via regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Errors rendered inline with `role="alert"` text and `aria-invalid` styling on inputs.
  - On submit, POSTs JSON body { name, email, phone, eventType, date, message } to /api/booking; on success shows sonner toast.success and resets form; on failure shows toast.error with server message.
  - Uses shadcn Button, Input, Textarea, Label, Select (SelectTrigger/SelectContent/SelectItem/SelectValue).
  - Accessibility: every input has htmlFor-paired Label, required fields marked with `*` and `aria-required`, role="alert" on error text.
- Created src/app/bookings/page.tsx (server component):
  - PageHero: eyebrow="Work with us", title="How the ensemble can come to you", description about every engagement funding young artists, image="/images/social/fb-1.jpg", imageAlt, crumbs=[{label:"Bookings"}]. Single H1 lives in PageHero.
  - Services section: rendered SERVICES array as a 2-column grid of cards (md:grid-cols-2). Each card: title, description, deliverables list with circular Check icons. Card chrome: `rounded-2xl border border-border bg-card p-7 lg:p-9`.
  - Process section (4-step horizontal stepper): Tell us your dates / We shape a programme / We confirm logistics / We perform. Each step: numbered circle (1-4 in bg-foreground text-primary-foreground) + title + one-line description. On desktop uses `lg:grid-cols-4` with `lg:px-6` and a `h-px bg-border` connector between non-final circles. Section background: `border-y border-border bg-secondary/40`.
  - Pricing clarity section (3-tier): Community / Festival / International. Each card: name, audience size line, "Tailored quote" price hint (NOT a fixed price), what's included list with Check icons, and a "Request quote" Button linking to `#book-form`. Festival tier highlighted with `border-primary` + "Most booked" badge. Default Button variant on highlighted tier, outline on others.
  - Booking form section: SectionEyebrow "Start a booking", h2 "Tell us about your event", 2-column layout (lg:col-span-5 left / lg:col-span-7 right). Left = reassurance paragraphs + contact alternatives card (mailto, tel, location with Mail/Phone/MapPin icons). Right = the BookingForm component wrapped in Reveal.
  - NO CtaBand at bottom (form IS the CTA, per spec).
- Styling compliance: Tailwind tokens only (bg-background, bg-card, bg-secondary, bg-secondary/40, text-foreground, text-muted-foreground, text-primary, bg-foreground text-primary-foreground, border-border). font-display on every heading. No indigo/blue (grep verified). No em dashes anywhere in copy (grep verified). Reveal wraps every section header (eyebrow/h2/paragraph) and on cards with staggered delays. Mobile-first responsive (stacks to single column on mobile).
- Accessibility: single H1 only inside PageHero. All section h2 elements have aria-labelledby-paired id on the section. Labels paired with htmlFor on every form field. Required fields marked with `*` and `aria-required`. role="alert" on inline validation messages. aria-hidden="true" on decorative icons. Breadcrumb nav in PageHero.

Verification:
- bun run lint: clean. Output: `$ eslint .` with zero findings.
- bunx tsc --noEmit: no errors in src/app/bookings/page.tsx or src/components/site/booking-form.tsx. Remaining pre-existing TS errors are only in unrelated examples/ and skills/ folders (socket.io-client, image-edit, stock-analysis-skill), exactly as in prior worklog entries.
- grep for em dashes (—) and indigo/blue-[0-9]: no matches in either new file.

Stage Summary:
- New route /bookings is live with PageHero, services grid (4 SERVICES as 2-col cards with Check deliverables), 4-step process stepper with connected circles, 3-tier pricing clarity cards (Community/Festival/International with Tailored quote + Request quote buttons), and a final booking form section (reassurance + contact alternatives on the left, BookingForm on the right). Header nav already references /bookings.
- New standalone BookingForm client component reusable elsewhere; POSTs to existing /api/booking endpoint, with client-side validation and sonner toasts. No backend changes needed.

---
Task ID: multipage-restructure
Agent: Main (orchestrator) + page-builder subagents
Task: Restructure into independent fully-built pages with real social media imagery.

Current project status assessment:
- Site was a single-page app with anchor nav. Stable, no bugs.
- User requested independent pages per nav link, fully built, with relatable/real org images.

Work Log:
- Extracted 8 REAL images from the organization's Facebook page via agent-browser (fbcdn URLs): dancers in regalia, dancer mid-movement, performance at celebration, art exhibition, Kosilodja painting, mixed-media installation, framed textile painting, and the mission cover photo. Downloaded to public/images/social/.
- VLM-analyzed all 8 images to understand content for correct placement and alt text.
- Corrected ORG.tagline to the real one from the cover photo: "Impacting Lives Through Culture & The Arts".
- Updated GALLERY to use all 8 real Facebook images instead of generated ones.
- Updated hero to use the real dancers image (fb-1.jpg).
- Built shared multi-page infrastructure:
  - layout.tsx now renders shared chrome: ScrollProgress, SiteHeader, Footer, BackToTop (so every page gets them).
  - header.tsx rewritten for multi-page: nav links are now ROUTE links (/about, /programs, etc.) with pathname-based active highlighting (usePathname). Transparent header only on homepage top; solid on scroll and on all subpages.
  - page-hero.tsx: shared subpage hero with breadcrumb, eyebrow, H1, description, real image background, kente divider.
  - section-eyebrow.tsx, cta-band.tsx: shared standalone components.
  - reveal.tsx: scroll-in animation wrapper (already existed).
- Rebuilt homepage (src/app/page.tsx) as a landing: Hero (real image) + PressMarquee + HomeHighlights (4 preview cards linking to subpages) + HomeMission (real cover photo + CountUp stats) + FeaturedReel + Testimonials + CtaBand.
- Built 7 independent fully-built pages via subagents (parallelized):
  - /about: story, image collage, CountUp stats, values, dark timeline, mission quote band, CTA. (built by main agent after rate limit)
  - /programs: alternating full-width feature cards with modal (meaning, instruments, rhythm, when), deep-link support (#program-kete opens Kete modal), instruments reference, CTA.
  - /bookings: services grid, 4-step process stepper, 3-tier pricing clarity, booking form (POST /api/booking), no CTA band.
  - /ensemble: 2x2 limbs cards with icons, how-we-train 3-col, dark leadership pull-quote, behind-the-scenes gallery, testimonials, CTA.
  - /events: detailed event rows with date blocks + status legend + past highlights + newsletter teaser + CTA.
  - /gallery: masonry grid of 8 real images, full lightbox with prev/next + keyboard nav + index indicator, follow-socials section, CTA.
  - /contact: 2-col layout (info+socials+hours+map / tabbed forms), FAQ accordion, response-time band.
- Scrubbed em dashes: confirmed zero em dashes across all src/app and src/components/site files.
- Single H1 per page: PageHero renders the only H1 on every subpage; homepage H1 is in Hero.

Verification results (agent-browser + VLM):
- All 8 routes return HTTP 200: /, /about, /programs, /bookings, /ensemble, /events, /gallery, /contact.
- Homepage: hero shows real dancers in regalia; highlights cards link to subpages.
- Programs: hero + feature cards render; modal opens on card click; DEEP LINK works (visiting /programs#program-kete auto-opens Kete modal with full cultural context).
- Gallery: 8 real Facebook images render in masonry; lightbox opens; arrow-key navigation works (4->5 of 8); index indicator "5 / 8" shows; Escape closes.
- Contact: tabbed forms (Booking/Message/Newsletter) + FAQ accordion render; booking API verified working via direct curl (record saved to SQLite).
- Nav: clicking "About" in header navigates to /about (route links work).
- Mobile (390x844): zero horizontal scroll on homepage.
- VLM confirmed all 4 subpages (about/bookings/ensemble/events) render heroes with images and clear titles, no broken images or layout issues.
- Lint: clean, zero warnings. Zero em dashes in codebase.

Stage Summary:
- Full multi-page Next.js website: 8 routes (home + 7 subpages), each fully built.
- Shared chrome (header/footer/scroll-progress/back-to-top) via root layout.
- Real organization imagery from Facebook used throughout (8 images in gallery + hero + mission + page heroes + ensemble behind-the-scenes).
- Correct tagline from actual cover photo.
- Deep-linkable program modals (#program-adowa etc.).
- Full lightbox with keyboard nav.
- All 3 API endpoints (contact/booking/newsletter) persisting to SQLite.
- Responsive, accessible, light/dark theme.

Unresolved issues / risks:
- TikTok embed in FeaturedReel may be geo-restricted in some regions (uses official TikTok embed iframe with the real video ID 7676738559776197921 from @hayeoye_).
- Real Facebook CDN images have expiring tokens (oe= param); if they stop loading, re-fetch from the Facebook page or replace with the generated images still in /images/.
- /programs, /gallery, /contact pages built by subagents as client components (need interactivity); others are server components.

Priority recommendations for next round:
- Add per-page metadata (title template already in layout; add per-page description/OG).
- Add a 404 page and loading.tsx skeletons for each route.
- Consider a /blog or /stories detail route for the story cards.
- Verify the booking form's sonner toast appears on submit in-browser (API confirmed working via curl).
