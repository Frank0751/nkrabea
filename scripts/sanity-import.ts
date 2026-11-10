/**
 * Copies the site's built-in content (src/lib/content.ts) into Sanity, so
 * editors start from what is on the site today instead of retyping it.
 *
 *   npm run cms:import
 *
 * Needs SANITY_API_WRITE_TOKEN in .env: an Editor token from
 * sanity.io/manage, project 31l59nsi, API, Tokens. The token stays on this
 * machine; the website never uses it.
 *
 * It never overwrites. Pages and settings are created only if they do not
 * exist yet, and programmes, stories, events, press and testimonials only
 * while Sanity has none of that type. Running it a second time changes
 * nothing, so an editor's work is never replaced by the old content.
 *
 * Photographs are not re-uploaded: each one links to its existing copy in
 * Nkrabea's Cloudinary library, which the website already serves quickly.
 */
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import * as C from "../src/lib/content";
import type { Photo, PageHeroContent } from "../src/lib/content";

const SITE_ORIGIN = "https://www.nkrabeacultureandarts.org";

function readEnv(name: string): string | undefined {
  if (process.env[name]) return process.env[name];
  const env = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";
  return env.match(new RegExp(`^${name}=["']?([^"'\\r\\n]+)`, "m"))?.[1];
}

const token = readEnv("SANITY_API_WRITE_TOKEN");
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN is not set in .env. Add an Editor token from sanity.io/manage first.");
  process.exit(1);
}

