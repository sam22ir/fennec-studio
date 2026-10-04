"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Languages } from "lucide-react";
import { projects, type ProjectSlug } from "../project-data";
import {
  NabdhInteractivePreview,
  KoupaInteractivePreview,
  MasroofInteractivePreview,
  LamsaInteractivePreview,
  NexusInteractivePreview,
} from "../../components/ProjectPreviews";

type Locale = "en" | "ar";

interface CaseStudyClientProps {
  slug: ProjectSlug;
}

export function CaseStudyClient({ slug }: CaseStudyClientProps) {
  const [locale, setLocale] = useState<Locale>("ar");
  const isArabic = locale === "ar";
  const project = projects[slug][locale];
  const BackIcon = isArabic ? ArrowRight : ArrowLeft;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [locale, isArabic]);

  const ui = {
    en: {
      back: "All Projects",
      envLabel: "PRODUCT ENVIRONMENT",
      challengePill: "The Challenge & Context",
      challengeTitle: "Why this product matters in Algeria",
      approachPill: "Product Architecture & Approach",
      approachTitle: "Designed around real moments of decision",
      stackPill: "Engineering Stack",
      footerTag: "Independent Digital Product Studio · Algeria",
      contact: "Start a conversation",
      langSwitch: "عربي",
      langAria: "Switch to Arabic",
    },
    ar: {
      back: "كل المشاريع",
      envLabel: "بيئة المنتج",
      challengePill: "التحدي والسياق",
      challengeTitle: "لماذا يهم هذا المنتج في الجزائر",
      approachPill: "هندسة المنتج ومنهج البناء",
      approachTitle: "مصمم حول لحظات القرار الحقيقية",
      stackPill: "المكدس التقني",
      footerTag: "استوديو منتجات رقمية مستقل · الجزائر",
      contact: "ابدأ محادثة معنا",
      langSwitch: "EN",
      langAria: "Switch to English",
    },
  }[locale];

  const toggleLocale = () => setLocale((prev) => (prev === "en" ? "ar" : "en"));

  return (
    <div className={`fennec-taste-root ${isArabic ? "is-rtl" : "is-ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <main className="case-study-modern">
        <header className="case-header">
          <div className="case-header-inner">
            <Link href="/" className="case-brand-logo" aria-label="Fennec Studio">
              <Image
                src="/fennec-wordmark.jpg"
                alt="Fennec"
                width={140}
                height={28}
                className="header-wordmark-img"
                priority
              />
            </Link>

            <div className="case-header-actions">
              <button
                type="button"
                className="lang-pill"
                onClick={toggleLocale}
                aria-label={ui.langAria}
              >
                <Languages size={14} className="lang-icon" aria-hidden="true" />
                <span className="lang-text">{ui.langSwitch}</span>
              </button>

              <Link href="/#work" className="case-back-btn">
                <BackIcon size={16} />
                <span>{ui.back}</span>
              </Link>
            </div>
          </div>
        </header>

        <section className="case-hero-modern">
          <div className="case-hero-container">
            <div className="case-meta-pill">
              <span className="badge-tag">{project.category}</span>
              <span className="badge-sep" />
              <span className="badge-stat">{project.status}</span>
            </div>

            <div className="case-title-brand-row">
              {project.logo && (
                <div className="case-logo-badge">
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={64}
                    height={64}
                    className="project-logo-img"
                    priority
                  />
                </div>
              )}
              <h1 className="case-title">{project.name}</h1>
            </div>

            <p className="case-headline">{project.headline}</p>
            <p className="case-desc">{project.description}</p>

            <div className="case-links-row">
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-case-primary"
                >
                  <span>{project.siteLabel}</span>
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="case-mockup-stage">
          <div className="case-stage-container">
            <div className="stage-frame">
              <div className="stage-topbar-case">
                <span>
                  {ui.envLabel}{" // "}{project.name}
                </span>
                <span className="status-dot-active" />
              </div>
              <div className="stage-preview-body">
                {slug === "nabdh" && <NabdhInteractivePreview isArabic={isArabic} />}
                {slug === "koupa" && <KoupaInteractivePreview isArabic={isArabic} />}
                {slug === "masroof" && <MasroofInteractivePreview isArabic={isArabic} />}
                {slug === "lamsa" && <LamsaInteractivePreview isArabic={isArabic} />}
                {slug === "nexus" && <NexusInteractivePreview isArabic={isArabic} />}
              </div>
            </div>
          </div>
        </section>

        <section className="case-metrics-section">
          <div className="case-metrics-container">
            {project.metrics.map(([label, val], idx) => (
              <div key={idx} className="metric-box">
                <span className="metric-label">{label}</span>
                <strong className="metric-val">{val}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section-block">
          <div className="case-content-container">
            <div className="case-section-pill">
              <span>01</span>
              <span className="pill-sep" />
              <span>{ui.challengePill}</span>
            </div>
            <h2 className="case-h2">{ui.challengeTitle}</h2>
            <p className="case-p-lead">{project.context}</p>
          </div>
        </section>

        <section className="case-section-block bg-subtle">
          <div className="case-content-container">
            <div className="case-section-pill">
              <span>02</span>
              <span className="pill-sep" />
              <span>{ui.approachPill}</span>
            </div>
            <h2 className="case-h2">{ui.approachTitle}</h2>

            <div className="approach-grid">
              {project.approach.map(([num, title, copy]) => (
                <div key={num} className="approach-card">
                  <span className="approach-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section-block">
          <div className="case-content-container">
            <div className="case-section-pill">
              <span>03</span>
              <span className="pill-sep" />
              <span>{ui.stackPill}</span>
            </div>
            <div className="tech-stack-chips">
              {project.stack.map((item) => (
                <span key={item} className="tech-chip">
                  <Check size={14} className="chip-check" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer className="case-footer-modern">
          <div className="case-footer-inner">
            <div className="case-footer-brand">
              <Link href="/" aria-label="Fennec Studio">
                <Image
                  src="/fennec-wordmark.jpg"
                  alt="Fennec"
                  width={150}
                  height={30}
                  className="footer-wordmark-img"
                />
              </Link>
              <p>{ui.footerTag}</p>
            </div>
            <a
              href="mailto:info.fennec.vision@gmail.com"
              className="case-footer-cta"
            >
              <span>{ui.contact}</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
