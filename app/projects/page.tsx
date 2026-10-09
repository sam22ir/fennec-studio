import type { Metadata } from "next";
import { pageMetadata } from "../seo/site-metadata";
import { ProjectsIndex } from "./projects-index";

export const metadata: Metadata = pageMetadata({
  title: "جميع المنتجات والمشاريع | فينك",
  description: "منتجات فينك المنشورة وقيد التطوير، من حجز المواعيد والرعاية الصحية إلى المال الشخصي وأدوات المطورين، صُممت حول احتياجات حقيقية في الجزائر.",
  path: "/projects",
  locale: "ar",
});

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
