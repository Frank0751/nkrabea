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

import { cld } from "./cloudinary";

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
    // Cropped to the face by Cloudinary rather than by CSS, so the portrait
    // holds up in a round frame at any size.
    image: cld(
      "c_thumb,g_face,z_0.7,w_480,h_480/v1789220087/IMG_9498.JPG_jyeiwn.jpg"
    ),
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

export type Audience = {
  id: string;
  title: string;
  /** What this group comes to the site for. */
  need: string;
  /** The single most useful next step for them. */
  action: string;
  href: string;
};

export const AUDIENCES: Audience[] = [
  {
    id: "funders",
    title: "Corporate sponsors and grant funders",
    need: "Costed programmes, stated targets and a governance record you can check before committing.",
    action: "See the case for support",
    href: "/partner",
  },
  {
    id: "institutions",
    title: "Government and institutional partners",
    need: "The Ghana Education Service, District Assemblies, ministries and the Office of Diaspora Affairs, working with us inside existing structures.",
    action: "Discuss an institutional partnership",
    href: "/partner",
  },
  {
    id: "diaspora",
    title: "The Ghanaian diaspora",
    need: "A way to take part in and support cultural programmes at home, from wherever you are.",
    action: "Find a way in",
    href: "/get-involved",
  },
  {
    id: "communities",
    title: "Beneficiaries and the public",
    need: "The schools, learners and communities our programmes are built for and delivered with.",
    action: "See the programmes",
    href: "/programmes",
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

/* ---------------------------------------------------------------------------
   The same figures again, structured so they can be drawn.

   Every number here is published by Nkrabea in the programme designs above,
   and every one is a target rather than a result: the visuals that consume
   this say so in their captions, because a target drawn as a bar reads as an
   achievement. The only derived value is the per-student average, which is
   the published budget divided by the published intake and is labelled as an
   average where it appears.

   What is deliberately absent: a per-region split of the five hundred
   places. Nkrabea has not published one, so the regions are named rather
   than charted. Four invented bars of 125 would be fabrication in the most
   persuasive form this site has.
   --------------------------------------------------------------------------- */

export const PROGRAMME_FIGURES = {
  capeCoast: {
    intake: 100,
    split: [
      { name: "Kente weaving", value: 50, token: "--chart-2" },
      {
        name: "Drumming and dance, with vibrotactile equipment",
        value: 50,
        token: "--chart-1",
      },
    ],
    budget: "GHS 900,848",
    perStudent: "about GHS 9,000",
  },
  soapProduction: {
    stages: [
      { name: "Persons with disabilities to be trained", value: 500 },
      { name: "Trained artisans to be linked to markets", value: 250 },
      { name: "PWD-led micro-enterprises to be seeded", value: 90 },
    ],
    regions: ["Greater Accra", "Ashanti", "Central", "Eastern"],
  },
  vibrotactile: [
    {
      title: "Rhythm becomes vibration",
      body: "Vibrotactile equipment turns the drum pattern into a vibration a learner can feel.",
    },
    {
      title: "The learner feels the pulse",
      body: "Through the body rather than through the ear, so a Deaf or hard-of-hearing student can hold the timing.",
    },
    {
      title: "The learner plays it back",
      body: "And performs with the group, as a member of the cultural troupe the programme is building.",
    },
  ],
};

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
   Photography.

   Every photograph comes from Nkrabea's own Cloudinary library, folder
   Nkrabea, and falls into one of three occasions: an indoor ceremony where
   the ensemble performed for chiefs and dignitaries, an outdoor community
   performance by the Nkrabea Drumming and Dance Troupe, and visits by the
   team to traditional leaders. Two artworks from an outdoor exhibition are
   kept from Nkrabea's Facebook page so that the visual arts strand of the
   work is represented.

   PHOTOS is the only place a photograph is described. Heroes, the reel, the
   gallery and every figure in a page body point into it, so one picture has
   one alt text and one caption, held once.

   Alt text describes what is actually in the frame. The first version of this
   file described pictures nobody had opened, and told screen reader users
   about drummers who were not in them. Open the file before writing a word
   about it.

   Two absences are deliberate. No caption carries an event name, place or
   date, because Nkrabea has not supplied them. No person is named except
   where Nkrabea has identified them: the Executive Director, and nobody else.
   --------------------------------------------------------------------------- */

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  /** Inline placeholder, attached in server components by withBlur(). */
  blur?: string;
};

export const PHOTOS = {
  /* ------------------------------------------ outdoor community performance */
  dancersSmiling: {
    src: cld("v1789083058/photo_29_2026-09-10_23-28-52_ygilix.jpg"),
    alt: "Children in white tunics and shorts dancing barefoot on wet ground under a canopy, smiling as they move, with carved drums, a seated audience and a Nkrabea banner behind them.",
  },
  drumSection: {
    src: cld("v1789083057/photo_27_2026-09-10_23-28-52_wsvev7.jpg"),
    alt: "Four boys in white playing tall carved drums under a canopy while other children stand around them holding gourd rattles, watched by a crowd, with the Nkrabea Drumming and Dance Troupe banner behind them.",
  },
  drumRowWide: {
    src: cld("v1789083058/photo_28_2026-09-10_23-28-52_jy0u2v.jpg"),
    alt: "Boys seated at a row of tall carved drums under a canopy, other children standing behind them with gourd rattles, a crowd looking on and a videographer filming from the side.",
    caption: "The drum section",
  },
  troupeSeated: {
    src: cld("v1789083068/photo_38_2026-09-10_23-28-52_ujgubr.jpg"),
    alt: "The drumming and dance troupe seated together under a canopy, children in white behind a row of tall carved drums, with adult tutors in patterned smocks at one end.",
  },
  busBoarding: {
    src: cld("v1789083067/photo_40_2026-09-10_23-28-52_athee2.jpg"),
    alt: "Children in red, green and yellow T-shirts printed with the words impacting lives through culture and the arts, crowding around the side door of a minibus as an adult helps them aboard.",
  },
  groupByBus: {
    src: cld("v1789083057/photo_26_2026-09-10_23-28-52_yod8xx.jpg"),
    alt: "Around eighteen children and young people in red, green and yellow Nkrabea T-shirts grouped in front of a minibus, with a group leader standing at one side.",
  },
  dancersLine: {
    src: cld("v1789083061/photo_20_2026-09-10_23-28-52_vjcqpt.jpg"),
    alt: "Seven children in white dancing in a line on wet ground between two canopies, with drums, a seated audience and a photographer at the side.",
    caption: "The Drumming and Dance Troupe at an outdoor community performance",
  },
  legRaised: {
    src: cld("v1789083060/photo_24_2026-09-10_23-28-52_azw36f.jpg"),
    alt: "Children in white dancing in a line with one leg raised high, barefoot on muddy ground, with drums and the Nkrabea banner behind them.",
    caption: "Dancers of the troupe in step",
  },
  armsSwinging: {
    src: cld("v1789083057/photo_31_2026-09-10_23-28-52_nigpo7.jpg"),
    alt: "Children in white dancing on muddy ground with their arms swinging, carved drums and a seated audience behind them.",
    caption: "Dancing in the round, the drummers behind",
  },
  armsForward: {
    src: cld("v1789083060/photo_19_2026-09-10_23-28-52_wobhij.jpg"),
    alt: "Children in white tunics dancing barefoot on wet ground with their arms stretched forward, a row of drums and a seated audience behind them under a canopy.",
    caption: "Arms forward",
  },
  bendingStep: {
    src: cld("v1789083059/photo_22_2026-09-10_23-28-52_vhnb3y.jpg"),
    alt: "Children in white bending low into a dance step on muddy ground under a canopy, with carved drums behind them.",
  },
  legsUnison: {
    src: cld("v1789083060/photo_23_2026-09-10_23-28-52_ujvhv0.jpg"),
    alt: "Children in white raising one leg high in unison on wet ground, with the Nkrabea banner, a woman in a red Nkrabea T-shirt and a seated audience behind them.",
    caption: "In unison",
  },
  sixKick: {
    src: cld("v1789083061/photo_25_2026-09-10_23-28-52_gmhhd4.jpg"),
    alt: "Six children in white caught mid-kick with one leg raised, dancing on muddy ground under a canopy.",
    caption: "Mid-kick",
  },
  fiveDancers: {
    src: cld("v1789083057/photo_33_2026-09-10_23-28-52_zcgw5s.jpg"),
    alt: "Five children in white dancing under a canopy, one bent low into the step, with drums, the Nkrabea banner and an audience behind them.",
  },

  /* ---------------------------------------------------------- indoor ceremony */
  singersInSmocks: {
    src: cld("v1789083065/photo_14_2026-09-10_23-28-52_oaijyx.jpg"),
    alt: "Three singers in blue and yellow striped northern smocks and matching caps leaning forward mid-performance, each holding a small hand instrument, with the Nkrabea banner and a seated audience in kente behind them.",
  },
  performersBeforeChiefs: {
    src: cld("v1789083059/photo_16_2026-09-10_23-28-52_i0vic7.jpg"),
    alt: "Four young performers in beaded headbands crouching on the floor in front of a kente-draped high table where chiefs and dignitaries sit with microphones.",
  },
  smockDancer: {
    src: cld("v1789083062/photo_13_2026-09-10_23-28-52_svrfhi.jpg"),
    alt: "A dancer in a blue and yellow striped northern smock and kente trousers mid-step in front of a cloth-draped high table, with another dancer beside him.",
    caption: "Dance before the high table",
  },
  smockDancerBack: {
    src: cld("v1789083062/photo_12_2026-09-10_23-28-52_hshvjc.jpg"),
    alt: "A dancer in a blue and yellow striped northern smock and kente-print trousers seen from behind, arms raised, in front of a kente-draped high table.",
    caption: "From behind the dancer",
  },
  smockDancerLeap: {
    src: cld("v1789083062/photo_15_2026-09-10_23-28-52_bql1ag.jpg"),
    alt: "A dancer in a striped northern smock caught mid-step with one foot off the floor, in front of a cloth-draped high table where guests sit.",
    caption: "Mid-step",
  },
  singerCrouching: {
    src: cld("v1789083061/photo_9_2026-09-10_23-28-52_k9ges8.jpg"),
    alt: "A woman in purple and gold kente with a gold headband crouching low as she sings into a microphone, with seated elders and a loudspeaker behind her.",
    caption: "Leading the singing",
  },
  regalia: {
    src: cld("v1789083065/photo_2_2026-09-10_23-28-52_qlhfqt.jpg"),
    alt: "A woman in Akan gold regalia wearing a gold headband with a feather ornament, stacked gold bead bracelets and gold rings, raising one hand.",
    caption: "Akan gold regalia",
  },
  motherAndBaby: {
    src: cld("v1789083067/photo_1_2026-09-10_23-28-52_v7xqmk.jpg"),
    alt: "A woman in a gold headband and strands of gold and blue beads holding a baby girl dressed in kente, the two of them cheek to cheek as the baby reaches forward.",
    caption: "Cloth and beads worn for the occasion",
  },
  familyInKente: {
    src: cld("v1789083066/photo_4_2026-09-10_23-28-52_jkbgrb.jpg"),
    alt: "A family group of five in kente cloth and gold jewellery posing indoors, one of the women holding a baby, and a girl at the side holding a camera.",
    caption: "Guests in kente",
  },
  facingHighTable: {
    src: cld("v1789083063/photo_11_2026-09-10_23-28-52_rxj0xy.jpg"),
    alt: "Two men in blue and yellow striped northern smocks seen from behind as they face a kente-draped high table where elders sit, in a hall hung with kente.",
    caption: "Facing the high table",
  },
  hallPerformer: {
    src: cld("v1789083059/photo_21_2026-09-10_23-28-52_qjvaob.jpg"),
    alt: "A young performer in cloth and beads standing before a kente-draped high table while an adult dancer moves beside her, with chiefs and guests seated around the hall.",
    caption: "A performance in the hall",
  },
  loom: {
    src: cld("v1789083063/photo_6_2026-09-10_23-28-52_bojimn.jpg"),
    alt: "A man wrapped in yellow and blue kente standing beside a narrow strip loom, with a weaver working behind him and warp threads stretched the length of the frame.",
    caption: "Kente weaving on a narrow strip loom",
  },
  chiefOutside: {
    src: cld("v1789083060/photo_17_2026-09-10_23-28-52_xzoegc.jpg"),
    alt: "Two men in kente, one wrapped in a richly patterned blue cloth, standing outside a building with Nkrabea's Executive Director in a white tunic and kente stole.",
    caption: "With traditional leaders",
  },

  /* ------------------------------------------------------- team and visits */
  teamOfFive: {
    src: cld("v1789083070/photo_34_2026-09-10_23-28-52_q8k4so.jpg"),
    alt: "Five of the Nkrabea team standing together outdoors, three of them in branded Nkrabea T-shirts, with the Executive Director in the centre in a white tunic bearing the organisation's badge.",
  },
  teamWithHosts: {
    src: cld("v1789083071/photo_35_2026-09-10_23-28-52_dos7l5.jpg"),
    alt: "Members of the Nkrabea team standing with a woman in a gold kente gown and a man in kente cloth on a tiled verandah.",
    caption: "The team with their hosts",
  },
  chiefUnderUmbrella: {
    src: cld("v1789083068/photo_39_2026-09-10_23-28-52_duq7lq.jpg"),
    alt: "A chief in kente standing under a large red and gold state umbrella, with Nkrabea's Executive Director in white and two team members beside him.",
    caption: "A visit to a traditional leader",
  },
  chiefTrio: {
    src: cld("v1789083067/photo_42_2026-09-10_23-28-52_osmeuf.jpg"),
    alt: "A chief in green and yellow kente standing with a man in an orange smock and Nkrabea's Executive Director in a white tunic and kente stole, at the edge of a state umbrella.",
  },
  teamWatching: {
    src: cld("v1789083067/photo_41_2026-09-10_23-28-52_btr93k.jpg"),
    alt: "Three members of the Nkrabea team standing side by side watching something out of frame, two in branded T-shirts and one wearing a kente stole and cap.",
    caption: "Watching a performance",
  },

  /* ------------------------------------------------------------- artworks */
  exhibition: {
    src: "/images/social/fb-3.jpg",
    alt: "Paintings mounted on freestanding display boards at an outdoor art exhibition, each with a printed label, as visitors walk between them.",
    caption: "Outdoor exhibition of Ghanaian painting",
  },
  assemblage: {
    src: "/images/social/fb-5.jpg",
    alt: "Mixed-media sculptures made from reclaimed materials mounted on a white exhibition wall, each beside a printed label. One label reads: moving against waste, save the trees, use the leaves.",
    caption: "Assemblage works made from reclaimed materials",
  },
} satisfies Record<string, Photo>;

/** One hero photograph per page. */
export const HERO_PHOTOS = {
  home: PHOTOS.dancersSmiling,
  about: PHOTOS.troupeSeated,
  programmes: PHOTOS.drumSection,
  impact: PHOTOS.busBoarding,
  leadership: PHOTOS.teamOfFive,
  partner: PHOTOS.performersBeforeChiefs,
  getInvolved: PHOTOS.groupByBus,
  news: PHOTOS.singersInSmocks,
  contact: PHOTOS.teamWithHosts,
} satisfies Record<string, Photo>;

/**
 * The homepage reel. Three frames, in the order a visitor should meet the
 * work: the dancers, then the drummers who carry them, then the whole troupe
 * with their instruments.
 */
export const REEL: Photo[] = [
  PHOTOS.dancersSmiling,
  PHOTOS.drumSection,
  PHOTOS.troupeSeated,
];

export type GalleryItem = Photo & { id: string };

export const GALLERY: GalleryItem[] = [
  { id: "p20", ...PHOTOS.dancersLine },
  { id: "p24", ...PHOTOS.legRaised },
  { id: "p31", ...PHOTOS.armsSwinging },
  { id: "p13", ...PHOTOS.smockDancer },
  { id: "p09", ...PHOTOS.singerCrouching },
  { id: "p02", ...PHOTOS.regalia },
  { id: "p01", ...PHOTOS.motherAndBaby },
  { id: "p04", ...PHOTOS.familyInKente },
  { id: "p11", ...PHOTOS.facingHighTable },
  { id: "p06", ...PHOTOS.loom },
  { id: "p35", ...PHOTOS.teamWithHosts },
  { id: "p39", ...PHOTOS.chiefUnderUmbrella },
  { id: "g3", ...PHOTOS.exhibition },
  { id: "g5", ...PHOTOS.assemblage },
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
