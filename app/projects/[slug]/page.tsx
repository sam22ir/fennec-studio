import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { projectJsonLd } from "../../seo/json-ld";
import { pageMetadata } from "../../seo/site-metadata";
import { projects, projectSlugs, type ProjectSlug } from "../project-data";
import { CaseStudyClient } from "./CaseStudyClient";

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
    return { title: "المشروع غير موجود | فينك", robots: { index: false, follow: false } };
  }
  const project = projects[slug as ProjectSlug];
  return pageMetadata({
    title: `${project.en.name} | فينك`,
    description: project.ar.description,
    path: `/projects/${slug}`,
    locale: "ar",
  });
}

export default async function CaseStudyPage({
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
      <JsonLd data={projectJsonLd(slug as ProjectSlug)} />
      <CaseStudyClient slug={slug as ProjectSlug} />
    </>
  );
}
