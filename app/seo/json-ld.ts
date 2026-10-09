import { SITE_NAME, SITE_URL } from "../site-config";
import { projects, type ProjectSlug } from "../projects/project-data";

export type JsonLdNode = Record<string, unknown>;

const SCHEMA_CONTEXT = "https://schema.org";
const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

const studioDescription =
  "Fennec is an independent Algerian product studio building clearer digital experiences for care, local services, beauty, personal finance, and developer tools.";

const organization: JsonLdNode = {
  "@type": "Organization",
  "@id": organizationId,
  name: SITE_NAME,
  alternateName: "استوديو فينك",
  url: SITE_URL,
  logo: `${SITE_URL}/fennec-logo.jpg`,
  description: studioDescription,
  email: "info.fennec.vision@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Algiers", addressCountry: "DZ" },
};

const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: ["ar", "en"],
  publisher: { "@id": organizationId },
};

// Organization and WebSite entity facts, emitted once from the root layout.
export function siteJsonLd(): JsonLdNode {
  return { "@context": SCHEMA_CONTEXT, "@graph": [organization, website] };
}

const applicationCategory: Record<ProjectSlug, string> = {
  koupa: "LifestyleApplication",
  lamsa: "LifestyleApplication",
  nabdh: "HealthApplication",
  masroof: "FinanceApplication",
  nexus: "DeveloperApplication",
};

// Only platforms stated in project-data.ts are listed; others are left out.
const operatingSystem: Partial<Record<ProjectSlug, string>> = {
  koupa: "iOS, Android",
  lamsa: "Android",
  nexus: "Desktop",
};

function softwareApplication(slug: ProjectSlug): JsonLdNode {
  const { en, ar } = projects[slug];
  const os = operatingSystem[slug];
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/projects/${slug}#software`,
    name: en.name,
    ...(ar.name !== en.name ? { alternateName: ar.name } : {}),
    description: en.description,
    applicationCategory: applicationCategory[slug],
    ...(os ? { operatingSystem: os } : {}),
    ...(en.siteUrl ? { url: en.siteUrl } : {}),
    inLanguage: ["en", "ar"],
    publisher: { "@id": organizationId },
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: readonly BreadcrumbEntry[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// SoftwareApplication plus breadcrumb trail for one case study page.
export function projectJsonLd(slug: ProjectSlug): JsonLdNode {
  const { en } = projects[slug];
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [
      softwareApplication(slug),
      breadcrumbJsonLd([
        { name: "الرئيسية", path: "/" },
        { name: "جميع المنتجات والمشاريع", path: "/projects" },
        { name: en.name, path: `/projects/${slug}` },
      ]),
    ],
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

// FAQPage data; the same entries must be visible on the page.
export function faqPageJsonLd(entries: readonly FaqEntry[]): JsonLdNode {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}
