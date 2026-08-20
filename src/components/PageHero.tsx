import type { ReactNode } from "react";
import BlurTitle from "@/components/BlurTitle";
import Reveal from "@/components/Reveal";

/**
 * Единният hero за вътрешните страници: реалистичен кадър като фон
 * (същата визуална линия като началната), воали за четимост и
 * съдържание отгоре. Отрицателният top margin вкарва кадъра под
 * прозрачния header (main има pt-20/24); overflow-hidden клипва
 * parallax дрейфа (урокът от началната).
 *
 * CTA йерархията живее в children: ЕДИН плътен бордо бутон (записване),
 * всичко останало е ghost или текстов линк.
 */
export default function PageHero({
  img,
  title,
  titleClassName,
  sub,
  eyebrow,
  objectPosition,
  children,
}: {
  img: string;
  title: string;
  titleClassName?: string;
  sub?: string;
  /** Малък ред над заглавието, напр. back линк */
  eyebrow?: ReactNode;
  objectPosition?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-x-clip md:-mt-24">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="hero-drift h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
        {/* Мобилно: почти плътен воал; desktop: плътно вляво, кадърът диша вдясно */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/80 to-paper/90 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-paper via-paper/80 to-paper/15 md:block" />
        <div className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-paper/80 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <Reveal>
          {eyebrow}
          <span className="gold-rule mt-5 block" aria-hidden="true" />
          <BlurTitle
            text={title}
            className={
              titleClassName ??
              "mt-6 max-w-[16ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            }
          />
          {sub && (
            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-secondary-ink">
              {sub}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
