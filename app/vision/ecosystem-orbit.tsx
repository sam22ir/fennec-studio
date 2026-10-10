"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { productBrands } from "../components/product-brands";
import { projects, type ProjectSlug } from "../projects/project-data";

type Locale = "en" | "ar";

// Logical coordinate space. The container scales it to the viewport, so nodes,
// spokes and the hub stay proportional on phones and desktops.
const SIZE = 560;
const CENTER = SIZE / 2;
const RADIUS = 200;
const DEGREES_PER_MS = 0.006; // one full turn every 60 seconds

const orbitSlugs: ProjectSlug[] = ["koupa", "lamsa", "nabdh", "masroof", "nexus"];

// Node i starts at evenly spaced angles, beginning at the top of the ring.
const baseAngle = (index: number) => -90 + (index * 360) / orbitSlugs.length;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const copy = {
  en: {
    hint: "Tap an app to explore",
    caseStudy: "Case study",
    visit: "Visit website",
    close: "Close",
  },
  ar: {
    hint: "اضغط على أي تطبيق للاستكشاف",
    caseStudy: "دراسة الحالة",
    visit: "زيارة الموقع",
    close: "إغلاق",
  },
} as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isMobile;
}

interface OrbitProps {
  angle: MotionValue<number>;
  index: number;
  slug: ProjectSlug;
  locale: Locale;
  expanded: boolean;
  onOpen: (slug: ProjectSlug, x: number, y: number) => void;
  setRef: (slug: ProjectSlug, el: HTMLButtonElement | null) => void;
}

// Position of an orbiting node in logical coordinates, derived from the shared angle.
function useOrbitPosition(angle: MotionValue<number>, index: number) {
  const x = useTransform(angle, (a) => CENTER + RADIUS * Math.cos(toRad(baseAngle(index) + a)));
  const y = useTransform(angle, (a) => CENTER + RADIUS * Math.sin(toRad(baseAngle(index) + a)));
  return { x, y };
}

function OrbitSpoke({ angle, index }: { angle: MotionValue<number>; index: number }) {
  const { x, y } = useOrbitPosition(angle, index);
  return (
    <motion.line
      x1={CENTER}
      y1={CENTER}
      x2={x}
      y2={y}
      className="eco-spoke"
    />
  );
}

function OrbitNode({ angle, index, slug, locale, expanded, onOpen, setRef }: OrbitProps) {
  const { x, y } = useOrbitPosition(angle, index);
  const left = useTransform(x, (v) => `${(v / SIZE) * 100}%`);
  const top = useTransform(y, (v) => `${(v / SIZE) * 100}%`);
  const project = projects[slug][locale];
  const brand = productBrands[slug];

  return (
    <motion.div className="eco-node" style={{ left, top }}>
      <button
        type="button"
        ref={(el) => setRef(slug, el)}
        className="eco-node-button"
        aria-label={project.name}
        aria-expanded={expanded}
        aria-controls="eco-card"
        onClick={() => onOpen(slug, x.get(), y.get())}
        style={{ "--px-ink": brand.ink } as CSSProperties}
      >
        <span className="eco-node-tile" style={{ background: brand.tile }}>
          <Image src={brand.mark} alt="" width={56} height={56} />
        </span>
        <span className="eco-node-label">{project.name}</span>
      </button>
    </motion.div>
  );
}

interface EcosystemOrbitProps {
  locale: Locale;
  hubLabel: string;
}

export function EcosystemOrbit({ locale, hubLabel }: EcosystemOrbitProps) {
  const t = copy[locale];
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const angle = useMotionValue(0);

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState<{ slug: ProjectSlug; fromX: number; fromY: number } | null>(null);

  const paused = hovered || focused || open !== null || Boolean(reduceMotion);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Advance the shared angle every frame unless the orbit is paused.
  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return;
    angle.set((angle.get() + delta * DEGREES_PER_MS) % 360);
  });

  const buttonRefs = useRef<Partial<Record<ProjectSlug, HTMLButtonElement | null>>>({});
  const setRef = (slug: ProjectSlug, el: HTMLButtonElement | null) => {
    buttonRefs.current[slug] = el;
  };

  const closeCard = () => {
    const slug = open?.slug;
    setOpen(null);
    if (slug) buttonRefs.current[slug]?.focus();
  };

  // Escape closes the card, as the spec asks for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // closeCard only reads the latest `open` slug, which is covered by the dependency below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openedProject = open ? projects[open.slug][locale] : null;
  const openedBrand = open ? productBrands[open.slug] : null;

  // The card grows out of the node's last on-screen position.
  const originX = open ? open.fromX - CENTER : 0;
  const originY = open ? open.fromY - CENTER : 0;

  return (
    <div
      className={`eco ${isArabic ? "is-rtl" : "is-ltr"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <svg className="eco-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        {orbitSlugs.map((slug, index) => (
          <OrbitSpoke key={slug} angle={angle} index={index} />
        ))}
      </svg>

      <div className="eco-hub" aria-hidden="true">
        <span className="eco-hub-label">{hubLabel}</span>
      </div>

      {orbitSlugs.map((slug, index) => (
        <OrbitNode
          key={slug}
          angle={angle}
          index={index}
          slug={slug}
          locale={locale}
          expanded={open?.slug === slug}
          onOpen={(s, x, y) => setOpen({ slug: s, fromX: x, fromY: y })}
          setRef={setRef}
        />
      ))}

      <p className="eco-hint">{t.hint}</p>

      <div className={`eco-card-anchor ${isMobile ? "is-sheet" : ""}`}>
        <AnimatePresence>
          {open && openedProject && openedBrand && (
            <motion.div
              key={open.slug}
              id="eco-card"
              role="dialog"
              aria-label={openedProject.name}
              className="eco-card"
              dir={isArabic ? "rtl" : "ltr"}
              initial={
                isMobile
                  ? { y: "100%", opacity: 0 }
                  : { x: originX, y: originY, scale: 0.2, opacity: 0 }
              }
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={
                isMobile
                  ? { y: "100%", opacity: 0 }
                  : { x: originX, y: originY, scale: 0.2, opacity: 0 }
              }
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
            >
              <button type="button" className="eco-card-close" onClick={closeCard} aria-label={t.close}>
                ×
              </button>
              <span className="eco-card-tag" style={{ color: openedBrand.ink }}>
                {openedProject.category}
              </span>
              <h3 className="eco-card-title">{openedProject.name}</h3>
              <p className="eco-card-text">{openedProject.description}</p>
              <div className="eco-card-actions">
                <Link href={`/projects/${open.slug}`} className="eco-card-button is-primary">
                  {t.caseStudy}
                </Link>
                {openedProject.siteUrl && (
                  <a
                    href={openedProject.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eco-card-button"
                  >
                    {t.visit}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
