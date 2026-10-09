import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "../site-config";

export type SiteLocale = "ar" | "en";

// Absolute URL so crawlers and social platforms resolve the preview image directly.
export const siteImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Fennec Studio · فينيك ستوديو",
};

const ogLocale: Record<SiteLocale, string> = { ar: "ar_DZ", en: "en_US" };

interface PageMetadataInput {
  title: string;
  description: string;
  // Canonical path of this page, for example "/en/vision".
  path: string;
  locale: SiteLocale;
  // Paths of the same page in each language. Omit when no counterpart exists.
  translations?: { ar: string; en: string };
}

// Builds per-page metadata (title, description, canonical, hreflang, Open Graph, Twitter).
export function pageMetadata({ title, description, path, locale, translations }: PageMetadataInput): Metadata {
  const otherLocale: SiteLocale = locale === "ar" ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      canonical: path,
      ...(translations
        ? { languages: { ar: translations.ar, en: translations.en, "x-default": translations.ar } }
        : {}),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale]],
      type: "website",
      images: [siteImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteImage.url],
    },
  };
}
