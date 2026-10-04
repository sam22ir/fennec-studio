"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X, ArrowUpRight } from "lucide-react";

type Locale = "en" | "ar";

interface HeaderProps {
  locale: Locale;
  onToggleLocale: () => void;
  isArabic: boolean;
}

export function Header({ locale, onToggleLocale, isArabic }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = isArabic
    ? [
        { id: "top", label: "الرئيسية" },
        { id: "vision", label: "رؤيتنا" },
        { id: "work", label: "أعمالنا" },
        { id: "principles", label: "مبادئنا" },
        { id: "contact", label: "تواصل" },
      ]
    : [
        { id: "top", label: "Home" },
        { id: "vision", label: "Vision" },
        { id: "work", label: "Work" },
        { id: "principles", label: "Principles" },
        { id: "contact", label: "Contact" },
      ];

  const ctaText = isArabic ? "ابدأ مشروعك" : "Start a project";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["top", "vision", "work", "principles", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`modern-header ${scrolled ? "header-scrolled" : ""} ${isArabic ? "arabic-header" : ""}`}>
        <div className="header-inner">
          <a
            href="#top"
            className="brand-wordmark-link"
            onClick={(e) => handleNavClick(e, "top")}
            aria-label="Fennec Studio"
          >
            <Image
              src="/fennec-wordmark.jpg"
              alt="Fennec"
              width={160}
              height={32}
              priority
              className="header-wordmark-img"
            />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <ul className="nav-list">
              {navItems.map((item) => {
                const isActive = mounted && activeSection === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`nav-link ${isActive ? "active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activePill"
                          className="active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className="lang-pill"
              type="button"
              onClick={onToggleLocale}
              aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Languages size={14} className="lang-icon" aria-hidden="true" />
              <span className="lang-text">{isArabic ? "EN" : "عربي"}</span>
            </button>

            <a href="#contact" className="header-cta" onClick={(e) => handleNavClick(e, "contact")}>
              <span>{ctaText}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <button
              className="mobile-toggle"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="mobile-drawer"
              initial={{ x: isArabic ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <Image
                  src="/fennec-wordmark.jpg"
                  alt="Fennec"
                  width={140}
                  height={28}
                  className="header-wordmark-img"
                />
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="drawer-nav-list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`drawer-nav-link ${activeSection === item.id ? "active" : ""}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="drawer-footer">
                <a
                  href="#contact"
                  className="drawer-cta"
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
