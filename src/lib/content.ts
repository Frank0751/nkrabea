// Content for Nkrabea Culture and Arts Ensemble LBG.
//
// SOURCE OF TRUTH: "Nkrabea Organisational Profile & Website Brief",
// supplied by Nkrabea, September 2026. Everything in the CONFIRMED sections
// below is taken directly from that document.
//
// Anything the organisation has not evidenced is either removed or parked in
// the NEEDS EVIDENCE section at the bottom, flagged, and not rendered. A
// non-profit asking the public for money cannot publish a claim it cannot
// stand behind.

/* ===========================================================================
   CONFIRMED - from Nkrabea's own organisational profile
   =========================================================================== */

export const ORG = {
  legalName: "Nkrabea Culture and Arts Ensemble LBG",
  name: "Nkrabea Culture and Arts Ensemble",
  shortName: "Nkrabea",

  /** Akan. The organisation is named for it. */
  meaning: "Destiny",

  motto: "Impacting Lives Through Culture and the Arts",
  tagline: "Impacting Lives Through Culture and the Arts",

  type: "Registered non-governmental organisation",
  registration: "Companies Act, 2019 (Act 992)",
  incorporated: "14 May 2021",
  areaOfOperation: "National",

  headOffice:
    "AE 5 Adenta Village, near Adenta Village Square, Adentan Municipal, Greater Accra Region, Ghana",
  postalAddress: "P.O. Box GP 21270, Accra, Ghana",

  phones: [
    "+233 (0) 302 986 038",
    "+233 (0) 208 522 120",
    "+233 (0) 246 287 975",
    "+233 (0) 556 122 230",
  ],

  email: "nkrabea.cna@gmail.com",

  /** For donations. Nkrabea's own MTN MoMo line. */
  momo: "0597431527",

  // Nkrabea's brief states they have no website, domain or established social
  // handles yet. Nothing is linked until each one is confirmed live.
  website: null as string | null,
  social: {} as Record<string, string>,
};

export const IDENTITY = {
  lead: "A Ghanaian NGO empowering marginalised communities through culture and the arts.",
  whoWeAre: [
    "Nkrabea Culture and Arts Ensemble LBG is a registered Ghanaian non-governmental organisation. In the Akan language, Nkrabea means destiny: the belief that our path is shaped by a purpose connecting our past to our future.",
    "Our work is to reach back into the rich soil of Ghanaian culture, like the Sankofa bird, and use its wisdom, art and power to build a more inclusive future.",
    "We harness the transformative power of culture and the creative arts as tools for socio-economic development, with a particular commitment to Ghana's most marginalised communities. Our area of operation is national.",
  ],
};

export const MISSION =
  "To showcase, amplify and promote Ghanaian culture and arts dynamism as a tool and contribution to socio-economic and cultural development.";

export const VISION =
  "To build the biggest Culture and Arts Centre and Village in Ghana for the preservation, promotion and education of Ghanaian culture and the arts, both locally and internationally, to impact lives.";

export const VALUES = [
  "Service",
  "Integrity",
  "Accountability",
  "Love",
  "Unity",
  "Creativity",
  "Teamwork",
] as const;

export type FocusArea = {
  id: string;
  title: string;
  description: string;
};

export const STRATEGIC_FOCUS: FocusArea[] = [
  {
    id: "economic",
    title: "Economic empowerment",
    description:
      "Accessible, marketable skills that create sustainable livelihoods.",
  },
  {
    id: "inclusion",
    title: "Social inclusion",
    description:
      "Using culture and the arts to build dignity, visibility and participation.",
  },
  {
    id: "wellbeing",
    title: "Health and wellbeing support",
    description:
      "Education, facilities and resources delivered through the arts.",
  },
];

/** Constitutional objectives, all pursued through culture and the arts. */
export const WHAT_WE_DO = [
  "Education and sensitisation of communities on pressing societal issues",
  "Livelihood and youth empowerment programmes",
  "Inclusive programmes and activities supporting persons with disabilities",
  "Support for women, girls and underprivileged communities",
  "Women's, children's and human-rights protection and advocacy",
  "Community development and social intervention projects",
  "Health education and the provision of facilities and resources",
  "Promotion of Ghanaian culture, heritage and tourism, locally and globally",
  "Support for orphans and vulnerable children",
];

