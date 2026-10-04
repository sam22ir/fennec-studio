"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";

// One booking told from both sides: the customer books on the front phone,
// and the same appointment lands on the barber's phone in real time.
type Callout = "shop" | "service" | "time" | "ticket" | "status";

const steps: {
  id: string;
  customer: string;
  barber: string;
  callout: Callout;
  ms: number;
  en: string;
  ar: string;
  capEn: string;
  capAr: string;
}[] = [
  { id: "find", customer: "find", barber: "today0", callout: "shop", ms: 3600, en: "Find", ar: "ابحث", capEn: "Find a barber near you", capAr: "اعثر على حلاق قريب منك" },
  { id: "choose", customer: "service-day", barber: "today0", callout: "service", ms: 3600, en: "Choose", ar: "اختر", capEn: "Pick a service and a day", capAr: "اختر الخدمة واليوم" },
  { id: "time", customer: "time", barber: "today0", callout: "time", ms: 3600, en: "Time", ar: "الوقت", capEn: "Every open time on one screen", capAr: "كل الأوقات المتاحة في شاشة واحدة" },
  { id: "booked", customer: "home", barber: "today", callout: "ticket", ms: 4800, en: "Synced", ar: "مزامنة", capEn: "The booking lands on the barber's phone instantly", capAr: "يصل الحجز إلى هاتف الحلاق فورًا" },
  { id: "checkin", customer: "home", barber: "qr", callout: "status", ms: 4800, en: "Check-in", ar: "الحضور", capEn: "A QR code confirms the visit at the shop", capAr: "رمز QR يؤكد الحضور في المحل" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <AnimatePresence initial={false}>
      <motion.img
        key={src}
        src={`/projects/koupa-screens/${src}.jpg`}
        alt={alt}
        width={578}
        height={1214}
        className="ks-screen"
        draggable={false}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease }}
      />
    </AnimatePresence>
  );
}

// Crisp re-creations of real Koupa UI, lifted out of the screen at life size
function CalloutCard({ type }: { type: Callout }) {
  switch (type) {
    case "shop":
      return (
        <div className="ks-card ks-card-shop">
          <span className="ks-avatar">س ح</span>
          <span className="ks-col">
            <strong>سمير حلاق</strong>
            <small>طريق الضاحية، الشريعة</small>
          </span>
          <span className="ks-price"><small>من</small> 500 دج</span>
        </div>
      );
    case "service":
      return (
        <div className="ks-card ks-card-service">
          <div className="ks-row is-on">
            <span className="ks-radio" />
            <span className="ks-col"><strong>حلاقة شعر</strong><small>30 دقيقة</small></span>
            <b>500 دج</b>
          </div>
          <div className="ks-row">
            <span className="ks-radio" />
            <span className="ks-col"><strong>ذقن</strong><small>15 دقيقة</small></span>
            <b>300 دج</b>
          </div>
        </div>
      );
    case "time":
      return (
        <div className="ks-card ks-card-time">
          <small>الأربعاء 30 سبتمبر</small>
          <strong dir="rtl">10:30 ص</strong>
        </div>
      );
    case "ticket":
      return null; // the ticket has its own flight path
    case "status":
      return (
        <div className="ks-card ks-card-status" dir="rtl">
          <span className="ks-chip c1">محجوز</span>
          <span className="ks-arrow">←</span>
          <span className="ks-chip c2">حاضر ✓</span>
          <span className="ks-arrow">←</span>
          <span className="ks-chip c3">مكتمل ✓</span>
        </div>
      );
  }
}

