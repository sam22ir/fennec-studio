import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";
import { projectSlugs } from "./projects/project-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", ...projectSlugs.map((slug) => `/projects/${slug}`)];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
