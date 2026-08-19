import type { ReactNode } from "react";

/**
 * Плавно появяване при скрол — чист CSS (.reveal, scroll-driven анимация в
 * globals.css), без JS/hydration: съдържанието никога не е opacity:0 в HTML-а.
 * `delay` остава в интерфейса за съвместимост със страниците, но се игнорира:
 * scroll-driven анимацията се води по позицията на елемента, не по време.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  return (
    <Tag className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </Tag>
  );
}
