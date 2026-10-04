"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

type Pillar = { title: string; desc: string };

// A wavy line that fills as the visitor scrolls; each stop lights up and reveals its text when the fill reaches it.
export function StanceWave({ pillars, finale }: { pillars: Pillar[]; finale: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [isRtl, setIsRtl] = useState(false);
  const [stops, setStops] = useState<number[]>([]); // where each point sits along the path, 0..1
  const [reached, setReached] = useState(0);
  const [arrived, setArrived] = useState(false); // the fill reached the end of the line
  const headX = useMotionValue(0);
  const headY = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 72%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth);
      setIsRtl(getComputedStyle(el).direction === "rtl");
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // wide: the wave runs down the middle and the texts zig-zag around it; narrow: the wave hugs the edge
  const compact = width > 0 && width < 720;
  const step = compact ? 270 : 210;
  const top = 34;
  // on narrow screens the last text sits beside the line, so the line runs past it before curving to the centre
  const height = top + step * pillars.length + (compact ? 170 : 60);
  const gap = compact ? 20 : 44;
  const lane = 64; // the band the wave swings inside on narrow screens

  const geo = useMemo(() => {
    if (!width) return null;
    const mirror = (x: number) => (isRtl ? width - x : x);
    const center = width / 2;
    const amp = Math.min(64, width * 0.06);
    // the first stop sits on the side reading starts from... mirrored, so in Arabic it opens on the left
    const sideOf = (i: number): "left" | "right" => ((i % 2 === 0) !== isRtl ? "right" : "left");
    const pts = pillars.map((_, i) => {
      const y = top + step * i;
      if (compact) return { x: mirror(lane * (i % 2 === 0 ? 0.14 : 0.86)), y, side: (isRtl ? "left" : "right") as "left" | "right" };
      const side = sideOf(i);
      return { x: side === "right" ? center + amp : center - amp, y, side };
    });
    const startX = compact ? mirror(lane * 0.5) : center;
    const endX = center;
    let d = `M ${startX} 0 C ${startX} ${top * 0.5}, ${pts[0].x} ${top * 0.5}, ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      d += ` C ${p0.x} ${p0.y + step / 2}, ${p1.x} ${p1.y - step / 2}, ${p1.x} ${p1.y}`;
    }
    const last = pts[pts.length - 1];
    if (compact) {
      const clear = last.y + step * 0.92; // below the last text block
      d += ` L ${last.x} ${clear} C ${last.x} ${clear + (height - clear) * 0.6}, ${endX} ${height - (height - clear) * 0.5}, ${endX} ${height}`;
    } else {
      d += ` C ${last.x} ${last.y + (height - last.y) * 0.5}, ${endX} ${height - (height - last.y) * 0.4}, ${endX} ${height}`;
    }
    return { d, pts, endX };
  }, [width, isRtl, compact, step, height, pillars]);

  // find how far along the path each point is, so a stop lights exactly when the fill touches it
  useEffect(() => {
    const path = pathRef.current;
    if (!geo || !path) return;
    const total = path.getTotalLength();
    const samples = 600;
    setStops(
      geo.pts.map((pt) => {
        let best = 0;
        let bestDist = Infinity;
        for (let s = 0; s <= samples; s++) {
          const p = path.getPointAtLength((s / samples) * total);
          const dist = Math.hypot(p.x - pt.x, p.y - pt.y);
          if (dist < bestDist) { bestDist = dist; best = s / samples; }
        }
        return best;
      }),
    );
  }, [geo]);

  const update = (v: number) => {
    const path = pathRef.current;
    if (!path || !stops.length) return;
    setReached(stops.filter((f) => v >= f - 0.004).length);
    setArrived(v >= 0.985);
    const p = path.getPointAtLength(Math.min(1, Math.max(0, v)) * path.getTotalLength());
    headX.set(p.x);
    headY.set(p.y);
  };
  useMotionValueEvent(progress, "change", (v) => { if (!reduce) update(v); });
  // sync the tip and stops once positions are known, and whenever the layout changes
  useEffect(() => {
    update(reduce ? 1 : progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops, reduce]);

  // only decide once measured on the client, so server and client render the same markup
  const lit = geo ? (reduce ? pillars.length : reached) : 0;
  const done = !!geo && (reduce || arrived);

  return (
    <div className={`sw-wrap${geo ? " is-ready" : ""}`}>
      <div ref={wrapRef} className={`sw${geo ? " is-ready" : ""}`} style={geo ? { height } : undefined}>
        {geo && (
          <svg className="sw-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            <path d={geo.d} className="sw-base" />
            <motion.path ref={pathRef} d={geo.d} className="sw-fill" style={{ pathLength: reduce ? 1 : progress }} />
          </svg>
        )}
        {geo && !reduce && <motion.span className="sw-head" style={{ x: headX, y: headY }} aria-hidden="true" />}

        <ol className="sw-list">
          {pillars.map((pillar, i) => {
            const on = i < lit;
            const pt = geo?.pts[i];
            return (
              <li
                key={i}
                className={`sw-item${on ? " is-on" : ""}`}
                style={pt ? { top: pt.y } : undefined}
              >
                {pt && <span className="sw-dot" style={{ left: pt.x }} aria-hidden="true" />}
                <div
                  className={`sw-text${pt ? ` to-${pt.side}` : ""}`}
                  style={
                    !pt
                      ? undefined
                      : compact
                        ? // narrow: clear the whole lane the wave swings in, not just this point
                          isRtl ? { right: lane + gap, left: 0 } : { left: lane + gap, right: 0 }
                        : pt.side === "right"
                          ? { left: pt.x + gap, right: 0 }
                          : { right: width - pt.x + gap, left: 0 }
                  }
                >
                  <span className="sw-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="sw-title">{pillar.title}</h3>
                  <p className="sw-desc">{pillar.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* the line ends here, at the idea every product serves */}
      <div className={`sw-finale${done ? " is-on" : ""}`}>
        <span className="sw-finale-dot" aria-hidden="true" />
        {finale}
      </div>
    </div>
  );
}
