import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Брандирана OG карта, споделена от всички страници: бордо фон, истинското
 * лого (кремавият вектор), заглавието на страницата в Cormorant Garamond
 * (сваленият TTF носи кирилица) и златната арка като декор. Всяка страница
 * подава своето заглавие — както при Vrachka, картата в споделен линк
 * казва каква е страницата, не само кой е брандът.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export async function brandOg(title: string, subtitle?: string) {
  const [font, logoSvg] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        "src/assets/fonts/CormorantGaramond-Medium.ttf"
      )
    ),
    readFile(path.join(process.cwd(), "public/logo-cream.svg"), "utf8"),
  ]);
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(150deg, #381016 0%, #5e2129 62%, #6d2934 100%)",
          fontFamily: "Cormorant",
        }}
      >
        {/* Златната арка: декор вдясно, извън кадър надолу */}
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 120,
            width: 400,
            height: 620,
            border: "3px solid rgba(185, 141, 82, 0.55)",
            borderRadius: "999px 999px 0 0",
            background: "rgba(185, 141, 82, 0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 258,
            top: 176,
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#d9b98a",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px 48px",
            width: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} height={132} alt="" />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                width: 84,
                height: 3,
                background: "#b98d52",
                marginBottom: 28,
              }}
            />
            <div
              style={{
                fontSize: title.length > 26 ? 62 : 76,
                color: "#f5ece1",
                lineHeight: 1.08,
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  fontSize: 30,
                  color: "#d9b98a",
                  marginTop: 20,
                  letterSpacing: 2,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div
            style={{
              fontSize: 26,
              color: "rgba(217, 185, 138, 0.85)",
              letterSpacing: 4,
              display: "flex",
            }}
          >
            aurelisbeauty.eu · Варна
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Cormorant", data: font, weight: 500, style: "normal" }],
    }
  );
}
