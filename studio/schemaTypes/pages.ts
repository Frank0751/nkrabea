import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";
import { lines } from "./objects";
import registry from "../page-text.json";

/**
 * Every page is one document with a tab per section, in the order the
 * sections appear on the page. The slots in each tab come from
 * studio/page-text.json, the same list the website reads, so a slot shown
 * here is always one the page uses, and the page's layout never changes
 * when its words do.
 */

type Slot = { name: string; label: string; kind: string; help?: string };
type PageKey = keyof typeof registry.pages;

const REVERT = "Clear it to go back to the original.";

function slotField(slot: Slot, group: string): FieldDefinition {
  const description = [slot.help, slot.kind === "toggle" ? undefined : REVERT].filter(Boolean).join(" ");
  const base = { name: slot.name, title: slot.label, group, description };
  switch (slot.kind) {
    case "toggle":
      return defineField({
        ...base,
        type: "boolean",
        initialValue: true,
        description: [slot.help, "Switch off to hide this section."].filter(Boolean).join(" "),
      });
    case "string":
      return defineField({ ...base, type: "string" });
    case "text":
      return defineField({ ...base, type: "text", rows: 3 });
    case "photo":
      return defineField({ ...base, type: "photo" });
    case "photos":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "photo" })], options: { layout: "grid" } });
    case "lines":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "string" })] });
    case "cta":
      return defineField({ ...base, type: "ctaBand" });
    case "stats":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "statItem" })] });
    case "values":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "namedValue" })] });
    case "steps":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "step" })] });
    case "cards":
      return defineField({ ...base, type: "array", of: [defineArrayMember({ type: "card" })] });
    default:
      throw new Error(`page-text.json: unknown kind "${slot.kind}" for ${slot.name}`);
  }
}

/** Fields placed into a tab by hand, alongside that tab's slots. */
type Extra = { field: FieldDefinition; section: string };

/**
 * A page document: a Banner tab (unless the page manages its banner
 * elsewhere), then one tab per section from page-text.json. Hand-written
 * fields join the tab their section names; "focus" and similar extra tabs are
 * created when a hand-written field names a section the registry lacks.
 */
function pageDocument({
  name,
  title,
  page,
  banner = true,
  extras = [],
  extraTabs = [],
}: {
  name: string;
  title: string;
  page: PageKey;
  banner?: boolean;
  extras?: Extra[];
  extraTabs?: { name: string; title: string }[];
}) {
  const sections = registry.pages[page].sections;
  const groups = [
    ...(banner ? [{ name: "banner", title: "Banner", default: true }] : []),
    ...sections.map((s, i) => ({ name: s.id, title: s.title, ...(banner || i > 0 ? {} : { default: true }) })),
    ...extraTabs,
  ];
  const fields: FieldDefinition[] = [];
  if (banner) {
    fields.push(defineField({ name: "hero", title: "Banner at the top of the page", type: "pageHero", group: "banner" }));
  }
  if (banner) for (const extra of extras.filter((e) => e.section === "banner")) fields.push({ ...extra.field, group: "banner" });
  for (const s of sections) {
    for (const extra of extras.filter((e) => e.section === s.id)) fields.push({ ...extra.field, group: s.id });
    for (const slot of s.fields) fields.push(slotField(slot as Slot, s.id));
  }
  for (const tab of extraTabs) {
    for (const extra of extras.filter((e) => e.section === tab.name)) fields.push({ ...extra.field, group: tab.name });
  }
  return defineType({
    name,
    title,
    type: "document",
    groups,
    fields,
    preview: { prepare: () => ({ title }) },
  });
}

