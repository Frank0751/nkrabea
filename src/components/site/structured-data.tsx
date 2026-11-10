import { LOGO } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";
import { SITE_URL } from "@/lib/site";

/**
 * Organisation structured data.
 *
 * Every field here is evidenced by Nkrabea's own profile. In particular
 * foundingDate is the incorporation date, which is the only origin date the
 * organisation has documented. The 1995 claim carried by the earlier
 * prototype is held in NEEDS_EVIDENCE and deliberately absent.
 */
export async function OrganisationSchema() {
  const { org, mission } = await getSiteContent();
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organisation`,
    name: org.name,
    legalName: org.legalName,
    alternateName: org.shortName,
    url: SITE_URL,
    // The badge square on white: search engines show a logo on white.
    logo: LOGO.schema,
    slogan: org.motto,
    description: mission,
    foundingDate: "2021-05-14",
    address: {
      "@type": "PostalAddress",
      streetAddress: "AE 5 Adenta Village, near Adenta Village Square",
      addressLocality: "Adentan Municipal",
      addressRegion: "Greater Accra Region",
      addressCountry: "GH",
      postOfficeBoxNumber: "GP 21270",
    },
    email: org.email,
    telephone: org.phones,
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Partnerships and funding",
      email: org.email,
      telephone: org.phones[0],
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
