import type { Metadata } from "next";
import { HomeContent } from "../home-content";
import { pageMetadata } from "../seo/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Fennec | Useful digital products from Algeria",
  description: "Fennec is an independent Algerian product studio building clearer digital experiences for care, local services, beauty, personal finance, and developer tools.",
  path: "/en",
  locale: "en",
  translations: { ar: "/", en: "/en" },
});

export default function EnglishPage() {
  return <HomeContent initialLocale="en" />;
}
