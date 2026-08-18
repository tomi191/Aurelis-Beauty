"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

/**
 * Плавно появяване при скрол (motion): веднъж, с изразителния easing
 * от референтния проект. При prefers-reduced-motion съдържанието стои видимо.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof tags;
}) {
  const reduce = useReducedMotion();
  const Tag = tags[as];

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
