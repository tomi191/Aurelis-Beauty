import SunRays from "@/components/SunRays";

/**
 * Място за снимка. Без src: явно обозначен placeholder (нулева фабрикация —
 * етикетът е и брифът за фотосесията). Със src: рендва изображението в същата
 * рамка (object-cover), etикетът отпада. Визуализациите са временни AI кадри
 * (kie.ai GPT IMAGE 2) до реалната фотосесия — виж docs/shot-list.
 *
 * fill: запълва родителя (за фонови изображения) вместо собствен aspect.
 */
export default function ImageSlot({
  label,
  ratio = "4 / 3",
  className = "",
  dark = false,
  fill = false,
  src,
}: {
  label: string;
  ratio?: string;
  className?: string;
  dark?: boolean;
  fill?: boolean;
  src?: string;
}) {
  if (src) {
    return (
      <div
        className={`overflow-hidden ${fill ? "absolute inset-0" : "relative"} ${className}`}
        style={fill ? undefined : { aspectRatio: ratio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden bg-gradient-to-b ${
        dark ? "from-wine/70 to-bordeaux-deep" : "from-taupe/35 to-paper-soft"
      } ${fill ? "absolute inset-0" : "relative"} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {/* Диагонални водачи — четат се като макетно поле, не като дефект */}
      <svg
        className={`absolute inset-0 h-full w-full ${dark ? "text-paper/10" : "text-taupe/25"}`}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
      >
        <line x1="0" y1="0" x2="100" y2="100" />
        <line x1="100" y1="0" x2="0" y2="100" />
      </svg>
      <SunRays
        className={`absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2 ${
          dark ? "text-gold-soft/35" : "text-taupe/60"
        }`}
      />
      <span
        className={`absolute bottom-3 left-1/2 max-w-[90%] -translate-x-1/2 truncate rounded-full border px-3 py-1 text-[0.68rem] ${
          dark
            ? "border-gold/40 bg-bordeaux-deep/80 text-paper/70"
            : "border-gold/40 bg-card/90 text-tertiary-ink"
        }`}
      >
        Снимка: {label}
      </span>
    </div>
  );
}
