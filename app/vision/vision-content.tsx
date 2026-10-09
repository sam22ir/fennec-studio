"use client";

import { useEffect, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Compass, Cpu, Globe, Languages, Layers, LayoutDashboard, MapPin, Gauge, Type } from "lucide-react";
import { Header } from "../components/Header";
import { productBrands } from "../components/product-brands";
import { projects, type ProjectSlug } from "../projects/project-data";
import { visionFaq } from "./vision-faq";

type Locale = "en" | "ar";

// Ecosystem groups around the central vision. Each product links to its case study.
const groups: { key: string; slugs: ProjectSlug[] }[] = [
  { key: "booking", slugs: ["koupa", "lamsa"] },
  { key: "health", slugs: ["nabdh"] },
  { key: "money", slugs: ["masroof"] },
  { key: "builder", slugs: ["nexus"] },
];

const copy = {
  en: {
    manifestoBadge: "Our Vision",
    vision: "Every Algerian handles their day from their phone, clearly and in their own language, without queues or waiting",
    pillarsTitle: "Three commitments that shape every product",
    pillars: [
      { title: "Utility over Speculation", desc: "Every screen must deliver immediate everyday value. We build for patients, merchants, and families, not investor decks", icon: Compass },
      { title: "Resilient by Architecture", desc: "Designed for unstable 3G/4G networks, instant cache recovery, zero bloated dependencies, and lightweight footprints", icon: Cpu },
      { title: "Authentic Arabic UX", desc: "RTL is not a CSS property we flip at the end. Typography, visual rhythm, and microcopy are authored natively in Arabic", icon: Globe },
    ],
    mapBadge: "Ecosystem",
    mapTitle: "Five products, one vision",
    hubLabel: "Vision",
    groupLabels: { booking: "Booking", health: "Health", money: "Money", builder: "Builder tools" },
    principlesBadge: "Studio Principles",
    principlesTitle: "How we work",
    standards: [
      { title: "Product Strategy & Architecture", text: "Mapping real user frictions in the Algerian ecosystem and architecting lean, durable software foundations" },
      { title: "Bilingual Design Systems", text: "High-contrast, accessible visual systems that honor both Arabic typography and Latin technical terms effortlessly" },
      { title: "Full-Stack Web & Mobile", text: "Offline-first progressive web apps, resilient APIs, and snappy interfaces built with modern TypeScript and React" },
      { title: "Operational Tooling", text: "Custom internal dashboards and automation pipelines tailored for local Algerian operations and payment flows" },
    ],
    product: [
      { title: "Local by design", text: "Algeria as lived context, not as surface decoration" },
      { title: "Clear at every step", text: "Direct language and legible interaction" },
      { title: "Useful before clever", text: "Every visual idea supports comprehension or identity" },
      { title: "Bilingual by default", text: "English and Arabic, equally intentional" },
    ],
    nextBadge: "What's Next",
    nextTitle: "Coming soon",
    nextSlots: ["Coming soon", "Coming soon", "Coming soon"],
    homeLink: "Back to home",
    footerTagline: "Independent Digital Product Engineering in Algiers",
    footerRights: "All rights reserved",
    contactCta: "Start a project",
    footerNav: [["Stance", "#vision"], ["Work", "#work"], ["Principles", "#principles"], ["Contact", "#contact"]],
  },
  ar: {
    manifestoBadge: "رؤيتنا",
    vision: "أن يُنجز كل جزائري شؤون يومه من هاتفه، بوضوح وبلغته، دون طوابير ولا انتظار",
    pillarsTitle: "ثلاثة التزامات تشكّل كل منتج",
    pillars: [
      { title: "الفائدة الملموسة أولا", desc: "كل شاشة يجب أن تقدم قيمة حقيقية مباشرة. نصمم للمريض، والتاجر، والعائلة، وليس للعروض الاستثمارية التقديرية", icon: Compass },
      { title: "المتانة في أصعب الظروف", desc: "أنظمة مصممة لشبكات الهاتف المتقلبة، وتخزين محلي فوري، دون مكتبات ثقيلة أو اعتمادات هشة", icon: Cpu },
      { title: "عربية أصيلة من الأساس", desc: "دعم الاتجاه (RTL) ليس مجرد خاصية CSS نفعّلها في النهاية. التيبوغرافيا والإيقاع البصري والنصوص مصممة بالعربية أولا", icon: Globe },
    ],
    mapBadge: "المنظومة",
    mapTitle: "خمسة منتجات، رؤية واحدة",
    hubLabel: "الرؤية",
    groupLabels: { booking: "الحجوزات", health: "الصحة", money: "المال", builder: "أدوات البناء" },
    principlesBadge: "مبادئ الاستوديو",
    principlesTitle: "كيف نعمل",
    standards: [
      { title: "استراتيجية وهندسة المنتج", text: "فهم العوائق الحقيقية في السوق الجزائري وبناء أسس برمجية متينة ومستدامة" },
      { title: "أنظمة تصميم ثنائية اللغة", text: "أنظمة بصرية عالية التباين وسهلة القراءة توازن باقتدار بين جمال الخط العربي ودقة المصطلحات التقنية" },
      { title: "تطوير ويب وتطبيقات متكاملة", text: "تطبيقات سريعة الاستجابة تعمل دون اتصال بالإنترنت، وواجهات رشيقة مبنية بـ TypeScript و React" },
      { title: "أدوات ولوحات تحكم تشغيلية", text: "لوحات تحكم برمجية وأنظمة أتمتة مخصصة لفرق العمل والعمليات اللوجستية والمالية المحلية" },
    ],
    product: [
      { title: "محلي بالتصميم", text: "الجزائر واقعاً معاشاً، لا زينة سطحية" },
      { title: "واضح في كل خطوة", text: "لغة مباشرة وتفاعل مقروء" },
      { title: "المفيد قبل البارع", text: "كل فكرة بصرية تخدم الفهم أو الهوية" },
      { title: "ثنائي اللغة بالأصل", text: "الإنجليزية والعربية، بقصد متساوٍ" },
    ],
    nextBadge: "ما القادم",
    nextTitle: "قريباً",
    nextSlots: ["قريباً", "قريباً", "قريباً"],
    homeLink: "العودة إلى الرئيسية",
    footerTagline: "استوديو فينك، هندسة وتصميم المنتجات الرقمية المستقلة في الجزائر",
    footerRights: "جميع الحقوق محفوظة",
    contactCta: "ابدأ مشروعك",
    footerNav: [["موقفنا", "#vision"], ["أعمالنا", "#work"], ["مبادئنا", "#principles"], ["تواصل", "#contact"]],
  },
} as const;

