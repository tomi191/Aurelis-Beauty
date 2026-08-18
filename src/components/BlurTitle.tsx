"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Заглавие с per-word blur reveal (по референтния проект):
 * всяка дума идва от blur(12px) с каскадно закъснение.
 */
export default function BlurTitle({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduce) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}> </span>
        ) : (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        )
      )}
    </h1>
  );
}
