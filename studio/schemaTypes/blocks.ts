import { defineField, defineType } from "sanity";

/* Building blocks for the page slots listed in studio/page-text.json. */

export const statItem = defineType({
  name: "statItem",
  title: "Fact",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Big text",
      type: "string",
      description: "e.g. GHS 900,848 or 12 months",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", title: "What it means", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", title: "Small note (optional)", type: "string" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const namedValue = defineType({
  name: "namedValue",
  title: "Value",
  type: "object",
  fields: [
    defineField({ name: "name", title: "What it counts", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Number", type: "number", validation: (r) => r.required().min(0) }),
  ],
  preview: {
    select: { name: "name", value: "value" },
    prepare: ({ name, value }) => ({ title: `${value ?? ""}  ${name ?? ""}` }),
  },
});

export const step = defineType({
  name: "step",
  title: "Step",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

/** Must match CARD_ICONS in src/components/site/card-icon.tsx. */
export const CARD_ICONS = [
  { title: "Heart in hand", value: "heart" },
  { title: "Package", value: "package" },
  { title: "People", value: "people" },
  { title: "Calendar", value: "calendar" },
  { title: "Megaphone", value: "megaphone" },
  { title: "Graduation cap", value: "learning" },
  { title: "Handshake", value: "partnership" },
  { title: "Sparkle", value: "sparkle" },
];

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
    defineField({
      name: "photo",
      title: "Photo (optional)",
      type: "photo",
      description: "Shown on cards that have a photo slot.",
    }),
    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "string",
      options: { list: CARD_ICONS },
      description: "Shown on cards without a photo.",
    }),
    defineField({
      name: "linkLabel",
      title: "Link text (optional)",
      type: "string",
      description: "e.g. Offer your time",
    }),
    defineField({
      name: "link",
      title: "Link (optional)",
      type: "string",
      description: "A page on this site such as /contact, or a full web address starting with https://",
    }),
  ],
  preview: { select: { title: "title", subtitle: "body", media: "photo.image" } },
});

export const ctaBand = defineType({
  name: "ctaBand",
  title: "Call to action",
  type: "object",
  description: "The box at the bottom of the page. Clear a line to go back to its original wording.",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Text", type: "text", rows: 2 }),
    defineField({ name: "primaryLabel", title: "Gold button", type: "string" }),
    defineField({ name: "secondaryLabel", title: "Second button", type: "string" }),
  ],
});

/** Must match SocialPlatform in src/lib/content.ts. */
export const SOCIAL_PLATFORMS = [
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "TikTok", value: "tiktok" },
  { title: "YouTube", value: "youtube" },
  { title: "Threads", value: "threads" },
  { title: "X (Twitter)", value: "x" },
  { title: "WhatsApp channel", value: "whatsapp" },
];

export const social = defineType({
  name: "social",
  title: "Social media account",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: SOCIAL_PLATFORMS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Link to the page",
      type: "url",
      description: "Copy it from the address bar on the profile page, e.g. https://www.instagram.com/nkra.bea",
      validation: (r) => r.required().uri({ scheme: ["https", "http"] }),
    }),
  ],
  preview: { select: { title: "platform", subtitle: "url" } },
});

export const blockTypes = [statItem, namedValue, step, card, ctaBand, social];
