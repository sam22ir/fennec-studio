import type { Metadata } from "next";
import { JsonLd } from "../components/JsonLd";
import { faqPageJsonLd } from "../seo/json-ld";
import { pageMetadata } from "../seo/site-metadata";
import { VisionContent } from "./vision-content";
import { visionFaq } from "./vision-faq";

export const metadata: Metadata = pageMetadata({
  title: "رؤيتنا | فينك",
  description: "رؤية فينك: أن يُنجز كل جزائري شؤون يومه من هاتفه، بوضوح وبلغته، دون طوابير ولا انتظار. خمسة منتجات، ورؤية واحدة، وثلاثة التزامات تشكّل كل منتج.",
  path: "/vision",
  locale: "ar",
  translations: { ar: "/vision", en: "/en/vision" },
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(visionFaq.ar)} />
      <VisionContent initialLocale="ar" />
    </>
  );
}
