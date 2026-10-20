import { profile } from "./content";

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL in your host so canonical links, sitemap and social cards use it. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? profile.site).replace(/\/$/, "");

export const seo = {
  title: "Senior Web Developer Dubai | Mohammad Zeeshan Fayyaz",
  shortTitle: "Zeeshan Fayyaz | Web Developer, Dubai",
  // Kept under 160 characters so Google shows it in full.
  description:
    "Team Lead and full-stack developer in Dubai: Next.js, React, Node.js, Shopify and WordPress. 200+ sites delivered, 20+ markets, trading platform and Salesforce integrations.",
  keywords: [
    "web developer Dubai",
    "senior web developer",
    "Next.js developer",
    "React developer",
    "Shopify developer",
    "Shopify theme development",
    "WordPress developer",
    "WooCommerce developer",
    "MT5 integration",
    "MT4 integration",
    "fintech web development",
    "Strapi CMS",
    "Salesforce integration",
    "freelance web developer UAE",
  ],
};

const knowsAbout = ["Next.js", "React", "Shopify", "WordPress", "WooCommerce", "Node.js", "Strapi", "MT5/MT4 integration", "Salesforce", "Search engine optimization"];

/** Structured data: tells Google who the page is about. Only facts that are already visible on the page. */
export function jsonLd() {
  const personId = `${siteUrl}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: `${profile.name} | Portfolio`,
        description: seo.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: `${siteUrl}/`,
        name: seo.title,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        givenName: "Mohammad Zeeshan",
        familyName: "Fayyaz",
        jobTitle: profile.title,
        description: profile.summary,
        url: `${siteUrl}/`,
        image: `${siteUrl}${profile.photo}`,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        worksFor: { "@type": "Organization", name: profile.company },
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        sameAs: [profile.linkedin, profile.github],
        knowsAbout,
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Engineering & Technology (UET) Taxila" },
      },
    ],
  };
}
