import { ORG, MISSION } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Organisation structured data.
 *
 * Every field here is evidenced by Nkrabea's own profile. In particular
 * foundingDate is the incorporation date, which is the only origin date the
 * organisation has documented. The 1995 claim carried by the earlier
 * prototype is held in NEEDS_EVIDENCE and deliberately absent.
 */
export function OrganisationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organisation`,
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ORG.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    slogan: ORG.motto,
    description: MISSION,
    foundingDate: "2021-05-14",
    address: {
      "@type": "PostalAddress",
      streetAddress: "AE 5 Adenta Village, near Adenta Village Square",
      addressLocality: "Adentan Municipal",
      addressRegion: "Greater Accra Region",
      addressCountry: "GH",
      postOfficeBoxNumber: "GP 21270",
    },
    email: ORG.email,
    telephone: ORG.phones,
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Partnerships and funding",
      email: ORG.email,
      telephone: ORG.phones[0],
      areaServed: "GH",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      // The object is built from local constants only, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
