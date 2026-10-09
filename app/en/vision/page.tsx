import type { Metadata } from "next";
import { VisionContent } from "../../vision/vision-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/en/vision",
    languages: {
      ar: "/vision",
      en: "/en/vision",
      "x-default": "/vision",
    },
  },
};

export default function EnglishVisionPage() {
  return <VisionContent initialLocale="en" />;
}
