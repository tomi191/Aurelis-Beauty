/**
 * Заглавие с каскадно per-word появяване. Server компонент, чист CSS:
 * текстът е в SSR HTML-а (opacity .001 само в keyframes, никога в markup-а),
 * анимацията не чака hydration и не ползва filter: blur — JS-управляваният
 * per-word blur(12px) даваше рендер timeout-и и празни първи кадри.
 * При prefers-reduced-motion думите са просто видими (гейтът е в globals.css).
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
  const words = text.split(/(\s+)/);

  return (
    <h1 className={className}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}> </span>
        ) : (
          <span
            key={i}
            className="word-in inline-block"
            style={{ animationDelay: `${delay + i * 0.045}s` }}
          >
            {w}
          </span>
        )
      )}
    </h1>
  );
}
