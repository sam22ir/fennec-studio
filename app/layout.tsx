import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./site-config";

const siteTitle = "Fennec | Useful digital products from Algeria";
const siteDescription = "Fennec is an independent Algerian product studio building clearer digital experiences for care, local services, beauty, personal finance, and developer tools.";
// Absolute URL so crawlers and social platforms resolve the preview image directly.
const siteImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Fennec Studio · فينيك ستوديو",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: SITE_NAME,
    locale: "ar_DZ",
    alternateLocale: ["en_US"],
    type: "website",
    images: [siteImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage.url],
  },
  verification: {
    google: "mHrpWHfL2NNe0M-w7p-_pZ7Ms9v6t_lPIryZCXKQbcQ",
  },
  other: {
    "color-scheme": "light only",
  },
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#f9f9f6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: dark)" />
      </head>
      <body style={{ backgroundColor: "#f9f9f6", color: "#141b15" }}>
        {children}
      </body>
    </html>
  );
}
