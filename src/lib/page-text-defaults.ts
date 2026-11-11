import {
  PHOTOS,
  AUDIENCES,
  ART_FORMS,
  PROGRAMME_FIGURES,
  IDENTITY,
  type Photo,
} from "./content";

/**
 * The original wording and photos for every slot in studio/page-text.json.
 *
 * The site shows these until an editor changes a slot in Sanity, and again
 * whenever a slot is cleared, so clearing a field is how an editor gets back
 * to the original. The seed script also writes them into Sanity, so editors
 * start from the words on the page rather than from empty boxes.
 */

export type Stat = { value: string; label: string; note?: string };
export type NamedValue = { name: string; value: number };
export type Step = { title: string; body: string };
export type Cta = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};
export type Card = {
  title: string;
  body: string;
  photo?: Photo;
  /** One of CARD_ICONS, for cards without a photo. */
  icon?: string;
  linkLabel?: string;
  link?: string;
};

export type TextValue =
  | boolean
  | string
  | string[]
  | Photo
  | Photo[]
  | Cta
  | Stat[]
  | NamedValue[]
  | Step[]
  | Card[];

const AUDIENCE_PHOTOS: Record<string, Photo> = {
  funders: PHOTOS.performersBeforeChiefs,
  institutions: PHOTOS.facingHighTable,
  diaspora: PHOTOS.regalia,
  communities: PHOTOS.dancersLine,
};

const ART_FORM_PHOTOS: Record<string, Photo> = {
  kente: PHOTOS.loom,
  "drumming-dance": PHOTOS.drumRowWide,
};

const partnerCta = (title: string, description: string, secondaryLabel = "Make a donation"): Cta => ({
  title,
  description,
  primaryLabel: "Partner With Us",
  secondaryLabel,
});

