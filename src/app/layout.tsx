import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "TIXSYNC SOLUTIONS | Enterprise Digital Solutions",
    template: "%s | TIXSYNC SOLUTIONS",
  },
  description:
    "Enterprise-grade web development, cybersecurity, cloud infrastructure, and digital transformation solutions. Protecting and empowering businesses across Africa.",
  keywords: ["TIXSYNC", "cybersecurity", "web development", "cloud infrastructure", "enterprise", "Kenya", "Africa"],
  authors: [{ name: "TIXSYNC SOLUTIONS" }],
  creator: "TIXSYNC SOLUTIONS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tixsyncsolutions.com",
    siteName: "TIXSYNC SOLUTIONS",
    title: "TIXSYNC SOLUTIONS | Enterprise Digital Solutions",
    description: "Enterprise-grade web development, cybersecurity, and cloud infrastructure.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TIXSYNC SOLUTIONS" }],
  },
  twitter: { card: "summary_large_image", title: "TIXSYNC SOLUTIONS", description: "Enterprise Digital Solutions." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TIXSYNC SOLUTIONS",
              url: "https://tixsyncsolutions.com",
              email: "info@tixsyncsolutions.com",
              telephone: "+254704440164",
              address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
              sameAs: ["https://github.com", "https://linkedin.com", "https://twitter.com"],
              description: "Enterprise-grade web development, cybersecurity, and cloud infrastructure solutions.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-surface-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
