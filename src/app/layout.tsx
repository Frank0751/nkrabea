import type { Metadata } from "next";
import { Manrope, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
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

/**
 * Body. Manrope is the closest openly licensed match to Satoshi's
 * humanist-geometric construction, and being variable it covers every weight
 * the site uses from one file.
 */
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display. DM Serif Display is koombei-studio-skill Part 3's first named face
 * for NGO and social-impact work.
 *
 * It ships at weight 400 only. Nothing in the site may apply a heavier weight
 * to it: the browser would synthesise a fake bold and smear the letterforms.
 * globals.css disables font-synthesis on the display family as a hard guard.
 */
const display = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
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
  icons: {
    icon: "/logo.svg",
  },
  alternates: {
    canonical: "/",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${body.variable} ${display.variable} ${mono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
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
              <BackToTop />
            </div>
          </MotionProvider>
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
