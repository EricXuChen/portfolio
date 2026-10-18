import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Eric Xu | Student Artist, Watch Collector & Portfolio in Barcelona",
    template: "%s | Eric Xu",
  },
  description:
    "Eric Xu is a student artist and vintage watch collector in Barcelona, creating original art, researching watches, and sharing his portfolio and interests.",
  keywords: [
    "Eric Xu",
    "student artist Barcelona",
    "vintage watches",
    "watch collector",
    "art portfolio",
    "Benjamin Franklin International School",
    "Barcelona artist",
    "student entrepreneur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eric Xu Portfolio",
    url: siteUrl.toString(),
    title: "Eric Xu | Student Artist, Watch Collector & Portfolio in Barcelona",
    description:
      "Original artwork, vintage watch research, and creative projects by Eric Xu in Barcelona.",
    images: [{ url: new URL("/paint-splash.png", siteUrl).toString(), alt: "Colorful paint used in Eric Xu's art portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Xu | Student Artist, Watch Collector & Portfolio in Barcelona",
    description:
      "Original artwork, vintage watch research, and creative projects by Eric Xu in Barcelona.",
    images: [new URL("/paint-splash.png", siteUrl).toString()],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;600;700&family=Sora:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="grain" aria-hidden="true" />
        <Nav />
        {children}
        <footer className="site-footer">
          <span translate="no">Eric Xu · BFIS Barcelona</span>
          <span>Paint · Time · Ideas</span>
        </footer>
      </body>
    </html>
  );
}