export function KoupaShowcase({ isArabic }: { isArabic: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts per-step animations when a step is re-selected
  const [arrived, setArrived] = useState(false); // barber screen updates once the ticket lands
  const stageRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    setIndex(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => goTo((index + 1) % steps.length), steps[index].ms);
    return () => clearTimeout(t);
  }, [index, paused, reduce, cycle]);

  useEffect(() => {
    if (index !== 3) return setArrived(index > 3);
    if (reduce) return setArrived(true);
    setArrived(false);
    const t = setTimeout(() => setArrived(true), 1900);
    return () => clearTimeout(t);
  }, [index, cycle, reduce]);

  // gentle 3D tilt that follows the pointer
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    stageRef.current.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    stageRef.current.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    setPaused(false);
    stageRef.current?.style.setProperty("--tx", "0");
    stageRef.current?.style.setProperty("--ty", "0");
  };

  const step = steps[index];
  const synced = index >= 3 && arrived;
  const barberScreen = index === 3 && !arrived ? "today0" : step.barber;
  const progress = ((index + 1) / steps.length) * 100;

  return (
    <MotionConfig reducedMotion="user">
    <div className="ks-root">
      <div
        ref={stageRef}
        className={`ks-stage step-${step.id}${synced ? " is-synced" : ""}`}
        onPointerEnter={() => setPaused(true)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="ks-glow" aria-hidden="true" />
        <div className="ks-live" aria-hidden="true">
          <span className="ks-live-dot" />
          {isArabic ? "مزامنة فورية" : "Live sync"}
        </div>

        {/* barber side: sits back until the booking arrives */}
        <div className="ks-device ks-barber">
          <span className="ks-role">{isArabic ? "هاتف الحلاق" : "Barber"}</span>
          <button
            type="button"
            className="ks-phone"
            onClick={() => goTo(index === 3 ? 4 : 3)}
            aria-label={isArabic ? "عرض جهة الحلاق" : "Show the barber side"}
          >
            <Screen src={barberScreen} alt={isArabic ? "شاشة الحلاق في Koupa" : "Koupa barber screen"} />
            {index === 3 && arrived && <span key={`ping-${cycle}`} className="ks-arrive" aria-hidden="true">+1</span>}
          </button>
        </div>

        {/* customer side: drives the story */}
        <div className="ks-device ks-customer">
          <span className="ks-role">{isArabic ? "هاتف الزبون" : "Customer"}</span>
          <button
            type="button"
            className="ks-phone"
            onClick={() => goTo((index + 1) % steps.length)}
            aria-label={isArabic ? "الخطوة التالية" : "Next step"}
          >
            <Screen src={step.customer} alt={isArabic ? step.capAr : step.capEn} />
          </button>
        </div>

        {/* the lifted UI card for this step */}
        <AnimatePresence mode="wait">
          {step.callout !== "ticket" && (
            <motion.div
              key={`${step.id}-${cycle}`}
              className={`ks-callout at-${step.callout}`}
              initial={{ opacity: 0, scale: 0.7, y: 20, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.6, ease, delay: 0.35 }}
              aria-hidden="true"
            >
              <CalloutCard type={step.callout} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* the booking ticket travels from one phone to the other */}
        {index === 3 && (
          <div key={`ticket-${cycle}`} className="ks-flight" aria-hidden="true">
            <svg className="ks-trail" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 4 34 Q 50 -8 96 30" />
            </svg>
            <div className="ks-ticket">
              <span className="ks-badge"><i />محجوز</span>
              <strong>حلاقة شعر</strong>
              <small>سمير حلاق</small>
              <span className="ks-ticket-row"><b dir="rtl">10:30 ص</b><b>500 دج</b></span>
            </div>
          </div>
        )}
      </div>

      <p className="ks-caption" aria-live="polite">
        <span className="ks-caption-num">{String(index + 1).padStart(2, "0")}</span>
        {isArabic ? step.capAr : step.capEn}
      </p>

      {/* barber-pole progress rail */}
      <div className="ks-rail" style={{ "--fill": `${progress}%` } as CSSProperties}>
        <div className="ks-pole" aria-hidden="true"><span className="ks-pole-fill" /></div>
        <div className="ks-steps" role="tablist" aria-label={isArabic ? "خطوات الحجز" : "Booking steps"}>
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`ks-step${i === index ? " is-active" : ""}${i < index ? " is-done" : ""}`}
              onClick={() => goTo(i)}
            >
              {isArabic ? s.ar : s.en}
            </button>
          ))}
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
