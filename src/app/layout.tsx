import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site/header";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: "Nkrabea Culture & Arts Ensemble | Ghanaian Heritage in Motion",
    template: "%s | Nkrabea Culture & Arts Ensemble",
  },
  description:
    "Nkrabea Culture & Arts Ensemble is a Ghanaian non-profit translating traditional dance, drumming and music into something the world can feel and understand. Based in Adenta, Accra. Founded 1995.",
  keywords: [
    "Nkrabea",
    "Ghana culture",
    "Adowa",
    "Kete",
    "traditional drumming",
    "Ghanaian dance ensemble",
    "Accra culture",
    "Akan heritage",
  ],
  authors: [{ name: "Nkrabea Culture & Arts Ensemble" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nkrabea Culture & Arts Ensemble",
    description:
      "Translating Ghanaian culture into something the world can feel and understand. Founded 1995, Adenta, Accra.",
    siteName: "Nkrabea Culture & Arts Ensemble",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nkrabea Culture & Arts Ensemble",
    description:
      "Translating Ghanaian culture into something the world can feel and understand.",
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
        className={`${inter.variable} ${display.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <ScrollProgress />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </div>
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
