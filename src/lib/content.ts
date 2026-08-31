// Content data for Nkrabea Culture & Arts Ensemble
// All copy grounded in research: Facebook About, SID Festival profile, post captions.

export const ORG = {
  name: "Nkrabea Culture & Arts Ensemble",
  shortName: "Nkrabea",
  tagline: "Impacting Lives Through Culture & The Arts",
  mission:
    "Translating Ghanaian culture into something the world can feel and understand.",
  foundedYear: 1995,
  type: "Non-profit organisation",
  location: "GO-001-2360, Number AE 5, Adenta Village, Accra, Ghana",
  phones: ["+233 20 852 2120", "+233 55 612 2230"],
  email: "nkrabea.cna@gmail.com",
  website: "nkrabeacultureandarts.org",
  social: {
    instagram: "https://www.instagram.com/nkra.bea",
    facebook:
      "https://www.facebook.com/profile.php?id=61552136214349",
    tiktok: "https://www.tiktok.com/@hayeoye_",
  },
};

export const STATS = [
  { value: "1995", label: "Founded in Accra" },
  { value: "30", label: "Years preserving heritage" },
  { value: "40+", label: "Dance and drum forms" },
  { value: "12", label: "Countries performed in" },
];

export const ABOUT = {
  lead: "A non-profit ensemble keeping the rhythm of Ghana alive for the next generation.",
  body: [
    "Nkrabea Culture & Arts Ensemble was formed in 1995 with a clear vision: to preserve traditional African dance forms and carry them to an international stage, while building a pool of professional dancers who live from their craft.",
    "We are rooted in Adenta, Accra, and our work spans performance, education and community development. From royal court traditions like Adowa and Kete to the energy of Ghanaian street dance, we translate heritage into movement that audiences everywhere can feel.",
    "As a non-governmental organisation, every booking, workshop and partnership funds the training of young artists and the documentation of forms that risk being lost.",
  ],
};

export type Program = {
  id: string;
  name: string;
  origin: string;
  summary: string;
  details: string[];
  image: string;
  meaning: string;
  instruments: string[];
  rhythm: string;
  when: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "adowa",
    name: "Adowa",
    origin: "Akan, Ashanti Region",
    summary:
      "An elegant Akan dance of expression, performed at funerals and gatherings. Graceful hand gestures carry proverbs the audience reads in motion.",
    details: [
      "Symbolic hand gestures encoding proverbs",
      "Performed by soloists and ensemble",
      "Accompanied by fontomfrom and apentema drums",
    ],
    image: "/images/program-adowa.png",
    meaning:
      "Adowa is the dance of condolence and celebration alike. Every gesture is a word, and a full performance can read as a proverb spoken through the body. Audiences who understand the language of the hands hear a story without a single spoken line.",
    instruments: ["Fontomfrom", "Apentema", "Donno (hourglass drum)", "Bells"],
    rhythm: "Slow, measured 4/4 with improvisational accents",
    when: "Funerals, festivals, durbars and state gatherings",
  },
  {
    id: "kete",
    name: "Kete",
    origin: "Ashanti Royal Court",
    summary:
      "A royal court dance-drumming tradition held at the court of the Asantehene. Refinement, restraint and precision define every performance.",
    details: [
      "Court music of the Asantehene",
      "Pipes, vocals and a family of drums",
      "Performed for chiefs and state occasions",
    ],
    image: "/images/program-kete.png",
    meaning:
      "Kete is court music in the strictest sense, held at the court of the Asantehene in Kumasi. To perform it is to carry centuries of protocol. The restraint of the dancers is itself a statement of respect for the stool.",
    instruments: ["Kete family of drums", "Atumpan (talking drums)", "Bamboo pipes", "Vocals"],
    rhythm: "Layered, interlocking patterns in 6/8",
    when: "Royal court occasions, chiefly installations, festivals",
  },
  {
    id: "drumming",
    name: "Traditional Drumming",
    origin: "Across Ghana",
    summary:
      "Fontomfrom, kete, apentema and atumpan. The drum speaks before the dancer moves, carrying messages older than the written word.",
    details: [
      "Talking drums that carry language",
      "Call and response ensemble structure",
      "Foundation training for every ensemble member",
    ],
    image: "/images/program-drumming.png",
    meaning:
      "In Akan tradition the drum is not an accompaniment, it is the speaker. Atumpan drums reproduce the tones of Twi, so a skilled drummer can praise a chief, summon a gathering, or recount a lineage. Learning to drum is learning to speak.",
    instruments: ["Fontomfrom", "Atumpan", "Apentema", "Brenko", "Donno"],
    rhythm: "Polyrhythmic, call and response, tempo led by the master drummer",
    when: "All ceremonial and educational contexts",
  },
  {
    id: "street",
    name: "Cultural Street Dance",
    origin: "Contemporary Accra",
    summary:
      "Where tradition meets the street. A fusion programme that brings Adowa footwork and drum rhythm into modern Ghanaian movement.",
    details: [
      "Fusion of traditional and contemporary",
      "Designed for festivals and public stages",
      "Built by and for young artists",
    ],
    image: "/images/program-street.png",
    meaning:
      "Heritage only survives if the next generation makes it their own. Our street dance programme takes the footwork of Adowa and the polyrhythm of the court and sets them in conversation with contemporary Accra. It is tradition, but it is not stuck.",
    instruments: ["Traditional drums", "Modern percussion", "Vocal hooks"],
    rhythm: "Hybrid, built on traditional 6/8 with contemporary breakdowns",
    when: "Public stages, festivals, youth showcases",
  },
];

