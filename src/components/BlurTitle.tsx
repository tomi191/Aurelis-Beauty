/**
 * Заглавие с каскаден masked word rise: всяка дума изплува изпод невидим
 * ръб (overflow-clip маска около word-rise транслацията). Server компонент,
 * чист CSS: текстът е в SSR HTML-а, from-състоянието живее само в keyframes.
 * pb-[0.08em] в маската пази кирилските дескендери (р, у, д) от клипване.
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
            className="inline-block overflow-clip align-bottom pb-[0.08em]"
          >
            <span
              className="word-rise inline-block"
              style={{ animationDelay: `${delay + i * 0.055}s` }}
            >
              {w}
            </span>
          </span>
        )
      )}
    </h1>
  );
}
