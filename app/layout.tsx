import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/lib/content";
import { I18nProvider } from "@/components/I18nProvider";
import { ScrollProgress } from "@/components/ScrollProgress";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: siteContent.title,
  description: siteContent.description,
  openGraph: {
    title: siteContent.title,
    description: siteContent.description,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteContent.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.title,
    description: siteContent.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0136CE",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} ${devanagari.variable} bg-white font-sans text-ink antialiased`}>
        <I18nProvider>
          <ScrollProgress />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
