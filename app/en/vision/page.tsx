import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";
import { faqPageJsonLd } from "../../seo/json-ld";
import { pageMetadata } from "../../seo/site-metadata";
import { VisionContent } from "../../vision/vision-content";
import { visionFaq } from "../../vision/vision-faq";

export const metadata: Metadata = pageMetadata({
  title: "Our Vision | Fennec Studio",
  description: "Fennec Studio's vision: every Algerian handles their day from their phone, clearly and in their own language, without queues or waiting. Five products, one vision.",
  path: "/en/vision",
  locale: "en",
  translations: { ar: "/vision", en: "/en/vision" },
});

export default function EnglishVisionPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(visionFaq.en)} />
      <VisionContent initialLocale="en" />
    </>
  );
}
