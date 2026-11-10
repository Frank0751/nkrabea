import { cache } from "react";
import { sanityClient, CONTENT_REVALIDATE_SECONDS } from "./sanity";
import * as D from "./content";
import type {
  Photo,
  Person,
  Programme,
  Figure,
  Milestone,
  EventItem,
  PressItem,
  Testimonial,
  Story,
  StoryPress,
  FAQ,
  GalleryItem,
  FocusArea,
  PageHeroContent,
  HeroKey,
} from "./content";

/**
 * Everything editors can change, in the shapes the pages already use.
 *
 * The site reads Sanity through getSiteContent(). content.ts remains the
 * default: it is what the site shows before the first import has run, and
 * what it falls back to if Sanity cannot be reached, so an outage at Sanity
 * shows slightly older content rather than a broken page.
 *
 * Once Sanity holds the site settings (the import creates them), Sanity is
 * the source of truth for every list. An editor who deletes every event gets
 * no events, not content.ts's events back.
 *
 * Not editable here, on purpose: section headings and layout, the charts
 * (drawn from the programme designs in PROGRAMME_FIGURES), the logo, the
 * audiences, the art forms, and NEEDS_EVIDENCE.
 */

export type SiteContent = {
  org: typeof D.ORG;
  homeHero: { headline: string; highlight: string; lead: string; reel: Photo[] };
  heroes: Record<HeroKey, PageHeroContent>;
  identity: { lead: string; whoWeAre: string[] };
  mission: string;
  vision: string;
  values: readonly string[];
  focus: FocusArea[];
  whatWeDo: string[];
  founders: Person[];
  board: Person[];
  governanceNote: string;
  managementRoles: string[];
  programmes: Programme[];
  figures: Figure[];
  milestones: Milestone[];
  gallery: GalleryItem[];
  events: EventItem[];
  press: PressItem[];
  testimonials: Testimonial[];
  stories: Story[];
  faqs: FAQ[];
};

export const DEFAULT_CONTENT: SiteContent = {
  org: D.ORG,
  homeHero: { ...D.HOME_HERO, reel: D.REEL },
  heroes: D.PAGE_HEROES,
  identity: D.IDENTITY,
  mission: D.MISSION,
  vision: D.VISION,
  values: D.VALUES,
  focus: D.STRATEGIC_FOCUS,
  whatWeDo: D.WHAT_WE_DO,
  founders: D.FOUNDERS,
  board: D.BOARD,
  governanceNote: D.GOVERNANCE_NOTE,
  managementRoles: D.MANAGEMENT_ROLES,
  programmes: D.PROGRAMMES,
  figures: D.FIGURES,
  milestones: D.MILESTONES,
  gallery: D.GALLERY,
  events: D.EVENTS,
  press: D.PRESS,
  testimonials: D.TESTIMONIALS,
  stories: D.STORIES,
  faqs: D.FAQS,
};

/* --------------------------------------------------------------- the query */

const PHOTO = `alt, caption, fit, url, "asset": image.asset->{url, "lqip": metadata.lqip}, "hotspot": image.hotspot`;
const HERO = `eyebrow, title, description, "photo": photo{${PHOTO}}`;

