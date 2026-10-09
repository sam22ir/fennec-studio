"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Compass,
  Cpu,
  Languages,
  Layers,
  LayoutDashboard,
  Mail,
  Copy,
  Check,
  Globe,
  ExternalLink,
  Flame,
} from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { KoupaShowcase } from "./components/KoupaShowcase";
import { productBrands, productOrder } from "./components/product-brands";
import { StanceWave } from "./components/StanceWave";
import { projects, projectSlugs, ProjectSlug, LocalizedProject } from "./projects/project-data";

export type Locale = "en" | "ar";

// Shared home page body. Each route passes its locale so the statically
// exported HTML already contains that language's copy.
export function HomeContent({ initialLocale }: { initialLocale: Locale }) {
  const router = useRouter();
  const locale = initialLocale;
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const isArabic = locale === "ar";
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [locale, isArabic]);

  // Language switch is a route change: "/" is Arabic, "/en" is English.
  const toggleLanguage = () => {
    router.push(isArabic ? "/en" : "/");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info.fennec.vision@gmail.com");
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 2400);
    }
  };

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const content = {
    en: {
      visionSection: {
        badge: "Our Stance",
        visionLabel: "Fennec's vision",
        vision: "Every Algerian handles their day from their phone, clearly and in their own language, without queues or waiting",
        heading: "Software shaped by local reality, not Silicon Valley hype",
        lead: "We design tools that respect connection constraints, regional payment habits, and bilingual Arabic-first workflows",
        pillars: [
          {
            title: "Utility over Speculation",
            desc: "Every screen must deliver immediate everyday value. We build for patients, merchants, and families, not investor decks",
            icon: Compass,
          },
          {
            title: "Resilient by Architecture",
            desc: "Designed for unstable 3G/4G networks, instant cache recovery, zero bloated dependencies, and lightweight footprints",
            icon: Cpu,
          },
          {
            title: "Authentic Arabic UX",
            desc: "RTL is not a CSS property we flip at the end. Typography, visual rhythm, and microcopy are authored natively in Arabic",
            icon: Globe,
          },
        ],
      },
      workSection: {
        badge: "Selected Case Studies",
        title: "Crafted for real impact",
        subtitle: "A selection of deployed digital products built with obsessive attention to user trust and system performance",
        viewCase: "Explore case study",
        liveDemo: "Try it live",
        flagshipBadge: "Main Product",
        readyBadge: "Ready to use",
      },
      capabilitiesSection: {
        badge: "Studio Standards",
        title: "How we build at Fennec",
        items: [
          {
            number: "01",
            title: "Product Strategy & Architecture",
            text: "Mapping real user frictions in the Algerian ecosystem and architecting lean, durable software foundations",
          },
          {
            number: "02",
            title: "Bilingual Design Systems",
            text: "High-contrast, accessible visual systems that honor both Arabic typography and Latin technical terms effortlessly",
          },
          {
            number: "03",
            title: "Full-Stack Web & Mobile",
            text: "Offline-first progressive web apps, resilient APIs, and snappy interfaces built with modern TypeScript and React",
          },
          {
            number: "04",
            title: "Operational Tooling",
            text: "Custom internal dashboards and automation pipelines tailored for local Algerian operations and payment flows",
          },
        ],
      },
      contactSection: {
        badge: "Start a Conversation",
        title: "Have a critical product to build?",
        desc: "We partner with ambitious teams and founders building serious digital infrastructure in Algeria and the MENA region",
        emailLabel: "Direct studio email",
        copiedText: "Email copied to clipboard",
        copyFailedText: "Copy failed, select the address instead",
        copyAction: "Copy address",
        sendAction: "Start a project",
      },
      footer: {
        tagline: "Independent Digital Product Engineering in Algiers",
        rights: "All rights reserved",
      },
    },
    ar: {
      visionSection: {
        badge: "موقفنا المهني",
        visionLabel: "رؤية فينك",
        vision: "أن يُنجز كل جزائري شؤون يومه من هاتفه، بوضوح وبلغته، دون طوابير ولا انتظار",
        heading: "برمجيات تنبع من واقعنا المحلي، لا من ضجيج وادي السيليكون",
        lead: "نصمم أدوات رقمية تراعي جودة الاتصال، عادات الدفع الإقليمية، وتجربة المستخدم العربية من الألف إلى الياء",
        pillars: [
          {
            title: "الفائدة الملموسة أولا",
            desc: "كل شاشة يجب أن تقدم قيمة حقيقية مباشرة. نصمم للمريض، والتاجر، والعائلة، وليس للعروض الاستثمارية التقديرية",
            icon: Compass,
          },
          {
            title: "المتانة في أصعب الظروف",
            desc: "أنظمة مصممة لشبكات الهاتف المتقلبة، وتخزين محلي فوري، دون مكتبات ثقيلة أو اعتمادات هشة",
            icon: Cpu,
          },
          {
            title: "عربية أصيلة من الأساس",
            desc: "دعم الاتجاه (RTL) ليس مجرد خاصية CSS نفعّلها في النهاية. التيبوغرافيا والإيقاع البصري والنصوص مصممة بالعربية أولا",
            icon: Globe,
          },
        ],
      },
      workSection: {
        badge: "أعمال ودراسات حالة",
        title: "منتجات صُنعت لتُحدث فرقا حقيقيا",
        subtitle: "مجموعة منتقاة من البرمجيات المنشورة، بُنيت باهتمام فائق ببناء ثقة المستخدم وسرعة الأداء",
        viewCase: "قراءة دراسة الحالة",
        liveDemo: "جرّبه الآن",
        flagshipBadge: "المنتج الرئيسي",
        readyBadge: "جاهز للاستخدام",
      },
      capabilitiesSection: {
        badge: "معايير الاستوديو",
        title: "كيف نعمل ونبني في فينك",
        items: [
          {
            number: "01",
            title: "استراتيجية وهندسة المنتج",
            text: "فهم العوائق الحقيقية في السوق الجزائري وبناء أسس برمجية متينة ومستدامة",
          },
          {
            number: "02",
            title: "أنظمة تصميم ثنائية اللغة",
            text: "أنظمة بصرية عالية التباين وسهلة القراءة توازن باقتدار بين جمال الخط العربي ودقة المصطلحات التقنية",
          },
          {
            number: "03",
            title: "تطوير ويب وتطبيقات متكاملة",
            text: "تطبيقات سريعة الاستجابة تعمل دون اتصال بالإنترنت، وواجهات رشيقة مبنية بـ TypeScript و React",
          },
          {
            number: "04",
            title: "أدوات ولوحات تحكم تشغيلية",
            text: "لوحات تحكم برمجية وأنظمة أتمتة مخصصة لفرق العمل والعمليات اللوجستية والمالية المحلية",
          },
        ],
      },
      contactSection: {
        badge: "ابدأ محادثة معنا",
        title: "هل لديك فكرة منتج أو مشروع رقمي مهم؟",
        desc: "نتعاون مع الفرق الطموحة والمؤسسين الذين يبنون بنية تحتية رقمية جادة في الجزائر والمنطقة",
        emailLabel: "البريد الإلكتروني المباشر",
        copiedText: "تم نسخ البريد الإلكتروني",
        copyFailedText: "تعذّر النسخ، حدّد العنوان يدويًا",
        copyAction: "نسخ البريد",
        sendAction: "ابدأ مشروعك",
      },
      footer: {
        tagline: "استوديو فينك، هندسة وتصميم المنتجات الرقمية المستقلة في الجزائر",
        rights: "جميع الحقوق محفوظة",
      },
    },
  }[locale];

  // Flagship project Nabdh
  const flagshipSlug: ProjectSlug = "koupa";
  const flagshipData: LocalizedProject = projects[flagshipSlug][locale];

  // Secondary project slugs
  const otherSlugs: ProjectSlug[] = (projectSlugs as readonly ProjectSlug[]).filter(
    (slug) => slug !== flagshipSlug
  );

  return (
    <div className={`fennec-taste-root ${isArabic ? "is-rtl" : "is-ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <Header
        locale={locale}
        isArabic={isArabic}
        onToggleLocale={toggleLanguage}
      />

      <main id="main-content">
        {/* SECTION 1: HERO */}
        <Hero
          locale={locale}
          isArabic={isArabic}
          reducedMotion={reducedMotion}
        />

        {/* SECTION 2: STANCE */}
        <section className="vx" id="vision">
          <div className="vx-inner">
            <div className="vx-statement">
              <span className="kicker">{content.visionSection.badge}</span>
              <h2 className="vx-title">{content.visionSection.heading}</h2>
            </div>
            <StanceWave
              pillars={content.visionSection.pillars}
              finale={
                <>
                  <span className="sw-finale-label">{content.visionSection.visionLabel}</span>
                  <p className="sw-finale-text">{content.visionSection.vision}</p>
                  <ul className="sw-products">
                    {productOrder.map((slug, i) => (
                      <li key={slug} style={{ "--i": i } as CSSProperties}>
                        <Link href={`/projects/${slug}`} className="sw-product">
                          <span className="sw-product-icon" style={{ background: productBrands[slug].tile }}>
                            <Image src={productBrands[slug].mark} alt="" width={56} height={56} />
                          </span>
                          <span className="sw-product-name">{projects[slug][locale].name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          </div>
        </section>

        {/* SECTION 3: SELECTED CASE STUDIES */}
        <section className="taste-section work-section" id="work">
          <div className="section-container">
            <div className="section-header">
              <span className="section-badge">{content.workSection.badge}</span>
              <h2 className="section-title">{content.workSection.title}</h2>
              <p className="section-lead">{content.workSection.subtitle}</p>
            </div>

            {/* Flagship Hero Card: Nabdh */}
            <div className="flagship-card">
              <div className="flagship-editorial">
                <div className="flagship-pill">
                  <Flame size={14} className="pill-flame" />
                  <span>{content.workSection.flagshipBadge}</span>
                  <span className="flagship-ready">
                    <span className="flagship-live-dot" />
                    {content.workSection.readyBadge}
                  </span>
                </div>
                <div className="flagship-brand-row">
                  {flagshipData.logo && (
                    <div className="project-logo-badge">
                      <Image
                        src={flagshipData.logo}
                        alt={flagshipData.name}
                        width={48}
                        height={48}
                        className="project-logo-img"
                      />
                    </div>
                  )}
                  <h3 className="flagship-name">
                    {flagshipData.name}
                  </h3>
                </div>
                <p className="flagship-tagline">
                  {flagshipData.headline}
                </p>
                <p className="flagship-summary">
                  {flagshipData.description}
                </p>

                <div className="flagship-actions">
                  {flagshipData.siteUrl && (
                    <a
                      href={flagshipData.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="taste-btn-primary flagship-cta"
                    >
                      <span>{content.workSection.liveDemo}</span>
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <Link
                    href={`/projects/${flagshipSlug}`}
                    className="taste-btn-secondary flagship-cta"
                  >
                    <span>{content.workSection.viewCase}</span>
                    <ArrowIcon size={15} />
                  </Link>
                </div>
              </div>

              <div className="flagship-visual">
                <KoupaShowcase isArabic={isArabic} />
              </div>
            </div>

            <ul className="px-list">
              {otherSlugs.map((slug) => {
                const project: LocalizedProject = projects[slug][locale];
                const brand = productBrands[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/projects/${slug}`}
                      className="px-row"
                      style={{ "--px-ink": brand.ink } as CSSProperties}
                    >
                      <span className="px-icon" style={{ background: brand.tile }}>
                        <Image src={brand.mark} alt="" width={64} height={64} />
                      </span>
                      <span className="px-main">
                        <span className="px-name">{project.name}</span>
                        <span className="px-line">{project.headline}</span>
                      </span>
                      <span className="px-meta">
                        <span className="px-cat">{project.category}</span>
                        <span className="px-status">{project.status}</span>
                      </span>
                      <span className="px-go" aria-hidden="true"><ArrowIcon size={20} /></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <MotionConfig reducedMotion="user">
        {/* SECTION 4: STANDARDS */}
        <section className="st" id="principles">
          <div className="st-inner">
            <h2 className="st-title">{content.capabilitiesSection.title}</h2>
            <ol className="st-bento">
              {content.capabilitiesSection.items.map((item, i) => {
                const Icon = [Compass, Languages, Layers, LayoutDashboard][i % 4];
                return (
                  <motion.li
                    key={item.number}
                    className={`st-cell st-cell-${i + 1}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="st-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <div className="st-cell-body">
                      <h3 className="st-cell-title">{item.title}</h3>
                      <p className="st-cell-text">{item.text}</p>
                    </div>
                    <span className="st-num" aria-hidden="true">{item.number}</span>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section className="ct" id="contact">
          <motion.div
            className="ct-inner"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="ct-title">{content.contactSection.title}</h2>
            <p className="ct-desc">{content.contactSection.desc}</p>
            <a href="mailto:info.fennec.vision@gmail.com" className="ct-email" dir="ltr">
              <span>info.fennec.vision@gmail.com</span>
              <ArrowUpRight size={36} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <div className="ct-actions">
              <a href="mailto:info.fennec.vision@gmail.com" className="hx-btn-primary">
                <Mail size={17} aria-hidden="true" />
                {content.contactSection.sendAction}
              </a>
              <button type="button" className="ct-btn-ghost" onClick={copyEmail} aria-live="polite">
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                {copied
                  ? content.contactSection.copiedText
                  : copyFailed
                    ? content.contactSection.copyFailedText
                    : content.contactSection.copyAction}
              </button>
            </div>
          </motion.div>
        </section>
        </MotionConfig>
      </main>

      <footer className="ft">
        <div className="ft-inner">
          <div className="ft-brand">
            <Link href="#top" className="ft-wordmark" aria-label="Fennec Studio">
              <Image src="/fennec-wordmark.webp" alt="Fennec" width={150} height={26} />
            </Link>
            <p className="ft-tag">{content.footer.tagline}</p>
          </div>
          <nav className="ft-nav" aria-label={isArabic ? "روابط سريعة" : "Footer"}>
            {(isArabic
              ? [["work", "أعمالنا"], ["principles", "مبادئنا"], ["contact", "تواصل"]]
              : [["work", "Work"], ["principles", "Principles"], ["contact", "Contact"]]
            ).map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <span className="ft-copy">
            © {new Date().getFullYear()} Fennec Studio. {content.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
}
