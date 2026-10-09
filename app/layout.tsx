import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./site-config";

const siteTitle = "Fennec | Useful digital products from Algeria";
const siteDescription = "Fennec is an independent Algerian product studio building clearer digital experiences for care, local services, beauty, personal finance, and developer tools.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: SITE_NAME,
    locale: "ar_DZ",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
    <html lang="ar" dir="rtl" style={{ colorScheme: "light only" }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#f9f9f6" media="(prefers-color-scheme: dark)" />
      </head>
      <body style={{ colorScheme: "light only", backgroundColor: "#f9f9f6", color: "#141b15" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
