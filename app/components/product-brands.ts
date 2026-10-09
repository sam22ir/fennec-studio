import type { ProjectSlug } from "../projects/project-data";

// Each product keeps its own colour: `ink` is text-safe on the page background, `tile` sits behind its icon.
export const productBrands: Record<
  ProjectSlug,
  { ink: string; tile: string; mark: string; domainAr: string; domainEn: string }
> = {
  nabdh: { ink: "#1D5A9E", tile: "#12355F", mark: "/projects/marks/nabdh.webp", domainAr: "لمواعيد الطبيب", domainEn: "doctor visits" },
  koupa: { ink: "#16706E", tile: "#1A7A78", mark: "/projects/marks/koupa.webp", domainAr: "لحجز الحلاقة", domainEn: "barber bookings" },
  lamsa: { ink: "#A3405F", tile: "#FBEDEC", mark: "/projects/marks/lamsa.webp", domainAr: "لصالونات التجميل", domainEn: "beauty salons" },
  masroof: { ink: "#2D4A66", tile: "#E9EEF3", mark: "/projects/marks/masroof.webp", domainAr: "لمصروف الشهر", domainEn: "monthly budgets" },
  nexus: { ink: "#2A2A2A", tile: "#EFEFEC", mark: "/projects/marks/nexus.webp", domainAr: "لوكلاء البرمجة", domainEn: "coding agents" },
};

export const productOrder: ProjectSlug[] = ["nabdh", "koupa", "lamsa", "masroof", "nexus"];