const client = createClient({
  projectId: "31l59nsi",
  dataset: "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

function photo(p: Photo | undefined) {
  if (!p) return undefined;
  // Sanity link fields need a full address; two artworks are site-relative.
  const url = p.src.startsWith("/") ? `${SITE_ORIGIN}${p.src}` : p.src;
  return {
    _type: "photo",
    url,
    alt: p.alt,
    ...(p.caption ? { caption: p.caption } : {}),
    ...(p.fit ? { fit: p.fit } : {}),
  };
}

const photos = (list: Photo[] | undefined) =>
  (list ?? []).map((p) => ({ _key: key(), ...photo(p)! }));

function hero(h: PageHeroContent) {
  return {
    _type: "pageHero",
    eyebrow: h.eyebrow,
    title: h.title,
    ...(h.description ? { description: h.description } : {}),
    ...(h.photo ? { photo: photo(h.photo) } : {}),
  };
}

const O = C.ORG;

type Doc = { _id: string; _type: string } & Record<string, unknown>;

const singletons: Doc[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    email: O.email,
    phones: O.phones,
    headOffice: O.headOffice,
    postalAddress: O.postalAddress,
    ...(O.whatsapp ? { whatsapp: O.whatsapp } : {}),
    momo: O.momo,
    name: O.name,
    legalName: O.legalName,
    shortName: O.shortName,
    motto: O.motto,
    registration: O.registration,
    incorporated: O.incorporated,
    areaOfOperation: O.areaOfOperation,
  },
  {
    _id: "homePage",
    _type: "homePage",
    headline: C.HOME_HERO.headline,
    highlight: C.HOME_HERO.highlight,
    lead: C.HOME_HERO.lead,
    reel: photos(C.REEL),
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    hero: hero(C.PAGE_HEROES.about),
    whoWeAre: C.IDENTITY.whoWeAre.join("\n\n"),
    mission: C.MISSION,
    vision: C.VISION,
    values: [...C.VALUES],
    focus: C.STRATEGIC_FOCUS.map((f) => ({
      _key: key(),
      _type: "focusArea",
      icon: f.id,
      title: f.title,
      description: f.description,
    })),
    whatWeDo: C.WHAT_WE_DO,
  },
  {
    _id: "leadershipPage",
    _type: "leadershipPage",
    hero: hero(C.PAGE_HEROES.leadership),
    governanceNote: C.GOVERNANCE_NOTE,
    founders: C.FOUNDERS.map((p) => ({
      _key: key(),
      _type: "founder",
      name: p.name,
      role: p.role,
      ...(p.bio ? { bio: p.bio } : {}),
      ...(p.image ? { photo: { _type: "photo", url: p.image, alt: `Portrait of ${p.name}` } } : {}),
    })),
    board: C.BOARD.map((p) => ({ _key: key(), _type: "boardMember", name: p.name, role: p.role })),
    managementRoles: C.MANAGEMENT_ROLES,
  },
  {
    _id: "impactPage",
    _type: "impactPage",
    hero: hero(C.PAGE_HEROES.impact),
    figures: C.FIGURES.map((f) => ({ _key: key(), _type: "figure", ...f })),
    milestones: C.MILESTONES.map((m) => ({ _key: key(), _type: "milestone", ...m })),
    gallery: photos(C.GALLERY),
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    hero: hero(C.PAGE_HEROES.contact),
    faqs: C.FAQS.map((f) => ({ _key: key(), _type: "faq", ...f })),
  },
  ...(["programmes", "partner", "getInvolved", "news"] as const).map((k) => ({
    _id: `page-${k}`,
    _type: "basicPage",
    hero: hero(C.PAGE_HEROES[k]),
  })),
];

const collections: Record<string, Record<string, unknown>[]> = {
  programme: C.PROGRAMMES.map((p, i) => ({
    _type: "programme",
    name: p.name,
    slug: { _type: "slug", current: p.id },
    status: p.status,
    summary: p.summary,
    details: p.details,
    ...(p.value ? { value: p.value } : {}),
    ...(p.sdgs ? { sdgs: p.sdgs } : {}),
    order: i + 1,
  })),
  story: C.STORIES.map((s) => ({
    _type: "story",
    title: s.title,
    slug: { _type: "slug", current: s.id },
    category: s.category,
    date: s.isoDate,
    displayDate: s.date,
    place: s.place,
    excerpt: s.excerpt,
    body: s.body.join("\n\n"),
    ...(s.learnt ? { learnt: s.learnt } : {}),
    ...(s.thanks ? { thanks: s.thanks } : {}),
    source: s.source,
    photos: photos(s.photos),
    ...(s.moments ? { moments: photos(s.moments) } : {}),
    ...(s.press
      ? {
          press: {
            _type: "storyPress",
            outlet: s.press.outlet,
            headline: s.press.headline,
            date: s.press.date,
            videoUrl: s.press.video.src,
            posterUrl: s.press.video.poster,
            duration: s.press.video.duration,
            note: s.press.note,
          },
        }
      : {}),
  })),
  // Built-in events carry display dates only and there are none today, so
  // events start empty in Sanity and are added there.
  event: [],
  pressItem: C.PRESS.map((p, i) => ({
    _type: "pressItem",
    name: p.name,
    context: p.context,
    date: p.date,
    ...(p.href ? { link: p.href } : {}),
    order: i + 1,
  })),
  testimonial: C.TESTIMONIALS.map((t, i) => ({ _type: "testimonial", ...t, order: i + 1 })),
};

async function main() {
  const tx = client.transaction();
  for (const doc of singletons) tx.createIfNotExists(doc);

  const skipped: string[] = [];
  let created = 0;
  for (const [type, docs] of Object.entries(collections)) {
    const existing = await client.fetch<number>(`count(*[_type == $type])`, { type });
    if (existing > 0) {
      skipped.push(`${type} (${existing} already in Sanity)`);
      continue;
    }
    for (const doc of docs) {
      tx.create(doc as { _type: string });
      created++;
    }
  }

  await tx.commit();
  console.log(`Pages and settings: ${singletons.length} ensured (existing ones left untouched).`);
  console.log(`Programmes, stories, press and the rest: ${created} created.`);
  if (skipped.length) console.log(`Skipped, because Sanity already has them: ${skipped.join(", ")}.`);
}

main().catch((err) => {
  console.error("Import failed:", err.message ?? err);
  process.exit(1);
});
