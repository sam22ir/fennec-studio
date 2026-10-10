import type { Metadata } from "next";
import { pageMetadata } from "../../seo/site-metadata";
import { ProjectsIndex } from "../../projects/projects-index";

export const metadata: Metadata = pageMetadata({
  title: "All Products and Projects | Fennec Studio",
  description: "Fennec's published and in-development products, from appointment booking and healthcare to personal finance and developer tools, built around real needs in Algeria.",
  path: "/en/projects",
  locale: "en",
  translations: { ar: "/projects", en: "/en/projects" },
});

export default function EnglishProjectsPage() {
  return <ProjectsIndex locale="en" />;
}
