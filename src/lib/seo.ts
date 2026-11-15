import type { Metadata } from "next";
import { site } from "@/lib/content";

/**
 * Public address of the live site, used for canonical URLs, the sitemap and social previews.
 * Set SITE_URL in .env.local on the server (e.g. https://www.mobifrag.com) BEFORE `npm run build`.
 */
export const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Default image for link previews on WhatsApp, Facebook, LinkedIn, X, etc. (1200×630). */
export const defaultOgImage = "/og-image.jpg";

export const keywords = [
  "fragrance oils",
  "fragrance oil supplier",
  "fragrance oils Pakistan",
  "fragrance oil supplier Lahore",
  "bulk fragrance oils",
  "perfume oils wholesale",
  "industrial fragrances",
  "cosmetic fragrances",
  "soap fragrance oil",
  "shampoo fragrance",
  "flavour oils",
  "food flavours supplier",
  "sharbat flavours",
  "attar oils",
  "fragrance oils UAE",
  "Mobifrag",
];

type PageSeo = {
  title: string;
  description: string;
  /** Route path, e.g. "/fragrances" */
  path: string;
  /** Page-specific preview image under /public, e.g. "/media/banner-fragrances.jpg" */
  image?: string;
  /** Keep a page out of search results (e.g. placeholder content) */
  noIndex?: boolean;
};

/** Builds complete, consistent metadata for a page: title, description, canonical URL and social previews. */
export function pageMetadata({ title, description, path, image, noIndex }: PageSeo): Metadata {
  const images = [{ url: image ?? defaultOgImage, alt: `${site.name}: ${title}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: images.map((i) => i.url),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** True while a news item still contains template text (kept out of the sitemap and search results). */
export function isPlaceholderNews(item: { body: string[] }) {
  return item.body.some((p) => p.startsWith("Placeholder"));
}

/** Structured data describing the business, so search engines can show rich company details. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-dark.png`,
    image: `${siteUrl}${defaultOgImage}`,
    description: site.description,
    email: site.email,
    foundingDate: "2016",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address[0],
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    location: [
      {
        "@type": "Place",
        name: `${site.name} Head Office`,
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      },
      {
        "@type": "Place",
        name: `${site.name} International Centre`,
        address: { "@type": "PostalAddress", addressCountry: "AE" },
      },
    ],
    areaServed: ["Pakistan", "United Arab Emirates", "Middle East"],
    knowsAbout: ["Fragrance oils", "Perfume oils", "Industrial fragrances", "Cosmetic fragrances", "Flavour oils"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      areaServed: ["PK", "AE"],
      availableLanguage: ["English", "Urdu"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };
}

/** Safely serialises JSON-LD for a <script> tag (escapes "<" to prevent script injection). */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
