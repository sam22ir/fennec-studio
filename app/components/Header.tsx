"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X, ArrowUpRight } from "lucide-react";

type Locale = "en" | "ar";
type NavItem = { id: string; label: string; href?: string };

interface HeaderProps {
  locale: Locale;
  onToggleLocale: () => void;
  isArabic: boolean;
  // Prefix for in-page anchors. Empty on the home page; "/" or "/en" on other pages.
  anchorBase?: string;
}

export function Header({ locale, onToggleLocale, isArabic, anchorBase = "" }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // While the drawer is open: Escape closes it, Tab stays inside it,
  // focus moves in on open and returns to the menu toggle on close.
  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    const toggle = toggleRef.current;
    const getFocusable = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      const outside = !drawer?.contains(current);
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [menuOpen]);

  const navItems = isArabic
    ? [
        { id: "top", label: "الرئيسية" },
        { id: "vision", label: "موقفنا" },
        { id: "vision-page", label: "رؤيتنا", href: "/vision" },
        { id: "work", label: "أعمالنا" },
        { id: "principles", label: "مبادئنا" },
        { id: "contact", label: "تواصل" },
      ]
    : [
        { id: "top", label: "Home" },
        { id: "vision", label: "Stance" },
        { id: "vision-page", label: "Vision", href: "/en/vision" },
        { id: "work", label: "Work" },
        { id: "principles", label: "Principles" },
        { id: "contact", label: "Contact" },
      ];

  // Items with an explicit href (the Vision page) navigate normally. Anchor items
  // scroll in place when their section exists, otherwise they follow the link to the home page.
  const hrefFor = (item: NavItem) => item.href ?? `${anchorBase}#${item.id}`;

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
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    e.preventDefault();
    setActiveSection(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`modern-header ${scrolled ? "header-scrolled" : ""} ${isArabic ? "arabic-header" : ""}`}>
        <div className="header-inner">
          <a
            href={`${anchorBase}#top`}
            className="brand-wordmark-link"
            onClick={(e) => handleNavClick(e, "top")}
            aria-label="Fennec Studio"
          >
            <Image
              src="/fennec-wordmark.webp"
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
                      href={hrefFor(item)}
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

            <a href={`${anchorBase}#contact`} className="header-cta" onClick={(e) => handleNavClick(e, "contact")}>
              <span>{ctaText}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
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
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={isArabic ? "القائمة" : "Menu"}
              className="mobile-drawer"
              initial={{ x: isArabic ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <Image
                  src="/fennec-wordmark.webp"
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
                      href={hrefFor(item)}
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
                  href={`${anchorBase}#contact`}
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
