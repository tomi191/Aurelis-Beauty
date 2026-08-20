"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { laserZones } from "@/lib/data";

/**
 * Ценоразпис за лазерна епилация с превключвател Жени/Мъже.
 * Колоната с цените е с фиксирана ширина, а смяната на стойността
 * се анимира с .fade-up (remount през key) — без layout скок.
 */
export default function LaserPriceToggle() {
  const [sex, setSex] = useState<"f" | "m">("f");

  const pill =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-[0.95rem] transition-[background-color,border-color,color] duration-200";

  return (
    <div>
      <div
        className="flex flex-wrap gap-3"
        role="group"
        aria-label="Цени за жени или за мъже"
      >
        <button
          type="button"
          aria-pressed={sex === "f"}
          onClick={() => setSex("f")}
          className={`${pill} ${
            sex === "f"
              ? "bg-bordeaux text-paper shadow-pill"
              : "border hairline bg-card/60 text-secondary-ink hover:border-bordeaux"
          }`}
        >
          Жени
        </button>
        <button
          type="button"
          aria-pressed={sex === "m"}
          onClick={() => setSex("m")}
          className={`${pill} ${
            sex === "m"
              ? "bg-bordeaux text-paper shadow-pill"
              : "border hairline bg-card/60 text-secondary-ink hover:border-bordeaux"
          }`}
        >
          Мъже
        </button>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {laserZones.map((group) => (
          <Card key={group.group} className="h-full p-7">
            <div className="flex items-baseline justify-between border-b-2 border-bordeaux/80 pb-3">
              <h3 className="font-display text-xl font-semibold text-bordeaux">
                {group.group}
              </h3>
              <span className="text-[0.8rem] text-secondary-ink">
                {sex === "f" ? "Жени" : "Мъже"}
              </span>
            </div>
            <ul className="divide-y hairline">
              {group.zones.map((z) => (
                <li
                  key={z.zone}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <span className="text-[0.95rem] text-secondary-ink">
                    {z.zone}
                  </span>
                  <span
                    key={sex}
                    className="fade-up tnum w-16 shrink-0 text-right text-[0.95rem] font-semibold text-bordeaux"
                  >
                    {z[sex]}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
