/**
 * Слънчевите лъчи от логото и консултационната карта на AURÈLIS:
 * dash-dot лъчи около отворен кръг. Рисува се с currentColor,
 * така че тонът се управлява от родителя (gold за акценти).
 */
export default function SunRays({
  className,
  half = false,
}: {
  className?: string;
  half?: boolean;
}) {
  const rays = [];
  const count = half ? 13 : 24;
  const startAngle = 0;
  const span = half ? 180 : 360;
  for (let i = 0; i < count; i++) {
    const angle = ((startAngle + (i * span) / (count - (half ? 1 : 0))) * Math.PI) / 180;
    const inner = 34;
    const outer = i % 2 === 0 ? 58 : 48;
    const x1 = 60 + inner * Math.cos(angle);
    const y1 = 60 - inner * Math.sin(angle);
    const x2 = 60 + outer * Math.cos(angle);
    const y2 = 60 - outer * Math.sin(angle);
    rays.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeDasharray={i % 3 === 2 ? "3 3" : undefined}
      />
    );
  }
  return (
    <svg
      viewBox={half ? "0 0 120 62" : "0 0 120 120"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="26"
        strokeDasharray={half ? "1000" : undefined}
      />
      {rays}
    </svg>
  );
}