const QUERY = `{
  "settings": *[_id == "siteSettings"][0]{legalName, name, shortName, motto, registration, incorporated, areaOfOperation, headOffice, postalAddress, phones, email, momo, whatsapp},
  "home": *[_id == "homePage"][0]{headline, highlight, lead, "reel": reel[]{${PHOTO}}},
  "about": *[_id == "aboutPage"][0]{"hero": hero{${HERO}}, whoWeAre, mission, vision, values, "focus": focus[]{_key, icon, title, description}, whatWeDo},
  "leadership": *[_id == "leadershipPage"][0]{"hero": hero{${HERO}}, governanceNote, "founders": founders[]{name, role, bio, "photo": photo{${PHOTO}}}, "board": board[]{name, role}, managementRoles},
  "impact": *[_id == "impactPage"][0]{"hero": hero{${HERO}}, "figures": figures[]{value, label, kind, source}, "milestones": milestones[]{year, title, description}, "gallery": gallery[]{_key, ${PHOTO}}},
  "contact": *[_id == "contactPage"][0]{"hero": hero{${HERO}}, "faqs": faqs[]{question, answer}},
  "basicPages": *[_type == "basicPage"]{_id, "hero": hero{${HERO}}},
  "programmes": *[_type == "programme" && defined(slug.current)] | order(order asc, name asc){name, "id": slug.current, status, summary, details, value, sdgs},
  "stories": *[_type == "story" && defined(slug.current)] | order(date desc){"id": slug.current, category, title, date, displayDate, place, excerpt, body, learnt, thanks, source, "photos": photos[]{${PHOTO}}, "moments": moments[]{${PHOTO}}, press{outlet, headline, date, videoUrl, posterUrl, duration, note}},
  "events": *[_type == "event"] | order(date asc){_id, title, date, venue, type, status},
  "press": *[_type == "pressItem"] | order(order asc, _createdAt desc){name, context, date, link},
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt desc){quote, author, role, organisation}
}`;

/* ----------------------------------------------------------- raw shapes */

type RawPhoto = {
  alt?: string;
  caption?: string;
  fit?: "cover" | "contain";
  url?: string;
  asset?: { url?: string; lqip?: string } | null;
  hotspot?: { x?: number; y?: number } | null;
} | null;

type RawHero = {
  eyebrow?: string;
  title?: string;
  description?: string;
  photo?: RawPhoto;
} | null;

type Raw = {
  settings: Partial<Omit<typeof D.ORG, "whatsapp">> & { whatsapp?: string | null } | null;
  home: { headline?: string; highlight?: string; lead?: string; reel?: RawPhoto[] } | null;
  about: {
    hero?: RawHero;
    whoWeAre?: string;
    mission?: string;
    vision?: string;
    values?: string[];
    focus?: { _key: string; icon?: string; title?: string; description?: string }[];
    whatWeDo?: string[];
  } | null;
  leadership: {
    hero?: RawHero;
    governanceNote?: string;
    founders?: { name?: string; role?: string; bio?: string; photo?: RawPhoto }[];
    board?: { name?: string; role?: string }[];
    managementRoles?: string[];
  } | null;
  impact: {
    hero?: RawHero;
    figures?: { value?: string; label?: string; kind?: Figure["kind"]; source?: string }[];
    milestones?: { year?: string; title?: string; description?: string }[];
    gallery?: (NonNullable<RawPhoto> & { _key: string })[];
  } | null;
  contact: { hero?: RawHero; faqs?: { question?: string; answer?: string }[] } | null;
  basicPages: { _id: string; hero?: RawHero }[];
  programmes: {
    name?: string;
    id: string;
    status?: Programme["status"];
    summary?: string;
    details?: string[];
    value?: string;
    sdgs?: number[];
  }[];
  stories: {
    id: string;
    category?: string;
    title?: string;
    date?: string;
    displayDate?: string;
    place?: string;
    excerpt?: string;
    body?: string;
    learnt?: string[];
    thanks?: string;
    source?: string;
    photos?: RawPhoto[];
    moments?: RawPhoto[];
    press?: {
      outlet?: string;
      headline?: string;
      date?: string;
      videoUrl?: string;
      posterUrl?: string;
      duration?: string;
      note?: string;
    } | null;
  }[];
  events: { _id: string; title?: string; date?: string; venue?: string; type?: string; status?: EventItem["status"] }[];
  press: { name?: string; context?: string; date?: string; link?: string }[];
  testimonials: { quote?: string; author?: string; role?: string; organisation?: string }[];
};

/* --------------------------------------------------------------- mapping */

