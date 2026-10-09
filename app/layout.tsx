import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "./components/JsonLd";
import { SITE_URL } from "./site-config";
import { siteJsonLd } from "./seo/json-ld";

// Fallback metadata for routes without their own. Each page sets its own via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "فينك | منتجات رقمية مفيدة من الجزائر",
  description: "فينك استوديو مستقل للمنتجات الرقمية من الجزائر، يبني تجارب رقمية أوضح للرعاية الصحية والخدمات المحلية والجمال والمال الشخصي وأدوات المطورين.",
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
        <JsonLd data={siteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