export type ServiceLine = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const SERVICES: ServiceLine[] = [
  {
    id: "performance",
    title: "Live Performances",
    description:
      "Full ensemble bookings for festivals, theatres, state functions and cultural exchanges. 8 to 25 performers, scalable to your stage.",
    deliverables: [
      "Choreographed 20 to 60 minute sets",
      "Live drumming and vocals",
      "Full costume and instrument logistics",
    ],
  },
  {
    id: "workshop",
    title: "Workshops & Residencies",
    description:
      "Hands-on teaching for schools, universities and international visitors. Learn movement, rhythm and the meaning behind them.",
    deliverables: [
      "Beginner to advanced tracks",
      "Movement and drumming streams",
      "Custom residency design",
    ],
  },
  {
    id: "education",
    title: "Youth Academy",
    description:
      "Our year round training programme for young Ghanaian artists. Free and subsidised places, funded by our performance revenue.",
    deliverables: [
      "Structured multi year curriculum",
      "Master teachers from the ensemble",
      "Pathway to professional performance",
    ],
  },
  {
    id: "documentation",
    title: "Heritage Documentation",
    description:
      "We record elders, master drummers and disappearing forms. Audio, video and notation, archived for future generations.",
    deliverables: [
      "Field recordings across regions",
      "Dance notation and translation",
      "Open archive access for scholars",
    ],
  },
];

export type EnsembleMember = {
  name: string;
  role: string;
  focus: string;
};

export const ENSEMBLE: EnsembleMember[] = [
  { name: "The Master Drummers", role: "Rhythmic Foundation", focus: "Fontomfrom, kete, atumpan" },
  { name: "Principal Dancers", role: "Lead Movement", focus: "Adowa, kete, contemporary" },
  { name: "Vocalists", role: "Song & Call", focus: "Akan oral tradition" },
  { name: "Apprentice Company", role: "Next Generation", focus: "Youth Academy graduates" },
];

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

