import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A photograph with the description the website needs for people who cannot
 * see it. Upload a new picture with "Image". Photographs imported from the
 * old site are linked from Nkrabea's Cloudinary library instead; uploading an
 * image replaces the link.
 */
export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Upload a photo. Click the crop icon to choose the point that must stay in view when the photo is cropped.",
    }),
    defineField({
      name: "url",
      title: "Or paste a link to a photo",
      type: "url",
      hidden: ({ parent }) => Boolean(parent?.image?.asset),
      description:
        "A direct link to an image (ending in .jpg, .png or similar). Photos from the old site are linked this way. An uploaded image above takes priority.",
    }),
    defineField({
      name: "alt",
      title: "Description for people who cannot see the photo",
      type: "string",
      description:
        "Say what is actually in the picture, e.g. \"Five caregivers stirring soap in a large basin\". Required.",
      validation: (r) => r.required().min(10),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "A short line shown under the photo on some pages.",
    }),
    defineField({
      name: "fit",
      title: "How to show it",
      type: "string",
      options: {
        list: [
          { title: "Fill the frame (crop the edges)", value: "cover" },
          { title: "Show the whole picture (for flyers and posters)", value: "contain" },
        ],
        layout: "radio",
      },
      initialValue: "cover",
    }),
  ],
  validation: (r) =>
    r.custom((value: { image?: { asset?: unknown }; url?: string } | undefined) =>
      !value || value.image?.asset || value.url ? true : "Upload an image or paste a link to one."
    ),
  preview: {
    select: { media: "image", title: "alt", subtitle: "caption", url: "url" },
    prepare: ({ media, title, subtitle, url }) => ({
      title: title || "Photo (no description yet)",
      subtitle: subtitle || (url && !media ? "Linked photo" : undefined),
      media,
    }),
  },
});

/** The large banner at the top of a page. */
export const pageHero = defineType({
  name: "pageHero",
  title: "Banner at the top of the page",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label above the title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Introduction", type: "text", rows: 3 }),
    defineField({ name: "photo", title: "Background photo", type: "photo" }),
  ],
});

/**
 * Every number on the site says plainly what it is. A target is what a
 * programme is designed to deliver; only something that has happened is
 * "achieved".
 */
export const figure = defineType({
  name: "figure",
  title: "Figure",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Number",
      type: "string",
      description: "Digits only where possible, e.g. 500. Numbers count up on the page.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", title: "What it counts", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Is this a target or a result?",
      type: "string",
      options: {
        list: [
          { title: "Target: what a programme is designed to deliver", value: "target" },
          { title: "Achieved: something that has already happened", value: "achieved" },
          { title: "Fact: e.g. the year of registration", value: "fact" },
        ],
        layout: "radio",
      },
      description:
        "Never mark a target as achieved. Funders check, and a target shown as a result damages trust.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the number comes from, e.g. \"Programme design\" or \"Training register, Nov 2026\".",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { value: "value", label: "label", kind: "kind" },
    prepare: ({ value, label, kind }) => ({ title: `${value ?? ""} ${label ?? ""}`, subtitle: kind }),
  },
});

export const milestone = defineType({
  name: "milestone",
  title: "Milestone",
  type: "object",
  fields: [
    defineField({ name: "year", title: "Year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "year" } },
});

export const focusArea = defineType({
  name: "focusArea",
  title: "Focus area",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Target (economic)", value: "economic" },
          { title: "People (inclusion)", value: "inclusion" },
          { title: "Hands and heart (wellbeing)", value: "wellbeing" },
        ],
      },
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});

export const founder = defineType({
  name: "founder",
  title: "Founder",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Short biography", type: "text", rows: 3 }),
    defineField({
      name: "photo",
      title: "Portrait",
      type: "photo",
      description: "A head-and-shoulders photo works best. It is shown in a circle.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo.image" } },
});

export const boardMember = defineType({
  name: "boardMember",
  title: "Board member",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "photo",
      title: "Portrait (optional)",
      type: "photo",
      description: "Without one, the person's initials are shown.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo.image" } },
});

export const faq = defineType({
  name: "faq",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question" } },
});

/** Coverage of a story on TV or online. The video itself stays on Cloudinary. */
export const storyPress = defineType({
  name: "storyPress",
  title: "In the news",
  type: "object",
  fields: [
    defineField({ name: "outlet", title: "Outlet", type: "string", description: "e.g. Angel TV" }),
    defineField({ name: "headline", title: "Their headline", type: "string" }),
    defineField({ name: "date", title: "Date", type: "string", description: "As it should read, e.g. November 2026" }),
    defineField({
      name: "videoUrl",
      title: "Video link",
      type: "url",
      description:
        "Paste a YouTube link (best: upload the video to Nkrabea's YouTube channel first) or a direct link to a video file. Videos are not uploaded here: video is too heavy for this system.",
    }),
    defineField({
      name: "posterUrl",
      title: "Video still (optional image link)",
      type: "url",
      description: "YouTube videos use their own thumbnail, so this is only needed for direct video files.",
    }),
    defineField({ name: "duration", title: "Length", type: "string", description: "e.g. 4 min 33 s" }),
    defineField({ name: "note", title: "Credit line", type: "string", description: "Shown under the video." }),
  ],
});

/** Lists of short lines, used in several places. */
export const lines = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    group,
    of: [defineArrayMember({ type: "string" })],
  });

export const objectTypes = [photo, pageHero, figure, milestone, focusArea, founder, boardMember, faq, storyPress];
