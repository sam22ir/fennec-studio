import type { Metadata } from "next";
import { HomeContent } from "../home-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: {
      ar: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function EnglishPage() {
  return <HomeContent initialLocale="en" />;
}