export const EVENTS: EventItem[] = [
  {
    id: "e1",
    date: "2025-12-14",
    day: "14",
    month: "Dec",
    title: "Heritage Night: Adowa & Kete",
    venue: "National Theatre, Accra",
    type: "Performance",
    status: "upcoming",
  },
  {
    id: "e2",
    date: "2026-01-18",
    day: "18",
    month: "Jan",
    title: "Youth Academy Open Showcase",
    venue: "Adenta Community Stage",
    type: "Showcase",
    status: "open",
  },
  {
    id: "e3",
    date: "2026-02-07",
    day: "07",
    month: "Feb",
    title: "Drumming Masterclass Series",
    venue: "Nkrabea Studio, Adenta",
    type: "Workshop",
    status: "open",
  },
  {
    id: "e4",
    date: "2026-03-06",
    day: "06",
    month: "Mar",
    title: "Independence Day Cultural Street Dance",
    venue: "Black Star Square, Accra",
    type: "Festival",
    status: "upcoming",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The rhythm, the movement, the elegance. Adowa and Kete in motion. Nkrabea brings the court to the stage with a discipline you rarely see.",
    author: "Festival Programmer",
    role: "West African Arts Circuit",
  },
  {
    quote:
      "Our students did not just learn steps. They learned what a proverb sounds like when it is danced. That changed how they see heritage.",
    author: "University Faculty Lead",
    role: "Diaspora Residency Partner",
  },
  {
    quote:
      "Booking Nkrabea funded a full year of training for two young artists. That is the model working exactly as it should.",
    author: "Corporate Sponsor",
    role: "Annual Gala Host",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const MILESTONES: Milestone[] = [
  {
    year: "1995",
    title: "The Ensemble Forms",
    description:
      "A group of dancers and drummers gather in Accra with one aim: take traditional forms to the world stage.",
  },
  {
    year: "2004",
    title: "First International Tour",
    description:
      "Nkrabea performs across Europe, carrying Adowa and Kete to audiences who had never seen live court drumming.",
  },
  {
    year: "2015",
    title: "Youth Academy Launches",
    description:
      "Performance revenue funds a free training programme for young Ghanaian artists, the future of the ensemble.",
  },
  {
    year: "2024",
    title: "Heritage Archive Begins",
    description:
      "A long term project to record elders and disappearing forms starts, building an open archive for scholars.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  span: "tall" | "wide" | "square";
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/social/fb-1.jpg",
    alt: "Nkrabea dancers in kente cloth and beaded necklaces with camera crew",
    caption: "Dancers in full regalia",
    span: "wide",
  },
  {
    src: "/images/social/fb-2.jpg",
    alt: "Close up of a Nkrabea dancer mid movement with beadwork",
    caption: "Movement in detail",
    span: "tall",
  },
  {
    src: "/images/social/fb-reel.jpg",
    alt: "Nkrabea dancer performing with drummers at a community celebration",
    caption: "Live at a celebration",
    span: "wide",
  },
  {
    src: "/images/social/fb-3.jpg",
    alt: "Art exhibition featuring a red robed figure painting",
    caption: "Visual arts collaboration",
    span: "square",
  },
  {
    src: "/images/social/fb-4.jpg",
    alt: "Circular painting titled Kosilodja with golden masks",
    caption: "Kosilodja, a cultural work",
    span: "square",
  },
  {
    src: "/images/social/fb-5.jpg",
    alt: "Installation of mixed media masks and textile collage",
    caption: "Mixed media installation",
    span: "wide",
  },
  {
    src: "/images/social/fb-6.jpg",
    alt: "Framed painting of a figure in patchwork robe between carved pillars",
    caption: "Textile and symbolism",
    span: "tall",
  },
  {
    src: "/images/social/fb-cover.jpg",
    alt: "Nkrabea mission statement impacting lives through culture and the arts",
    caption: "Our mission",
    span: "wide",
  },
];

export type FAQ = {
  q: string;
  a: string;
};

export const FAQS: FAQ[] = [
  {
    q: "Can I book the ensemble for an event outside Ghana?",
    a: "Yes. We tour internationally and scale the company to the stage and budget. Send a booking request with your dates and venue, and we will respond with a proposal.",
  },
  {
    q: "Are workshops open to complete beginners?",
    a: "They are. We run beginner, intermediate and advanced tracks. No prior dance or drumming experience is required for the beginner stream.",
  },
  {
    q: "Is the Youth Academy free?",
    a: "Places are free or subsidised, funded by our performance and partnership revenue. Auditions open once a year, and we prioritise applicants from the Adenta community.",
  },
  {
    q: "How can I support the ensemble?",
    a: "Book a performance, sponsor a young artist, fund a documentation trip, or join our newsletter to stay connected. Every contribution trains the next generation of Ghanaian artists.",
  },
  {
    q: "Do you collaborate with schools and universities?",
    a: "Regularly. We design residencies, lecture demonstrations and semester long modules for institutions in Ghana and abroad.",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: ORG.social.instagram, handle: "@nkra.bea" },
  { label: "Facebook", href: ORG.social.facebook, handle: "Nkrabea Culture & Arts Ensemble" },
  { label: "TikTok", href: ORG.social.tiktok, handle: "@hayeoye_" },
];

export type PressItem = {
  name: string;
  context: string;
};

export const PRESS: PressItem[] = [
  { name: "SID Festival", context: "Featured ensemble" },
  { name: "National Theatre Ghana", context: "Resident performer" },
  { name: "Ghana Dance Ensemble", context: "Collaborator" },
  { name: "Institute of African Studies", context: "Archive partner" },
  { name: "Black Star Square", context: "Independence Day stage" },
  { name: "Panafest", context: "Cultural showcase" },
];

export type Story = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

export const STORIES: Story[] = [
  {
    id: "s1",
    category: "Field Notes",
    title: "The language the atumpan drum speaks",
    excerpt:
      "How a pair of tuned drums can praise a chief, summon a gathering, or recount a lineage in the tones of Twi. A note from our master drummer on why the drum is a speaker first.",
    date: "Nov 2025",
    readTime: "4 min read",
    image: "/images/gallery-drums.png",
  },
  {
    id: "s2",
    category: "On Tour",
    title: "Carrying Adowa to a European festival stage",
    excerpt:
      "What changes when a court dance meets a foreign audience, and what does not. Reflections from our most recent international tour.",
    date: "Oct 2025",
    readTime: "6 min read",
    image: "/images/program-adowa.png",
  },
  {
    id: "s3",
    category: "Youth Academy",
    title: "Three apprentices, three years in",
    excerpt:
      "Meet three young artists who joined the Youth Academy with no prior training. Where they are now, and what heritage means to them.",
    date: "Sep 2025",
    readTime: "5 min read",
    image: "/images/program-street.png",
  },
];
