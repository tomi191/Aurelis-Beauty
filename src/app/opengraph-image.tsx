import { ImageResponse } from "next/og";

/* OG карта: бордо фон, златни акценти, арка мотив.
   Текстът е само на латиница: вграденият шрифт няма кирилица. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AURELIS Beauty Atelier · Varna";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #3d1218 0%, #5e2129 100%)",
        }}
      >
        {/* Арката: заоблен отгоре правоъгълник, като витрината на ателието */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 560,
            height: 460,
            border: "3px solid #b98d52",
            borderRadius: "999px 999px 28px 28px",
            background: "rgba(185, 141, 82, 0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#b98d52",
              marginBottom: 36,
            }}
          />
          <div
            style={{
              fontSize: 92,
              color: "#f5ece1",
              letterSpacing: 14,
              lineHeight: 1,
            }}
          >
            AURELIS
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 2,
              background: "#b98d52",
              marginTop: 34,
              marginBottom: 30,
            }}
          />
          <div
            style={{
              fontSize: 30,
              color: "#b98d52",
              letterSpacing: 7,
            }}
          >
            Beauty Atelier · Varna
          </div>
        </div>
      </div>
    ),
    size
  );
}