/* ---------------------------------------------------------------------------
   Leadership and governance
   --------------------------------------------------------------------------- */

export type Person = {
  name: string;
  role: string;
  bio?: string;
  /** Nkrabea: "Photos are not complete... leave the others blank for now." */
  image?: string;
};

export const FOUNDERS: Person[] = [
  {
    name: "Rtd Capt. John Nkrabea Effah-Dartey",
    role: "Founder and Board Member",
    bio: "A lawyer with a lifelong passion for music, dance and the arts. The organisation carries his middle name, Nkrabea.",
  },
  {
    name: "Ms. Sarah Serwaa Asamoah",
    role: "Co-Founder, Board Member and Executive Director",
    bio: "An entrepreneur and philanthropist. She corresponds on behalf of the Board and the Management Team.",
  },
];

export const BOARD: Person[] = [
  { name: "John Nkrabea Effah-Dartey", role: "Board Member (Director)" },
  {
    name: "Sarah Serwaa Asamoah",
    role: "Board Member (Director) and Executive Director",
  },
  { name: "Monica Doku", role: "Board Member and Board Secretary" },
  { name: "Paulina Afognuo Agyei", role: "Board Member" },
  { name: "Rohodalyn Manza Cudjoe", role: "Board Member" },
];

export const GOVERNANCE_NOTE =
  "Nkrabea is governed by an Executive Council, the highest decision-making body, supported by an eight member management team that runs day-to-day operations.";

/** Roles only. Nkrabea has not yet supplied names for the management team. */
export const MANAGEMENT_ROLES = [
  "Executive Director",
  "Project Coordinator",
  "Programmes Manager",
  "Administrative Manager",
  "Accounts Manager",
  "Administrative Assistant",
  "Field Assistant",
  "Front Office Manager",
];

/* ---------------------------------------------------------------------------
   Programmes
   --------------------------------------------------------------------------- */

export type Programme = {
  id: string;
  name: string;
  status: "running" | "fundraising" | "vision";
  summary: string;
  details: string[];
  /** Stated programme value, where Nkrabea has published one. */
  value?: string;
  sdgs?: number[];
  image?: string;
};

export const PROGRAMMES: Programme[] = [
  {
    id: "cape-coast-deaf",
    name: "Skills Development Programme, Cape Coast School for the Deaf with Blind Unit",
    status: "fundraising",
    summary:
      "A 12-month, school-calendar-integrated programme equipping 100 students with vocational proficiency in two high value Ghanaian art forms.",
    details: [
      "Kente weaving for 50 students",
      "Drumming and dance for 50 students, a cultural group development using vibrotactile technology so Deaf and hard-of-hearing students can feel and perform rhythm",
      "All equipment procured remains permanently at the school as an institutional asset",
    ],
    value: "GHS 900,848",
    sdgs: [4, 8, 10, 17],
  },
  {
    id: "pwd-soap-production",
    name: "Accessible Soap Production and Entrepreneurial Skills Training for PWDs",
    status: "fundraising",
    summary:
      "A livelihoods programme training persons with disabilities in diversified soap production, combined with culturally infused entrepreneurship.",
    details: [
      "Targets 500 persons with disabilities across Greater Accra, Ashanti, Central and Eastern regions",
      "Intensive three-day workshops covering eight or more soap and hygiene product varieties, plus business skills",
      "Label and packaging design using Adinkra symbols, local fragrances and storytelling that positions products as distinctive Ghanaian goods",
      "Aims to seed 90 new PWD-led micro-enterprises and link at least 250 trained artisans to markets",
    ],
  },
  {
    id: "culture-arts-centre",
    name: "A Culture and Arts Centre and Village",
    status: "vision",
    summary:
      "Our long-term ambition: the biggest Culture and Arts Centre and Village in Ghana, a landmark for cultural preservation, education and diaspora tourism.",
    details: [
      "The destination all our work is building toward",
      "Preservation, promotion and education of Ghanaian culture and the arts",
    ],
  },
];

/* ---------------------------------------------------------------------------
   Audiences the site is written for
   --------------------------------------------------------------------------- */

