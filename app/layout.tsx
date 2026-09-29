import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/app/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "900"],
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Folio — Find your next great read",
    template: "%s · Folio",
  },
  description:
    "A curated digital library. Browse timeless classics, add your own titles with cover images, and edit any field inline — no account, no backend.",
  applicationName: "Folio",
  authors: [{ name: "Afaq Ul Islam" }],
  creator: "Afaq Ul Islam",
  publisher: "Folio",
  category: "books",
  keywords: [
    "book library",
    "online bookshelf",
    "reading list",
    "book tracker",
    "classic literature",
    "Next.js",
    "React",
    "Tailwind CSS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Folio",
    locale: "en_US",
    title: "Folio — Find your next great read",
    description:
      "Browse timeless classics, build your own shelf, and edit any title inline. A curated digital library built with Next.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Folio — Find your next great read",
    description:
      "Browse timeless classics, build your own shelf, and edit any title inline.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#100e0c" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
