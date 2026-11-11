import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.mark} Personal Archive`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    siteName: site.title,
  },
};

export const viewport: Viewport = {
  themeColor: "#54252d",
};

/* Runs before first paint so the page opens in the visitor's saved (or browser) language. */
const LANG_SCRIPT = `try{var l=localStorage.getItem("lang");if(l!=="en"&&l!=="zh"){l=(navigator.language||"").toLowerCase().indexOf("zh")===0?"zh":"en"}var d=document.documentElement;d.setAttribute("data-lang",l);d.setAttribute("lang",l==="zh"?"zh-Hans":"en")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;500&display=swap"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="page">
          {children}
        </main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
