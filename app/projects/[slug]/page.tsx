import { notFound } from "next/navigation";
import { projects, projectSlugs, type ProjectSlug } from "../project-data";
import { CaseStudyClient } from "./CaseStudyClient";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projectSlugs.includes(slug as ProjectSlug)) {
    return { title: "Project · Fennec Studio" };
  }
  const project = projects[slug as ProjectSlug].ar;
  return {
    title: `${project.name} · Fennec Studio`,
    description: project.description,
  };
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

  return <CaseStudyClient slug={slug as ProjectSlug} />;
}
