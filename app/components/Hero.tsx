"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { productBrands, productOrder } from "./product-brands";
import { projects } from "../projects/project-data";
import { nextTabIndex } from "./tab-keys";

type Locale = "en" | "ar";

interface HeroProps {
  locale: Locale;
  isArabic: boolean;
  reducedMotion?: boolean | null;
}

// The headline finishes itself with each real domain we build for, in sync with that product's icon.
export function Hero({ locale, isArabic, reducedMotion }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // set by the visitor's own pause button; stays paused until they press play
  const [userPaused, setUserPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const content = {
    en: {
      lead: "Useful software for",
      tail: "Made in Algeria, for everyday life here",
      intro: "Fennec designs and ships calm, Arabic-first apps that keep working on a weak connection",
      exploreBtn: "See the products",
      caseLink: "Case study",
      shelfLabel: "Five products, one studio",
      pause: "Pause rotation",
      play: "Play rotation",
    },
    ar: {
      lead: "برمجيات مفيدة",
      tail: "صُنعت في الجزائر، لواقعنا اليومي",
      intro: "يصمم فينك تطبيقات هادئة، عربية أولًا، تواصل العمل حتى مع اتصال ضعيف",
      exploreBtn: "شاهد المنتجات",
      caseLink: "دراسة الحالة",
      shelfLabel: "خمسة منتجات، استوديو واحد",
      pause: "إيقاف التبديل",
      play: "تشغيل التبديل",
    },
  }[locale];

  // the first switch comes quickly so visitors notice the headline is alive, then it settles into a calmer pace
  const firstSwitch = useRef(true);
  useEffect(() => {
    if (paused || userPaused || reducedMotion) return;
    const t = setTimeout(() => {
      firstSwitch.current = false;
      setActive((i) => (i + 1) % productOrder.length);
    }, firstSwitch.current ? 1200 : 2800);
    return () => clearTimeout(t);
  }, [active, paused, userPaused, reducedMotion]);

  const slug = productOrder[active];
  const brand = productBrands[slug];
  const project = projects[slug][locale];
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hx" id="top">
      <div className="hx-inner">
        <div className="hx-copy">
          <h1 className="hx-title">
            <span className="hx-title-lead">{content.lead}</span>
            <span className="hx-rotor">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={slug}
                  className="hx-rotor-word"
                  style={{ color: brand.ink }}
                  initial={{ y: "70%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-70%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isArabic ? brand.domainAr : brand.domainEn}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="hx-tail">{content.tail}</p>
          <p className="hx-intro">{content.intro}</p>

          <div className="hx-actions">
            <button type="button" className="hx-btn-primary" onClick={() => scrollTo("work")}>
              {content.exploreBtn}
              <ArrowDown size={17} aria-hidden="true" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                className="hx-btn-toggle"
                aria-pressed={userPaused}
                aria-label={userPaused ? content.play : content.pause}
                onClick={() => setUserPaused((p) => !p)}
              >
                {userPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
                <span>{userPaused ? content.play : content.pause}</span>
              </button>
            )}
          </div>
        </div>

        <div
          className="hx-shelf"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="hx-shelf-label">{content.shelfLabel}</span>

          <div className="hx-tiles" role="tablist" aria-label={content.shelfLabel}>
            {productOrder.map((s, i) => {
              const b = productBrands[s];
              return (
                <button
                  key={s}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`hero-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="hero-tab-panel"
                  tabIndex={i === active ? 0 : -1}
                  aria-label={projects[s][locale].name}
                  className={`hx-tile${i === active ? " is-active" : ""}`}
                  style={{ background: b.tile }}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    const next = nextTabIndex(e.key, i, productOrder.length, isArabic);
                    if (next === null) return;
                    e.preventDefault();
                    setActive(next);
                    tabRefs.current[next]?.focus();
                  }}
                >
                  <Image src={b.mark} alt="" width={120} height={120} className="hx-tile-img" />
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slug}
              id="hero-tab-panel"
              role="tabpanel"
              aria-labelledby={`hero-tab-${active}`}
              className="hx-card"
              style={{ borderTopColor: brand.ink }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hx-card-top">
                <span className="hx-card-cat" style={{ color: brand.ink }}>{project.category}</span>
                <span className="hx-card-status">{project.status}</span>
              </div>
              <p className="hx-card-name">{project.name}</p>
              <p className="hx-card-line">{project.headline}</p>
              <Link href={`/projects/${slug}`} className="hx-card-link" style={{ color: brand.ink }}>
                {content.caseLink}
                <Arrow size={15} aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
