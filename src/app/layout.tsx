import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site/header";
import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { RhythmLine } from "@/components/site/rhythm-line";
import { KenteStrip } from "@/components/site/kente-strip";
import { MotionProvider } from "@/components/site/motion-provider";
import { ORG } from "@/lib/content";
import { SITE_URL, IS_PUBLIC_SITE } from "@/lib/site";
import { OrganisationSchema } from "@/components/site/structured-data";
import { Analytics } from "@/components/site/analytics";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { SiteContentProvider } from "@/components/site/site-content-context";
import { getSiteContent } from "@/lib/site-content";

/**
 * Ubuntu is the site's one typeface, for headings, body and interface, with
 * Ubuntu Mono for small technical labels. Both are openly licensed, so
 * next/font downloads them at build time and serves them from our own domain:
 * no third party in the critical path.
 */
const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = Ubuntu_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // A deployment URL is not the organisation's public site. Keep it out of the
  // index so it cannot compete with the real domain later. See lib/site.ts.
  robots: IS_PUBLIC_SITE
    ? undefined
    : { index: false, follow: false, nocache: true },
  title: {
    default:
      "Nkrabea Culture and Arts Ensemble | Impacting Lives Through Culture and the Arts",
    template: "%s | Nkrabea Culture and Arts Ensemble",
  },
  description:
    "A registered Ghanaian NGO using culture and the creative arts as tools for socio-economic development, with a particular commitment to Ghana's most marginalised communities.",
  keywords: [
    "Nkrabea",
    "Ghanaian NGO",
    "culture and arts Ghana",
    "persons with disabilities Ghana",
    "kente weaving training",
    "skills development Ghana",
    "Adentan",
    "Accra",
  ],
  authors: [{ name: ORG.legalName }],
  openGraph: {
    title: "Nkrabea Culture and Arts Ensemble",
    description:
      "A registered Ghanaian NGO using culture and the creative arts as tools for socio-economic development. Adentan Municipal, Greater Accra.",
    siteName: "Nkrabea Culture and Arts Ensemble",
    locale: "en_GH",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nkrabea Culture and Arts Ensemble",
    description:
      "Impacting lives through culture and the arts. A registered Ghanaian NGO.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Contact details and the programme list for the client components (the
  // header and the forms). Everything else reads getSiteContent() itself.
  const { org, programmes, socials } = await getSiteContent();
  const clientContent = {
    org,
    programmes: programmes.map(({ id, name, status }) => ({ id, name, status })),
    socials,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ubuntu.variable} ${mono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Every photograph comes from here, the hero one first of all. */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteContentProvider value={clientContent}>
          <MotionProvider>
            <OrganisationSchema />
            <a href="#main" className="skip-link">
              Skip to main content
            </a>
            <RhythmLine />
            <KenteStrip />
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
              <WhatsAppFloat />
              <BackToTop />
            </div>
          </MotionProvider>
          </SiteContentProvider>
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
