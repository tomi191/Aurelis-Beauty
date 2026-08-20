/**
 * Мек вход при всяка смяна на страница (App Router re-mount-ва template).
 * Чист CSS (.page-enter в globals) — без exit фаза: enter-only е достатъчен
 * и не бави перцепцията за скорост (0.3s е долната граница за page enter).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
