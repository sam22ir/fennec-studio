"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Compass,
  Cpu,
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

type Locale = "en" | "ar";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ar");
  const [copied, setCopied] = useState(false);
  const isArabic = locale === "ar";
  const reducedMotion = useReducedMotion();

  const toggleLanguage = () => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("info.fennec.vision@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
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
        liveDemo: "Live prototype",
        flagshipBadge: "Flagship Local Commerce Product",
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
        copyAction: "Copy address",
        sendAction: "Open mail client",
      },
      footer: {
        tagline: "Fennec Studio · Independent Digital Product Engineering in Algiers",
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
        liveDemo: "النسخة الحية",
        flagshipBadge: "المنتج الرئيسي للخدمات والحجز",
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
        copyAction: "نسخ البريد",
        sendAction: "إرسال رسالة",
      },
      footer: {
        tagline: "استوديو فينك · هندسة وتصميم المنتجات الرقمية المستقلة في الجزائر",
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

                <div className="flagship-tags">
                  {flagshipData.stack.map((tag: string, i: number) => (
                    <span key={i} className="work-tag">{tag}</span>
                  ))}
                </div>

                <div className="flagship-actions">
                  <Link
                    href={`/projects/${flagshipSlug}`}
                    className="taste-btn-primary"
                  >
                    <span>{content.workSection.viewCase}</span>
                    <ArrowIcon size={15} />
                  </Link>

                  {flagshipData.siteUrl && (
                    <a
                      href={flagshipData.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="taste-btn-secondary"
                    >
                      <span>{content.workSection.liveDemo}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
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

        {/* SECTION 4: METHOD */}
        <section className="cz-method" id="principles">
          <div className="cz-inner">
            <div className="cz-head">
              <span className="kicker kicker-light">{content.capabilitiesSection.badge}</span>
              <h2 className="cz-title">{content.capabilitiesSection.title}</h2>
            </div>
            <ol className="cz-steps">
              {content.capabilitiesSection.items.map((item) => (
                <li key={item.number} className="cz-step">
                  <span className="cz-num">{item.number}</span>
                  <h3 className="cz-step-title">{item.title}</h3>
                  <p className="cz-step-text">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section className="cz-contact" id="contact">
          <div className="cz-inner">
            <span className="kicker kicker-light">{content.contactSection.badge}</span>
            <h2 className="cz-contact-title">{content.contactSection.title}</h2>
            <p className="cz-contact-desc">{content.contactSection.desc}</p>
            <a href="mailto:info.fennec.vision@gmail.com" className="cz-email" dir="ltr">
              info.fennec.vision@gmail.com
              <ArrowUpRight size={28} aria-hidden="true" />
            </a>
            <div className="cz-actions">
              <a href="mailto:info.fennec.vision@gmail.com" className="cz-btn-primary">
                <Mail size={17} aria-hidden="true" />
                {content.contactSection.sendAction}
              </a>
              <button type="button" className="cz-btn-ghost" onClick={copyEmail} aria-live="polite">
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                {copied ? content.contactSection.copiedText : content.contactSection.copyAction}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="cz-footer">
        <div className="cz-inner cz-footer-row">
          <Link href="#top" className="cz-wordmark" aria-label="Fennec Studio">
            <Image src="/fennec-wordmark.jpg" alt="Fennec" width={150} height={26} />
          </Link>
          <p className="cz-footer-tag">{content.footer.tagline}</p>
          <span className="cz-footer-copy">
            © {new Date().getFullYear()} Fennec Studio · {content.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
}
