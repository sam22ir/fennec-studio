"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Languages } from "lucide-react";
import { projects, projectSlugs, type ProjectSlug } from "./project-data";

type Locale = "en" | "ar";

export default function ProjectsIndexPage() {
  const [locale, setLocale] = useState<Locale>("ar");
  const isArabic = locale === "ar";
  const BackIcon = isArabic ? ArrowRight : ArrowLeft;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [locale, isArabic]);

  const ui = {
    en: {
      backHome: "Back home",
      badge: "Studio Work & Experiments",
      title: "All products and projects",
      lead: "A curated set of shipped and in-progress tools designed around real needs in Algeria",
      readCase: "Read case study",
      liveLink: "Live link",
      rights: "All rights reserved",
      home: "Home",
      tagline: "Fennec Studio · Independent Digital Product Engineering in Algiers",
      langSwitch: "عربي",
      langAria: "Switch to Arabic",
    },
    ar: {
      backHome: "العودة للرئيسية",
      badge: "أعمال واستكشافات الاستوديو",
      title: "جميع المنتجات والمشاريع",
      lead: "مجموعة متكاملة من الأدوات والبرمجيات المنشورة وقيد التطوير، صُممت لتلبي احتياجات حقيقية في الجزائر",
      readCase: "قراءة دراسة الحالة",
      liveLink: "الرابط المباشر",
      rights: "جميع الحقوق محفوظة",
      home: "الرئيسية",
      tagline: "استوديو فينك · هندسة وتصميم المنتجات الرقمية المستقلة في الجزائر",
      langSwitch: "EN",
      langAria: "Switch to English",
    },
  }[locale];

  const allProjects = (projectSlugs as readonly ProjectSlug[]).map((slug) => ({
    slug,
    data: projects[slug][locale],
  }));

  return (
    <div className={`fennec-taste-root ${isArabic ? "is-rtl" : "is-ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <header className="modern-header">
        <div className="header-inner">
          <Link href="/" className="brand-wordmark-link" aria-label="Fennec Studio">
            <Image
              src="/fennec-wordmark.jpg"
              alt="Fennec"
              width={150}
              height={30}
              priority
              className="header-wordmark-img"
            />
          </Link>

          <div className="header-actions">
            <button
              type="button"
              className="lang-pill"
              onClick={() => setLocale((p) => (p === "en" ? "ar" : "en"))}
              aria-label={ui.langAria}
            >
              <Languages size={14} className="lang-icon" aria-hidden="true" />
              <span className="lang-text">{ui.langSwitch}</span>
            </button>

            <Link href="/" className="header-cta">
              <BackIcon size={15} />
              <span>{ui.backHome}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="taste-section" style={{ minHeight: "80vh", paddingTop: "60px" }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">{ui.badge}</span>
            <h1 className="section-title">{ui.title}</h1>
            <p className="section-lead">{ui.lead}</p>
          </div>

          <div
            className="duo-grid"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
          >
            {allProjects.map(({ slug, data }) => (
              <div key={slug} className="duo-card">
                <div className="duo-header">
                  <span className="duo-category">{data.category}</span>
                  <span className="duo-year">{data.status}</span>
                </div>

                <div className="duo-brand-row">
                  {data.logo && (
                    <div className="project-logo-badge-sm">
                      <Image
                        src={data.logo}
                        alt={data.name}
                        width={36}
                        height={36}
                        className="project-logo-img"
                      />
                    </div>
                  )}
                  <h2 className="duo-title">{data.name}</h2>
                </div>

                <p className="duo-tagline">{data.headline}</p>
                <p className="duo-summary">{data.description}</p>

                <div className="duo-tags">
                  {data.stack.slice(0, 4).map((tag, i) => (
                    <span key={i} className="work-tag">{tag}</span>
                  ))}
                </div>

                <div
                  className="duo-footer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <Link href={`/projects/${slug}`} className="duo-link">
                    <span>{ui.readCase}</span>
                    <BackIcon size={14} />
                  </Link>

                  {data.siteUrl && (
                    <a
                      href={data.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="duo-link"
                      style={{ color: "var(--ink-muted)", fontSize: "0.82rem" }}
                    >
                      <span>{ui.liveLink}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="taste-footer">
        <div className="footer-container">
          <div className="footer-top">
            <Link href="/" className="footer-brand" aria-label="Fennec Studio">
              <Image
                src="/fennec-wordmark.jpg"
                alt="Fennec"
                width={150}
                height={30}
                className="footer-wordmark-img"
              />
            </Link>
            <p className="footer-tagline">{ui.tagline}</p>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} Fennec Studio · {ui.rights}
            </span>
            <Link href="/" className="footer-meta" style={{ textDecoration: "underline" }}>
              {ui.home}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