function toPhoto(raw: RawPhoto | undefined): Photo | undefined {
  if (!raw) return undefined;
  const src = raw.asset?.url ?? raw.url;
  if (!src) return undefined;
  const photo: Photo = { src, alt: raw.alt ?? "" };
  if (raw.caption) photo.caption = raw.caption;
  if (raw.fit) photo.fit = raw.fit;
  if (raw.asset?.lqip) photo.blur = raw.asset.lqip;
  const { x, y } = raw.hotspot ?? {};
  if (typeof x === "number" && typeof y === "number") {
    photo.position = `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
  }
  return photo;
}

function photos(raw: RawPhoto[] | undefined): Photo[] {
  return (raw ?? []).map(toPhoto).filter((p): p is Photo => Boolean(p));
}

function hero(raw: RawHero | undefined, fallback: PageHeroContent): PageHeroContent {
  if (!raw) return fallback;
  return {
    eyebrow: raw.eyebrow ?? fallback.eyebrow,
    title: raw.title ?? fallback.title,
    description: raw.description ?? undefined,
    photo: toPhoto(raw.photo) ?? undefined,
  };
}

/** Paragraphs separated by a blank line, as editors type them. */
function paragraphs(text: string | undefined): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-11-05" to "5 November 2026", without depending on the server locale. */
function longDate(iso: string | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? "");
  if (!m) return "";
  return `${Number(m[3])} ${LONG_MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

function fromSanity(r: Raw): SiteContent {
  const d = DEFAULT_CONTENT;
  const s = r.settings ?? {};
  const basic = (key: HeroKey) =>
    hero(r.basicPages.find((p) => p._id === `page-${key}`)?.hero, d.heroes[key]);

  const stories: Story[] = r.stories.map((x) => {
    const story: Story = {
      id: x.id,
      category: x.category ?? "Update",
      title: x.title ?? "",
      date: x.displayDate || longDate(x.date),
      isoDate: x.date ?? "",
      place: x.place ?? "",
      excerpt: x.excerpt ?? "",
      body: paragraphs(x.body),
      photos: photos(x.photos),
      source: x.source ?? "",
    };
    if (x.learnt?.length) story.learnt = x.learnt;
    if (x.thanks) story.thanks = x.thanks;
    const moments = photos(x.moments);
    if (moments.length) story.moments = moments;
    if (x.press?.outlet && x.press.videoUrl) {
      const press: StoryPress = {
        outlet: x.press.outlet,
        headline: x.press.headline ?? "",
        date: x.press.date ?? "",
        video: {
          src: x.press.videoUrl,
          poster: x.press.posterUrl ?? "",
          duration: x.press.duration ?? "",
        },
        note: x.press.note ?? "",
      };
      story.press = press;
    }
    return story;
  });

  return {
    org: {
      ...d.org,
      ...Object.fromEntries(
        Object.entries(s).filter(([, v]) => v !== null && v !== undefined && v !== "")
      ),
      phones: s.phones?.length ? s.phones : d.org.phones,
      whatsapp: s.whatsapp ? s.whatsapp : null,
    },
    homeHero: {
      headline: r.home?.headline ?? d.homeHero.headline,
      highlight: r.home?.highlight ?? d.homeHero.highlight,
      lead: r.home?.lead ?? d.homeHero.lead,
      reel: r.home?.reel?.length ? photos(r.home.reel) : d.homeHero.reel,
    },
    heroes: {
      about: hero(r.about?.hero, d.heroes.about),
      leadership: hero(r.leadership?.hero, d.heroes.leadership),
      impact: hero(r.impact?.hero, d.heroes.impact),
      contact: hero(r.contact?.hero, d.heroes.contact),
      programmes: basic("programmes"),
      partner: basic("partner"),
      getInvolved: basic("getInvolved"),
      news: basic("news"),
    },
    identity: {
      lead: r.home?.lead ?? d.identity.lead,
      whoWeAre: r.about?.whoWeAre ? paragraphs(r.about.whoWeAre) : d.identity.whoWeAre,
    },
    mission: r.about?.mission ?? d.mission,
    vision: r.about?.vision ?? d.vision,
    values: r.about?.values ?? d.values,
    focus: r.about?.focus
      ? r.about.focus.map((f) => ({ id: f.icon ?? f._key, title: f.title ?? "", description: f.description ?? "" }))
      : d.focus,
    whatWeDo: r.about?.whatWeDo ?? d.whatWeDo,
    founders: r.leadership?.founders
      ? r.leadership.founders.map((p) => {
          const person: Person = { name: p.name ?? "", role: p.role ?? "" };
          if (p.bio) person.bio = p.bio;
          const photo = toPhoto(p.photo);
          if (photo) person.image = photo.src;
          return person;
        })
      : d.founders,
    board: r.leadership?.board
      ? r.leadership.board.map((p) => ({ name: p.name ?? "", role: p.role ?? "" }))
      : d.board,
    governanceNote: r.leadership?.governanceNote ?? d.governanceNote,
    managementRoles: r.leadership?.managementRoles ?? d.managementRoles,
    programmes: r.programmes.map((p) => {
      const programme: Programme = {
        id: p.id,
        name: p.name ?? "",
        status: p.status ?? "fundraising",
        summary: p.summary ?? "",
        details: p.details ?? [],
      };
      if (p.value) programme.value = p.value;
      if (p.sdgs?.length) programme.sdgs = p.sdgs;
      return programme;
    }),
    figures: r.impact?.figures
      ? r.impact.figures.map((f) => ({
          value: f.value ?? "",
          label: f.label ?? "",
          kind: f.kind ?? "target",
          source: f.source ?? "",
        }))
      : d.figures,
    milestones: r.impact?.milestones
      ? r.impact.milestones.map((m) => ({ year: m.year ?? "", title: m.title ?? "", description: m.description ?? "" }))
      : d.milestones,
    gallery: r.impact?.gallery
      ? r.impact.gallery
          .map((g) => {
            const photo = toPhoto(g);
            return photo ? { id: g._key, ...photo } : undefined;
          })
          .filter((g): g is GalleryItem => Boolean(g))
      : d.gallery,
    events: r.events.map((e) => {
      const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(e.date ?? "");
      return {
        id: e._id,
        date: longDate(e.date),
        day: m ? m[3] : "",
        month: m ? MONTHS[Number(m[2]) - 1] : "",
        title: e.title ?? "",
        venue: e.venue ?? "",
        type: e.type ?? "",
        status: e.status ?? "upcoming",
      };
    }),
    press: r.press.map((p) => {
      const item: PressItem = { name: p.name ?? "", context: p.context ?? "", date: p.date ?? "" };
      if (p.link) item.href = p.link;
      return item;
    }),
    testimonials: r.testimonials.map((t) => {
      const item: Testimonial = { quote: t.quote ?? "", author: t.author ?? "", role: t.role ?? "" };
      if (t.organisation) item.organisation = t.organisation;
      return item;
    }),
    stories,
    faqs: r.contact?.faqs
      ? r.contact.faqs.map((f) => ({ question: f.question ?? "", answer: f.answer ?? "" }))
      : d.faqs,
  };
}

/**
 * Cached per request by React, and per CONTENT_REVALIDATE_SECONDS by Next's
 * fetch cache, so a page with ten components asking for content makes one
 * request to Sanity at most once a minute.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    const raw = await sanityClient.fetch<Raw>(QUERY, {}, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: ["sanity"] },
    });
    // No settings document means the import has not run yet.
    if (!raw?.settings) return DEFAULT_CONTENT;
    return fromSanity(raw);
  } catch (err) {
    console.error("Sanity could not be reached; showing built-in content.", err);
    return DEFAULT_CONTENT;
  }
});
