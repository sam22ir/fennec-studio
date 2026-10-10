import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "../../../components/JsonLd";
import { projectJsonLd } from "../../../seo/json-ld";
import { pageMetadata } from "../../../seo/site-metadata";
import { projects, projectSlugs, type ProjectSlug } from "../../../projects/project-data";
import { CaseStudyClient } from "../../../projects/[slug]/CaseStudyClient";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!projectSlugs.includes(slug as ProjectSlug)) {
    return { title: "Project not found | Fennec Studio", robots: { index: false, follow: false } };
  }
  const project = projects[slug as ProjectSlug];
  return pageMetadata({
    title: `${project.en.name} | Fennec Studio`,
    description: project.en.description,
    path: `/en/projects/${slug}`,
    locale: "en",
    translations: { ar: `/projects/${slug}`, en: `/en/projects/${slug}` },
  });
}

export default async function EnglishCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projectSlugs.includes(slug as ProjectSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd data={projectJsonLd(slug as ProjectSlug, "en")} />
      <CaseStudyClient slug={slug as ProjectSlug} locale="en" />
    </>
  );
}