export const PAGE_TEXT_DEFAULTS: Record<string, Record<string, TextValue>> = {
  homePage: {
    showFigure: true,
    showQuote: true,
    heroPrimaryLabel: "Partner With Us",
    heroSecondaryLabel: "Support Our Work",
    heroTertiaryLabel: "Explore Our Work",
    proofItems: [
      { value: "Registered", label: "Non-governmental organisation" },
      { value: "Act 992", label: "Companies Act, 2019" },
      { value: "2021", label: "Incorporated 14 May" },
      { value: "National", label: "Area of operation" },
    ],
    missionEyebrow: "Our mission",
    missionTitle: "Culture is the tool. Development is the work.",
    missionPhoto: PHOTOS.loom,
    storyEyebrow: "Latest from the field",
    audiencesEyebrow: "Who we serve",
    audiencesTitle: "Four groups, four different questions",
    audiencesIntro: "What you need from this site depends on why you came to it.",
    audiences: AUDIENCES.map((a) => ({
      title: a.title,
      body: a.need,
      photo: AUDIENCE_PHOTOS[a.id],
      linkLabel: a.action,
      link: a.href,
    })),
    programmesEyebrow: "Our work",
    programmesTitle: "The programmes we are running and raising for",
    programmesLinkLabel: "All programmes",
    figureEyebrow: "The scale of the need",
    figureTitle: "Five hundred people, four regions, one programme",
    figureLede:
      "Our accessible soap production programme is designed to train five hundred persons with disabilities in a trade they can run themselves.",
    figureNumber: "500",
    figureRegions: [...PROGRAMME_FIGURES.soapProduction.regions],
    figureNote:
      "Nkrabea has not published how the five hundred places divide between these four regions, so no split is drawn.",
    figureTargetNote: "A programme target, not a result to date.",
    breakPhoto: PHOTOS.fiveDancers,
    breakQuote: IDENTITY.whoWeAre[1],
    breakCite: "From our organisational profile",
    cta: partnerCta(
      "Support that works as investment, not charity",
      "We work with corporate sponsors, grant funders and institutional partners to put Ghanaian culture to work for the communities that need it most."
    ),
  },

  aboutPage: {
    whoEyebrow: "Who we are",
    whoTitle: "Reaching back to build forward",
    whoPhoto: PHOTOS.familyInKente,
    whoInsetPhoto: PHOTOS.motherAndBaby,
    missionLabel: "Mission",
    visionLabel: "Vision",
    missionVisionPhoto: PHOTOS.regalia,
    mottoLabel: "Our motto",
    valuesEyebrow: "Core values",
    valuesTitle: "Seven values guide the work",
    whatEyebrow: "What we do",
    whatTitle: "Our constitutional objectives",
    whatIntro: "All pursued through culture and the arts.",
    whatPhoto: PHOTOS.hallPerformer,
    registrationEyebrow: "Registration",
    governanceValue: "Executive Council",
    registrationLinkLabel: "Read more about our leadership and governance",
    cta: partnerCta("Work with us", "Whether you fund, partner or participate, there is a way in.", "Contact us"),
  },

  leadershipPage: {
    foundersEyebrow: "Founders",
    foundersTitle: "The people who began it",
    boardEyebrow: "Executive Council",
    boardTitle: "Board of Directors",
    boardIntro: "The Executive Council is the highest decision-making body of the organisation.",
    managementEyebrow: "Management team",
    managementTitle: "Eight roles run the work",
    managementIntro: "The management team drives day-to-day implementation across every programme.",
    managementPhoto: PHOTOS.teamWatching,
    cta: partnerCta(
      "Talk to the Executive Director",
      "Partnership and funding enquiries are answered by the Executive Director on behalf of the Board and Management Team.",
      "Contact us"
    ),
  },

  programmesPage: {
    showChart: true,
    showSteps: true,
    showPhoto: true,
    chartEyebrow: "What the funding buys",
    chartTitle: "One hundred students, split evenly between two trades",
    chartLede:
      "The Cape Coast programme is costed, dated and designed to leave its equipment behind. These are the numbers a funder would be committing to.",
    splitTotal: String(PROGRAMME_FIGURES.capeCoast.intake),
    splitTotalLabel: "students at Cape Coast School for the Deaf with Blind Unit, over one school year",
    splitParts: PROGRAMME_FIGURES.capeCoast.split.map((p) => ({ name: p.name, value: p.value })),
    splitCaption:
      "A programme target, not a result to date. Source: Nkrabea's Skills Development Programme design.",
    stats: [
      { value: PROGRAMME_FIGURES.capeCoast.budget, label: "Total programme value", note: "As published by Nkrabea." },
      { value: "12 months", label: "Integrated into the school calendar" },
      {
        value: PROGRAMME_FIGURES.capeCoast.perStudent,
        label: "Per student, on average",
        note: "The published budget divided by the published intake.",
      },
      { value: "Retained", label: "Equipment stays at the school as an institutional asset" },
    ],
    artEyebrow: "How we teach",
    artTitle: "The art forms we work through",
    artForms: ART_FORMS.map((f) => ({ title: f.name, body: f.note, photo: ART_FORM_PHOTOS[f.id] })),
    stepsTitle: "How a Deaf student learns a drum pattern",
    steps: PROGRAMME_FIGURES.vibrotactile.map((s) => ({ title: s.title, body: s.body })),
    stepsCaption:
      "Nkrabea's programme design specifies vibrotactile technology for the fifty drumming and dance students. The equipment is part of the funded budget and remains at the school afterwards.",
    breakPhoto: PHOTOS.bendingStep,
    breakLabel: "Nkrabea Drumming and Dance Troupe",
    cta: partnerCta(
      "Fund a programme",
      "Each of these initiatives is costed and ready to run. Partnership puts them in motion."
    ),
  },

  impactPage: {
    showChart: true,
    storyEyebrow: "Latest result",
    figuresEyebrow: "By the numbers",
    figuresTitle: "Results, targets and facts, labelled as such",
    figuresNote:
      "Nkrabea publishes programme targets and achieved results separately. A target describes what a funded programme is designed to deliver, not what has already been delivered.",
    chartEyebrow: "The soap production programme",
    chartTitle: "Five hundred trained, ninety enterprises seeded",
    chartLede:
      "Read these as a plan, because that is what they are. Nothing below has happened yet, and the captions say so rather than letting the length of a bar imply otherwise.",
    stages: PROGRAMME_FIGURES.soapProduction.stages.map((s) => ({ name: s.name, value: s.value })),
    stagesCaption:
      "Targets from Nkrabea's Accessible Soap Production and Entrepreneurial Skills Training programme design. The three bars share one scale, so their lengths are comparable.",
    regionsLabel: "Where it runs",
    regions: [...PROGRAMME_FIGURES.soapProduction.regions],
    regionsNote:
      "Four regions. Nkrabea has not published how the five hundred places divide between them, so no split is drawn here.",
    chartDetail:
      "Training runs as intensive three day workshops covering eight or more soap and hygiene products, with packaging designed around Adinkra symbols and local fragrances so the goods carry a Ghanaian story to market.",
    milestonesEyebrow: "Milestones",
    milestonesTitle: "The record so far",
    milestonesNote:
      "Further milestones will be published as Nkrabea confirms dates and supporting evidence for each.",
    galleryEyebrow: "In the frame",
    galleryTitle: "Our work in pictures",
    testimonialsEyebrow: "In their words",
    cta: partnerCta(
      "Turn a target into a result",
      "Every figure on this page becomes an achieved result once a programme is funded."
    ),
  },

  partnerPage: {
    caseEyebrow: "The case for support",
    caseTitle: "What your funding actually does",
    casePoints: [
      {
        title: "Equipment stays with the community",
        body: "Under the Cape Coast programme, every instrument and loom procured remains permanently at the school as an institutional asset. Your funding does not evaporate when the programme ends.",
      },
      {
        title: "Costed, time-bound programmes",
        body: "Each initiative has a defined value, duration and beneficiary count, so a funder can see exactly what a contribution buys and when it completes.",
      },
      {
        title: "Aligned to the SDGs",
        body: "Our skills development work aligns with UN Sustainable Development Goals 4, 8, 10 and 17, which maps directly onto most corporate and institutional reporting frameworks.",
      },
      {
        title: "Governed and accountable",
        body: "A registered NGO with an Executive Council, a board secretary and an eight member management team. Accountability is one of our seven core values, not an afterthought.",
      },
    ],
    partnersEyebrow: "Who we work with",
    partnersTitle: "Four kinds of partner",
    partnersPhoto: PHOTOS.chiefOutside,
    fundingEyebrow: "Open for funding",
    fundingTitle: "Programmes ready to run",
    fundingPhoto: PHOTOS.chiefUnderUmbrella,
    formTitle: "Start a conversation",
    formIntro: "Tell us a little about your organisation and we will come back with a proposal that fits.",
  },

  getInvolvedPage: {
    showStrip: true,
    giveEyebrow: "Give",
    giveTitle: "Make a donation",
    momoTitle: "Send by MoMo directly",
    momoBody: "Prefer to send from your phone? Use Nkrabea's own MTN MoMo line.",
    momoNote: "Please use your name as the reference so we can thank you properly.",
    bankTitle: "Bank transfer",
    bankBody: "For larger gifts and institutional grants, a bank transfer is usually simpler.",
    bankNote: "Bank details are issued directly on request, so that they always come from us and can be verified.",
    bankLinkLabel: "Request bank details",
    stripLabel: "The work your support funds",
    stripPhotos: [PHOTOS.legsUnison, PHOTOS.sixKick, PHOTOS.armsForward],
    stripNote:
      "The Nkrabea Drumming and Dance Troupe at an outdoor community performance. Donations by mobile money, transfer or card go into programmes like the ones on the Our Work page.",
    otherEyebrow: "Beyond money",
    otherTitle: "Other ways to help",
    otherWays: [
      {
        icon: "heart",
        title: "Volunteer",
        body: "We work with trainers, artisans, teachers and coordinators across our programmes. Tell us what you do and where you are.",
        linkLabel: "Offer your time",
        link: "/contact",
      },
      {
        icon: "package",
        title: "In-kind support",
        body: "Looms, drums, raw materials, packaging, transport and venue space all reduce programme cost directly.",
        linkLabel: "Discuss in-kind support",
        link: "/partner",
      },
    ],
    newsletterEyebrow: "Stay in touch",
    newsletterTitle: "Hear when a programme opens or completes",
  },

  newsPage: {
    showStrip: true,
    storiesEyebrow: "Programme updates",
    learntLabel: "What they learnt",
    pressPanelLabel: "In the news",
    eventsEyebrow: "Upcoming",
    eventsTitle: "Where to see us next",
    pastEventsTitle: "Past events",
    noEventsTitle: "No dates announced yet",
    noEventsBody:
      "We publish showcases and programme events here once venues and dates are confirmed. Sign up and we will tell you first.",
    noEventsLinkIntro: "Planning something with us?",
    noEventsLinkLabel: "Get in touch",
    stripLabel: "From Nkrabea's performances",
    stripPhotos: [PHOTOS.smockDancerBack, PHOTOS.smockDancerLeap, PHOTOS.singerCrouching],
    stripNote: "Captions will carry the event, venue and date once Nkrabea supplies them.",
    pressEyebrow: "Press",
    pressLinkLabel: "See the coverage",
    noPressNote: "Press mentions and partner logos will appear here once each relationship is evidenced.",
  },

  contactPage: {
    showPhoto: true,
    detailsEyebrow: "Details",
    detailsTitle: "Where to find us",
    followTitle: "Follow us",
    formTitle: "Send a message",
    formIntro: "We aim to respond within three working days.",
    breakPhoto: PHOTOS.drumRowWide,
    breakLabel: "Nkrabea Drumming and Dance Troupe",
    faqEyebrow: "Questions",
    faqTitle: "Frequently asked",
  },
};