const pillarIcons = [Compass, Cpu, Globe];
const principleIcons = [MapPin, Type, Gauge, Languages];
const standardIcons = [Compass, Languages, Layers, LayoutDashboard];

// Shared Vision page body. Each route passes its locale so the static HTML
// already contains that language's copy.
export function VisionContent({ initialLocale }: { initialLocale: Locale }) {
  const router = useRouter();
  const locale = initialLocale;
  const isArabic = locale === "ar";
  const t = copy[locale];
  const anchorBase = isArabic ? "/" : "/en";
  const homeHref = isArabic ? "/" : "/en";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [locale, isArabic]);

  const toggleLanguage = () => {
    router.push(isArabic ? "/en/vision" : "/vision");
  };

  return (
    <div className={`fennec-taste-root ${isArabic ? "is-rtl" : "is-ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <Header locale={locale} isArabic={isArabic} onToggleLocale={toggleLanguage} anchorBase={anchorBase} />

      <main id="main-content" className="vs-page">
        {/* 1. MANIFESTO */}
        <section className="vx vs-manifesto" id="manifesto">
          <div className="vx-inner">
            <div className="vx-statement">
              <span className="kicker">{t.manifestoBadge}</span>
              <p className="vx-title vs-vision-line">{t.vision}</p>
            </div>
            <div className="vs-pillars">
              <h2 className="vs-subtitle">{t.pillarsTitle}</h2>
              <ol className="vs-pillar-list">
                {t.pillars.map((pillar, i) => {
                  const Icon = pillarIcons[i];
                  return (
                    <li key={pillar.title} className="vs-pillar">
                      <span className="st-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                      <h3 className="sw-title">{pillar.title}</h3>
                      <p className="sw-desc">{pillar.desc}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* 2. ECOSYSTEM MAP */}
        <section className="vs-map-section" id="ecosystem" aria-labelledby="vs-map-title">
          <div className="vs-map-inner">
            <div className="section-header">
              <span className="section-badge">{t.mapBadge}</span>
              <h2 className="section-title" id="vs-map-title">{t.mapTitle}</h2>
            </div>
            <div className="vs-hub" aria-hidden="true">
              <span className="vs-hub-label">{t.hubLabel}</span>
            </div>
            <div className="vs-groups">
              {groups.map((group) => (
                <div key={group.key} className="vs-group">
                  <h3 className="vs-group-title">{t.groupLabels[group.key as keyof typeof t.groupLabels]}</h3>
                  <ul className="vs-group-list">
                    {group.slugs.map((slug) => {
                      const project = projects[slug][locale];
                      const brand = productBrands[slug];
                      return (
                        <li key={slug}>
                          <Link
                            href={`/projects/${slug}`}
                            className="vs-product"
                            style={{ "--px-ink": brand.ink } as CSSProperties}
                          >
                            <span className="sw-product-icon" style={{ background: brand.tile }}>
                              <Image src={brand.mark} alt="" width={56} height={56} />
                            </span>
                            <span className="vs-product-main">
                              <span className="vs-product-name">{project.name}</span>
                              <span className="vs-product-line">{project.headline}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. STUDIO PRINCIPLES */}
        <section className="st vs-principles" id="principles">
          <div className="st-inner">
            <div className="vs-principles-head">
              <span className="kicker">{t.principlesBadge}</span>
              <h2 className="st-title">{t.principlesTitle}</h2>
            </div>
            <ol className="st-bento">
              {t.standards.map((item, i) => {
                const Icon = standardIcons[i];
                return (
                  <li key={item.title} className={`st-cell st-cell-${i + 1}`}>
                    <span className="st-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <div className="st-cell-body">
                      <h3 className="st-cell-title">{item.title}</h3>
                      <p className="st-cell-text">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <ul className="vs-principle-list">
              {t.product.map((item, i) => {
                const Icon = principleIcons[i];
                return (
                  <li key={item.title} className="vs-principle">
                    <span className="st-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                    <h3 className="sw-title">{item.title}</h3>
                    <p className="sw-desc">{item.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="st vs-principles" id="faq" aria-labelledby="vs-faq-title">
          <div className="st-inner">
            <div className="vs-principles-head">
              <span className="kicker">{isArabic ? "أسئلة شائعة" : "Questions"}</span>
              <h2 className="st-title" id="vs-faq-title">{isArabic ? "أسئلة وأجوبة سريعة" : "Quick answers"}</h2>
            </div>
            <ul className="vs-principle-list">
              {visionFaq[locale].map((item) => (
                <li key={item.question} className="vs-principle">
                  <h3 className="sw-title">{item.question}</h3>
                  <p className="sw-desc">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. WHAT'S NEXT */}
        <section className="vs-next" id="next" aria-labelledby="vs-next-title">
          <div className="vs-next-inner">
            <span className="kicker">{t.nextBadge}</span>
            <h2 className="section-title" id="vs-next-title">{t.nextTitle}</h2>
            <ul className="vs-next-slots">
              {t.nextSlots.map((label, i) => (
                <li key={i} className="vs-next-slot">
                  <span className="vs-next-label">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="ft">
        <div className="ft-inner">
          <div className="ft-brand">
            <Link href={homeHref} className="ft-wordmark" aria-label="Fennec Studio">
              <Image src="/fennec-wordmark.webp" alt="Fennec" width={150} height={26} />
            </Link>
            <p className="ft-tag">{t.footerTagline}</p>
          </div>
          <nav className="ft-nav" aria-label={isArabic ? "روابط سريعة" : "Footer"}>
            {t.footerNav.map(([label, id]) => (
              <a key={id} href={`${anchorBase}${id}`}>{label}</a>
            ))}
          </nav>
          <span className="ft-copy">
            © {new Date().getFullYear()} Fennec Studio. {t.footerRights}
          </span>
        </div>
      </footer>
    </div>
  );
}
