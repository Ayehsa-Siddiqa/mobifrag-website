// All site copy lives here so it can be edited in one place.
// Images: drop files into /public/media and set the `image` field (e.g. "/media/fragrance.jpg").
// Until an image is set, an elegant tone placeholder is shown instead.

export type Tone = "teal" | "sand" | "ink" | "rose" | "olive" | "amber";

export const site = {
  name: "Mobifrag",
  tagline: "Fragrances · Flavours",
  description:
    "Mobifrag supplies fragrance oils and flavour oils in bulk to manufacturers of perfumes, soaps, shampoos, cosmetics and beverages, from Lahore, Pakistan and the UAE.",
  email: "mobifragofficial@gmail.com",
  phone: "+00 000 000 000",
  address: ["Johar Town", "Lahore, Pakistan"],
  // Homepage hero: clips play one after another with a mehandi-green tint.
  // Replace with your own brand film clips in /public/media when you have them.
  heroScenes: [
    { video: "/media/hero-1.mp4", poster: "/media/hero-1.jpg", label: "Fragrance oils" },
    { video: "/media/hero-2.mp4", poster: "/media/hero-2.jpg", label: "Flavours" },
    { video: "/media/hero-3.mp4", poster: "/media/hero-3.jpg", label: "Nature" },
    { video: "/media/hero-4.mp4", poster: "/media/hero-4.jpg", label: "Craft" },
  ],
  // Shown if heroScenes is empty
  heroImage: "/media/hero.jpg" as string | null,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const nav = [
  { label: "Fragrances", href: "/fragrances" },
  { label: "Flavours", href: "/flavours" },
  { label: "About us", href: "/about" },
  { label: "Our story", href: "/our-story" },
  { label: "CSR", href: "/csr" },
  { label: "Centres", href: "/centres" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const primaryNav = nav.slice(0, 2);
export const secondaryNav = nav.slice(2);

export type Section = {
  eyebrow: string;
  title: string;
  body: string;
  tone: Tone;
  image?: string;
  /** Optional looping video shown over the image (the image is its poster) */
  video?: string;
  link?: { label: string; href: string };
  /** Optional list shown as tags under the text */
  items?: string[];
  itemsLabel?: string;
};

export const expertises: (Section & { href: string })[] = [
  {
    eyebrow: "01",
    title: "Fragrances",
    body: "Fine fragrance, personal care and home scents composed by perfumers who listen first.",
    tone: "teal",
    image: "/media/fragrances.jpg",
    href: "/fragrances",
  },
  {
    eyebrow: "02",
    title: "Flavours",
    body: "Concentrated fragrance oils for attars, body sprays, incense, candles and care products.",
    tone: "amber",
    image: "/media/sc-jasmine.jpg",
    href: "/flavours",
  },
];

export const homeSections: Section[] = [
  {
    eyebrow: "Know-how",
    title: "Where craft meets science",
    image: "/media/home-knowhow.jpg",
    body: "Every Mobifrag creation starts with a conversation and ends in the lab. Our perfumers, evaluators and chemists work side by side, turning a brief into something people remember.",
    tone: "sand",
    link: { label: "Discover Mobifrag", href: "/about" },
  },
  {
    eyebrow: "Responsibility",
    title: "Growing with the land",
    image: "/media/home-responsibility.jpg",
    body: "We work directly with growers, invest in traceable supply chains and measure our footprint every year, so that the ingredients of tomorrow are still there.",
    tone: "olive",
    link: { label: "Our CSR commitments", href: "/csr" },
  },
  {
    eyebrow: "Worldwide",
    title: "Close to every market",
    image: "/media/home-worldwide.jpg",
    video: "/media/home-worldwide.mp4",
    body: "From our head office in Lahore and our international centre in the UAE, we supply fragrance and flavour oils to manufacturers across the region, with an understanding of each market's favourite scents.",
    tone: "teal",
    link: { label: "Find a centre", href: "/centres" },
  },
];

export type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  tone: Tone;
  heroImage?: string;
  /** Optional looping video for the page banner (heroImage is its poster) */
  heroVideo?: string;
  sections: Section[];
  /** Closing image + text block (e.g. regulatory support) */
  closing?: Section;
  /** Horizontal strip of raw-material photos shown under the banner */
  carousel?: { label: string; image: string }[];
  /** Full-window image bands, each shown after section number `after` (1-based) */
  bands?: { image: string; eyebrow?: string; text: string; after: number }[];
  /** Full-width gallery bar, shown after section number `after` (1-based) */
  gallery?: { title: string; after: number; items: { label: string; image: string }[] };
};

// Titles may contain "\n" to break onto two lines.
export const pages: Record<string, PageContent> = {
  fragrances: {
    eyebrow: "Expertise",
    title: "Fragrances",
    intro:
      "A great fragrance tells a story before a word is spoken. Mobifrag perfumers compose scents that give brands a voice, in a bottle of perfume as much as in a bar of soap or a scented candle.",
    tone: "teal",
    heroImage: "/media/banner-fragrances.jpg",
    bands: [{ image: "/media/fb-frag.jpg", eyebrow: "Our signature", text: "A single drop can carry a whole story.", after: 2 }],
    gallery: {
      title: "Fragrance\nmoments",
      after: 4,
      items: [
        { label: "Morning dew", image: "/media/g-dew-leaf.jpg" },
        { label: "Green notes", image: "/media/g-fern-shadow.jpg" },
        { label: "Woody & earthy", image: "/media/g-moss-wood.jpg" },
        { label: "The ritual", image: "/media/g-tea-ritual.jpg" },
        { label: "Still life", image: "/media/g-still-life.jpg" },
        { label: "Amber dusk", image: "/media/g-amber-dusk.jpg" },
        { label: "Fresh leaf", image: "/media/g-fresh-leaf.jpg" },
      ],
    },
    sections: [
      {
        eyebrow: "Creation",
        title: "Bespoke scents,\nmany perspectives",
        image: "/media/frag-bespoke.jpg",
        body: "Our perfumers come from different backgrounds and bring different sensibilities. Together they build bespoke olfactory signatures for each brief, whether it is a fine fragrance, a body care line or a home scent.",
        tone: "rose",
        items: ["Fine fragrance", "Body & hair care", "Home care", "Air care & candles", "Fabric care"],
      },
      {
        eyebrow: "Worldwide",
        title: "Close to\nevery market",
        image: "/media/frag-market.jpg",
        body: "Creation and application teams in several regions keep us close to each market. We read local preferences, follow trends as they emerge and adapt every fragrance to the people who will wear or use it.",
        tone: "teal",
        link: { label: "Our centres", href: "/centres" },
      },
      {
        eyebrow: "Naturalness",
        title: "Authentic and\nresponsible formulas",
        image: "/media/frag-care.jpg",
        body: "We design formulas with a high share of natural-origin materials and can build to natural and organic standards on request. Every material is selected for its quality, traceability and environmental profile.",
        tone: "sand",
      },
      {
        eyebrow: "Quality",
        title: "Fragrances\nyou can trust",
        image: "/media/ingr-quality.jpg",
        body: "Each fragrance follows strict quality procedures and current international safety standards, from the weighing of raw materials to final release.",
        tone: "olive",
      },
    ],
    closing: {
      eyebrow: "Regulatory",
      title: "Regulatory expertise\nbehind every creation",
      image: "/media/regulatory.jpg",
      body: "Our regulatory specialists check every formula against the rules of each destination market and prepare the documentation you need, so your launches stay safe, compliant and on schedule.",
      tone: "sand",
      link: { label: "Contact our teams", href: "/contact" },
    },
  },
  flavours: {
    eyebrow: "Expertise",
    title: "Flavours",
    intro:
      "Mobifrag flavours are concentrated fragrance oils: rich, long-lasting scents for perfume oils and attars, body sprays, incense, candles and everyday care products. Each one is composed by our perfumers and blended to perform in the product it is made for.",
    tone: "amber",
    heroImage: "/media/banner-flavours.jpg",
    heroVideo: "/media/banner-flavours-video.mp4",
    bands: [{ image: "/media/fb-flav.jpg", eyebrow: "The art of blending", text: "Warm, rich, unforgettable: flavours that linger.", after: 3 }, { image: "/media/fb-home.jpg", eyebrow: "Rose", text: "Every scent begins with nature and ends in emotion.", after: 5 }],
    carousel: [
      { label: "Vanilla", image: "/media/fm-vanilla.jpg" },
      { label: "Cocoa", image: "/media/fl-cocoa.jpg" },
      { label: "Coffee", image: "/media/fl-coffee.jpg" },
      { label: "Caramel", image: "/media/fl-caramel.jpg" },
      { label: "Hazelnut", image: "/media/fl-hazelnut.jpg" },
      { label: "Peach", image: "/media/fl-peach.jpg" },
      { label: "Tea", image: "/media/fl-tea.jpg" },
      { label: "Cola", image: "/media/fl-cola.jpg" },
      { label: "Oat", image: "/media/fl-oat.jpg" },
      { label: "Rose", image: "/media/sc-rose.jpg" },
      { label: "Jasmine", image: "/media/sc-jasmine.jpg" },
      { label: "White musk", image: "/media/sc-musk.jpg" },
      { label: "Saffron", image: "/media/sc-saffron.jpg" },
      { label: "Amber", image: "/media/sc-amber.jpg" },
      { label: "Sandalwood", image: "/media/news-csr.jpg" },
      { label: "Vetiver", image: "/media/vetiver.jpg" },
      { label: "Incense", image: "/media/sc-incense.jpg" },
    ],
    sections: [
      {
        eyebrow: "Creation",
        title: "Scents, crafted\nwith care",
        image: "/media/sc-attar-vial.jpg",
        body: "Our perfumers balance natural extracts and modern aroma materials to build fragrance oils with character, depth and lasting power. Every flavour starts from your brief and is refined until it smells exactly right.",
        tone: "amber",
      },
      {
        eyebrow: "Scent families",
        title: "A flavour for\nevery mood",
        image: "/media/sc-musk.jpg",
        body: "From soft florals to deep ouds, our library covers every olfactory family, and we create new accords on request.",
        tone: "rose",
        itemsLabel: "Families",
        items: [
          "Floral",
          "Oud & woody",
          "Musk",
          "Amber & oriental",
          "Fresh & citrus",
          "Aquatic",
          "Fruity",
          "Spicy",
          "Gourmand",
          "Herbal & green",
        ],
      },
      {
        eyebrow: "Applications",
        title: "Made for\nyour product",
        image: "/media/sc-candle.jpg",
        body: "Each fragrance oil is tested in the product it will live in, so the scent stays true, stable and long-lasting.",
        tone: "sand",
        itemsLabel: "Used in",
        items: [
          "Perfume oils & attars",
          "Perfumes & body sprays",
          "Bakhoor & incense",
          "Air fresheners & diffusers",
          "Candles",
          "Soaps & personal care",
          "Detergents & home care",
        ],
      },
      {
        eyebrow: "Formats",
        title: "Ready for\nyour production",
        image: "/media/sc-oil-bottle.jpg",
        body: "Our flavours are supplied in the form that suits your process, from pure concentrates to ready-to-fill bases.",
        tone: "olive",
        itemsLabel: "Available as",
        items: [
          "Concentrated fragrance oil",
          "Alcohol-free attar oil",
          "Ready-to-fill perfume base",
          "Water-soluble fragrance",
          "Custom blends",
        ],
      },
      {
        eyebrow: "Partnership",
        title: "Creation in\nclose dialogue",
        image: "/media/sc-attar.jpg",
        body: "We share samples, adjust each accord with you and stay alongside your team from the first trial to full-scale production.",
        tone: "teal",
      },
      {
        eyebrow: "Naturalness",
        title: "Natural, transparent\nand responsible",
        image: "/media/ingr-specialities.jpg",
        body: "We favour natural extracts from traceable sources, such as rose, jasmine, sandalwood and saffron, and we are open about what goes into every oil.",
        tone: "olive",
      },
      {
        eyebrow: "Quality",
        title: "Consistent,\nbatch after batch",
        image: "/media/about-quality.jpg",
        body: "Strict checks at every stage keep each flavour identical from one batch to the next, so your product always smells the same.",
        tone: "sand",
      },
    ],
    closing: {
      eyebrow: "Regulatory",
      title: "Compliance\nyou can rely on",
      image: "/media/regulatory.jpg",
      body: "Our regulatory team checks every fragrance oil against the rules of your markets and prepares the safety documentation you need, so your launches stay compliant.",
      tone: "sand",
      link: { label: "Contact our teams", href: "/contact" },
    },
  },
  csr: {
    eyebrow: "Commitments",
    title: "Our commitments",
    heroImage: "/media/csr-hero.jpg",
    intro:
      "We create with nature, so we owe it our care. Our responsibility programme focuses on three areas where we can make the biggest difference.",
    tone: "olive",
    sections: [
      {
        eyebrow: "01 · Planet",
        title: "Caring for\nthe living world",
        image: "/media/csr-planet.jpg",
        body: "Responsible sourcing, a lower carbon footprint and careful use of water and energy help keep natural balances intact for the plants and communities we depend on.",
        tone: "olive",
      },
      {
        eyebrow: "02 · People",
        title: "Growing\ntogether",
        image: "/media/csr-communities.jpg",
        body: "We put people first: developing skills, caring for wellbeing at work, and supporting the growers and communities along our supply chains.",
        tone: "teal",
      },
      {
        eyebrow: "03 · Products",
        title: "Designing with\nless impact",
        image: "/media/csr-ecodesign.jpg",
        body: "Environmental thinking starts at the design stage: in the materials we choose, the formulas we build and the packaging we use.",
        tone: "sand",
      },
    ],
  },
  careers: {
    eyebrow: "Join us",
    title: "Careers",
    heroImage: "/media/careers-hero.jpg",
    intro: "Curious, creative, rigorous? Help us shape the scents of tomorrow.",
    tone: "teal",
    sections: [
      {
        eyebrow: "Why Mobifrag",
        title: "A place\nto grow",
        image: "/media/careers-why.jpg",
        body: "A human-sized company with international reach, where ideas are heard and talent is developed.",
        tone: "teal",
        link: { label: "Send your application", href: "/contact" },
      },
    ],
  },
};

// ---------- About page ----------
// ⚠ Replace every [placeholder] with Mobifrag's real facts before going live.
export const about = {
  eyebrow: "Mobifrag",
  title: "Mobifrag Group",
  heroImage: "/media/about-hero.jpg",
  intro:
    "Mobifrag is an independent creator of fragrance oils and flavours. We help brands of every size find a scent that is truly their own.",
  taglines: ["Fragrances · Flavours", "Crafted with nature, driven by curiosity"],
  values: [
    { title: "Creativity", body: "Original ideas, crafted by teams who love what they do." },
    { title: "Precision", body: "Rigour in every formula, every batch and every promise." },
    { title: "Partnership", body: "Moving forward together with our clients, growers and colleagues." },
    { title: "Care", body: "Respect for people, for nature and for the work done well." },
  ],
  network: {
    title: "Our\nnetwork",
    image: "/media/about-mission.jpg",
    body: [
      "Mobifrag works within a network of growers, research institutes and industry bodies serving the fragrance and flavour sector.",
      "[Add the associations, institutes and charters Mobifrag belongs to.]",
    ],
  },
  stats: [
    { value: "10", label: "years of expertise" },
    { value: "UAE", label: "international centre" },
    { value: "10", label: "employees" },
  ],
  quality: {
    title: "Our commitment\nto quality",
    image: "/media/about-quality.jpg",
    body: [
      "Quality is not a department at Mobifrag, it is how every team works.",
      "Raw materials are checked on arrival, formulas are verified before production, and every batch is tested before release.",
    ],
  },
};

// ---------- Our story timeline ----------
// ⚠ Replace with Mobifrag's real milestones.
export const story = {
  eyebrow: "Mobifrag",
  title: "Our\njourney",
  heroImage: "/media/story-hero.jpg",
  intro:
    "Ten years of fragrance and flavour oils, from a small team in Lahore to a supplier trusted by manufacturers across the region.",
  // Only the founding year is confirmed; other milestones are labelled by stage until exact years are known.
  timeline: [
    {
      year: "2016",
      title: "Founded in Lahore",
      body: "Mobifrag began in Lahore with a simple focus: high-quality fragrance oils, the raw materials that perfumes and scented products are made from.",
      image: "/media/story-founding.jpg",
      tone: "rose" as Tone,
    },
    {
      year: "Bulk",
      title: "Supplying industry",
      body: "As demand grew, we moved into bulk supply, delivering fragrance oils by the kilogram to manufacturers of perfumes, soaps, shampoos and cosmetics.",
      image: "/media/story-bulk.jpg",
      tone: "teal" as Tone,
    },
    {
      year: "Flavours",
      title: "Flavours division",
      body: "We added flavour oils for drinks, sharbat and food products, bringing the same care for quality to everything people taste.",
      image: "/media/story-growth.jpg",
      tone: "amber" as Tone,
    },
    {
      year: "UAE",
      title: "International centre",
      body: "Our centre in the United Arab Emirates brought us closer to clients across the Gulf and beyond, with faster supply and local support.",
      image: "/media/centre-middleeast.jpg",
      tone: "sand" as Tone,
    },
    {
      year: "Today",
      title: "Ten years on",
      body: "A dedicated team of ten, two locations and a growing library of fragrance and flavour oils, supplied in bulk to brands that want quality they can rely on.",
      image: "/media/story-today-lab.jpg",
      tone: "teal" as Tone,
    },
  ],
};

// ---------- Centres ----------
// ⚠ Replace with real addresses.
export const centresIntro =
  "Wherever our clients are, a Mobifrag team is close by, ready to create, test and support.";

export const centres: { image?: string; region: string; city: string; role: string; address: string[]; phone?: string; tone: Tone }[] = [
  { image: "/media/centre-asia.jpg", region: "Pakistan", city: "Head office, Lahore", role: "Fragrance & flavour oils, bulk supply", address: [...site.address], tone: "olive" },
  { image: "/media/centre-middleeast.jpg", region: "United Arab Emirates", city: "International centre", role: "Regional supply & customer service", address: ["United Arab Emirates"], tone: "amber" },
];

/** Hero image for the Centres page */
export const centresHeroImage = "/media/centres-hero.jpg";

export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  tone: Tone;
  image?: string;
};

export const news: NewsItem[] = [
  {
    slug: "new-creative-centre",
    category: "International",
    date: "2026-10-01",
    title: "Mobifrag opens a new creative centre",
    image: "/media/news-centre.jpg",
    excerpt: "A new space dedicated to co-creation with our regional partners.",
    body: [
      "Placeholder article. Replace this text with your own announcement.",
      "Describe the new centre, the team based there and what it brings to customers in the region.",
    ],
    tone: "teal",
  },
  {
    slug: "trade-show-2026",
    category: "Events",
    date: "2026-09-15",
    title: "Meet us at the next beauty trade show",
    image: "/media/news-tradeshow.jpg",
    excerpt: "Discover our latest fragrance collection on our stand.",
    body: [
      "Placeholder article. Replace with event details: dates, location and stand number.",
    ],
    tone: "rose",
  },
  {
    slug: "sustainable-sourcing",
    category: "Sourcing",
    date: "2026-07-20",
    title: "A new sustainable sourcing partnership",
    image: "/media/news-sourcing.jpg",
    excerpt: "Working hand in hand with growers for a traceable supply.",
    body: [
      "Placeholder article. Explain the partnership, the ingredient involved and its positive impact.",
    ],
    tone: "olive",
  },
  {
    slug: "csr-report",
    category: "About Mobifrag",
    date: "2026-06-05",
    title: "Our annual CSR report is out",
    image: "/media/news-csr.jpg",
    excerpt: "A look back at a year of progress on our commitments.",
    body: [
      "Placeholder article. Summarise your key figures and link to the report PDF.",
    ],
    tone: "sand",
  },
];
