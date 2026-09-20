import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric Xu — Student · Watches · Art",
  description:
    "Eric Xu — Grade 8 at BFIS Barcelona. Debate & MUN, vintage watches, entrepreneurship, and studio art.",
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
