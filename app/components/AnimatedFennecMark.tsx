"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type AnimatedFennecMarkProps = {
  reducedMotion?: boolean | null;
};

export function AnimatedFennecMark({ reducedMotion }: AnimatedFennecMarkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldAnimate = mounted && !reducedMotion;

  return (
    <div className="animated-mark">
      <svg viewBox="0 0 680 560" role="img" aria-labelledby="fennec-mark-title fennec-mark-description">
        <title id="fennec-mark-title">Fennec Studio mark</title>
        <desc id="fennec-mark-description">A geometric fennec fox beneath connected orbital nodes and digital modules.</desc>

        <g className="mark-orbit" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5">
          <motion.path 
            d="M163 211C176 111 246 50 340 45C438 42 503 104 518 215" 
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.12, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path 
            d="M191 120C232 176 448 177 489 120" 
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path 
            d="M340 45C312 82 301 111 298 150" 
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>

        <g className="mark-nodes">
          {([
            [191, 120, 0.36],
            [340, 45, 0.5],
            [489, 120, 0.64],
          ] as const).map(([cx, cy, delay]) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="17"
              initial={shouldAnimate ? { opacity: 0, scale: 0.5 } : false}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>

        <g className="mark-modules">
          {([
            [274, 124, 38, 38, "soft", 0.64],
            [390, 120, 42, 42, "red", 0.72],
            [312, 148, 72, 70, "mid", 0.8],
            [230, 171, 74, 75, "light", 0.88],
            [397, 177, 55, 54, "soft", 0.96],
            [266, 258, 39, 39, "mid", 1.04],
            [313, 230, 76, 79, "deep", 1.12],
          ] as const).map(([x, y, width, height, tone, delay]) => (
            <motion.rect
              key={`${x}-${y}`}
              className={`module-${tone}`}
              x={x}
              y={y}
              width={width}
              height={height}
              rx="12"
              initial={shouldAnimate ? { opacity: 0, scale: 0.65, rotate: -5 } : false}
              animate={shouldAnimate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>

        <motion.g
          className="mark-fox"
          initial={shouldAnimate ? { opacity: 0, scale: 0.92, y: 22 } : false}
          animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ delay: 0.84, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <path className="fox-outer" d="M340 354 52 132c8 130 61 216 153 272l-39 48c47 53 108 86 174 98 66-12 127-45 174-98l-39-48c92-56 145-142 153-272Z" />
          <path className="fox-inner" d="M80 174c24 103 71 167 145 207l82-8Z" />
          <path className="fox-inner" d="M600 174c-24 103-71 167-145 207l-82-8Z" />
          <path className="fox-face" d="M206 396c43-14 88-27 134-42 46 15 91 28 134 42l18 52c-42 45-93 76-152 99-59-23-110-54-152-99Z" />
          <path className="fox-brow" d="M340 354 252 386c46 39 74 91 88 151 14-60 42-112 88-151Z" />
          <path className="fox-eye" d="M231 436c28 2 48 14 61 35-22-15-44-23-67-24Z" />
          <path className="fox-eye" d="M449 436c-28 2-48 14-61 35 22-15 44-23 67-24Z" />
          <path
            className="fox-nose"
            d="M319 538c6-15 36-15 42 0-2 15-14 22-21 22s-19-7-21-22Z"
          />
        </motion.g>
      </svg>
    </div>
  );
}
