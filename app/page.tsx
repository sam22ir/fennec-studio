import type { Metadata } from "next";
import { HomeContent } from "./home-content";
import { pageMetadata } from "./seo/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "فينك | منتجات رقمية مفيدة من الجزائر",
  description: "فينك استوديو مستقل للمنتجات الرقمية من الجزائر، يبني تجارب رقمية أوضح للرعاية الصحية والخدمات المحلية والجمال والمال الشخصي وأدوات المطورين.",
  path: "/",
  locale: "ar",
  translations: { ar: "/", en: "/en" },
});

export default function Page() {
  return <HomeContent initialLocale="ar" />;
}