export const AUDIENCES = [
  {
    id: "funders",
    title: "Corporate sponsors and grant funders",
    need: "Credibility, programmes and impact, quickly.",
  },
  {
    id: "institutions",
    title: "Government and institutional partners",
    need: "GES, District Assemblies, ministries and the Office of Diaspora Affairs.",
  },
  {
    id: "diaspora",
    title: "The Ghanaian diaspora",
    need: "Participants in and supporters of our cultural programmes.",
  },
  {
    id: "communities",
    title: "Beneficiaries and the public",
    need: "The schools and communities we serve.",
  },
];

/* ---------------------------------------------------------------------------
   Figures.
   Every entry states plainly whether it is a target or an achieved result.
   Presenting a programme target as an accomplishment is the exact failure
   this rebuild exists to remove.
   --------------------------------------------------------------------------- */

export type Figure = {
  value: string;
  label: string;
  kind: "target" | "achieved" | "fact";
  /** Where the number comes from. Rendered as a note where appropriate. */
  source: string;
};

export const FIGURES: Figure[] = [
  {
    value: "2021",
    label: "Incorporated under Act 992",
    kind: "fact",
    source: "Certificate of incorporation, 14 May 2021",
  },
  {
    value: "100",
    label: "Students to be trained at Cape Coast School for the Deaf",
    kind: "target",
    source: "Skills Development Programme design",
  },
  {
    value: "500",
    label: "Persons with disabilities to be trained across four regions",
    kind: "target",
    source: "Accessible Soap Production programme design",
  },
  {
    value: "90",
    label: "PWD-led micro-enterprises to be seeded",
    kind: "target",
    source: "Accessible Soap Production programme design",
  },
];

/* ===========================================================================
   NEEDS EVIDENCE - not rendered anywhere until Nkrabea confirms
   ===========================================================================

   Each item below was either carried in the accepted prototype without a
   source, or named by Nkrabea as a credibility marker without supporting
   documentation. Nothing here should reach the live site until it is
   evidenced in writing.
   =========================================================================== */

export type UnverifiedClaim = {
  claim: string;
  origin: string;
  needed: string;
};

export const NEEDS_EVIDENCE: UnverifiedClaim[] = [
  {
    claim: "Founded 1995 / 30 years preserving heritage",
    origin: "Accepted prototype homepage and about page",
    needed:
      "Nkrabea's profile states incorporation on 14 May 2021 and gives no earlier founding date. If the group performed informally from 1995, the site needs a form of words that distinguishes the two, confirmed by Nkrabea.",
  },
  {
    claim: "40+ dance and drum forms, performances in 12 countries",
    origin: "Accepted prototype impact statistics",
    needed: "A verifiable count, or the figures are dropped.",
  },
  {
    claim:
      "Partnership with the Ghana Education Service, referenced as a headline credibility marker",
    origin: "Nkrabea's brief, Homepage and Our Impact sections",
    needed:
      "A dated agreement, letter or public record naming the partnership before it appears on the homepage.",
  },
  {
    claim: "Over 90% of persons with disabilities in Ghana are unemployed",
    origin: "Nkrabea's brief, suggested homepage credibility marker",
    needed:
      "A citable source, since the figure would be published as fact by a registered NGO.",
  },
  {
    claim:
      "Press and partner strip: SID Festival, National Theatre Ghana, Ghana Dance Ensemble, Institute of African Studies, Black Star Square, Panafest",
    origin: "Accepted prototype",
    needed:
      "Evidence of a relationship with each. None appear in Nkrabea's own profile.",
  },
  {
    claim:
      "Programme detail for Adowa, Kete, traditional drumming and cultural street dance, including instrument lists and rhythm notes",
    origin:
      "Accepted prototype, researched from the organisation's Facebook page",
    needed:
      "Review with Nkrabea for cultural accuracy. These art forms do not appear in the official profile, whose programmes are the Cape Coast skills programme, PWD soap production and the Culture and Arts Centre.",
  },
  {
    claim: "Four dated events at National Theatre, Black Star Square and Adenta Community Stage",
    origin: "Accepted prototype events calendar",
    needed:
      "All four dates had already passed, two still marked open for booking. Removed. Replace with confirmed listings only.",
  },
];

/* ---------------------------------------------------------------------------
   Empty until Nkrabea supplies real material.
   Kept as typed exports so the components that consume them keep compiling
   and render their empty states rather than fabricated content.
   --------------------------------------------------------------------------- */

