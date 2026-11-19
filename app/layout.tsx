import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2045841849433652');
fbq('track', 'PageView');`}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2045841849433652&ev=PageView&noscript=1" alt="" />',
          }}
        />
        <I18nProvider>
          <ScrollProgress />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
