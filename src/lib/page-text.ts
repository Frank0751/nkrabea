import registry from "../../studio/page-text.json";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "./sanity";
import {
  PAGE_TEXT_DEFAULTS,
  type TextValue,
  type Stat,
  type NamedValue,
  type Step,
  type Cta,
  type Card,
} from "./page-text-defaults";
import type { Photo } from "./content";

/**
 * Editable slots on each page. studio/page-text.json lists them (the Studio
 * builds its forms from it), page-text-defaults.ts holds the original value of
 * each, and Sanity holds whatever editors have changed. An empty slot in
 * Sanity shows the original, which is how an editor reverts a change.
 *
 * Pages read slots with typed getters (t.s("missionTitle"), t.photo(...)).
 * Asking for a slot that is not in the registry, or with the wrong getter,
 * throws during the build, so a typo cannot reach the live site.
 */

export type PageId = keyof typeof registry.pages;
type Kind = "toggle" | "string" | "text" | "photo" | "photos" | "lines" | "cta" | "stats" | "values" | "steps" | "cards";

const KINDS: Record<string, Record<string, Kind>> = {};
for (const [page, def] of Object.entries(registry.pages)) {
  KINDS[page] = {};
  for (const section of def.sections) {
    for (const field of section.fields) KINDS[page][field.name] = field.kind as Kind;
  }
  for (const name of Object.keys(KINDS[page])) {
    if (!(name in (PAGE_TEXT_DEFAULTS[page] ?? {}))) {
      throw new Error(`page-text: ${page}.${name} has no default in page-text-defaults.ts`);
    }
  }
  for (const name of Object.keys(PAGE_TEXT_DEFAULTS[page] ?? {})) {
    if (!(name in KINDS[page])) {
      throw new Error(`page-text: default ${page}.${name} is not in studio/page-text.json`);
    }
  }
}

export const PAGE_IDS = Object.keys(registry.pages) as PageId[];

/** The Sanity document that holds each page's slots. */
export const PAGE_DOC_IDS: Record<PageId, string> = {
  homePage: "homePage",
  aboutPage: "aboutPage",
  leadershipPage: "leadershipPage",
  programmesPage: "page-programmes",
  impactPage: "impactPage",
  partnerPage: "page-partner",
  getInvolvedPage: "page-getInvolved",
  newsPage: "page-news",
  contactPage: "contactPage",
};

/* ------------------------------------------------------- Sanity photos */

type RawImage = { asset?: { _ref?: string }; hotspot?: { x?: number; y?: number } };
export type RawPhoto = {
  image?: RawImage;
  url?: string;
  alt?: string;
  caption?: string;
  fit?: "cover" | "contain";
} | null | undefined;

/**
 * A Sanity image reference ("image-<id>-<w>x<h>-<ext>") is enough to build
 * its CDN address, so photos in any slot work without a dereferencing query.
 */
export function imageUrlFromRef(ref: string | undefined): string | undefined {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref ?? "");
  if (!m) return undefined;
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${m[1]}-${m[2]}.${m[3]}`;
}

export function photoFromRaw(raw: RawPhoto): Photo | undefined {
  if (!raw) return undefined;
  const src = imageUrlFromRef(raw.image?.asset?._ref) ?? raw.url;
  if (!src) return undefined;
  const photo: Photo = { src, alt: raw.alt ?? "" };
  if (raw.caption) photo.caption = raw.caption;
  if (raw.fit) photo.fit = raw.fit;
  const { x, y } = raw.image?.hotspot ?? {};
  if (typeof x === "number" && typeof y === "number") {
    photo.position = `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
  }
  return photo;
}

const photosFromRaw = (list: unknown): Photo[] =>
  Array.isArray(list) ? list.map((p) => photoFromRaw(p as RawPhoto)).filter((p): p is Photo => Boolean(p)) : [];

/* ------------------------------------------------------------ resolving */

