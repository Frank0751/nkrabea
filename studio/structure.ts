import type { StructureResolver } from "sanity/structure";

/**
 * Documents that exist exactly once. Editors open and edit them; they cannot
 * create, duplicate or delete them, because the website expects each one.
 */
export const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "siteSettings", type: "siteSettings", title: "Site settings" },
  { id: "homePage", type: "homePage", title: "Home" },
  { id: "aboutPage", type: "aboutPage", title: "About" },
  { id: "page-programmes", type: "basicPage", title: "Our Work" },
  { id: "impactPage", type: "impactPage", title: "Impact" },
  { id: "leadershipPage", type: "leadershipPage", title: "Leadership" },
  { id: "page-partner", type: "basicPage", title: "Partner" },
  { id: "page-getInvolved", type: "basicPage", title: "Get Involved" },
  { id: "page-news", type: "basicPage", title: "News" },
  { id: "contactPage", type: "contactPage", title: "Contact" },
];

export const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) => {
  const single = ({ id, type, title }: (typeof SINGLETONS)[number]) =>
    S.listItem()
      .id(id)
      .title(title)
      .child(S.document().schemaType(type).documentId(id).title(title));

  return S.list()
    .title("Nkrabea website")
    .items([
      single(SINGLETONS[0]),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(S.list().title("Pages").items(SINGLETONS.slice(1).map(single))),
      S.divider(),
      S.documentTypeListItem("programme").title("Programmes"),
      S.documentTypeListItem("story").title("News stories"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("pressItem").title("Press"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);
};