export type EventItem = {
  id: string;
  date: string;
  day: string;
  month: string;
  title: string;
  venue: string;
  type: string;
  status: "upcoming" | "open" | "past";
};

/** No confirmed listings yet. The prototype's four had all already happened. */
export const EVENTS: EventItem[] = [];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  organisation?: string;
};

/** Awaiting three named testimonials with written permission to publish. */
export const TESTIMONIALS: Testimonial[] = [];

export type PressItem = { name: string; context: string };

/** Awaiting evidence of each relationship. */
export const PRESS: PressItem[] = [];

export type Story = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

export const STORIES: Story[] = [];

export type Milestone = { year: string; title: string; description: string };

export const MILESTONES: Milestone[] = [
  {
    year: "2021",
    title: "Incorporated as an NGO",
    description:
      "Registered under the Companies Act, 2019 (Act 992) on 14 May 2021, with a national area of operation.",
  },
];

/* ---------------------------------------------------------------------------
   Gallery.
   Only photographs sourced from Nkrabea's own channels. The nine generated
   PNGs in the accepted prototype are not listed here.
   --------------------------------------------------------------------------- */

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/social/fb-1.jpg",
    alt: "Nkrabea performers in traditional dress during a cultural performance.",
  },
  {
    id: "g2",
    src: "/images/social/fb-2.jpg",
    alt: "Members of the Nkrabea ensemble performing together.",
  },
  {
    id: "g3",
    src: "/images/social/fb-3.jpg",
    alt: "Nkrabea drummers performing with traditional Ghanaian drums.",
  },
  {
    id: "g4",
    src: "/images/social/fb-4.jpg",
    alt: "A Nkrabea cultural performance in progress.",
  },
  {
    id: "g5",
    src: "/images/social/fb-5.jpg",
    alt: "Nkrabea dancers in traditional regalia.",
  },
  {
    id: "g6",
    src: "/images/social/fb-6.jpg",
    alt: "Nkrabea ensemble members during a community performance.",
  },
];

/* ---------------------------------------------------------------------------
   FAQ, rewritten for the audiences Nkrabea named: funders, institutional
   partners, the diaspora, and the communities served.
   --------------------------------------------------------------------------- */

export type FAQ = { question: string; answer: string };

export const FAQS: FAQ[] = [
  {
    question: "Who are Nkrabea Culture and Arts Ensemble?",
    answer:
      "A Ghanaian non-governmental organisation registered under the Companies Act, 2019 (Act 992) and incorporated on 14 May 2021. We use culture and the creative arts as tools for socio-economic development, with a particular commitment to Ghana's most marginalised communities. Our area of operation is national.",
  },
  {
    question: "What does Nkrabea mean?",
    answer:
      "Nkrabea is the Akan word for destiny: the belief that our path is shaped by a purpose connecting our past to our future. The organisation carries the middle name of its founder, Rtd Capt. John Nkrabea Effah-Dartey.",
  },
  {
    question: "How is the organisation governed?",
    answer:
      "An Executive Council is the highest decision-making body, supported by an eight member management team that runs day-to-day operations.",
  },
  {
    question: "How can an organisation partner with Nkrabea?",
    answer:
      "We work with corporate sponsors, grant funders, government and institutional partners. Send an enquiry through the contact form or write to nkrabea.cna@gmail.com and the Executive Director will respond.",
  },
  {
    question: "How can I support the work?",
    answer:
      "Through mobile money, bank transfer or card. Support can be directed to a specific programme, and we frame it as strategic investment rather than charity.",
  },
];

/* ---------------------------------------------------------------------------
   Art forms.
   Nkrabea teaches kente weaving, drumming and dance. The detailed material on
   Adowa, Kete and the drum families carried in the accepted prototype came
   from research rather than from the organisation, and is held in
   NEEDS_EVIDENCE above pending a cultural accuracy review.
   --------------------------------------------------------------------------- */

export type ArtForm = { id: string; name: string; note: string };

export const ART_FORMS: ArtForm[] = [
  {
    id: "kente",
    name: "Kente weaving",
    note: "Taught to 50 students under the Cape Coast skills programme.",
  },
  {
    id: "drumming-dance",
    name: "Drumming and dance",
    note: "Taught to 50 students using vibrotactile technology so Deaf and hard-of-hearing learners can feel and perform rhythm.",
  },
];