const isEmpty = (v: unknown) =>
  v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0);

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function resolve(kind: Kind, raw: unknown): TextValue | undefined {
  if (isEmpty(raw)) return undefined;
  switch (kind) {
    case "toggle":
      return typeof raw === "boolean" ? raw : undefined;
    case "string":
    case "text":
      return str(raw) || undefined;
    case "photo":
      return photoFromRaw(raw as RawPhoto);
    case "photos": {
      const list = photosFromRaw(raw);
      return list.length ? list : undefined;
    }
    case "lines": {
      const list = (raw as unknown[]).map(str).filter(Boolean);
      return list.length ? list : undefined;
    }
    case "cta": {
      const r = raw as Record<string, unknown>;
      return {
        title: str(r.title),
        description: str(r.description),
        primaryLabel: str(r.primaryLabel),
        secondaryLabel: str(r.secondaryLabel),
      };
    }
    case "stats":
      return (raw as Record<string, unknown>[]).map((r) => {
        const s: Stat = { value: str(r.value), label: str(r.label) };
        if (str(r.note)) s.note = str(r.note);
        return s;
      });
    case "values":
      return (raw as Record<string, unknown>[])
        .map((r) => ({ name: str(r.name), value: Number(r.value) }))
        .filter((v) => v.name && Number.isFinite(v.value));
    case "steps":
      return (raw as Record<string, unknown>[]).map((r) => ({ title: str(r.title), body: str(r.body) }));
    case "cards":
      return (raw as Record<string, unknown>[]).map((r) => {
        const c: Card = { title: str(r.title), body: str(r.body) };
        const photo = photoFromRaw(r.photo as RawPhoto);
        if (photo) c.photo = photo;
        if (str(r.icon)) c.icon = str(r.icon);
        if (str(r.linkLabel)) c.linkLabel = str(r.linkLabel);
        if (str(r.link)) c.link = str(r.link);
        return c;
      });
  }
}

export class PageText {
  constructor(
    private readonly page: PageId,
    private readonly raw: Record<string, unknown> | null | undefined
  ) {}

  private get<T extends TextValue>(name: string, kinds: Kind[]): T {
    const kind = KINDS[this.page]?.[name];
    if (!kind) throw new Error(`page-text: ${this.page}.${name} is not in studio/page-text.json`);
    if (!kinds.includes(kind)) throw new Error(`page-text: ${this.page}.${name} is a ${kind}`);
    const fallback = PAGE_TEXT_DEFAULTS[this.page][name];
    const value = resolve(kind, this.raw?.[name]);
    if (kind === "cta" && value) {
      // Each line of the box falls back on its own, so clearing one line
      // restores that line rather than leaving it blank.
      const v = value as Cta;
      const d = fallback as Cta;
      return {
        title: v.title || d.title,
        description: v.description || d.description,
        primaryLabel: v.primaryLabel || d.primaryLabel,
        secondaryLabel: v.secondaryLabel || d.secondaryLabel,
      } as T;
    }
    return (value ?? fallback) as T;
  }

  /** A section's on/off switch. Sections are shown unless switched off. */
  on(name: string): boolean {
    return this.get<boolean>(name, ["toggle"]);
  }
  /** A string or text slot. */
  s(name: string): string {
    return this.get<string>(name, ["string", "text"]);
  }
  photo(name: string): Photo {
    return this.get<Photo>(name, ["photo"]);
  }
  photos(name: string): Photo[] {
    return this.get<Photo[]>(name, ["photos"]);
  }
  lines(name: string): string[] {
    return this.get<string[]>(name, ["lines"]);
  }
  cta(name = "cta"): Cta {
    return this.get<Cta>(name, ["cta"]);
  }
  stats(name: string): Stat[] {
    return this.get<Stat[]>(name, ["stats"]);
  }
  values(name: string): NamedValue[] {
    return this.get<NamedValue[]>(name, ["values"]);
  }
  steps(name: string): Step[] {
    return this.get<Step[]>(name, ["steps"]);
  }
  cards(name: string): Card[] {
    return this.get<Card[]>(name, ["cards"]);
  }
}
