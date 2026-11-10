import { defineArrayMember, defineField, defineType } from "sanity";
import { lines } from "./objects";

const hero = defineField({ name: "hero", title: "Banner at the top of the page", type: "pageHero" });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "giving", title: "Giving" },
    { name: "organisation", title: "Organisation" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "Public email address",
      type: "string",
      group: "contact",
      description:
        "Shown in the footer and on the Contact page. Form messages are delivered separately; changing this does not redirect them.",
      validation: (r) => r.required().email(),
    }),
    lines("phones", "Phone numbers", "As they should be written, e.g. +233 (0) 302 986 038. The footer shows the first two.", "contact"),
    defineField({ name: "headOffice", title: "Head office address", type: "text", rows: 2, group: "contact" }),
    defineField({ name: "postalAddress", title: "Postal address", type: "string", group: "contact" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description:
        "Country code and number, digits only, no leading zero, e.g. 233246287975. Leave empty to hide the WhatsApp button.",
      validation: (r) => r.regex(/^[1-9]\d{7,14}$/, { name: "WhatsApp number" }),
    }),
    defineField({
      name: "momo",
      title: "MTN MoMo number for donations",
      type: "string",
      group: "giving",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string", group: "organisation" }),
    defineField({ name: "legalName", title: "Legal name", type: "string", group: "organisation" }),
    defineField({ name: "shortName", title: "Short name", type: "string", group: "organisation" }),
    defineField({ name: "motto", title: "Motto", type: "string", group: "organisation" }),
    defineField({ name: "registration", title: "Registered under", type: "string", group: "organisation" }),
    defineField({ name: "incorporated", title: "Incorporated", type: "string", group: "organisation" }),
    defineField({ name: "areaOfOperation", title: "Area of operation", type: "string", group: "organisation" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "The first part of the big heading, e.g. \"Ghanaian culture as a tool for\".",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlight",
      title: "Highlighted words",
      type: "string",
      description: "Shown in gold after the headline, e.g. \"real change\".",
    }),
    defineField({ name: "lead", title: "Introduction", type: "text", rows: 2 }),
    defineField({
      name: "reel",
      title: "Background photos",
      type: "array",
      description: "The home page fades slowly between these. Three works best.",
      of: [defineArrayMember({ type: "photo" })],
      validation: (r) => r.min(1).max(5),
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  fields: [
    hero,
    defineField({
      name: "whoWeAre",
      title: "Who we are",
      type: "text",
      rows: 10,
      description: "Leave an empty line between paragraphs.",
    }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 3 }),
    lines("values", "Core values"),
    defineField({
      name: "focus",
      title: "Strategic focus areas",
      type: "array",
      description: "Shown on the home page under the mission.",
      of: [defineArrayMember({ type: "focusArea" })],
    }),
    lines("whatWeDo", "What we do (constitutional objectives)"),
  ],
  preview: { prepare: () => ({ title: "About" }) },
});

export const leadershipPage = defineType({
  name: "leadershipPage",
  title: "Leadership",
  type: "document",
  fields: [
    hero,
    defineField({ name: "governanceNote", title: "How the organisation is governed", type: "text", rows: 3 }),
    defineField({ name: "founders", title: "Founders", type: "array", of: [defineArrayMember({ type: "founder" })] }),
    defineField({ name: "board", title: "Board", type: "array", of: [defineArrayMember({ type: "boardMember" })] }),
    lines("managementRoles", "Management team roles"),
  ],
  preview: { prepare: () => ({ title: "Leadership" }) },
});

export const impactPage = defineType({
  name: "impactPage",
  title: "Impact",
  type: "document",
  fields: [
    hero,
    defineField({
      name: "figures",
      title: "Figures",
      type: "array",
      description: "Drag to reorder. Each figure must say whether it is a target, a result or a fact.",
      of: [defineArrayMember({ type: "figure" })],
    }),
    defineField({ name: "milestones", title: "Milestones", type: "array", description: "Newest first.", of: [defineArrayMember({ type: "milestone" })] }),
    defineField({ name: "gallery", title: "Photo gallery", type: "array", of: [defineArrayMember({ type: "photo" })] }),
  ],
  preview: { prepare: () => ({ title: "Impact" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    hero,
    defineField({ name: "faqs", title: "Frequently asked questions", type: "array", of: [defineArrayMember({ type: "faq" })] }),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});

/** Our Work, Partner, Get Involved and News: only the banner is edited here. */
export const basicPage = defineType({
  name: "basicPage",
  title: "Page",
  type: "document",
  fields: [hero],
  preview: {
    select: { title: "hero.title" },
  },
});

export const pageTypes = [siteSettings, homePage, aboutPage, leadershipPage, impactPage, contactPage, basicPage];