/* ------------------------------------------------------------- settings */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "social", title: "Social media" },
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
      name: "socials",
      title: "Social media accounts",
      type: "array",
      group: "social",
      description:
        "Shown with each platform's own logo in the footer of every page, in the mobile menu and on the Contact page. Drag to reorder.",
      of: [defineArrayMember({ type: "social" })],
    }),
    defineField({
      name: "momo",
      title: "MTN MoMo number for donations",
      type: "string",
      group: "giving",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footerText",
      title: "Sentence in the footer",
      type: "text",
      rows: 2,
      group: "organisation",
      description: "Shown under the name in the footer of every page.",
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

/* ---------------------------------------------------------------- pages */

export const homePage = pageDocument({
  name: "homePage",
  title: "Home",
  page: "homePage",
  // The Home banner is a section of its own in page-text.json (its buttons).
  banner: false,
  extras: [
    {
      section: "banner",
      field: defineField({
        name: "headline",
        title: "Headline",
        type: "string",
        description: 'The first part of the big heading, e.g. "Ghanaian culture as a tool for".',
        validation: (r) => r.required(),
      }),
    },
    {
      section: "banner",
      field: defineField({
        name: "highlight",
        title: "Highlighted words",
        type: "string",
        description: 'Shown in gold after the headline, e.g. "real change".',
      }),
    },
    { section: "banner", field: defineField({ name: "lead", title: "Introduction", type: "text", rows: 2 }) },
    {
      section: "banner",
      field: defineField({
        name: "reel",
        title: "Background photos",
        type: "array",
        description: "The home page fades slowly between these. Three works best.",
        of: [defineArrayMember({ type: "photo" })],
        options: { layout: "grid" },
        validation: (r) => r.min(1).max(5),
      }),
    },
  ],
});

export const aboutPage = pageDocument({
  name: "aboutPage",
  title: "About",
  page: "aboutPage",
  extraTabs: [{ name: "focus", title: "Focus areas (Home page)" }],
  extras: [
    {
      section: "who",
      field: defineField({
        name: "whoWeAre",
        title: "Who we are",
        type: "text",
        rows: 10,
        description: "Leave an empty line between paragraphs.",
      }),
    },
    { section: "missionVision", field: defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }) },
    { section: "missionVision", field: defineField({ name: "vision", title: "Vision", type: "text", rows: 3 }) },
    { section: "values", field: lines("values", "Core values") },
    { section: "what", field: lines("whatWeDo", "What we do (constitutional objectives)") },
    {
      section: "focus",
      field: defineField({
        name: "focus",
        title: "Strategic focus areas",
        type: "array",
        description: "Shown on the Home page under the mission.",
        of: [defineArrayMember({ type: "focusArea" })],
      }),
    },
  ],
});

export const leadershipPage = pageDocument({
  name: "leadershipPage",
  title: "Leadership",
  page: "leadershipPage",
  extras: [
    {
      section: "banner",
      field: defineField({ name: "governanceNote", title: "How the organisation is governed", type: "text", rows: 3 }),
    },
    {
      section: "founders",
      field: defineField({ name: "founders", title: "Founders", type: "array", of: [defineArrayMember({ type: "founder" })] }),
    },
    {
      section: "board",
      field: defineField({ name: "board", title: "Board", type: "array", of: [defineArrayMember({ type: "boardMember" })] }),
    },
    { section: "management", field: lines("managementRoles", "Management team roles") },
  ],
});

export const programmesPage = pageDocument({
  name: "programmesPage",
  title: "Our Work",
  page: "programmesPage",
});

export const impactPage = pageDocument({
  name: "impactPage",
  title: "Impact",
  page: "impactPage",
  extras: [
    {
      section: "figures",
      field: defineField({
        name: "figures",
        title: "Figures",
        type: "array",
        description: "Drag to reorder. Each figure must say whether it is a target, a result or a fact.",
        of: [defineArrayMember({ type: "figure" })],
      }),
    },
    {
      section: "milestones",
      field: defineField({
        name: "milestones",
        title: "Milestones",
        type: "array",
        description: "Newest first.",
        of: [defineArrayMember({ type: "milestone" })],
      }),
    },
    {
      section: "gallery",
      field: defineField({
        name: "gallery",
        title: "Photos",
        type: "array",
        options: { layout: "grid" },
        of: [defineArrayMember({ type: "photo" })],
      }),
    },
  ],
});

export const partnerPage = pageDocument({ name: "partnerPage", title: "Partner", page: "partnerPage" });
export const getInvolvedPage = pageDocument({ name: "getInvolvedPage", title: "Get Involved", page: "getInvolvedPage" });
export const newsPage = pageDocument({ name: "newsPage", title: "News", page: "newsPage" });

export const contactPage = pageDocument({
  name: "contactPage",
  title: "Contact",
  page: "contactPage",
  extras: [
    {
      section: "faq",
      field: defineField({
        name: "faqs",
        title: "Frequently asked questions",
        type: "array",
        of: [defineArrayMember({ type: "faq" })],
      }),
    },
  ],
});

export const pageTypes = [
  siteSettings,
  homePage,
  aboutPage,
  leadershipPage,
  programmesPage,
  impactPage,
  partnerPage,
  getInvolvedPage,
  newsPage,
  contactPage,
];
