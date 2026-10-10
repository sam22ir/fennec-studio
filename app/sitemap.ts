import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";
import { projectSlugs } from "./projects/project-data";

export const dynamic = "force-static";

interface SitemapPage {
  path: string;
  priority: number;
  // Same page in each language, when one exists.
  translations?: { ar: string; en: string };
}

const pages: SitemapPage[] = [
  { path: "/", priority: 1, translations: { ar: "/", en: "/en" } },
  { path: "/en", priority: 1, translations: { ar: "/", en: "/en" } },
  { path: "/vision", priority: 0.8, translations: { ar: "/vision", en: "/en/vision" } },
  { path: "/en/vision", priority: 0.8, translations: { ar: "/vision", en: "/en/vision" } },
  { path: "/projects", priority: 0.7, translations: { ar: "/projects", en: "/en/projects" } },
  { path: "/en/projects", priority: 0.7, translations: { ar: "/projects", en: "/en/projects" } },
  ...projectSlugs.flatMap((slug) => {
    const translations = { ar: `/projects/${slug}`, en: `/en/projects/${slug}` };
    return [
      { path: translations.ar, priority: 0.7, translations },
      { path: translations.en, priority: 0.7, translations },
    ];
  }),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, translations }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
    ...(translations
      ? {
          alternates: {
            languages: {
              ar: `${SITE_URL}${translations.ar}`,
              en: `${SITE_URL}${translations.en}`,
            },
          },
        }
      : {}),
  }));
}
