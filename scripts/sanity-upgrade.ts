/**
 * One-off upgrade of the content already in Sanity to the page-section
 * layout of November 2026, so editors open each page and see the words the
 * site shows today, ready to change.
 *
 *   npx tsx scripts/sanity-upgrade.ts
 *
 * Needs SANITY_API_WRITE_TOKEN in .env. Safe to run again: it fills only
 * fields that are empty, and never replaces an editor's work.
 *
 * - Our Work, Partner, Get Involved and News become page types of their own
 *   (they were one shared "basic page"), keeping their banners.
 * - Every section field on every page is filled with the site's current
 *   wording from src/lib/page-text-defaults.ts.
 * - Site settings gain the social media accounts and the footer sentence.
 * - Programmes gain their photos; stories gain the heading over extra photos.
 */
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import * as C from "../src/lib/content";
import type { Photo } from "../src/lib/content";
import { PAGE_TEXT_DEFAULTS, type Card, type Cta, type TextValue } from "../src/lib/page-text-defaults";
import { PAGE_DOC_IDS, type PageId } from "../src/lib/page-text";
import registry from "../studio/page-text.json";

const SITE_ORIGIN = "https://www.nkrabeacultureandarts.org";

function readEnv(name: string): string | undefined {
  if (process.env[name]) return process.env[name];
  const env = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";
  return env.match(new RegExp(`^${name}=["']?([^"'\\r\\n]+)`, "m"))?.[1];
}

const token = readEnv("SANITY_API_WRITE_TOKEN");
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN is not set in .env.");
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

function photo(p: Photo) {
  const url = p.src.startsWith("/") ? `${SITE_ORIGIN}${p.src}` : p.src;
  return {
    _type: "photo",
    url,
    alt: p.alt,
    ...(p.caption ? { caption: p.caption } : {}),
    ...(p.fit ? { fit: p.fit } : {}),
  };
}

/** A slot's default, in the shape its Studio field stores. */
function toSanity(kind: string, v: TextValue): unknown {
  switch (kind) {
    case "toggle":
    case "string":
    case "text":
    case "lines":
      return v;
    case "photo":
      return photo(v as Photo);
    case "photos":
      return (v as Photo[]).map((p) => ({ _key: key(), ...photo(p) }));
    case "cta":
      return { _type: "ctaBand", ...(v as Cta) };
    case "stats":
      return (v as object[]).map((x) => ({ _key: key(), _type: "statItem", ...x }));
    case "values":
      return (v as object[]).map((x) => ({ _key: key(), _type: "namedValue", ...x }));
    case "steps":
      return (v as object[]).map((x) => ({ _key: key(), _type: "step", ...x }));
    case "cards":
      return (v as Card[]).map(({ photo: p, ...rest }) => ({
        _key: key(),
        _type: "card",
        ...rest,
        ...(p ? { photo: photo(p) } : {}),
      }));
    default:
      throw new Error(`unknown kind ${kind}`);
  }
}

const NEW_TYPES: Partial<Record<PageId, string>> = {
  programmesPage: "programmesPage",
  partnerPage: "partnerPage",
  getInvolvedPage: "getInvolvedPage",
  newsPage: "newsPage",
};

async function retype(id: string, type: string) {
  for (const docId of [id, `drafts.${id}`]) {
    const doc = await client.getDocument(docId);
    if (!doc || doc._type === type) continue;
    const { _rev, _createdAt, _updatedAt, ...rest } = doc as Record<string, unknown>;
    void _rev;
    void _createdAt;
    void _updatedAt;
    await client.createOrReplace({ ...rest, _id: docId, _type: type } as { _id: string; _type: string });
    console.log(`  ${docId}: now a ${type} document`);
  }
}

async function main() {
  console.log("Pages");
  for (const page of Object.keys(registry.pages) as PageId[]) {
    const id = PAGE_DOC_IDS[page];
    const type = NEW_TYPES[page];
    if (type && !process.argv.includes("--skip-retype")) await retype(id, type);

    const exists = await client.getDocument(id);
    if (!exists) {
      console.log(`  ${id}: missing, skipped (run npm run cms:import first)`);
      continue;
    }
    const defaults = PAGE_TEXT_DEFAULTS[page];
    const fill: Record<string, unknown> = {};
    for (const section of registry.pages[page].sections) {
      for (const slot of section.fields) {
        if (!(slot.name in defaults)) throw new Error(`${page}.${slot.name} has no default`);
        fill[slot.name] = toSanity(slot.kind, defaults[slot.name]);
      }
    }
    await client.patch(id).setIfMissing(fill).commit();
    console.log(`  ${id}: ${Object.keys(fill).length} section fields filled where empty`);
  }

  console.log("Site settings");
  await client
    .patch("siteSettings")
    .setIfMissing({
      socials: C.SOCIALS.map((s) => ({ _key: key(), _type: "social", platform: s.platform, url: s.url })),
      footerText: C.FOOTER_TEXT,
    })
    .commit();

  console.log("Programmes");
  for (const p of C.PROGRAMMES) {
    const docs = await client.fetch<{ _id: string }[]>(`*[_type == "programme" && slug.current == $slug]{_id}`, {
      slug: p.id,
    });
    for (const d of docs) {
      if (p.photos?.length) {
        await client
          .patch(d._id)
          .setIfMissing({ photos: p.photos.map((ph) => ({ _key: key(), ...photo(ph) })) })
          .commit();
        console.log(`  ${d._id}: photos filled where empty`);
      }
    }
  }

  console.log("Stories");
  for (const s of C.STORIES) {
    if (!s.momentsTitle) continue;
    const docs = await client.fetch<{ _id: string }[]>(`*[_type == "story" && slug.current == $slug]{_id}`, {
      slug: s.id,
    });
    for (const d of docs) {
      await client.patch(d._id).setIfMissing({ momentsTitle: s.momentsTitle }).commit();
      console.log(`  ${d._id}: heading over extra photos filled where empty`);
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
